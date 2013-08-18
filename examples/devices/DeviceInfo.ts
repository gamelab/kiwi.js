/// <reference path="../../src/Kiwi.ts" />

class DeviceInfo extends Kiwi.State {

    constructor() {
        super('DeviceInfo');
    }

    init() {

    }

    preload() {

       

    }

    
    

    create() {


        var pre: HTMLElement = document.createElement("pre");
        pre.style.position = "absolute";
        pre.style.top = "0px";
        pre.style.left = "0px";
        pre.style.display = "block";
        pre.style.backgroundColor = "black";
        document.body.appendChild(pre);
        pre.innerHTML = Kiwi.DEVICE.getAll();    
       
    }

    

    update() {
        super.update();
    }

}
