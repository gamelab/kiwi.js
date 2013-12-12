/**
* 
* @module Kiwi
* 
*/

module Kiwi {
    
    /**
    * A IChild is an Interface (defined as a class as the documentation does not support Interfaces just yet),
    * which outlines the methods/properties that objects which are intended to be added as a child of a Stage or Group must have in order to work.
    * 
    * @class IChild
    * @namespace Kiwi
    */
    export interface IChild {
        render(camera:Kiwi.Camera);
        update();
        childType(): number;
        id: string;
        name: string;
        game: Kiwi.Game;
        state: Kiwi.State;
        components: Kiwi.ComponentManager;
        dirty: boolean;
        active: boolean;
        exists: boolean;
        willRender: boolean;
        parent: Kiwi.Group;
        transform: Kiwi.Geom.Transform;
        x: number;
        y: number;
        rotation: number;
        scaleX: number;
        scaleY: number;
        destroy(...params: any[]);
    }

}