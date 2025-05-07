import { MeshBuilder, Mesh } from '@babylonjs/core';

const diningChair = (scene, name) => {
  const parent = new Mesh(name ?? 'diningChairParent', scene);

  // Seat (slightly narrower, higher)
  const seat = MeshBuilder.CreateBox('seat', { width: 1.6, depth: 1.6, height: 0.2 }, scene);
  seat.position.y = 1.2;
  seat.parent = parent;

  // Backrest (taller and thinner)
  const back = MeshBuilder.CreateBox('back', { width: 1.6, depth: 0.15, height: 2.2 }, scene);
  back.position.y = 2.3;
  back.position.z = -0.75;
  back.parent = parent;

  // Legs (closer to center)
  const leg1 = MeshBuilder.CreateBox('leg1', { width: 0.15, depth: 0.15, height: 1.2 }, scene);
  leg1.position.set(-0.7, 0.6, -0.7);
  leg1.parent = parent;

  const leg2 = leg1.clone('leg2');
  leg2.position.z = 0.7;
  leg2.parent = parent;

  const leg3 = leg1.clone('leg3');
  leg3.position.x = 0.7;
  leg3.position.z = -0.7;
  leg3.parent = parent;

  const leg4 = leg1.clone('leg4');
  leg4.position.x = 0.7;
  leg4.position.z = 0.7;
  leg4.parent = parent;

  parent.position.y = -2;

  return parent;
};

export default diningChair;
