/// <reference path="../core/Game.ts" />
/// <reference path="../core/Entity.ts" />
/// <reference path="../core/State.ts" />
/// <reference path="../components/Position.ts" />

/*
 *	Kiwi - GameObjects - MouseDebug
 *				
 *	@desc		A helper Game Object that attaches to your mouse location and displays coordinate read-outs
 *
 *	@version	1.0 - 14th March 2013
 *
 *	@author 	Richard Davey
 *
 *	@url		http://www.kiwijs.org
 *
*/

module Kiwi.GameObjects {

    export class MouseDebug extends Kiwi.Entity {

        constructor(x: number = 0, y: number = 0, followMouse: bool = false) {

            super();

            //  Properties

            this.position = new Kiwi.Components.Position(x, y);
            this._followMouse = followMouse;

            //  Signals

            this.onAddedToLayer.add(this._onAddedToLayer, this);
            this.position.updated.add(this._updatePosition, this);

            klog.info('Created MouseDebug Game Object');

        }

        public objType() {
            return "MouseDebug";
        }

        public position: Kiwi.Components.Position;

        private _followMouse: bool;
        //private _

        private _updatePosition(x: number, y: number) {

            this.position.addStyleUpdates(this);

        }

        private _onAddedToLayer(layer: Kiwi.Layer): bool {

            klog.info('MouseDebug added to Layer');

           

            //this.button = <HTMLButtonElement> this.domElement.element;
            //this.button.textContent = this._tempText;

            this.position.addStyleUpdates(this);

            //if (this.game.device.css3D === false)
            //{
            //    this.domElement.element.style.left = this.position.x() + 'px';
            //    this.domElement.element.style.top = this.position.y() + 'px';
            //}
            //else
            //{
            //    this._transformCSS = 'translate3d(' + this.position.x() + 'px, ' + this.position.y() + 'px, 0px)';
            //    this.domElement.element.style.transform = this._transformCSS;
            //    this.domElement.element.style['-o-transform'] = this._transformCSS;
            //    this.domElement.element.style['-ms-transform'] = this._transformCSS;
            //    this.domElement.element.style['-moz-transform'] = this._transformCSS;
            //    this.domElement.element.style['-webkit-transform'] = this._transformCSS;
            //}

            return true;

        }

        public render(camera:Kiwi.Camera) {

            super.render(camera);

          
                this.layer.canvas.context.fillStyle = 'rgba(0, 114, 188, 0.7)';
                this.layer.canvas.context.fillRect(this.position.x(), this.position.y(), 200, 100);
                this.layer.canvas.context.font = '12px Arial';
                this.layer.canvas.context.fillStyle = '#ffffff';
                this.layer.canvas.context.fillText('X: ' + this.game.input.x(), this.position.x(), this.position.y() + 10);
                this.layer.canvas.context.fillText('Y: ' + this.game.input.y(), this.position.x(), this.position.y() + 24);
          

        }

    }

}