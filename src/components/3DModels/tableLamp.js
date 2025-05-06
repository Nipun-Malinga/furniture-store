import { MeshBuilder, Mesh } from '@babylonjs/core';

const tableLamp = (scene) => {
  const lampParent = new Mesh('lampParent', scene);

  // Lamp base
  const base = MeshBuilder.CreateCylinder('base', {
    diameter: 1.5,
    height: 0.2
  }, scene);
  base.position.y = 0.1;
  base.parent = lampParent;

  // Lamp stand (pole)
  const pole = MeshBuilder.CreateCylinder('pole', {
    diameter: 0.2,
    height: 2
  }, scene);
  pole.position.y = 1.2;
  pole.parent = lampParent;

  // Lamp shade
  const shade = MeshBuilder.CreateCylinder('shade', {
    diameterTop: 0.5,
    diameterBottom: 1,
    height: 1,
    tessellation: 32
  }, scene);
  shade.position.y = 2.2;
  shade.parent = lampParent;

  // Bulb inside the shade
  const bulb = MeshBuilder.CreateSphere('bulb', {
    diameter: 0.4
  }, scene);
  bulb.position.y = 2.2;
  bulb.parent = lampParent;
  lampParent.position.y=-2
  return lampParent;
};

export default tableLamp;
