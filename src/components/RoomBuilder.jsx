import React, { useRef, useEffect, useState } from 'react';
import { Slider } from '@chakra-ui/react';
import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  PointLight,
  HemisphericLight,
  MeshBuilder,
  ShadowGenerator,
} from '@babylonjs/core';
import { Box, Input } from '@chakra-ui/react';

const RoomBuilder = () => {
  const canvasRef = useRef(null);
  const cameraRef = useRef(null);

  const position = useRef(0);
  position.current = 5;

  useEffect(() => {
    const initBabylon = () => {
      if (!canvasRef.current) return;

      const engine = new Engine(canvasRef.current, true);
      const scene = new Scene(engine);

      const camera = new ArcRotateCamera(
        'camera',
        Math.PI / 2,
        Math.PI / 4,
        10,
        new Vector3(0, 1, 0),
        scene
      );
      camera.lowerRadiusLimit = 5;
      camera.upperRadiusLimit = 20;

      camera.attachControl(canvasRef.current, true);
      cameraRef.current = camera;

      const light = new PointLight('pointLight', new Vector3(0, 5, 0), scene);

      const shadowGenerator = new ShadowGenerator(1024, light);
      shadowGenerator.useExponentialShadowMap = true;

      const box = MeshBuilder.CreateBox('box', { size: 1 }, scene);
      shadowGenerator.addShadowCaster(box);

      const ground = MeshBuilder.CreateGround('ground', { height: 5, width: 5 }, scene);
      ground.receiveShadows = true;
      ground.position.y = -0.5;

      const speed = 0.05;
      const radius = 50;

      scene.onBeforeRenderObservable.add(() => {
        light.position.x = Math.cos(position.current * speed) * radius;
        light.position.y = Math.sin(position.current * speed) * radius;
        light.position.z = 0;

        light.setDirectionToTarget(Vector3.Zero());
      });

      engine.runRenderLoop(() => {
        scene.render();
      });

      window.addEventListener('resize', () => {
        engine.resize();
      });
    };

    initBabylon();
  }, []);

  return (
    <Box height={'100%'} width={'100%'}>
      <Slider.Root
        width='200px'
        defaultValue={[5]}
        min={5}
        max={55}
        
        onValueChange={(val) => (position.current = Number(val.value[0]))}
      >
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider.Root>

      <Box height={'50%'} width={'100%'}>
        <canvas
          ref={canvasRef}
          style={{
            width: '50%',
            borderRadius: '12px',
            outline: 'none',
          }}
        />
      </Box>
    </Box>
  );
};

export default RoomBuilder;
