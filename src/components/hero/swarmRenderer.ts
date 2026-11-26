// Draws the nanobot spiders and the photo they build. Everything is computed on
// the GPU from the scroll progress, so scrolling backwards reverses it.
import { FLOATS_PER_SPIDER } from './sampleImage';
import type { StageLayout, SwarmData } from './sampleImage';
import { PHOTO, SUIT, TIMELINE } from './timeline';

export interface SwarmFrame {
  progress: number;
  time: number;
  layout: StageLayout;
  pointer: { x: number; y: number; strength: number };
}

export interface SwarmRenderer {
  render(frame: SwarmFrame, pixelRatio: number): void;
  clear(): void;
  dispose(): void;
}

const VERTEX_SHADER = `#version 300 es
precision highp float;

in vec2 a_corner;
in vec2 a_src;
in vec2 a_dst;
in vec3 a_srcColor;
in vec3 a_dstColor;
in vec4 a_timing; // leave, arriveStart, arriveEnd, fadeEnd
in vec4 a_seed;
in float a_large;

uniform vec2 u_resolution;
uniform float u_progress;
uniform float u_time;
uniform vec3 u_src;     // left, top, scale
uniform vec3 u_dst;     // left, top, scale
uniform vec2 u_chest;
uniform vec2 u_center;
uniform vec2 u_spread;
uniform vec3 u_pointer; // x, y, strength
uniform float u_size;

out vec2 v_uv;
out vec3 v_color;
out float v_alpha;
out float v_glow;

const float TAU = 6.2831853;

vec2 position(float time, out float flying) {
  vec2 src = u_src.xy + a_src * u_src.z;
  vec2 dst = u_dst.xy + a_dst * u_dst.z;

  float direction = a_seed.w > 0.5 ? 1.0 : -1.0;
  float angle = a_seed.x * TAU + direction * (time * (0.18 + a_seed.y * 0.45) + u_progress * 7.0);
  float radius = 0.2 + sqrt(a_seed.z) * 0.95;
  vec2 orbit = u_center + vec2(cos(angle), sin(angle)) * u_spread * radius
    + vec2(sin(time * 2.0 + a_seed.w * TAU), cos(time * 1.7 + a_seed.y * TAU)) * 16.0;

  float away = smoothstep(a_timing.x, a_timing.x + 0.11, u_progress);
  float home = smoothstep(a_timing.y, a_timing.z, u_progress);
  flying = away * (1.0 - home);

  vec2 outward = normalize(src - u_chest + vec2(0.001));
  vec2 pos = mix(src, orbit, away) + outward * sin(away * 3.14159) * (40.0 + 130.0 * a_seed.w);
  vec2 swirl = vec2(cos(angle * 2.0), sin(angle * 2.0)) * sin(home * 3.14159) * 60.0;
  pos = mix(pos, dst, home) + swirl;

  vec2 offset = pos - u_pointer.xy;
  float reach = 170.0;
  float push = (1.0 - smoothstep(0.0, reach, length(offset))) * u_pointer.z * flying;
  return pos + normalize(offset + vec2(0.001)) * push * reach * 0.75;
}

void main() {
  float flying;
  float unused;
  vec2 pos = position(u_time, flying);
  vec2 velocity = position(u_time + 0.05, unused) - pos;

  float appear = smoothstep(a_timing.x - 0.004, a_timing.x + 0.006, u_progress);
  float vanish = 1.0 - smoothstep(a_timing.w - 0.02, a_timing.w, u_progress);
  v_alpha = appear * vanish * (a_large > 0.5 ? smoothstep(0.1, 0.5, flying) : 1.0);

  // Smaller in flight, so individual spiders stay readable inside the swarm.
  float size = u_size * mix(1.15, 0.6 + a_seed.y * 0.95, flying);
  if (a_large > 0.5) size = min(u_size * (3.5 + a_seed.y * 3.0), 40.0 + a_seed.y * 26.0);

  float heading = length(velocity) > 0.05 ? atan(velocity.x, -velocity.y) : a_seed.x * TAU;
  float c = cos(heading);
  float s = sin(heading);
  // Squash the sprite sideways in a quick rhythm so the legs seem to scuttle.
  vec2 corner = a_corner * vec2(1.0 + 0.12 * flying * sin(u_time * 17.0 + a_seed.z * TAU), 1.0);
  vec2 vertex = pos + mat2(c, s, -s, c) * corner * size;

  v_uv = a_corner + 0.5;
  vec3 color = mix(a_srcColor, a_dstColor, smoothstep(0.36, 0.6, u_progress));
  // In flight they turn into black, red and gold nanobots to stand out on red.
  vec3 nano = a_seed.z < 0.55 ? vec3(0.07, 0.01, 0.02)
    : a_seed.z < 0.85 ? vec3(1.0, 0.2, 0.14) : vec3(1.0, 0.82, 0.55);
  v_color = mix(color, nano, flying * 0.85);
  // The glow fades on landing, so settled spiders show true photo colours.
  v_glow = smoothstep(0.0, 0.7, flying);

  vec2 clip = vertex / u_resolution * 2.0 - 1.0;
  gl_Position = v_alpha > 0.001 ? vec4(clip.x, -clip.y, 0.0, 1.0) : vec4(2.0, 2.0, 2.0, 1.0);
}`;

