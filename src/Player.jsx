import { RigidBody, useRapier } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef } from "react";

export default function Player() {
  const body = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const { rapier, world } = useRapier();

  //jump function
  const jump = () => {
    const origin = body.current.translation(); // get ground y coördinates
    origin.y -= 0.31;
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);
    const hit = world.castRay(ray, 10, true); // collision, by providing true we consider everything as solid (origin inside floor)

    if (hit.toi < 0.15) {
      body.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
    }
  };

  useEffect(() => {
    const unsubscribeJump = subscribeKeys(
      // key listener on jump (selector)
      (state) => state.jump,
      (value) => {
        if (value) {
          jump();
        }
      }
    );

    //when component is being destroyed (clean up)
    return () => {
      unsubscribeJump();
    };
  });

  useFrame((state, delta) => {
    const { forward, backward, leftward, rightward, jump } = getKeys();

    //prepare variables before because two keys can be pressed at the same time
    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    //Make the speed dependent on the delta time
    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }
    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }
    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }
    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }

    body.current.applyImpulse(impulse);
    body.current.applyTorqueImpulse(torque);
  });

  return (
    <>
      <RigidBody
        ref={body}
        canSleep={false} //otherwise arrowkeys won't work after a couple seconds
        colliders="ball"
        restitution={0.5}
        friction={1}
        linearDamping={0.5}
        angularDamping={0.5}
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
