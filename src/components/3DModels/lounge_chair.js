import { MeshBuilder, Mesh, StandardMaterial, Color3 } from '@babylonjs/core';

const loungeChair = (scene, name) => {
  const parent = new Mesh(name ?? 'loungeChairParent', scene);

  // 🎨 Materials (optional but attractive)
  const cushionMat = new StandardMaterial('cushionMat', scene);
  cushionMat.diffuseColor = new Color3(0.9, 0.9, 0.95); // light gray-blue

  const frameMat = new StandardMaterial('frameMat', scene);
  frameMat.diffuseColor = new Color3(0.3, 0.2, 0.15); // dark wood

  // 🪑 Seat frame
  const seat = MeshBuilder.CreateBox('seat', { width: 2.4, depth: 2.2, height: 0.3 }, scene);
  seat.position.y = 1;
  seat.material = frameMat;
  seat.parent = parent;

// 🔄 Angled backrest frame
const back = MeshBuilder.CreateBox('back', { width: 2.4, depth: 0.3, height: 1.8 }, scene);
back.position.y = 2;
back.position.z = -0.9;
back.rotation.x = Math.PI / 80; // ⬅️ reduced angle
back.material = frameMat;
back.parent = parent;

  // 🛋 Seat cushion
  const seatCushion = MeshBuilder.CreateBox('seatCushion', { width: 2.3, depth: 2.1, height: 0.25 }, scene);
  seatCushion.position.y = 1.15;
  seatCushion.material = cushionMat;
  seatCushion.parent = parent;

// 🛋 Back cushion
const backCushion = MeshBuilder.CreateBox('backCushion', { width: 2.3, depth: 0.25, height: 1.7 }, scene);
backCushion.position.y = 2.05;
backCushion.position.z = -0.85;
backCushion.rotation.x = Math.PI / 80; // ⬅️ reduced angle
backCushion.material = cushionMat;
backCushion.parent = parent;

  // 🦵 Legs
  const leg1 = MeshBuilder.CreateBox('leg1', { width: 0.3, depth: 0.4, height: 1 }, scene);
  leg1.position.set(-1, 0.3, -0.9);
  leg1.material = frameMat;
  leg1.parent = parent;

  const leg2 = leg1.clone('leg2');
  leg2.position.z = 0.9;
  leg2.parent = parent;

  const leg3 = leg1.clone('leg3');
  leg3.position.x = 1;
  leg3.position.z = -0.9;
  leg3.parent = parent;

  const leg4 = leg1.clone('leg4');
  leg4.position.x = 1;
  leg4.position.z = 0.9;
  leg4.parent = parent;

  // 💪 Armrests
  const armHeight = 1.4;
  const armrest = MeshBuilder.CreateBox('armrestL', { width: 0.2, depth: 2.2, height: 0.2 }, scene);
  armrest.position.set(-1.25, armHeight, 0);
  armrest.material = frameMat;
  armrest.parent = parent;

  const armrest2 = armrest.clone('armrestR');
  armrest2.position.x = 1.25;
  armrest2.parent = parent;

  parent.position.y = -2;

  return parent;
};

export default loungeChair;
