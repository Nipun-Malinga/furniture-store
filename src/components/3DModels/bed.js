import { MeshBuilder, Mesh } from '@babylonjs/core';

const bed = (scene) => {
  const parent = new Mesh('bedParent', scene);

  // ⬆️ Increase depth to make the bed longer (e.g., from 3 to 6)
  const bedDepth = 8;

  // Bed frame (longer)
  const frame = MeshBuilder.CreateBox('frame', { width: 6, depth: bedDepth, height: 0.4 }, scene);
  frame.position.y = 0.2;
  frame.parent = parent;

  // Mattress (longer)
  const mattress = MeshBuilder.CreateBox('mattress', { width: 5.8, depth: bedDepth - 0.2, height: 0.5 }, scene);
  mattress.position.y = 0.7;
  mattress.parent = parent;

  // Headboard (adjust z to align at end of new depth)
  const headboard = MeshBuilder.CreateBox('headboard', { width: 6, depth: 0.3, height: 2 }, scene);
  headboard.position.y = 1.3;
  headboard.position.z = -bedDepth / 2 + 0.15;
  headboard.parent = parent;

  // Legs (repositioned for new length)
  const leg = MeshBuilder.CreateBox('leg', { width: 0.3, depth: 0.3, height: 0.4 }, scene);
  leg.position.set(-2.7, 0.2, -bedDepth / 2 + 0.3);
  leg.parent = parent;

  const leg2 = leg.clone('leg2');
  leg2.position.z = bedDepth / 2 - 0.3;
  leg2.parent = parent;

  const leg3 = leg.clone('leg3');
  leg3.position.x = 2.7;
  leg3.position.z = -bedDepth / 2 + 0.3;
  leg3.parent = parent;

  const leg4 = leg.clone('leg4');
  leg4.position.x = 2.7;
  leg4.position.z = bedDepth / 2 - 0.3;
  leg4.parent = parent;

  parent.position.y = -2;

  return parent;
};

export default bed;
