import {
  ArcRotateCamera,
  Color3,
  Engine,
  HemisphericLight,
  Scene,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader';
import '@babylonjs/loaders/glTF';
import { useEffect, useRef } from 'react';

const FurnitureViewer = (props) => {
  console.log(props);

  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const sceneRef = useRef(null);
  const modelRef = useRef(null);

  useEffect(() => {
    const initBabylon = async () => {
      if (!canvasRef.current) return;

      const engine = new Engine(canvasRef.current, true);
      engineRef.current = engine;

      const scene = new Scene(engine);
      sceneRef.current = scene;

      const camera = new ArcRotateCamera(
        'camera',
        Math.PI / 2,
        Math.PI / 2.5,
        2.5,
        Vector3.Zero(),
        scene
      );

      camera.position = new Vector3(10, 2.5, 10);
      camera.attachControl(canvasRef.current, true);

      camera.lowerBetaLimit = 0.1;
      camera.upperBetaLimit = Math.PI / 2;
      camera.lowerAlphaLimit = 0;
      camera.upperAlphaLimit = Math.PI;
      camera.lowerRadiusLimit = 10;
      camera.upperRadiusLimit = 20;

      new HemisphericLight('light', new Vector3(1, 1, 0), scene);

      if (props.modelPath && props.modelPath.trim() !== '') {
        try {
          const container = await SceneLoader.LoadAssetContainerAsync(
            '/public/3DModels/',
            props.modelPath,
            scene
          );
          container.addAllToScene();
          modelRef.current = container.meshes[0];
        } catch (error) {
          console.error('Error loading model', error);
        }
      } else if (typeof props.model === 'function') {
        const model = props.model(scene);
        modelRef.current = model;
      }

      engine.runRenderLoop(() => {
        scene.render();
      });

      window.addEventListener('resize', () => {
        engine.resize();
      });
    };

    initBabylon();

    return () => {
      engineRef.current?.dispose();
    };
  }, [props.modelPath, props.model]);

  useEffect(() => {
    if (modelRef.current && props.selectedColor) {
      const material = new StandardMaterial('colorMaterial', sceneRef.current);
      material.diffuseColor = Color3.FromHexString(props.selectedColor);
      modelRef.current.material = material;
    }
  }, [props.selectedColor]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '12px',
        outline: 'none',
      }}
    />
  );
};

export default FurnitureViewer;
