import { Position, Sprite } from '../components';
import { createSystem, World } from '../ecs';

export class RenderSystem extends createSystem(Position, Sprite) {
  update(world: World, entities: Set<number>): void {
    for (const entity of entities) {
      const position = world.getComponent(entity, Position)!;
      const sprite = world.getComponent(entity, Sprite)!;

      sprite.sprite.x = position.x;
      sprite.sprite.y = position.y;
    }
  }
}
