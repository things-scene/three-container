/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
var {
  Component,
  Ellipse
} = scene

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [{
    type: 'number',
    label: 'depth',
    name: 'rz',
    property: 'rz'
  }]
}


export default class Cone extends THREE.Mesh {

  constructor(model, canvasSize) {

    super();

    this._model = model;

    this.createObject(model, canvasSize);

  }

  createObject(model, canvasSize) {

    let cx = (model.cx) - canvasSize.width / 2
    let cy = (model.cy) - canvasSize.height / 2
    let cz = this.model.rx

    let rotation = model.rotation
    this.type = model.type

    this.createCone(this.model.rx, this.model.rz)

    this.position.set(cx, cz, cy) // z좌표는 땅에 붙어있게 함
    this.rotation.y = rotation || 0

  }

  createCone(rx, rz) {

    let {
      fillStyle = 'lightgray'
    } = this.model

    this.geometry = new THREE.ConeGeometry(rx, rz, 20);
    this.material = new THREE.MeshLambertMaterial({
      color: fillStyle,
      side: THREE.FrontSide
    });

    // this.castShadow = true

  }

  setEuler(euler) {
    var { yaw, pitch, roll } = euler

    this.setRotationFromEuler(new THREE.Vector3(roll, pitch, yaw));
  }

  setQuaternion(quaternion) {
    var { x, y, z, w } = quaternion

    this.setRotationFromQuaternion(new THREE.Quaternion(x, y, z, w));
  }

  onUserDataChanged() {
    if (!this.userData)
      return

    if (this.userData.hasOwnProperty('qx') && this.userData.hasOwnProperty('qy') && this.userData.hasOwnProperty('qz') && this.userData.hasOwnProperty('qw')) {
      this.setQuaternion({
        x: this.userData.qx,
        y: this.userData.qy,
        z: this.userData.qz,
        w: this.userData.qw
      })
      // this.setEuler({
      //   yaw: this.userData.yaw,
      //   pitch: this.userData.pitch,
      //   roll: this.userData.roll
      // })
    }


  }

  get model() {
    return this._model
  }

}

export class Cone2d extends Ellipse {
  is3dish() {
    return true
  }

  get controls() { }

  get nature() {
    return NATURE
  }
}


Component.register('cone', Cone2d)
scene.Component3d.register('cone', Cone)
