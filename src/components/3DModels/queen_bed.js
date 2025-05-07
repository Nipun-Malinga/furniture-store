import { MeshBuilder, Mesh, StandardMaterial, Color3 } from '@babylonjs/core';

const bed = (scene, name) => {
  const parent = new Mesh(name ?? 'bedParent', scene);
  const bedDepth = 8;

  // 🎨 Materials
  const frameMat = new StandardMaterial('frameMat', scene);
  frameMat.diffuseColor = new Color3(0.36, 0.25, 0.2); // dark wood

  const mattressMat = new StandardMaterial('mattressMat', scene);
  mattressMat.diffuseColor = new Color3(1, 1, 1); // white

  const pillowMat = new StandardMaterial('pillowMat', scene);
  pillowMat.diffuseColor = new Color3(0.9, 0.9, 0.9); // light gray

  const duvetMat = new StandardMaterial('duvetMat', scene);
  duvetMat.diffuseColor = new Color3(0.7, 0.85, 1); // light blue

  // 🛏️ Bed frame
  const frame = MeshBuilder.CreateBox('frame', { width: 6, depth: bedDepth, height: 0.4 }, scene);
  frame.position.y = 0.2;
  frame.material = frameMat;
  frame.parent = parent;

  // 🧱 Mattress
  const mattress = MeshBuilder.CreateBox(
    'mattress',
    { width: 5.8, depth: bedDepth - 0.4, height: 0.5 },
    scene
  );
  mattress.position.y = 0.7;
  mattress.material = mattressMat;
  mattress.parent = parent;

  // 🌈 Headboard (curved)
  const headboard = MeshBuilder.CreateCylinder(
    'headboard',
    {
      diameter: 6,
      height: 0.1,
      tessellation: 20,
      arc: 0.5,
    },
    scene
  );
  headboard.scaling.y = 4;
  headboard.rotation.x = Math.PI / 2;
  headboard.position.y = 1;
  headboard.position.z = -bedDepth / 2 + 0.15;
  headboard.material = frameMat;
  headboard.parent = parent;

  // 🛏️ Duvet/Cover
  const duvet = MeshBuilder.CreateBox(
    'duvet',
    {
      width: 5.6,
      depth: bedDepth - 1,
      height: 0.2,
    },
    scene
  );
  duvet.position.y = 1.0;
  duvet.position.z = 0.4;
  duvet.material = duvetMat;
  duvet.parent = parent;

  // 🧸 Pillows (2)
  const pillow1 = MeshBuilder.CreateBox('pillow1', { width: 2, depth: 1, height: 0.3 }, scene);
  pillow1.position.set(-1.5, 1.0, -bedDepth / 2 + 1.2);
  pillow1.material = pillowMat;
  pillow1.parent = parent;

  const pillow2 = pillow1.clone('pillow2');
  pillow2.position.x = 1.5;
  pillow2.parent = parent;

  // 🦵 Legs
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
