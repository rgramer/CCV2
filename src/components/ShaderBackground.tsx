import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const imageURL = "/api/proxy-image?url=" + encodeURIComponent("https://infogito.com/astra-blob/files/u_rg__f_hvac__1778516424705-2c9810e6f981/ChatGPT%20Image%20May%2011,%202026,%2012_17_10%20PM.png");

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D baseTexture;
  uniform float time;
  uniform vec2 resolution;
  uniform float darkMode;
  varying vec2 vUv;

  #define PI 3.14159265359

  // Coordinate system: normalized top-left mapping
  vec2 getTL(vec2 uv) {
    return vec2(uv.x, 1.0 - uv.y);
  }

  // Soft mask for a rectangular region (x, y, w, h)
  float regionMask(vec2 pt, vec4 bounds, float feather) {
    vec2 p1 = bounds.xy;
    vec2 p2 = bounds.xy + bounds.zw;
    vec2 sm1 = smoothstep(p1 - feather, p1 + feather, pt);
    vec2 sm2 = smoothstep(p2 + feather, p2 - feather, pt);
    return sm1.x * sm1.y * sm2.x * sm2.y;
  }

  // Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  
  // High-frequency hash for stars
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ; m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // --- LAYER SHADERS ---

  // 1. Left Negative Space (Quiet atmosphere zone)
  vec4 getNegativeSpace(vec2 tl, float t) {
    vec4 bounds = vec4(0.0, 0.0, 0.46, 1.0);
    float mask = regionMask(tl, bounds, 0.15);
    
    // Soft volumetric fog
    float fog = snoise(vec2(tl.x * 2.0 - t * 0.05, tl.y * 3.0 + t * 0.02)) * 0.5 + 0.5;
    
    // Low-opacity directional motion blur (faint horizontal streaks moving right)
    float motionStreak = snoise(vec2(tl.x * 3.0 - t * 0.5, tl.y * 15.0));
    float streaks = smoothstep(0.8, 1.0, motionStreak) * 0.1;
    
    vec3 fogColorScaleLight = mix(vec3(0.98, 0.99, 1.0), vec3(0.92, 0.96, 0.98), fog);
    vec3 fogColorScaleDark = mix(vec3(0.05, 0.08, 0.15), vec3(0.1, 0.15, 0.25), fog);
    
    vec3 fogColor = mix(fogColorScaleLight, fogColorScaleDark, darkMode);
    
    return vec4(fogColor, mask * (fog * mix(0.1, 0.2, darkMode) + streaks));
  }

  // 2. Incoming Airflow Streaks (Acceleration field)
  vec4 getAirflowStreaks(vec2 tl, float t) {
    vec4 bounds = vec4(0.12, 0.24, 0.55, 0.58);
    float mask = regionMask(tl, bounds, 0.15);
    
    // Horizontal blur trailing ribbons moving right (slowed down by 50%)
    float s1 = snoise(vec2(tl.x * 4.0 - t * 1.5, tl.y * 25.0)); // fast ribbon
    float s2 = snoise(vec2(tl.x * 2.0 - t * 1.0, tl.y * 12.0)); // wider ribbon
    
    float ribbons = smoothstep(0.7, 1.0, s1) * 0.7 + smoothstep(0.8, 1.0, s2) * 0.4;
    float fadeRight = smoothstep(bounds.x, bounds.x + bounds.z, tl.x);
    
    vec3 airColorLight = mix(vec3(0.3, 0.7, 1.0), vec3(0.7, 0.9, 1.0), fadeRight); 
    vec3 airColorDark = mix(vec3(0.1, 0.5, 0.9), vec3(0.3, 0.8, 1.0), fadeRight);
    
    vec3 airColor = mix(airColorLight, airColorDark, darkMode);
    
    // Decreased opacity by 50%
    float intensity = mix(0.15, 0.25, darkMode);
    
    return vec4(airColor, ribbons * mask * intensity * (1.0 - fadeRight));
  }

  // 3. Primary Glass Conduit
  vec4 getConduit(vec2 tl, float t) {
    // Shifted down and to the right by ~10%
    vec4 bounds = vec4(0.53, 0.31, 0.38, 0.46);
    float mask = regionMask(tl, bounds, 0.1);
    
    // Offset local coordinates to match bounds shift
    vec2 localTl = tl - vec2(0.1, 0.1);
    
    // Organic moving glow instead of diagonal lines
    float pulse = snoise(vec2(localTl.x * 3.0 - t * 0.8, localTl.y * 2.0)) * 0.5 + 0.5;
    float edgeGlow = snoise(localTl * 5.0 + t);
    
    vec3 glowColorLight = mix(vec3(0.0, 0.5, 0.9), vec3(0.4, 0.8, 1.0), pulse);
    vec3 glowColorDark = mix(vec3(0.0, 0.6, 1.0), vec3(0.2, 0.9, 1.0), pulse);
    vec3 glowColor = mix(glowColorLight, glowColorDark, darkMode);
    
    float intensity = mix(0.2, 0.4, darkMode);
    
    float alpha = mask * (pulse * intensity + smoothstep(0.7, 1.0, edgeGlow) * intensity * 1.5);
    return vec4(glowColor, alpha);
  }

  // Beautiful glowing star with cross flares for "shine"
  float drawStar(vec2 uv, float flare) {
    float d = length(uv);
    // Glowing core
    float m = 0.02 / (d * 1.5 + 0.001);
    
    // Vertical and horizontal beams
    float rays = max(0.0, 1.0 - abs(uv.x * uv.y * 3000.0));
    m += rays * flare;

    // Diagonal beams
    vec2 rotUv = uv * mat2(0.7071, -0.7071, 0.7071, 0.7071);
    float rays2 = max(0.0, 1.0 - abs(rotUv.x * rotUv.y * 3000.0));
    m += rays2 * flare * 0.3;

    // Fade out hard edges to prevent grid cell clipping
    m *= smoothstep(0.4, 0.1, d);
    return m;
  }

  // 4. City Sky Top Lighting (Sun bounce / Reflections / Stars)
  vec4 getSkyLighting(vec2 tl, float t) {
    // Top 50% of previous height: 0.45 * 0.5 = 0.225
    vec4 bounds = vec4(0.65, 0.00, 0.35, 0.225);
    float mask = regionMask(tl, bounds, 0.15);
    
    // Light mode: Slow sun bounce moving across the buildings
    float bounce = sin(tl.x * 3.0 - t * 0.5) * 0.5 + 0.5;
    float shimmer = smoothstep(0.8, 1.0, snoise(vec2(tl.x * 40.0, t)));
    vec3 sunlight = vec3(1.0, 0.9, 0.7); // Warm gold/white
    float lightAlpha = bounce * 0.15 + shimmer * 0.1;
    vec3 lightModeColor = sunlight * lightAlpha;
    
    // Dark mode: Templated premium glowing starfield
    vec2 starUv = tl * vec2(60.0, 40.0);
    vec2 starId = floor(starUv);
    vec2 starFract = fract(starUv) - 0.5;
    
    // Randomize position within cell
    float h1 = hash(starId + vec2(1.1, 2.2));
    float h2 = hash(starId + vec2(3.3, 4.4));
    vec2 offset = (vec2(h1, h2) - 0.5) * 0.6; // keep near center
    
    vec2 p = starFract - offset;
    float starHash = hash(starId);
    
    // Populate ~20% of cells
    float hasStar = step(0.8, starHash);
    float size = fract(starHash * 345.32);
    
    // Twinkle with sharp peaks
    float twinkleSpeed = mix(0.5, 2.5, fract(starHash * 34.23));
    float blink = sin(t * twinkleSpeed + starHash * 123.45) * 0.5 + 0.5;
    blink = mix(blink, pow(blink, 4.0), 0.7); // sharpen the blinking
    
    float flare = smoothstep(0.5, 1.0, size) * blink;
    float starM = drawStar(p, flare) * hasStar * size * blink * 1.5;
    
    // Star colors
    vec3 goldStar = vec3(1.0, 0.85, 0.5);
    vec3 whiteStar = vec3(1.0, 0.95, 1.0);
    vec3 blueStar = vec3(0.5, 0.8, 1.0);
    
    float colorHash = fract(starHash * 13.0);
    vec3 starColor = whiteStar;
    if (colorHash > 0.8) starColor = goldStar;
    else if (colorHash < 0.2) starColor = blueStar;
    
    vec3 darkModeStarColor = starColor * (starM * 1.8);
    
    // Building rim light in dark mode (keep original styling)
    float rim = smoothstep(0.8, 1.0, snoise(vec2(tl.x * 20.0, 1.0))) * (1.0 - smoothstep(0.1, 0.5, tl.y));
    vec3 rimColor = vec3(0.1, 0.4, 0.8);
    vec3 darkModeColor = darkModeStarColor + (rimColor * rim * 0.3);
    
    vec3 finalColor = mix(lightModeColor, darkModeColor, darkMode) * mask;
    
    // Blend additive uses rgb * alpha, so alpha=1.0 and rgb=finalColor works perfectly
    return vec4(finalColor, 1.0);
  }

  // 6. Circuit Transit Overlay (Node trails)
  vec4 getCircuitOverlay(vec2 tl, float t) {
    vec4 bounds = vec4(0.76, 0.25, 0.24, 0.58);
    float mask = regionMask(tl, bounds, 0.1);
    
    // Circuit traces - horizontal, flowing right
    float pathX = smoothstep(0.98, 1.0, sin(tl.y * 120.0));
    float pulseX = smoothstep(0.8, 1.0, snoise(vec2(tl.x * 8.0 - t * 2.0, tl.y * 5.0)));
    
    vec3 circuitColorLight = vec3(0.1, 0.6, 1.0);
    vec3 circuitColorDark = vec3(0.2, 0.8, 1.0);
    
    return vec4(mix(circuitColorLight, circuitColorDark, darkMode), mask * pathX * pulseX * mix(0.4, 0.8, darkMode));
  }

  // 7. Conduit Intersection Glow (Focal Bloom)
  vec4 getIntersectionGlow(vec2 tl, float t) {
    // Shifted down and left by roughly 5%
    vec4 bounds = vec4(0.55, 0.42, 0.22, 0.28);
    float mask = regionMask(tl, bounds, 0.15);
    
    vec2 center = bounds.xy + bounds.zw * 0.5;
    float dist = distance(tl, center);
    float bloom = smoothstep(0.2, 0.0, dist) * (sin(t * 2.0) * 0.2 + 0.8);
    
    vec3 focalColor = vec3(0.5, 0.8, 1.0);
    return vec4(focalColor, mask * bloom * 0.4);
  }

  // Toggles
  uniform float tNegativeSpace;
  uniform float tAirflowStreaks;
  uniform float tConduit;
  uniform float tSkyLighting;
  uniform float tCircuitOverlay;
  uniform float tIntersectionGlow;

  // Blend helpers
  void blendAdditive(inout vec4 base, vec4 layer) {
    base.rgb += layer.rgb * layer.a;
  }
  
  void blendNormal(inout vec4 base, vec4 layer) {
    base.rgb = mix(base.rgb, layer.rgb, layer.a);
  }

  void main() {
    vec2 tl = getTL(vUv);
    
    // Add micro-distortion to the texture lookup in the conduit area
    vec4 conduitBounds = vec4(0.53, 0.31, 0.38, 0.46);
    float conduitDistMask = regionMask(tl, conduitBounds, 0.1);
    vec2 distort = vec2(snoise(tl * 10.0 + time), snoise(tl * 10.0 - time)) * 0.0025 * conduitDistMask;
    
    // Sample base texture
    vec4 baseColor = texture2D(baseTexture, vUv + distort);
    vec4 finalColor = baseColor;
    
    // Invert/Darken the white background for dark mode before applying glowing shader layers
    if (darkMode > 0.0) {
        // Calculate original luminance
        float luma = dot(baseColor.rgb, vec3(0.299, 0.587, 0.114));
        float invLuma = 1.0 - luma;
        
        // Map inverted luminance to a sleek dark mode palette
        vec3 darkBg = vec3(0.03, 0.05, 0.08); // Deep navy background for what was white
        vec3 darkLines = vec3(0.2, 0.6, 1.0); // Electric blue for the dark pipelines
        vec3 brightHighlights = vec3(0.4, 0.9, 1.0);
        
        // Increase contrast on the inverted lines
        float intensity = pow(invLuma, 1.2) * 1.5;
        
        // Base mapping
        vec3 darkBase = mix(darkBg, darkLines, clamp(intensity, 0.0, 1.0));
        // Add highlights for the darkest parts of the original image
        darkBase = mix(darkBase, brightHighlights, clamp(intensity - 0.7, 0.0, 1.0));
        
        // Blend between light and dark mode image
        finalColor.rgb = mix(finalColor.rgb, darkBase, darkMode);
    }
    
    // Layer application
    if (tNegativeSpace > 0.5) blendNormal(finalColor, getNegativeSpace(tl, time));
    if (tAirflowStreaks > 0.5) blendAdditive(finalColor, getAirflowStreaks(tl, time));
    if (tConduit > 0.5) blendAdditive(finalColor, getConduit(tl, time));
    if (tIntersectionGlow > 0.5) blendAdditive(finalColor, getIntersectionGlow(tl, time));
    if (tCircuitOverlay > 0.5) blendAdditive(finalColor, getCircuitOverlay(tl, time));
    if (tSkyLighting > 0.5) blendAdditive(finalColor, getSkyLighting(tl, time));
    
    // 8. Global Atmosphere (Vignette + Polish)
    float distToCenter = distance(tl, vec2(0.3, 0.5));
    float vignette = smoothstep(0.9, 0.2, distToCenter);
    
    // Very subtle grade and lift
    finalColor.rgb = mix(finalColor.rgb, mix(vec3(1.0), vec3(0.0), darkMode), vignette * 0.05);

    gl_FragColor = vec4(finalColor.rgb, 1.0);
  }
