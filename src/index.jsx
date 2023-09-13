import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { KeyboardControls } from "@react-three/drei";
import Interface from "./Interface";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  // KeyboardControls need to be above everything so that it can be used in the interface
  <KeyboardControls
    map={[
      { name: "forward", keys: ["ArrowUp", "KeyW"] },
      { name: "backward", keys: ["ArrowDown", "KeyS"] },
      { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
      { name: "rightward", keys: ["ArrowRight", "KeyD"] },
      { name: "jump", keys: ["Space"] },
    ]}
  >
    <Canvas
      shadows
      camera={{
        fov: 45,
        near: 0.1,
        far: 2000,
        position: [0.5, 5, 10],
      }}
    >
      <Experience />
    </Canvas>

    <Interface />
  </KeyboardControls>
);
