import { Canvas, useThree, useFrame } from "@react-three/fiber";
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
  Scroll,
  ScrollControls,
  useScroll,
} from "@react-three/drei";
import { LayerMaterial, Base, Depth, Color, DebugLayerMaterial } from "lamina";
import { useEffect, useRef, useState } from "react";
import Scene from "./components/Scene";

export default function App() {

  return (
    <div id="canvas-container">
      <Canvas
        style={{ width: window.innerWidth, height: window.innerHeight }}
        camera={{ fov: 12 }}
      >
        {" "}
        <ScrollControls pages={5} // Each page takes 100% of the height of the canvas
  distance={1} // A factor that increases scroll bar travel (default: 1)
  damping={4} // Friction, higher is faster (default: 4)
  horizontal={false} // Can also scroll horizontally (default: false)
  infinite={false} // Can also scroll infinitely (default: false)
>
          
          <Scene />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
