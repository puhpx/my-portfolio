//****** With EXR Background ******/

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader";
import model from "./GiftBox.gltf";

const MyCanvas = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;

    let container, controls;
    let camera, scene, renderer;
    let width, height;

    const threeStart = () => {
      init();
      render();
      loadGLTF();
      animation();
    };

    const render = () => {
      renderer.render(scene, camera);
    };

    const animation = () => {
      requestAnimationFrame(animation);
      renderer.render(scene, camera);
    };

    const init = () => {
      container = canvas;
      width = container.offsetWidth;
      height = container.offsetHeight;

      renderer = new THREE.WebGLRenderer({
        antialias: true,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);

      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      renderer.outputEncoding = THREE.sRGBEncoding;
      container.appendChild(renderer.domElement);

      camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000);
      camera.position.set(0, 0, 400);

      scene = new THREE.Scene();

      controls = new OrbitControls(camera, renderer.domElement);
      controls.addEventListener("change", render);
      controls.minDistance = 2;
      controls.maxDistance = 10;
      controls.target.set(0, 0, -0.2);
      controls.update();
    };

    const loadGLTF = () => {
      new EXRLoader()
        .setDataType(THREE.FloatType)
        .load(process.env.PUBLIC_URL + "/leadenhall_market_1k.exr", function (texture) {
          const pmremGenerator = new THREE.PMREMGenerator(renderer);
          pmremGenerator.compileEquirectangularShader();
          const envMap = pmremGenerator.fromEquirectangular(texture).texture;

          scene.background = envMap;
          scene.environment = envMap;

          texture.dispose();
          pmremGenerator.dispose();

          render();

          const loader = new GLTFLoader();
          loader.load(process.env.PUBLIC_URL + model, function (gltf) {
            scene.add(gltf.scene);
            render();
          });
        });

      window.addEventListener("resize", onWindowResize, false);
    };

    const onWindowResize = () => {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);

      render();
    };

    threeStart();

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  return (
    <div
      ref={canvasRef}
      style={{
        height: "300px",
        width: "300px",
        borderRadius: "50%",
        overflow: "hidden",
        boxShadow:
          "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.1)"
      }}
    ></div>
  );
  };

export default MyCanvas;


// //****** Without EXR Background ******/
// import React, { useEffect, useRef } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import model from "./GiftBox.gltf";

// const MyCanvas = () => {
//   const canvasRef = useRef();

//   useEffect(() => {
//     const canvas = canvasRef.current;

//     let container, controls;
//     let camera, scene, renderer;
//     let width, height;

//     const threeStart = () => {
//       init();
//       render();
//       loadGLTF();
//       animation();
//     };

//     const render = () => {
//       renderer.render(scene, camera);
//     };

//     const animation = () => {
//       requestAnimationFrame(animation);
//       renderer.render(scene, camera);
//     };

//     const init = () => {
//       container = canvas;
//       width = container.offsetWidth;
//       height = container.offsetHeight;

//       renderer = new THREE.WebGLRenderer({
//         antialias: true,
//         alpha: true,
//       });
//       renderer.setSize(width, height);
//       renderer.setPixelRatio(window.devicePixelRatio);

//       renderer.toneMapping = THREE.ACESFilmicToneMapping;
//       renderer.toneMappingExposure = 1;
//       renderer.outputEncoding = THREE.sRGBEncoding;
//       container.appendChild(renderer.domElement);

//       camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000);
//       camera.position.set(0, 0, 400);

//       scene = new THREE.Scene();
//       // scene.background = new THREE.Color(0xffffff); // set background to white
//       scene.background = null; // set background to transparent
//       const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // add light
//       scene.add(ambientLight);

//       controls = new OrbitControls(camera, renderer.domElement);
//       controls.addEventListener("change", render);
//       controls.minDistance = 2;
//       controls.maxDistance = 10;
//       controls.target.set(0, 0, -0.2);
//       controls.update();
//     };

//     const loadGLTF = () => {
//       const loader = new GLTFLoader();
//       loader.load(process.env.PUBLIC_URL + model, function (gltf) {
//         scene.add(gltf.scene);
//         render();
//       });

//       window.addEventListener("resize", onWindowResize, false);
//     };

//     const onWindowResize = () => {
//       camera.aspect = width / height;
//       camera.updateProjectionMatrix();

//       renderer.setSize(width, height);

//       render();
//     };

//     threeStart();

//     return () => {
//       window.removeEventListener("resize", onWindowResize);
//     };
//   }, []);

//   return <div ref={canvasRef} style={{ height: "300px", width: "300px" }}></div>;
// };

// export default MyCanvas;
