import { Mesh, MeshBuilder, StandardMaterial, Color3 } from '@babylonjs/core';

const rectangleRoom = (scene, color, width, height, length) => {
  const parent = new Mesh('rectangleRoomParent', scene);

  const wallThickness = 0.1;
  const wallHeight = height;

  const wall1 = MeshBuilder.CreateBox(
    'wall1',
    { width, height: wallHeight, depth: wallThickness },
    scene
  );
  wall1.position.z = -length / 2;
  wall1.parent = parent;

  const wall2 = wall1.clone('wall2');
  wall2.position.z = length / 2;
  wall2.parent = parent;

  const wall3 = MeshBuilder.CreateBox(
    'wall3',
    { width: length, height: wallHeight, depth: wallThickness },
    scene
  );
  wall3.rotation.y = Math.PI / 2;
  wall3.position.x = -width / 2;
  wall3.parent = parent;

  const wall4 = wall3.clone('wall4');
  wall4.position.x = width / 2;
  wall4.parent = parent;

  const ground = MeshBuilder.CreateGround('ground', { width, height: length }, scene);
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

export default rectangleRoom;
