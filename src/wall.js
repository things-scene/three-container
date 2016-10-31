var { Component, Container, Layout, Rect } = scene

export default class Wall extends THREE.Mesh {

  constructor(model, canvasSize) {

    super();

    this._model = model;

    this.createObject(model, canvasSize);

  }

  createObject(model, canvasSize) {

    let cx = (model.left + (model.width/2)) - canvasSize.width/2
    let cy = (model.top + (model.height/2)) - canvasSize.height/2
    let cz = 0.5 * model.depth

    let rotation = model.rotation
    this.type = model.type

    this.createWall(model.width, model.height, model.depth)

    this.position.set(cx,cz,cy)
    this.rotation.y = rotation || 0

    model.opacity = model.opacity || 0.7

    this.material.opacity = model.opacity
    this.material.transparent = model.opacity < 1

  }

  createWall(w, h, d) {

    let {
      fillStyle = 'gray'
    } = this.model

    this.geometry = new THREE.BoxGeometry(w, d, h);
    this.material = new THREE.MeshLambertMaterial( { color : fillStyle, side: THREE.FrontSide } );

    this.castShadow = true

  }

  get model() {
    return this._model
  }
}

export class Wall2d extends Rect {

}

Component.register('wall', Wall2d)
scene.Component3d.register('wall', Wall)