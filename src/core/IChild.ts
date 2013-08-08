/// <reference path="Game.ts" />

module Kiwi {

    export interface IChild {
        render(camera: Kiwi.Camera);
        dirty(value?: bool): bool;
        update();
        childType(): number;
        //parent: Group;
        id: string;
        name: string;
        components: Kiwi.ComponentManager;
        modify(type: number, parent);
        _changedPosition(group: Kiwi.Group, index: number);
        exists(value?: bool): bool;
        active(value?: bool): bool;
        willRender(value?:bool): bool;
        transform: Kiwi.Geom.Transform;
        
    }

}