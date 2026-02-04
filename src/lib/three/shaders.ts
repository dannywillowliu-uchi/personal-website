export const smokeVertexShader = `
uniform float uTime;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

vec2 rotate2D(vec2 value, float angle) {
	float s = sin(angle);
	float c = cos(angle);
	mat2 m = mat2(c, s, -s, c);
	return m * value;
}

void main() {
	vec3 newPosition = position;

	// Twist
	float twistPerlin = texture(uPerlinTexture, vec2(0.5, uv.y * 0.2 - uTime * 0.01)).r;
	float angle = twistPerlin * 3.0;
	newPosition.xz = rotate2D(newPosition.xz, angle);

	// Wind
	vec2 windOffset = vec2(
		texture(uPerlinTexture, vec2(0.25, uTime * 0.01)).r - 0.5,
		texture(uPerlinTexture, vec2(0.75, uTime * 0.01)).r - 0.5
	);
	windOffset *= pow(uv.y, 2.0) * 1.5;
	newPosition.xz += windOffset;

	gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
	vUv = uv;
}
`;

export const smokeFragmentShader = `
uniform float uTime;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

void main() {
	vec2 smokeUv = vUv;
	smokeUv.x *= 0.5;
	smokeUv.y *= 0.3;
	smokeUv.y -= uTime * 0.04;

	float smoke = texture(uPerlinTexture, smokeUv).r;
	smoke = smoothstep(0.4, 1.0, smoke);

	smoke *= smoothstep(0.0, 0.1, vUv.x);
	smoke *= smoothstep(1.0, 0.9, vUv.x);
	smoke *= smoothstep(0.0, 0.1, vUv.y);
	smoke *= smoothstep(1.0, 0.4, vUv.y);

	gl_FragColor = vec4(1.0, 1.0, 1.0, smoke);
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}
`;

export const themeVertexShader = `
varying vec2 vUv;

void main() {
	vec4 modelPosition = modelMatrix * vec4(position, 1.0);
	vec4 viewPosition = viewMatrix * modelPosition;
	vec4 projectionPosition = projectionMatrix * viewPosition;
	gl_Position = projectionPosition;
	vUv = uv;
}
`;

export const themeFragmentShader = `
uniform sampler2D uDayTexture1;
uniform sampler2D uNightTexture1;
uniform sampler2D uDayTexture2;
uniform sampler2D uNightTexture2;
uniform sampler2D uDayTexture3;
uniform sampler2D uNightTexture3;
uniform sampler2D uDayTexture4;
uniform sampler2D uNightTexture4;
uniform float uMixRatio;
uniform int uTextureSet;

varying vec2 vUv;

void main() {
	vec3 dayColor;
	vec3 nightColor;

	if (uTextureSet == 1) {
		dayColor = texture2D(uDayTexture1, vUv).rgb;
		nightColor = texture2D(uNightTexture1, vUv).rgb;
	} else if (uTextureSet == 2) {
		dayColor = texture2D(uDayTexture2, vUv).rgb;
		nightColor = texture2D(uNightTexture2, vUv).rgb;
	} else if (uTextureSet == 3) {
		dayColor = texture2D(uDayTexture3, vUv).rgb;
		nightColor = texture2D(uNightTexture3, vUv).rgb;
	} else {
		dayColor = texture2D(uDayTexture4, vUv).rgb;
		nightColor = texture2D(uNightTexture4, vUv).rgb;
	}

	vec3 finalColor = mix(dayColor, nightColor, uMixRatio);
	finalColor = pow(finalColor, vec3(1.0/2.2));
	gl_FragColor = vec4(finalColor, 1.0);
}
`;
