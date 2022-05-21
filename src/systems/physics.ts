import { Position } from '../components';
import { PhysicsBody } from '../components/physics_body';
import { createSystem, World } from '../ecs';

export class PhysicsSystem extends createSystem(Position, PhysicsBody) {
  update(world: World, entities: Set<number>, delta: number): void {
    for (const entity of entities) {
      const position = world.getComponent(entity, Position)!;
      const physicsBody = world.getComponent(entity, PhysicsBody)!;

      physicsBody.velocity.y += 500 * delta;

      position.x += physicsBody.velocity.x * delta;
      position.y += physicsBody.velocity.y * delta;
    }
  }
}
