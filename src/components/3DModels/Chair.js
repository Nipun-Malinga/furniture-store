import { MeshBuilder, Mesh } from '@babylonjs/core';

const chair = (scene) => {
  const parent = new Mesh('chairParent', scene);

  const seat = MeshBuilder.CreateBox('seat', { width: 2, depth: 2, height: 0.2 }, scene);
  seat.position.y = 1;
  seat.parent = parent;

  const back = MeshBuilder.CreateBox('back', { width: 2, depth: 0.2, height: 2 }, scene);
  back.position.y = 2;
  back.position.z = -0.9;
  back.parent = parent;

  const leg1 = MeshBuilder.CreateBox('leg1', { width: 0.2, depth: 0.2, height: 1 }, scene);
  leg1.position.set(-0.9, 0.5, -0.9);
  leg1.parent = parent;

  const leg2 = leg1.clone('leg2');
  leg2.position.z = 0.9;
  leg2.parent = parent;

  const leg3 = leg1.clone('leg3');
  leg3.position.x = 0.9;
  leg3.position.z = -0.9;
  leg3.parent = parent;

  const leg4 = leg1.clone('leg4');
  leg4.position.x = 0.9;
  leg4.position.z = 0.9;
  leg4.parent = parent;

  parent.position.y = -2;

  return parent;
};

export default chair;
