import { MeshBuilder, StandardMaterial, Color3, Texture, TransformNode } from '@babylonjs/core';

const cabinet = (scene) => {
  // Cabinet Group
  const cabinetGroup = new TransformNode("cabinetGroup", scene);

  // Load Texture
  const woodMat = new StandardMaterial('woodMat', scene);

  const rodMat = new StandardMaterial('rodMat', scene);
  rodMat.diffuseColor = new Color3(0.3, 0.3, 0.3); // Metal look

  // Cabinet Walls
  const bottom = MeshBuilder.CreateBox('bottom', { width: 3, height: 0.08, depth: 1 }, scene);
  bottom.position.y = 0;
  bottom.material = woodMat;
  bottom.parent = cabinetGroup;

  const top = MeshBuilder.CreateBox('top', { width: 3, height: 0.05, depth: 1 }, scene);
  top.position.y = 2.5;
  top.material = woodMat;
  top.parent = cabinetGroup;

  const leftWall = MeshBuilder.CreateBox('leftWall', { width: 0.05, height: 2.5, depth: 1 }, scene);
  leftWall.position.set(-1.5, 1.25, 0);
  leftWall.material = woodMat;
  leftWall.parent = cabinetGroup;

  const rightWall = MeshBuilder.CreateBox('rightWall', { width: 0.05, height: 2.5, depth: 1 }, scene);
  rightWall.position.set(1.5, 1.25, 0);
  rightWall.material = woodMat;
  rightWall.parent = cabinetGroup;

  const back = MeshBuilder.CreateBox('back', { width: 3, height: 2.5, depth: 0.05 }, scene);
  back.position.set(0, 1.25, -0.475);
  back.material = woodMat;
  back.parent = cabinetGroup;

  //  Divider
  const divider = MeshBuilder.CreateBox('divider', { width: 0.05, height: 2.5, depth: 1 }, scene);
  divider.material = woodMat;
  divider.position.set(-0.5, 1.25, 0);
  divider.parent = cabinetGroup;

  // Rods 
  const rodPositions = [2.1, 1.7, 1.3];
  rodPositions.forEach((y, i) => {
    const rod = MeshBuilder.CreateCylinder(`rod${i}`, { diameter: 0.05, height: 1 }, scene); // Slightly shorter to fit well
    rod.material = rodMat;
    rod.rotation.z = Math.PI / 2;
    
    
    rod.position.set(-1, y, 0); 
    rod.parent = cabinetGroup;
  });

  // Shelves
  for (let i = 0; i < 3; i++) {
    const shelf = MeshBuilder.CreateBox(`shelf${i}`, { width: 2, height: 0.06, depth: 1 }, scene);
    shelf.material = woodMat;
    shelf.position.set(0.5, 0.4 + i * 0.6, 0); 
    shelf.parent = cabinetGroup;
  }

  // adjust position
  cabinetGroup.position.y = -2; 

  return cabinetGroup;
};

export default cabinet;
