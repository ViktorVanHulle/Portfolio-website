// import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Player from "./Player";
import Lights from "./Lights";
import Map from "./Map";

export default function Experience() {
  return (
    <>
      <color args={["#24a2a1"]} attach="background" />
      {/* <OrbitControls makeDefault /> */}

      <Lights />

      <Physics debug={false}>
        <Map />
        <Player />
      </Physics>
    </>
  );
}
