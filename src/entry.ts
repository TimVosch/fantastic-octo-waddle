import * as PIXI from 'pixi.js';
import { Position, Sprite } from './components';
import { RenderSystem } from './systems/renderer';
import bunny from './bunny.png';
import { World } from './ecs';
import { PhysicsBody } from './components/physics_body';
import { PhysicsSystem } from './systems/physics';
import { MovementControllable } from './components/movement_controllable';
import { KeyboardMovementSystem } from './systems/keyboard_movement';

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  view: document.getElementById("game") as HTMLCanvasElement,
});
document.body.appendChild(app.view);

const world = new World();
world.addSystem(
  //
  new PhysicsSystem(),
  new KeyboardMovementSystem(),
  new RenderSystem()
);

const b = new PIXI.Sprite(PIXI.Texture.from(bunny));
app.stage.addChild(b);
world.createEntity(
  //
  new Position(app.screen.width / 2, app.screen.height / 2),
  new Sprite(b),
  new PhysicsBody(),
  new MovementControllable()
);

console.log(world.getComponent(0, PhysicsBody))

start();
function start() {
  world.update();

  requestAnimationFrame(start);
}
