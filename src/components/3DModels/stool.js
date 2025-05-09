import { MeshBuilder, Mesh, StandardMaterial, Color3 } from '@babylonjs/core';

const stool = (scene, name) => {
  const parent = new Mesh(name ?? 'stoolParent', scene);

  const cushionMat = new StandardMaterial('cushionMat', scene);
  cushionMat.diffuseColor = new Color3(0.85, 0.85, 0.9); 

  const metalMat = new StandardMaterial('metalMat', scene);
  metalMat.diffuseColor = new Color3(0.4, 0.4, 0.4); 

  const seat = MeshBuilder.CreateCylinder('seat', {
    diameter: 2.18,
    height: 0.25,
    tessellation: 32,
  }, scene);
  seat.position.y = 1.0;
  seat.material = cushionMat;
  seat.parent = parent;

  const legHeight = 0.9;
  const leg1 = MeshBuilder.CreateBox('leg1', { width: 0.15, depth: 0.15, height: legHeight }, scene);
  leg1.position.set(-0.7, legHeight / 2, -0.7);
  leg1.material = metalMat;
  leg1.parent = parent;

  const leg2 = leg1.clone('leg2');
  leg2.position.z = 0.7;
  leg2.parent = parent;

  const leg3 = leg1.clone('leg3');
  leg3.position.x = 0.7;
  leg3.position.z = -0.7;
  leg3.parent = parent;

  const leg4 = leg1.clone('leg4');
  leg4.position.x = 0.7;
  leg4.position.z = 0.7;
  leg4.parent = parent;

  return parent;
};

export default stool;
