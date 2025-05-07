import { MeshBuilder, Mesh, StandardMaterial, Color3, Vector3 } from '@babylonjs/core';

const CoffeeTable = (scene) => {
  const parent = new Mesh("elegantTableParent", scene);

  
  const woodMat = new StandardMaterial("woodMat", scene);
  

  
  const top = MeshBuilder.CreateCylinder("top", {
    diameter: 1.6,
    height: 0.06,
    tessellation: 64,
  }, scene);
  top.position.y = 0.8;
  top.material = woodMat;
  top.parent = parent;

  
  const base = MeshBuilder.CreateCylinder("base", {
    diameter: 1.4,
    height: 0.06,
    tessellation: 64,
  }, scene);
  base.position.y = 0;
  base.material = woodMat;
  base.parent = parent;

  
  const legThickness = 0.06;
  const legWidth = 0.14;
  const legHeight = 0.7;

  const createXLeg = (name, rotationY) => {
    const leg1 = MeshBuilder.CreateBox(name + "leg1", {
      height: legHeight,
      width: legWidth,
      depth: legThickness
    }, scene);
    leg1.rotation.z = -Math.PI / 6;
    leg1.position = new Vector3(-0.2, legHeight / 2 + 0.03, 0);
    leg1.material = woodMat;

    const leg2 = leg1.clone(name + "leg2");
    leg2.rotation.z = Math.PI / 6;
    leg2.position.x = 0.2;

    const group = new Mesh(name + "Group", scene);
    leg1.parent = group;
    leg2.parent = group;

    group.rotation.y = rotationY;
    group.parent = parent;
  };

  
  createXLeg("xLeg1", 0);
  createXLeg("xLeg2", Math.PI / 2);

  parent.position.y = -1;

  return parent;
};

export default CoffeeTable;