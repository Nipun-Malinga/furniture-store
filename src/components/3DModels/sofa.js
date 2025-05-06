import { MeshBuilder, Mesh, StandardMaterial, Color3 } from '@babylonjs/core';

const sofa = (scene) => {
  const parent = new Mesh("sofaParent", scene);

  // Material 
  const mat = new StandardMaterial("sofaMat", scene);
  

  // Seat 
  const seat = MeshBuilder.CreateBox("seat", { width: 3, depth: 1.2, height: 0.7 }, scene);
  seat.position.y = 0.2;
  seat.material = mat;
  seat.parent = parent;

  // Backrest 
  const back = MeshBuilder.CreateBox("back", { width: 3, depth: 0.3, height: 1 }, scene);
  back.position.y = 0.9;
  back.position.z = -0.45;
  back.material = mat;
  back.parent = parent;

  // Armrests
  const armLeft = MeshBuilder.CreateBox("armLeft", { width: 0.3, depth: 1.2, height: 1 }, scene);
  armLeft.position.set(-1.65, 0.5, 0);
  armLeft.material = mat;
  armLeft.parent = parent;

  const armRight = armLeft.clone("armRight");
  armRight.position.x = 1.65;
  armRight.parent = parent;


  parent.position.y = -1.8;

  return parent;
};

export default sofa;