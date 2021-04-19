/* global AFRAME */
if (typeof AFRAME === 'undefined') {
  throw new TypeError('Component attempted to register before AFRAME was available.');
}

const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

function radianToDegree(radian) {
  return radian * (180 / Math.PI);
}

AFRAME.registerComponent('aframe-drag-component', {
  schema: {
    speed: { type: 'number', default: 1 },
  },

  init() {
    this.panStatus = STATUS.INACTIVE;
    this.rotateStatus = STATUS.INACTIVE;
    this.target = this.el;

    if (this.data.target) {
      const el = document.querySelector(this.data.target);
      this.target = el;
    }
    this.attachEventListeners();
  },

  attachEventListeners() {
    const scene = this.el.sceneEl.renderer.domElement;
    scene.addEventListener('mousedown', this.handleStartRotation.bind(this));
    scene.addEventListener('mouseup', this.handleMouseUp.bind(this));
    scene.addEventListener('mousemove', this.handleMouseMove.bind(this));

    scene.addEventListener('contextmenu', this.handleStartPanning.bind(this));
    scene.addEventListener('wheel', this.handleZoom.bind(this));
    scene.addEventListener('touchstart', this.handleStartRotation.bind(this));
    scene.addEventListener('touchend', this.handleMouseUp.bind(this));
    scene.addEventListener('touchmove', this.handleTouchMove.bind(this));
  },

  removeEventListeners() {
    window.removeEventListener('keydown', this.handleKeyboardPress);
  },

  handleStartRotation() {
    this.data.rotateStatus = STATUS.ACTIVE;
  },

  handleMouseUp() {
    this.data.rotateStatus = STATUS.INACTIVE;
    this.data.panStatus = STATUS.INACTIVE;
  },

  handleStartPanning(e) {
    e.preventDefault();
    this.data.panStatus = STATUS.ACTIVE;
  },

  handleMouseMove(e) {
    if (this.data.panStatus === STATUS.ACTIVE) {
      this.target.object3D.translateX(e.movementY * this.data.speed);
      this.target.object3D.translateZ(-e.movementX * this.data.speed);
    } else if (this.data.rotateStatus === STATUS.ACTIVE) {
      const rotation = this.target.object3D.rotation;
      const rotationY = radianToDegree(rotation.y);
      const rotationZ = radianToDegree(rotation.z);

      // Mapping mouse movement to 3D offset values
      const offsetY = e.movementX * this.data.speed;
      const offsetZ = -e.movementY * this.data.speed;

      const nextY = rotationY + offsetY;
      const nextZ = rotationZ + offsetZ;

      this.target.setAttribute('rotation', `0 ${nextY} ${nextZ}`);
    }
  },

  handleTouchMove(e) {
    e.preventDefault();
    if (this.data.rotateStatus === STATUS.ACTIVE) {
      // const offsetX = this.x_cord + e.touches[0].pageX;
      // this.target.object3D.rotateY(offsetX * this.data.speed/1000);
      // TODO: Add touch interactions (rotate, pan, zoom)
    }
  },

  handleZoom(e) {
    const scale = this.target.object3D.scale;
    const { x } = scale;

    const multiplier = e.deltaY < 0 ? 1.01 : 0.99;
    const s = x * multiplier;
    if (s > 0) {
      this.target.setAttribute('scale', `${s} ${s} ${s}`);
    }
  },

  remove() {
    this.removeEventListeners();
  },
});
