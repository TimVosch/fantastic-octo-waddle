import * as PIXI from 'pixi.js';
import { Position, Sprite } from './components';
import { RenderSystem } from './systems/renderer';
import bunny from './bunny.png';
import { World } from './ecs';
import { PhysicsBody } from './components/physics_body';
import { PhysicsSystem } from './systems/physics';

const app = new PIXI.Application();
document.body.appendChild(app.view);

const world = new World();
world.addSystem(
  //
  new PhysicsSystem(),
  new RenderSystem()
);

const b = new PIXI.Sprite(PIXI.Texture.from(bunny));
app.stage.addChild(b);
world.createEntity(
  //
  new Position(app.screen.width / 2, app.screen.height / 2),
  new Sprite(b),
  new PhysicsBody()
);

start();
function start() {
  world.update();

  requestAnimationFrame(start);
}
