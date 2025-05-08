import { MeshBuilder, Mesh, StandardMaterial, Color3 } from '@babylonjs/core';

const nightstand = (scene, name = 'nightstandParent') => {
  const parent = new Mesh(name, scene);

  const woodMat = new StandardMaterial('woodMat', scene);
  woodMat.diffuseColor = new Color3(0.6, 0.4, 0.2);

  const body = MeshBuilder.CreateBox(
    'body',
    {
      width: 1.5,
      depth: 0.6,
      height: 1,
    },
    scene
  );
  body.position.y = 0.6;
  body.material = woodMat;
  body.parent = parent;

  const drawer = MeshBuilder.CreateBox(
    'drawer',
    {
      width: 0.9,
      height: 0.25,
      depth: 0.05,
    },
    scene
  );
  drawer.position.set(0, 0.65, 0.33);
  drawer.material = woodMat;
  drawer.parent = parent;

  const handle = MeshBuilder.CreateCylinder(
    'handle',
    {
      diameter: 0.04,
      height: 0.15,
    },
    scene
  );
  handle.rotation.x = Math.PI / 2;
  handle.position.set(0, 0.65, 0.36);
  handle.material = woodMat;
  handle.parent = parent;

  const createLeg = (name, x, z) => {
    const leg = MeshBuilder.CreateBox(
      name,
      {
        width: 0.1,
        depth: 0.1,
        height: 0.8,
      },
      scene
    );
    leg.position.set(x, 0.4, z);
    leg.material = woodMat;
    leg.parent = parent;
  };

  createLeg('leg1', -0.45, -0.25);
  createLeg('leg2', -0.45, 0.25);
  createLeg('leg3', 0.45, -0.25);
  createLeg('leg4', 0.45, 0.25);

  parent.position.y = -1;

  return parent;
};

export default nightstand;
