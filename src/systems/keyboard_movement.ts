import { MovementControllable } from "../components/movement_controllable";
import { PhysicsBody } from "../components/physics_body";
import { createSystem, World } from "../ecs";

export class KeyboardMovementSystem extends createSystem(MovementControllable, PhysicsBody) {
  keystate: Record<string, number> = {}

  constructor() {
    super()
    window.addEventListener('keydown', (e) => this.keystate[e.code] = 1)
    window.addEventListener('keyup', (e) => this.keystate[e.code] = 0)
  }
  
  update(world: World, entities: Set<number>, delta: number): void {
    const [up, down, left, right] = [
      this.keystate["KeyW"] ?? 0,
      this.keystate["KeyS"] ?? 0,
      this.keystate["KeyA"] ?? 0,
      this.keystate["KeyD"] ?? 0,
    ]

    for(const entity of entities) {
      const body = world.getComponent(entity, PhysicsBody)!
      const {speed} = world.getComponent(entity, MovementControllable)!

      body.velocity.x = (left * -speed + right * speed)
      body.velocity.y = (down * speed + up * -speed)
    }
  }
}