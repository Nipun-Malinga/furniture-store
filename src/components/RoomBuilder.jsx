import {
  ArcRotateCamera,
  Camera,
  Color3,
  Engine,
  FreeCamera,
  HemisphericLight,
  Scene,
  StandardMaterial,
  Tools,
  Vector3,
  ShadowGenerator,
  DirectionalLight,
} from '@babylonjs/core';
import { Box, Button, CloseButton, Dialog, HStack, Input, Portal } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { IoIosSave } from 'react-icons/io';
import { RiScreenshot2Fill } from 'react-icons/ri';
import rooms from '../data/rooms';
import useCoordinatesStore from '../store/useCoordinatesStore';
import useProduct from '../store/useProduct';
import useRoom from '../store/useRoom';
import useLayoutSavedStore from '../store/useLayoutSavedStore';
import rgbaStringToHex from '../services/rgbaToHex';

const RoomBuilder = (props) => {
  const { room } = useRoom();
  const { products } = useProduct();
  const { coordinates } = useCoordinatesStore();
  const [savedDesign, setSavedDesign] = useState([]);
  const [designName, setDesignName] = useState('');
  const { setSavedLayout } = useLayoutSavedStore();

  const canvasRef = useRef(null);
  const cameraRef = useRef(null);
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const coordinatesRef = useRef();

  const handleSubmit = () => {
    if (!designName.trim()) {
      alert('Please enter a layout name');
      return;
    }

    const savedLayoutsRaw = localStorage.getItem('savedLayouts');
    const layouts = savedLayoutsRaw ? JSON.parse(savedLayoutsRaw) : [];

    const design = {
      designName,
      design: savedDesign,
    };

    const idx = layouts.findIndex((l) => l.designName === design.designName);
    if (idx !== -1) {
      layouts[idx] = design;
    } else {
      layouts.push(design);
    }

    localStorage.setItem('savedLayouts', JSON.stringify(layouts));
    setSavedLayout(design);
    console.log('Saved layouts:', layouts);
  };

  useEffect(() => {
    coordinatesRef.current = coordinates;
  }, [coordinates]);

  useEffect(() => {
    const initBabylon = () => {
      if (!canvasRef.current) return;

      const engine = new Engine(canvasRef.current, true);
      const scene = new Scene(engine);

      sceneRef.current = scene;
      engineRef.current = engine;

      let camera;

      if (props.mode === '2d') {
        camera = new FreeCamera('orthoCamera', new Vector3(0, 5, 0), scene);
        camera.mode = Camera.ORTHOGRAPHIC_CAMERA;

        const distance = 7.5;
        const aspect = engine.getRenderWidth() / engine.getRenderHeight();

        camera.orthoLeft = -distance * aspect;
        camera.orthoRight = distance * aspect;
        camera.orthoTop = distance;
        camera.orthoBottom = -distance;

        camera.setTarget(new Vector3(0, 0, 0));
      } else {
        camera = new ArcRotateCamera(
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
      }

      cameraRef.current = camera;

      const light = new DirectionalLight('dirLight', new Vector3(-1, -2, -1), scene);
      light.position = new Vector3(0, 10, 0);

      const shadowGenerator = new ShadowGenerator(1024, light);
      shadowGenerator.useExponentialShadowMap = true;

      room &&
        rooms.items
          .filter((r) => r.value == room.selectedRoom)
          .map((r) => {
            console.log(`Room Color: ${room.roomColor}`);
            const selectedRoom = r.room(
              scene,
              rgbaStringToHex(room.roomColor),
              room.width,
              room.height,
              room.length
            );
            selectedRoom.position.y = -2;
            setSavedDesign([
              {
                modelType: 'room',
                model: {
                  name: r.value,
                  width: room.width,
                  height: room.height,
                  length: room.length,
                  roomColor: room.roomColor,
                  position: {
                    x: selectedRoom.position.x,
                    y: selectedRoom.position.y,
                    z: selectedRoom.position.z,
                  },
                  scale: selectedRoom.scaling.x,
                },
              },
            ]);
          });

      products &&
        products.forEach((product) => {
          if (typeof product.model !== 'function') {
            console.warn(`Invalid model function for product:`, product);
            return;
          }

          const model = product.model(scene, product.modelId ?? null);
          shadowGenerator.addShadowCaster(model);

          if (!model) {
            console.warn(`Failed to create model for product:`, product);
            return;
          }

          if (product.position) {
            model.position.set(product.position.x, product.position.y, product.position.z);
          }

          if (product.rotation !== undefined) {
            model.rotation.y = product.rotation;
          }

          if (product.scale !== undefined) {
            model.scaling.setAll(product.scale);
          }

          if (product.color) {
            try {
              const color3 = Color3.FromHexString(product.color);

              const applyMaterial = (mesh) => {
                if (!mesh.material || !(mesh.material instanceof StandardMaterial)) {
                  const mat = new StandardMaterial(`${mesh.name}-mat`, mesh.getScene());
                  mesh.material = mat;
                }
                if (mesh.material instanceof StandardMaterial) {
                  mesh.material.diffuseColor = color3;
                }
              };

              applyMaterial(model);

              model.getChildMeshes().forEach(applyMaterial);
            } catch (err) {
              console.warn(`Invalid color string: ${product.color}`, err);
            }
          }

          const serializedMesh = {
            name: product?.modelId ?? 'unknown',
            modelType: 'mesh',
            productId: product?.productId ?? null,
            categoryId: product?.categoryId ?? null,
            position: {
              x: product?.position?.x ?? 0,
              y: product?.position?.y ?? -2,
              z: product?.position?.z ?? 0,
            },
            rotation: product?.rotation ?? 0,
            scale: product?.scale ?? 1,
            color: product?.color ?? null,
          };

          setSavedDesign((prev) => [...prev, serializedMesh]);
        });

      scene.onBeforeRenderObservable.add(() => {
        coordinatesRef.current.forEach(
          ({ modelId, productId, categoryId, X, Y, Z, rotation, scale, color }) => {
            const mesh = scene.getMeshByName(modelId);
            if (mesh) {
              mesh.position.set(X, Y, Z);
              mesh.rotation.y = rotation;
              mesh.scaling.setAll(scale);

              if (color) {
                const newColor = Color3.FromHexString(color);

                const applyMaterial = (targetMesh) => {
                  let mat = targetMesh.material;
                  if (!(mat instanceof StandardMaterial)) {
                    mat = new StandardMaterial(`${targetMesh.name}-mat`, scene);
                    targetMesh.material = mat;
                  }
                  mat.diffuseColor = newColor;
                };

                applyMaterial(mesh);

                mesh.getChildMeshes().forEach((child) => {
                  applyMaterial(child);
                });
              }

              setSavedDesign((prevDesigns) => {
                const updatedDesigns = [...prevDesigns];
                const existingIndex = updatedDesigns.findIndex((item) => item.name === modelId);

                const serializedMesh = {
                  name: modelId,
                  modelType: 'mesh',
                  productId: productId,
                  categoryId: categoryId,
                  position: { x: X, y: Y, z: Z },
                  rotation,
                  scale,
                  color,
                };

                if (existingIndex !== -1) {
                  updatedDesigns[existingIndex] = serializedMesh;
                } else {
                  updatedDesigns.push(serializedMesh);
                }
                return updatedDesigns;
              });
            }
          }
        );
      });

      engine.runRenderLoop(() => {
        scene.render();
      });

      const handleResize = () => engineRef.current?.resize();
      window.addEventListener('resize', handleResize);

      return () => {
        engine.stopRenderLoop();
        engine.dispose();
        window.removeEventListener('resize', handleResize);
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
        {props.enableModelSaver && (
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button size='sm'>
                <IoIosSave />
              </Button>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Save Layout</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <Input
                      placeholder='Enter Layout Name'
                      size='sm'
                      value={designName}
                      onChange={(e) => setDesignName(e.target.value)}
                    />
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant='outline'>Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Dialog.ActionTrigger asChild>
                      <Button mt={3} size='sm' colorScheme='blue' onClick={handleSubmit}>
                        Save
                      </Button>
                    </Dialog.ActionTrigger>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size='sm' />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        )}

        <Button onClick={() => takeScreenshot(engineRef.current, cameraRef.current)}>
          <RiScreenshot2Fill />
        </Button>
      </HStack>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '28rem',
          borderRadius: '12px',
          outline: 'none',
        }}
      />
    </Box>
  );
};

export default RoomBuilder;
