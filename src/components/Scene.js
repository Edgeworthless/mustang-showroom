import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Car } from "./Car";
import {
  BakeShadows,
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  Scroll,
  useScroll,
} from "@react-three/drei";
import { LayerMaterial, Base, Depth, Color, DebugLayerMaterial } from "lamina";
import { useRef, useState } from "react";

export default function Scene({ ...props }) {
  const rsqw = (t, delta = 0.5, a = 1, f = 1 / (2 * Math.PI)) =>
    (a / Math.atan(1 / delta)) *
    Math.atan(Math.sin(2 * Math.PI * t * f) / delta);
  const scroll = useScroll();
  const [color, setColor] = useState("#FF1A66");
  const car = useRef();
  useFrame((state, delta) => {
    const r1 = scroll.range(0, 1 / 4);
    const r2 = scroll.range(1 / 4, 2 / 4);

    const r3 = scroll.range(3 / 4, 4 / 4);

    /* 
      R1 Animations
    */
    car.current.rotation.y = r1
      ? THREE.MathUtils.damp(
          car.current.rotation.y,
          (Math.PI / 1.5) * rsqw(r1),
          1,
          delta
        )
      : car.current.rotation.y;

    car.current.position.x = THREE.MathUtils.damp(
      car.current.position.x,
      -3 - (-Math.PI / 4) * rsqw(r1),
      1,
      delta
    );

    car.current.position.y = THREE.MathUtils.damp(
      car.current.position.y,
      (Math.PI / 0.7) * rsqw(r1),
      1,
      delta
    );

    car.current.scale.x =
      car.current.scale.y =
      car.current.scale.z =
        THREE.MathUtils.damp(
          car.current.scale.x,
          1 - (-Math.PI / 1.9) * rsqw(r1),
          1,
          delta
        );

    /* 
      R2 Animations
    */
    car.current.rotation.y = r2
      ? THREE.MathUtils.damp(
          car.current.rotation.y,
          (Math.PI / 5) * rsqw(r2),
          1,
          delta
        )
      : car.current.rotation.y;

    car.current.rotation.z = THREE.MathUtils.damp(
      car.current.rotation.z,
      (Math.PI / 5) * rsqw(r2),
      1,
      delta
    );

    car.current.scale.x =
      car.current.scale.y =
      car.current.scale.z =
        r2
          ? THREE.MathUtils.damp(
              car.current.scale.x,
              (-Math.PI / 8) * rsqw(r2),
              1,
              delta
            )
          : car.current.scale.x;

    car.current.position.y = r2
      ? THREE.MathUtils.damp(
          car.current.position.y,
          (-Math.PI / 8) * rsqw(r2),
          1,
          delta
        )
      : car.current.position.y;

    car.current.position.x = r2
      ? THREE.MathUtils.damp(
          car.current.position.x,
          (Math.PI / 0.5) * rsqw(r2),
          1,
          delta
        )
      : car.current.position.x;

    /* 
      R3 Animations
    */

    car.current.rotation.z = r3
      ? THREE.MathUtils.damp(
          car.current.rotation.z,
          (-Math.PI / 2.3) * rsqw(r3),
          1,
          delta
        )
      : car.current.rotation.z;

    car.current.rotation.y = r3
      ? THREE.MathUtils.damp(
          car.current.rotation.y,
          (-Math.PI / 2.3) * rsqw(r3),
          1,
          delta
        )
      : car.current.rotation.y;

    car.current.position.x = r3
      ? THREE.MathUtils.damp(
          car.current.position.x,
          (-Math.PI / 1) * rsqw(r3),
          1,
          delta
        )
      : car.current.position.x;
  });

  return (
    <>
      <Car ref={car} color={color} />
      <mesh scale={15}>
        <sphereGeometry args={[-10, 100, 100]} />
        <LayerMaterial
          side={THREE.DoubleSide}
          color={color}
          alpha={1}
          lighting="toon"
        >
          <Depth
            colorA={color}
            alpha={0.5}
            mode="normal"
            near={0}
            far={100}
            origin={[100, 100, 100]}
          />
        </LayerMaterial>
      </mesh>
      <spotLight
        position={[0, 15, 0]}
        angle={0}
        penumbra={1}
        castShadow
        intensity={2}
        shadow-bias={-0.0001}
      />
      <ambientLight intensity={0.2} />
      <ContactShadows
        resolution={1024}
        frames={3}
        position={[0, -1.16, 0]}
        scale={10}
        blur={1}
        opacity={1}
        far={10}
      />
      <Environment frames={Infinity} resolution={1024}>
        {/* Ceiling */}
        <Lightformer
          intensity={1.2}
          rotation-x={Math.PI / 2}
          position={[0, 5, -9]}
          scale={[10, 10, 1]}
        />
        {/* Sides */}
        <Lightformer
          intensity={2}
          rotation-y={Math.PI / 2}
          position={[-20, -10, -1]}
          scale={[20, 0.1, 1]}
        />
        <Lightformer
          rotation-y={Math.PI / 2}
          intensity={1}
          position={[-4, -1, -1]}
          scale={[20, 3, 1]}
        />
        <Lightformer
          rotation-y={-Math.PI}
          position={[20, 0, 10]}
          scale={[20, 1, 1]}
        />
        {/* Accent (red) */}
        <Float speed={5} floatIntensity={2} rotationIntensity={2}>
          <Lightformer
            form="rect"
            color={color}
            intensity={1}
            scale={10}
            position={[-15, 4, -18]}
            target={[0, 0, 0]}
          />
        </Float>
        {/* Background */}
      </Environment>
      <BakeShadows />
      <Scroll html style={{ width: "100%" }}>
        <div className="header">
          <img src="/ford.png" className="logo" />
        </div>
        <div
          style={{
            position: "absolute",
            top: `25vh`,
            right: "10vh",
            textAlign: "left",
            alignItems: "right",
          }}
        >
          <h1 style={{ fontSize: "9em", color: "white", marginBottom: 1 }}>
            Mustang.
          </h1>
          <h3 style={{ fontSize: "2em", color: "white", margin: 0 }}>
            Really, no other words needed.
          </h3>
          <div
            style={{
              borderRadius: 20,
              color: "white",
              width: "180px",
              height: "34px",
              textAlign: "center",
              paddingTop: 10,
              marginTop: 20,
              backgroundColor: "#FF1A66",
              fontWeight: "bolder"
            }}
          >
            Book a Test Drive
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: `120vh`,
            left: "10vh",
            textAlign: "left",
          }}
        >
          <h1 style={{ fontSize: "9em", color: "white", margin: 1 }}>
            Wheels.
          </h1>
          <h3 style={{ fontSize: "2em", color: "white", margin: 0 }}>
            2012 Carrol Shelby Signature Wheel + Shelby Rear Red Calipers
          </h3>
        </div>

        <div
          style={{
            position: "absolute",
            top: "260vh",
            right: "10vw",
          }}
        >
          <h1 style={{ fontSize: "9em", color: "white", margin: 1 }}>
            4 different
          </h1>
          <h3 style={{ fontSize: "9em", color: color, margin: 0 }}>colors</h3>
          <div style={{ display: "flex" }}>
            <div
              onClick={() => setColor("#FF1A66")}
              style={{
                borderColor: "gray",
                borderWidth: 2,
                borderStyle: color === "#FF1A66" ? "solid" : "hidden",

                borderRadius: 20,
                width: "100px",
                marginRight: 20,
                height: "100px",
                backgroundColor: "#FF1A66",
              }}
            ></div>
            <div
              onClick={() => setColor("#B3B31A")}
              style={{
                borderColor: "gray",
                borderWidth: 2,
                borderStyle: color === "#B3B31A" ? "solid" : "hidden",

                borderRadius: 20,
                width: "100px",
                height: "100px",
                marginRight: 20,
                backgroundColor: "#B3B31A",
              }}
            ></div>
            <div
              onClick={() => setColor("#99FF99")}
              style={{
                borderColor: "gray",
                borderWidth: 2,
                borderStyle: color === "#99FF99" ? "solid" : "hidden",

                borderRadius: 20,
                width: "100px",
                height: "100px",
                marginRight: 20,
                backgroundColor: "#99FF99",
              }}
            ></div>
            <div
              onClick={() => setColor("#FF33FF")}
              style={{
                borderColor: "gray",
                borderWidth: 2,
                borderStyle: color === "#FF33FF" ? "solid" : "hidden",
                borderRadius: 20,
                width: "100px",
                height: "100px",
                marginRight: 20,
                backgroundColor: "#FF33FF",
              }}
            ></div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: `380vh`,
            left: "10vh",
            right: "10vh",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "9em", color: "white", margin: 1 }}>
            Ready to Drive?
          </h1>
        </div>

        <div
          style={{
            position: "absolute",
            top: `480vh`,
            left: "10vh",
            right: "10vh",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "2em", color: "white", margin: 1 }}>
            Manuel Cecchetto - I just love Mustangs, All rights &copy; on Ford Motor
            Company
          </h1>
        </div>
      </Scroll>
    </>
  );
}