const FRAGMENT_SHADER = `#version 300 es
precision mediump float;

uniform sampler2D u_sprite;

in vec2 v_uv;
in vec3 v_color;
in float v_alpha;
in float v_glow;
out vec4 outColor;

void main() {
  // Sprite channels: red = body and legs, green = rim glow, blue = reactor core.
  vec3 sprite = texture(u_sprite, v_uv).rgb;
  float body = sprite.r;
  float rim = max(sprite.g - body, 0.0) * 0.4 * v_glow;
  float alpha = (body + rim) * v_alpha;
  if (alpha < 0.02) discard;
  vec3 color = v_color * body + vec3(1.0, 0.16, 0.1) * rim
    + vec3(1.0, 0.75, 0.6) * sprite.b * 0.5 * v_glow;
  outColor = vec4(color * v_alpha, alpha);
}`;

// The photo, revealed from the bottom up. Keep the row formula in step with
// revealAt() in sampleImage.ts so the edge follows the landing spiders.
const PHOTO_VERTEX_SHADER = `#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform vec3 u_dst; // left, top, scale
uniform vec2 u_imageSize;

out vec2 v_uv;

void main() {
  vec2 corner = vec2(float(gl_VertexID & 1), float(gl_VertexID >> 1));
  vec2 clip = (u_dst.xy + corner * u_imageSize * u_dst.z) / u_resolution * 2.0 - 1.0;
  v_uv = corner;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
}`;

const PHOTO_FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform sampler2D u_photo;
uniform vec2 u_imageSize;
uniform vec2 u_rows;     // head top, last visible row
uniform vec3 u_assembly; // first, last, jitter
uniform float u_progress;

in vec2 v_uv;
out vec4 outColor;