`;

export interface ShaderToggles {
  negativeSpace: boolean;
  airflowStreaks: boolean;
  conduit: boolean;
  skyLighting: boolean;
  circuitOverlay: boolean;
  intersectionGlow: boolean;
}

const ShaderPlane = ({ isDarkMode, toggles }: { isDarkMode: boolean; toggles: ShaderToggles }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(imageURL, (loadedTex) => {
      loadedTex.minFilter = THREE.LinearMipMapLinearFilter;
      loadedTex.magFilter = THREE.LinearFilter;
      setTexture(loadedTex);
    }, undefined, (err) => {
      console.error("Failed to load texture via manual TextureLoader:", err);
    });
  }, []);

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      baseTexture: { value: texture },
      darkMode: { value: isDarkMode ? 1.0 : 0.0 },
      tNegativeSpace: { value: toggles.negativeSpace ? 1.0 : 0.0 },
      tAirflowStreaks: { value: toggles.airflowStreaks ? 1.0 : 0.0 },
      tConduit: { value: toggles.conduit ? 1.0 : 0.0 },
      tSkyLighting: { value: toggles.skyLighting ? 1.0 : 0.0 },
      tCircuitOverlay: { value: toggles.circuitOverlay ? 1.0 : 0.0 },
      tIntersectionGlow: { value: toggles.intersectionGlow ? 1.0 : 0.0 },
    }),
    [texture, toggles, isDarkMode]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
      // Lerp dark mode for smooth transition
      materialRef.current.uniforms.darkMode.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.darkMode.value,
        isDarkMode ? 1.0 : 0.0,
        0.05
      );
      
      // Update toggles
      materialRef.current.uniforms.tNegativeSpace.value = toggles.negativeSpace ? 1.0 : 0.0;
      materialRef.current.uniforms.tAirflowStreaks.value = toggles.airflowStreaks ? 1.0 : 0.0;
      materialRef.current.uniforms.tConduit.value = toggles.conduit ? 1.0 : 0.0;
      materialRef.current.uniforms.tSkyLighting.value = toggles.skyLighting ? 1.0 : 0.0;
      materialRef.current.uniforms.tCircuitOverlay.value = toggles.circuitOverlay ? 1.0 : 0.0;
      materialRef.current.uniforms.tIntersectionGlow.value = toggles.intersectionGlow ? 1.0 : 0.0;

      // Handle resizing in real-time
      materialRef.current.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
    }
  });

  // Scale object to cover the viewport maintaining 1672x941 aspect ratio (approx 1.777)
  const imageAspect = 1672 / 941;
  const viewportAspect = viewport.width / viewport.height;
  
  let planeWidth = viewport.width;
  let planeHeight = viewport.height;
  
  if (viewportAspect > imageAspect) {
    // Screen is wider than image: scale to width, overflow height
    planeHeight = viewport.width / imageAspect;
  } else {
    // Screen is taller than image: scale to height, overflow width
    planeWidth = viewport.height * imageAspect;
  }

  if (!texture) return null;

  return (
    <mesh>
      <planeGeometry args={[planeWidth, planeHeight]} />
      <shaderMaterial
        ref={materialRef}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
};

export default function ShaderBackground({ isDarkMode, toggles }: { isDarkMode: boolean; toggles: ShaderToggles }) {
  return (
    <div className={`fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden transition-colors duration-700 ${isDarkMode ? 'bg-[#0a0f1c]' : 'bg-white'}`}>
      <Canvas orthographic camera={{ position: [0, 0, 1], zoom: 1 }}>
        <ShaderPlane isDarkMode={isDarkMode} toggles={toggles} />
      </Canvas>
    </div>
  );
}
