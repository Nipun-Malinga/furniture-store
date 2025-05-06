import {
  ArcRotateCamera,
  Engine,
  HemisphericLight,
  Scene,
  // ShadowGenerator,
  Vector3
} from '@babylonjs/core';
import { Box } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import rooms from '../data/rooms';
import useRoom from '../store/useRoom';

const RoomBuilder = (props) => {
  const canvasRef = useRef(null);
  const cameraRef = useRef(null);
  const sunPositionRef = useRef(30);
  const { room } = useRoom();

  useEffect(() => {
    const initBabylon = () => {
      if (!canvasRef.current) return;

      const engine = new Engine(canvasRef.current, true);
      const scene = new Scene(engine);

      const camera = new ArcRotateCamera(
        'camera',
        Math.PI / 2,
        Math.PI / 3,
        10,
        new Vector3(0, 0.5, 0.5),
        scene
      );
      camera.lowerRadiusLimit = 1;
      camera.upperRadiusLimit = 10;

      camera.attachControl(canvasRef.current, true);
      cameraRef.current = camera;

      // const light = new PointLight('pointLight', new Vector3(0, 5, 0), scene);
      const light = new HemisphericLight('pointLight', new Vector3(0, 5, 0), scene);

      // const shadowGenerator = new ShadowGenerator(1024, light);
      // shadowGenerator.useExponentialShadowMap = true;
      // shadowGenerator.bias = 0.001;
      // shadowGenerator.normalBias = 0.05;

      rooms.items
        .filter((r) => r.value == room.selectedRoom)
        .map((r) => {
          console.log('Room Selected');
          const selectedRoom = r.room(scene, room.width, room.height);
          selectedRoom.position.y = -2;
          // shadowGenerator.addShadowCaster(selectedRoom);
        });

      // const speed = 0.05;
      // const radius = 50;

      scene.onBeforeRenderObservable.add(() => {
        // light.position.x = Math.cos(sunPositionRef.current * speed) * radius;
        // light.position.y = Math.sin(sunPositionRef.current * speed) * radius;
        // light.position.z = 0;
        // light.setDirectionToTarget(Vector3.Zero());
      });

      engine.runRenderLoop(() => {
        scene.render();
      });

      window.addEventListener('resize', () => {
        engine.resize();
      });
    };

    initBabylon();
  }, [room]);

  return (
    <Box height={'100%'} width={'100%'}>
      {/* <Slider.Root
        width='200px'
        defaultValue={[sunPositionRef.current]}
        min={5}
        max={55}
        onValueChange={(val) => (sunPositionRef.current = Number(val.value[0]))}
      >
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider.Root> */}

      <Box height={'50%'} width={'100%'}>
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            borderRadius: '12px',
            outline: 'none',
          }}
        />
      </Box>
    </Box>
  );
};

export default RoomBuilder;
