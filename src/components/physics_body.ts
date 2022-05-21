class Velocity {
  constructor(public x: number = 0, public y: number = 0) {}
}

export class PhysicsBody {
  public velocity = new Velocity();
}
