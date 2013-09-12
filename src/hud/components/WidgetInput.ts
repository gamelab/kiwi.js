
module Kiwi.HUD.Components {

    export class WidgetInput extends Component {

        /*
        * 
        * @constructor
        * @param {Kiwi.Game} game
        * @param {Kiwi.Components.Bounds} bounds
        */
        constructor(game: Kiwi.Game/*, bounds: Kiwi.Components.Bounds*/) {

            super(null, 'WidgetInput');
            
            this.game = game;

            //  Signals
            this.inputEntered = new Kiwi.Signal();
            this.inputLeft = new Kiwi.Signal();
            this.inputOnDown = new Kiwi.Signal();
            this.inputOnRelease = new Kiwi.Signal();

            //  Properties
            //this._bounds = bounds;
            this.pointDown = new Kiwi.Geom.Point();

            this.distance = new Kiwi.Geom.Point();
            this.withinBounds = false;
            this.outsideBounds = true;
            this.isUp = true;
            this.isDown = false;
        
        }

        /*
        * reutrns the object type
        * @method objType
        */
        public objType():string {
            return "Input";
        }

        public game: Kiwi.Game;
        //  Subscribe to these Signals to receive updates

        //  When the input enters the bounds of this entity
        public inputEntered: Kiwi.Signal;

        //  When the input leaves the bounds of this entity
        public inputLeft: Kiwi.Signal;

        //  When the input is within the bounds of this entity AND pressed down
        public inputOnDown: Kiwi.Signal;

        //  When the input is within the bounds of this entity AND is released, having previously been pressed down on this entity
        public inputOnRelease: Kiwi.Signal;

        //  Distance from the top left corner of the entity bounds to the current input position
        public distance: Kiwi.Geom.Point;

        public isDown: boolean;
        public isUp: boolean;
        public withinBounds: boolean;
        public outsideBounds: boolean;

        public pointDown: Kiwi.Geom.Point;
        //private _bounds: Kiwi.Components.Bounds;

        //  Need to add a click timer?

        public update() {
            /*
            //  Is the input within the bounds now?
            if (this._bounds.pointWithin(this.game.input.position))
            {
                this.distance.x = this.game.input.position.x - this._bounds.getRect().left;
                this.distance.y = this.game.input.position.y - this._bounds.getRect().top;

                //  Has it just moved inside?
                if (this.withinBounds === false)
                {
                    this.withinBounds = true;
                    this.outsideBounds = false;
                    this.inputEntered.dispatch( this.distance.x, this.distance.y);
                }
            }
            else
            {
                //  It's outside the bounds now, was it previously in?
                if (this.withinBounds === true)
                {
                    this.withinBounds = false;
                    this.outsideBounds = true;
                    this.inputLeft.dispatch();
                }
            }

            //  Input is down (click/touch)
            if (this.game.input.isDown === true)
            {
                //  Within bounds?
                if (this.withinBounds === true && this.isDown === false)
                {
                    this.isDown = true;
                    this.isUp = false;
                    this.pointDown.copyFrom(this.distance);
                    this.inputOnDown.dispatch(this.pointDown.x, this.pointDown.y);
                }

            }
            else
            {
                if (this.isDown === true)
                {
                    this.isDown = false;
                    this.isUp = true;
                    this.inputOnRelease.dispatch();
                }
            }*/
            
        }

        /*
         * Returns a string representation of this object.
         * @method toString
         * @return {string} A string representation of this object.
         */
        public get toString(): string {

            return '[{WidgetInput (x=' + this.withinBounds + ')}]';

        }

    }

}


