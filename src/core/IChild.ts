/// <reference path="Game.ts" />

module Kiwi {

    export interface IChild {
        render(camera: Kiwi.Camera);
        dirty(value?: bool): bool;
        update();
        childType(): number;
        parent: Group;
        id: string;
        name: string;
        modify(type: number, parent);
        _changedPosition(group: Kiwi.Group, index: number);
        exists(value?: bool): bool;
        active(value?: bool): bool;
    }

}