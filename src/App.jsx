import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";
import { ScrollControls } from "@react-three/drei";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import { Overlay } from "./components/Overlay";
import { usePlay } from "./contexts/Play";
import { useMemo } from "react";



function App() {
  const { play, end } = usePlay()

  const effects = useMemo(() =>
  <EffectComposer>
    <Noise opacity = { 0.1 } />
  </EffectComposer>, [])

  return (
    <>
      <Canvas>
        <color attach="background" args={["#ececec"]} />
        <ScrollControls pages = { play && !end ? 20 : 0 } damping = { 0.5 } style={{
          top: "4px",
          left: "0px",
          bottom: "4px",
          right: "8px",
          width: "auto",
          height: "auto",
          animation: "fadeIn 2.4s ease-in-out 1.2s forwards",
          opacity: play ? 1 : 0
        }} >
          <Experience />
        </ScrollControls>
        { effects }
      </Canvas>
      <Overlay />
    </>
  );
}

export default App;
