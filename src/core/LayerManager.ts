/// <reference path="Game.ts" />
/// <reference path="Layer.ts" />

/**
 *	Kiwi - Core - LayerManager
 *
 *	@desc 		
 *
 *	@version 	1.0 - 11th January 2013
 *
 *	@author 	Richard Davey
 *
 *	@url 		http://www.kiwijs.org
 */

module Kiwi {

    export class LayerManager {

        /**
		* 
        * @constructor
        * @param {Kiwi.Game} game
        * @param {Number} defaultType
        * @return {Kiwi.LayerManager}
    	*/
        constructor(game: Kiwi.Game, defaultType: number) {

            klog.info('Layer Manager created');

            this._game = game;

            this._defaultType = defaultType;

            this.layers = [];

            this._nextLayerID = 0;

        }

        public objType() {
            return "LayerManager";
        }

        /**
		* 
        * @property _game
        * @type Kiwi.Game
        * @private
    	*/
        private _game: Kiwi.Game;

        /**
		* 
        * @property _defaultType
        * @type Number
        * @private
    	*/
        private _defaultType: number;

        /**
		* 
        * @property _layers
        * @type Array
        * @private
    	*/
        public layers: Kiwi.Layer[];

        /**
		* 
        * @property _nextLayerID
        * @type Number
        * @private
    	*/
        private _nextLayerID: number;

        /**
		* 
        * @property defaultLayer
        * @type Kiwi.Layer
    	*/
        public defaultLayer: Kiwi.Layer;

        /**
		* 
        * @property currentLayer
        * @type Kiwi.Layer
    	*/
        public currentLayer: Kiwi.Layer;

        /**
		* 
        * @method boot
    	*/
        public boot() {

            if (this._defaultType === Kiwi.TYPE_CANVAS)
            {
                this.createCanvasLayer(null, 'default');
            }
            else if (this._defaultType === Kiwi.TYPE_DOM)
            {
                this.createDOMLayer(null, 'default');
            }

            this.defaultLayer = this.layers[0];

        }

        //  If you don't pass a State then the Layer will NOT be automatically removed on State change

        /**
		* 
        * @method createCanvasLayer
        * @param {Kiwi.State} state
        * @param {String} name
        * @param {Number} size
        * @return {Kiwi.Layer}
    	*/
        public createCanvasLayer(state: Kiwi.State = null, name: string = '', size:number = 100): Kiwi.Layer {

            klog.info('Creating Canvas Layer');

            return this.create(Kiwi.TYPE_CANVAS, state, name);

        }

        //  If you don't pass a State then the Layer will NOT be automatically removed on State change

        /**
		* 
        * @method createDOMLayer
        * @param {Kiwi.State} state
        * @param {String} name
        * @param {Number} size
        * @return {Kiwi.Layer}
    	*/
        public createDOMLayer(state: Kiwi.State = null, name: string = '', size:number = 100): Kiwi.Layer {

            klog.info('Creating DOM Layer');

            return this.create(Kiwi.TYPE_DOM, state, name);

        }

        /**
		* 
        * @method create
        * @param {Number} type
        * @param {Kiwi.State} state
        * @param {String} name
        * @param {Number} size
        * @return {Kiwi.Layer}
    	*/
        private create(type: number, state: Kiwi.State = null, name: string = '', size:number = 100): Kiwi.Layer {

            if (this._game.cameras.multiCameraMode() == true && type === Kiwi.TYPE_DOM) {
                klog.error("Cannot create DOM layers in multicamera mode");
                return null;
            }

            var newLayer: Kiwi.Layer = new Kiwi.Layer(this._game, this._nextLayerID, type, name, size);

            newLayer.parent = state;

            this.layers.push(newLayer);

            //  Send Layer an added call

            this._nextLayerID++;

            this.currentLayer = newLayer;

            return newLayer;

        }

        public offsetCanvasLayers(x: number, y: number) {
            var domContainer: HTMLDivElement;
            for (var i = 0; i < this.layers.length; i++) {
                if (this.layers[i].type == Kiwi.TYPE_CANVAS) {
                    domContainer = <HTMLDivElement>this.layers[i].domContainer;

                    domContainer.style.left = x + "px";
                    domContainer.style.top = y + "px";
                }
            }
        }

        /**
		* 
        * @method remove
        * @param {Kiwi.Layer} layer
    	*/
        public remove(layer: Kiwi.Layer) {

            klog.info('Remove layer');

            var i = this.layers.indexOf(layer);

            if (i !== -1)
            {
                //  Send Layer a killed call
                this.layers.splice(i, 1);
            }

        }

        /**
		* 
        * @method update
    	*/
        public update() {

            if (this.layers.length === 0)
            {
                return false;
            }

            for (var i = 0; i < this.layers.length; i++)
            {
                this.layers[i].update();
            }

        }

        /**
		* 
        * @method render
    	*/
        public render(camera:Kiwi.Camera) {

            if (this.layers.length === 0)
            {
                return false;
            }

            for (var i = 0; i < this.layers.length; i++)
            {
                this.layers[i].render(camera);
            }

        }

        /**
		* 
        * @method removeStateLayers
    	*/
        public removeStateLayers() {

            // TODO
            klog.info('TODO removeStateLayers');

        }

        /**
		* 
        * @method removeAll
    	*/
        public removeAll() {

            this.layers.length = 0;
            klog.info('TODO removeAll');

        }

    }
}
