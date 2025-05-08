import { MeshBuilder, Mesh, StandardMaterial, Color3 } from '@babylonjs/core';

const diningTable = (scene) => {
  const parent = new Mesh(name ?? 'diningTableParent', scene);

  const woodMat = new StandardMaterial('woodMat', scene);
  woodMat.diffuseColor = new Color3(0.6, 0.4, 0.2);

  const legMat = new StandardMaterial('legMat', scene);
  legMat.diffuseColor = new Color3(0.2, 0.1, 0.05);

  const tabletop = MeshBuilder.CreateBox(
    'tabletop',
    {
      width: 4,
      depth: 1.8,
      height: 0.1,
    },
    scene
  );
  tabletop.position.y = 1.1;
  tabletop.material = woodMat;
  tabletop.parent = parent;

  const createLeg = (name, x, z) => {
    const leg = MeshBuilder.CreateBox(
      name,
      {
        width: 0.1,
        depth: 0.1,
        height: 1.1,
      },
      scene
    );
    leg.position.set(x, 0.55, z);
    leg.material = legMat;
    leg.parent = parent;
  };

  createLeg('leg1', -1.8, -0.8);
  createLeg('leg2', -1.8, 0.8);
  createLeg('leg3', 1.8, -0.8);
  createLeg('leg4', 1.8, 0.8);

  parent.position.y = -1;

  return parent;
};

export default diningTable;
