/// <reference path="Game.ts" />

module Kiwi {

    export interface IChild {
        render(camera: Kiwi.Camera);
        update();
        childType(): number;
        id: string;
        name: string;
        components: Kiwi.ComponentManager;
        dirty: bool;
        active: bool;
        exists: bool;
        willRender: bool;
        transform: Kiwi.Geom.Transform;
        destroy(...params:any[]);
    }

}