float hash(vec2 cell) {
  return fract(sin(dot(cell, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 point) {
  vec2 cell = floor(point);
  vec2 f = fract(point);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(cell), hash(cell + vec2(1.0, 0.0)), f.x),
    mix(hash(cell + vec2(0.0, 1.0)), hash(cell + vec2(1.0, 1.0)), f.x), f.y);
}

void main() {
  vec4 photo = texture(u_photo, v_uv); // premultiplied alpha
  vec2 pixel = v_uv * u_imageSize;
  float height = clamp((u_rows.y - pixel.y) / (u_rows.y - u_rows.x), 0.0, 1.0);
  float ragged = noise(pixel / 46.0) * 0.65 + noise(pixel / 13.0) * 0.35 - 0.5;
  float at = mix(u_assembly.x, u_assembly.y, height) + ragged * u_assembly.z;

  float shown = smoothstep(at - 0.006, at + 0.006, u_progress);
  float edge = (u_progress - at) / 0.013;
  float glow = exp(-edge * edge);
  float alpha = photo.a * max(shown, glow * 0.85);
  if (alpha < 0.004) discard;
  vec3 color = mix(photo.rgb * shown, vec3(1.0, 0.42, 0.18) * alpha, glow * 0.75);
  outColor = vec4(color, alpha);
}`;

/** Draws a top-down spider, head up, into the three colour channels. */
function drawSpiderSprite() {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  if (!context) return canvas;

  context.fillStyle = '#000';
  context.fillRect(0, 0, size, size);
  context.globalCompositeOperation = 'lighter';
  context.lineCap = 'round';
  context.lineJoin = 'round';

  const legs = [
    [[56, 52], [34, 34], [30, 10]],
    [[54, 58], [24, 48], [8, 30]],
    [[54, 66], [22, 74], [10, 98]],
    [[57, 72], [38, 92], [36, 118]],
  ];

  const draw = (color: string, grow: number) => {
    context.strokeStyle = color;
    context.fillStyle = color;
    context.lineWidth = 7 + grow;
    for (const mirror of [false, true]) {
      for (const leg of legs) {
        context.beginPath();
        leg.forEach(([x, y], i) => {
          const px = mirror ? size - x : x;
          if (i === 0) context.moveTo(px, y);
          else context.lineTo(px, y);
        });
        context.stroke();
      }
    }
    for (const [y, rx, ry] of [[48, 13, 13], [76, 19, 25]]) {
      context.beginPath();
      context.ellipse(64, y, rx + grow / 2, ry + grow / 2, 0, 0, Math.PI * 2);
      context.fill();
    }
  };

  draw('#00ff00', 9);
  draw('#ff0000', 0);
  context.fillStyle = '#0000ff';
  context.beginPath();
  context.ellipse(64, 74, 6, 9, 0, 0, Math.PI * 2);
  context.fill();
  return canvas;
}

function createProgram(gl: WebGL2RenderingContext, vertex: string, fragment: string) {
  const program = gl.createProgram();
  for (const [type, source] of [
    [gl.VERTEX_SHADER, vertex],
    [gl.FRAGMENT_SHADER, fragment],
  ] as const) {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn('Swarm shader failed to compile:', gl.getShaderInfoLog(shader));
      return null;
    }
    gl.attachShader(program, shader);
    gl.deleteShader(shader);
  }
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn('Swarm shader failed to link:', gl.getProgramInfoLog(program));
    return null;
  }
  return program;
}

/** Returns null when WebGL2 is unavailable, so the caller can fall back. */
export function createSwarmRenderer(
  canvas: HTMLCanvasElement,
  swarm: SwarmData,
): SwarmRenderer | null {
  const gl = canvas.getContext('webgl2', { antialias: false });
  if (!gl) return null;
  const program = createProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER);
  const photoProgram = createProgram(gl, PHOTO_VERTEX_SHADER, PHOTO_FRAGMENT_SHADER);
  if (!program || !photoProgram) return null;

  const vertexArray = gl.createVertexArray();
  gl.bindVertexArray(vertexArray);

  const cornerBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cornerBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5]),
    gl.STATIC_DRAW,
  );
  const cornerLocation = gl.getAttribLocation(program, 'a_corner');
  gl.enableVertexAttribArray(cornerLocation);
  gl.vertexAttribPointer(cornerLocation, 2, gl.FLOAT, false, 0, 0);

  const instanceBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, instanceBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, swarm.instances, gl.STATIC_DRAW);
  const attributes: [string, number][] = [
    ['a_src', 2],
    ['a_dst', 2],
    ['a_srcColor', 3],
    ['a_dstColor', 3],
    ['a_timing', 4],
    ['a_seed', 4],
    ['a_large', 1],
  ];
  let offset = 0;
  for (const [name, length] of attributes) {
    const location = gl.getAttribLocation(program, name);
    if (location >= 0) {
      gl.enableVertexAttribArray(location);
      gl.vertexAttribPointer(location, length, gl.FLOAT, false, FLOATS_PER_SPIDER * 4, offset * 4);
      gl.vertexAttribDivisor(location, 1);
    }
    offset += length;
  }

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, drawSpiderSprite());
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  // The photo stays bound to the second texture unit.
  const photoTexture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, photoTexture);
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, swarm.photo);
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  // Its four corners come from the vertex number, so it needs no buffers.
  const photoArray = gl.createVertexArray();
  const photoUniform = (name: string) => gl.getUniformLocation(photoProgram, name);
  const photoUniforms = {
    resolution: photoUniform('u_resolution'),
    dst: photoUniform('u_dst'),
    progress: photoUniform('u_progress'),
  };
  gl.useProgram(photoProgram);
  gl.uniform1i(photoUniform('u_photo'), 1);
  gl.uniform2f(photoUniform('u_imageSize'), PHOTO.width, PHOTO.height);
  gl.uniform2f(photoUniform('u_rows'), PHOTO.headTop, PHOTO.visibleHeight);
  const { first, last, jitter } = TIMELINE.assembly;
  gl.uniform3f(photoUniform('u_assembly'), first, last, jitter);

  const uniform = (name: string) => gl.getUniformLocation(program, name);
  const uniforms = {
    resolution: uniform('u_resolution'),
    progress: uniform('u_progress'),
    time: uniform('u_time'),
    src: uniform('u_src'),
    dst: uniform('u_dst'),
    chest: uniform('u_chest'),
    center: uniform('u_center'),
    spread: uniform('u_spread'),
    pointer: uniform('u_pointer'),
    size: uniform('u_size'),
  };

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  const clear = () => {
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  };

  return {
    clear,
    render({ progress, time, layout, pointer }, pixelRatio) {
      const width = Math.round(layout.width * pixelRatio);
      const height = Math.round(layout.height * pixelRatio);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);
      clear();

      const { suit, photo } = layout;

      // The forming photo goes underneath, then the spiders on top of it.
      gl.useProgram(photoProgram);
      gl.bindVertexArray(photoArray);
      gl.uniform2f(photoUniforms.resolution, layout.width, layout.height);
      gl.uniform3f(photoUniforms.dst, photo.left, photo.top, photo.scale);
      gl.uniform1f(photoUniforms.progress, progress);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      gl.useProgram(program);
      gl.bindVertexArray(vertexArray);
      const spacing = Math.sqrt((swarm.suitArea * suit.scale * suit.scale) / swarm.count);
      gl.uniform2f(uniforms.resolution, layout.width, layout.height);
      gl.uniform1f(uniforms.progress, progress);
      gl.uniform1f(uniforms.time, time);
      gl.uniform3f(uniforms.src, suit.left, suit.top, suit.scale);
      gl.uniform3f(uniforms.dst, photo.left, photo.top, photo.scale);
      gl.uniform2f(
        uniforms.chest,
        suit.left + SUIT.chest[0] * suit.scale,
        suit.top + SUIT.chest[1] * suit.scale,
      );
      gl.uniform2f(uniforms.center, layout.width / 2, layout.height * 0.55);
      gl.uniform2f(uniforms.spread, layout.width * 0.46, layout.height * 0.4);
      gl.uniform3f(uniforms.pointer, pointer.x, pointer.y, pointer.strength);
      gl.uniform1f(uniforms.size, spacing * 2.1);
      gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, swarm.count);
    },
    dispose() {
      gl.deleteTexture(texture);
      gl.deleteTexture(photoTexture);
      gl.deleteVertexArray(photoArray);
      gl.deleteProgram(photoProgram);
      gl.deleteBuffer(cornerBuffer);
      gl.deleteBuffer(instanceBuffer);
      gl.deleteVertexArray(vertexArray);
      gl.deleteProgram(program);
    },
  };
}
