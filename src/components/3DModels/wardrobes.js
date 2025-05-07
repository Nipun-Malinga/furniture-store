import { MeshBuilder, Mesh, StandardMaterial, Color3, ActionManager, ExecuteCodeAction, Animation } from '@babylonjs/core';

const wardrobes = (scene) => {
  const parent = new Mesh('cupboardParent', scene);

  const woodMat = new StandardMaterial('woodMat', scene);
  woodMat.diffuseColor = new Color3(0.5, 0.3, 0.1);

  const doorMat = new StandardMaterial('doorMat', scene);
  doorMat.diffuseColor = new Color3(0.7, 0.9, 0.9);
  doorMat.alpha = 0.6;

  const body = MeshBuilder.CreateBox('body', { width: 2, height: 5, depth: 1 }, scene);
  body.position.y = 2.5;
  body.material = woodMat;
  body.parent = parent;

  // Hinged Doors 
  const doorLeftParent = new Mesh("doorLeftParent", scene);
  doorLeftParent.position.set(-1, 2.5, 0.5); // pivot point on left side
  doorLeftParent.parent = parent;

  const doorLeft = MeshBuilder.CreateBox('doorLeft', {
    width: 1,
    height: 5,
    depth: 0.05,
  }, scene);
  doorLeft.position.x = 0.5; // offset within parent
  doorLeft.material = doorMat;
  doorLeft.parent = doorLeftParent;

  const doorRightParent = new Mesh("doorRightParent", scene);
  doorRightParent.position.set(1, 2.5, 0.5); // pivot point on right side
  doorRightParent.parent = parent;

  const doorRight = MeshBuilder.CreateBox('doorRight', {
    width: 1,
    height: 5,
    depth: 0.05,
  }, scene);
  doorRight.position.x = -0.5;
  doorRight.material = doorMat;
  doorRight.parent = doorRightParent;

  // Handles
  const createHandle = (name, xOffset) => {
    const handle = MeshBuilder.CreateBox(name, {
      width: 0.1,   // larger width
      height: 0.4,  // larger height
      depth: 0.05,
    }, scene);
    handle.material = woodMat;
    handle.position.set(xOffset, 2.5, 0.55);
    handle.parent = parent;
  };
  createHandle('handleLeft', -0.5);
  createHandle('handleRight', 0.5);

  //Legs 
  const createLeg = (name, x, z) => {
    const leg = MeshBuilder.CreateBox(name, {
      width: 0.2,
      height: 0.5,
      depth: 0.2,
    }, scene);
    leg.position.set(x, 0.25, z);
    leg.material = woodMat;
    leg.parent = parent;
  };

  createLeg('frontLeft', -0.8, 0.4);
  createLeg('frontRight', 0.8, 0.4);
  createLeg('backLeft', -0.8, -0.4);
  createLeg('backRight', 0.8, -0.4);

  parent.position.y = -2;

  return parent;
};

export default wardrobes;
