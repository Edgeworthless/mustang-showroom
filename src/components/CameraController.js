import React, { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";

export default function CameraController () {
   const { camera, gl } = useThree();
   useEffect(
      () => {
         const controls = new OrbitControls(camera, gl.domElement);
         controls.minDistance = 4;
         controls.maxDistance = 20;
         controls.center = [0, 0, 0]
         controls.enablePan = false
         controls.rotateSpeed = 0.3
         return () => {
           controls.dispose();
         };
      },
      [camera, gl]
   );
   return null;
};