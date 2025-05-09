import { MeshBuilder, Mesh, StandardMaterial, Color3 } from '@babylonjs/core';

const platformBed = (scene, name) => {
  const parent = new Mesh(name ?? 'platformBedParent', scene);
  const bedDepth = 7.5;

  // 🎨 Materials
  const woodMat = new StandardMaterial('woodMat', scene);
  woodMat.diffuseColor = new Color3(0.4, 0.3, 0.2);

  const mattressMat = new StandardMaterial('mattressMat', scene);
  mattressMat.diffuseColor = new Color3(0.95, 0.95, 0.95);

  const pillowMat = new StandardMaterial('pillowMat', scene);
  pillowMat.diffuseColor = new Color3(0.85, 0.85, 0.85);

  const drawerMat = new StandardMaterial('drawerMat', scene);
  drawerMat.diffuseColor = new Color3(0.3, 0.25, 0.2);

  // 🛏️ Thick Frame
  const frame = MeshBuilder.CreateBox('frame', { width: 6.5, depth: bedDepth, height: 0.6 }, scene);
  frame.position.y = 0.3;
  frame.material = woodMat;
  frame.parent = parent;

  // 🧱 Mattress
  const mattress = MeshBuilder.CreateBox('mattress', { width: 6.3, depth: bedDepth - 0.4, height: 0.5 }, scene);
  mattress.position.y = 0.85;
  mattress.material = mattressMat;
  mattress.parent = parent;

  // 🔲 Headboard (flat rectangle)
  const headboard = MeshBuilder.CreateBox('headboard', { width: 6.5, height: 1.8, depth: 0.2 }, scene);
  headboard.position.set(0, 1.5, -bedDepth / 2 + 0.1);
  headboard.material = woodMat;
  headboard.parent = parent;

  // 🧸 Rounded Pillows (use boxes to keep low-poly)
  const pillow1 = MeshBuilder.CreateBox('pillow1', { width: 2.8, depth: 1, height: 0.25 }, scene);
  pillow1.position.set(-1.5, 1.1, -bedDepth / 2 + 1.4);
  pillow1.material = pillowMat;
  pillow1.parent = parent;

  const pillow2 = pillow1.clone('pillow2');
  pillow2.position.x = 1.5;
  pillow2.parent = parent;

  // 📦 Drawer (front right side)
  const drawer = MeshBuilder.CreateBox('drawer', { width: 2, depth: 0.4, height: 0.3 }, scene);
  drawer.position.set(2, 0.15, bedDepth / 2 + 0.2);
  drawer.rotation.y = Math.PI;
  drawer.material = drawerMat;
  drawer.parent = parent;

  parent.position.y = -2;

  return parent;
};

export default platformBed;
