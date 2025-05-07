import {
  ArcRotateCamera,
  Engine,
  HemisphericLight,
  Scene,
  Vector3,
  StandardMaterial,
  Color3,
  Tools,
} from '@babylonjs/core';
import { Box, Button, HStack } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import rooms from '../data/rooms';
import useRoom from '../store/useRoom';
import useProduct from '../store/useProduct';
import useCoordinatesStore from '../store/useCoordinatesStore';
import { IoIosSave } from 'react-icons/io';
import { RiScreenshot2Fill } from 'react-icons/ri';

const RoomBuilder = () => {
  const { room } = useRoom();
  const { products } = useProduct();
  const { coordinates } = useCoordinatesStore();

  const canvasRef = useRef(null);
  const cameraRef = useRef(null);
  const engineRef = useRef(null);
  const productsRef = useRef();

  useEffect(() => {
    productsRef.current = coordinates;
  }, [coordinates]);

  useEffect(() => {
    const initBabylon = () => {
      if (!canvasRef.current) return;

      const engine = new Engine(canvasRef.current, true);
      const scene = new Scene(engine);

      engineRef.current = engine;

      const camera = new ArcRotateCamera(
        'camera',
        Math.PI / 2,
        Math.PI / 3,
        10,
        new Vector3(0, -2, 0),
        scene
      );
      camera.lowerRadiusLimit = 1;
      camera.upperRadiusLimit = 10;

      camera.attachControl(canvasRef.current, true);
      cameraRef.current = camera;

      const light = new HemisphericLight('hemisphericLight', new Vector3(0, 5, 10), scene);

      rooms.items
        .filter((r) => r.value == room.selectedRoom)
        .map((r) => {
          console.log('Room Selected');
          const selectedRoom = r.room(scene, room.width, room.length);
          selectedRoom.position.y = -2;
        });

      products.map((product) => {
        product.model(scene, product.modelId ?? null);
      });

      scene.onBeforeRenderObservable.add(() => {
        productsRef.current.forEach(({ modelId, X, Y, Z, rotation, scale, color }) => {
          const mesh = scene.getMeshByName(modelId);
          if (mesh) {
            mesh.position.set(X, Y, Z);
            mesh.rotation.y = rotation;
            mesh.scaling.setAll(scale);

            if (color) {
              const newColor = Color3.FromHexString(color);

              const applyMaterial = (targetMesh) => {
                if (!targetMesh.material || !(targetMesh.material instanceof StandardMaterial)) {
                  const mat = new StandardMaterial(`${modelId}-mat`, scene);
                  targetMesh.material = mat;
                }
                targetMesh.material.diffuseColor = newColor;
              };

              applyMaterial(mesh);

              mesh.getChildMeshes().forEach((child) => {
                applyMaterial(child);
              });
            }
          }
        });
      });

      engine.runRenderLoop(() => {
        scene.render();
      });

      window.addEventListener('resize', () => {
        engine.resize();
      });

      return () => {
        engine.dispose();
      };
    };

    initBabylon();
  }, [room, products]);

  const takeScreenshot = (engineRef, cameraRef) => {
    Tools.CreateScreenshotUsingRenderTarget(engineRef, cameraRef, { width: 1920, height: 1080 });
  };

  return (
    <Box position={'relative'} height={'100%'} width={'100%'}>
      <HStack position={'absolute'}>
        <Button>
          <IoIosSave />
        </Button>
        <Button onClick={() => takeScreenshot(engineRef.current, cameraRef.current)}>
          <RiScreenshot2Fill />
        </Button>
      </HStack>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          borderRadius: '12px',
          outline: 'none',
        }}
      />
    </Box>
  );
};

export default RoomBuilder;
