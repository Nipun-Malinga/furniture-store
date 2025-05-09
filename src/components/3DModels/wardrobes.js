import { MeshBuilder, Mesh, StandardMaterial, Color3 } from '@babylonjs/core';

const wardrobe = (scene, name) => {
  const parent = new Mesh(name ?? 'wardrobeParent', scene);

  const body = MeshBuilder.CreateBox(
    'body',
    {
      width: 2,
      height: 5,
      depth: 1,
    },
    scene
  );
  body.position.y = 2.5;
  body.parent = parent;

  const doorLeft = MeshBuilder.CreateBox(
    'doorLeft',
    {
      width: 0.95,
      height: 4.9,
      depth: 0.05,
    },
    scene
  );
  doorLeft.position.set(-0.5, 2.5, 0.525);
  doorLeft.parent = parent;

  const doorRight = doorLeft.clone('doorRight');
  doorRight.position.x = 0.5;
  doorRight.parent = parent;

  const createLeg = (name, x, z) => {
    const leg = MeshBuilder.CreateBox(
      name,
      {
        width: 0.2,
        height: 0.5,
        depth: 0.2,
      },
      scene
    );
    leg.position.set(x, 0.25, z);
    leg.parent = parent;
  };

  createLeg('frontLeft', -0.8, 0.4);
  createLeg('frontRight', 0.8, 0.4);
  createLeg('backLeft', -0.8, -0.4);
  createLeg('backRight', 0.8, -0.4);

  parent.position.y = -2;

  return parent;
};

export default wardrobe;
