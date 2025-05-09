import { MeshBuilder, Mesh, StandardMaterial, Color3 } from '@babylonjs/core';

const sofa = (scene, name) => {
  const parent = new Mesh(name ?? 'sofaParent', scene);

  const baseMat = new StandardMaterial('sofaBaseMat', scene);
  baseMat.diffuseColor = new Color3(0.2, 0.15, 0.1);

  const cushionMat = new StandardMaterial('sofaCushionMat', scene);
  cushionMat.diffuseColor = new Color3(0.8, 0.8, 0.85);

  const base = MeshBuilder.CreateBox('base', { width: 3.2, depth: 1.3, height: 0.4 }, scene);
  base.position.y = 0.2;
  base.material = baseMat;
  base.parent = parent;

  const seat = MeshBuilder.CreateBox('seatCushion', { width: 3, depth: 1.2, height: 0.3 }, scene);
  seat.position.y = 0.55;
  seat.material = cushionMat;
  seat.parent = parent;

  const back = MeshBuilder.CreateBox('backCushion', { width: 3, depth: 0.25, height: 1 }, scene);
  back.position.y = 1.1;
  back.position.z = -0.45;
  back.material = cushionMat;
  back.parent = parent;

  const armLeft = MeshBuilder.CreateBox('armLeft', { width: 0.3, depth: 1.3, height: 1 }, scene);
  armLeft.position.set(-1.65, 0.7, 0);
  armLeft.material = baseMat;
  armLeft.parent = parent;

  const armRight = armLeft.clone('armRight');
  armRight.position.x = 1.65;
  armRight.parent = parent;

  const leg = MeshBuilder.CreateCylinder('leg', { diameter: 0.15, height: 0.3 }, scene);
  leg.position.set(-1.4, 0.05, -0.5);
  leg.material = baseMat;
  leg.parent = parent;

  const leg2 = leg.clone('leg2');
  leg2.position.z = 0.5;
  leg2.parent = parent;

  const leg3 = leg.clone('leg3');
  leg3.position.x = 1.4;
  leg3.position.z = -0.5;
  leg3.parent = parent;

  const leg4 = leg.clone('leg4');
  leg4.position.x = 1.4;
  leg4.position.z = 0.5;
  leg4.parent = parent;

  parent.position.y = -1.2;

  return parent;
};

export default sofa;
