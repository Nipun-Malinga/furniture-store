import { MeshBuilder, Mesh, StandardMaterial, Color3 } from '@babylonjs/core';

const bookshelf = (scene, name) => {
  const parent = new Mesh(name ?? 'bookshelf', scene);

  // Material
  const woodMaterial = new StandardMaterial('woodMaterial', scene);
  woodMaterial.diffuseColor = new Color3(0.3, 0.2, 0.1);

  // Base
  const base = MeshBuilder.CreateBox(
    'base',
    {
      width: 2,
      depth: 3,
      height: 0.05,
    },
    scene
  );
  base.position.y = 0.025;
  base.material = woodMaterial;
  base.parent = parent;

  // Vertical Line
  const support = MeshBuilder.CreateBox(
    'support',
    {
      width: 0.3,
      depth: 0.8,
      height: 4,
    },
    scene
  );
  support.position.y = 2;
  support.material = woodMaterial;
  support.parent = parent;

  // Shelves
  const shelfCount = 6;
  const spacing = 0.6;
  const shelfLength = 1;

  for (let i = 0; i < shelfCount; i++) {
    const shelf = MeshBuilder.CreateBox(
      `shelf${i}`,
      {
        width: shelfLength,
        depth: 0.8,
        height: 0.04,
      },
      scene
    );

    shelf.material = woodMaterial;

    // Angle shelves
    const angle = Math.PI / 6;
    shelf.rotation.z = i % 2 === 0 ? -angle : angle;

    // Shelves  Position
    shelf.position.y = 0.3 + i * spacing;
    shelf.position.x = i % 2 === 0 ? -0.4 : 0.4;

    shelf.parent = parent;
  }
  parent.position.y = -2;

  return parent;
};

export default bookshelf;
