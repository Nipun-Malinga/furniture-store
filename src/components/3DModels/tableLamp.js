import { MeshBuilder, Mesh } from '@babylonjs/core';

const tableLamp = (scene, name) => {
  const lampParent = new Mesh(name ?? 'lampParent', scene);

  const base = MeshBuilder.CreateCylinder(
    'base',
    {
      diameter: 2.5,
      height: 0.2,
    },
    scene
  );
  base.position.y = -4.1;
  base.parent = lampParent;

  const pole = MeshBuilder.CreateCylinder(
    'pole',
    {
      diameter: 0.2,
      height: 6,
    },
    scene
  );
  pole.position.y = -1.2;
  pole.parent = lampParent;

  const shade = MeshBuilder.CreateCylinder(
    'shade',
    {
      diameterTop: 3,
      diameterBottom: 3,
      height: 1.5,
      tessellation: 32,
    },
    scene
  );
  shade.position.y = 2.2;
  shade.parent = lampParent;

  const bulb = MeshBuilder.CreateSphere(
    'bulb',
    {
      diameter: 0.4,
    },
    scene
  );
  bulb.position.y = 2.2;
  lampParent.position.y = 0;
  bulb.parent = lampParent;

  return lampParent;
};

export default tableLamp;
