export abstract class Component {}
export type ComponentType = abstract new (...args: any[]) => any;
export type Entity = number;

export class Container {
  private components = new Map<ComponentType, Component>();

  public add<T extends Component>(instance: T): void {
    this.components.set(instance.constructor as ComponentType, instance);
  }

  public get<T extends ComponentType>(component: T): InstanceType<T> {
    return this.components.get(component) as InstanceType<T>;
  }

  public remove(component: ComponentType): void {
    this.components.delete(component);
  }

  public has(...component: ComponentType[]): boolean {
    for (const c of component) {
      if (!this.components.has(c)) {
        return false;
      }
    }
    return true;
  }
}

export abstract class System {
  abstract signature: readonly ComponentType[];
  abstract update(world: World, entities: Set<Entity>, delta: number): void;
}

export function createSystem(...components: readonly ComponentType[]) {
  abstract class base extends System {
    signature = components;
  }

  return base;
}

export class World {
  private ID: Entity = 0;

  private containers = new Map<Entity, Container>();
  private systems = new Map<System, Set<Entity>>();

  // ====== Components ======

  public createEntity(...components: Component[]): Entity {
    const entity = this.ID++;
    this.containers.set(entity, new Container());
    this.addComponent(entity, ...components);
    return entity;
  }

  // ====== Components ======

  public addComponent(entity: Entity, ...components: Component[]) {
    const container = this.containers.get(entity);
    if (!container) return;

    for (const component of components) {
      container.add(component);
    }

    this.updateEntity(entity);
  }

  public getComponent<U extends ComponentType>(entity: Entity, componentType: U): InstanceType<U> | undefined {
    return this.containers.get(entity)?.get(componentType);
  }

  public hasComponent(entity: Entity, ...components: ComponentType[]): boolean {
    return this.containers.get(entity)?.has(...components) ?? false;
  }

  // ====== Systems ======

  public addSystem(...systems: System[]) {
    for (const system of systems) {
      this.systems.set(system, new Set<Entity>());
    }
  }

  public removeSystem(system: System) {
    this.systems.delete(system);
  }

  // ====== Other ======

  private lastUpdate = 0;
  public update() {
    const delta = (performance.now() - this.lastUpdate) / 1000;

    for (const [system, entities] of this.systems) {
      system.update(this, entities, delta);
    }

    this.lastUpdate = performance.now();
  }

  protected updateEntity(entity: Entity) {
    const container = this.containers.get(entity);
    if (!container) return;

    for (const [system, entities] of this.systems) {
      if (container.has(...system.signature)) {
        entities.add(entity);
      } else {
        entities.delete(entity);
      }
    }
  }
}
