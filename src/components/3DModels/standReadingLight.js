import { MeshBuilder, Mesh, Curve3, Path3D, TubeBuilder, Vector3 } from '@babylonjs/core';

const modernReadingLight = (scene, name) => {
  const lampParent = new Mesh(name ?? 'modernReadingLamp', scene);

  const base = MeshBuilder.CreateCylinder('lampBase', {
    diameter: 1.5,
    height: 0.1
  }, scene);
  base.position.y = 0.05;
  base.parent = lampParent;

  const stand = MeshBuilder.CreateCylinder('lampStand', {
    diameter: 0.1,
    height: 4
  }, scene);
  stand.position.y = 2.1;
  stand.parent = lampParent;


  const curvePoints = [
    new Vector3(0, 4, 0),
    new Vector3(0.2, 4.3, 0.2),
    new Vector3(0.5, 4.5, 0.5)
  ];
  const curve = Curve3.CreateCatmullRomSpline(curvePoints, 20);
  const neck = MeshBuilder.CreateTube('neck', {
    path: curve.getPoints(),
    radius: 0.05,
    updatable: false
  }, scene);
  neck.parent = lampParent;

  const head = MeshBuilder.CreateCylinder('lampHead', {
    diameterTop: 0.2,
    diameterBottom: 0.4,
    height: 0.6,
    tessellation: 32
  }, scene);
  head.rotation.z = Math.PI / 2;
  head.position = new Vector3(0.5, 4.5, 0.5);
  head.parent = lampParent;
  lampParent.position.y=-2
  return lampParent;
};

export default modernReadingLight;
