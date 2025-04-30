import {
  ArcRotateCamera,
  Color3,
  Engine,
  HemisphericLight,
  Scene,
  StandardMaterial,
  Tools,
  Vector3,
} from '@babylonjs/core';
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader';
import '@babylonjs/loaders/glTF';
import { Box, Button } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import useColorStore from '../store/useColorStore';

const FurnitureViewer = (props) => {
  const { color } = useColorStore();

  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const sceneRef = useRef(null);
  const modelRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const initBabylon = async () => {
      if (!canvasRef.current) return;

      const engine = new Engine(canvasRef.current, true);
      engineRef.current = engine;

      const scene = new Scene(engine);
      sceneRef.current = scene;

      if (props.backgroundColor) {
        scene.clearColor = Color3.FromHexString();
      }

      const camera = new ArcRotateCamera(
        'camera',
        Math.PI / 2,
        Math.PI / 2.5,
        2.5,
        Vector3.Zero(),
        scene
      );
      cameraRef.current = camera;

      switch (props.camera) {
        case 'top':
          camera.position = new Vector3(0, 10, 0);
          camera.setTarget(Vector3.Zero());
          break;
        case 'front':
          camera.position = new Vector3(0, 3, -10);
          camera.setTarget(Vector3.Zero());
          break;
        case 'back':
          camera.position = new Vector3(0, 3, 10);
          camera.setTarget(Vector3.Zero());
          break;
        case 'left':
          camera.position = new Vector3(-10, 3, 0);
          camera.setTarget(Vector3.Zero());
          break;
        case 'right':
          camera.position = new Vector3(10, 3, 0);
          camera.setTarget(Vector3.Zero());
          break;
        case 'isometric':
          camera.position = new Vector3(10, 10, 10);
          camera.setTarget(Vector3.Zero());
          break;
        default:
          camera.position = new Vector3(10, 2.5, 10);
          camera.attachControl(canvasRef.current, true);

          camera.lowerBetaLimit = 0.1;
          camera.upperBetaLimit = Math.PI / 2;
          camera.lowerAlphaLimit = Math.PI / 4;
          camera.upperAlphaLimit = Math.PI;
          camera.lowerRadiusLimit = 10;
          camera.upperRadiusLimit = 20;
      }

      new HemisphericLight('light', new Vector3(1, 1, 0), scene);

      if (props.modelName) {
        try {
          const container = await SceneLoader.LoadAssetContainerAsync(
            '/public/3DModels/',
            props.modelName,
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
  }, [props.modelName, props.model, color]);

  useEffect(() => {
    if (modelRef.current && sceneRef.current && color) {
      const material = new StandardMaterial('colorMaterial', sceneRef.current);
      material.diffuseColor = Color3.FromHexString(color);

      modelRef.current.getChildMeshes().forEach((mesh) => {
        console.log(mesh.name);
        mesh.material = material;
      });
    }
  }, [color]);

  const takeScreenshot = (engineRef, cameraRef) => {
    Tools.CreateScreenshotUsingRenderTarget(engineRef, cameraRef, { width: 1920, height: 1080 });
  };

  return (
    <Box height={'100%'} position={'relative'}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '12px',
          outline: 'none',
        }}
      />
      {props.viewDownload && (
        <Button
          position={'absolute'}
          zIndex={'1'}
          top={'2'}
          left={'3'}
          onClick={() => takeScreenshot(engineRef.current, cameraRef.current)}
        >
          Download Screenshot
        </Button>
      )}
    </Box>
  );
};

export default FurnitureViewer;
