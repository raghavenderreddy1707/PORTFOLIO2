import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Component, Suspense, useState, type ErrorInfo, type ReactNode } from 'react';
import HeroObject from './HeroObject';
import ParticleField from './ParticleField';

class WebGLErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { hasError: boolean }> {
  constructor(props: { fallback: ReactNode; children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // Silently catch WebGL errors
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function detectWebGL(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return false;
    // Verify the context is actually functional (Replit sandbox returns a context but GPU is unavailable)
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    if (ext) {
      const vendor = gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) as string;
      // 0xffff vendor means no real GPU
      if (vendor === '0xffff' || vendor === '') return false;
    }
    // Test that we can actually compile a shader — real functional check
    const vs = gl.createShader(gl.VERTEX_SHADER);
    if (!vs) return false;
    gl.shaderSource(vs, 'void main(){}');
    gl.compileShader(vs);
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) return false;
    return true;
  } catch {
    return false;
  }
}

function detectMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768 || matchMedia('(pointer: coarse)').matches;
}

export default function HeroScene() {
  // Detect synchronously so we never mount the Canvas when WebGL is unavailable
  const [webGLSupported] = useState(() => detectWebGL());
  const [isMobile] = useState(() => detectMobile());

  if (!webGLSupported) {
    return (
      <div className="absolute inset-0 bg-[#0c0a09] overflow-hidden flex items-center justify-center pointer-events-none">
        <div className="w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-gradient-to-tr from-[#f97316]/40 to-[#fbbf24]/30 blur-[100px] animate-pulse" />
      </div>
    );
  }

  const fallback2D = (
    <div className="absolute inset-0 bg-[#0c0a09] overflow-hidden flex items-center justify-center pointer-events-none">
      <div className="w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-gradient-to-tr from-[#f97316]/40 to-[#fbbf24]/30 blur-[100px] animate-pulse" />
    </div>
  );

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <WebGLErrorBoundary fallback={fallback2D}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={isMobile ? 1 : [1, 2]}
          gl={{ antialias: !isMobile, powerPreference: 'high-performance', failIfMajorPerformanceCaveat: false }}
          onCreated={({ gl }) => {
            // If context is lost immediately, the error boundary will catch it
            if (!gl.getContext()) {
              throw new Error('WebGL context unavailable');
            }
          }}
        >
          <color attach="background" args={['#0a0a0f']} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} color="#f97316" />
          <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#fbbf24" />
          
          <Suspense fallback={null}>
            <HeroObject />
            <ParticleField count={isMobile ? 300 : 1500} />
            
            {!isMobile && (
              <EffectComposer disableNormalPass>
                <Bloom 
                  luminanceThreshold={0.2} 
                  luminanceSmoothing={0.9} 
                  intensity={1.5} 
                  mipmapBlur 
                />
              </EffectComposer>
            )}
          </Suspense>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}