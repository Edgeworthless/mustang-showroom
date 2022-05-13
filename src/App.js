import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import CameraController from "./components/CameraController";
import Car from "./components/Car";
import { withControls } from "react-three-gui";
import { useSpring, animated } from "@react-spring/three";
import {
  BakeShadows,
  ContactShadows,
  Environment,
  Float,
  Lightformer,
} from "@react-three/drei";
import { LayerMaterial, Base, Depth, Color, DebugLayerMaterial } from "lamina";
import { useEffect, useState } from "react";

const COLORS = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF",
];

export default function App() {
  const [color, setColor] = useState("#4DB380");

  useEffect(() => {
    const interval = setInterval(() => {
      setColor(COLORS[Math.floor(Math.random() * COLORS.length - 1)]);
      console.log();
    }, 1000);

    return () => clearInterval(interval);
  }, [color]);

  console.log(color);

  return (
    <div style={{ backgroundColor: color }} className="full">
      <div id="canvas-container">
        <Canvas
          style={{ width: window.innerWidth, height: window.innerHeight }}
          camera={{ fov: 20, position: [-1, 0, 30] }}
        >
          <Car color={color} />
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
            angle={0.5}
            penumbra={1}
            castShadow
            intensity={2}
            shadow-bias={-0.0001}
          />
          <ambientLight intensity={0.1} />
          <ContactShadows
            resolution={1024}
            frames={1}
            position={[0, -1.16, 0]}
            scale={10}
            blur={3}
            opacity={1}
            far={10}
          />
          <Environment frames={Infinity} resolution={1024}>
            {/* Ceiling */}
            <Lightformer
              intensity={0.75}
              rotation-x={Math.PI / 2}
              position={[0, 5, -9]}
              scale={[10, 10, 1]}
            />
            {/* Sides */}
            <Lightformer
              intensity={4}
              rotation-y={Math.PI / 2}
              position={[-5, 1, -1]}
              scale={[20, 0.1, 1]}
            />
            <Lightformer
              rotation-y={Math.PI / 2}
              position={[-5, -1, -1]}
              scale={[20, 0.5, 1]}
            />
            <Lightformer
              rotation-y={-Math.PI / 2}
              position={[10, 1, 0]}
              scale={[20, 1, 1]}
            />
            {/* Accent (red) */}
            <Float speed={5} floatIntensity={2} rotationIntensity={2}>
              <Lightformer
                form="ring"
                color={color}
                intensity={1}
                scale={10}
                position={[-15, 4, -18]}
                target={[0, 0, 0]}
              />
            </Float>
            {/* Background */}
          </Environment>
          {/*           <CameraController />
           */}{" "}
          {/*
           */}{" "}
          <BakeShadows />
        </Canvas>
      </div>
      <div className="gui">
        <div className="header">
          <img src="/ford.png" className="logo" />
        </div>
        <div className="footer">Manuel Cecchetto &copy; - 2022</div>
      </div>
    </div>
  );
}
