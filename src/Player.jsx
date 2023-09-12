import { RigidBody } from "@react-three/rapier";

export default function Player() {
  return (
    <>
      <RigidBody
        canSleep={false} //otherwise arrowkeys won't work after a couple seconds
        colliders="ball"
        restitution={1}
        friction={1}
        position={[0, 1, 0]}
      >
        <mesh castShadow>
          <icosahedronGeometry args={[0.3, 1]} />
          <meshStandardMaterial flatShading color="mediumpurple" />
        </mesh>
      </RigidBody>
    </>
  );
}
