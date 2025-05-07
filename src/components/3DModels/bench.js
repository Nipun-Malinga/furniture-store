import { MeshBuilder, Mesh, StandardMaterial, Color3 } from '@babylonjs/core';

const bench = (scene, name) => {
  const parent = new Mesh(name ?? 'benchParent', scene);

  // 🎨 Materials
  const cushionMat = new StandardMaterial('benchCushionMat', scene);
  cushionMat.diffuseColor = new Color3(0.85, 0.85, 0.9); // light gray-blue cushion

  const metalMat = new StandardMaterial('benchMetalMat', scene);
  metalMat.diffuseColor = new Color3(0.4, 0.4, 0.4); // dark metal legs

  // 🪑 Rectangular Cushion Seat
  const seat = MeshBuilder.CreateBox('benchSeat', {
    width: 3.5,
    depth: 1,
    height: 0.25,
  }, scene);
  seat.position.y = 1.0;
  seat.material = cushionMat;
  seat.parent = parent;

  // 🦵 Legs (4 metal legs at corners)
  const legHeight = 0.9;
  const leg1 = MeshBuilder.CreateBox('leg1', { width: 0.15, depth: 0.15, height: legHeight }, scene);
  leg1.position.set(-1.6, legHeight / 2, -0.4);
  leg1.material = metalMat;
  leg1.parent = parent;

  const leg2 = leg1.clone('leg2');
  leg2.position.z = 0.4;
  leg2.parent = parent;

  const leg3 = leg1.clone('leg3');
  leg3.position.x = 1.6;
  leg3.position.z = -0.4;
  leg3.parent = parent;

  const leg4 = leg1.clone('leg4');
  leg4.position.x = 1.6;
  leg4.position.z = 0.4;
  leg4.parent = parent;

  parent.position.y = -1.5;

  return parent;
};

export default bench;
