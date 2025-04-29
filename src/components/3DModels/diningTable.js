import { MeshBuilder, Mesh } from '@babylonjs/core';

const diningTable = (scene) => {
  const parent = new Mesh('diningTableParent', scene);

  const top = MeshBuilder.CreateBox('tableTop', { width: 4, depth: 2.5, height: 0.2 }, scene);
  top.position.y = 2; 
  top.parent = parent;

  const leg = MeshBuilder.CreateBox('tableLeg', { width: 0.2, depth: 0.2, height: 2 }, scene);
  leg.position.set(-1.8, 1, -1.1); 
  leg.parent = parent;

  const leg2 = leg.clone('leg2');
  leg2.position.z = 1.1;
  leg2.parent = parent;

  const leg3 = leg.clone('leg3');
  leg3.position.x = 1.8;
  leg3.position.z = -1.1;
  leg3.parent = parent;

  const leg4 = leg.clone('leg4');
  leg4.position.x = 1.8;
  leg4.position.z = 1.1;
  leg4.parent = parent;

  parent.position.y = -2; 

  return parent;
};

export default diningTable;
