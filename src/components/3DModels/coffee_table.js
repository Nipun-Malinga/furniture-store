import { MeshBuilder, Mesh, StandardMaterial, Color3 } from '@babylonjs/core';

const CoffeeTable = (scene, name) => {
  const parent = new Mesh(name ?? 'coffeeTableParent', scene);

  const woodMat = new StandardMaterial('woodMat', scene);
  woodMat.diffuseColor = new Color3(0.55, 0.27, 0.07);

  const top = MeshBuilder.CreateCylinder(
    'top',
    {
      diameter: 2,
      height: 0.1,
      tessellation: 64,
    },
    scene
  );
  top.position.y = 1;
  top.material = woodMat;
  top.parent = parent;

  const base = MeshBuilder.CreateCylinder(
    'base',
    {
      diameter: 1.6,
      height: 0.1,
      tessellation: 64,
    },
    scene
  );
  base.position.y = 0.1;
  base.material = woodMat;
  base.parent = parent;

  const legHeight = 0.9;
  const legRadius = 0.06;

  const createLeg = (x, z, name) => {
    const leg = MeshBuilder.CreateCylinder(
      name,
      {
        diameter: legRadius * 2,
        height: legHeight,
      },
      scene
    );
    leg.position.set(x, legHeight / 2 + 0.1, z);
    leg.material = woodMat;
    leg.parent = parent;
  };

  createLeg(-0.5, -0.5, 'leg1');
  createLeg(-0.5, 0.5, 'leg2');
  createLeg(0.5, -0.5, 'leg3');
  createLeg(0.5, 0.5, 'leg4');

  parent.position.y = -2;

  return parent;
};

export default CoffeeTable;
