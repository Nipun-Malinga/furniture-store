import { MeshBuilder, Mesh } from '@babylonjs/core';

const lamp = (scene, name) => {
  const parent = new Mesh(name ?? 'lampParent', scene);

  // Base of the lamp
  const base = MeshBuilder.CreateCylinder('base', { diameter: 1, height: 0.2 }, scene);
  base.position.y = 0.1;
  base.parent = parent;

  // Stand (pole)
  const stand = MeshBuilder.CreateCylinder('stand', { diameter: 0.1, height: 2 }, scene);
  stand.position.y = 1.2;
  stand.parent = parent;

  // Lamp shade (top part)
  const shade = MeshBuilder.CreateCylinder(
    'shade',
    {
      diameterTop: 1.2,
      diameterBottom: 0.8,
      height: 1,
    },
    scene
  );
  shade.position.y = 2.2;
  shade.parent = parent;

  parent.position.y = -2;

  return parent;
};

export default lamp;
