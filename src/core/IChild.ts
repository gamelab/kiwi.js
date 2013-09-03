/// <reference path="Game.ts" />

module Kiwi {

    export interface IChild {
        render(camera: Kiwi.Camera);
        update();
        childType(): number;
        id: string;
        name: string;
        components: Kiwi.ComponentManager;
        modify(type: number, parent);
        _changedPosition(group: Kiwi.Group, index: number); 
        dirty: bool;
        active: bool;
        exists: bool;
        willRender: bool;
        transform: Kiwi.Geom.Transform;
        
    }

}