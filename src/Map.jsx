import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";

export default function Map() {
  return (
    <>
      <RigidBody type="fixed">
        <mesh receiveShadow position={[0, -0.1, 0]}>
          {/* <cylinderGeometry args={[5, 5, 1, 32]} /> */}
          <boxGeometry args={[10, 1, 10]} />
          <meshStandardMaterial color="limegreen" />
        </mesh>
      </RigidBody>
    </>
  );
}
