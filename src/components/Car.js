import React, {
  forwardRef,
  useState,
} from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three";
import { useSpring, animated } from "@react-spring/three";

export const Car = forwardRef(({ ...props }, ref) => {
  const defaultTexture = useLoader(
    TextureLoader,
    `${process.env.PUBLIC_URL}/textures/Body_baseColor.png`
  );

  const [bodyTexture, setTexture] = useState(defaultTexture);
  const { nodes, materials } = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/scene.gltf`);

  //Starting animation
  const { position } = useSpring({
    to: {
      position: [-3, 0, -40],
    },
    from: { position: [-100, 0, -200] },
    config: { mass: 5, tension: 500, friction: 150 },
  });

  return (
    <group {...props} dispose={null}>
      <animated.group ref={ref} rotation={[-Math.PI, -0.5, 0]} position={position}>
        <mesh geometry={nodes.Object_2.geometry} material={materials.Black} />
        <mesh
          geometry={nodes.Object_3.geometry}
          material={materials.Body}
          material-map={bodyTexture}
          material-color={props.color}
        />
        <mesh
          geometry={nodes.Object_4.geometry}
          material={materials.Body_D}
          material-color={props.color}
        />
        <mesh
          geometry={nodes.Object_5.geometry}
          material={materials.Body_G}
          material-color={props.color}
        />
        <mesh
          geometry={nodes.Object_6.geometry}
          material={materials.Body_carbone}
        />
        <mesh
          geometry={nodes.Object_7.geometry}
          material={materials.Body_red}
        />
        <mesh geometry={nodes.Object_8.geometry} material={materials.Chassis} />
        <mesh geometry={nodes.Object_9.geometry} material={materials.Chrome} />
        <mesh geometry={nodes.Object_10.geometry} material={materials.Cobra} />
        <mesh
          material-color="black"
          geometry={nodes.Object_11.geometry}
          material={materials.Dessous}
        />
        <mesh geometry={nodes.Object_12.geometry} material={materials.Disk} />
        <mesh
          geometry={nodes.Object_13.geometry}
          material={materials.Feux_blanc_reflect}
        />
        <mesh
          geometry={nodes.Object_14.geometry}
          material={materials.Feux_chrome}
        />
        <mesh
          geometry={nodes.Object_15.geometry}
          material={materials.Feux_cote_orange}
        />
        <mesh
          geometry={nodes.Object_16.geometry}
          material={materials.Feux_cote_red}
        />
        <mesh
          geometry={nodes.Object_17.geometry}
          material={materials.Feux_glass}
        />
        <mesh
          geometry={nodes.Object_18.geometry}
          material={materials.Feux_plate}
        />
        <mesh
          geometry={nodes.Object_19.geometry}
          material={materials.Feux_rouge}
        />
        <mesh
          geometry={nodes.Object_20.geometry}
          material={materials.Feux_rouge_reflect}
        />
        <mesh
          geometry={nodes.Object_21.geometry}
          material={materials.Feux_stop}
        />
        <mesh
          geometry={nodes.Object_22.geometry}
          material={materials.Feux_texture}
        />
        <mesh geometry={nodes.Object_23.geometry} material={materials.Frein} />
        <mesh
          geometry={nodes.Object_24.geometry}
          material={materials.Interior}
        />
        <mesh
          geometry={nodes.Object_25.geometry}
          material={materials.Interior_2}
        />
        <mesh
          geometry={nodes.Object_26.geometry}
          material={materials.Interior_GPS}
        />
        <mesh
          geometry={nodes.Object_27.geometry}
          material={materials.Interior_HP}
        />
        <mesh
          geometry={nodes.Object_28.geometry}
          material={materials.Interior_boule}
        />
        <mesh
          geometry={nodes.Object_29.geometry}
          material={materials.Interior_ceinture}
        />
        <mesh
          geometry={nodes.Object_30.geometry}
          material={materials.Interior_glass}
        />
        <mesh
          geometry={nodes.Object_31.geometry}
          material={materials.Interior_leather}
        />
        <mesh
          geometry={nodes.Object_32.geometry}
          material={materials.Interior_ligth}
        />
        <mesh
          geometry={nodes.Object_33.geometry}
          material={materials.Interior_metal}
        />
        <mesh
          geometry={nodes.Object_34.geometry}
          material={materials.Interior_metal_struct}
        />
        <mesh
          geometry={nodes.Object_35.geometry}
          material={materials.Interior_moquette}
        />
        <mesh
          geometry={nodes.Object_36.geometry}
          material={materials.Interior_texture}
        />
        <mesh geometry={nodes.Object_37.geometry} material={materials.Jante} />
        <mesh
          geometry={nodes.Object_38.geometry}
          material={materials.Jante_ecrou}
        />
        <mesh
          geometry={nodes.Object_39.geometry}
          material={materials.Jante_logo}
        />
        <mesh geometry={nodes.Object_40.geometry} material={materials.Metal} />
        <mesh
          geometry={nodes.Object_41.geometry}
          material={materials.Metal_alu}
        />
        <mesh geometry={nodes.Object_42.geometry} material={materials.Miroir} />
        <mesh geometry={nodes.Object_43.geometry} material={materials.Motor} />
        <mesh geometry={nodes.Object_44.geometry} material={materials.Phare} />
        <mesh
          geometry={nodes.Object_45.geometry}
          material={materials.Phare_glass}
        />
        <mesh
          geometry={nodes.Object_46.geometry}
          material={materials.Phare_op}
        />
        <mesh
          geometry={nodes.Object_47.geometry}
          material={materials.Phare_orange}
        />
        <mesh
          geometry={nodes.Object_48.geometry}
          material={materials.Phare_orange_b}
        />
        <mesh
          geometry={nodes.Object_49.geometry}
          material={materials.Phare_plastique}
        />
        <mesh
          geometry={nodes.Object_50.geometry}
          material={materials.Plastique_noir}
        />
        <mesh
          geometry={nodes.Object_51.geometry}
          material={materials.Plastique_red}
        />
        <mesh geometry={nodes.Object_52.geometry} material={materials.Pneu} />
        <mesh geometry={nodes.Object_53.geometry} material={materials.Shelby} />
        <mesh geometry={nodes.Object_54.geometry} material={materials.Vitre} />
        <mesh
          geometry={nodes.Object_55.geometry}
          material={materials.Vitre_noir}
        />
      </animated.group>
    </group>
  );
});
