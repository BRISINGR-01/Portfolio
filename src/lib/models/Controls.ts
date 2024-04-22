export default class Controls {
  private data = {
    left: false,
    down: false,
    up: false,
    right: false,
    turbo: false,
    space: false,
    shift: false,
  };

  public isLocked = false;

  lock() {
    this.isLocked = true;
  }

  unlock() {
    this.isLocked = false;
  }

  public get left() {
    return this.data.left;
  }
  public set left(value) {
    this.data.left = value;
  }
  public get right() {
    return this.data.right;
  }
  public set right(value) {
    this.data.right = value;
  }
  public get up() {
    return this.data.up;
  }
  public set up(value) {
    this.data.up = value;
  }
  public get down() {
    return this.data.down;
  }
  public set down(value) {
    this.data.down = value;
  }
  public get turbo() {
    return this.data.turbo;
  }
  public set turbo(value) {
    this.data.turbo = value;
  }
  public get space() {
    return this.data.space;
  }
  public set space(value) {
    this.data.space = value;
  }
  public get shift() {
    return this.data.shift;
  }
  public set shift(value) {
    this.data.shift = value;
  }
}
