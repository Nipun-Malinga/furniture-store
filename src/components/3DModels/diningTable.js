import { MeshBuilder, Mesh, StandardMaterial, Color3, Vector3 } from '@babylonjs/core';

const diningTable = (scene) => {
  const parent = new Mesh("diningTableParent", scene);

  
  const woodMat = new StandardMaterial("woodMat", scene);
  

  
  const tabletop = MeshBuilder.CreateBox("tabletop", {
    width: 4,
    depth: 1.8,
    height: 0.1
  }, scene);
  tabletop.position.y = 1.1;
  tabletop.material = woodMat;
  tabletop.parent = parent;

  
  const legMat = new StandardMaterial("legMat", scene);
  legMat.diffuseColor = new Color3(0.2, 0.1, 0.05);

  
  const createLeg = (name, xPos, scene) => {
    const legBase = MeshBuilder.CreateBox(name, {
      width: 0.1,
      depth: 0.1,
      height: 1.2,
    }, scene);
    legBase.material = legMat;

    
    legBase.rotation.z = Math.PI / 6;
    legBase.position.set(xPos, 0.5, 0.5);
    legBase.parent = parent;

    const legMirror = legBase.clone('${name}_mirror');
    legMirror.rotation.z = -Math.PI / 6;
    legMirror.position.z = -0.5;
    legMirror.parent = parent;

    
    const baseConnector = MeshBuilder.CreateBox('${name}_base', {
      width: 0.5,
      depth: 1,
      height: 0.2,
    }, scene);
    baseConnector.material = legMat;
    baseConnector.position.set(xPos, 0.05, 0);
    baseConnector.parent = parent;
  };

  
  createLeg('legLeft', -1.2, scene);
  createLeg('legRight', 1.2, scene);

  return parent;
};

export default diningTable;
