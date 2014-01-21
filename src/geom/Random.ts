

// Module
module Kiwi.Geom {

    // Class
    export class Random {
      
        public static randomPointCirclePerimeter(): Kiwi.Geom.Point {
            var t = Math.random() * Math.PI * 2;
            return new Kiwi.Geom.Point(Math.cos(t), Math.sin(t));
        }

        public static randomPointCircle(): Kiwi.Geom.Point {
            var t = Math.random() * Math.PI * 2;
            var u = Math.random() + Math.random();
            var r = (u > 1) ? 2 - u : u;
            return new Kiwi.Geom.Point(r * Math.cos(t), r * Math.sin(t));
        }

        public static randomPointSquare(): Kiwi.Geom.Point {
            return new Kiwi.Geom.Point(Math.random() - 0.5, Math.random() - 0.5);

        }

        public static randomPointSquarePerimeter() {
            var t = Math.random() * 4;

            if (t < 1) return new Kiwi.Geom.Point(t - 0.5, -0.5);
            if (t < 2) return new Kiwi.Geom.Point(0.5, t - 1.5);
            if (t < 3) return new Kiwi.Geom.Point(t - 2.5, 0.5);

            return new Kiwi.Geom.Point(-0.5, t - 3.5);

        }
    }

}
