/// <reference path="Game.ts" />

module Kiwi {

    export interface IChild {
        render(camera: Kiwi.Camera);
        update();
        childType(): number;
        //parent: Group;
        id: string;
        name: string;
        components: Kiwi.ComponentManager;
        modify(type: number, parent);
        _changedPosition(group: Kiwi.Group, index: number);
        //exists(value?: bool): bool;
        //active(value?: bool): bool;
        //dirty(value?: bool): bool;
        //willRender(value?:bool): bool;
        dirty: bool;
        active: bool;
        exists: bool;
        willRender: bool;
        transform: Kiwi.Geom.Transform;
        
    }

}