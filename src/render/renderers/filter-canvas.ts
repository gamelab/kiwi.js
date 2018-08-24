/**
@module Kiwi
@submodule Renderers
**/

module Kiwi.Renderers {
    export class FilterCanvas {

        constructor () {
            /**
            Renders a filtered version of an input image.

            Filters are added to a `FilterBuffer` object,
            created by a `Bufferer`. They will not work on their own.

            This filter system is effectively a replacement of
            `Kiwi.Entity.render()`.
            It can run a wide variety of image manipulation algorithms.

            This class should be extended and used as an example
            for developing other canvas filters. It contains useful utilities.

            CocoonJS note: This platform is not capable of using
            `globalCompositeOperation` modes. All other clients support them.
            As best practice, avoid creating canvas filters that rely on
            `globalCompositeOperation`,
            and instead use direct pixel manipulation
            via `ImageData` properties.

            @class FilterCanvas
            @namespace Kiwi.Renderers
            @constructor
            **/

            this.active = true;
        }

        /**
        Whether this filter should be processed
        @property active
        @type boolean
        @default true
        **/
        active: boolean;

        /**
        Shorthand name to identify the filter
        @property name
        @type string
        @default "FilterCanvas"
        @static
        **/
        static name: string = "FilterCanvas";

        clear ( filterBuffer: Kiwi.GameObjects.FilterBuffer ) {
            /**
            Clear the output canvas.
            @method clear
            @param filterBuffer {Kiwi.GameObjects.FilterBuffer}
            **/

            filterBuffer.ctxOutput.clearRect(
                0, 0,
                filterBuffer.canvasOutput.width,
                filterBuffer.canvasOutput.height );
        }

        render ( filterBuffer: Kiwi.GameObjects.FilterBuffer ) {
            /**
            Render the `input` canvas to the `output` canvas.
            This is not proportional; corners map to corners.

            @method render
            @param filterBuffer {Kiwi.GameObjects.FilterBuffer}
            **/

            this.clear( filterBuffer );

            filterBuffer.ctxOutput.drawImage(
                filterBuffer.canvasInput,
                0, 0,
                filterBuffer.canvasInput.width,
                filterBuffer.canvasInput.height,
                0, 0,
                filterBuffer.canvasOutput.width,
                filterBuffer.canvasOutput.height );
        }
    }
}
