import { Mesh, MeshBuilder, StandardMaterial, Color3 } from '@babylonjs/core';

const squareRoom = (scene, color, width, height) => {
  const parent = new Mesh('squareRoomParent', scene);

  const roomWidth = width;
  const wallThickness = 0.1;
  const wallHeight = 1;

  const wall1 = MeshBuilder.CreateBox(
    'wall1',
    {
      width: roomWidth,
      height: height,
      depth: wallThickness,
    },
    scene
  );
  wall1.position.z = -roomWidth / 2;
  wall1.parent = parent;

  const wall2 = wall1.clone('wall2');
  wall2.position.z = roomWidth / 2;
  wall2.parent = parent;

  const wall3 = wall1.clone('wall3');
  wall3.rotation.y = Math.PI / 2;
  wall3.position.x = -roomWidth / 2;
  wall3.position.z = 0;
  wall3.parent = parent;

  const wall4 = wall1.clone('wall4');
  wall4.rotation.y = Math.PI / 2;
  wall4.position.x = roomWidth / 2;
  wall4.position.z = 0;
  wall4.parent = parent;

  const ground = MeshBuilder.CreateGround('ground', { height: roomWidth, width: roomWidth }, scene);
  ground.receiveShadows = true;
  ground.position.y = -0.5;
  ground.parent = parent;

  parent.position.y = -1;

  if (color) {
    const material = new StandardMaterial('rectangleRoomColor', scene);
    material.diffuseColor = Color3.FromHexString(color);

    parent.getChildMeshes().forEach((mesh) => {
      mesh.material = material;
    });
  }

  return parent;
};

export default squareRoom;
