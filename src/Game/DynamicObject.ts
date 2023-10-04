import { Rectangle } from "pixi.js";
import { IHitbox } from "./IHitbox";
import { PhysicsContainer } from "./PhysicsContainer";

export abstract class DynamicObject extends PhysicsContainer implements IHitbox{
    
    public abstract isFloor : Boolean;
    
    public abstract getHitbox(): Rectangle;
}