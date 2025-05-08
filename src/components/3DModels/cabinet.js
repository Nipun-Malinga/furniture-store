import { MeshBuilder, Mesh, StandardMaterial, Color3 } from '@babylonjs/core';

const cabinet = (scene, name) => {
  const parent = new Mesh(name ?? 'cabinetParent', scene);

  const woodMat = new StandardMaterial('woodMat', scene);
  woodMat.diffuseColor = new Color3(0.6, 0.4, 0.2);

  const rodMat = new StandardMaterial('rodMat', scene);
  rodMat.diffuseColor = new Color3(0.3, 0.3, 0.3);

  const bottom = MeshBuilder.CreateBox('bottom', { width: 3, height: 0.08, depth: 1 }, scene);
  bottom.position.y = 0;
  bottom.material = woodMat;
  bottom.parent = parent;

  const top = MeshBuilder.CreateBox('top', { width: 3, height: 0.05, depth: 1 }, scene);
  top.position.y = 2.5;
  top.material = woodMat;
  top.parent = parent;

  const leftWall = MeshBuilder.CreateBox('leftWall', { width: 0.05, height: 2.5, depth: 1 }, scene);
  leftWall.position.set(-1.5, 1.25, 0);
  leftWall.material = woodMat;
  leftWall.parent = parent;

  const rightWall = MeshBuilder.CreateBox(
    'rightWall',
    { width: 0.05, height: 2.5, depth: 1 },
    scene
  );
  rightWall.position.set(1.5, 1.25, 0);
  rightWall.material = woodMat;
  rightWall.parent = parent;

  const back = MeshBuilder.CreateBox('back', { width: 3, height: 2.5, depth: 0.05 }, scene);
  back.position.set(0, 1.25, -0.475);
  back.material = woodMat;
  back.parent = parent;

  const divider = MeshBuilder.CreateBox('divider', { width: 0.05, height: 2.5, depth: 1 }, scene);
  divider.position.set(-0.5, 1.25, 0);
  divider.material = woodMat;
  divider.parent = parent;

  const rodYPositions = [2.1, 1.7, 1.3];
  rodYPositions.forEach((y, i) => {
    const rod = MeshBuilder.CreateCylinder(`rod${i}`, { diameter: 0.05, height: 1 }, scene);
    rod.rotation.z = Math.PI / 2;
    rod.position.set(-1, y, 0);
    rod.material = rodMat;
    rod.parent = parent;
  });

  for (let i = 0; i < 3; i++) {
    const shelf = MeshBuilder.CreateBox(`shelf${i}`, { width: 2, height: 0.06, depth: 1 }, scene);
    shelf.position.set(0.5, 0.4 + i * 0.6, 0);
    shelf.material = woodMat;
    shelf.parent = parent;
  }

  parent.position.y = -2;

  return parent;
};

export default cabinet;
