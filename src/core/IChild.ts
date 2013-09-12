/**
* Module - Kiwi (Core)
* @module Kiwi
* 
*/

module Kiwi {
    
    /**
    * 
    * @class IChild
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