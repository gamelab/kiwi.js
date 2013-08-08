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
        constructor(game: Kiwi.Game) {

            klog.info('Layer Manager created');

            this._game = game;

          

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

            this.createCanvasLayer(null, 'default');
     
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

            return this.create( state, name);

        }

        //  If you don't pass a State then the Layer will NOT be automatically removed on State change

     
        /**
		* 
        * @method create
        * @param {Number} type
        * @param {Kiwi.State} state
        * @param {String} name
        * @param {Number} size
        * @return {Kiwi.Layer}
    	*/
        private create(state: Kiwi.State = null, name: string = '', size:number = 100): Kiwi.Layer {

           

            var newLayer: Kiwi.Layer = new Kiwi.Layer(this._game, this._nextLayerID,  name, size);

            newLayer.parent = state;

            this.layers.push(newLayer);

            //  Send Layer an added call

            this._nextLayerID++;

            this.currentLayer = newLayer;

            return newLayer;

        }

        /*
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
        */
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
