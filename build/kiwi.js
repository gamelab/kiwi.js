var Kiwi;
(function (Kiwi) {
    (function (Animation) {
        (function (Tweens) {
            var Manager = (function () {
                function Manager(game) {
                    this._game = game;
                    this._tweens = [];
                }
                Manager.prototype.objType = function () {
                    return "Manager";
                };

                Manager.prototype.getAll = function () {
                    return this._tweens;
                };

                Manager.prototype.removeAll = function () {
                    this._tweens.length = 0;
                };

                Manager.prototype.create = function (object) {
                    return new Kiwi.Animation.Tween(object, this._game);
                };

                Manager.prototype.add = function (tween) {
                    tween.setParent(this._game);

                    this._tweens.push(tween);

                    return tween;
                };

                Manager.prototype.remove = function (tween) {
                    var i = this._tweens.indexOf(tween);

                    if (i !== -1) {
                        this._tweens.splice(i, 1);
                    }
                };

                Manager.prototype.update = function () {
                    if (this._tweens.length === 0) {
                        return false;
                    }

                    var i = 0;
                    var numTweens = this._tweens.length;

                    while (i < numTweens) {
                        if (this._tweens[i].update(this._game.time.now())) {
                            i++;
                        } else {
                            this._tweens.splice(i, 1);
                            numTweens--;
                        }
                    }

                    return true;
                };
                return Manager;
            })();
            Tweens.Manager = Manager;
        })(Animation.Tweens || (Animation.Tweens = {}));
        var Tweens = Animation.Tweens;
    })(Kiwi.Animation || (Kiwi.Animation = {}));
    var Animation = Kiwi.Animation;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Animation) {
        (function (Tweens) {
            (function (Easing) {
                var Back = (function () {
                    function Back() {
                    }
                    Back.prototype.objType = function () {
                        return "Back";
                    };

                    Back.In = function (k) {
                        var s = 1.70158;
                        return k * k * ((s + 1) * k - s);
                    };

                    Back.Out = function (k) {
                        var s = 1.70158;
                        return --k * k * ((s + 1) * k + s) + 1;
                    };

                    Back.InOut = function (k) {
                        var s = 1.70158 * 1.525;
                        if ((k *= 2) < 1)
                            return 0.5 * (k * k * ((s + 1) * k - s));
                        return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
                    };
                    return Back;
                })();
                Easing.Back = Back;
            })(Tweens.Easing || (Tweens.Easing = {}));
            var Easing = Tweens.Easing;
        })(Animation.Tweens || (Animation.Tweens = {}));
        var Tweens = Animation.Tweens;
    })(Kiwi.Animation || (Kiwi.Animation = {}));
    var Animation = Kiwi.Animation;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Animation) {
        (function (Tweens) {
            (function (Easing) {
                var Bounce = (function () {
                    function Bounce() {
                    }
                    Bounce.prototype.objType = function () {
                        return "Bounce";
                    };

                    Bounce.In = function (k) {
                        return 1 - Kiwi.Animation.Tweens.Easing.Bounce.Out(1 - k);
                    };

                    Bounce.Out = function (k) {
                        if (k < (1 / 2.75)) {
                            return 7.5625 * k * k;
                        } else if (k < (2 / 2.75)) {
                            return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
                        } else if (k < (2.5 / 2.75)) {
                            return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
                        } else {
                            return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
                        }
                    };

                    Bounce.InOut = function (k) {
                        if (k < 0.5)
                            return Kiwi.Animation.Tweens.Easing.Bounce.In(k * 2) * 0.5;
                        return Kiwi.Animation.Tweens.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
                    };
                    return Bounce;
                })();
                Easing.Bounce = Bounce;
            })(Tweens.Easing || (Tweens.Easing = {}));
            var Easing = Tweens.Easing;
        })(Animation.Tweens || (Animation.Tweens = {}));
        var Tweens = Animation.Tweens;
    })(Kiwi.Animation || (Kiwi.Animation = {}));
    var Animation = Kiwi.Animation;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Animation) {
        (function (Tweens) {
            (function (Easing) {
                var Circular = (function () {
                    function Circular() {
                    }
                    Circular.prototype.objType = function () {
                        return "Circular";
                    };

                    Circular.In = function (k) {
                        return 1 - Math.sqrt(1 - k * k);
                    };

                    Circular.Out = function (k) {
                        return Math.sqrt(1 - (--k * k));
                    };

                    Circular.InOut = function (k) {
                        if ((k *= 2) < 1)
                            return -0.5 * (Math.sqrt(1 - k * k) - 1);
                        return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
                    };
                    return Circular;
                })();
                Easing.Circular = Circular;
            })(Tweens.Easing || (Tweens.Easing = {}));
            var Easing = Tweens.Easing;
        })(Animation.Tweens || (Animation.Tweens = {}));
        var Tweens = Animation.Tweens;
    })(Kiwi.Animation || (Kiwi.Animation = {}));
    var Animation = Kiwi.Animation;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Animation) {
        (function (Tweens) {
            (function (Easing) {
                var Cubic = (function () {
                    function Cubic() {
                    }
                    Cubic.prototype.objType = function () {
                        return "Cubic";
                    };

                    Cubic.In = function (k) {
                        return k * k * k;
                    };

                    Cubic.Out = function (k) {
                        return --k * k * k + 1;
                    };

                    Cubic.InOut = function (k) {
                        if ((k *= 2) < 1)
                            return 0.5 * k * k * k;
                        return 0.5 * ((k -= 2) * k * k + 2);
                    };
                    return Cubic;
                })();
                Easing.Cubic = Cubic;
            })(Tweens.Easing || (Tweens.Easing = {}));
            var Easing = Tweens.Easing;
        })(Animation.Tweens || (Animation.Tweens = {}));
        var Tweens = Animation.Tweens;
    })(Kiwi.Animation || (Kiwi.Animation = {}));
    var Animation = Kiwi.Animation;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Animation) {
        (function (Tweens) {
            (function (Easing) {
                var Elastic = (function () {
                    function Elastic() {
                    }
                    Elastic.prototype.objType = function () {
                        return "Elastic";
                    };

                    Elastic.In = function (k) {
                        var s, a = 0.1, p = 0.4;
                        if (k === 0)
                            return 0;
                        if (k === 1)
                            return 1;
                        if (!a || a < 1) {
                            a = 1;
                            s = p / 4;
                        } else
                            s = p * Math.asin(1 / a) / (2 * Math.PI);
                        return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
                    };

                    Elastic.Out = function (k) {
                        var s, a = 0.1, p = 0.4;
                        if (k === 0)
                            return 0;
                        if (k === 1)
                            return 1;
                        if (!a || a < 1) {
                            a = 1;
                            s = p / 4;
                        } else
                            s = p * Math.asin(1 / a) / (2 * Math.PI);
                        return (a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
                    };

                    Elastic.InOut = function (k) {
                        var s, a = 0.1, p = 0.4;
                        if (k === 0)
                            return 0;
                        if (k === 1)
                            return 1;
                        if (!a || a < 1) {
                            a = 1;
                            s = p / 4;
                        } else
                            s = p * Math.asin(1 / a) / (2 * Math.PI);
                        if ((k *= 2) < 1)
                            return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
                        return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
                    };
                    return Elastic;
                })();
                Easing.Elastic = Elastic;
            })(Tweens.Easing || (Tweens.Easing = {}));
            var Easing = Tweens.Easing;
        })(Animation.Tweens || (Animation.Tweens = {}));
        var Tweens = Animation.Tweens;
    })(Kiwi.Animation || (Kiwi.Animation = {}));
    var Animation = Kiwi.Animation;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Animation) {
        (function (Tweens) {
            (function (Easing) {
                var Exponential = (function () {
                    function Exponential() {
                    }
                    Exponential.prototype.objType = function () {
                        return "Exponential";
                    };

                    Exponential.In = function (k) {
                        return k === 0 ? 0 : Math.pow(1024, k - 1);
                    };

                    Exponential.Out = function (k) {
                        return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
                    };

                    Exponential.InOut = function (k) {
                        if (k === 0)
                            return 0;
                        if (k === 1)
                            return 1;
                        if ((k *= 2) < 1)
                            return 0.5 * Math.pow(1024, k - 1);
                        return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
                    };
                    return Exponential;
                })();
                Easing.Exponential = Exponential;
            })(Tweens.Easing || (Tweens.Easing = {}));
            var Easing = Tweens.Easing;
        })(Animation.Tweens || (Animation.Tweens = {}));
        var Tweens = Animation.Tweens;
    })(Kiwi.Animation || (Kiwi.Animation = {}));
    var Animation = Kiwi.Animation;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Animation) {
        (function (Tweens) {
            (function (Easing) {
                var Linear = (function () {
                    function Linear() {
                    }
                    Linear.prototype.objType = function () {
                        return "Linear";
                    };

                    Linear.None = function (k) {
                        return k;
                    };
                    return Linear;
                })();
                Easing.Linear = Linear;
            })(Tweens.Easing || (Tweens.Easing = {}));
            var Easing = Tweens.Easing;
        })(Animation.Tweens || (Animation.Tweens = {}));
        var Tweens = Animation.Tweens;
    })(Kiwi.Animation || (Kiwi.Animation = {}));
    var Animation = Kiwi.Animation;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Animation) {
        (function (Tweens) {
            (function (Easing) {
                var Quadratic = (function () {
                    function Quadratic() {
                    }
                    Quadratic.prototype.objType = function () {
                        return "Quadratic";
                    };

                    Quadratic.In = function (k) {
                        return k * k;
                    };

                    Quadratic.Out = function (k) {
                        return k * (2 - k);
                    };

                    Quadratic.InOut = function (k) {
                        if ((k *= 2) < 1)
                            return 0.5 * k * k;
                        return -0.5 * (--k * (k - 2) - 1);
                    };
                    return Quadratic;
                })();
                Easing.Quadratic = Quadratic;
            })(Tweens.Easing || (Tweens.Easing = {}));
            var Easing = Tweens.Easing;
        })(Animation.Tweens || (Animation.Tweens = {}));
        var Tweens = Animation.Tweens;
    })(Kiwi.Animation || (Kiwi.Animation = {}));
    var Animation = Kiwi.Animation;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Animation) {
        (function (Tweens) {
            (function (Easing) {
                var Quartic = (function () {
                    function Quartic() {
                    }
                    Quartic.prototype.objType = function () {
                        return "Quartic";
                    };

                    Quartic.In = function (k) {
                        return k * k * k * k;
                    };

                    Quartic.Out = function (k) {
                        return 1 - (--k * k * k * k);
                    };

                    Quartic.InOut = function (k) {
                        if ((k *= 2) < 1)
                            return 0.5 * k * k * k * k;
                        return -0.5 * ((k -= 2) * k * k * k - 2);
                    };
                    return Quartic;
                })();
                Easing.Quartic = Quartic;
            })(Tweens.Easing || (Tweens.Easing = {}));
            var Easing = Tweens.Easing;
        })(Animation.Tweens || (Animation.Tweens = {}));
        var Tweens = Animation.Tweens;
    })(Kiwi.Animation || (Kiwi.Animation = {}));
    var Animation = Kiwi.Animation;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Animation) {
        (function (Tweens) {
            (function (Easing) {
                var Quintic = (function () {
                    function Quintic() {
                    }
                    Quintic.prototype.objType = function () {
                        return "Quintic";
                    };

                    Quintic.In = function (k) {
                        return k * k * k * k * k;
                    };

                    Quintic.Out = function (k) {
                        return --k * k * k * k * k + 1;
                    };

                    Quintic.InOut = function (k) {
                        if ((k *= 2) < 1)
                            return 0.5 * k * k * k * k * k;
                        return 0.5 * ((k -= 2) * k * k * k * k + 2);
                    };
                    return Quintic;
                })();
                Easing.Quintic = Quintic;
            })(Tweens.Easing || (Tweens.Easing = {}));
            var Easing = Tweens.Easing;
        })(Animation.Tweens || (Animation.Tweens = {}));
        var Tweens = Animation.Tweens;
    })(Kiwi.Animation || (Kiwi.Animation = {}));
    var Animation = Kiwi.Animation;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Animation) {
        (function (Tweens) {
            (function (Easing) {
                var Sinusoidal = (function () {
                    function Sinusoidal() {
                    }
                    Sinusoidal.prototype.objType = function () {
                        return "Sinusoidal";
                    };

                    Sinusoidal.In = function (k) {
                        return 1 - Math.cos(k * Math.PI / 2);
                    };

                    Sinusoidal.Out = function (k) {
                        return Math.sin(k * Math.PI / 2);
                    };

                    Sinusoidal.InOut = function (k) {
                        return 0.5 * (1 - Math.cos(Math.PI * k));
                    };
                    return Sinusoidal;
                })();
                Easing.Sinusoidal = Sinusoidal;
            })(Tweens.Easing || (Tweens.Easing = {}));
            var Easing = Tweens.Easing;
        })(Animation.Tweens || (Animation.Tweens = {}));
        var Tweens = Animation.Tweens;
    })(Kiwi.Animation || (Kiwi.Animation = {}));
    var Animation = Kiwi.Animation;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Animation) {
        var Tween = (function () {
            function Tween(object, game) {
                if (typeof game === "undefined") { game = null; }
                this._game = null;
                this._manager = null;
                this._object = null;
                this._valuesStart = {};
                this._valuesEnd = {};
                this._duration = 1000;
                this._delayTime = 0;
                this._startTime = null;
                this._easingFunction = Kiwi.Animation.Tweens.Easing.Linear.None;
                this._interpolationFunction = Kiwi.Utils.GameMath.linearInterpolation;
                this._chainedTweens = [];
                this._onStartCallback = null;
                this._onStartContext = null;
                this._onStartCallbackFired = false;
                this._onUpdateCallback = null;
                this._onUpdateContext = null;
                this._onCompleteCallback = null;
                this._onCompleteCalled = false;
                this.isRunning = false;
                this._object = object;

                if (game !== null) {
                    this._game = game;
                    this._manager = this._game.tweens;
                }

                this.isRunning = false;
            }
            Tween.prototype.objType = function () {
                return "Tween";
            };

            Tween.prototype.to = function (properties, duration, ease, autoStart) {
                if (typeof duration === "undefined") { duration = 1000; }
                if (typeof ease === "undefined") { ease = null; }
                if (typeof autoStart === "undefined") { autoStart = false; }
                this._duration = duration;

                this._valuesEnd = properties;

                if (ease !== null) {
                    this._easingFunction = ease;
                }

                if (autoStart === true) {
                    return this.start();
                } else {
                    return this;
                }
            };

            Tween.prototype.start = function () {
                if (this._game === null || this._object === null) {
                    return;
                }

                this.isRunning = true;

                this._manager.add(this);

                this._onStartCallbackFired = false;

                this._startTime = this._game.time.now() + this._delayTime;

                for (var property in this._valuesEnd) {
                    if (this._object[property] === null || !(property in this._object)) {
                        continue;
                    }

                    if (this._valuesEnd[property] instanceof Array) {
                        if (this._valuesEnd[property].length === 0) {
                            continue;
                        }

                        this._valuesEnd[property] = [this._object[property]].concat(this._valuesEnd[property]);
                    }

                    if (typeof this._object[property] === 'function') {
                        this._valuesStart[property] = this._object[property]();
                    } else {
                        this._valuesStart[property] = this._object[property];
                    }
                }

                return this;
            };

            Tween.prototype.stop = function () {
                if (this._manager !== null) {
                    this._manager.remove(this);
                }

                this.isRunning = false;

                return this;
            };

            Tween.prototype.setParent = function (value) {
                this._game = value;
                this._manager = this._game.tweens;
            };

            Tween.prototype.delay = function (amount) {
                this._delayTime = amount;
                return this;
            };

            Tween.prototype.easing = function (easing) {
                this._easingFunction = easing;
                return this;
            };

            Tween.prototype.interpolation = function (interpolation) {
                this._interpolationFunction = interpolation;

                return this;
            };

            Tween.prototype.chain = function (tween) {
                this._chainedTweens.push(tween);
                return this;
            };

            Tween.prototype.onStart = function (callback, context) {
                this._onStartCallback = callback;
                this._onStartContext = context;
                return this;
            };

            Tween.prototype.onUpdate = function (callback, context) {
                this._onUpdateCallback = callback;
                this._onUpdateContext = context;
                return this;
            };

            Tween.prototype.onComplete = function (callback, context) {
                this._onCompleteCallback = callback;
                this._onCompleteContext = context;

                return this;
            };

            Tween.prototype.update = function (time) {
                if (time < this._startTime) {
                    return true;
                }

                if (this._onStartCallbackFired === false) {
                    if (this._onStartCallback !== null) {
                        this._onStartCallback.call(this._onStartContext, this._object);
                    }

                    this._onStartCallbackFired = true;
                }

                var elapsed = (time - this._startTime) / this._duration;
                elapsed = elapsed > 1 ? 1 : elapsed;

                var value = this._easingFunction(elapsed);

                for (var property in this._valuesStart) {
                    var start = this._valuesStart[property];
                    var end = this._valuesEnd[property];

                    if (end instanceof Array) {
                        this._object[property] = this._interpolationFunction(end, value);
                    } else {
                        if (typeof this._object[property] === 'function') {
                            this._object[property](start + (end - start) * value);
                        } else {
                            this._object[property] = start + (end - start) * value;
                        }
                    }
                }

                if (this._onUpdateCallback !== null) {
                    this._onUpdateCallback.call(this._onUpdateContext, this._object, value);
                }

                if (elapsed == 1) {
                    this.isRunning = false;

                    if (this._onCompleteCallback !== null && this._onCompleteCalled == false) {
                        this._onCompleteCalled = true;
                        this._onCompleteCallback.call(this._onCompleteContext, this._object);
                    }

                    for (var i = 0; i < this._chainedTweens.length; i++) {
                        this._chainedTweens[i].start();
                    }

                    return false;
                }

                return true;
            };
            return Tween;
        })();
        Animation.Tween = Tween;
    })(Kiwi.Animation || (Kiwi.Animation = {}));
    var Animation = Kiwi.Animation;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    var Camera = (function () {
        function Camera(game, id, name, x, y, width, height) {
            this.fitToStage = true;
            this._game = game;
            this.id = id;
            this.name = name;

            this.width = width;
            this.height = height;
            this.transform = new Kiwi.Geom.Transform(x, y);
            this.transform.rotPointX = x + width / 2;
            this.transform.rotPointY = y + height / 2;

            this._game.stage.onResize.add(this._updatedStageSize, this);
            this._game.stage.onResize.add(this._updatedSize, this);
        }
        Camera.prototype.objType = function () {
            return "Camera";
        };

        Camera.prototype._updatedStageSize = function (width, height) {
            this.width = width;
            this.height = height;
        };

        Camera.prototype._updatedSize = function (width, height) {
        };

        Camera.prototype.visible = function (value) {
            if (typeof value === "undefined") { value = null; }
            return this._visible;
        };

        Camera.prototype.dirty = function (value) {
            if (typeof value === "undefined") { value = null; }
            if (value !== null) {
                this._dirty = value;
            }

            return this._dirty;
        };

        Camera.prototype.update = function () {
        };

        Camera.prototype.render = function () {
            this._game.renderer.render(this);
        };
        return Camera;
    })();
    Kiwi.Camera = Camera;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    var Game = (function () {
        function Game(domParent, name, state, options) {
            if (typeof domParent === "undefined") { domParent = ''; }
            if (typeof name === "undefined") { name = 'KiwiGame'; }
            if (typeof state === "undefined") { state = null; }
            var _this = this;
            this._startup = null;
            this.audio = null;
            this.browser = null;
            this.fileStore = null;
            this.input = null;
            this.cameras = null;
            this.loader = null;
            this.raf = null;
            this.stage = null;
            this.states = null;
            this.time = null;
            this.tweens = null;
            this.rnd = null;
            this._frameRate = 60;
            this._interval = 1000 / 60;
            this._delta = 0;
            options = options || {};
            this._debugOption = options.debug || Kiwi.DEBUG_ON;
            this._deviceTargetOption = options.deviceTarget || Kiwi.TARGET_BROWSER;
            this._renderOption = options.renderer || Kiwi.RENDERER_CANVAS;

            this.id = Kiwi.GameManager.register(this);

            this._startup = new Kiwi.System.Bootstrap();

            this.audio = new Kiwi.Sound.AudioManager(this);
            this.browser = new Kiwi.System.Browser(this);

            this.fileStore = new Kiwi.Files.FileStore(this);
            this.input = new Kiwi.Input.Manager(this);

            this.stage = new Kiwi.Stage(this, name);

            if (this._renderOption === Kiwi.RENDERER_CANVAS) {
                this.renderer = new Kiwi.Renderers.CanvasRenderer(this);
            } else {
                this.renderer = new Kiwi.Renderers.GLRenderer(this);
            }

            this.cameras = new Kiwi.CameraManager(this);
            if (this.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                this.huds = new Kiwi.HUD.HUDManager(this);
            }
            this.loader = new Kiwi.Files.Loader(this);

            this.states = new Kiwi.StateManager(this);
            this.rnd = new Kiwi.Utils.RandomDataGenerator([Date.now.toString()]);
            this.time = new Kiwi.Time.Manager(this);
            this.tweens = new Kiwi.Animation.Tweens.Manager(this);

            if (state !== null) {
                if (this.states.addState(state, true) === false) {
                    throw Error("Invalid State passed to Kiwi.Game");
                }
            }

            if (this.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                this._startup.boot(domParent, function () {
                    return _this.start();
                });
            } else {
                this.start();
            }
        }
        Object.defineProperty(Game.prototype, "renderOption", {
            get: function () {
                return this._renderOption;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Game.prototype, "deviceTargetOption", {
            get: function () {
                return this._deviceTargetOption;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Game.prototype, "debugOption", {
            get: function () {
                return this._debugOption;
            },
            enumerable: true,
            configurable: true
        });

        Game.prototype.objType = function () {
            return "Game";
        };

        Object.defineProperty(Game.prototype, "frameRate", {
            get: function () {
                return this._frameRate;
            },
            set: function (value) {
                if (value > 60)
                    value = 60;

                if (value >= 0) {
                    this._frameRate = value;
                    this._interval = 1000 / this._frameRate;
                }
            },
            enumerable: true,
            configurable: true
        });


        Game.prototype.start = function () {
            var _this = this;
            if (Kiwi.DEVICE === null) {
                Kiwi.DEVICE = new Kiwi.System.Device();
            }

            this.browser.boot();
            this.stage.boot(this._startup);
            this.renderer.boot();
            this.cameras.boot();
            if (this.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                this.huds.boot();
            }
            this.time.boot();
            this.audio.boot();
            this.input.boot();

            this.fileStore.boot();
            this.loader.boot();
            this.states.boot();

            this._lastTime = Date.now();

            this.raf = new Kiwi.Utils.RequestAnimationFrame(function () {
                return _this.loop();
            });
            this.raf.start();
        };

        Game.prototype.loop = function () {
            this._delta = this.raf.currentTime - this._lastTime;

            if (this._delta > this._interval) {
                this.time.update();
                this.audio.update();
                this.input.update();
                this.tweens.update();
                this.cameras.update();
                if (this.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                    this.huds.update();
                }
                this.states.update();

                this.cameras.render();
                if (this.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                    this.huds.render();
                }
                this.states.postRender();

                this._lastTime = this.raf.currentTime - (this._delta % this._interval);
            }
        };
        return Game;
    })();
    Kiwi.Game = Game;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    var CameraManager = (function () {
        function CameraManager(game) {
            this._game = game;
            this._cameras = [];
            this._nextCameraID = 0;
        }
        CameraManager.prototype.objType = function () {
            return "CameraManager";
        };

        CameraManager.prototype.boot = function () {
            this.create("defaultCamera", 0, 0, this._game.stage.width, this._game.stage.height);
            this.defaultCamera = this._cameras[0];
        };

        CameraManager.prototype.create = function (name, x, y, width, height) {
            var newCamera = new Kiwi.Camera(this._game, this._nextCameraID++, name, x, y, width, height);

            this._cameras.push(newCamera);

            return newCamera;
        };

        CameraManager.prototype.remove = function (camera) {
            var i = this._cameras.indexOf(camera);

            if (i !== -1) {
                this._cameras.splice(i, 1);
                return true;
            }

            return false;
        };

        CameraManager.prototype.update = function () {
            if (this._cameras.length === 0) {
                return false;
            }

            for (var i = 0; i < this._cameras.length; i++) {
                this._cameras[i].update();
            }
        };

        CameraManager.prototype.render = function () {
            if (this._cameras.length === 0) {
                return false;
            }

            for (var i = 0; i < this._cameras.length; i++) {
                this._cameras[i].render();
            }
        };

        CameraManager.prototype.removeAll = function () {
            this._cameras.length = 0;
        };
        return CameraManager;
    })();
    Kiwi.CameraManager = CameraManager;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    var Component = (function () {
        function Component(name) {
            this.state = null;
            this.group = null;
            this.entity = null;
            this.game = null;
            this.active = true;
            this.dirty = false;
            this.name = name;
            this.active = true;

            this.onAddedToState = new Kiwi.Signal();
            this.onAddedToGroup = new Kiwi.Signal();
            this.onAddedToEntity = new Kiwi.Signal();
            this.onRemovedFromState = new Kiwi.Signal();
            this.onRemovedFromGroup = new Kiwi.Signal();
            this.onRemovedFromEntity = new Kiwi.Signal();
        }
        Component.prototype.objType = function () {
            return "Component";
        };

        Component.prototype.modify = function (action, parent) {
            if (action === Kiwi.ADDED_TO_GROUP) {
                return this._addedToGroup(parent);
            } else if (action === Kiwi.ADDED_TO_STATE) {
                return this._addedToState(parent);
            } else if (action === Kiwi.ADDED_TO_ENTITY) {
                return this._addedToEntity(parent);
            } else if (action === Kiwi.REMOVED_FROM_GROUP) {
                return this._removedFromGroup(parent);
            } else if (action === Kiwi.REMOVED_FROM_STATE) {
                return this._removedFromState(parent);
            } else if (action === Kiwi.REMOVED_FROM_ENTITY) {
                return this._removedFromEntity(parent);
            }
        };

        Component.prototype._addedToState = function (state) {
            this.state = state;

            this.game = this.state.game;

            this.onAddedToState.dispatch(this, this.state);

            return true;
        };

        Component.prototype._removedFromState = function (state) {
            this.state = null;

            this.onAddedToState.dispatch(this, state);
        };

        Component.prototype._addedToGroup = function (group) {
            this.group = group;

            if (group.game !== null) {
                this.game = group.game;
            }

            this.onAddedToGroup.dispatch(this, group);
        };

        Component.prototype._removedFromGroup = function (group) {
            this.group = null;

            this.onRemovedFromGroup.dispatch(this, group);
        };

        Component.prototype._addedToEntity = function (entity) {
            this.entity = entity;

            if (this.entity.game !== null) {
                this.game = this.entity.game;
            }

            this.onAddedToEntity.dispatch(this, this.entity);

            return true;
        };

        Component.prototype._removedFromEntity = function (entity) {
            this.entity = null;

            this.onRemovedFromEntity.dispatch(this, entity);
        };

        Component.prototype.preUpdate = function () {
        };

        Component.prototype.update = function () {
        };

        Component.prototype.postUpdate = function () {
        };

        Component.prototype.preRender = function () {
        };

        Component.prototype.render = function () {
        };

        Component.prototype.postRender = function () {
        };

        Component.prototype.destroy = function () {
            this.active = false;

            this.entity = null;
            this.game = null;
            this.group = null;

            this.name = '';
        };
        return Component;
    })();
    Kiwi.Component = Component;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    var ComponentManager = (function () {
        function ComponentManager(type, owner) {
            this._components = {};

            this._type = type;
            this._owner = owner;
        }
        ComponentManager.prototype.objType = function () {
            return "ComponentManager";
        };

        ComponentManager.prototype.hasComponent = function (value) {
            if (this._components[value]) {
                return true;
            }

            return false;
        };

        ComponentManager.prototype.hasActiveComponent = function (value) {
            if (this._components[value] && this._components[value].active === true) {
                return true;
            }

            return false;
        };

        ComponentManager.prototype.getComponent = function (value) {
            if (this._components[value]) {
                return this._components[value];
            }

            return null;
        };

        ComponentManager.prototype.add = function (component) {
            this._components[component.name] = component;

            if (this._type === Kiwi.STATE) {
                component.modify(Kiwi.ADDED_TO_STATE, this._owner);
            } else if (this._type === Kiwi.LAYER) {
                component.modify(Kiwi.ADDED_TO_LAYER, this._owner);
            } else if (this._type === Kiwi.GROUP) {
                component.modify(Kiwi.ADDED_TO_GROUP, this._owner);
            } else if (this._type === Kiwi.ENTITY) {
                component.modify(Kiwi.ADDED_TO_ENTITY, this._owner);
            }

            return component;
        };

        ComponentManager.prototype.addBatch = function () {
            var paramsArr = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                paramsArr[_i] = arguments[_i + 0];
            }
            for (var i = 0; i < paramsArr.length; i++) {
                this.add(paramsArr[i]);
            }
        };

        ComponentManager.prototype.removeComponent = function (component, destroy) {
            if (typeof destroy === "undefined") { destroy = true; }
            var name = component.name;

            if (this._components[name]) {
                if (destroy) {
                    this._components[name].destroy();
                }

                delete this._components[name];

                return true;
            }

            return false;
        };

        ComponentManager.prototype.removeComponentByName = function (name, destroy) {
            if (typeof destroy === "undefined") { destroy = true; }
            if (this._components[name]) {
                if (destroy) {
                    this._components[name].destroy();
                }

                delete this._components[name];

                return true;
            }

            return false;
        };

        ComponentManager.prototype.preUpdate = function () {
            for (var name in this._components) {
                if (this._components[name].active) {
                    this._components[name].preUpdate();
                }
            }
        };

        ComponentManager.prototype.update = function () {
            for (var name in this._components) {
                if (this._components[name].active) {
                    this._components[name].update();
                }
            }
        };

        ComponentManager.prototype.postUpdate = function () {
            for (var name in this._components) {
                if (this._components[name].active) {
                    this._components[name].postUpdate();
                }
            }
        };

        ComponentManager.prototype.preRender = function () {
            for (var name in this._components) {
                if (this._components[name].active) {
                    this._components[name].preRender();
                }
            }
        };

        ComponentManager.prototype.render = function () {
            for (var name in this._components) {
                if (this._components[name].active) {
                    this._components[name].render();
                }
            }
        };

        ComponentManager.prototype.postRender = function () {
            for (var name in this._components) {
                if (this._components[name].active) {
                    this._components[name].postRender();
                }
            }
        };
        return ComponentManager;
    })();
    Kiwi.ComponentManager = ComponentManager;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    var Entity = (function () {
        function Entity(state, x, y) {
            this.parent = null;
            this._alpha = 1;
            this._visible = true;
            this.width = 0;
            this.height = 0;
            this.cellIndex = 0;
            this.name = '';
            this._clock = null;
            this.state = state;
            this.game = state.game;
            this.id = this.game.rnd.uuid();
            this._clock = this.game.time.clock;

            this._exists = true;
            this._active = true;
            this._willRender = true;
            this.components = new Kiwi.ComponentManager(Kiwi.ENTITY, this);
            this.transform = new Kiwi.Geom.Transform();
            this.transform.x = x;
            this.transform.y = y;
            this.transform.rotPointX = this.width / 2;
            this.transform.rotPointY = this.height / 2;
        }
        Object.defineProperty(Entity.prototype, "x", {
            get: function () {
                return this.transform.x;
            },
            set: function (value) {
                this.transform.x = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Entity.prototype, "y", {
            get: function () {
                return this.transform.y;
            },
            set: function (value) {
                this.transform.y = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Entity.prototype, "scaleX", {
            get: function () {
                return this.transform.scaleX;
            },
            set: function (value) {
                this.transform.scaleX = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Entity.prototype, "scaleY", {
            get: function () {
                return this.transform.scaleY;
            },
            set: function (value) {
                this.transform.scaleY = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Entity.prototype, "rotation", {
            get: function () {
                return this.transform.rotation;
            },
            set: function (value) {
                this.transform.rotation = value;
            },
            enumerable: true,
            configurable: true
        });


        Entity.prototype.childType = function () {
            return Kiwi.ENTITY;
        };


        Object.defineProperty(Entity.prototype, "alpha", {
            get: function () {
                return this._alpha;
            },
            set: function (value) {
                if (value <= 0)
                    value = 0;
                if (value > 1)
                    value = 1;
                this._alpha = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Entity.prototype, "visiblity", {
            get: function () {
                return this._visible;
            },
            set: function (value) {
                this._visible = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Entity.prototype, "exists", {
            get: function () {
                return this._exists;
            },
            set: function (value) {
                this._exists = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Entity.prototype, "active", {
            get: function () {
                return this._active;
            },
            set: function (value) {
                this._active = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Entity.prototype, "willRender", {
            get: function () {
                return this._willRender;
            },
            set: function (value) {
                this._willRender = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Entity.prototype, "inputEnabled", {
            get: function () {
                return this._inputEnabled;
            },
            set: function (value) {
                this._inputEnabled = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Entity.prototype, "clock", {
            get: function () {
                return this._clock;
            },
            set: function (value) {
                this._clock = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Entity.prototype, "dirty", {
            get: function () {
                return this._dirty;
            },
            set: function (value) {
                this._dirty = value;
            },
            enumerable: true,
            configurable: true
        });

        Entity.prototype.objType = function () {
            return "Entity";
        };

        Entity.prototype.update = function () {
        };

        Entity.prototype.render = function (camera) {
        };

        Entity.prototype.destroy = function () {
            this._exists = false;
            this._active = false;
            this._willRender = false;
        };
        return Entity;
    })();
    Kiwi.Entity = Entity;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    var StateConfig = (function () {
        function StateConfig(parent, name) {
            this.name = '';
            this.isPersistent = false;
            this.isCreated = false;
            this.isInitialised = false;
            this.isReady = false;
            this.hasInit = false;
            this.hasPreloader = false;
            this.hasLoadProgress = false;
            this.hasLoadComplete = false;
            this.hasLoadUpdate = false;
            this.hasCreate = false;
            this.hasOnEnter = false;
            this.hasUpdate = false;
            this.hasRender = false;
            this.hasOnExit = false;
            this.hasShutDown = false;
            this.hasDestroy = false;
            this.runCount = 0;
            this.type = 0;
            this._state = parent;
            this.name = name;

            this.populate();
        }
        StateConfig.prototype.objType = function () {
            return "StateConfig";
        };

        StateConfig.prototype.populate = function () {
            if (typeof this._state['init'] === 'function') {
                this.hasInit = true;
            }

            if (typeof this._state['preload'] === 'function') {
                this.hasPreloader = true;
            }

            if (typeof this._state['loadProgress'] === 'function') {
                this.hasLoadProgress = true;
            }

            if (typeof this._state['loadComplete'] === 'function') {
                this.hasLoadComplete = true;
            }

            if (typeof this._state['loadUpdate'] === 'function') {
                this.hasLoadUpdate = true;
            }

            if (typeof this._state['create'] === 'function') {
                this.hasCreate = true;
            }

            if (typeof this._state['onEnter'] === 'function') {
                this.hasOnEnter = true;
            }

            if (typeof this._state['update'] === 'function') {
                this.hasUpdate = true;
            }

            if (typeof this._state['render'] === 'function') {
                this.hasRender = true;
            }

            if (typeof this._state['onExit'] === 'function') {
                this.hasOnExit = true;
            }

            if (typeof this._state['shutdown'] === 'function') {
                this.hasShutDown = true;
            }

            if (typeof this._state['destroy'] === 'function') {
                this.hasDestroy = true;
            }

            if (this.hasInit === false && this.hasCreate === false) {
                this.isInitialised = true;
                this.isCreated = true;
                this.isReady = true;
            }
        };
        return StateConfig;
    })();
    Kiwi.StateConfig = StateConfig;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    var Group = (function () {
        function Group(state, name) {
            if (typeof name === "undefined") { name = ''; }
            this.name = '';
            this.parent = null;
            this.game = null;
            this.state = null;
            this._dirty = true;
            if (state !== null) {
                this.state = state;
                this.game = this.state.game;
                this.id = this.game.rnd.uuid();
            }

            this.name = name;
            this.components = new Kiwi.ComponentManager(Kiwi.GROUP, this);

            this._exists = true;
            this._active = true;
            this._willRender = true;

            this.transform = new Kiwi.Geom.Transform();

            this.members = [];

            this._willRender = true;
        }
        Group.prototype.objType = function () {
            return 'Group';
        };

        Group.prototype.childType = function () {
            return Kiwi.GROUP;
        };

        Object.defineProperty(Group.prototype, "x", {
            get: function () {
                return this.transform.x;
            },
            set: function (value) {
                this.transform.x = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Group.prototype, "y", {
            get: function () {
                return this.transform.y;
            },
            set: function (value) {
                this.transform.y = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Group.prototype, "scaleX", {
            get: function () {
                return this.transform.scaleX;
            },
            set: function (value) {
                this.transform.scaleX = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Group.prototype, "scaleY", {
            get: function () {
                return this.transform.scaleY;
            },
            set: function (value) {
                this.transform.scaleY = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Group.prototype, "rotation", {
            get: function () {
                return this.transform.rotation;
            },
            set: function (value) {
                this.transform.rotation = value;
            },
            enumerable: true,
            configurable: true
        });


        Group.prototype.numChildren = function () {
            return this.members.length;
        };


        Object.defineProperty(Group.prototype, "dirty", {
            get: function () {
                return this._dirty;
            },
            set: function (value) {
                if (value !== undefined) {
                    this._dirty = value;

                    for (var i = 0; i < this.members.length; i++) {
                        this.members[i].dirty = value;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });

        Group.prototype.contains = function (child) {
            return (this.members.indexOf(child) === -1) ? false : true;
        };

        Group.prototype.addChild = function (child) {
            if (child.childType() === Kiwi.STATE || child == this)
                return;

            if (child.parent !== null)
                child.parent.removeChild(child);

            this.members.push(child);
            child.parent = this;
            child.transform.parent = this.transform;

            return child;
        };

        Group.prototype.addChildAt = function (child, index) {
            if (child.transform.parent !== this.transform) {
                this.members.splice(index, 0, child);
            }

            return child;
        };

        Group.prototype.addChildBefore = function (child, beforeChild) {
            if (child.transform.parent !== this.transform && beforeChild.transform.parent === this.transform) {
                var index = this.getChildIndex(beforeChild);

                this.members.splice(index, 0, child);
            }

            return child;
        };

        Group.prototype.addChildAfter = function (child, beforeChild) {
            if (child.transform.parent !== this.transform && beforeChild.transform.parent === this.transform) {
                var index = this.getChildIndex(beforeChild) + 1;

                this.members.splice(index, 0, child);
            }

            return child;
        };

        Group.prototype.getChildAt = function (index) {
            if (this.members[index]) {
                return this.members[index];
            } else {
                return null;
            }
        };

        Group.prototype.getChildByName = function (name) {
            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].name === name) {
                    return this.members[i];
                }
            }

            return null;
        };

        Group.prototype.getChildByID = function (id) {
            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].id === id) {
                    return this.members[i];
                }
            }

            return null;
        };

        Group.prototype.getChildIndex = function (child) {
            return this.members.indexOf(child);
        };

        Group.prototype.removeChild = function (child) {
            if (child && child.transform.parent === this.transform) {
                var index = this.getChildIndex(child);

                if (index > -1) {
                    this.members.splice(index, 1);
                }
            }

            return child;
        };

        Group.prototype.removeChildAt = function (index) {
            if (this.members[index]) {
                var child = this.members[index];

                if (child) {
                    this.members.splice(index, 1);
                }

                return child;
            } else {
                return null;
            }
        };

        Group.prototype.removeChildren = function (begin, end) {
            if (typeof begin === "undefined") { begin = 0; }
            if (typeof end === "undefined") { end = 0x7fffffff; }
            end -= begin;

            var removed = this.members.splice(begin, end);

            return removed.length;
        };

        Group.prototype.setChildIndex = function (child, index) {
            if (child.transform.parent !== this.transform || this.getChildIndex(child) === index) {
                return false;
            }

            this.removeChild(child);
            this.addChildAt(child, index);

            return true;
        };

        Group.prototype.swapChildren = function (child1, child2) {
            if (child1.transform.parent !== this.transform || child2.transform.parent !== this.transform) {
                return false;
            }

            var index1 = this.getChildIndex(child1);
            var index2 = this.getChildIndex(child2);

            if (index1 !== -1 && index2 !== -1 && index1 !== index2) {
                this.members[index1] = child2;
                this.members[index2] = child1;

                return true;
            }

            return false;
        };

        Group.prototype.swapChildrenAt = function (index1, index2) {
            var child1 = this.getChildAt(index1);
            var child2 = this.getChildAt(index2);
            if (child1 != null && child2 != null) {
                if (child1 == child2 || child1.transform.parent !== this.transform || child2.transform.parent !== this.transform) {
                    return false;
                }

                if (child1 !== null && child2 !== null) {
                    this.members[index1] = child2;
                    this.members[index2] = child1;

                    return true;
                }
            }

            return false;
        };

        Group.prototype.replaceChild = function (oldChild, newChild) {
            if (oldChild === newChild)
                return false;

            if (this.getChildIndex(newChild)) {
                this.removeChild(newChild);
            }

            var index = this.getChildIndex(oldChild);

            if (index > -1) {
                this.removeChildAt(index);

                this.addChildAt(newChild, index);
                newChild.transform.parent = null;

                return true;
            }

            return false;
        };

        Group.prototype.forEach = function (context, callback) {
            var params = [];
            for (var _i = 0; _i < (arguments.length - 2); _i++) {
                params[_i] = arguments[_i + 2];
            }
            if (this.members.length > 0) {
                this.members.forEach(function (child) {
                    return callback.apply(context, [child].concat(params));
                });
            }
        };

        Group.prototype.forEachAlive = function (context, callback) {
            var params = [];
            for (var _i = 0; _i < (arguments.length - 2); _i++) {
                params[_i] = arguments[_i + 2];
            }
            if (this.members.length > 0) {
                this.members.forEach(function (child) {
                    if (child.exists)
                        callback.apply(context, [child].concat(params));
                });
            }
        };

        Group.prototype.setAll = function (componentName, property, value) {
            if (componentName === null) {
                for (var i = 0; i < this.members.length; i++) {
                    this.members[i][property] = value;
                }
            } else {
                for (var i = 0; i < this.members.length; i++) {
                    this.members[i][componentName][property] = value;
                }
            }
        };

        Group.prototype.callAll = function (componentName, functionName, args) {
            if (componentName === null) {
                for (var i = 0; i < this.members.length; i++) {
                    this.members[i][functionName].apply(this.members[i], args);
                }
            } else {
                for (var i = 0; i < this.members.length; i++) {
                    this.members[i][componentName][functionName].apply(this.members[i][componentName], args);
                }
            }
        };

        Group.prototype.update = function () {
            var _this = this;
            this.components.update();

            if (this.members.length > 0) {
                this.members.forEach(function (child) {
                    return _this.processUpdate(child);
                });
            }

            this.components.postUpdate();
        };

        Group.prototype.processUpdate = function (child) {
            if (child.active === true) {
                child.update();
            }
        };


        Object.defineProperty(Group.prototype, "exists", {
            get: function () {
                return this._exists;
            },
            set: function (value) {
                this._exists = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Group.prototype, "active", {
            get: function () {
                return this._active;
            },
            set: function (value) {
                this._active = value;
            },
            enumerable: true,
            configurable: true
        });

        Group.prototype.render = function (camera) {
            var _this = this;
            this.components.preRender();

            this.components.render();

            if (this.members.length > 0) {
                this.members.forEach(function (child) {
                    return _this.processRender(child, camera);
                });
            }

            this.components.postRender();
        };

        Group.prototype.processRender = function (child, camera) {
            if (child.active === true) {
                child.render(camera);
            }
        };

        Group.prototype.removeFirstAlive = function () {
            return this.removeChild(this.getFirstAlive());
        };

        Group.prototype.getFirstAlive = function () {
            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].exists === true) {
                    return this.members[i];
                    break;
                }
            }

            return null;
        };

        Group.prototype.getFirstDead = function () {
            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].exists === false) {
                    return this.members[i];
                    break;
                }
            }

            return null;
        };

        Group.prototype.countLiving = function () {
            var total = 0;

            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].exists === true) {
                    total++;
                }
            }

            return total;
        };

        Group.prototype.countDead = function () {
            var total = 0;

            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].exists === false) {
                    total++;
                }
            }

            return total;
        };

        Group.prototype.getRandom = function (start, length) {
            if (typeof start === "undefined") { start = 0; }
            if (typeof length === "undefined") { length = 0; }
            if (this.members.length === 0) {
                return null;
            }

            if (length === 0) {
                length = this.members.length;
            }

            if (start < 0 || start > length) {
                start = 0;
            }

            var rnd = start + (Math.random() * (start + length));

            if (rnd > this.members.length) {
                return this.members[this.members.length - 1];
            } else {
                return this.members[rnd];
            }
        };

        Group.prototype.clear = function () {
            this.members.length = 0;
        };


        Object.defineProperty(Group.prototype, "willRender", {
            get: function () {
                return this._willRender;
            },
            set: function (value) {
                this._willRender = value;
            },
            enumerable: true,
            configurable: true
        });

        Group.prototype.destroy = function () {
            this.removeChildren();

            this._exists = false;
            this._active = false;
            this._willRender = false;

            this.members.length = 0;
        };
        return Group;
    })();
    Kiwi.Group = Group;
})(Kiwi || (Kiwi = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Kiwi;
(function (Kiwi) {
    var State = (function (_super) {
        __extends(State, _super);
        function State(name) {
            _super.call(this, null, name);
            this.game = null;

            this.config = new Kiwi.StateConfig(this, name);
            this.components = new Kiwi.ComponentManager(Kiwi.STATE, this);
            this.transform.parent = null;
        }
        State.prototype.objType = function () {
            return "State";
        };

        State.prototype.childType = function () {
            return Kiwi.STATE;
        };

        State.prototype.boot = function () {
            this.textureLibrary = new Kiwi.Textures.TextureLibrary(this.game);
            this.textures = this.textureLibrary.textures;
            this.audioLibrary = new Kiwi.Sound.AudioLibrary(this.game);
            this.audio = this.audioLibrary.audio;
            this.dataLibrary = new Kiwi.Files.DataLibrary(this.game);
            this.data = this.dataLibrary.data;
        };

        State.prototype.init = function () {
            var paramsArr = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                paramsArr[_i] = arguments[_i + 0];
            }
        };

        State.prototype.preload = function () {
        };

        State.prototype.loadProgress = function (percent, bytesLoaded, file) {
        };

        State.prototype.loadComplete = function () {
        };

        State.prototype.loadUpdate = function () {
            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].active === true) {
                    this.members[i].update();
                }
            }
        };

        State.prototype.create = function () {
            var paramsArr = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                paramsArr[_i] = arguments[_i + 0];
            }
        };

        State.prototype.preUpdate = function () {
            this.components.preUpdate();
        };

        State.prototype.update = function () {
            this.components.update();

            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].active === true) {
                    this.members[i].update();
                }
            }
        };

        State.prototype.postUpdate = function () {
            this.components.postUpdate();
        };

        State.prototype.postRender = function () {
        };

        State.prototype.setType = function (value) {
            if (this.config.isInitialised === false) {
                this.config.type = value;
            }
        };

        State.prototype.addImage = function (key, url, storeAsGlobal, width, height, offsetX, offsetY) {
            if (typeof storeAsGlobal === "undefined") { storeAsGlobal = true; }
            this.game.loader.addImage(key, url, width, height, offsetX, offsetY, storeAsGlobal);
        };

        State.prototype.addSpriteSheet = function (key, url, frameWidth, frameHeight, storeAsGlobal, numCells, rows, cols, sheetOffsetX, sheetOffsetY, cellOffsetX, cellOffsetY) {
            if (typeof storeAsGlobal === "undefined") { storeAsGlobal = true; }
            this.game.loader.addSpriteSheet(key, url, frameWidth, frameHeight, numCells, rows, cols, sheetOffsetX, sheetOffsetY, cellOffsetX, cellOffsetY, storeAsGlobal);
        };

        State.prototype.addTextureAtlas = function (key, imageURL, jsonID, jsonURL, storeAsGlobal) {
            if (typeof storeAsGlobal === "undefined") { storeAsGlobal = true; }
            this.game.loader.addTextureAtlas(key, imageURL, jsonID, jsonURL, storeAsGlobal);
        };

        State.prototype.addJSON = function (key, url, storeAsGlobal) {
            if (typeof storeAsGlobal === "undefined") { storeAsGlobal = true; }
            this.game.loader.addJSON(key, url, storeAsGlobal);
        };

        State.prototype.addAudio = function (key, url, storeAsGlobal) {
            if (typeof storeAsGlobal === "undefined") { storeAsGlobal = true; }
            this.game.loader.addAudio(key, url, storeAsGlobal);
        };

        State.prototype.addChild = function (child) {
            _super.prototype.removeChild.call(this, child);

            _super.prototype.addChild.call(this, child);

            return child;
        };

        State.prototype.removeChild = function (child) {
            var layer = null;

            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].id === child.id) {
                    this.members.splice(i, 1);
                }
            }
            return child;
        };

        State.prototype.destroy = function () {
            for (var i = 0; i < this.members.length; i++) {
            }
        };
        return State;
    })(Kiwi.Group);
    Kiwi.State = State;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    var SignalBinding = (function () {
        function SignalBinding(signal, listener, isOnce, listenerContext, priority) {
            if (typeof priority === "undefined") { priority = 0; }
            this.active = true;
            this.params = null;
            this._listener = listener;
            this._isOnce = isOnce;
            this.context = listenerContext;
            this._signal = signal;
            this.priority = priority || 0;
        }
        SignalBinding.prototype.objType = function () {
            return "SignalBinding";
        };

        SignalBinding.prototype.execute = function (paramsArr) {
            var handlerReturn;
            var params;

            if (this.active && !!this._listener) {
                params = this.params ? this.params.concat(paramsArr) : paramsArr;

                handlerReturn = this._listener.apply(this.context, params);

                if (this._isOnce) {
                    this.detach();
                }
            }

            return handlerReturn;
        };

        SignalBinding.prototype.detach = function () {
            return this.isBound() ? this._signal.remove(this._listener, this.context) : null;
        };

        SignalBinding.prototype.isBound = function () {
            return (!!this._signal && !!this._listener);
        };

        SignalBinding.prototype.isOnce = function () {
            return this._isOnce;
        };

        SignalBinding.prototype.getListener = function () {
            return this._listener;
        };

        SignalBinding.prototype.getSignal = function () {
            return this._signal;
        };

        SignalBinding.prototype._destroy = function () {
            delete this._signal;
            delete this._listener;
            delete this.context;
        };

        SignalBinding.prototype.toString = function () {
            return '[SignalBinding isOnce:' + this._isOnce + ', isBound:' + this.isBound() + ', active:' + this.active + ']';
        };
        return SignalBinding;
    })();
    Kiwi.SignalBinding = SignalBinding;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    var Signal = (function () {
        function Signal() {
            this._bindings = [];
            this._prevParams = null;
            this.memorize = false;
            this._shouldPropagate = true;
            this.active = true;
        }
        Signal.prototype.objType = function () {
            return "Signal";
        };

        Signal.prototype.validateListener = function (listener, fnName) {
            if (typeof listener !== 'function') {
                throw new Error('listener is a required param of {fn}() and should be a Function.'.replace('{fn}', fnName));
            }
        };

        Signal.prototype._registerListener = function (listener, isOnce, listenerContext, priority) {
            var prevIndex = this._indexOfListener(listener, listenerContext);
            var binding;

            if (prevIndex !== -1) {
                binding = this._bindings[prevIndex];

                if (binding.isOnce() !== isOnce) {
                    throw new Error('You cannot add' + (isOnce ? '' : 'Once') + '() then add' + (!isOnce ? '' : 'Once') + '() the same listener without removing the relationship first.');
                }
            } else {
                binding = new Kiwi.SignalBinding(this, listener, isOnce, listenerContext, priority);

                this._addBinding(binding);
            }

            if (this.memorize && this._prevParams) {
                binding.execute(this._prevParams);
            }

            return binding;
        };

        Signal.prototype._addBinding = function (binding) {
            var n = this._bindings.length;

            do {
                --n;
            } while(this._bindings[n] && binding.priority <= this._bindings[n].priority);

            this._bindings.splice(n + 1, 0, binding);
        };

        Signal.prototype._indexOfListener = function (listener, context) {
            var n = this._bindings.length;
            var cur;

            while (n--) {
                cur = this._bindings[n];

                if (cur.getListener() === listener && cur.context === context) {
                    return n;
                }
            }

            return -1;
        };

        Signal.prototype.has = function (listener, context) {
            if (typeof context === "undefined") { context = null; }
            return this._indexOfListener(listener, context) !== -1;
        };

        Signal.prototype.add = function (listener, listenerContext, priority) {
            if (typeof listenerContext === "undefined") { listenerContext = null; }
            if (typeof priority === "undefined") { priority = 0; }
            this.validateListener(listener, 'add');

            return this._registerListener(listener, false, listenerContext, priority);
        };

        Signal.prototype.addOnce = function (listener, listenerContext, priority) {
            if (typeof listenerContext === "undefined") { listenerContext = null; }
            if (typeof priority === "undefined") { priority = 0; }
            this.validateListener(listener, 'addOnce');

            return this._registerListener(listener, true, listenerContext, priority);
        };

        Signal.prototype.remove = function (listener, context) {
            if (typeof context === "undefined") { context = null; }
            this.validateListener(listener, 'remove');

            var i = this._indexOfListener(listener, context);

            if (i !== -1) {
                this._bindings[i]._destroy();
                this._bindings.splice(i, 1);
            }

            return listener;
        };

        Signal.prototype.removeAll = function () {
            var n = this._bindings.length;

            while (n--) {
                this._bindings[n]._destroy();
            }

            this._bindings.length = 0;
        };

        Signal.prototype.getNumListeners = function () {
            return this._bindings.length;
        };

        Signal.prototype.halt = function () {
            this._shouldPropagate = false;
        };

        Signal.prototype.dispatch = function () {
            var paramsArr = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                paramsArr[_i] = arguments[_i + 0];
            }
            if (!this.active) {
                return;
            }

            var n = this._bindings.length;
            var bindings;

            if (this.memorize) {
                this._prevParams = paramsArr;
            }

            if (!n) {
                return;
            }

            bindings = this._bindings.slice(0);

            this._shouldPropagate = true;

            do {
                n--;
            } while(bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false);
        };

        Signal.prototype.forget = function () {
            this._prevParams = null;
        };

        Signal.prototype.dispose = function () {
            this.removeAll();

            delete this._bindings;
            delete this._prevParams;
        };

        Signal.prototype.toString = function () {
            return '[Signal active:' + this.active + ' numListeners:' + this.getNumListeners() + ']';
        };
        Signal.VERSION = '1.0.0';
        return Signal;
    })();
    Kiwi.Signal = Signal;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Geom) {
        var Point = (function () {
            function Point(x, y) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                this.setTo(x, y);
            }
            Point.prototype.objType = function () {
                return "Point";
            };

            Point.prototype.polar = function (distance, angle) {
                this.x = distance * Math.cos(angle * Math.PI / 180);
                this.y = distance * Math.sin(angle * Math.PI / 180);
                return this;
            };

            Point.prototype.add = function (toAdd, output) {
                if (typeof output === "undefined") { output = new Point(); }
                return output.setTo(this.x + toAdd.x, this.y + toAdd.y);
            };

            Point.prototype.addTo = function (x, y) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                return this.setTo(this.x + x, this.y + y);
            };

            Point.prototype.subtractFrom = function (x, y) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                return this.setTo(this.x - x, this.y - y);
            };

            Point.prototype.invert = function () {
                return this.setTo(this.y, this.x);
            };

            Point.prototype.clamp = function (min, max) {
                this.clampX(min, max);
                this.clampY(min, max);
                return this;
            };

            Point.prototype.clampX = function (min, max) {
                this.x = Math.max(Math.min(this.x, max), min);

                return this;
            };

            Point.prototype.clampY = function (min, max) {
                this.x = Math.max(Math.min(this.x, max), min);
                this.y = Math.max(Math.min(this.y, max), min);

                return this;
            };

            Point.prototype.clone = function (output) {
                if (typeof output === "undefined") { output = new Point(); }
                return output.setTo(this.x, this.y);
            };

            Point.prototype.copyFrom = function (source) {
                return this.setTo(source.x, source.y);
            };

            Point.prototype.copyTo = function (target) {
                return target.setTo(this.x, this.y);
            };

            Point.prototype.distanceTo = function (target, round) {
                if (typeof round === "undefined") { round = false; }
                var dx = this.x - target.x;
                var dy = this.y - target.y;

                if (round === true) {
                    return Math.round(Math.sqrt(dx * dx + dy * dy));
                } else {
                    return Math.sqrt(dx * dx + dy * dy);
                }
            };

            Point.prototype.distanceToXY = function (x, y, round) {
                if (typeof round === "undefined") { round = false; }
                var dx = this.x - x;
                var dy = this.y - y;

                if (round === true) {
                    return Math.round(Math.sqrt(dx * dx + dy * dy));
                } else {
                    return Math.sqrt(dx * dx + dy * dy);
                }
            };

            Point.distanceBetween = function (pointA, pointB, round) {
                if (typeof round === "undefined") { round = false; }
                var dx = pointA.x - pointB.x;
                var dy = pointA.y - pointB.y;

                if (round === true) {
                    return Math.round(Math.sqrt(dx * dx + dy * dy));
                } else {
                    return Math.sqrt(dx * dx + dy * dy);
                }
            };

            Point.polar = function (length, angle) {
                return new Point(length * Math.cos(angle * Math.PI / 180), length * Math.sin(angle * Math.PI / 180));
            };

            Point.prototype.distanceCompare = function (target, distance) {
                if (this.distanceTo(target) >= distance) {
                    return true;
                } else {
                    return false;
                }
            };

            Point.prototype.equals = function (toCompare) {
                if (this.x === toCompare.x && this.y === toCompare.y) {
                    return true;
                } else {
                    return false;
                }
            };

            Point.interpolate = function (pointA, pointB, f) {
                var xDiff = pointB.x - pointA.x;
                var yDiff = pointB.y - pointA.y;
                return new Point(pointB.x - xDiff * f, pointB.y - yDiff * f);
            };

            Point.prototype.offset = function (dx, dy) {
                this.x += dx;
                this.y += dy;

                return this;
            };

            Point.prototype.setTo = function (x, y) {
                this.x = x;
                this.y = y;

                return this;
            };

            Point.prototype.subtract = function (point, output) {
                if (typeof output === "undefined") { output = new Point(); }
                return output.setTo(this.x - point.x, this.y - point.y);
            };

            Point.prototype.getCSS = function () {
                return this.x + 'px ' + this.y + 'px';
            };

            Point.prototype.toString = function () {
                return '[{Point (x=' + this.x + ' y=' + this.y + ')}]';
            };
            return Point;
        })();
        Geom.Point = Point;
    })(Kiwi.Geom || (Kiwi.Geom = {}));
    var Geom = Kiwi.Geom;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Geom) {
        var Matrix = (function () {
            function Matrix(a, b, c, d, tx, ty) {
                if (typeof a === "undefined") { a = 1; }
                if (typeof b === "undefined") { b = 0; }
                if (typeof c === "undefined") { c = 0; }
                if (typeof d === "undefined") { d = 1; }
                if (typeof tx === "undefined") { tx = 0; }
                if (typeof ty === "undefined") { ty = 0; }
                this.a = 1;
                this.b = 0;
                this.c = 0;
                this.d = 1;
                this.tx = 0;
                this.ty = 0;
                this.setTo(a, b, c, d, tx, ty);
            }
            Matrix.prototype.objType = function () {
                return "Matrix";
            };

            Matrix.prototype.setTo = function (a, b, c, d, tx, ty) {
                if (typeof a === "undefined") { a = 1; }
                if (typeof b === "undefined") { b = 0; }
                if (typeof c === "undefined") { c = 0; }
                if (typeof d === "undefined") { d = 1; }
                if (typeof tx === "undefined") { tx = 0; }
                if (typeof ty === "undefined") { ty = 0; }
                this.a = a;
                this.b = b;
                this.c = c;
                this.d = d;
                this.tx = tx;
                this.ty = ty;

                return this;
            };

            Matrix.prototype.setFromTransform = function (tx, ty, scaleX, scaleY, rotation) {
                this.identity();
                var cos = Math.cos(rotation);
                var sin = Math.sin(rotation);

                this.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, tx, ty);

                return this;
            };

            Matrix.prototype.prepend = function (a, b, c, d, tx, ty) {
                if (typeof a === "undefined") { a = 1; }
                if (typeof b === "undefined") { b = 0; }
                if (typeof c === "undefined") { c = 0; }
                if (typeof d === "undefined") { d = 1; }
                if (typeof tx === "undefined") { tx = 0; }
                if (typeof ty === "undefined") { ty = 0; }
                var tx1 = this.tx;
                var a1 = this.a;
                var c1 = this.c;

                this.a = a1 * a + this.b * c;
                this.b = a1 * b + this.b * d;
                this.c = c1 * a + this.d * c;
                this.d = c1 * b + this.d * d;

                this.tx = tx1 * a + this.ty * c + tx;
                this.ty = tx1 * b + this.ty * d + ty;
                return this;
            };

            Matrix.prototype.prependMatrix = function (m) {
                var tx1 = this.tx;
                var a1 = this.a;
                var c1 = this.c;

                this.a = a1 * m.a + this.b * m.c;
                this.b = a1 * m.b + this.b * m.d;
                this.c = c1 * m.a + this.d * m.c;
                this.d = c1 * m.b + this.d * m.d;

                this.tx = tx1 * m.a + this.ty * m.c + m.tx;
                this.ty = tx1 * m.b + this.ty * m.d + m.ty;
                return this;
            };

            Matrix.prototype.append = function (a, b, c, d, tx, ty) {
                if (typeof a === "undefined") { a = 1; }
                if (typeof b === "undefined") { b = 0; }
                if (typeof c === "undefined") { c = 0; }
                if (typeof d === "undefined") { d = 1; }
                if (typeof tx === "undefined") { tx = 0; }
                if (typeof ty === "undefined") { ty = 0; }
                var a1 = this.a;
                var b1 = this.b;
                var c1 = this.c;
                var d1 = this.d;

                this.a = a * a1 + b * c1;
                this.b = a * b1 + b * d1;
                this.c = c * a1 + d * c1;
                this.d = c * b1 + d * d1;
                this.tx = tx * a1 + ty * c1 + this.tx;
                this.ty = tx * b1 + ty * d1 + this.ty;
                return this;
            };

            Matrix.prototype.appendMatrix = function (m) {
                var a1 = this.a;
                var b1 = this.b;
                var c1 = this.c;
                var d1 = this.d;

                this.a = m.a * a1 + m.b * c1;
                this.b = m.a * b1 + m.b * d1;
                this.c = m.c * a1 + m.d * c1;
                this.d = m.c * b1 + m.d * d1;
                this.tx = m.tx * a1 + m.ty * c1 + this.tx;
                this.ty = m.tx * b1 + m.ty * d1 + this.ty;
                return this;
            };

            Matrix.prototype.setPosition = function (x, y) {
                this.tx = x;
                this.ty = y;
                return this;
            };

            Matrix.prototype.setPositionPoint = function (p) {
                this.tx = p.x;
                this.ty = p.y;
                return this;
            };

            Matrix.prototype.getPosition = function (output) {
                if (typeof output === "undefined") { output = new Kiwi.Geom.Point(); }
                return output.setTo(this.tx, this.ty);
            };

            Matrix.prototype.identity = function () {
                this.a = 1;
                this.b = 0;
                this.c = 0;
                this.d = 1;
                this.tx = 0;
                this.ty = 0;
                return this;
            };

            Matrix.prototype.rotate = function (radians) {
                var cos = Math.cos(radians);
                var sin = Math.sin(radians);

                var a1 = this.a;
                var c1 = this.c;
                var tx1 = this.tx;

                this.a = a1 * cos - this.b * sin;
                this.b = a1 * sin + this.b * cos;
                this.c = c1 * cos - this.d * sin;
                this.d = c1 * sin + this.d * cos;
                this.tx = tx1 * cos - this.ty * sin;
                this.ty = tx1 * sin + this.ty * cos;
                return this;
            };

            Matrix.prototype.translate = function (tx, ty) {
                this.tx += tx;
                this.ty += ty;
                return this;
            };

            Matrix.prototype.scale = function (scaleX, scaleY) {
                this.a *= scaleX;
                this.d *= scaleY;
                return this;
            };

            Matrix.prototype.transformPoint = function (pt) {
                var x = pt.x;
                var y = pt.y;
                pt.x = this.a * x + this.c * y + this.tx;
                pt.y = this.b * x + this.d * y + this.ty;
                return pt;
            };

            Matrix.prototype.invert = function () {
                var a1 = this.a;
                var b1 = this.b;
                var c1 = this.c;
                var d1 = this.d;
                var tx1 = this.tx;
                var n = a1 * d1 - b1 * c1;

                this.a = d1 / n;
                this.b = -b1 / n;
                this.c = -c1 / n;
                this.d = a1 / n;
                this.tx = (c1 * this.ty - d1 * tx1) / n;
                this.ty = -(a1 * this.ty - b1 * tx1) / n;
                return this;
            };

            Matrix.prototype.copyFrom = function (m) {
                this.a = m.a;
                this.b = m.b;
                this.c = m.c;
                this.d = m.d;
                this.tx = m.tx;
                this.ty = m.ty;

                return this;
            };

            Matrix.prototype.copyTo = function (m) {
                m.a = this.a;
                m.b = this.b;
                m.c = this.c;
                m.d = this.d;
                m.tx = this.tx;
                m.ty = this.ty;
                return this;
            };

            Matrix.prototype.clone = function () {
                return new Kiwi.Geom.Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
            };

            Object.defineProperty(Matrix.prototype, "toString", {
                get: function () {
                    return "[{Matrix (a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + ")}]";
                },
                enumerable: true,
                configurable: true
            });
            return Matrix;
        })();
        Geom.Matrix = Matrix;
    })(Kiwi.Geom || (Kiwi.Geom = {}));
    var Geom = Kiwi.Geom;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Geom) {
        var Transform = (function () {
            function Transform(x, y, scaleX, scaleY, rotation, rotPointX, rotPointY) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                if (typeof scaleX === "undefined") { scaleX = 1; }
                if (typeof scaleY === "undefined") { scaleY = 1; }
                if (typeof rotation === "undefined") { rotation = 0; }
                if (typeof rotPointX === "undefined") { rotPointX = 0; }
                if (typeof rotPointY === "undefined") { rotPointY = 0; }
                this._x = 0;
                this._y = 0;
                this._scaleX = 1;
                this._scaleY = 1;
                this._rotation = 0;
                this._rotPointX = 0;
                this._rotPointY = 0;
                this.setTransform(x, y, scaleX, scaleY, rotation, rotPointX, rotPointY);

                this._matrix = new Geom.Matrix();

                this._matrix.setFromTransform(this._x, this._y, this._scaleX, this._scaleY, this._rotation);

                this._cachedConcatenatedMatrix = this.getConcatenatedMatrix();
            }
            Transform.prototype.objType = function () {
                return "Transform";
            };


            Object.defineProperty(Transform.prototype, "x", {
                get: function () {
                    return this._x;
                },
                set: function (value) {
                    this._x = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Transform.prototype, "y", {
                get: function () {
                    return this._y;
                },
                set: function (value) {
                    this._y = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Transform.prototype, "scaleX", {
                get: function () {
                    return this._scaleX;
                },
                set: function (value) {
                    this._scaleX = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Transform.prototype, "scaleY", {
                get: function () {
                    return this._scaleY;
                },
                set: function (value) {
                    this._scaleY = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Transform.prototype, "rotation", {
                get: function () {
                    return this._rotation;
                },
                set: function (value) {
                    this._rotation = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Transform.prototype, "rotPointX", {
                get: function () {
                    return this._rotPointX;
                },
                set: function (value) {
                    this._rotPointX = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Transform.prototype, "rotPointY", {
                get: function () {
                    return this._rotPointY;
                },
                set: function (value) {
                    this._rotPointY = value;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Transform.prototype, "matrix", {
                get: function () {
                    return this._matrix;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Transform.prototype, "worldX", {
                get: function () {
                    return this.getConcatenatedMatrix().tx;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Transform.prototype, "worldY", {
                get: function () {
                    return this.getConcatenatedMatrix().ty;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Transform.prototype, "parent", {
                get: function () {
                    return this._parent;
                },
                set: function (value) {
                    if (!this.checkAncestor(value)) {
                        this._parent = value;
                    }
                },
                enumerable: true,
                configurable: true
            });

            Transform.prototype.setPosition = function (x, y) {
                this._x = x;
                this._y = y;

                return this;
            };

            Transform.prototype.setPositionFromPoint = function (point) {
                this._x = point.x;
                this._y = point.y;

                return this;
            };

            Transform.prototype.translatePositionFromPoint = function (point) {
                this._x += point.x;
                this._y += point.y;

                return this;
            };

            Transform.prototype.getPositionPoint = function (output) {
                if (typeof output === "undefined") { output = new Kiwi.Geom.Point(); }
                return output.setTo(this._x, this._y);
            };

            Object.defineProperty(Transform.prototype, "scale", {
                set: function (value) {
                    this._scaleX = value;
                    this._scaleY = value;
                },
                enumerable: true,
                configurable: true
            });

            Transform.prototype.setTransform = function (x, y, scaleX, scaleY, rotation, rotPointX, rotPointY) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                if (typeof scaleX === "undefined") { scaleX = 1; }
                if (typeof scaleY === "undefined") { scaleY = 1; }
                if (typeof rotation === "undefined") { rotation = 0; }
                if (typeof rotPointX === "undefined") { rotPointX = 0; }
                if (typeof rotPointY === "undefined") { rotPointY = 0; }
                this._x = x;
                this._y = y;
                this._scaleX = scaleX;
                this._scaleY = scaleY;
                this._rotation = rotation;
                this._rotPointX = rotPointX;
                this._rotPointY = rotPointY;

                return this;
            };

            Transform.prototype.getParentMatrix = function () {
                if (this._parent) {
                    return this._parent.getConcatenatedMatrix();
                }

                return null;
            };

            Transform.prototype.getConcatenatedMatrix = function () {
                this._matrix.setFromTransform(this._x, this._y, this._scaleX, this._scaleY, this._rotation);

                var parentMatrix = this.getParentMatrix();

                if (parentMatrix) {
                    var matrix = this._matrix.clone();
                    matrix.prependMatrix(parentMatrix);
                    this._cachedConcatenatedMatrix.copyFrom(matrix);
                    return matrix;
                }

                return this._matrix;
            };

            Transform.prototype.transformPoint = function (point) {
                var mat = this.getConcatenatedMatrix();

                return mat.transformPoint(point);
            };

            Transform.prototype.copyFrom = function (source) {
                this.setTransform(source.x, source.y, source.scaleX, source.scaleY, source.rotation, source.rotPointX, source.rotPointY);

                this.parent = source.parent;

                this._matrix = source.matrix.clone();

                return this;
            };

            Transform.prototype.copyTo = function (destination) {
                destination.copyFrom(this);

                return this;
            };

            Transform.prototype.clone = function (output) {
                if (typeof output === "undefined") { output = new Transform(); }
                output.copyFrom(this);

                return output;
            };

            Transform.prototype.checkAncestor = function (transform) {
                return false;
            };

            Object.defineProperty(Transform.prototype, "toString", {
                get: function () {
                    return "[{Transform (x=" + this._x + " y=" + this._y + " scaleX=" + this._scaleX + " scaleY=" + this._scaleY + " rotation=" + this._rotation + " regX=" + this._rotPointX + " regY=" + this.rotPointY + " matrix=" + this._matrix + ")}]";
                },
                enumerable: true,
                configurable: true
            });
            return Transform;
        })();
        Geom.Transform = Transform;
    })(Kiwi.Geom || (Kiwi.Geom = {}));
    var Geom = Kiwi.Geom;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Geom) {
        var Rectangle = (function () {
            function Rectangle(x, y, width, height) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                if (typeof width === "undefined") { width = 0; }
                if (typeof height === "undefined") { height = 0; }
                this.x = 0;
                this.y = 0;
                this.width = 0;
                this.height = 0;
                this.setTo(x, y, width, height);
            }
            Rectangle.prototype.objType = function () {
                return "Rectangle";
            };


            Object.defineProperty(Rectangle.prototype, "bottom", {
                get: function () {
                    return this.y + this.height;
                },
                set: function (value) {
                    if (value) {
                        if (value < this.y) {
                            this.height = 0;
                        } else {
                            this.height = value;
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Rectangle.prototype, "center", {
                get: function () {
                    var output = new Geom.Point();
                    return output.setTo(Math.round(this.width / 2), Math.round(this.height / 2));
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Rectangle.prototype, "bottomRight", {
                get: function () {
                    var output = new Geom.Point();
                    return output.setTo(this.right, this.bottom);
                },
                set: function (value) {
                    if (value) {
                        this.right = value.x;
                        this.bottom = value.y;
                    }
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Rectangle.prototype, "left", {
                get: function () {
                    return this.x;
                },
                set: function (value) {
                    if (value) {
                        var diff = this.x - value;

                        if (this.width + diff < 0) {
                            this.width = 0;

                            this.x = value;
                        } else {
                            this.width += diff;

                            this.x = value;
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Rectangle.prototype, "right", {
                get: function () {
                    return this.x + this.width;
                },
                set: function (value) {
                    if (value) {
                        if (value < this.x) {
                            this.width = 0;
                        } else {
                            this.width = value - this.x;
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Rectangle.prototype, "size", {
                get: function () {
                    var output = new Geom.Point();
                    return output.setTo(this.width, this.height);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Rectangle.prototype, "volume", {
                get: function () {
                    return this.width * this.height;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Rectangle.prototype, "perimeter", {
                get: function () {
                    return (this.width * 2) + (this.height * 2);
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Rectangle.prototype, "top", {
                get: function () {
                    return this.y;
                },
                set: function (value) {
                    if (value) {
                        var diff = this.y - value;

                        if (this.height + diff < 0) {
                            this.height = 0;

                            this.y = value;
                        } else {
                            this.height += diff;

                            this.y = value;
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Rectangle.prototype, "topLeft", {
                get: function () {
                    var output = new Geom.Point();
                    return output.setTo(this.x, this.y);
                },
                set: function (value) {
                    if (value) {
                        this.x = value.x;
                        this.y = value.y;
                    }
                },
                enumerable: true,
                configurable: true
            });

            Rectangle.prototype.clone = function (output) {
                if (typeof output === "undefined") { output = new Rectangle(); }
                return output.setTo(this.x, this.y, this.width, this.height);
            };

            Rectangle.prototype.contains = function (x, y) {
                if (x >= this.x && x <= this.right && y >= this.y && y <= this.bottom) {
                    return true;
                }

                return false;
            };

            Rectangle.prototype.containsPoint = function (point) {
                return this.contains(point.x, point.y);
            };

            Rectangle.prototype.containsRect = function (rect) {
                if (rect.volume > this.volume) {
                    return false;
                }

                if (rect.x >= this.x && rect.y >= this.y && rect.right <= this.right && rect.bottom <= this.bottom) {
                    return true;
                }

                return false;
            };

            Rectangle.prototype.copyFrom = function (source) {
                return this.setTo(source.x, source.y, source.width, source.height);
            };

            Rectangle.prototype.copyTo = function (target) {
                return target.copyFrom(this);
            };

            Rectangle.prototype.equals = function (toCompare) {
                if (this.x === toCompare.x && this.y === toCompare.y && this.width === toCompare.width && this.height === toCompare.height) {
                    return true;
                }

                return false;
            };

            Rectangle.prototype.inflate = function (dx, dy) {
                if (!isNaN(dx) && !isNaN(dy)) {
                    this.x -= dx;
                    this.width += 2 * dx;

                    this.y -= dy;
                    this.height += 2 * dy;
                }

                return this;
            };

            Rectangle.prototype.inflatePoint = function (point) {
                return this.inflate(point.x, point.y);
            };

            Rectangle.prototype.intersection = function (toIntersect, output) {
                if (typeof output === "undefined") { output = new Rectangle(); }
                if (this.intersects(toIntersect) === true) {
                    output.x = Math.max(toIntersect.x, this.x);
                    output.y = Math.max(toIntersect.y, this.y);
                    output.width = Math.min(toIntersect.right, this.right) - output.x;
                    output.height = Math.min(toIntersect.bottom, this.bottom) - output.y;
                }

                return output;
            };

            Rectangle.prototype.intersects = function (toIntersect) {
                if (toIntersect.x > this.right - 1) {
                    return false;
                }

                if (toIntersect.right - 1 < this.x) {
                    return false;
                }

                if (toIntersect.bottom - 1 < this.y) {
                    return false;
                }

                if (toIntersect.y > this.bottom - 1) {
                    return false;
                }

                return true;
            };

            Rectangle.prototype.overlap = function (rect) {
                var result = { top: false, bottom: false, left: false, right: false, contains: false, contained: false };
                var interRect = this.intersection(rect);

                if (interRect.isEmpty)
                    return result;
                if (this.containsRect(rect))
                    result.contains = true;
                if (rect.containsRect(this))
                    result.contained = true;
                if (this.top < rect.top)
                    result.top = true;
                if (this.bottom > rect.bottom)
                    result.bottom = true;
                if (this.left < rect.left)
                    result.left = true;
                if (this.right > rect.right)
                    result.right = true;

                return result;
            };

            Rectangle.prototype.isEmpty = function () {
                if (this.width < 1 || this.height < 1) {
                    return true;
                }

                return false;
            };

            Rectangle.prototype.offset = function (dx, dy) {
                if (!isNaN(dx) && !isNaN(dy)) {
                    this.x += dx;
                    this.y += dy;
                }

                return this;
            };

            Rectangle.prototype.offsetPoint = function (point) {
                return this.offset(point.x, point.y);
            };

            Rectangle.prototype.setEmpty = function () {
                return this.setTo(0, 0, 0, 0);
            };

            Rectangle.prototype.setTo = function (x, y, width, height) {
                if (!isNaN(x) && !isNaN(y) && !isNaN(width) && !isNaN(height)) {
                    this.x = x;
                    this.y = y;

                    if (width >= 0) {
                        this.width = width;
                    }

                    if (height >= 0) {
                        this.height = height;
                    }
                }

                return this;
            };

            Rectangle.prototype.union = function (toUnion, output) {
                if (typeof output === "undefined") { output = new Rectangle(); }
                return output.setTo(Math.min(toUnion.x, this.x), Math.min(toUnion.y, this.y), Math.max(toUnion.right, this.right), Math.max(toUnion.bottom, this.bottom));
            };

            Rectangle.prototype.scale = function (x, y, translation) {
                var trans = new Kiwi.Geom.Transform();
                trans.scaleX = x;
                trans.scaleY = y;
                trans.x = translation.x;
                trans.y = translation.y;

                var tl = this.topLeft;
                trans.transformPoint(tl);
                this.topLeft = tl;

                this.width *= x;
                this.height *= y;

                return this;
            };

            Rectangle.prototype.toString = function () {
                return "[{Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + " isEmpty=" + this.isEmpty() + ")}]";
            };
            return Rectangle;
        })();
        Geom.Rectangle = Rectangle;
    })(Kiwi.Geom || (Kiwi.Geom = {}));
    var Geom = Kiwi.Geom;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    var Stage = (function () {
        function Stage(game, name) {
            this.offset = new Kiwi.Geom.Point();
            this.container = null;
            this._game = game;

            this.name = name;

            this.domReady = false;

            this._alpha = 1;

            this._x = 0;
            this._y = 0;

            this._width = 800;
            this._height = 600;
            this.color = 'white';

            this.onResize = new Kiwi.Signal();
        }
        Stage.prototype.objType = function () {
            return "Stage";
        };

        Object.defineProperty(Stage.prototype, "alpha", {
            get: function () {
                return this._alpha;
            },
            set: function (value) {
                this.container.style.opacity = String(Kiwi.Utils.GameMath.clamp(value, 1, 0));

                this._alpha = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Stage.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this.container.style.left = String(value + 'px');
                this._x = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Stage.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this.container.style.top = String(value + 'px');
                this._y = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Stage.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (value) {
                this.container.style.width = String(value + 'px');
                this.canvas.width = value;

                this._width = value;
                this.onResize.dispatch(this._width, this._height);
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Stage.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (value) {
                this.container.style.height = String(value + 'px');
                this.canvas.height = value;

                this._height = value;
                this.onResize.dispatch(this._width, this._height);
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Stage.prototype, "color", {
            get: function () {
                return this._color;
            },
            set: function (val) {
                this._color = val;
            },
            enumerable: true,
            configurable: true
        });


        Stage.prototype.boot = function (dom) {
            this.domReady = true;

            this.container = dom.container;
            if (this._game.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                this.offset = this._game.browser.getOffsetPoint(this.container);
                this._x = this.offset.x;
                this._y = this.offset.y;
                this._width = parseInt(this.container.style.width);
                this._height = parseInt(this.container.style.height);
            }

            this._createCompositeCanvas();
            if (this._game.debugOption === Kiwi.DEBUG_ON) {
                this._createDebugCanvas();
            }
        };

        Stage.prototype._createCompositeCanvas = function () {
            this.canvas = document.createElement("canvas");
            this.canvas.id = this._game.id + "compositeCanvas";
            this.canvas.style.position = "absolute";
            this.canvas.width = this.width;
            this.canvas.height = this.height;

            if (this._game.renderOption === Kiwi.RENDERER_CANVAS) {
                this.ctx = this.canvas.getContext("2d");
                this.ctx.fillStyle = '#fff';
                this.gl = null;
            } else if (this._game.renderOption === Kiwi.RENDERER_WEBGL) {
                this.gl = this.canvas.getContext("webgl");
                this.gl.clearColor(1, 1, .95, .7);
                this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
                this.ctx = null;
            }

            if (this._game.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                this.container.appendChild(this.canvas);
            } else {
                document.body.appendChild(this.canvas);
            }
        };

        Stage.prototype._createDebugCanvas = function () {
            if (this._game.deviceTargetOption === Kiwi.TARGET_COCOON) {
            }
            this.debugCanvas = document.createElement("canvas");
            this.debugCanvas.id = this._game.id + "debugCanvas";
            this.debugCanvas.style.position = "absolute";
            this.debugCanvas.style.display = "none";
            this.debugCanvas.width = this.width;
            this.debugCanvas.height = this.height;
            this.dctx = this.debugCanvas.getContext("2d");
            this.clearDebugCanvas();

            if (this._game.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                this.container.appendChild(this.debugCanvas);
            }
        };

        Stage.prototype.clearDebugCanvas = function (color) {
            this.dctx.fillStyle = color || "rgba(255,0,0,.2)";
            this.dctx.clearRect(0, 0, this.width, this.height);
            this.dctx.fillRect(0, 0, this.width, this.height);
        };

        Stage.prototype.toggleDebugCanvas = function () {
            this.debugCanvas.style.display = (this.debugCanvas.style.display === "none") ? "block" : "none";
        };
        return Stage;
    })();
    Kiwi.Stage = Stage;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Components) {
        var Box = (function (_super) {
            __extends(Box, _super);
            function Box(x, y, width, height) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                if (typeof width === "undefined") { width = 0; }
                if (typeof height === "undefined") { height = 0; }
                _super.call(this, 'Box');

                this.dirty = true;

                this._rawBounds = new Kiwi.Geom.Rectangle(x, y, width, height);
                this._rawCenter = new Kiwi.Geom.Point(x + width / 2, y + height / 2);
                this._rawHitbox = new Kiwi.Geom.Rectangle();

                this._hitboxOffset = new Kiwi.Geom.Point();

                this.hitbox = new Kiwi.Geom.Rectangle(0, 0, width, height);
            }
            Box.prototype.objType = function () {
                return "Box";
            };

            Object.defineProperty(Box.prototype, "rawHitbox", {
                get: function () {
                    if (this.dirty) {
                        this._rawHitbox.x = this._rawBounds.x + this._hitboxOffset.x;
                        this._rawHitbox.y = this._rawBounds.y + this._hitboxOffset.y;
                    }

                    return this._rawHitbox;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Box.prototype, "hitbox", {
                get: function () {
                    if (this.dirty) {
                        this._transformedHitbox = this._rotateHitbox(this.rawHitbox.clone());
                    }

                    return this._transformedHitbox;
                },
                set: function (value) {
                    this._hitboxOffset.x = value.x;
                    this._hitboxOffset.y = value.y;

                    this._rawHitbox = value;

                    this._rawHitbox.x += this._rawBounds.x;
                    this._rawHitbox.y += this._rawBounds.y;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Box.prototype, "rawBounds", {
                get: function () {
                    if (this.dirty) {
                        this._rawBounds.x = this.entity.x;
                        this._rawBounds.y = this.entity.y;
                        this._rawBounds.width = this.entity.width;
                        this._rawBounds.height = this.entity.height;
                    }
                    return this._rawBounds;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Box.prototype, "rawCenter", {
                get: function () {
                    if (this.dirty) {
                        this._rawCenter.x = this.rawBounds.x + this.rawBounds.width / 2, this._rawCenter.y = this.rawBounds.y + this.rawBounds.height / 2;
                    }
                    return this._rawCenter;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Box.prototype, "center", {
                get: function () {
                    if (this.dirty) {
                        var t = this.entity.transform;
                        var m = t.getConcatenatedMatrix();
                        m.setTo(m.a, m.b, m.c, m.d, t.x + t.rotPointX, t.y + t.rotPointY);
                        this._transformedCenter = m.transformPoint(new Kiwi.Geom.Point(this.entity.width / 2 - t.rotPointX, this.entity.height / 2 - t.rotPointY));
                    }
                    return this._transformedCenter;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Box.prototype, "bounds", {
                get: function () {
                    if (this.dirty) {
                        this._transformedBounds = this.rawBounds.clone();
                        this._transformedBounds = this._rotateRect(this.rawBounds.clone());
                    }
                    return this._transformedBounds;
                },
                enumerable: true,
                configurable: true
            });

            Box.prototype._rotateRect = function (rect) {
                var out = new Kiwi.Geom.Rectangle();
                var t = this.entity.transform;
                var m = t.getConcatenatedMatrix();
                m.setTo(m.a, m.b, m.c, m.d, t.x + t.rotPointX, t.y + t.rotPointY);

                out = this.extents(m.transformPoint({ x: -t.rotPointX, y: -t.rotPointY }), m.transformPoint({ x: -t.rotPointX + rect.width, y: -t.rotPointY }), m.transformPoint({ x: -t.rotPointX + rect.width, y: -t.rotPointY + rect.height }), m.transformPoint({ x: -t.rotPointX, y: -t.rotPointY + rect.height }));
                return out;
            };

            Box.prototype._rotateHitbox = function (rect) {
                var out = new Kiwi.Geom.Rectangle();
                var t = this.entity.transform;
                var m = t.getConcatenatedMatrix();
                m.setTo(m.a, m.b, m.c, m.d, t.x + t.rotPointX, t.y + t.rotPointY);

                out = this.extents(m.transformPoint({ x: -t.rotPointX + this._hitboxOffset.x, y: -t.rotPointY + this._hitboxOffset.y }), m.transformPoint({ x: -t.rotPointX + rect.width + this._hitboxOffset.x, y: -t.rotPointY + this._hitboxOffset.y }), m.transformPoint({ x: -t.rotPointX + rect.width + this._hitboxOffset.x, y: -t.rotPointY + rect.height + this._hitboxOffset.y }), m.transformPoint({ x: -t.rotPointX + this._hitboxOffset.x, y: -t.rotPointY + rect.height + this._hitboxOffset.y }));

                return out;
            };

            Box.prototype.draw = function (ctx) {
                var t = this.entity.transform;
                ctx.strokeStyle = "red";

                ctx.strokeRect(this.rawBounds.x, this.rawBounds.y, this.rawBounds.width, this.rawBounds.height);
                ctx.fillRect(this.rawCenter.x - 1, this.rawCenter.y - 1, 3, 3);
                ctx.strokeRect(t.x + t.rotPointX - 3, t.y + t.rotPointY - 3, 7, 7);
                ctx.strokeStyle = "blue";
                ctx.strokeRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
                ctx.strokeStyle = "green";
                ctx.strokeRect(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height);
                ctx.strokeStyle = "white";
                ctx.strokeRect(this.rawHitbox.x, this.rawHitbox.y, this.rawHitbox.width, this.rawHitbox.height);
            };

            Box.prototype.extents = function (topLeftPoint, topRightPoint, bottomRightPoint, bottomLeftPoint) {
                var left = Math.min(topLeftPoint.x, topRightPoint.x, bottomRightPoint.x, bottomLeftPoint.x);
                var right = Math.max(topLeftPoint.x, topRightPoint.x, bottomRightPoint.x, bottomLeftPoint.x);
                var top = Math.min(topLeftPoint.y, topRightPoint.y, bottomRightPoint.y, bottomLeftPoint.y);
                var bottom = Math.max(topLeftPoint.y, topRightPoint.y, bottomRightPoint.y, bottomLeftPoint.y);

                return new Kiwi.Geom.Rectangle(left, top, right - left, bottom - top);
            };
            return Box;
        })(Kiwi.Component);
        Components.Box = Box;
    })(Kiwi.Components || (Kiwi.Components = {}));
    var Components = Kiwi.Components;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Components) {
        var Input = (function (_super) {
            __extends(Input, _super);
            function Input(entity, box, enabled) {
                _super.call(this, 'Input');
                this._isDragging = null;
                this._dragEnabled = false;
                this._dragSnapToCenter = false;
                this._nowDown = null;
                this._nowUp = null;
                this._nowEntered = null;
                this._nowLeft = null;
                this._nowDragging = null;

                this._onEntered = new Kiwi.Signal();
                this._onLeft = new Kiwi.Signal();
                this._onDown = new Kiwi.Signal();
                this._onUp = new Kiwi.Signal();
                this._onDragStarted = new Kiwi.Signal();
                this._onDragStopped = new Kiwi.Signal();

                this._entity = entity;
                this._box = box;

                this._distance = new Kiwi.Geom.Point();

                this._withinBounds = null;
                this._outsideBounds = true;

                this._isUp = true;
                this._isDown = null;
                this._isDragging = null;
                this._justEntered = false;
                this._tempDragDisabled = false;
                this.enabled = enabled;
            }
            Input.prototype.objType = function () {
                return "Input";
            };


            Object.defineProperty(Input.prototype, "game", {
                get: function () {
                    return this._game;
                },
                set: function (val) {
                    this._game = val;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Input.prototype, "onEntered", {
                get: function () {
                    if (this.enabled == false)
                        this.enabled = true;
                    return this._onEntered;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Input.prototype, "onLeft", {
                get: function () {
                    if (this.enabled == false)
                        this.enabled = true;
                    return this._onLeft;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Input.prototype, "onDown", {
                get: function () {
                    if (this.enabled == false)
                        this.enabled = true;
                    return this._onDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Input.prototype, "onUp", {
                get: function () {
                    if (this.enabled == false)
                        this.enabled = true;
                    return this._onUp;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Input.prototype, "onDragStarted", {
                get: function () {
                    return this._onDragStarted;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Input.prototype, "onDragStopped", {
                get: function () {
                    return this._onDragStopped;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Input.prototype, "onRelease", {
                get: function () {
                    return this.onUp;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Input.prototype, "onPress", {
                get: function () {
                    return this.onDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Input.prototype, "enabled", {
                get: function () {
                    return this._enabled;
                },
                set: function (val) {
                    this._enabled = val;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Input.prototype, "isDown", {
                get: function () {
                    return (this._isDown !== null);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Input.prototype, "isUp", {
                get: function () {
                    return this._isUp;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Input.prototype, "withinBounds", {
                get: function () {
                    return (this._withinBounds !== null);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Input.prototype, "outsideBounds", {
                get: function () {
                    return this._outsideBounds;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Input.prototype, "isDragging", {
                get: function () {
                    return (this._isDragging !== null);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Input.prototype, "dragDistance", {
                get: function () {
                    return this._dragDistance;
                },
                enumerable: true,
                configurable: true
            });

            Input.prototype.enableDrag = function (snapToCenter, distance) {
                if (typeof snapToCenter === "undefined") { snapToCenter = false; }
                if (typeof distance === "undefined") { distance = 1; }
                if (this.enabled == false)
                    this.enabled = true;
                this._dragEnabled = true;
                this._dragSnapToCenter = snapToCenter;
                this._dragDistance = distance;
                this._isDragging = null;
            };

            Input.prototype.disableDrag = function () {
                this._dragEnabled = false;
                this._isDragging = null;
            };

            Input.prototype.update = function () {
                if (this.enabled === false || !this._game || this._entity.active === false || this._entity.willRender === false) {
                    return;
                }

                this._nowDown = null;
                this._nowUp = null;
                this._nowEntered = null;
                this._nowLeft = null;
                this._nowDragging = null;

                if (Kiwi.DEVICE.touch) {
                    this._updateTouch();
                } else {
                    this._updateMouse();
                }

                if (this.isDragging) {
                    this._entity.x = this._isDragging.x;
                    this._entity.y = this._isDragging.y;

                    if (this._dragSnapToCenter === false) {
                        this._entity.x -= this._distance.x;
                        this._entity.y -= this._distance.y;
                    }
                }
            };

            Input.prototype._updateTouch = function () {
                for (var i = 0; i < this._game.input.touch.fingers.length; i++) {
                    if (this._game.input.touch.fingers[i].active === true) {
                        this._evaluateTouchPointer(this._game.input.touch.fingers[i]);
                    } else if (this.isDown === true && this._isDown.id === this._game.input.touch.fingers[i].id) {
                        this._nowUp = this._game.input.touch.fingers[i];
                    } else if (this.isDown === false && this._nowUp === null && this.withinBounds === true && this._withinBounds.id === this._game.input.touch.fingers[i].id) {
                        this._nowUp = this._game.input.touch.fingers[i];
                    }
                }

                if (this._nowEntered !== null && this.withinBounds === false) {
                    this._withinBounds = this._nowEntered;
                    this._outsideBounds = false;
                    this._onEntered.dispatch(this._entity, this._nowEntered);
                }

                if (this._nowLeft !== null && this.withinBounds === true) {
                    this._withinBounds = null;
                    this._outsideBounds = true;
                    this._onLeft.dispatch(this._entity, this._nowLeft);
                }

                if (this._nowDown !== null && this.isDown === false) {
                    this._onDown.dispatch(this._entity, this._nowDown);
                    this._isDown = this._nowDown;
                    this._isUp = false;
                    this._withinBounds = this._nowDown;
                    this._outsideBounds = false;
                }

                if (this._dragEnabled == true && this.isDragging === false && this._nowDragging !== null) {
                    this._onDragStarted.dispatch(this._entity, this._nowDragging);
                    this._isDragging = this._nowDragging;
                }

                if (this._nowUp !== null) {
                    this._onUp.dispatch(this._entity, this._nowUp);
                    this._isDown = null;
                    this._isUp = true;
                    this._withinBounds = null;
                    this._outsideBounds = true;

                    if (this.isDragging === true && this._isDragging.id == this._nowUp.id) {
                        this._isDragging = null;
                        this._onDragStopped.dispatch(this._entity, this._nowUp);
                    }
                }
            };

            Input.prototype._evaluateTouchPointer = function (pointer) {
                if (this.isDown === false || this._isDown.id === pointer.id) {
                    if (Kiwi.Geom.Intersect.circleToRectangle(pointer.circle, this._box.hitbox).result) {
                        if (this.isDown === true && this._isDown.id === pointer.id || this.isDown === false && pointer.duration > 1) {
                            this._nowEntered = pointer;
                        }

                        if (this.isDown === false && pointer.frameDuration < 2) {
                            this._nowDown = pointer;
                        }

                        if (this._dragEnabled && this.isDragging == false && this.isDown == true) {
                            this._distance.x = pointer.x - this._box.hitbox.left;
                            this._distance.y = pointer.y - this._box.hitbox.top;

                            if (this._isDown.startPoint.distanceTo(this._distance) >= this._dragDistance) {
                                this._nowDragging = pointer;
                            }
                        }
                    } else {
                        if (this.isDown === true) {
                            this._nowLeft = pointer;
                        } else if (this.withinBounds === true && this._withinBounds.id == pointer.id) {
                            this._nowLeft = pointer;
                        }
                    }
                }
            };

            Input.prototype._updateMouse = function () {
                this._evaluateMousePointer(this._game.input.mouse.cursor);

                if (this._nowLeft !== null) {
                    this._onLeft.dispatch(this._entity, this._nowLeft);
                }

                if (this._nowEntered !== null) {
                    this._onEntered.dispatch(this._entity, this._nowEntered);
                }

                if (this._nowDown !== null && this.isDown === false) {
                    this._onDown.dispatch(this._entity, this._nowDown);
                    this._isDown = this._nowDown;
                    this._isUp = false;
                }

                if (this._dragEnabled == true && this.isDragging === false && this._nowDragging !== null) {
                    this._onDragStarted.dispatch(this._entity, this._nowDragging);
                    this._isDragging = this._nowDragging;
                }

                if (this.isDown === true && this._nowUp !== null && this._isDown.id === this._nowUp.id) {
                    this._onUp.dispatch(this._entity, this._nowUp);

                    if (this.isDragging === true && this._isDragging.id == this._nowUp.id) {
                        this._isDragging = null;
                        this._onDragStopped.dispatch(this._entity, this._nowUp);
                    }

                    this._isDown = null;
                    this._isUp = true;
                }
            };

            Input.prototype._evaluateMousePointer = function (pointer) {
                if (Kiwi.Geom.Intersect.circleToRectangle(pointer.circle, this._box.hitbox).result) {
                    if (this._dragEnabled && this.isDragging === false) {
                        this._distance.x = pointer.x - this._box.hitbox.left;
                        this._distance.y = pointer.y - this._box.hitbox.top;
                    }

                    if (this.withinBounds === false) {
                        this._nowEntered = pointer;
                        this._withinBounds = pointer;
                        this._outsideBounds = false;
                        this._justEntered = true;
                    }
                } else {
                    if (this.withinBounds === true && this.isDragging === false) {
                        this._nowLeft = pointer;
                        this._withinBounds = null;
                        this._outsideBounds = true;
                    }
                }

                if (pointer.isDown === true) {
                    if (this._justEntered) {
                        this._isDown = pointer;
                        this._isUp = false;
                        this._tempDragDisabled = true;
                    }

                    if (this.withinBounds === true && this.isDown === false && this._nowDown === null) {
                        this._nowDown = pointer;
                    }

                    if (this._dragEnabled === true && this.isDragging == false && this._tempDragDisabled === false) {
                        if (this.isDown == true && this._isDown.startPoint.distanceTo(this._distance) >= this._dragDistance) {
                            this._nowDragging = pointer;
                        }
                    }
                } else {
                    if (this._tempDragDisabled === true)
                        this._tempDragDisabled = false;

                    if (this.isDown === true) {
                        this._nowUp = pointer;
                    }
                }

                if (this._justEntered)
                    this._justEntered = false;
            };

            Input.prototype.toString = function () {
                return '[{Input (x=' + this.withinBounds + ')}]';
            };
            return Input;
        })(Kiwi.Component);
        Components.Input = Input;
    })(Kiwi.Components || (Kiwi.Components = {}));
    var Components = Kiwi.Components;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Components) {
        var Sound = (function (_super) {
            __extends(Sound, _super);
            function Sound(game) {
                _super.call(this, 'Sound');

                this._game = game;
                this._audio = [];
            }
            Sound.prototype.addSound = function (name, key, volume, loop) {
                if (this._validate(name) == true)
                    return;

                var audio = this._game.audio.add(key, volume, loop);
                this._audio[name] = audio;

                return audio;
            };

            Sound.prototype.removeSound = function (name) {
                if (this._validate(name) == false)
                    return;

                this._audio[name].stop();
                this._audio[name].destroy();
                delete this._audio[name];
            };

            Sound.prototype.getSound = function (name) {
                if (this._validate(name) == false)
                    return;

                return this._audio[name];
            };

            Sound.prototype._validate = function (name) {
                if (this._audio[name] === undefined) {
                    return false;
                } else {
                    return true;
                }
            };

            Sound.prototype.play = function (name) {
                if (this._validate(name) == false)
                    return;

                this._audio[name].play();
            };

            Sound.prototype.stop = function (name) {
                if (this._validate(name) == false)
                    return;

                this._audio[name].stop();
            };

            Sound.prototype.pause = function (name) {
                if (this._validate(name) == false)
                    return;

                this._audio[name].pause();
            };

            Sound.prototype.resume = function (name) {
                if (this._validate(name) == false)
                    return;

                this._audio[name].resume();
            };
            return Sound;
        })(Kiwi.Component);
        Components.Sound = Sound;
    })(Kiwi.Components || (Kiwi.Components = {}));
    var Components = Kiwi.Components;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Components) {
        var ArcadePhysics = (function (_super) {
            __extends(ArcadePhysics, _super);
            function ArcadePhysics(entity) {
                _super.call(this, 'ArcadePhysics');
                this._callbackFunction = null;
                this._callbackContext = null;

                this._parent = entity;
                this.transform = this._parent.transform;
                this.width = this._parent.width;
                this.height = this._parent.height;

                this.last = new Kiwi.Geom.Point(this.transform.x, this.transform.y);
                this.mass = 1.0;
                this.elasticity = 0.0;

                this.immovable = false;
                this.moves = true;

                this.touching = ArcadePhysics.NONE;
                this.wasTouching = ArcadePhysics.NONE;
                this.allowCollisions = ArcadePhysics.ANY;

                this.velocity = new Kiwi.Geom.Point();
                this.acceleration = new Kiwi.Geom.Point();
                this.drag = new Kiwi.Geom.Point();
                this.maxVelocity = new Kiwi.Geom.Point(10000, 10000);

                this.angle = 0;
                this.angularVelocity = 0;
                this.angularAcceleration = 0;
                this.angularDrag = 0;
                this.maxAngular = 10000;
            }
            ArcadePhysics.prototype.objType = function () {
                return "ArcadePhysics";
            };

            ArcadePhysics.prototype.solid = function (value) {
                if (value !== undefined) {
                    if (value)
                        this.allowCollisions = ArcadePhysics.ANY; else
                        this.allowCollisions = ArcadePhysics.NONE;
                }

                return (this.allowCollisions & ArcadePhysics.ANY) > ArcadePhysics.NONE;
            };

            ArcadePhysics.collide = function (gameObject1, gameObject2, seperate) {
                if (typeof seperate === "undefined") { seperate = true; }
                return ArcadePhysics.overlaps(gameObject1, gameObject2, seperate);
            };

            ArcadePhysics.collideGroup = function (gameObject, group, seperate) {
                if (typeof seperate === "undefined") { seperate = true; }
                return ArcadePhysics.overlapsObjectGroup(gameObject, group, seperate);
            };

            ArcadePhysics.collideGroupGroup = function (group1, group2, seperate) {
                if (typeof seperate === "undefined") { seperate = true; }
                return ArcadePhysics.overlapsGroupGroup(group1, group2, seperate);
            };

            ArcadePhysics.overlaps = function (gameObject1, gameObject2, separateObjects) {
                if (typeof separateObjects === "undefined") { separateObjects = true; }
                var obj1Physics = gameObject1.components.getComponent("ArcadePhysics");

                return obj1Physics.overlaps(gameObject2, separateObjects);
            };

            ArcadePhysics.overlapsObjectGroup = function (gameObject, group, separateObjects) {
                if (typeof separateObjects === "undefined") { separateObjects = true; }
                var objPhysics = gameObject.components.getComponent("ArcadePhysics");
                return objPhysics.overlapsGroup(group, separateObjects);
            };

            ArcadePhysics.overlapsGroupGroup = function (group1, group2, separateObjects) {
                if (typeof separateObjects === "undefined") { separateObjects = true; }
                var result = false;

                if (group1.childType !== undefined && group1.childType() === Kiwi.GROUP) {
                    var members = group1.members;
                    var i = 0;

                    while (i < group1.members.length) {
                        if (members[i].childType() == Kiwi.GROUP) {
                            if (ArcadePhysics.overlapsGroupGroup(members[i++], group2, separateObjects))
                                result = true;
                        } else {
                            if (ArcadePhysics.overlapsObjectGroup(members[i++], group2, separateObjects))
                                result = true;
                        }
                    }
                } else if (Object.prototype.toString.call(group1) == '[object Array]') {
                    for (var i = 0; i < group1.length; i++) {
                        if (group1[i].childType !== undefined && group1[i].childType() === Kiwi.ENTITY) {
                            if (ArcadePhysics.overlapsObjectGroup(group1[i], group2, separateObjects))
                                result = true;
                        }
                    }
                }

                return result;
            };

            ArcadePhysics.separate = function (object1, object2) {
                var separatedX = this.separateX(object1, object2);
                var separatedY = this.separateY(object1, object2);
                return separatedX || separatedY;
            };

            ArcadePhysics.separateX = function (object1, object2) {
                var phys1 = object1.components._components["ArcadePhysics"];
                var phys2 = object2.components._components["ArcadePhysics"];

                var obj1immovable = phys1.immovable;
                var obj2immovable = phys2.immovable;
                if (obj1immovable && obj2immovable)
                    return false;

                var overlap = 0;
                var obj1delta = phys1.transform.x - phys1.last.x;
                var obj2delta = phys2.transform.x - phys2.last.x;

                if (obj1delta != obj2delta) {
                    var obj1deltaAbs = (obj1delta > 0) ? obj1delta : -obj1delta;
                    var obj2deltaAbs = (obj2delta > 0) ? obj2delta : -obj2delta;

                    var obj1rect = new Kiwi.Geom.Rectangle(phys1.transform.x - ((obj1delta > 0) ? obj1delta : 0), phys1.last.y, phys1.width + ((obj1delta > 0) ? obj1delta : -obj1delta), phys1.height);
                    var obj2rect = new Kiwi.Geom.Rectangle(phys2.transform.x - ((obj2delta > 0) ? obj2delta : 0), phys2.last.y, phys2.width + ((obj2delta > 0) ? obj2delta : -obj2delta), phys2.height);
                    if ((obj1rect.x + obj1rect.width > obj2rect.x) && (obj1rect.x < obj2rect.x + obj2rect.width) && (obj1rect.y + obj1rect.height > obj2rect.y) && (obj1rect.y < obj2rect.y + obj2rect.height)) {
                        var maxOverlap = obj1deltaAbs + obj2deltaAbs + ArcadePhysics.OVERLAP_BIAS;

                        if (obj1delta > obj2delta) {
                            overlap = phys1.transform.x + phys1.width - phys2.transform.x;
                            if ((overlap > maxOverlap) || !(phys1.allowCollisions & ArcadePhysics.RIGHT) || !(phys2.allowCollisions & ArcadePhysics.LEFT)) {
                                overlap = 0;
                            } else {
                                phys1.touching |= ArcadePhysics.RIGHT;
                                phys2.touching |= ArcadePhysics.LEFT;
                            }
                        } else if (obj1delta < obj2delta) {
                            overlap = phys1.transform.x - phys2.width - phys2.transform.x;
                            if ((-overlap > maxOverlap) || !(phys1.allowCollisions & ArcadePhysics.LEFT) || !(phys2.allowCollisions & ArcadePhysics.RIGHT)) {
                                overlap = 0;
                            } else {
                                phys1.touching |= ArcadePhysics.LEFT;
                                phys2.touching |= ArcadePhysics.RIGHT;
                            }
                        }
                    }
                }

                if (overlap != 0) {
                    var obj1v = phys1.velocity.x;
                    var obj2v = phys2.velocity.x;

                    if (!obj1immovable && !obj2immovable) {
                        overlap *= 0.5;
                        phys1.transform.x = phys1.transform.x - overlap;
                        phys2.transform.x = phys2.transform.x + overlap;

                        var obj1velocity = Math.sqrt((obj2v * obj2v * phys2.mass) / phys1.mass) * ((obj2v > 0) ? 1 : -1);
                        var obj2velocity = Math.sqrt((obj1v * obj1v * phys1.mass) / phys2.mass) * ((obj1v > 0) ? 1 : -1);
                        var average = (obj1velocity + obj2velocity) * 0.5;
                        obj1velocity -= average;
                        obj2velocity -= average;
                        phys1.velocity.x = average + obj1velocity * phys1.elasticity;
                        phys2.velocity.x = average + obj2velocity * phys2.elasticity;
                    } else if (!obj1immovable) {
                        phys1.transform.x = phys1.transform.x - overlap;
                        phys1.velocity.x = obj2v - obj1v * phys1.elasticity;
                    } else if (!obj2immovable) {
                        phys2.transform.x = phys2.transform.x + overlap;
                        phys2.velocity.x = obj1v - obj2v * phys2.elasticity;
                    }
                    return true;
                } else
                    return false;
            };

            ArcadePhysics.separateY = function (object1, object2) {
                var phys1 = object1.components._components["ArcadePhysics"];
                var phys2 = object2.components._components["ArcadePhysics"];

                var obj1immovable = phys1.immovable;
                var obj2immovable = phys2.immovable;
                if (obj1immovable && obj2immovable)
                    return false;

                var overlap = 0;

                var obj1delta = phys1.transform.y - phys1.last.y;

                var obj2delta = phys2.transform.y - phys2.last.y;
                if (obj1delta != obj2delta) {
                    var obj1deltaAbs = (obj1delta > 0) ? obj1delta : -obj1delta;
                    var obj2deltaAbs = (obj2delta > 0) ? obj2delta : -obj2delta;
                    var obj1rect = new Kiwi.Geom.Rectangle(phys1.transform.x, phys1.transform.y - ((obj1delta > 0) ? obj1delta : 0), phys1.width, phys1.height + obj1deltaAbs);
                    var obj2rect = new Kiwi.Geom.Rectangle(phys2.transform.x, phys2.transform.y - ((obj2delta > 0) ? obj2delta : 0), phys2.width, phys2.height + obj2deltaAbs);
                    if ((obj1rect.x + obj1rect.width > obj2rect.x) && (obj1rect.x < obj2rect.x + obj2rect.width) && (obj1rect.y + obj1rect.height > obj2rect.y) && (obj1rect.y < obj2rect.y + obj2rect.height)) {
                        var maxOverlap = obj1deltaAbs + obj2deltaAbs + ArcadePhysics.OVERLAP_BIAS;

                        if (obj1delta > obj2delta) {
                            overlap = phys1.transform.y + phys1.height - phys2.transform.y;
                            if ((overlap > maxOverlap) || !(phys1.allowCollisions & ArcadePhysics.DOWN) || !(phys2.allowCollisions & ArcadePhysics.UP)) {
                                overlap = 0;
                            } else {
                                phys1.touching |= ArcadePhysics.DOWN;
                                phys2.touching |= ArcadePhysics.UP;
                            }
                        } else if (obj1delta < obj2delta) {
                            overlap = phys1.transform.y - phys2.height - phys2.transform.y;
                            if ((-overlap > maxOverlap) || !(phys1.allowCollisions & ArcadePhysics.UP) || !(phys2.allowCollisions & ArcadePhysics.DOWN)) {
                                overlap = 0;
                            } else {
                                phys1.touching |= ArcadePhysics.UP;
                                phys2.touching |= ArcadePhysics.DOWN;
                            }
                        }
                    }
                }

                if (overlap != 0) {
                    var obj1v = phys1.velocity.y;
                    var obj2v = phys2.velocity.y;

                    if (!obj1immovable && !obj2immovable) {
                        overlap *= 0.5;
                        phys1.transform.y = phys1.transform.y - overlap;
                        phys2.transform.y = phys2.transform.y + overlap;

                        var obj1velocity = Math.sqrt((obj2v * obj2v * phys2.mass) / phys1.mass) * ((obj2v > 0) ? 1 : -1);
                        var obj2velocity = Math.sqrt((obj1v * obj1v * phys1.mass) / phys2.mass) * ((obj1v > 0) ? 1 : -1);
                        var average = (obj1velocity + obj2velocity) * 0.5;
                        obj1velocity -= average;
                        obj2velocity -= average;
                        phys1.velocity.y = average + obj1velocity * phys1.elasticity;
                        phys2.velocity.y = average + obj2velocity * phys2.elasticity;
                    } else if (!obj1immovable) {
                        phys1.transform.y = phys1.transform.y - overlap;
                        phys1.velocity.y = obj2v - obj1v * phys1.elasticity;

                        if (object2.active && phys2.moves && (obj1delta > obj2delta))
                            phys1.transform.x = phys1.transform.x + object2.transform.x - phys2.last.x;
                    } else if (!obj2immovable) {
                        phys2.transform.y = phys2.transform.y + overlap;
                        phys2.velocity.y = obj1v - obj2v * phys2.elasticity;

                        if (object1.active && phys1.moves && (obj1delta < obj2delta))
                            phys2.transform.x = phys2.transform.x + object1.transform.x - phys1.last.x;
                    }
                    return true;
                } else
                    return false;
            };

            ArcadePhysics.computeVelocity = function (velocity, acceleration, drag, max) {
                if (typeof acceleration === "undefined") { acceleration = 0; }
                if (typeof drag === "undefined") { drag = 0; }
                if (typeof max === "undefined") { max = 10000; }
            };

            ArcadePhysics.prototype.overlaps = function (gameObject, separateObjects) {
                if (typeof separateObjects === "undefined") { separateObjects = false; }
                var objTransform = gameObject.transform;

                var result = (objTransform.x + gameObject.width > this.transform.x) && (objTransform.x < this.transform.x + this.width) && (objTransform.y + gameObject.height > this.transform.y) && (objTransform.y < this.transform.y + this.height);

                if (result && separateObjects) {
                    ArcadePhysics.separate(this._parent, gameObject);
                }

                if (result && this._callbackFunction !== null && this._callbackContext !== null) {
                    this._callbackFunction.call(this._callbackContext, this._parent, gameObject);
                }

                return result;
            };

            ArcadePhysics.prototype.overlapsGroup = function (group, separateObjects) {
                if (typeof separateObjects === "undefined") { separateObjects = false; }
                var results = false;

                if (group.childType !== undefined && group.childType() === Kiwi.GROUP) {
                    for (var i = 0; i < group.members.length; i++) {
                        if (group.members[i].childType() === Kiwi.GROUP) {
                            this.overlapsGroup(group.members[i], separateObjects);
                        } else {
                            if (this.overlaps(group.members[i], separateObjects)) {
                                if (this._callbackContext !== null && this._callbackFunction !== null)
                                    this._callbackFunction.call(this._callbackContext, this._parent, group.members[i]);
                                results = true;
                            }
                        }
                    }
                } else if (Object.prototype.toString.call(group) == '[object Array]') {
                    for (var i = 0; i < group.length; i++) {
                        if (group[i].childType !== undefined && group[i].childType() === Kiwi.ENTITY) {
                            if (this.overlaps(group[i], separateObjects)) {
                                this._callbackFunction.call(this._callbackContext, this._parent, group[i]);
                                results = true;
                            }
                        }
                    }
                }

                return results;
            };

            ArcadePhysics.prototype.updateMotion = function () {
            };

            ArcadePhysics.prototype.setCallback = function (callbackFunction, callbackContext) {
                this._callbackFunction = callbackFunction;
                this._callbackContext = callbackContext;
            };

            ArcadePhysics.prototype.parent = function () {
                return this._parent;
            };

            ArcadePhysics.prototype.update = function () {
                this.last.x = this.transform.x;
                this.last.y = this.transform.y;

                this.width = this._parent.width;
                this.height = this._parent.height;

                if (this.moves)
                    this.updateMotion();

                this.wasTouching = this.touching;
                this.touching = ArcadePhysics.NONE;
            };
            ArcadePhysics.LEFT = 0x0001;

            ArcadePhysics.RIGHT = 0x0010;

            ArcadePhysics.UP = 0x0100;

            ArcadePhysics.DOWN = 0x1000;

            ArcadePhysics.NONE = 0;

            ArcadePhysics.CEILING = ArcadePhysics.UP;

            ArcadePhysics.FLOOR = ArcadePhysics.DOWN;

            ArcadePhysics.WALL = ArcadePhysics.LEFT | ArcadePhysics.RIGHT;

            ArcadePhysics.ANY = ArcadePhysics.LEFT | ArcadePhysics.RIGHT | ArcadePhysics.UP | ArcadePhysics.DOWN;

            ArcadePhysics.OVERLAP_BIAS = 4;
            return ArcadePhysics;
        })(Kiwi.Component);
        Components.ArcadePhysics = ArcadePhysics;
    })(Kiwi.Components || (Kiwi.Components = {}));
    var Components = Kiwi.Components;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Animation) {
        var Anim = (function () {
            function Anim(name, sequence, clock) {
                this._uniqueFrameIndex = 0;
                this._frameIndex = 0;
                this._clock = null;
                this._startTime = null;
                this._reverse = false;
                this._playPending = false;
                this.name = name;
                this._sequence = sequence;
                this._speed = sequence.speed;
                this._loop = sequence.loop;
                this._clock = clock;

                this.onUpdate = new Kiwi.Signal();
                this.onPlay = new Kiwi.Signal();
                this.onStop = new Kiwi.Signal();
                this.onLoop = new Kiwi.Signal();
            }
            Object.defineProperty(Anim.prototype, "loop", {
                get: function () {
                    return this._loop;
                },
                set: function (value) {
                    this._loop = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Anim.prototype, "frameIndex", {
                get: function () {
                    return this._frameIndex;
                },
                set: function (val) {
                    if (this._validateFrame(val)) {
                        this._frameIndex = val;
                    }
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Anim.prototype, "currentCell", {
                get: function () {
                    return this._sequence.cells[this.frameIndex];
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Anim.prototype, "speed", {
                get: function () {
                    return this._speed;
                },
                set: function (value) {
                    this._speed = value;
                },
                enumerable: true,
                configurable: true
            });



            Object.defineProperty(Anim.prototype, "reverse", {
                get: function () {
                    return this._reverse;
                },
                set: function (value) {
                    this._reverse = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Anim.prototype, "clock", {
                get: function () {
                    return this._clock;
                },
                set: function (clock) {
                    this._clock = clock;

                    if (this._playPending)
                        this._start(this._uniqueFrameIndex);
                },
                enumerable: true,
                configurable: true
            });

            Anim.prototype._start = function (index) {
                if (typeof index === "undefined") { index = null; }
                if (index !== null) {
                    this.frameIndex = index;
                }
                this._playPending = false;
                this._isPlaying = true;
                this._startTime = this._clock.elapsed();
                this._tick = this._startTime + this._speed;
                this.onPlay.dispatch();
            };

            Anim.prototype.play = function () {
                if (this._frameIndex === this.length - 1)
                    this.frameIndex = 0;

                this.playAt(this._frameIndex);
            };

            Anim.prototype.playAt = function (index) {
                this._uniqueFrameIndex = index;
                if (this.clock === null) {
                    this._playPending = true;
                } else {
                    this._start(index);
                }
            };

            Anim.prototype.pause = function () {
                this.stop();
            };

            Anim.prototype.resume = function () {
                if (this._startTime !== null) {
                    this._isPlaying = true;
                }
            };

            Anim.prototype.stop = function () {
                if (this._isPlaying) {
                    this._isPlaying = false;
                    this._playPending = false;
                    this.onStop.dispatch();
                }
            };

            Anim.prototype.nextFrame = function () {
                this._frameIndex++;
                if (this._frameIndex >= this.length)
                    this.frameIndex = 0;
            };

            Anim.prototype.prevFrame = function () {
                this._frameIndex--;
                if (this._frameIndex < 0)
                    this.frameIndex = this.length - 1;
            };

            Anim.prototype.update = function () {
                if (this._isPlaying) {
                    if (this.clock.elapsed() >= this._tick) {
                        this._tick = this.clock.elapsed() + this._speed;

                        if (this._reverse)
                            this._frameIndex--; else
                            this._frameIndex++;

                        this.onUpdate.dispatch();
                        if (!this._validateFrame(this._frameIndex)) {
                            if (this._loop) {
                                if (this._reverse) {
                                    this._frameIndex = this.length - 1;
                                    this.onLoop.dispatch();
                                } else {
                                    this._frameIndex = 0;
                                    this.onLoop.dispatch();
                                }
                            } else {
                                this._frameIndex--;
                                this.stop();
                            }
                        }

                        return true;
                    }
                }
                return false;
            };

            Anim.prototype._validateFrame = function (frame) {
                return (frame < this.length && frame >= 0);
            };

            Object.defineProperty(Anim.prototype, "length", {
                get: function () {
                    return this._sequence.cells.length;
                },
                enumerable: true,
                configurable: true
            });
            return Anim;
        })();
        Animation.Anim = Anim;
    })(Kiwi.Animation || (Kiwi.Animation = {}));
    var Animation = Kiwi.Animation;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Animation) {
        var Sequence = (function () {
            function Sequence(name, cells, speed, loop) {
                if (typeof speed === "undefined") { speed = 0.1; }
                if (typeof loop === "undefined") { loop = true; }
                this.name = name;
                this.cells = cells;
                this.speed = speed;
                this.loop = loop;
            }
            return Sequence;
        })();
        Animation.Sequence = Sequence;
    })(Kiwi.Animation || (Kiwi.Animation = {}));
    var Animation = Kiwi.Animation;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    var StateManager = (function () {
        function StateManager(game) {
            this.current = null;
            this._game = game;

            this._states = [];
        }
        StateManager.prototype.objType = function () {
            return "StateManager";
        };

        StateManager.prototype.checkKeyExists = function (key) {
            for (var i = 0; i < this._states.length; i++) {
                if (this._states[i].config.name === key) {
                    return true;
                }
            }

            return false;
        };

        StateManager.prototype.checkValidState = function (state) {
            if (!state['game'] || !state['config']) {
                return false;
            }

            return true;
        };

        StateManager.prototype.addState = function (state, switchTo) {
            if (typeof switchTo === "undefined") { switchTo = false; }
            var tempState;

            if (typeof state === 'function') {
                tempState = new state();
            } else if (typeof state === 'string') {
                tempState = window[state];
            } else {
                tempState = state;
            }

            if (tempState.config.name && this.checkKeyExists(tempState.config.name) === true) {
                return false;
            }

            tempState.game = this._game;

            if (this.checkValidState(tempState) === false) {
                return false;
            } else {
                this._states.push(tempState);

                if (switchTo === true) {
                    this.setCurrentState(tempState.config.name);
                }

                return true;
            }
        };

        StateManager.prototype.boot = function () {
            if (this.current !== null) {
                this.current.boot();
            }

            if (this.current !== null && this.current.config.isInitialised === false) {
                if (this.current.config.hasInit === true) {
                    this.current.init();
                }

                this.current.config.isInitialised = true;

                this.checkPreload();
            }
        };

        StateManager.prototype.setCurrentState = function (key) {
            if (this.current !== null && this.current.config.name === key) {
                return false;
            }

            if (this.current !== null) {
                this._game.input.reset();
                this.current.destroy();
            }

            if (this.checkKeyExists(key) === true) {
                this.current = this.getState(key);

                if (this._game.stage.domReady === true) {
                    if (this.current.config.isInitialised === false) {
                        this.current.boot();

                        if (this.current.config.hasInit === true) {
                            if (this.current.config.initParams) {
                                this.current.init.apply(this.current, this.current.config.initParams);
                            } else {
                                this.current.init.call(this.current);
                            }
                        }

                        this.current.config.isInitialised = true;
                    }

                    this.checkPreload();
                }

                return true;
            } else {
                return false;
            }
        };

        StateManager.prototype.switchState = function (key, state, initParams, createParams) {
            if (typeof state === "undefined") { state = null; }
            if (typeof initParams === "undefined") { initParams = null; }
            if (typeof createParams === "undefined") { createParams = null; }
            if (this.current !== null && this.current.config.isReady === false) {
                return false;
            }

            if (this.checkKeyExists(key) === false && state !== null) {
                if (this.addState(state, false) === false) {
                    return false;
                }
            }

            if (initParams !== null || createParams !== null) {
                var newState = this.getState(key);

                newState.config.initParams = [];

                for (var initParameter in initParams) {
                    newState.config.initParams.push(initParams[initParameter]);
                }

                newState.config.createParams = [];

                for (var createParameter in createParams) {
                    newState.config.createParams.push(createParams[createParameter]);
                }
            }

            return this.setCurrentState(key);
        };

        StateManager.prototype.getState = function (key) {
            for (var i = 0; i < this._states.length; i++) {
                if (this._states[i].config.name === key) {
                    return this._states[i];
                }
            }

            return null;
        };

        StateManager.prototype.checkPreload = function () {
            var _this = this;
            if (this.current.config.hasPreloader === true) {
                this._game.loader.init(function (percent, bytes, file) {
                    return _this.onLoadProgress(percent, bytes, file);
                }, function () {
                    return _this.onLoadComplete();
                });
                this.current.preload();
                this._game.loader.startLoad();
            } else {
                if (this.current.config.hasCreate === true && this.current.config.isCreated === false) {
                    this.current.config.isCreated = true;

                    if (this.current.config.createParams) {
                        this.current.create.apply(this.current, this.current.config.createParams);
                    } else {
                        this.current.create.call(this.current);
                    }
                }

                this.current.config.isReady = true;
            }
        };

        StateManager.prototype.onLoadProgress = function (percent, bytesLoaded, file) {
            if (this.current.config.hasLoadProgress === true) {
                this.current.loadProgress(percent, bytesLoaded, file);
            }
        };

        StateManager.prototype.onLoadComplete = function () {
            if (this.current.config.hasLoadComplete === true) {
                this.current.loadComplete();
            }

            this.rebuildLibraries();

            this.current.config.isReady = true;

            if (this.current.config.hasCreate === true) {
                this.current.config.isCreated = true;
                if (this.current.config.createParams) {
                    this.current.create.apply(this.current, this.current.config.createParams);
                } else {
                    this.current.create.call(this.current);
                }
            }
        };

        StateManager.prototype.rebuildLibraries = function () {
            this.current.textureLibrary.clear();
            this.current.audioLibrary.clear();
            this.current.dataLibrary.clear();

            var fileStoreKeys = this._game.fileStore.keys;

            for (var i = 0; i < fileStoreKeys.length; i++) {
                var file = this._game.fileStore.getFile(fileStoreKeys[i]);
                if (file.isTexture) {
                    this.current.textureLibrary.add(file);
                } else if (file.isAudio) {
                    this.current.audioLibrary.add(file);
                } else if (file.isData) {
                    this.current.dataLibrary.add(file);
                }
            }
        };

        StateManager.prototype.update = function () {
            if (this.current !== null) {
                if (this.current.config.isReady === true) {
                    this.current.preUpdate();
                    this.current.update();
                    this.current.postUpdate();
                } else {
                    this.current.loadUpdate();
                }
            }
        };

        StateManager.prototype.postRender = function () {
            if (this.current !== null) {
                if (this.current.config.isReady === true) {
                    this.current.postRender();
                }
            }
        };
        return StateManager;
    })();
    Kiwi.StateManager = StateManager;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Files) {
        var Loader = (function () {
            function Loader(game) {
                this._calculateBytes = true;
                this._fileTotal = 0;
                this._currentFile = 0;
                this._bytesTotal = 0;
                this._bytesLoaded = 0;
                this._bytesCurrent = 0;
                this._fileChunk = 0;
                this._percentLoaded = 0;
                this._complete = false;
                this._game = game;
            }
            Loader.prototype.objType = function () {
                return "Loader";
            };

            Loader.prototype.boot = function () {
                this._fileList = [];
                this._loadList = [];
            };

            Loader.prototype.init = function (progress, complete, calculateBytes) {
                if (typeof progress === "undefined") { progress = null; }
                if (typeof complete === "undefined") { complete = null; }
                if (typeof calculateBytes === "undefined") { calculateBytes = false; }
                this._fileList.length = 0;
                this._loadList.length = 0;

                this._calculateBytes = calculateBytes;
                this._complete = false;

                if (progress !== null) {
                    this._onProgressCallback = progress;
                }

                if (complete !== null) {
                    this._onCompleteCallback = complete;
                }
            };

            Loader.prototype.addImage = function (key, url, width, height, offsetX, offsetY, storeAsGlobal) {
                if (typeof storeAsGlobal === "undefined") { storeAsGlobal = true; }
                var file = new Kiwi.Files.File(this._game, Kiwi.Files.File.IMAGE, url, key, true, storeAsGlobal);
                file.metadata = { width: width, height: height, offsetX: offsetX, offsetY: offsetY };

                this._fileList.push(file);
            };

            Loader.prototype.addSpriteSheet = function (key, url, frameWidth, frameHeight, numCells, rows, cols, sheetOffsetX, sheetOffsetY, cellOffsetX, cellOffsetY, storeAsGlobal) {
                if (typeof storeAsGlobal === "undefined") { storeAsGlobal = true; }
                var file = new Kiwi.Files.File(this._game, Kiwi.Files.File.SPRITE_SHEET, url, key, true, storeAsGlobal);

                file.metadata = { frameWidth: frameWidth, frameHeight: frameHeight, numCells: numCells, rows: rows, cols: cols, sheetOffsetX: sheetOffsetX, sheetOffsetY: sheetOffsetY, cellOffsetX: cellOffsetX, cellOffsetY: cellOffsetY };

                this._fileList.push(file);
            };

            Loader.prototype.addTextureAtlas = function (key, imageURL, jsonID, jsonURL, storeAsGlobal) {
                if (typeof storeAsGlobal === "undefined") { storeAsGlobal = true; }
                var imageFile = new Kiwi.Files.File(this._game, Kiwi.Files.File.TEXTURE_ATLAS, imageURL, key, true, storeAsGlobal);
                var jsonFile = new Kiwi.Files.File(this._game, Kiwi.Files.File.JSON, jsonURL, jsonID, true, storeAsGlobal);

                imageFile.metadata = { jsonID: jsonID };
                jsonFile.metadata = { imageID: key };

                this._fileList.push(imageFile, jsonFile);
            };

            Loader.prototype.addAudio = function (key, url, storeAsGlobal) {
                if (typeof storeAsGlobal === "undefined") { storeAsGlobal = true; }
                this._fileList.push(new Kiwi.Files.File(this._game, Kiwi.Files.File.AUDIO, url, key, true, storeAsGlobal));
            };

            Loader.prototype.addJSON = function (key, url, storeAsGlobal) {
                if (typeof storeAsGlobal === "undefined") { storeAsGlobal = true; }
                this._fileList.push(new Kiwi.Files.File(this._game, Kiwi.Files.File.JSON, url, key, true, storeAsGlobal));
            };

            Loader.prototype.addXML = function (key, url, storeAsGlobal) {
                if (typeof storeAsGlobal === "undefined") { storeAsGlobal = true; }
                this._fileList.push(new Kiwi.Files.File(this._game, Kiwi.Files.File.XML, url, key, true, storeAsGlobal));
            };

            Loader.prototype.addBinaryFile = function (key, url, storeAsGlobal) {
                if (typeof storeAsGlobal === "undefined") { storeAsGlobal = true; }
                this._fileList.push(new Kiwi.Files.File(this._game, Kiwi.Files.File.BINARY_DATA, url, key, true, storeAsGlobal));
            };

            Loader.prototype.addTextFile = function (key, url, storeAsGlobal) {
                if (typeof storeAsGlobal === "undefined") { storeAsGlobal = true; }
                this._fileList.push(new Kiwi.Files.File(this._game, Kiwi.Files.File.TEXT_DATA, url, key, true, storeAsGlobal));
            };

            Loader.prototype.startLoad = function () {
                if (this._fileList.length === 0) {
                    this._onCompleteCallback();
                } else {
                    this._onProgressCallback(0, 0, null);

                    this._fileTotal = this._fileList.length;
                    this._bytesLoaded = 0;
                    this._bytesTotal = 0;
                    this._bytesCurrent = 0;
                    this._currentFile = 0;
                    this._fileChunk = 0;
                    this._percentLoaded = 0;

                    if (this._calculateBytes === true) {
                        this.getNextFileSize();
                    } else {
                        this._fileChunk = Math.floor(100 / this._fileTotal);
                        this._loadList = this._fileList;

                        this.nextFile();
                    }
                }
            };

            Loader.prototype.getNextFileSize = function () {
                var _this = this;
                if (this._fileList.length === 0) {
                    var tempFile = this._fileList.shift();

                    tempFile.getFileDetails(function (file) {
                        return _this.addToBytesTotal(file);
                    });
                } else {
                    this.nextFile();
                }
            };

            Loader.prototype.addToBytesTotal = function (file) {
                this._bytesTotal += file.fileSize;

                this._loadList.push(file);

                this.getNextFileSize();
            };

            Loader.prototype.nextFile = function () {
                var _this = this;
                this._currentFile++;

                var tempFile = this._loadList.shift();

                tempFile.load(function (f) {
                    return _this.fileLoadComplete(f);
                }, function (f) {
                    return _this.fileLoadProgress(f);
                });
            };

            Loader.prototype.fileLoadProgress = function (file) {
                if (this._calculateBytes === true) {
                    this._bytesCurrent = file.bytesLoaded;

                    if (this._onProgressCallback) {
                        this._onProgressCallback(this.getPercentLoaded(), this.getBytesLoaded(), file);
                    }
                }
            };

            Loader.prototype.fileLoadComplete = function (file) {
                if (this._calculateBytes === true) {
                    this._bytesLoaded += file.bytesTotal;
                    this._bytesCurrent = 0;

                    if (this._onProgressCallback) {
                        this._onProgressCallback(this.getPercentLoaded(), this._bytesLoaded, file);
                    }
                } else {
                    if (this._onProgressCallback) {
                        this._onProgressCallback(this.getPercentLoaded(), 0, file);
                    }
                }

                if (this._loadList.length === 0) {
                    this._complete = true;

                    if (this._onCompleteCallback) {
                        this._onCompleteCallback();
                    }
                } else {
                    this.nextFile();
                }
            };

            Loader.prototype.getBytesLoaded = function () {
                return this._bytesLoaded + this._bytesCurrent;
            };

            Loader.prototype.getPercentLoaded = function () {
                if (this._calculateBytes === true) {
                    return Math.round((this.getBytesLoaded() / this._bytesTotal) * 100);
                } else {
                    return Math.round((this._currentFile / this._fileTotal) * 100);
                }
            };

            Loader.prototype.calculateBytes = function (value) {
                if (value) {
                    this._calculateBytes = value;
                }

                return this._calculateBytes;
            };

            Loader.prototype.complete = function () {
                return this._complete;
            };
            return Loader;
        })();
        Files.Loader = Loader;
    })(Kiwi.Files || (Kiwi.Files = {}));
    var Files = Kiwi.Files;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Files) {
        var DataLibrary = (function () {
            function DataLibrary(game) {
                this._game = game;
                this.data = {};
            }
            DataLibrary.prototype.objType = function () {
                return "DataLibrary";
            };

            DataLibrary.prototype.clear = function () {
                for (var prop in this.data) {
                    delete this.data[prop];
                }
            };

            DataLibrary.prototype.add = function (dataFile) {
                switch (dataFile.dataType) {
                    case Kiwi.Files.File.JSON:
                    case Kiwi.Files.File.XML:
                    case Kiwi.Files.File.BINARY_DATA:
                    case Kiwi.Files.File.TEXT_DATA:
                        this.data[dataFile.key] = dataFile;
                        break;

                    default:
                        break;
                }
            };
            return DataLibrary;
        })();
        Files.DataLibrary = DataLibrary;
    })(Kiwi.Files || (Kiwi.Files = {}));
    var Files = Kiwi.Files;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Files) {
        var File = (function () {
            function File(game, dataType, path, name, saveToFileStore, storeAsGlobal) {
                if (typeof name === "undefined") { name = ''; }
                if (typeof saveToFileStore === "undefined") { saveToFileStore = true; }
                if (typeof storeAsGlobal === "undefined") { storeAsGlobal = true; }
                this._saveToFileStore = true;
                this._useTagLoader = true;
                this.fileSize = 0;
                this.status = 0;
                this.statusText = '';
                this.ETag = '';
                this.lastModified = '';
                this.totalSize = 0;
                this.bytesLoaded = 0;
                this.bytesTotal = 0;
                this.readyState = 0;
                this.timeOutDelay = 2000;
                this.hasTimedOut = false;
                this.timedOut = 0;
                this.timeStarted = 0;
                this.timeFinished = 0;
                this.duration = 0;
                this.hasError = false;
                this.success = false;
                this.attemptCounter = 0;
                this.maxLoadAttempts = 2;
                this.onCompleteCallback = null;
                this.onProgressCallback = null;
                this.lastProgress = 0;
                this.percentLoaded = 0;
                this._game = game;

                this.dataType = dataType;

                this.fileURL = path;

                if (path.lastIndexOf('/') > -1) {
                    this.fileName = path.substr(path.lastIndexOf('/') + 1);
                    this.filePath = path.substr(0, path.lastIndexOf('/') + 1);
                } else {
                    this.filePath = '';
                    this.fileName = path;
                }

                this.fileExtension = path.substr(path.lastIndexOf('.') + 1).toLowerCase();

                if (Kiwi.DEVICE.blob) {
                    this._useTagLoader = true;
                } else {
                    this._useTagLoader = true;
                }

                if (this.dataType === Kiwi.Files.File.AUDIO) {
                    if (this._game.audio.usingAudioTag === true) {
                        this._useTagLoader = true;
                    } else {
                        this._useTagLoader = false;
                    }
                }

                if (this.dataType === Kiwi.Files.File.JSON) {
                    this._useTagLoader = false;
                }

                this._saveToFileStore = saveToFileStore;
                this._fileStore = this._game.fileStore;

                if (this._game.states.current && !storeAsGlobal) {
                    this.ownerState = this._game.states.current;
                } else {
                    this.ownerState = null;
                }

                if (this.key === '') {
                    this.key = this.fileName;
                } else {
                    this.key = name;
                }
            }
            File.prototype.objType = function () {
                return "File";
            };

            File.prototype.addTag = function (tag) {
                if (this._tags.indexOf(tag) == -1) {
                    this._tags.push(tag);
                }
            };

            File.prototype.removeTag = function (tag) {
                var index = this._tags.indexOf(tag);
                if (index != -1) {
                    this._tags.splice(index, 1);
                }
            };

            File.prototype.hasTag = function (tag) {
                if (this._tags.indexOf(tag) == -1) {
                    return false;
                }
                return true;
            };

            Object.defineProperty(File.prototype, "isTexture", {
                get: function () {
                    if (this.dataType === File.IMAGE || this.dataType === File.SPRITE_SHEET || this.dataType === File.TEXTURE_ATLAS) {
                        return true;
                    }
                    return false;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(File.prototype, "isAudio", {
                get: function () {
                    if (this.dataType === File.AUDIO) {
                        return true;
                    }
                    return false;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(File.prototype, "isData", {
                get: function () {
                    if (this.dataType === File.XML || this.dataType === File.JSON || this.dataType === File.TEXT_DATA || this.dataType === File.BINARY_DATA) {
                        return true;
                    }
                    return false;
                },
                enumerable: true,
                configurable: true
            });

            File.prototype.load = function (onCompleteCallback, onProgressCallback, customFileStore, maxLoadAttempts, timeout) {
                if (typeof onCompleteCallback === "undefined") { onCompleteCallback = null; }
                if (typeof onProgressCallback === "undefined") { onProgressCallback = null; }
                if (typeof customFileStore === "undefined") { customFileStore = null; }
                if (typeof maxLoadAttempts === "undefined") { maxLoadAttempts = 1; }
                if (typeof timeout === "undefined") { timeout = 2000; }
                this.onCompleteCallback = onCompleteCallback;
                this.onProgressCallback = onProgressCallback;
                this.maxLoadAttempts = maxLoadAttempts;
                this.timeOutDelay = timeout;

                if (customFileStore !== null) {
                    this._fileStore = customFileStore;
                    this._saveToFileStore = true;
                }

                this.start();

                if (this._useTagLoader === true) {
                    this.tagLoader();
                } else {
                    this.xhrLoader();
                }
            };

            File.prototype.start = function () {
                this.timeStarted = Date.now();
                this.lastProgress = Date.now();
                this.percentLoaded = 0;
            };

            File.prototype.stop = function () {
                this.percentLoaded = 100;
                this.timeFinished = Date.now();
                this.duration = this.timeFinished - this.timeStarted;
            };

            File.prototype.tagLoader = function () {
                var _this = this;
                if (this.dataType === Kiwi.Files.File.IMAGE || this.dataType === Kiwi.Files.File.SPRITE_SHEET || this.dataType === Kiwi.Files.File.TEXTURE_ATLAS) {
                    this.data = new Image();
                    this.data.src = this.fileURL;
                    this.data.onload = function (event) {
                        return _this.tagLoaderOnLoad(event);
                    };
                    this.data.onerror = function (event) {
                        return _this.tagLoaderOnError(event);
                    };
                    this.data.onreadystatechange = function (event) {
                        return _this.tagLoaderOnReadyStateChange(event);
                    };
                } else if (this.dataType === Kiwi.Files.File.AUDIO) {
                    this.data = new Audio();
                    this.data.src = this.fileURL;
                    this.data.preload = 'auto';
                    this.data.onerror = function (event) {
                        return _this.tagLoaderOnError(event);
                    };
                    this.data.addEventListener('canplaythrough', function () {
                        return _this.tagLoaderOnLoad(null);
                    }, false);
                    this.data.onload = function (event) {
                        return _this.tagLoaderOnLoad(event);
                    };
                    this.data.load();
                    this.data.volume = 0;
                    this.data.play();
                }
            };

            File.prototype.tagLoaderOnReadyStateChange = function (event) {
            };

            File.prototype.tagLoaderOnError = function (event) {
                this.hasError = true;
                this.error = event;

                if (this.onCompleteCallback) {
                    this.onCompleteCallback(this);
                }
            };

            File.prototype.tagLoaderProgressThrough = function (event) {
                this.stop();

                if (this.onCompleteCallback) {
                    this.onCompleteCallback(this);
                }
            };

            File.prototype.tagLoaderOnLoad = function (event) {
                var _this = this;
                if (this.percentLoaded !== 100) {
                    this.stop();

                    if (this.dataType === Kiwi.Files.File.AUDIO) {
                        this.data.removeEventListener('canplaythrough', function () {
                            return _this.tagLoaderOnLoad(null);
                        });
                        this.data.pause();
                        this.data.currentTime = 0;
                        this.data.volume = 1;
                    }

                    if (this._saveToFileStore === true) {
                        this._fileStore.addFile(this.key, this);
                    }

                    if (this.onCompleteCallback) {
                        this.onCompleteCallback(this);
                    }
                }
            };

            File.prototype.xhrLoader = function () {
                var _this = this;
                this._xhr = new XMLHttpRequest();
                this._xhr.open('GET', this.fileURL, true);
                this._xhr.timeout = this.timeOutDelay;
                this._xhr.responseType = 'arraybuffer';

                this._xhr.onloadstart = function (event) {
                    return _this.xhrOnLoadStart(event);
                };
                this._xhr.onload = function (event) {
                    return _this.xhrOnLoad(event);
                };
                this._xhr.onprogress = function (event) {
                    return _this.xhrOnProgress(event);
                };
                this._xhr.ontimeout = function (event) {
                    return _this.xhrOnTimeout(event);
                };
                this._xhr.onabort = function (event) {
                    return _this.xhrOnAbort(event);
                };
                this._xhr.onreadystatechange = function (event) {
                    return _this.xhrOnReadyStateChange(event);
                };

                this._xhr.send();
            };

            File.prototype.xhrOnReadyStateChange = function (event) {
                this.readyState = event.target.readyState;

                if (this.readyState === 4) {
                    this.xhrOnLoad(event);
                }
            };

            File.prototype.xhrOnLoadStart = function (event) {
                this.timeStarted = event.timeStamp;
                this.lastProgress = event.timeStamp;
            };

            File.prototype.xhrOnAbort = function (event) {
            };

            File.prototype.xhrOnError = function (event) {
            };

            File.prototype.xhrOnTimeout = function (event) {
            };

            File.prototype.xhrOnProgress = function (event) {
                this.bytesLoaded = parseInt(event.loaded);
                this.bytesTotal = parseInt(event.totalSize);
                this.percentLoaded = Math.round((this.bytesLoaded / this.bytesTotal) * 100);

                if (this.onProgressCallback) {
                    this.onProgressCallback(this);
                }
            };

            File.prototype.xhrOnLoad = function (event) {
                if (this.timeFinished > 0) {
                    return;
                }

                this.stop();

                this.status = this._xhr.status;
                this.statusText = this._xhr.statusText;

                if (this._xhr.status === 200) {
                    this.success = true;
                    this.hasError = false;
                    this.fileType = this._xhr.getResponseHeader('Content-Type');
                    this.bytesTotal = parseInt(this._xhr.getResponseHeader('Content-Length'));
                    this.lastModified = this._xhr.getResponseHeader('Last-Modified');
                    this.ETag = this._xhr.getResponseHeader('ETag');
                    this.buffer = this._xhr.response;

                    if (this.dataType === Kiwi.Files.File.IMAGE || this.dataType === Kiwi.Files.File.SPRITE_SHEET || this.dataType === Kiwi.Files.File.TEXTURE_ATLAS) {
                        this.createBlob();
                    } else {
                        if (this.dataType === Kiwi.Files.File.JSON) {
                            this.data = String.fromCharCode.apply(null, new Uint8Array(this._xhr.response));
                            this.parseComplete();
                        }

                        if (this.dataType === Kiwi.Files.File.AUDIO) {
                            if (this._game.audio.usingWebAudio) {
                                this.data = {
                                    raw: this._xhr.response,
                                    decoded: false,
                                    buffer: null
                                };

                                var that = this;
                                this._game.audio.context.decodeAudioData(this.data.raw, function (buffer) {
                                    if (buffer) {
                                        that.data.buffer = buffer;
                                        that.data.decoded = true;
                                        that.parseComplete();
                                    }
                                });
                            }
                        }
                    }
                } else {
                    this.success = false;
                    this.hasError = true;
                    this.parseComplete();
                }
            };

            File.prototype.createBlob = function () {
                var _this = this;
                this.data = document.createElement('img');
                this.data.onload = function () {
                    return _this.revoke();
                };

                var imageType = '';

                if (this.fileExtension === 'jpg' || this.fileExtension === 'jpeg') {
                    imageType = 'image/jpeg';
                } else if (this.fileExtension === 'png') {
                    imageType = 'image/png';
                } else if (this.fileExtension === 'gif') {
                    imageType = 'image/gif';
                }

                var blob = new window['Blob']([this.buffer], { type: imageType });

                if (window['URL']) {
                    this.data.src = window['URL'].createObjectURL(blob);
                } else if (window['webkitURL']) {
                    this.data.src = window['webkitURL'].createObjectURL(blob);
                }
            };

            File.prototype.revoke = function () {
                if (window['URL']) {
                    window['URL'].revokeObjectURL(this.data.src);
                } else if (window['webkitURL']) {
                    window['webkitURL'].revokeObjectURL(this.data.src);
                }

                this.parseComplete();
            };

            File.prototype.parseComplete = function () {
                if (this._saveToFileStore === true) {
                    this._fileStore.addFile(this.key, this);
                }

                if (this.onCompleteCallback) {
                    this.onCompleteCallback(this);
                }
            };

            File.prototype.getFileDetails = function (callback, maxLoadAttempts, timeout) {
                if (typeof callback === "undefined") { callback = null; }
                if (typeof maxLoadAttempts === "undefined") { maxLoadAttempts = 1; }
                if (typeof timeout === "undefined") { timeout = 2000; }
                this.onCompleteCallback = callback;
                this.maxLoadAttempts = maxLoadAttempts;
                this.timeOutDelay = timeout;

                this.sendXHRHeadRequest();
            };

            File.prototype.sendXHRHeadRequest = function () {
                var _this = this;
                this.attemptCounter++;

                this._xhr = new XMLHttpRequest();
                this._xhr.open('HEAD', this.fileURL, false);
                this._xhr.onload = function (event) {
                    return _this.getXHRResponseHeaders(event);
                };
                this._xhr.ontimeout = function (event) {
                    return _this.xhrHeadOnTimeout(event);
                };
                this._xhr.onerror = function (event) {
                    return _this.xhrHeadOnError(event);
                };
                this._xhr.timeout = this.timeOutDelay;
                this._xhr.send();
            };

            File.prototype.xhrHeadOnTimeout = function (event) {
                this.hasTimedOut = true;
                this.timedOut = Date.now();

                if (this.attemptCounter >= this.maxLoadAttempts) {
                    this.hasError = true;
                    this.error = event;

                    if (this.onCompleteCallback) {
                        this.onCompleteCallback.call(this);
                    }
                } else {
                    this.sendXHRHeadRequest();
                }
            };

            File.prototype.xhrHeadOnError = function (event) {
                this.hasError = true;
                this.error = event;
                this.status = this._xhr.status;
                this.statusText = this._xhr.statusText;

                if (this.onCompleteCallback) {
                    this.onCompleteCallback(this);
                }
            };

            File.prototype.getXHRResponseHeaders = function (event) {
                this.status = this._xhr.status;
                this.statusText = this._xhr.statusText;

                if (this._xhr.status === 200) {
                    this.fileType = this._xhr.getResponseHeader('Content-Type');
                    this.fileSize = parseInt(this._xhr.getResponseHeader('Content-Length'));
                    this.lastModified = this._xhr.getResponseHeader('Last-Modified');
                    this.ETag = this._xhr.getResponseHeader('ETag');
                }

                if (this.onCompleteCallback) {
                    this.onCompleteCallback(this);
                }
            };

            File.prototype.toString = function () {
                return "[{File (fileURL=" + this.fileURL + " fileName=" + this.fileName + " dataType=" + this.dataType + " fileSize=" + this.fileSize + " success=" + this.success + " status=" + this.status + ")}]";
            };
            File.IMAGE = 0;

            File.SPRITE_SHEET = 1;

            File.TEXTURE_ATLAS = 2;

            File.AUDIO = 3;

            File.JSON = 4;

            File.XML = 5;

            File.BINARY_DATA = 6;

            File.TEXT_DATA = 7;
            return File;
        })();
        Files.File = File;
    })(Kiwi.Files || (Kiwi.Files = {}));
    var Files = Kiwi.Files;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Files) {
        var FileStore = (function () {
            function FileStore(game) {
                this._size = 0;
                this._game = game;
                this._files = {};
            }
            FileStore.prototype.objType = function () {
                return "FileStore";
            };

            FileStore.prototype.boot = function () {
            };

            FileStore.prototype.getFile = function (key) {
                return this._files[key];
            };

            FileStore.prototype.getFilesByTag = function (tag) {
                var obj = {};
                for (var file in this._files) {
                    if (this._files[file].hasTag(tag)) {
                        obj[file] = this._files[file];
                    }
                }
                return obj;
            };

            FileStore.prototype.removeFilesByTag = function (tag) {
                var obj = {};
                for (var file in this._files) {
                    if (this._files[file].hasTag(tag)) {
                        this.removeFile(file);
                    }
                }
                return obj;
            };

            Object.defineProperty(FileStore.prototype, "keys", {
                get: function () {
                    var keys = new Array();
                    for (var key in this._files) {
                        keys.push(key);
                    }

                    return keys;
                },
                enumerable: true,
                configurable: true
            });

            FileStore.prototype.size = function () {
                return this._size;
            };

            FileStore.prototype.addFile = function (key, value) {
                if (!this._files[key]) {
                    this._files[key] = value;
                    this._size++;
                    return true;
                }

                return false;
            };

            FileStore.prototype.exists = function (key) {
                if (this._files[key]) {
                    return true;
                } else {
                    return false;
                }
            };

            FileStore.prototype.removeStateFiles = function (state) {
                for (var file in this._files) {
                    if (this._files[file].ownerState === state) {
                        this.removeFile(file);
                    }
                }
            };

            FileStore.prototype.removeFile = function (key) {
                if (this._files[key]) {
                    this._files[key] = null;
                    delete this._files[key];
                    return true;
                }

                return false;
            };
            return FileStore;
        })();
        Files.FileStore = FileStore;
    })(Kiwi.Files || (Kiwi.Files = {}));
    var Files = Kiwi.Files;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Components) {
        var Animation = (function (_super) {
            __extends(Animation, _super);
            function Animation(entity) {
                _super.call(this, 'Animation');
                this.currentAnimation = null;
                this._isPlaying = false;
                this._clock = null;

                this.entity = entity;
                this._atlas = this.entity.atlas;
                this._animations = {};

                for (var i = 0; i < this._atlas.sequences.length; i++) {
                    this.createFromSequence(this._atlas.sequences[i], false);
                }

                if (this._animations['default']) {
                    this.currentAnimation = this._animations['default'];
                } else {
                    var defaultCells = [];
                    for (var i = 0; i < this._atlas.cells.length; i++) {
                        defaultCells.push(i);
                    }
                    this.currentAnimation = this.add('default', defaultCells, 0.1, true, false);
                }
            }
            Object.defineProperty(Animation.prototype, "isPlaying", {
                get: function () {
                    return this._isPlaying;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Animation.prototype, "clock", {
                get: function () {
                    return this._clock;
                },
                set: function (clock) {
                    if (this.clock == null)
                        this.currentAnimation.clock = clock;

                    this._clock = clock;
                },
                enumerable: true,
                configurable: true
            });

            Animation.prototype.objType = function () {
                return "Animation";
            };

            Animation.prototype.add = function (name, cells, speed, loop, play) {
                if (typeof loop === "undefined") { loop = false; }
                if (typeof play === "undefined") { play = false; }
                var newSequence = new Kiwi.Animation.Sequence(name, cells, speed, loop);
                this._atlas.sequences.push(newSequence);

                return this.createFromSequence(newSequence, play);
            };

            Animation.prototype.createFromSequence = function (sequence, play) {
                if (typeof play === "undefined") { play = false; }
                this._animations[sequence.name] = new Kiwi.Animation.Anim(sequence.name, sequence, this.clock);

                if (play)
                    this.play(sequence.name);

                return this._animations[sequence.name];
            };

            Animation.prototype.play = function (name) {
                if (typeof name === "undefined") { name = this.currentAnimation.name; }
                return this._play(name);
            };

            Animation.prototype.playAt = function (index, name) {
                if (typeof name === "undefined") { name = this.currentAnimation.name; }
                return this._play(name, index);
            };

            Animation.prototype._play = function (name, index) {
                if (typeof index === "undefined") { index = null; }
                this._isPlaying = true;
                this._setCurrentAnimation(name);
                if (this._clock !== null)
                    this.currentAnimation.clock = this._clock;

                if (index !== null)
                    this.currentAnimation.playAt(index); else
                    this.currentAnimation.play();

                this._setCellIndex();

                return this.currentAnimation;
            };

            Animation.prototype.stop = function () {
                if (this.isPlaying === true) {
                    this.currentAnimation.stop();
                }
                this._isPlaying = false;
            };

            Animation.prototype.pause = function () {
                this.currentAnimation.pause();
                this._isPlaying = false;
            };

            Animation.prototype.resume = function () {
                this.currentAnimation.resume();
                this._isPlaying = true;
            };

            Animation.prototype.switchTo = function (val, play) {
                if (typeof play === "undefined") { play = null; }
                switch (typeof val) {
                    case "string":
                        if (this.currentAnimation.name !== val) {
                            this._setCurrentAnimation(val);
                        }
                        break;
                    case "number":
                        this.currentAnimation.frameIndex = val;
                        break;
                }

                if (play || play === null && this.isPlaying)
                    this.play();
                if (play == false && this.isPlaying)
                    this.stop();

                this._setCellIndex();
            };

            Animation.prototype.nextFrame = function () {
                this.currentAnimation.nextFrame();
                this._setCellIndex();
            };

            Animation.prototype.prevFrame = function () {
                this.currentAnimation.prevFrame();
                this._setCellIndex();
            };

            Animation.prototype._setCurrentAnimation = function (name) {
                if (this.currentAnimation !== null)
                    this.currentAnimation.stop();
                if (this._animations[name]) {
                    this.currentAnimation = this._animations[name];
                    if (this._clock !== null)
                        this.currentAnimation.clock = this._clock;
                }
            };

            Animation.prototype.update = function () {
                if (this.currentAnimation && this.isPlaying) {
                    if (this.currentAnimation.update()) {
                        this._setCellIndex();
                    }
                }
            };

            Object.defineProperty(Animation.prototype, "currentCell", {
                get: function () {
                    return this.currentAnimation.currentCell;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Animation.prototype, "frameIndex", {
                get: function () {
                    return this.currentAnimation.frameIndex;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Animation.prototype, "length", {
                get: function () {
                    return this.currentAnimation.length;
                },
                enumerable: true,
                configurable: true
            });

            Animation.prototype.getAnimation = function (name) {
                return this._animations[name];
            };

            Animation.prototype._setCellIndex = function () {
                this.entity.cellIndex = this.currentCell;
            };

            Object.defineProperty(Animation.prototype, "toString", {
                get: function () {
                    return '[{Animation (x=' + this.active + ')}]';
                },
                enumerable: true,
                configurable: true
            });
            return Animation;
        })(Kiwi.Component);
        Components.Animation = Animation;
    })(Kiwi.Components || (Kiwi.Components = {}));
    var Components = Kiwi.Components;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (GameObjects) {
        var Sprite = (function (_super) {
            __extends(Sprite, _super);
            function Sprite(state, atlas, x, y, enableInput) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                if (typeof enableInput === "undefined") { enableInput = false; }
                _super.call(this, state, x, y);

                this.name = atlas.name;
                this.atlas = atlas;
                this.cellIndex = this.atlas.cellIndex;

                this.width = atlas.cells[0].w;
                this.height = atlas.cells[0].h;

                this.box = this.components.add(new Kiwi.Components.Box(x, y, this.width, this.height));
                this.input = this.components.add(new Kiwi.Components.Input(this, this.box, enableInput));

                this.input.game = this.game;

                if (this.atlas.type === Kiwi.Textures.TextureAtlas.SINGLE_IMAGE) {
                    this.animation = null;
                    this._isAnimated = false;
                } else {
                    this.animation = this.components.add(new Kiwi.Components.Animation(this));
                    this.animation.clock = this.clock;
                    this._isAnimated = true;
                }
            }
            Sprite.prototype.objType = function () {
                return "Sprite";
            };

            Sprite.prototype.update = function () {
                _super.prototype.update.call(this);

                if (this._isAnimated) {
                    this.animation.update();
                    this.width = this.atlas.cells[this.cellIndex].w;
                    this.height = this.atlas.cells[this.cellIndex].h;

                    this.box.rawHitbox.width = this.width;
                    this.box.rawHitbox.height = this.height;
                }

                this.input.update();
            };

            Sprite.prototype.render = function (camera) {
                _super.prototype.render.call(this, camera);

                if (this.alpha > 0 && this.visiblity) {
                    var ctx = this.game.stage.ctx;
                    ctx.save();

                    if (this.alpha > 0 && this.alpha <= 1) {
                        ctx.globalAlpha = this.alpha;
                    }

                    var t = this.transform;
                    var m = t.getConcatenatedMatrix();

                    ctx.setTransform(m.a, m.b, m.c, m.d, m.tx + t.rotPointX, m.ty + t.rotPointY);

                    var cell = this.atlas.cells[this.cellIndex];
                    ctx.drawImage(this.atlas.image, cell.x, cell.y, cell.w, cell.h, -t.rotPointX, -t.rotPointY, cell.w, cell.h);
                    ctx.restore();
                }
            };
            return Sprite;
        })(Kiwi.Entity);
        GameObjects.Sprite = Sprite;
    })(Kiwi.GameObjects || (Kiwi.GameObjects = {}));
    var GameObjects = Kiwi.GameObjects;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (GameObjects) {
        var StaticImage = (function (_super) {
            __extends(StaticImage, _super);
            function StaticImage(state, atlas, x, y) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                _super.call(this, state, x, y);

                this.atlas = atlas;
                this.cellIndex = this.atlas.cellIndex;
                this.width = atlas.cells[0].w;
                this.height = atlas.cells[0].h;

                this.box = this.components.add(new Kiwi.Components.Box(x, y, this.width, this.height));
            }
            StaticImage.prototype.objType = function () {
                return "Sprite";
            };

            StaticImage.prototype.render = function (camera) {
                _super.prototype.render.call(this, camera);

                if (this.alpha > 0 && this.visiblity) {
                    var ctx = this.game.stage.ctx;
                    ctx.save();

                    if (this.alpha > 0 && this.alpha <= 1) {
                        ctx.globalAlpha = this.alpha;
                    }

                    var t = this.transform;
                    var m = t.getConcatenatedMatrix();

                    ctx.setTransform(m.a, m.b, m.c, m.d, m.tx + t.rotPointX, m.ty + t.rotPointY);

                    var cell = this.atlas.cells[this.cellIndex];
                    ctx.drawImage(this.atlas.image, cell.x, cell.y, cell.w, cell.h, -t.rotPointX, -t.rotPointY, cell.w, cell.h);
                    ctx.restore();
                }
            };
            return StaticImage;
        })(Kiwi.Entity);
        GameObjects.StaticImage = StaticImage;
    })(Kiwi.GameObjects || (Kiwi.GameObjects = {}));
    var GameObjects = Kiwi.GameObjects;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (GameObjects) {
        var Textfield = (function (_super) {
            __extends(Textfield, _super);
            function Textfield(state, text, x, y, color, size, weight, fontFamily) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                if (typeof color === "undefined") { color = '#ffffff'; }
                if (typeof size === "undefined") { size = 32; }
                if (typeof weight === "undefined") { weight = 'normal'; }
                if (typeof fontFamily === "undefined") { fontFamily = 'cursive'; }
                _super.call(this, state, x, y);

                this._text = text;
                this._fontWeight = weight;
                this._fontSize = size;
                this._fontColor = color;
                this._fontFamily = fontFamily;
                this._lineHeight = 1;
                this._textAlign = 'left';
                this._baseline = 'top';
            }
            Textfield.prototype.objType = function () {
                return "Textfield";
            };


            Object.defineProperty(Textfield.prototype, "text", {
                get: function () {
                    return this._text;
                },
                set: function (value) {
                    this._text = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Textfield.prototype, "color", {
                get: function () {
                    return this._fontColor;
                },
                set: function (val) {
                    this._fontColor = val;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Textfield.prototype, "fontWeight", {
                get: function () {
                    return this._fontWeight;
                },
                set: function (val) {
                    this._fontWeight = val;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Textfield.prototype, "fontSize", {
                get: function () {
                    return this._fontSize;
                },
                set: function (val) {
                    this._fontSize = val;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Textfield.prototype, "fontFamily", {
                get: function () {
                    return this._fontFamily;
                },
                set: function (val) {
                    this._fontFamily = val;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Textfield.prototype, "lineHeight", {
                get: function () {
                    return this._lineHeight;
                },
                set: function (val) {
                    this._lineHeight = val;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Textfield.prototype, "textAlign", {
                get: function () {
                    return this._textAlign;
                },
                set: function (val) {
                    this._textAlign = val;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Textfield.prototype, "baseline", {
                get: function () {
                    return this._baseline;
                },
                set: function (val) {
                    this._baseline = val;
                },
                enumerable: true,
                configurable: true
            });

            Textfield.prototype.render = function (camera) {
                if (this.alpha > 0 && this.visiblity) {
                    var ctx = this.game.stage.ctx;
                    ctx.save();

                    var m = this.transform.getConcatenatedMatrix();
                    ctx.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);

                    if (this.alpha > 0 && this.alpha <= 1) {
                        ctx.globalAlpha = this.alpha;
                    }

                    ctx.font = this._fontWeight + ' ' + this._fontSize + 'px ' + this._fontFamily;
                    ctx.textAlign = this._textAlign;
                    ctx.textBaseline = this._baseline;
                    ctx.fillStyle = this._fontColor;

                    ctx.fillText(this._text, 0, 0);

                    ctx.restore();
                }
            };
            return Textfield;
        })(Kiwi.Entity);
        GameObjects.Textfield = Textfield;
    })(Kiwi.GameObjects || (Kiwi.GameObjects = {}));
    var GameObjects = Kiwi.GameObjects;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (GameObjects) {
        (function (Tilemap) {
            var Tile = (function (_super) {
                __extends(Tile, _super);
                function Tile(state, tileLayer, tileType, width, height, x, y) {
                    _super.call(this, state, x, y);

                    this.tileLayer = tileLayer;

                    this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this));
                    this.tileUpdate(tileType);
                }
                Tile.prototype.objType = function () {
                    return "Tile";
                };

                Tile.prototype.tileUpdate = function (tileType) {
                    this.tileType = tileType;
                    this.physics.mass = this.tileType.mass;
                    this.physics.allowCollisions = this.tileType.allowCollisions;
                    this.physics.immovable = this.tileType.immovable;
                };
                return Tile;
            })(Kiwi.Entity);
            Tilemap.Tile = Tile;
        })(GameObjects.Tilemap || (GameObjects.Tilemap = {}));
        var Tilemap = GameObjects.Tilemap;
    })(Kiwi.GameObjects || (Kiwi.GameObjects = {}));
    var GameObjects = Kiwi.GameObjects;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (GameObjects) {
        (function (Tilemap) {
            var TileType = (function () {
                function TileType(game, tilemap, index, width, height) {
                    this.mass = 1.0;
                    this._game = game;
                    this.tilemap = tilemap;
                    this.index = index;

                    this.width = width;
                    this.height = height;

                    this.allowCollisions = Kiwi.Components.ArcadePhysics.NONE;
                    this.seperate = false;
                    this.immovable = true;
                }
                TileType.prototype.destroy = function () {
                    this.tilemap = null;
                };

                TileType.prototype.toString = function () {
                    return "[{TileType (index=" + this.index + " collisions=" + this.allowCollisions + " width=" + this.width + " height=" + this.height + ")}]";
                };
                return TileType;
            })();
            Tilemap.TileType = TileType;
        })(GameObjects.Tilemap || (GameObjects.Tilemap = {}));
        var Tilemap = GameObjects.Tilemap;
    })(Kiwi.GameObjects || (Kiwi.GameObjects = {}));
    var GameObjects = Kiwi.GameObjects;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (GameObjects) {
        (function (Tilemap) {
            var TileMap = (function (_super) {
                __extends(TileMap, _super);
                function TileMap(state) {
                    _super.call(this, state, 0, 0);
                    this._collisionCallback = null;
                }
                TileMap.prototype.createFromData = function (tileMapData, atlas, game, format) {
                    var data;

                    this._atlas = atlas;
                    this.tiles = [];
                    this.layers = [];

                    this._game = game;

                    this.mapFormat = format;

                    if (typeof tileMapData === "string") {
                        data = data.trim();
                        data = JSON.parse(tileMapData);
                        this.parseTiledJSON(data);
                    } else {
                        this.parseTiledJSON(tileMapData);
                    }
                };

                TileMap.prototype.createFromFileStore = function (tileMapDataKey, atlas, game, format) {
                    if (this._game.fileStore.exists(tileMapDataKey) == false) {
                        return;
                    }

                    this._tileMapDataKey = tileMapDataKey;
                    this._atlas = atlas;

                    this.tiles = [];
                    this.layers = [];

                    this._game = game;

                    this.mapFormat = format;

                    switch (format) {
                        case TileMap.FORMAT_TILED_JSON:
                            var obj = JSON.parse(this._game.fileStore.getFile(tileMapDataKey).data);
                            this.parseTiledJSON(obj);
                            break;
                    }
                };

                TileMap.prototype.objType = function () {
                    return "TileMap";
                };

                TileMap.prototype.render = function (camera) {
                    for (var i = 0; i < this.layers.length; i++) {
                        this.layers[i].render(camera);
                    }
                };

                TileMap.prototype.parseTiledJSON = function (data) {
                    var mapObj = data;

                    for (var i = 0; i < mapObj.layers.length; i++) {
                        var layer = new Tilemap.TileMapLayer(this.state, this._game, this, this._atlas, mapObj.layers[i].name, mapObj.tilewidth, mapObj.tileheight);

                        layer.transform.setPosition(mapObj.layers[i].x, mapObj.layers[i].y);
                        layer.alpha = parseInt(mapObj.layers[i].opacity);
                        layer.visiblity = mapObj.layers[i].visible;
                        layer.tileMargin = mapObj.tilesets[0].margin;
                        layer.tileSpacing = mapObj.tilesets[0].spacing;
                        layer.name = mapObj.tilesets[0].name;
                        layer.game = this.game;

                        var c = 0;
                        var row;

                        var tileQuantity = layer.parseTileOffsets();
                        this.generateTiles(layer, tileQuantity);

                        for (var t = 0; t < mapObj.layers[i].data.length; t++) {
                            if (c == 0) {
                                row = [];
                            }

                            row.push(this.tiles[parseInt(mapObj.layers[i].data[t])]);
                            c++;

                            if (c == mapObj.layers[i].width) {
                                layer.addRow(row);
                                c = 0;
                            }
                        }

                        this.currentLayer = layer;

                        this.layers.push(layer);
                    }
                };

                TileMap.prototype.generateTiles = function (layer, qty) {
                    for (var i = 0; i < qty; i++) {
                        this.tiles.push(new Tilemap.TileType(this._game, this, i, layer.tileWidth, layer.tileHeight));
                    }
                };

                TileMap.prototype.widthInPixels = function () {
                    return this.currentLayer.widthInPixels;
                };

                TileMap.prototype.heightInPixels = function () {
                    return this.currentLayer.heightInPixels;
                };

                TileMap.prototype.getTileTypeByIndex = function (value) {
                    if (this.tiles[value]) {
                        return this.tiles[value];
                    }

                    return null;
                };

                TileMap.prototype.getTile = function (x, y, layer) {
                    if (layer === undefined) {
                        return this.currentLayer.getTile(x, y);
                        ;
                    } else {
                        return this.layers[layer].getTile(x, y);
                        ;
                    }
                };

                TileMap.prototype.getTilesByType = function (index, layer) {
                    if (layer === undefined) {
                        return this.currentLayer.getTilesByIndex(index);
                    } else {
                        return this.layers[layer].getTilesByIndex(index);
                    }
                };

                TileMap.prototype.getTileFromWorldXY = function (x, y, layer) {
                    if (layer === undefined) {
                        return this.currentLayer.getTileFromWorldXY(x, y);
                    } else {
                        return this.layers[layer].getTileFromWorldXY(x, y);
                    }
                };

                TileMap.prototype.getTileFromInputXY = function (layer) {
                    if (layer === undefined) {
                        return this.currentLayer.getTileFromWorldXY(this._game.input.mouse.x - this.currentLayer.x, this._game.input.mouse.y - this.currentLayer.y);
                    } else {
                        return this.layers[layer].getTileFromWorldXY(this._game.input.mouse.x - this.layers[layer].x, this._game.input.mouse.y - this.layers[layer].transform.y);
                    }
                };

                TileMap.prototype.getTileOverlaps = function (object) {
                    return this.currentLayer.getTileOverlaps(object);
                };

                TileMap.prototype.putTile = function (x, y, index, layer) {
                    if (layer === undefined) {
                        var usedLayer = this.currentLayer;
                    } else {
                        var usedLayer = this.layers[layer];
                    }

                    usedLayer.putTile(x, y, this.tiles[index]);
                };

                TileMap.prototype.setCollisionCallback = function (callback, context) {
                    this._collisionCallback = callback;
                    this._collisionCallbackContext = context;
                };

                TileMap.prototype.setCollisionRange = function (start, end, collision, seperate) {
                    if (typeof collision === "undefined") { collision = Kiwi.Components.ArcadePhysics.ANY; }
                    if (typeof seperate === "undefined") { seperate = true; }
                    for (var i = start; i <= end; i++) {
                        this.setCollisionByIndex(i, collision, seperate);
                    }
                };

                TileMap.prototype.setCollisionByIndex = function (index, collision, seperate) {
                    if (typeof collision === "undefined") { collision = Kiwi.Components.ArcadePhysics.ANY; }
                    if (typeof seperate === "undefined") { seperate = true; }
                    this.tiles[index].seperate = seperate;
                    this.tiles[index].allowCollisions = collision;

                    var tiles = this.currentLayer.getTilesByIndex(index);
                    for (var t = 0; t < tiles.length; t++) {
                        tiles[t].physics.seperate = seperate;
                        tiles[t].physics.allowCollisions = collision;
                    }
                };

                TileMap.prototype.collideSingle = function (object) {
                    if (object.exists === false || !object.components.hasComponent('ArcadePhysics'))
                        return false;

                    var tiles = this.currentLayer.getTileOverlaps(object);

                    if (tiles !== undefined) {
                        for (var i = 0; i < tiles.length; i++) {
                            if (object.components.getComponent('ArcadePhysics').overlaps(tiles[i], tiles[i].tileType.seperate)) {
                                if (this._collisionCallback !== null) {
                                    this._collisionCallback.call(this._collisionCallbackContext, object, tiles[i]);
                                }
                            }
                        }
                        return true;
                    }
                    return false;
                };

                TileMap.prototype.collideGroup = function (group) {
                    for (var i = 0; i < group.members.length; i++) {
                    }
                };

                TileMap.prototype.destroy = function () {
                    this.tiles = null;
                    for (var i = 0; i < this.layers.length; i++) {
                        this.layers[i].destroy();
                    }
                    this.layers = null;
                    this._tileMapDataKey = null;

                    this._atlas = null;
                };
                TileMap.FORMAT_CSV = 0;
                TileMap.FORMAT_TILED_JSON = 1;
                return TileMap;
            })(Kiwi.Entity);
            Tilemap.TileMap = TileMap;
        })(GameObjects.Tilemap || (GameObjects.Tilemap = {}));
        var Tilemap = GameObjects.Tilemap;
    })(Kiwi.GameObjects || (Kiwi.GameObjects = {}));
    var GameObjects = Kiwi.GameObjects;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (GameObjects) {
        (function (Tilemap) {
            var TileMapLayer = (function (_super) {
                __extends(TileMapLayer, _super);
                function TileMapLayer(state, game, parent, atlas, name, tileWidth, tileHeight) {
                    _super.call(this, state, 0, 0);
                    this._startX = 0;
                    this._startY = 0;
                    this._maxX = 0;
                    this._maxY = 0;
                    this._tx = 0;
                    this._ty = 0;
                    this._dx = 0;
                    this._dy = 0;
                    this.widthInTiles = 0;
                    this.heightInTiles = 0;
                    this.widthInPixels = 0;
                    this.heightInPixels = 0;
                    this.tileMargin = 0;
                    this.tileSpacing = 0;

                    this._game = game;
                    this._parent = parent;

                    this.name = name;
                    this.tileWidth = tileWidth;
                    this.tileHeight = tileHeight;

                    this.mapData = [];
                    this._tempTileBlock = [];
                    this._atlas = atlas;

                    this.components = new Kiwi.ComponentManager(Kiwi.TILE_LAYER, this);
                }
                TileMapLayer.prototype.putTile = function (x, y, tileType) {
                    x = Kiwi.Utils.GameMath.snapToFloor(x, this.tileWidth) / this.tileWidth;
                    y = Kiwi.Utils.GameMath.snapToFloor(y, this.tileHeight) / this.tileHeight;

                    if (y >= 0 && y < this.mapData.length) {
                        if (x >= 0 && x < this.mapData[y].length) {
                            this.mapData[y][x].tileUpdate(tileType);
                        }
                    }
                };

                TileMapLayer.prototype.fillTiles = function (index, x, y, width, height) {
                    if (typeof x === "undefined") { x = 0; }
                    if (typeof y === "undefined") { y = 0; }
                    if (typeof width === "undefined") { width = this.widthInTiles; }
                    if (typeof height === "undefined") { height = this.heightInTiles; }
                    this.getTempBlock(x, y, width, height);

                    for (var r = 0; r < this._tempTileBlock.length; r++) {
                        this.mapData[this._tempTileBlock[r].ty][this._tempTileBlock[r].tx].tileUpdate(this._parent.tiles[index]);
                    }
                };

                TileMapLayer.prototype.randomiseTiles = function (tiles, x, y, width, height) {
                    if (typeof x === "undefined") { x = 0; }
                    if (typeof y === "undefined") { y = 0; }
                    if (typeof width === "undefined") { width = this.widthInTiles; }
                    if (typeof height === "undefined") { height = this.heightInTiles; }
                    this.getTempBlock(x, y, width, height);

                    for (var r = 0; r < this._tempTileBlock.length; r++) {
                        this.mapData[this._tempTileBlock[r].ty][this._tempTileBlock[r].tx].tileUpdate(this._parent.tiles[this._game.rnd.pick(tiles)]);
                    }
                };

                TileMapLayer.prototype.swapTiles = function (indexA, indexB, x, y, width, height) {
                    if (typeof x === "undefined") { x = 0; }
                    if (typeof y === "undefined") { y = 0; }
                    if (typeof width === "undefined") { width = this.widthInTiles; }
                    if (typeof height === "undefined") { height = this.heightInTiles; }
                    this.getTempBlock(x, y, width, height);

                    for (var r = 0; r < this._tempTileBlock.length; r++) {
                        if (this._tempTileBlock[r].tileType.index === indexA) {
                            this.mapData[this._tempTileBlock[r].ty][this._tempTileBlock[r].tx].tileUpdate(this._parent.tiles[indexB]);
                        } else if (this._tempTileBlock[r].tileType.index === indexB) {
                            this.mapData[this._tempTileBlock[r].ty][this._tempTileBlock[r].tx].tileUpdate(this._parent.tiles[indexA]);
                        }
                    }
                };

                TileMapLayer.prototype.replaceTiles = function (indexA, indexB, x, y, width, height) {
                    if (typeof x === "undefined") { x = 0; }
                    if (typeof y === "undefined") { y = 0; }
                    if (typeof width === "undefined") { width = this.widthInTiles; }
                    if (typeof height === "undefined") { height = this.heightInTiles; }
                    this.getTempBlock(x, y, width, height);

                    for (var r = 0; r < this._tempTileBlock.length; r++) {
                        if (this._tempTileBlock[r].tileType.index === indexA) {
                            this.mapData[this._tempTileBlock[r].ty][this._tempTileBlock[r].tx].tileUpdate(this._parent.tiles[indexB]);
                        }
                    }
                };

                TileMapLayer.prototype.getTileFromWorldXY = function (x, y) {
                    x = Kiwi.Utils.GameMath.snapToFloor(x, this.tileWidth) / this.tileWidth;
                    y = Kiwi.Utils.GameMath.snapToFloor(y, this.tileHeight) / this.tileHeight;

                    return this.getTile(x, y);
                };

                TileMapLayer.prototype.getTilesByIndex = function (index) {
                    var tiles = [];
                    for (var ty = 0; ty < this.mapData.length; ty++) {
                        for (var tx = 0; tx < this.mapData[ty].length; tx++) {
                            if (this.mapData[ty][tx].tileType.index === index) {
                                tiles.push(this.mapData[ty][tx]);
                            }
                        }
                    }
                    return tiles;
                };

                TileMapLayer.prototype.getTempBlock = function (x, y, width, height, collisionOnly) {
                    if (typeof collisionOnly === "undefined") { collisionOnly = false; }
                    if (x < 0)
                        x = 0;
                    if (y < 0)
                        y = 0;

                    if (x + width > this.widthInTiles)
                        width = this.widthInTiles - x + 1;
                    if (y + height > this.heightInTiles)
                        height = this.heightInTiles - y + 1;

                    this._tempTileBlock = [];

                    for (var ty = y; ty < y + height; ty++) {
                        for (var tx = x; tx < x + width; tx++) {
                            if (collisionOnly) {
                                if (this.mapData[ty] && this.mapData[ty][tx] && this.mapData[ty][tx].tileType.allowCollisions != Kiwi.Components.ArcadePhysics.NONE) {
                                    this._tempTileBlock.push(this.mapData[ty][tx]);
                                }
                            } else {
                                if (this.mapData[ty] && this.mapData[ty][tx]) {
                                    this._tempTileBlock.push(this.mapData[ty][tx]);
                                }
                            }
                        }
                    }
                };

                TileMapLayer.prototype.getTileOverlaps = function (object) {
                    var objPos = object.transform;

                    if (objPos.x > this.transform.x + this.widthInPixels || objPos.x + object.width < this.transform.x || objPos.y > this.transform.y + this.heightInPixels || objPos.y + object.height < this.transform.y) {
                        return;
                    }

                    this._tempTileX = Kiwi.Utils.GameMath.snapToFloor(objPos.x - this.transform.x, this.tileWidth) / this.tileWidth;
                    this._tempTileY = Kiwi.Utils.GameMath.snapToFloor(objPos.y - this.transform.y, this.tileHeight) / this.tileHeight;

                    this._tempTileW = Kiwi.Utils.GameMath.snapToCeil(object.width, this.tileWidth) / this.tileWidth;
                    this._tempTileH = Kiwi.Utils.GameMath.snapToCeil(object.height, this.tileHeight) / this.tileHeight;

                    this.getTempBlock(this._tempTileX, this._tempTileY, this._tempTileW + 1, this._tempTileH + 1, true);

                    return this._tempTileBlock;
                };

                TileMapLayer.prototype.getTileIndex = function (x, y) {
                    if (y >= 0 && y < this.mapData.length) {
                        if (x >= 0 && x < this.mapData[y].length) {
                            return this.mapData[y][x].tileType.index;
                        }
                    }

                    return null;
                };

                TileMapLayer.prototype.getTile = function (x, y) {
                    if (y >= 0 && y < this.mapData.length) {
                        if (x >= 0 && x < this.mapData[y].length) {
                            return this.mapData[y][x];
                        }
                    }

                    return null;
                };

                TileMapLayer.prototype.addRow = function (row) {
                    var data = [];

                    for (var c = 0; c < row.length; c++) {
                        data[c] = new Kiwi.GameObjects.Tilemap.Tile(this.state, this, row[c], this.tileWidth, this.tileHeight, c * this.tileWidth + this.transform.x, this.heightInPixels + this.transform.y);
                        data[c].ty = this.heightInTiles;
                        data[c].tx = c;
                    }

                    if (this.widthInTiles == 0) {
                        this.widthInTiles = data.length;
                        this.widthInPixels = this.widthInTiles * this.tileWidth;
                    }

                    this.mapData.push(data);

                    this.heightInTiles++;
                    this.heightInPixels += this.tileHeight;
                };

                TileMapLayer.prototype.parseTileOffsets = function () {
                    this._tileOffsets = [];

                    var i = 0;

                    if (this._parent.mapFormat == Tilemap.TileMap.FORMAT_TILED_JSON) {
                        this._tileOffsets[0] = null;
                        i = 1;
                    }

                    var height = this._atlas.rows * (this.tileHeight + this.tileSpacing) + this.tileMargin;
                    var width = this._atlas.cols * (this.tileWidth + this.tileSpacing) + this.tileMargin;

                    for (var ty = this.tileMargin; ty < height; ty += (this.tileHeight + this.tileSpacing)) {
                        for (var tx = this.tileMargin; tx < width; tx += (this.tileWidth + this.tileSpacing)) {
                            this._tileOffsets[i] = { x: tx, y: ty };
                            i++;
                        }
                    }

                    return this._tileOffsets.length;
                };

                TileMapLayer.prototype.render = function (camera) {
                    if (this.visiblity === false || this.alpha < 0.1 || this.exists === false) {
                        return;
                    }

                    var ctx = this.game.stage.ctx;
                    ctx.save();

                    if (this.alpha > 0 && this.alpha <= 1) {
                        ctx.globalAlpha = this.alpha;
                    }

                    this._maxX = Math.min(Math.ceil(camera.width / this.tileWidth) + 1, this.widthInTiles);
                    this._maxY = Math.min(Math.ceil(camera.height / this.tileHeight) + 1, this.heightInTiles);

                    this._startX = Math.floor((camera.transform.x - this.transform.x) / this.tileWidth);
                    this._startY = Math.floor((camera.transform.y - this.transform.y) / this.tileHeight);

                    if (this._startX < 0) {
                        this._maxX = this._maxX + this._startX;
                        this._startX = 0;
                    }
                    if (this._startY < 0) {
                        this._maxY = this._maxY + this._startX;
                        this._startY = 0;
                    }

                    if (this._maxX > this.widthInTiles)
                        this._maxX = this.widthInTiles;
                    if (this._maxY > this.heightInTiles)
                        this._maxY = this.heightInTiles;

                    if (this._startX + this._maxX > this.widthInTiles) {
                        this._maxX = this.widthInTiles - this._startX;
                    }
                    if (this._startY + this._maxY > this.heightInTiles) {
                        this._maxY = this.heightInTiles - this._startY;
                    }

                    this._dx = 0;
                    this._dy = 0;

                    this._dx += -(camera.transform.x - (this._startX * this.tileWidth)) + this.transform.x;
                    this._dy += -(camera.transform.y - (this._startY * this.tileHeight)) + this.transform.y;

                    this._tx = this._dx;
                    this._ty = this._dy;

                    for (var column = this._startY; column < this._startY + this._maxY; column++) {
                        this._columnData = this.mapData[column];

                        for (var tile = this._startX; tile < this._startX + this._maxX; tile++) {
                            if (this._tileOffsets[this._columnData[tile].tileType.index]) {
                                ctx.drawImage(this._atlas.image, this._tileOffsets[this._columnData[tile].tileType.index].x, this._tileOffsets[this._columnData[tile].tileType.index].y, this.tileWidth, this.tileHeight, this._tx, this._ty, this.tileWidth, this.tileHeight);
                            }

                            this._columnData[tile].physics.update();
                            this._columnData[tile].transform.x = this._tx;
                            this._columnData[tile].transform.y = this._ty;
                            this._tx += this.tileWidth;
                        }

                        this._tx = this._dx;
                        this._ty += this.tileHeight;
                    }

                    ctx.restore();
                    return true;
                };
                return TileMapLayer;
            })(Kiwi.Entity);
            Tilemap.TileMapLayer = TileMapLayer;
        })(GameObjects.Tilemap || (GameObjects.Tilemap = {}));
        var Tilemap = GameObjects.Tilemap;
    })(Kiwi.GameObjects || (Kiwi.GameObjects = {}));
    var GameObjects = Kiwi.GameObjects;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Geom) {
        var Circle = (function () {
            function Circle(x, y, diameter) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                if (typeof diameter === "undefined") { diameter = 0; }
                this._diameter = 0;
                this._radius = 0;
                this.x = 0;
                this.y = 0;
                this.setTo(x, y, diameter);
            }
            Circle.prototype.objType = function () {
                return "Circle";
            };


            Object.defineProperty(Circle.prototype, "diameter", {
                get: function () {
                    return this._diameter;
                },
                set: function (value) {
                    if (value > 0) {
                        this._diameter = value;
                        this._radius = value * 0.5;
                    }
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Circle.prototype, "radius", {
                get: function () {
                    return this._radius;
                },
                set: function (value) {
                    if (value > 0) {
                        this._radius = value;
                        this._diameter = value * 2;
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Circle.prototype, "circumference", {
                get: function () {
                    return 2 * (Math.PI * this._radius);
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Circle.prototype, "bottom", {
                get: function () {
                    return this.y + this._radius;
                },
                set: function (value) {
                    if (!isNaN(value)) {
                        if (value < this.y) {
                            this._radius = 0;
                            this._diameter = 0;
                        } else {
                            this.radius = value - this.y;
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Circle.prototype, "left", {
                get: function () {
                    return this.x - this._radius;
                },
                set: function (value) {
                    if (!isNaN(value)) {
                        if (value < this.x) {
                            this.radius = this.x - value;
                        } else {
                            this._radius = 0;
                            this._diameter = 0;
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Circle.prototype, "right", {
                get: function () {
                    return this.x + this._radius;
                },
                set: function (value) {
                    if (value && !isNaN(value)) {
                        if (value > this.x) {
                            this.radius = value - this.x;
                        } else {
                            this._radius = 0;
                            this._diameter = 0;
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Circle.prototype, "top", {
                get: function () {
                    return this.y - this._radius;
                },
                set: function (value) {
                    if (value && !isNaN(value)) {
                        if (value > this.y) {
                            this._radius = 0;
                            this._diameter = 0;
                        } else {
                            this.radius = this.y - value;
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Circle.prototype, "area", {
                get: function () {
                    if (this._radius > 0) {
                        return Math.PI * this._radius * this._radius;
                    } else {
                        return 0;
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Circle.prototype, "isEmpty", {
                get: function () {
                    if (this._diameter <= 0) {
                        return true;
                    }

                    return false;
                },
                enumerable: true,
                configurable: true
            });

            Circle.prototype.clone = function (output) {
                if (typeof output === "undefined") { output = new Circle(); }
                return output.setTo(this.x, this.y, this._diameter);
            };

            Circle.prototype.copyFrom = function (source) {
                return this.setTo(source.x, source.y, source.diameter);
            };

            Circle.prototype.copyTo = function (target) {
                return target.copyFrom(this);
            };

            Circle.prototype.distanceTo = function (target, round) {
                if (typeof round === "undefined") { round = false; }
                var dx = this.x - target.x;
                var dy = this.y - target.y;

                if (round === true) {
                    return Math.round(Math.sqrt(dx * dx + dy * dy));
                } else {
                    return Math.sqrt(dx * dx + dy * dy);
                }
            };

            Circle.prototype.equals = function (toCompare) {
                if (this.x === toCompare.x && this.y === toCompare.y && this.diameter === toCompare.diameter) {
                    return true;
                }

                return false;
            };

            Circle.prototype.intersects = function (toIntersect) {
                if (this.distanceTo(toIntersect, false) < (this._radius + toIntersect._radius)) {
                    return true;
                }

                return false;
            };

            Circle.prototype.circumferencePoint = function (angle, asDegrees, output) {
                if (typeof asDegrees === "undefined") { asDegrees = false; }
                if (typeof output === "undefined") { output = new Geom.Point(); }
                if (asDegrees === true) {
                    angle = angle * (Math.PI / 180);
                }

                output.x = this.x + this._radius * Math.cos(angle);
                output.y = this.y + this._radius * Math.sin(angle);

                return output;
            };

            Circle.prototype.offset = function (dx, dy) {
                if (!isNaN(dx) && !isNaN(dy)) {
                    this.x += dx;
                    this.y += dy;
                }

                return this;
            };

            Circle.prototype.offsetPoint = function (point) {
                return this.offset(point.x, point.y);
            };

            Circle.prototype.setTo = function (x, y, diameter) {
                this.x = x;
                this.y = y;
                this._diameter = diameter;
                this._radius = diameter * 0.5;

                return this;
            };

            Circle.prototype.toString = function () {
                return "[{Circle (x=" + this.x + " y=" + this.y + " diameter=" + this.diameter + " radius=" + this.radius + ")}]";
            };
            return Circle;
        })();
        Geom.Circle = Circle;
    })(Kiwi.Geom || (Kiwi.Geom = {}));
    var Geom = Kiwi.Geom;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Geom) {
        var Line = (function () {
            function Line(x1, y1, x2, y2) {
                if (typeof x1 === "undefined") { x1 = 0; }
                if (typeof y1 === "undefined") { y1 = 0; }
                if (typeof x2 === "undefined") { x2 = 0; }
                if (typeof y2 === "undefined") { y2 = 0; }
                this.x1 = 0;
                this.y1 = 0;
                this.x2 = 0;
                this.y2 = 0;
                this.setTo(x1, y1, x2, y2);
            }
            Line.prototype.objType = function () {
                return "Line";
            };

            Line.prototype.clone = function (output) {
                if (typeof output === "undefined") { output = new Line(); }
                return output.setTo(this.x1, this.y1, this.x2, this.y2);
            };

            Line.prototype.copyFrom = function (source) {
                return this.setTo(source.x1, source.y1, source.x2, source.y2);
            };

            Line.prototype.copyTo = function (target) {
                return target.copyFrom(this);
            };

            Line.prototype.setTo = function (x1, y1, x2, y2) {
                if (typeof x1 === "undefined") { x1 = 0; }
                if (typeof y1 === "undefined") { y1 = 0; }
                if (typeof x2 === "undefined") { x2 = 0; }
                if (typeof y2 === "undefined") { y2 = 0; }
                this.x1 = x1;
                this.y1 = y1;
                this.x2 = x2;
                this.y2 = y2;

                return this;
            };

            Object.defineProperty(Line.prototype, "length", {
                get: function () {
                    return Math.sqrt((this.x2 - this.x1) * (this.x2 - this.x1) + (this.y2 - this.y1) * (this.y2 - this.y1));
                },
                enumerable: true,
                configurable: true
            });

            Line.prototype.getY = function (x) {
                return this.slope * x + this.yIntercept;
            };

            Object.defineProperty(Line.prototype, "angle", {
                get: function () {
                    return Math.atan2(this.x2 - this.x1, this.y2 - this.y1);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Line.prototype, "slope", {
                get: function () {
                    return (this.y2 - this.y1) / (this.x2 - this.x1);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Line.prototype, "perpSlope", {
                get: function () {
                    return -((this.x2 - this.x1) / (this.y2 - this.y1));
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Line.prototype, "yIntercept", {
                get: function () {
                    return (this.y1 - this.slope * this.x1);
                },
                enumerable: true,
                configurable: true
            });

            Line.prototype.isPointOnLine = function (x, y) {
                if ((x - this.x1) * (this.y2 - this.y1) === (this.x2 - this.x1) * (y - this.y1)) {
                    return true;
                } else {
                    return false;
                }
            };

            Line.prototype.isPointOnLineSegment = function (x, y) {
                var xMin = Math.min(this.x1, this.x2);
                var xMax = Math.max(this.x1, this.x2);
                var yMin = Math.min(this.y1, this.y2);
                var yMax = Math.max(this.y1, this.y2);

                if (this.isPointOnLine(x, y) && (x >= xMin && x <= xMax) && (y >= yMin && y <= yMax)) {
                    return true;
                } else {
                    return false;
                }
            };

            Line.prototype.intersectLineLine = function (line) {
            };

            Line.prototype.perp = function (x, y, output) {
                if (this.y1 === this.y2) {
                    if (output) {
                        output.setTo(x, y, x, this.y1);
                    } else {
                        return new Line(x, y, x, this.y1);
                    }
                }

                var yInt = (y - this.perpSlope * x);

                var pt = this.intersectLineLine({ x1: x, y1: y, x2: 0, y2: yInt });

                if (output) {
                    output.setTo(x, y, pt.x, pt.y);
                } else {
                    return new Line(x, y, pt.x, pt.y);
                }
            };

            Line.prototype.toString = function () {
                return "[{Line (x1=" + this.x1 + " y1=" + this.y1 + " x2=" + this.x2 + " y2=" + this.y2 + ")}]";
            };
            return Line;
        })();
        Geom.Line = Line;
    })(Kiwi.Geom || (Kiwi.Geom = {}));
    var Geom = Kiwi.Geom;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Geom) {
        var IntersectResult = (function () {
            function IntersectResult() {
                this.result = false;
            }
            IntersectResult.prototype.objType = function () {
                return "IntersectResult";
            };

            IntersectResult.prototype.setTo = function (x1, y1, x2, y2, width, height) {
                if (typeof x2 === "undefined") { x2 = 0; }
                if (typeof y2 === "undefined") { y2 = 0; }
                if (typeof width === "undefined") { width = 0; }
                if (typeof height === "undefined") { height = 0; }
                this.x = x1;
                this.y = y1;

                this.x1 = x1;
                this.y1 = y1;

                this.x2 = x2;
                this.y2 = y2;

                this.width = width;
                this.height = height;
            };
            return IntersectResult;
        })();
        Geom.IntersectResult = IntersectResult;
    })(Kiwi.Geom || (Kiwi.Geom = {}));
    var Geom = Kiwi.Geom;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Geom) {
        var Intersect = (function () {
            function Intersect() {
            }
            Intersect.prototype.objType = function () {
                return "Intersect";
            };

            Intersect.distance = function (x1, y1, x2, y2) {
                return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
            };

            Intersect.distanceSquared = function (x1, y1, x2, y2) {
                return (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
            };

            Intersect.lineToLine = function (line1, line2, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                var denom = (line1.x1 - line1.x2) * (line2.y1 - line2.y2) - (line1.y1 - line1.y2) * (line2.x1 - line2.x2);

                if (denom !== 0) {
                    output.result = true;
                    output.x = ((line1.x1 * line1.y2 - line1.y1 * line1.x2) * (line2.x1 - line2.x2) - (line1.x1 - line1.x2) * (line2.x1 * line2.y2 - line2.y1 * line2.x2)) / denom;
                    output.y = ((line1.x1 * line1.y2 - line1.y1 * line1.x2) * (line2.y1 - line2.y2) - (line1.y1 - line1.y2) * (line2.x1 * line2.y2 - line2.y1 * line2.x2)) / denom;
                }

                return output;
            };

            Intersect.lineToLineSegment = function (line1, seg, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                var denom = (line1.x1 - line1.x2) * (seg.y1 - seg.y2) - (line1.y1 - line1.y2) * (seg.x1 - seg.x2);

                if (denom !== 0) {
                    output.x = ((line1.x1 * line1.y2 - line1.y1 * line1.x2) * (seg.x1 - seg.x2) - (line1.x1 - line1.x2) * (seg.x1 * seg.y2 - seg.y1 * seg.x2)) / denom;
                    output.y = ((line1.x1 * line1.y2 - line1.y1 * line1.x2) * (seg.y1 - seg.y2) - (line1.y1 - line1.y2) * (seg.x1 * seg.y2 - seg.y1 * seg.x2)) / denom;

                    var maxX = Math.max(seg.x1, seg.x2);
                    var minX = Math.min(seg.x1, seg.x2);
                    var maxY = Math.max(seg.y1, seg.y2);
                    var minY = Math.min(seg.y1, seg.y2);

                    if ((output.x <= maxX && output.x >= minX) === true || (output.y <= maxY && output.y >= minY) === true) {
                        output.result = true;
                    }
                }

                return output;
            };

            Intersect.lineToRawSegment = function (line, x1, y1, x2, y2, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                var denom = (line.x1 - line.x2) * (y1 - y2) - (line.y1 - line.y2) * (x1 - x2);

                if (denom !== 0) {
                    output.x = ((line.x1 * line.y2 - line.y1 * line.x2) * (x1 - x2) - (line.x1 - line.x2) * (x1 * y2 - y1 * x2)) / denom;
                    output.y = ((line.x1 * line.y2 - line.y1 * line.x2) * (y1 - y2) - (line.y1 - line.y2) * (x1 * y2 - y1 * x2)) / denom;

                    var maxX = Math.max(x1, x2);
                    var minX = Math.min(x1, x2);
                    var maxY = Math.max(y1, y2);
                    var minY = Math.min(y1, y2);

                    if ((output.x <= maxX && output.x >= minX) === true || (output.y <= maxY && output.y >= minY) === true) {
                        output.result = true;
                    }
                }

                return output;
            };

            Intersect.lineToRay = function (line1, ray, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                var denom = (line1.x1 - line1.x2) * (ray.y1 - ray.y2) - (line1.y1 - line1.y2) * (ray.x1 - ray.x2);

                if (denom !== 0) {
                    output.x = ((line1.x1 * line1.y2 - line1.y1 * line1.x2) * (ray.x1 - ray.x2) - (line1.x1 - line1.x2) * (ray.x1 * ray.y2 - ray.y1 * ray.x2)) / denom;
                    output.y = ((line1.x1 * line1.y2 - line1.y1 * line1.x2) * (ray.y1 - ray.y2) - (line1.y1 - line1.y2) * (ray.x1 * ray.y2 - ray.y1 * ray.x2)) / denom;
                    output.result = true;

                    if (!(ray.x1 >= ray.x2) && output.x < ray.x1) {
                        output.result = false;
                    }

                    if (!(ray.y1 >= ray.y2) && output.y < ray.y1) {
                        output.result = false;
                    }
                }

                return output;
            };

            Intersect.lineToCircle = function (line, circle, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                if (line.perp(circle.x, circle.y).length <= circle.radius) {
                    output.result = true;
                }

                return output;
            };

            Intersect.lineToRectangle = function (line, rect, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                Intersect.lineToRawSegment(line, rect.x, rect.y, rect.right, rect.y, output);

                if (output.result === true) {
                    return output;
                }

                Intersect.lineToRawSegment(line, rect.x, rect.y, rect.x, rect.bottom, output);

                if (output.result === true) {
                    return output;
                }

                Intersect.lineToRawSegment(line, rect.x, rect.bottom, rect.right, rect.bottom, output);

                if (output.result === true) {
                    return output;
                }

                Intersect.lineToRawSegment(line, rect.right, rect.y, rect.right, rect.bottom, output);

                return output;
            };

            Intersect.lineSegmentToLineSegment = function (line1, line2, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                Intersect.lineToLineSegment(line1, line2, output);

                if (output.result === true) {
                    if (!(output.x >= Math.min(line1.x1, line1.x2) && output.x <= Math.max(line1.x1, line1.x2) && output.y >= Math.min(line1.y1, line1.y2) && output.y <= Math.max(line1.y1, line1.y2))) {
                        output.result = false;
                    }
                }

                return output;
            };

            Intersect.lineSegmentToRay = function (line1, ray, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                Intersect.lineToRay(line1, ray, output);

                if (output.result === true) {
                    if (!(output.x >= Math.min(line1.x1, line1.x2) && output.x <= Math.max(line1.x1, line1.x2) && output.y >= Math.min(line1.y1, line1.y2) && output.y <= Math.max(line1.y1, line1.y2))) {
                        output.result = false;
                    }
                }

                return output;
            };

            Intersect.lineSegmentToCircle = function (seg, circle, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                var perp = seg.perp(circle.x, circle.y);

                if (perp.length <= circle.radius) {
                    var maxX = Math.max(seg.x1, seg.x2);
                    var minX = Math.min(seg.x1, seg.x2);
                    var maxY = Math.max(seg.y1, seg.y2);
                    var minY = Math.min(seg.y1, seg.y2);

                    if ((perp.x2 <= maxX && perp.x2 >= minX) && (perp.y2 <= maxY && perp.y2 >= minY)) {
                        output.result = true;
                    } else {
                        if (Intersect.circleContainsPoint(circle, { x: seg.x1, y: seg.y1 }) || Intersect.circleContainsPoint(circle, { x: seg.x2, y: seg.y2 })) {
                            output.result = true;
                        }
                    }
                }

                return output;
            };

            Intersect.lineSegmentToRectangle = function (seg, rect, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                if (rect.contains(seg.x1, seg.y1) && rect.contains(seg.x2, seg.y2)) {
                    output.result = true;
                } else {
                    Intersect.lineToRawSegment(seg, rect.x, rect.y, rect.right, rect.bottom, output);

                    if (output.result === true) {
                        return output;
                    }

                    Intersect.lineToRawSegment(seg, rect.x, rect.y, rect.x, rect.bottom, output);

                    if (output.result === true) {
                        return output;
                    }

                    Intersect.lineToRawSegment(seg, rect.x, rect.bottom, rect.right, rect.bottom, output);

                    if (output.result === true) {
                        return output;
                    }

                    Intersect.lineToRawSegment(seg, rect.right, rect.y, rect.right, rect.bottom, output);

                    return output;
                }

                return output;
            };

            Intersect.rayToRectangle = function (ray, rect, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                Intersect.lineToRectangle(ray, rect, output);

                return output;
            };

            Intersect.rayToLineSegment = function (rayx1, rayy1, rayx2, rayy2, linex1, liney1, linex2, liney2, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                var r, s, d;

                if ((rayy2 - rayy1) / (rayx2 - rayx1) != (liney2 - liney1) / (linex2 - linex1)) {
                    d = (((rayx2 - rayx1) * (liney2 - liney1)) - (rayy2 - rayy1) * (linex2 - linex1));

                    if (d != 0) {
                        r = (((rayy1 - liney1) * (linex2 - linex1)) - (rayx1 - linex1) * (liney2 - liney1)) / d;
                        s = (((rayy1 - liney1) * (rayx2 - rayx1)) - (rayx1 - linex1) * (rayy2 - rayy1)) / d;

                        if (r >= 0) {
                            if (s >= 0 && s <= 1) {
                                output.result = true;
                                output.x = rayx1 + r * (rayx2 - rayx1), rayy1 + r * (rayy2 - rayy1);
                            }
                        }
                    }
                }

                return output;
            };

            Intersect.circleToCircle = function (circle1, circle2, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                output.result = ((circle1.radius + circle2.radius) * (circle1.radius + circle2.radius)) >= Intersect.distanceSquared(circle1.x, circle1.y, circle2.x, circle2.y);

                return output;
            };

            Intersect.circleToRectangle = function (circle, rect, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                var inflatedRect = rect.clone();

                inflatedRect.inflate(circle.radius, circle.radius);

                output.result = inflatedRect.contains(circle.x, circle.y);

                return output;
            };

            Intersect.circleContainsPoint = function (circle, point, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                output.result = circle.radius * circle.radius >= Intersect.distanceSquared(circle.x, circle.y, point.x, point.y);

                return output;
            };

            Intersect.pointToRectangle = function (point, rect, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                output.setTo(point.x, point.y);

                output.result = rect.containsPoint(point);

                return output;
            };

            Intersect.rectangleToRectangle = function (rect1, rect2, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                var leftX = Math.max(rect1.x, rect2.x);
                var rightX = Math.min(rect1.right, rect2.right);
                var topY = Math.max(rect1.y, rect2.y);
                var bottomY = Math.min(rect1.bottom, rect2.bottom);

                output.setTo(leftX, topY, rightX - leftX, bottomY - topY, rightX - leftX, bottomY - topY);

                var cx = output.x + output.width * .5;
                var cy = output.y + output.height * .5;

                if ((cx > rect1.x && cx < rect1.right) && (cy > rect1.y && cy < rect1.bottom)) {
                    output.result = true;
                }

                return output;
            };
            return Intersect;
        })();
        Geom.Intersect = Intersect;
    })(Kiwi.Geom || (Kiwi.Geom = {}));
    var Geom = Kiwi.Geom;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Utils) {
        var GameMath = (function () {
            function GameMath() {
            }
            GameMath.prototype.objType = function () {
                return "GameMath";
            };

            GameMath.computeMachineEpsilon = function () {
                var fourThirds = 4.0 / 3.0;
                var third = fourThirds - 1.0;
                var one = third + third + third;
                return Math.abs(1.0 - one);
            };

            GameMath.fuzzyEqual = function (a, b, epsilon) {
                if (typeof epsilon === "undefined") { epsilon = 0.0001; }
                return Math.abs(a - b) < epsilon;
            };

            GameMath.fuzzyLessThan = function (a, b, epsilon) {
                if (typeof epsilon === "undefined") { epsilon = 0.0001; }
                return a < b + epsilon;
            };

            GameMath.fuzzyGreaterThan = function (a, b, epsilon) {
                if (typeof epsilon === "undefined") { epsilon = 0.0001; }
                return a > b - epsilon;
            };

            GameMath.fuzzyCeil = function (val, epsilon) {
                if (typeof epsilon === "undefined") { epsilon = 0.0001; }
                return Math.ceil(val - epsilon);
            };

            GameMath.fuzzyFloor = function (val, epsilon) {
                if (typeof epsilon === "undefined") { epsilon = 0.0001; }
                return Math.floor(val + epsilon);
            };

            GameMath.average = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                var avg = 0;

                for (var i = 0; i < args.length; i++) {
                    avg += args[i];
                }

                return avg / args.length;
            };

            GameMath.slam = function (value, target, epsilon) {
                if (typeof epsilon === "undefined") { epsilon = 0.0001; }
                return (Math.abs(value - target) < epsilon) ? target : value;
            };

            GameMath.percentageMinMax = function (val, max, min) {
                if (typeof min === "undefined") { min = 0; }
                val -= min;
                max -= min;

                if (!max)
                    return 0; else
                    return val / max;
            };

            GameMath.sign = function (n) {
                if (n)
                    return n / Math.abs(n); else
                    return 0;
            };

            GameMath.truncate = function (n) {
                return (n > 0) ? Math.floor(n) : Math.ceil(n);
            };

            GameMath.shear = function (n) {
                return n % 1;
            };

            GameMath.wrap = function (val, max, min) {
                if (typeof min === "undefined") { min = 0; }
                val -= min;
                max -= min;
                if (max == 0)
                    return min;
                val %= max;
                val += min;
                while (val < min)
                    val += max;

                return val;
            };

            GameMath.arithWrap = function (value, max, min) {
                if (typeof min === "undefined") { min = 0; }
                max -= min;
                if (max == 0)
                    return min;
                return value - max * Math.floor((value - min) / max);
            };

            GameMath.clamp = function (input, max, min) {
                if (typeof min === "undefined") { min = 0; }
                return Math.max(min, Math.min(max, input));
            };

            GameMath.snapTo = function (input, gap, start) {
                if (typeof start === "undefined") { start = 0; }
                if (gap == 0)
                    return input;

                input -= start;
                input = gap * Math.round(input / gap);
                return start + input;
            };

            GameMath.snapToFloor = function (input, gap, start) {
                if (typeof start === "undefined") { start = 0; }
                if (gap == 0)
                    return input;

                input -= start;
                input = gap * Math.floor(input / gap);
                return start + input;
            };

            GameMath.snapToCeil = function (input, gap, start) {
                if (typeof start === "undefined") { start = 0; }
                if (gap == 0)
                    return input;

                input -= start;
                input = gap * Math.ceil(input / gap);
                return start + input;
            };

            GameMath.snapToInArray = function (input, arr, sort) {
                if (typeof sort === "undefined") { sort = true; }
                if (sort)
                    arr.sort();
                if (input < arr[0])
                    return arr[0];

                var i = 1;

                while (arr[i] < input)
                    i++;

                var low = arr[i - 1];
                var high = (i < arr.length) ? arr[i] : Number.POSITIVE_INFINITY;

                return ((high - input) <= (input - low)) ? high : low;
            };

            GameMath.roundTo = function (value, place, base) {
                if (typeof place === "undefined") { place = 0; }
                if (typeof base === "undefined") { base = 10; }
                var p = Math.pow(base, -place);
                return Math.round(value * p) / p;
            };

            GameMath.floorTo = function (value, place, base) {
                if (typeof place === "undefined") { place = 0; }
                if (typeof base === "undefined") { base = 10; }
                var p = Math.pow(base, -place);
                return Math.floor(value * p) / p;
            };

            GameMath.ceilTo = function (value, place, base) {
                if (typeof place === "undefined") { place = 0; }
                if (typeof base === "undefined") { base = 10; }
                var p = Math.pow(base, -place);
                return Math.ceil(value * p) / p;
            };

            GameMath.interpolateFloat = function (a, b, weight) {
                return (b - a) * weight + a;
            };

            GameMath.radiansToDegrees = function (angle) {
                return angle * GameMath.RAD_TO_DEG;
            };

            GameMath.degreesToRadians = function (angle) {
                return angle * GameMath.DEG_TO_RAD;
            };

            GameMath.angleBetween = function (x1, y1, x2, y2) {
                return Math.atan2(y2 - y1, x2 - x1);
            };

            GameMath.normalizeAngle = function (angle, radians) {
                if (typeof radians === "undefined") { radians = true; }
                var rd = (radians) ? GameMath.PI : 180;
                return GameMath.wrap(angle, rd, -rd);
            };

            GameMath.nearestAngleBetween = function (a1, a2, radians) {
                if (typeof radians === "undefined") { radians = true; }
                var rd = (radians) ? GameMath.PI : 180;

                a1 = GameMath.normalizeAngle(a1, radians);
                a2 = GameMath.normalizeAngle(a2, radians);

                if (a1 < -rd / 2 && a2 > rd / 2)
                    a1 += rd * 2;
                if (a2 < -rd / 2 && a1 > rd / 2)
                    a2 += rd * 2;

                return a2 - a1;
            };

            GameMath.normalizeAngleToAnother = function (dep, ind, radians) {
                if (typeof radians === "undefined") { radians = true; }
                return ind + Kiwi.Utils.GameMath.nearestAngleBetween(ind, dep, radians);
            };

            GameMath.normalizeAngleAfterAnother = function (dep, ind, radians) {
                if (typeof radians === "undefined") { radians = true; }
                dep = Kiwi.Utils.GameMath.normalizeAngle(dep - ind, radians);
                return ind + dep;
            };

            GameMath.normalizeAngleBeforeAnother = function (dep, ind, radians) {
                if (typeof radians === "undefined") { radians = true; }
                dep = Kiwi.Utils.GameMath.normalizeAngle(ind - dep, radians);
                return ind - dep;
            };

            GameMath.interpolateAngles = function (a1, a2, weight, radians, ease) {
                if (typeof radians === "undefined") { radians = true; }
                if (typeof ease === "undefined") { ease = null; }
                a1 = Kiwi.Utils.GameMath.normalizeAngle(a1, radians);
                a2 = Kiwi.Utils.GameMath.normalizeAngleToAnother(a2, a1, radians);

                return (typeof ease === 'function') ? ease(weight, a1, a2 - a1, 1) : Kiwi.Utils.GameMath.interpolateFloat(a1, a2, weight);
            };

            GameMath.logBaseOf = function (value, base) {
                return Math.log(value) / Math.log(base);
            };

            GameMath.GCD = function (m, n) {
                var r;

                m = Math.abs(m);
                n = Math.abs(n);

                if (m < n) {
                    r = m;
                    m = n;
                    n = r;
                }

                while (true) {
                    r = m % n;
                    if (!r)
                        return n;
                    m = n;
                    n = r;
                }

                return 1;
            };

            GameMath.LCM = function (m, n) {
                return (m * n) / Kiwi.Utils.GameMath.GCD(m, n);
            };

            GameMath.factorial = function (value) {
                if (value == 0)
                    return 1;

                var res = value;

                while (--value) {
                    res *= value;
                }

                return res;
            };

            GameMath.gammaFunction = function (value) {
                return Kiwi.Utils.GameMath.factorial(value - 1);
            };

            GameMath.fallingFactorial = function (base, exp) {
                return Kiwi.Utils.GameMath.factorial(base) / Kiwi.Utils.GameMath.factorial(base - exp);
            };

            GameMath.risingFactorial = function (base, exp) {
                return Kiwi.Utils.GameMath.factorial(base + exp - 1) / Kiwi.Utils.GameMath.factorial(base - 1);
            };

            GameMath.binCoef = function (n, k) {
                return Kiwi.Utils.GameMath.fallingFactorial(n, k) / Kiwi.Utils.GameMath.factorial(k);
            };

            GameMath.risingBinCoef = function (n, k) {
                return Kiwi.Utils.GameMath.risingFactorial(n, k) / Kiwi.Utils.GameMath.factorial(k);
            };

            GameMath.chanceRoll = function (chance) {
                if (typeof chance === "undefined") { chance = 50; }
                if (chance <= 0) {
                    return false;
                } else if (chance >= 100) {
                    return true;
                } else {
                    if (Math.random() * 100 >= chance) {
                        return false;
                    } else {
                        return true;
                    }
                }
            };

            GameMath.maxAdd = function (value, amount, max) {
                value += amount;

                if (value > max) {
                    value = max;
                }

                return value;
            };

            GameMath.minSub = function (value, amount, min) {
                value -= amount;

                if (value < min) {
                    value = min;
                }

                return value;
            };

            GameMath.wrapValue = function (value, amount, max) {
                var diff;

                value = Math.abs(value);
                amount = Math.abs(amount);
                max = Math.abs(max);

                diff = (value + amount) % max;

                return diff;
            };

            GameMath.randomSign = function () {
                return (Math.random() > 0.5) ? 1 : -1;
            };

            GameMath.isOdd = function (n) {
                if (n & 1) {
                    return true;
                } else {
                    return false;
                }
            };

            GameMath.isEven = function (n) {
                if (n & 1) {
                    return false;
                } else {
                    return true;
                }
            };

            GameMath.wrapAngle = function (angle) {
                var result = angle;

                if (angle >= -180 && angle <= 180) {
                    return angle;
                }

                result = (angle + 180) % 360;

                if (result < 0) {
                    result += 360;
                }

                return result - 180;
            };

            GameMath.angleLimit = function (angle, min, max) {
                var result = angle;

                if (angle > max) {
                    result = max;
                } else if (angle < min) {
                    result = min;
                }

                return result;
            };

            GameMath.linearInterpolation = function (v, k) {
                var m = v.length - 1;
                var f = m * k;
                var i = Math.floor(f);

                if (k < 0)
                    return Kiwi.Utils.GameMath.linear(v[0], v[1], f);
                if (k > 1)
                    return Kiwi.Utils.GameMath.linear(v[m], v[m - 1], m - f);

                return Kiwi.Utils.GameMath.linear(v[i], v[i + 1 > m ? m : i + 1], f - i);
            };

            GameMath.bezierInterpolation = function (v, k) {
                var b = 0;
                var n = v.length - 1;

                for (var i = 0; i <= n; i++) {
                    b += Math.pow(1 - k, n - i) * Math.pow(k, i) * v[i] * Kiwi.Utils.GameMath.bernstein(n, i);
                }

                return b;
            };

            GameMath.catmullRomInterpolation = function (v, k) {
                var m = v.length - 1;
                var f = m * k;
                var i = Math.floor(f);

                if (v[0] === v[m]) {
                    if (k < 0)
                        i = Math.floor(f = m * (1 + k));

                    return Kiwi.Utils.GameMath.catmullRom(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
                } else {
                    if (k < 0)
                        return v[0] - (Kiwi.Utils.GameMath.catmullRom(v[0], v[0], v[1], v[1], -f) - v[0]);

                    if (k > 1)
                        return v[m] - (Kiwi.Utils.GameMath.catmullRom(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);

                    return Kiwi.Utils.GameMath.catmullRom(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
                }
            };

            GameMath.linear = function (p0, p1, t) {
                return (p1 - p0) * t + p0;
            };

            GameMath.bernstein = function (n, i) {
                return Kiwi.Utils.GameMath.factorial(n) / Kiwi.Utils.GameMath.factorial(i) / Kiwi.Utils.GameMath.factorial(n - i);
            };

            GameMath.catmullRom = function (p0, p1, p2, p3, t) {
                var v0 = (p2 - p0) * 0.5, v1 = (p3 - p1) * 0.5, t2 = t * t, t3 = t * t2;
                return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
            };

            GameMath.difference = function (a, b) {
                return Math.abs(a - b);
            };
            GameMath.PI = 3.141592653589793;
            GameMath.PI_2 = 1.5707963267948965;
            GameMath.PI_4 = 0.7853981633974483;
            GameMath.PI_8 = 0.39269908169872413;
            GameMath.PI_16 = 0.19634954084936206;
            GameMath.TWO_PI = 6.283185307179586;
            GameMath.THREE_PI_2 = 4.7123889803846895;
            GameMath.E = 2.71828182845905;
            GameMath.LN10 = 2.302585092994046;
            GameMath.LN2 = 0.6931471805599453;
            GameMath.LOG10E = 0.4342944819032518;
            GameMath.LOG2E = 1.442695040888963387;
            GameMath.SQRT1_2 = 0.7071067811865476;
            GameMath.SQRT2 = 1.4142135623730951;
            GameMath.DEG_TO_RAD = 0.017453292519943294444444444444444;
            GameMath.RAD_TO_DEG = 57.295779513082325225835265587527;

            GameMath.B_16 = 65536;
            GameMath.B_31 = 2147483648;
            GameMath.B_32 = 4294967296;
            GameMath.B_48 = 281474976710656;
            GameMath.B_53 = 9007199254740992;
            GameMath.B_64 = 18446744073709551616;

            GameMath.ONE_THIRD = 0.333333333333333333333333333333333;
            GameMath.TWO_THIRDS = 0.666666666666666666666666666666666;
            GameMath.ONE_SIXTH = 0.166666666666666666666666666666666;

            GameMath.COS_PI_3 = 0.86602540378443864676372317075294;
            GameMath.SIN_2PI_3 = 0.03654595;

            GameMath.CIRCLE_ALPHA = 0.5522847498307933984022516322796;

            GameMath.ON = true;
            GameMath.OFF = false;

            GameMath.SHORT_EPSILON = 0.1;
            GameMath.PERC_EPSILON = 0.001;
            GameMath.EPSILON = 0.0001;
            GameMath.LONG_EPSILON = 0.00000001;
            return GameMath;
        })();
        Utils.GameMath = GameMath;
    })(Kiwi.Utils || (Kiwi.Utils = {}));
    var Utils = Kiwi.Utils;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Geom) {
        var AABB = (function () {
            function AABB(cx, cy, width, height) {
                this.cx = 0;
                this.cy = 0;
                this.halfWidth = 0;
                this.halfHeight = 0;
                this.cx = cx || 0;
                this.cy = cy || 0;
                this.halfWidth = width / 2 || 0;
                this.halfHeight = height / 2 || 0;
            }
            AABB.prototype.objType = function () {
                return "AABB";
            };

            Object.defineProperty(AABB.prototype, "height", {
                get: function () {
                    return this.halfHeight * 2;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(AABB.prototype, "width", {
                get: function () {
                    return this.halfWidth * 2;
                },
                enumerable: true,
                configurable: true
            });

            AABB.prototype.draw = function (ctx) {
                ctx.beginPath();
                ctx.moveTo(this.cx - this.halfWidth, this.cy);
                ctx.lineTo(this.cx + this.halfWidth, this.cy);
                ctx.moveTo(this.cx, this.cy - this.halfHeight);
                ctx.lineTo(this.cx, this.cy + this.halfHeight);
                ctx.stroke();
                return this;
            };

            AABB.prototype.setPosition = function (cx, cy) {
                this.cx = cx;
                this.cy = cy;
                return this;
            };

            AABB.prototype.setPositionPoint = function (pos) {
                this.cx = pos.x;
                this.cy = pos.y;
                return this;
            };

            AABB.prototype.toRect = function () {
                return new Geom.Rectangle(this.cx - this.halfWidth, this.cy - this.halfHeight, this.halfWidth * 2, this.halfHeight * 2);
            };

            AABB.prototype.fromRect = function (rect) {
                this.halfWidth = rect.width / 2;
                this.halfHeight = rect.height / 2;
                this.cx = rect.x + this.halfWidth;
                this.cy = rect.y + this.halfHeight;
                return this;
            };
            return AABB;
        })();
        Geom.AABB = AABB;
    })(Kiwi.Geom || (Kiwi.Geom = {}));
    var Geom = Kiwi.Geom;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Geom) {
        var Ray = (function () {
            function Ray(x1, y1, x2, y2) {
                if (typeof x1 === "undefined") { x1 = 0; }
                if (typeof y1 === "undefined") { y1 = 0; }
                if (typeof x2 === "undefined") { x2 = 0; }
                if (typeof y2 === "undefined") { y2 = 0; }
                this.x1 = 0;
                this.y1 = 0;
                this.x2 = 0;
                this.y2 = 0;
                this.setTo(x1, y1, x2, y2);
            }
            Ray.prototype.objType = function () {
                return "Ray";
            };

            Ray.prototype.clone = function (output) {
                if (typeof output === "undefined") { output = new Ray(); }
                return output.setTo(this.x1, this.y1, this.x2, this.y2);
            };

            Ray.prototype.copyFrom = function (source) {
                return this.setTo(source.x1, source.y1, source.x2, source.y2);
            };

            Ray.prototype.copyTo = function (target) {
                return target.copyFrom(this);
            };

            Ray.prototype.setTo = function (x1, y1, x2, y2) {
                if (typeof x1 === "undefined") { x1 = 0; }
                if (typeof y1 === "undefined") { y1 = 0; }
                if (typeof x2 === "undefined") { x2 = 0; }
                if (typeof y2 === "undefined") { y2 = 0; }
                this.x1 = x1;
                this.y1 = y1;
                this.x2 = x2;
                this.y2 = y2;

                return this;
            };

            Object.defineProperty(Ray.prototype, "angle", {
                get: function () {
                    return Math.atan2(this.x2 - this.x1, this.y2 - this.y1);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Ray.prototype, "slope", {
                get: function () {
                    return (this.y2 - this.y1) / (this.x2 - this.x1);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Ray.prototype, "yIntercept", {
                get: function () {
                    return (this.y1 - this.slope * this.x1);
                },
                enumerable: true,
                configurable: true
            });

            Ray.prototype.isPointOnRay = function (x, y) {
                if ((x - this.x1) * (this.y2 - this.y1) === (this.x2 - this.x1) * (y - this.y1)) {
                    if (Math.atan2(y - this.y1, x - this.x1) == Math.atan2(this.y2 - this.y1, this.x2 - this.x1)) {
                        return true;
                    }
                }

                return false;
            };

            Ray.prototype.toString = function () {
                return "[{Ray (x1=" + this.x1 + " y1=" + this.y1 + " x2=" + this.x2 + " y2=" + this.y2 + ")}]";
            };
            return Ray;
        })();
        Geom.Ray = Ray;
    })(Kiwi.Geom || (Kiwi.Geom = {}));
    var Geom = Kiwi.Geom;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Geom) {
        var Vector2 = (function () {
            function Vector2(x, y) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                this.setTo(x, y);
            }
            Vector2.prototype.objType = function () {
                return "Vector2";
            };

            Vector2.fromAngle = function (angle) {
                return new Vector2(Math.cos(angle), Math.sin(angle));
            };

            Vector2.randomRadius = function (radius) {
                return new Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1).multiplyScalar(radius);
            };

            Vector2.fromPoint = function (point) {
                return new Vector2(point.x, point.y);
            };

            Vector2.prototype.add = function (vector2) {
                return new Vector2(this.x + vector2.x, this.y + vector2.y);
            };

            Vector2.prototype.addX = function (vector2) {
                return new Vector2(this.x + vector2.x, this.y);
            };

            Vector2.prototype.addY = function (vector2) {
                return new Vector2(this.x, this.y + vector2.y);
            };

            Vector2.prototype.subtract = function (vector2) {
                return new Kiwi.Geom.Vector2(this.x - vector2.x, this.y - vector2.y);
            };

            Vector2.prototype.multiply = function (vector2) {
                return new Kiwi.Geom.Vector2(this.x * vector2.x, this.y * vector2.y);
            };

            Vector2.prototype.multiplyScalar = function (scalar) {
                return new Kiwi.Geom.Vector2(this.x * scalar, this.y * scalar);
            };

            Vector2.prototype.dot = function (vector2) {
                return this.x * vector2.x + this.y * vector2.y;
            };

            Vector2.prototype.lenSqr = function () {
                return this.x * this.x + this.y * this.y;
            };

            Vector2.prototype.len = function () {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            };

            Vector2.prototype.unit = function () {
                var invLen = 1.0 / this.len();
                return this.multiplyScalar(invLen);
            };

            Vector2.prototype.floor = function () {
                return new Vector2(Math.floor(this.x), Math.floor(this.y));
            };

            Vector2.prototype.ceil = function () {
                return new Vector2(Math.ceil(this.x), Math.ceil(this.y));
            };

            Vector2.prototype.round = function () {
                return new Vector2(Math.round(this.x), Math.round(this.y));
            };

            Vector2.prototype.clamp = function (min, max) {
                return new Vector2(Math.max(Math.min(this.x, max.x), min.x), Math.max(Math.min(this.y, max.y), min.y));
            };

            Vector2.prototype.perp = function () {
                return new Vector2(-this.y, this.x);
            };

            Vector2.prototype.neg = function () {
                return new Vector2(-this.x, -this.y);
            };

            Vector2.prototype.equal = function (vector2) {
                return this.x === vector2.x && this.y === vector2.y;
            };

            Vector2.prototype.point = function () {
                return new Geom.Point(this.x, this.y);
            };

            Vector2.prototype.clear = function () {
                this.x = 0;
                this.y = 0;
                return this;
            };

            Vector2.prototype.clone = function (output) {
                if (output) {
                    return output.setTo(this.x, this.y);
                } else {
                    return new Vector2(this.x, this.y);
                }
            };

            Vector2.prototype.copyFrom = function (source) {
                this.x = source.x;
                this.y = source.y;
                return this;
            };

            Vector2.prototype.copyTo = function (target) {
                target.x = this.x;
                target.y = this.y;
                return target;
            };

            Vector2.prototype.setTo = function (x, y) {
                this.x = x;
                this.y = y;
                return this;
            };

            Vector2.prototype.toString = function () {
                return '[{Vector2 (x=' + this.x + ' y=' + this.y + ')}]';
            };
            return Vector2;
        })();
        Geom.Vector2 = Vector2;
    })(Kiwi.Geom || (Kiwi.Geom = {}));
    var Geom = Kiwi.Geom;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        var HUDDisplay = (function () {
            function HUDDisplay(game, name) {
                this._game = game;
                this.name = name;
                this.container = document.createElement("div");
                this.container.id = "HUD-layer-" + game.rnd.uuid();
                this.container.style.width = "100%";
                this.container.style.height = "100%";
                this.container.style.position = "absolute";

                this._widgets = new Array();
            }
            HUDDisplay.prototype.addWidget = function (widget) {
                widget.container.id = 'HUD-widget-' + this._game.rnd.uuid();
                this._widgets.push(widget);
                this.container.appendChild(widget.container);
            };

            HUDDisplay.prototype.removeWidget = function (widget) {
                if (this.destroyWidget(widget)) {
                    var i = this._widgets.indexOf(widget);

                    if (i !== -1) {
                        this._widgets.splice(i, 1);
                        return true;
                    }
                }
                return false;
            };

            HUDDisplay.prototype.removeAllWidgets = function () {
                for (var i = 0; i < this._widgets.length; i++) {
                    this.destroyWidget(this._widgets[i]);
                }

                this._widgets = [];
            };

            HUDDisplay.prototype.destroyWidget = function (widget) {
                if (this.container.contains(widget.container)) {
                    this.container.removeChild(widget.container);
                    return true;
                }
                return false;
            };

            HUDDisplay.prototype.update = function () {
                for (var i = 0; i < this._widgets.length; i++) {
                    this._widgets[i].update();
                }
            };

            HUDDisplay.prototype.render = function () {
            };
            return HUDDisplay;
        })();
        HUD.HUDDisplay = HUDDisplay;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        var HUDManager = (function () {
            function HUDManager(game) {
                this._game = game;
            }
            HUDManager.prototype.boot = function () {
                this._hudContainer = document.createElement("div");
                this._hudContainer.id = "HUDContainer";
                this._hudContainer.style.position = "absolute";
                this._hudContainer.style.width = "100%";
                this._hudContainer.style.height = "100%";

                this._game.stage.container.appendChild(this._hudContainer);

                this._huds = new Array();

                this._defaultHUD = this.createHUD("defaultHUD");

                this._currentHUD = this._defaultHUD;

                this.setHUD(this._defaultHUD);
            };

            HUDManager.prototype.objType = function () {
                return "HUDManager";
            };


            Object.defineProperty(HUDManager.prototype, "defaultHUD", {
                get: function () {
                    return this._defaultHUD;
                },
                set: function (value) {
                    if (this._currentHUD === this._defaultHUD) {
                        this._currentHUD = value;
                        this.setHUD(this._currentHUD);
                    }
                    this._defaultHUD = value;
                },
                enumerable: true,
                configurable: true
            });

            HUDManager.prototype.setHUD = function (hud) {
                this.hideHUD();
                this._currentHUD = hud;
                this.showHUD();
            };

            HUDManager.prototype.showHUD = function () {
                this._currentHUD.container.style.display = 'block';
            };

            HUDManager.prototype.hideHUD = function () {
                this._currentHUD.container.style.display = 'none';
            };

            HUDManager.prototype.createHUD = function (name) {
                var hud = new Kiwi.HUD.HUDDisplay(this._game, name);
                hud.container.style.display = 'none';
                this._huds.push(hud);
                this._hudContainer.appendChild(hud.container);
                return hud;
            };

            HUDManager.prototype.removeHUD = function (hud) {
                if (hud === this._defaultHUD) {
                    return false;
                }

                if (this._currentHUD === hud) {
                    this.setHUD(this._defaultHUD);
                }

                this.destroyHUD(hud);

                var i = this._huds.indexOf(hud);

                if (i !== -1) {
                    this._huds.splice(i, 1);
                }

                return true;
            };

            HUDManager.prototype.destroyHUD = function (hud) {
                if (this._hudContainer.contains(hud.container)) {
                    this._hudContainer.removeChild(hud.container);
                }

                hud = null;
            };

            HUDManager.prototype.update = function () {
                for (var i = 0; i < this._huds.length; i++) {
                    this._huds[i].update();
                }
            };

            HUDManager.prototype.render = function () {
                this._currentHUD.render();
            };
            return HUDManager;
        })();
        HUD.HUDManager = HUDManager;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        var HUDWidget = (function () {
            function HUDWidget(name, x, y) {
                this.name = name;
                this.container = document.createElement("div");
                this.container.style.position = "absolute";
                this.components = new Kiwi.ComponentManager(Kiwi.HUD_WIDGET, this);
                this.onCoordsUpdate = new Kiwi.Signal();
                this.x = x;
                this.y = y;
            }
            Object.defineProperty(HUDWidget.prototype, "x", {
                get: function () {
                    return this._x;
                },
                set: function (value) {
                    this._x = value;
                    this.container.style.left = this.x + "px";
                    this.onCoordsUpdate.dispatch(this.x, this.y);
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(HUDWidget.prototype, "y", {
                get: function () {
                    return this._y;
                },
                set: function (value) {
                    this._y = value;
                    this.container.style.top = this.y + "px";
                    this.onCoordsUpdate.dispatch(this.x, this.y);
                },
                enumerable: true,
                configurable: true
            });


            HUDWidget.prototype.setTemplate = function (main, element) {
                var paramsArr = [];
                for (var _i = 0; _i < (arguments.length - 2); _i++) {
                    paramsArr[_i] = arguments[_i + 2];
                }
                var containerElement = document.getElementById(main);
                if (containerElement === undefined) {
                    return;
                }

                if (element === undefined) {
                    var fieldElement = containerElement;
                } else {
                    var fieldElement = document.getElementById(element);
                    if (fieldElement === undefined || containerElement.contains(fieldElement) === false) {
                        return;
                    }
                }

                this.tempElement = fieldElement;
                this._tempContainer = containerElement;
                this._tempParent = containerElement.parentElement;
                this._tempParent.removeChild(containerElement);
                this.container.appendChild(containerElement);
            };

            HUDWidget.prototype.removeTemplate = function () {
                if (this.tempElement !== undefined) {
                    this.container.removeChild(this._tempContainer);
                    this._tempParent.appendChild(this._tempContainer);
                    this.tempElement = null;
                    this._tempParent = null;
                    this._tempContainer = null;
                }
            };

            HUDWidget.prototype.setStyle = function (cssClass) {
                this.container.className = cssClass;
            };

            HUDWidget.prototype.update = function () {
                this.components.update();
            };
            return HUDWidget;
        })();
        HUD.HUDWidget = HUDWidget;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        (function (Widget) {
            var TextField = (function (_super) {
                __extends(TextField, _super);
                function TextField(text, x, y) {
                    _super.call(this, "textField", x, y);

                    this._text = text;

                    this._textField = this.container;
                    this._textField.innerText = text;
                }
                TextField.prototype.setTemplate = function (main, field) {
                    this._textField.innerText = '';
                    _super.prototype.setTemplate.call(this, main, field);

                    if (this.tempElement !== undefined) {
                        this._textField = this.tempElement;
                    }
                    this._textField.innerText = this._text;
                };

                TextField.prototype.removeTemplate = function () {
                    _super.prototype.removeTemplate.call(this);

                    this._textField = this.container;
                    this._textField.innerText = this._text;
                };

                TextField.prototype.text = function (val) {
                    if (val !== undefined) {
                        this._text = val;
                        this._textField.innerText = this._text;
                    }
                    return this._text;
                };
                return TextField;
            })(Kiwi.HUD.HUDWidget);
            Widget.TextField = TextField;
        })(HUD.Widget || (HUD.Widget = {}));
        var Widget = HUD.Widget;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        (function (Widget) {
            var Bar = (function (_super) {
                __extends(Bar, _super);
                function Bar(current, max, x, y, width, height) {
                    if (typeof width === "undefined") { width = 120; }
                    if (typeof height === "undefined") { height = 20; }
                    _super.call(this, "bar", x, y);

                    this._horizontal = true;
                    this._bar = document.createElement('div');
                    this._bar.className = 'innerBar';

                    this.range = this.components.add(new Kiwi.HUD.Components.Range(current, max, 0));
                    this.range.updated.add(this.updateCSS, this);

                    this.bar = this._bar;
                    this.container.appendChild(this.bar);

                    this.width = width;
                    this.height = height;

                    this._bar.style.height = '100%';
                    this._bar.style.width = '100%';

                    this.updateCSS();
                }
                Object.defineProperty(Bar.prototype, "width", {
                    get: function () {
                        return this._width;
                    },
                    set: function (value) {
                        this.container.style.width = value + "px";
                        this._width = value;
                    },
                    enumerable: true,
                    configurable: true
                });


                Object.defineProperty(Bar.prototype, "height", {
                    get: function () {
                        return this._height;
                    },
                    set: function (value) {
                        this.container.style.height = value + "px";
                        this._height = value;
                    },
                    enumerable: true,
                    configurable: true
                });


                Object.defineProperty(Bar.prototype, "horizontal", {
                    get: function () {
                        return this._horizontal;
                    },
                    set: function (val) {
                        this._horizontal = val;
                        this.updateCSS();
                    },
                    enumerable: true,
                    configurable: true
                });


                Object.defineProperty(Bar.prototype, "vertical", {
                    get: function () {
                        return !this._horizontal;
                    },
                    set: function (val) {
                        this._horizontal = !val;
                        this.updateCSS();
                    },
                    enumerable: true,
                    configurable: true
                });


                Bar.prototype.setTemplate = function (main, innerbar) {
                    _super.prototype.setTemplate.call(this, main, innerbar);

                    if (this.tempElement !== undefined) {
                        this.bar = this.tempElement;
                    }
                };

                Bar.prototype.removeTemplate = function () {
                    _super.prototype.removeTemplate.call(this);

                    this.bar = this._bar;
                    this.container.appendChild(this.bar);
                    this.updateCSS();
                };

                Bar.prototype.updateCSS = function () {
                    if (this.horizontal === true) {
                        this.bar.style.width = String(this.range.currentPercent()) + '%';
                        this.bar.style.height = '100%';
                    } else {
                        this.bar.style.height = String(this.range.currentPercent()) + '%';
                        this.bar.style.width = '100%';
                    }
                };
                return Bar;
            })(Kiwi.HUD.HUDWidget);
            Widget.Bar = Bar;
        })(HUD.Widget || (HUD.Widget = {}));
        var Widget = HUD.Widget;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        (function (Widget) {
            var Icon = (function (_super) {
                __extends(Icon, _super);
                function Icon(atlas, x, y) {
                    _super.call(this, 'Icon', x, y);
                    this._cellIndex = 0;

                    this.atlas = atlas;

                    this.icon = this.container;
                    this._applyCSS();
                }
                Object.defineProperty(Icon.prototype, "cellIndex", {
                    get: function () {
                        return this._cellIndex;
                    },
                    set: function (value) {
                        this._cellIndex = value;
                        this.width = this.atlas.cells[this.cellIndex].w;
                        this.height = this.atlas.cells[this.cellIndex].h;
                        this._applyCSS();
                    },
                    enumerable: true,
                    configurable: true
                });


                Object.defineProperty(Icon.prototype, "width", {
                    get: function () {
                        return this.atlas.cells[this.cellIndex].w;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Icon.prototype, "height", {
                    get: function () {
                        return this.atlas.cells[this.cellIndex].h;
                    },
                    enumerable: true,
                    configurable: true
                });

                Icon.prototype._removeCSS = function () {
                    this.icon.style.width = '';
                    this.icon.style.height = '';
                    this.icon.style.backgroundImage = '';
                    this.icon.style.backgroundRepeat = '';
                    this.icon.style.backgroundSize = '';
                };

                Icon.prototype._applyCSS = function () {
                    this.icon.style.width = this.width + "px";
                    this.icon.style.height = this.height + "px";
                    this.icon.style.backgroundSize = "100%";
                    this.icon.style.backgroundPositionX = -this.atlas.cells[this.cellIndex].x + "px";
                    this.icon.style.backgroundPositionY = -this.atlas.cells[this.cellIndex].y + "px";
                    this.icon.style.backgroundImage = this.atlas.image.src;
                };

                Icon.prototype.setTemplate = function (main, icon) {
                    this._removeCSS();

                    _super.prototype.setTemplate.call(this, main, icon);

                    if (this.tempElement !== undefined) {
                        this.icon = this.tempElement;
                    }

                    this._applyCSS();
                };

                Icon.prototype.removeTemplate = function () {
                    _super.prototype.removeTemplate.call(this);

                    this._removeCSS();
                    this.icon = this.container;
                    this._applyCSS();
                };
                return Icon;
            })(Kiwi.HUD.HUDWidget);
            Widget.Icon = Icon;
        })(HUD.Widget || (HUD.Widget = {}));
        var Widget = HUD.Widget;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        (function (Widget) {
            var IconCounter = (function (_super) {
                __extends(IconCounter, _super);
                function IconCounter(atlas, current, max, x, y) {
                    _super.call(this, atlas, x, y);

                    this._horizontal = true;

                    this.range = this.components.add(new Kiwi.HUD.Components.Range(current, max, 0));
                    this.range.updated.add(this._changeSize, this);

                    this._changeSize();
                    this._applyCSS();
                }
                Object.defineProperty(IconCounter.prototype, "repeat", {
                    get: function () {
                        return this._repeat;
                    },
                    enumerable: true,
                    configurable: true
                });

                IconCounter.prototype._changeSize = function () {
                    if (this._horizontal) {
                        this._repeat = 'repeat-x';
                        this.width = this.atlas.cells[this.cellIndex].w * this.range.current;
                        this.height = this.atlas.cells[this.cellIndex].h;
                    } else {
                        this._repeat = 'repeat-y';
                        this.width = this.atlas.cells[this.cellIndex].w;
                        this.height = this.atlas.cells[this.cellIndex].h * this.range.current;
                    }
                };

                IconCounter.prototype._applyCSS = function () {
                    _super.prototype._applyCSS.call(this);
                    this.icon.style.backgroundRepeat = this.repeat;
                };

                Object.defineProperty(IconCounter.prototype, "horizontal", {
                    get: function () {
                        return this._horizontal;
                    },
                    set: function (val) {
                        this._horizontal = val;
                        this._changeSize();
                    },
                    enumerable: true,
                    configurable: true
                });


                Object.defineProperty(IconCounter.prototype, "vertical", {
                    get: function () {
                        return !this._horizontal;
                    },
                    set: function (val) {
                        this._horizontal = !val;
                        this._changeSize();
                    },
                    enumerable: true,
                    configurable: true
                });

                return IconCounter;
            })(Kiwi.HUD.Widget.Icon);
            Widget.IconCounter = IconCounter;
        })(HUD.Widget || (HUD.Widget = {}));
        var Widget = HUD.Widget;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        (function (Widget) {
            var BasicScore = (function (_super) {
                __extends(BasicScore, _super);
                function BasicScore(x, y) {
                    _super.call(this, "basicScore", x, y);
                    this.counter = this.components.add(new Kiwi.HUD.Components.Counter(0, 1));
                    this.counter.updated.add(this._updateText, this);
                }
                BasicScore.prototype._updateText = function () {
                    this.text(String(this.counter.value));
                };
                return BasicScore;
            })(Kiwi.HUD.Widget.TextField);
            Widget.BasicScore = BasicScore;
        })(HUD.Widget || (HUD.Widget = {}));
        var Widget = HUD.Widget;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        (function (Widget) {
            var Button = (function (_super) {
                __extends(Button, _super);
                function Button(game, width, height, x, y) {
                    _super.call(this, 'button', x, y);

                    this.game = game;

                    this.width = width;
                    this.height = height;

                    this.onCoordsUpdate.add(this._changed, this);
                }
                Object.defineProperty(Button.prototype, "width", {
                    get: function () {
                        return this._width;
                    },
                    set: function (value) {
                        this.container.style.width = value + "px";
                        this._width = value;
                        this._changed();
                    },
                    enumerable: true,
                    configurable: true
                });


                Object.defineProperty(Button.prototype, "height", {
                    get: function () {
                        return this._height;
                    },
                    set: function (value) {
                        this.container.style.height = value + "px";
                        this._height = value;
                        this._changed();
                    },
                    enumerable: true,
                    configurable: true
                });


                Button.prototype._changed = function () {
                };
                return Button;
            })(Kiwi.HUD.Widget.TextField);
            Widget.Button = Button;
        })(HUD.Widget || (HUD.Widget = {}));
        var Widget = HUD.Widget;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        (function (Widget) {
            var Time = (function (_super) {
                __extends(Time, _super);
                function Time(format, x, y) {
                    _super.call(this, 'time', x, y);

                    this.time = this.components.add(new Kiwi.HUD.Components.Time(0));
                    this.time.updated.add(this.updateTime, this);

                    this.format(format);
                    this.updateTime();
                }
                Time.prototype.setTime = function (milliseconds, seconds, minutes, hours) {
                    this.time.setTime(milliseconds, seconds, minutes, hours);

                    this.updateTime();
                    return this.time.milliseconds;
                };

                Time.prototype.format = function (val) {
                    if (val !== undefined) {
                        this._format = val;
                    }
                    return this._format;
                };

                Time.prototype.updateTime = function () {
                    var ms = String(this.time.milliseconds);
                    var s = String(this.time.seconds);
                    var m = String(this.time.minutes);
                    var h = String(this.time.hours);

                    if (s.length < 2)
                        var ss = '0' + s; else
                        var ss = s;
                    if (m.length < 2)
                        var mm = '0' + m; else
                        var mm = m;
                    if (h.length < 2)
                        var hh = '0' + h; else
                        var hh = h;

                    var time = this._format;
                    time = time.replace('ms', ms);

                    time = time.replace('ss', ss);
                    time = time.replace('mm', mm);
                    time = time.replace('hh', hh);
                    time = time.replace('s', s);
                    time = time.replace('m', m);
                    time = time.replace('h', h);

                    this.text(time);
                };
                return Time;
            })(Kiwi.HUD.Widget.TextField);
            Widget.Time = Time;
        })(HUD.Widget || (HUD.Widget = {}));
        var Widget = HUD.Widget;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        (function (Widget) {
            var Menu = (function (_super) {
                __extends(Menu, _super);
                function Menu(game, x, y) {
                    _super.call(this, 'menu', x, y);

                    this.game = game;
                    this._menuItems = [];
                }
                Menu.prototype.addMenuItem = function (item) {
                    this._menuItems.push(item);

                    item.addedToStage(this.game, this);

                    return item;
                };

                Menu.prototype.addMenuItems = function (items) {
                    for (var i = 0; i < items.length; i++) {
                        this.addMenuItem(items[i]);
                    }
                };

                Menu.prototype.getMenuItem = function (val) {
                    if (typeof val === 'string') {
                        var menuItem;
                        for (var i = 0; i < this._menuItems.length; i++) {
                            if (this._menuItems[i].name == val) {
                                menuItem = this._menuItems[i];
                            }
                        }
                        return menuItem;
                    }
                    if (typeof val === 'number') {
                        return this._menuItems[val];
                    }
                };

                Menu.prototype.setTemplate = function (main, sub) {
                    var mainElement = document.getElementById(main);
                    if (mainElement === undefined) {
                        return;
                    }

                    var subElements = mainElement.getElementsByTagName(sub);
                    if (subElements === undefined) {
                        return;
                    }

                    _super.prototype.setTemplate.call(this, main);
                };

                Menu.prototype.removeTemplate = function () {
                };

                Menu.prototype.update = function () {
                    for (var i = 0; i < this._menuItems.length; i++) {
                        this._menuItems[i].update();
                    }
                    _super.prototype.update.call(this);
                };
                return Menu;
            })(Kiwi.HUD.HUDWidget);
            Widget.Menu = Menu;
        })(HUD.Widget || (HUD.Widget = {}));
        var Widget = HUD.Widget;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        (function (Widget) {
            var MenuItem = (function (_super) {
                __extends(MenuItem, _super);
                function MenuItem(name, width, height, x, y) {
                    _super.call(this, name, x, y);

                    this.container.innerText = name;
                    this._applyCSS();
                }
                MenuItem.prototype.addedToStage = function (game, menu) {
                    this.game = game;
                    this.menu = menu;
                    this._applyCSS();
                };

                MenuItem.prototype._applyCSS = function () {
                    var addX = 0;
                    var addY = 0;
                    if (this.menu !== undefined) {
                    }
                };
                return MenuItem;
            })(Kiwi.HUD.HUDWidget);
            Widget.MenuItem = MenuItem;
        })(HUD.Widget || (HUD.Widget = {}));
        var Widget = HUD.Widget;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        (function (Components) {
            var Counter = (function (_super) {
                __extends(Counter, _super);
                function Counter(initial, step) {
                    if (typeof step === "undefined") { step = 1; }
                    _super.call(this, "counter");
                    this._value = 0;
                    this._value = initial;
                    this.step = step;

                    this.updated = new Kiwi.Signal();
                }

                Object.defineProperty(Counter.prototype, "value", {
                    get: function () {
                        return this._value;
                    },
                    set: function (val) {
                        if (val !== undefined) {
                            this._value = val;
                            this.updated.dispatch(this._value);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });

                Counter.prototype.increment = function (val) {
                    if (val !== undefined) {
                        this._value += val;
                    } else {
                        this._value += this.step;
                    }
                    this.updated.dispatch(this._value);
                    return this._value;
                };

                Counter.prototype.decrement = function (val) {
                    if (val !== undefined) {
                        this._value -= val;
                    } else {
                        this._value -= this.step;
                    }
                    this.updated.dispatch(this._value);
                    return this._value;
                };
                return Counter;
            })(Kiwi.Component);
            Components.Counter = Counter;
        })(HUD.Components || (HUD.Components = {}));
        var Components = HUD.Components;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        (function (Components) {
            var WidgetInput = (function (_super) {
                __extends(WidgetInput, _super);
                function WidgetInput(game) {
                    _super.call(this, 'WidgetInput');

                    this.game = game;

                    this.inputEntered = new Kiwi.Signal();
                    this.inputLeft = new Kiwi.Signal();
                    this.inputOnDown = new Kiwi.Signal();
                    this.inputOnRelease = new Kiwi.Signal();

                    this.pointDown = new Kiwi.Geom.Point();

                    this.distance = new Kiwi.Geom.Point();
                    this.withinBounds = false;
                    this.outsideBounds = true;
                    this.isUp = true;
                    this.isDown = false;
                }
                WidgetInput.prototype.objType = function () {
                    return "Input";
                };

                WidgetInput.prototype.update = function () {
                };

                Object.defineProperty(WidgetInput.prototype, "toString", {
                    get: function () {
                        return '[{WidgetInput (x=' + this.withinBounds + ')}]';
                    },
                    enumerable: true,
                    configurable: true
                });
                return WidgetInput;
            })(Kiwi.Component);
            Components.WidgetInput = WidgetInput;
        })(HUD.Components || (HUD.Components = {}));
        var Components = HUD.Components;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        (function (Components) {
            var Range = (function (_super) {
                __extends(Range, _super);
                function Range(current, max, min) {
                    _super.call(this, "counter");

                    this._current = current;

                    this._max = max;

                    this._min = min;

                    this.updated = new Kiwi.Signal();
                }

                Object.defineProperty(Range.prototype, "max", {
                    get: function () {
                        return this._max;
                    },
                    set: function (val) {
                        if (val !== undefined) {
                            this._max = val;
                            this.updated.dispatch(this._current, this._max, this._min);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });


                Object.defineProperty(Range.prototype, "min", {
                    get: function () {
                        return this._min;
                    },
                    set: function (val) {
                        if (val !== undefined) {
                            this._min = val;
                            this.updated.dispatch(this._current, this._max, this._min);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });


                Object.defineProperty(Range.prototype, "current", {
                    get: function () {
                        return this._current;
                    },
                    set: function (val) {
                        if (val !== undefined) {
                            if (this._current > this._max) {
                                this._current = this._max;
                            } else if (this._current < this._min) {
                                this._current = this._min;
                            } else {
                                this._current = val;
                            }
                            this.updated.dispatch(this._current, this._max, this._min);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });

                Range.prototype.decrease = function (val) {
                    if (typeof val === "undefined") { val = 1; }
                    if (this._current > this._min) {
                        if (this._current - val < this._min) {
                            this._current = this._min;
                        } else {
                            this._current -= val;
                        }
                        this.updated.dispatch(this._current, this._max, this._min);
                    }
                    return this._current;
                };

                Range.prototype.increase = function (val) {
                    if (typeof val === "undefined") { val = 1; }
                    if (this._current < this._max) {
                        if (this._current + val > this._max) {
                            this._current = this._max;
                        } else {
                            this._current += val;
                        }
                        this.updated.dispatch(this._current, this._max, this._min);
                    }
                    return this._current;
                };

                Range.prototype.currentPercent = function () {
                    return ((this.current) / (this.max)) * 100;
                };
                return Range;
            })(Kiwi.Component);
            Components.Range = Range;
        })(HUD.Components || (HUD.Components = {}));
        var Components = HUD.Components;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        (function (Components) {
            var Time = (function (_super) {
                __extends(Time, _super);
                function Time(milliseconds, seconds, minutes, hours) {
                    _super.call(this, "time");

                    this.paused = true;
                    this._countDown = true;
                    this.updated = new Kiwi.Signal();
                    this._lastTime = Date.now();
                    this.setTime(milliseconds, seconds, minutes, hours);
                }

                Object.defineProperty(Time.prototype, "countingDown", {
                    get: function () {
                        return this._countDown;
                    },
                    set: function (val) {
                        if (val !== undefined) {
                            if (val == true)
                                this.paused = false;

                            this._countDown = val;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });


                Object.defineProperty(Time.prototype, "countingUp", {
                    get: function () {
                        return !this._countDown;
                    },
                    set: function (val) {
                        if (val !== undefined) {
                            if (val == true)
                                this.paused = false;

                            this._countDown = !val;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });

                Time.prototype.setTime = function (milliseconds, seconds, minutes, hours) {
                    if (seconds !== undefined)
                        milliseconds += this.convertToMilli(seconds, 's');
                    if (minutes !== undefined)
                        milliseconds += this.convertToMilli(minutes, 'm');
                    if (hours !== undefined)
                        milliseconds += this.convertToMilli(hours, 'h');

                    this._milliseconds = milliseconds;
                    this.updated.dispatch();

                    return this._milliseconds;
                };

                Time.prototype.increaseTime = function (milliseconds, seconds, minutes, hours) {
                    if (seconds !== undefined)
                        milliseconds += this.convertToMilli(seconds, 's');
                    if (minutes !== undefined)
                        milliseconds += this.convertToMilli(minutes, 'm');
                    if (hours !== undefined)
                        milliseconds += this.convertToMilli(hours, 'h');

                    this._milliseconds += milliseconds;
                    this.updated.dispatch();

                    return this._milliseconds;
                };

                Time.prototype.decreaseTime = function (milliseconds, seconds, minutes, hours) {
                    if (seconds !== undefined)
                        milliseconds += this.convertToMilli(seconds, 's');
                    if (minutes !== undefined)
                        milliseconds += this.convertToMilli(minutes, 'm');
                    if (hours !== undefined)
                        milliseconds += this.convertToMilli(hours, 'h');

                    this._milliseconds += milliseconds;
                    this.updated.dispatch();

                    return this._milliseconds;
                };

                Time.prototype.convertToMilli = function (val, unit) {
                    var num = 0;
                    if (unit === 'milli' || unit === 'milliseconds' || unit === 'ms') {
                        num = val;
                    } else if (unit === 'seconds' || unit === 's') {
                        num = val * 1000;
                    } else if (unit === 'minutes' || unit === 'm') {
                        num = val * 1000 * 60;
                    } else if (unit === 'hours' || unit === 'h') {
                        num = val * 1000 * 60 * 60;
                    }

                    return num;
                };


                Object.defineProperty(Time.prototype, "milliseconds", {
                    get: function () {
                        return this._milliseconds % 1000;
                    },
                    set: function (val) {
                        if (val !== undefined) {
                            this._milliseconds = val;
                            this.updated.dispatch();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });


                Object.defineProperty(Time.prototype, "seconds", {
                    get: function () {
                        return Math.floor(this._milliseconds / 1000) % 60;
                    },
                    set: function (val) {
                        if (val !== undefined) {
                            this._milliseconds = this.convertToMilli(val, 's');
                            this.updated.dispatch();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });


                Object.defineProperty(Time.prototype, "minutes", {
                    get: function () {
                        return Math.floor(this._milliseconds / 1000 / 60) % 60;
                    },
                    set: function (val) {
                        if (val !== undefined) {
                            this._milliseconds = this.convertToMilli(val, 'm');
                            this.updated.dispatch();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });


                Object.defineProperty(Time.prototype, "hours", {
                    get: function () {
                        return Math.floor(this._milliseconds / 1000 / 60 / 60);
                    },
                    set: function (val) {
                        if (val !== undefined) {
                            this._milliseconds = this.convertToMilli(val, 'h');
                            this.updated.dispatch();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });

                Time.prototype.update = function () {
                    if (!this.paused) {
                        var newTime = Date.now();
                        var difference = newTime - this._lastTime;
                        this._lastTime = newTime;

                        if (this._countDown) {
                            this.milliseconds = this._milliseconds - difference;
                        } else {
                            this.milliseconds = this._milliseconds + difference;
                        }
                        this.updated.dispatch();
                    }

                    _super.prototype.update.call(this);
                };
                return Time;
            })(Kiwi.Component);
            Components.Time = Time;
        })(HUD.Components || (HUD.Components = {}));
        var Components = HUD.Components;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Sound) {
        var AudioManager = (function () {
            function AudioManager(game) {
                this.noAudio = false;
                this.usingWebAudio = false;
                this.usingAudioTag = false;
                this.context = null;
                this.masterGain = null;
                this._game = game;
            }
            AudioManager.prototype.objType = function () {
                return "AudioManager";
            };

            AudioManager.prototype.boot = function () {
                this._volume = 1;
                this._muted = false;
                this._sounds = [];

                if (Kiwi.DEVICE.iOS && Kiwi.DEVICE.webaudio == false) {
                    this.channels = 1;
                }

                this.usingWebAudio = true;
                this.usingAudioTag = false;

                if (!!window['AudioContext']) {
                    this.context = new window['AudioContext']();
                } else if (!!window['webkitAudioContext']) {
                    this.context = new window['webkitAudioContext']();
                } else if (!!window['Audio']) {
                    this.usingWebAudio = false;
                    this.usingAudioTag = true;
                } else {
                    this.usingWebAudio = false;
                    this.noAudio = true;
                }

                if (this.context !== null) {
                    if (this.context.createGain === undefined) {
                        this.masterGain = this.context.createGainNode();
                    } else {
                        this.masterGain = this.context.createGain();
                    }

                    this.masterGain.gain.value = 1;
                    this.masterGain.connect(this.context.destination);
                }
            };


            Object.defineProperty(AudioManager.prototype, "mute", {
                get: function () {
                    return this._muted;
                },
                set: function (value) {
                    if (value === true) {
                        if (this._muted)
                            return;
                        this._muted = true;

                        if (this.usingWebAudio) {
                            this._muteVolume = this.masterGain.gain.value;
                            this.masterGain.gain.value = 0;
                        } else if (this.usingAudioTag) {
                            for (var i = 0; i < this._sounds.length; i++) {
                                this._sounds[i].mute(true);
                            }
                        }
                    } else {
                        if (this._muted == false)
                            return;
                        this._muted = false;

                        if (this.usingWebAudio) {
                            this.masterGain.gain.value = this._muteVolume;
                        } else if (this.usingAudioTag) {
                            for (var i = 0; i < this._sounds.length; i++) {
                                this._sounds[i].mute(false);
                            }
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(AudioManager.prototype, "volume", {
                get: function () {
                    return this._volume;
                },
                set: function (value) {
                    if (value !== undefined) {
                        value = Kiwi.Utils.GameMath.clamp(value, 1, 0);
                        this._volume = value;

                        if (this._muted) {
                            this._muteVolume = this._volume;
                        }

                        if (this.usingWebAudio) {
                            this.masterGain.gain.value = value;
                        } else if (this.usingAudioTag) {
                            for (var i = 0; i < this._sounds.length; i++) {
                                this._sounds[i].volume(this._sounds[i].volume());
                            }
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });

            AudioManager.prototype.add = function (key, volume, loop) {
                if (typeof volume === "undefined") { volume = 1; }
                if (typeof loop === "undefined") { loop = false; }
                if (this.noAudio)
                    return;

                var sound = new Kiwi.Sound.Audio(this._game, key, volume, loop);
                this._sounds.push(sound);
                return sound;

                return null;
            };

            AudioManager.prototype.remove = function (sound) {
                for (var i = 0; i < this._sounds.length; i++) {
                    if (sound == this._sounds[i]) {
                        this._sounds[i].gainNode.disconnect();
                        this._sounds.splice(i, 1, 0);
                        i--;
                    }
                }
            };

            AudioManager.prototype.playAll = function () {
                for (var i = 0; i < this._sounds.length; i++) {
                    if (this._sounds[i]) {
                        this._sounds[i].play();
                    }
                }
            };

            AudioManager.prototype.stopAll = function () {
                for (var i = 0; i < this._sounds.length; i++) {
                    if (this._sounds[i]) {
                        this._sounds[i].stop();
                    }
                }
            };

            AudioManager.prototype.pauseAll = function () {
                for (var i = 0; i < this._sounds.length; i++) {
                    if (this._sounds[i]) {
                        this._sounds[i].pause();
                    }
                }
            };

            AudioManager.prototype.resumeAll = function () {
                for (var i = 0; i < this._sounds.length; i++) {
                    if (this._sounds[i]) {
                        this._sounds[i].resume();
                    }
                }
            };

            AudioManager.prototype.update = function () {
                if (!this.noAudio) {
                    for (var i = 0; i < this._sounds.length; i++) {
                        this._sounds[i].update();
                    }
                }
            };
            return AudioManager;
        })();
        Sound.AudioManager = AudioManager;
    })(Kiwi.Sound || (Kiwi.Sound = {}));
    var Sound = Kiwi.Sound;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Sound) {
        var Audio = (function () {
            function Audio(game, key, volume, loop) {
                this._muted = false;
                this.totalDuration = 0;
                this._buffer = null;
                this._decoded = false;
                this._markers = [];
                this._currentMarker = 'default';
                this._game = game;

                this._usingAudioTag = this._game.audio.usingAudioTag;
                this._usingWebAudio = this._game.audio.usingWebAudio;

                if (this._game.audio.noAudio)
                    return;

                if (!this._setAudio(key))
                    return;

                if (this._usingWebAudio) {
                    this.context = this._game.audio.context;
                    this.masterGainNode = this._game.audio.masterGain;

                    if (this.context.createGain === 'undefined') {
                        this.gainNode = this.context.createGainNode();
                    } else {
                        this.gainNode = this.context.createGain();
                    }

                    this._decode();

                    this.gainNode.gain.value = volume * this._game.audio.volume;
                    this.gainNode.connect(this.masterGainNode);
                } else if (this._usingAudioTag) {
                    this.totalDuration = this._sound.duration;
                    this._sound.volume = volume * this._game.audio.volume;

                    if (isNaN(this.totalDuration))
                        this._pending = true;
                }

                this.duration = 0;
                this.volume = volume;
                this._muteVolume = volume;
                this._loop = loop;

                this.addMarker('default', 0, this.totalDuration, this._loop);
                this._currentMarker = 'default';

                this.onPlay = new Kiwi.Signal();
                this.onStop = new Kiwi.Signal();
                this.onPause = new Kiwi.Signal();
                this.onResume = new Kiwi.Signal();
                this.onLoop = new Kiwi.Signal();
                this.onMute = new Kiwi.Signal();
            }
            Audio.prototype.objType = function () {
                return "Audio";
            };

            Audio.prototype._setAudio = function (key) {
                if (key == '' || this._game.fileStore.exists(key) === false) {
                    this.ready = false;
                    return;
                }

                this.key = key;
                this._file = this._game.fileStore.getFile(key);
                this._sound = this._file.data;
                this.ready = true;

                return true;
            };

            Audio.prototype._decode = function () {
                if (this._usingAudioTag || this._file.data.decode == false)
                    return;

                if (this._file.data.decoded === true && this._file.data.buffer !== null) {
                    this._buffer = this._file.data.buffer;
                    this._decoded = true;
                    return;
                }

                var that = this;
                this.context.decodeAudioData(this._file.data.raw, function (buffer) {
                    that._buffer = buffer;
                    that._decoded = true;
                });
            };


            Object.defineProperty(Audio.prototype, "volume", {
                get: function () {
                    return this._volume;
                },
                set: function (val) {
                    if (this._game.audio.noAudio)
                        return;

                    if (val !== undefined) {
                        val = Kiwi.Utils.GameMath.clamp(val, 1, 0);

                        this._volume = val;

                        if (this._muted) {
                            this._muteVolume = this._volume;
                        }

                        if (this._usingWebAudio) {
                            this.gainNode.gain.value = this._volume * this._game.audio.volume;
                        } else if (this._usingAudioTag) {
                            this._sound.volume = this._volume * this._game.audio.volume;
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Audio.prototype, "mute", {
                get: function () {
                    return this._muted;
                },
                set: function (val) {
                    if (this._game.audio.noAudio)
                        return;

                    if (val !== undefined && this._muted !== val) {
                        if (val === true) {
                            this._muteVolume = this._volume;
                            this.volume = 0;
                            this._muted = true;
                        } else {
                            this._muted = false;
                            this.volume = this._muteVolume;
                        }
                        this.onMute.dispatch(this._muted);
                    }
                },
                enumerable: true,
                configurable: true
            });

            Audio.prototype.addMarker = function (name, start, stop, loop) {
                if (typeof loop === "undefined") { loop = false; }
                this._markers[name] = { start: start, stop: stop, duration: stop - start, loop: loop };
            };

            Audio.prototype.removeMarker = function (name) {
                if (name === 'default')
                    return;

                if (this.isPlaying && this._currentMarker == name) {
                    this.stop();
                    this._currentMarker = 'default';
                }
                delete this._markers[name];
            };

            Audio.prototype.play = function (marker, forceRestart) {
                if (typeof marker === "undefined") { marker = this._currentMarker; }
                if (typeof forceRestart === "undefined") { forceRestart = false; }
                if (this.isPlaying && forceRestart == false || this._game.audio.noAudio)
                    return;

                if (forceRestart)
                    this.stop();

                this.paused = false;

                if (this._markers[marker] == undefined)
                    return;

                if (this._currentMarker === marker && this.isPlaying)
                    return;

                this._currentMarker = marker;
                this.duration = this._markers[this._currentMarker].duration * 1000;
                this._loop = this._markers[this._currentMarker].loop;

                if (this._usingWebAudio) {
                    if (this._decoded === true) {
                        if (this._buffer == null)
                            this._buffer = this._file.data.buffer;

                        this._sound = this.context.createBufferSource();
                        this._sound.buffer = this._buffer;
                        this._sound.connect(this.gainNode);
                        this.totalDuration = this._sound.buffer.duration;

                        if (this.duration == 0)
                            this.duration = this.totalDuration * 1000;

                        if (this._loop)
                            this._sound.loop = true;

                        if (this._sound.start === undefined) {
                            this._sound.noteGrainOn(0, this._markers[this._currentMarker].start, this.duration / 1000);
                        } else {
                            this._sound.start(0, this._markers[this._currentMarker].start, this.duration / 1000);
                        }

                        this.isPlaying = true;
                        this._startTime = this._game.time.now();
                        this._currentTime = 0;
                        this._stopTime = this._startTime + this.duration;
                        this.onPlay.dispatch();
                    } else {
                        this._pending = true;
                        this._decode();
                    }
                } else if (this._usingAudioTag) {
                    if (this.duration == 0 || isNaN(this.duration))
                        this.duration = this.totalDuration * 1000;

                    if (this._muted)
                        this._sound.volume = 0; else
                        this._sound.volume = this._volume;

                    this._sound.currentTime = this._markers[this._currentMarker].start;
                    this._sound.play();
                    this.isPlaying = true;
                    this._startTime = this._game.time.now();
                    this._currentTime = 0;
                    this._stopTime = this._startTime + this.duration;

                    if (!this.paused)
                        this.onPlay.dispatch();
                }
            };

            Audio.prototype.stop = function () {
                if (this.isPlaying && this._sound) {
                    if (this._usingWebAudio) {
                        if (this._sound.stop === undefined) {
                            this._sound.noteOff(0);
                        } else {
                            this._sound.stop(0);
                        }
                    } else if (this._usingAudioTag) {
                        this._sound.pause();
                        this._sound.currentTime = 0;
                    }

                    if (this.paused == false)
                        this.onStop.dispatch();
                }

                this.isPlaying = false;
            };

            Audio.prototype.pause = function () {
                if (this.isPlaying) {
                    this.paused = true;
                    this.stop();
                    this.onPause.dispatch();
                }
            };

            Audio.prototype.resume = function () {
                if (this.paused && this.isPlaying == false) {
                    if (this._usingWebAudio) {
                        if (this._buffer == null)
                            this._buffer = this._file.data.buffer;

                        this._sound = this.context.createBufferSource();
                        this._sound.buffer = this._buffer;
                        this._sound.connect(this.gainNode);

                        if (this._sound.start === undefined) {
                            this._sound.noteGrainOn(0, this._markers[this._currentMarker].start + (this._currentTime / 1000), this.duration / 1000);
                        } else {
                            this._sound.start(0, this._markers[this._currentMarker].start + (this._currentTime / 1000), this.duration / 1000);
                        }
                    } else {
                        this._sound.currentTime = this._markers[this._currentMarker].start + this._currentTime / 1000;
                        this._sound.play();
                    }

                    this.paused = false;
                    this.isPlaying = true;
                    this.onResume.dispatch();
                }
            };

            Audio.prototype.update = function () {
                if (!this.ready)
                    return;

                if (this._pending) {
                    if (this._decoded === true || this._file.data.decoded) {
                        this._pending = false;
                        this.play();
                    } else if (this._usingAudioTag && !isNaN(this._sound.duration)) {
                        this.totalDuration = this._sound.duration;
                        this._markers['default'].duration = this.totalDuration;
                        this._pending = false;

                        if (this.isPlaying && this._currentMarker == 'default')
                            this.duration = this.totalDuration;
                    }
                }

                if (this.isPlaying) {
                    this._currentTime = this._game.time.now() - this._startTime;

                    if (this._currentTime >= this.duration) {
                        if (this._usingWebAudio) {
                            if (this._loop) {
                                if (this._currentMarker == 'default') {
                                    this._currentTime = 0;
                                    this._startTime = this._game.time.now();
                                } else {
                                    this.play(this._currentMarker, true);
                                }

                                this.onLoop.dispatch();
                            } else {
                                this.stop();
                            }
                        } else if (this._usingAudioTag) {
                            if (this._loop) {
                                this.play(this._currentMarker, true);
                                this.onLoop.dispatch();
                            } else {
                                this.stop();
                            }
                        }
                    }
                }
            };

            Audio.prototype.destroy = function () {
                this._sound = null;
                this._currentTime = null;
                this._startTime = null;
                this._stopTime = null;
                this._pending = null;
                this.masterGainNode = null;
                this.gainNode = null;
                this.totalDuration = null;
                this.duration = null;
                this._file = null;
                this._buffer = null;
                this._decoded = null;
            };
            return Audio;
        })();
        Sound.Audio = Audio;
    })(Kiwi.Sound || (Kiwi.Sound = {}));
    var Sound = Kiwi.Sound;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Sound) {
        var AudioLibrary = (function () {
            function AudioLibrary(game) {
                this._game = game;
                this.audio = {};
            }
            AudioLibrary.prototype.objType = function () {
                return "AudioLibrary";
            };

            AudioLibrary.prototype.clear = function () {
                for (var prop in this.audio) {
                    delete this.audio[prop];
                }
            };

            AudioLibrary.prototype.add = function (audioFile) {
                switch (audioFile.dataType) {
                    case Kiwi.Files.File.AUDIO:
                        this.audio[audioFile.key] = audioFile;
                        break;

                    default:
                        break;
                }
            };
            return AudioLibrary;
        })();
        Sound.AudioLibrary = AudioLibrary;
    })(Kiwi.Sound || (Kiwi.Sound = {}));
    var Sound = Kiwi.Sound;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Input) {
        var Key = (function () {
            function Key(manager, keycode, event) {
                this.isDown = false;
                this.isUp = false;
                this.altKey = false;
                this.ctrlKey = false;
                this.shiftKey = false;
                this.timeDown = 0;
                this.duration = 0;
                this.timeUp = 0;
                this.repeats = 0;
                this._manager = manager;
                this.keyCode = keycode;

                if (event) {
                    this.update(event);
                }
            }
            Key.prototype.objType = function () {
                return "Key";
            };

            Key.prototype.update = function (event) {
                this.keyCode = event.keyCode;

                if (event.type === 'keydown') {
                    this.altKey = event.altKey;
                    this.ctrlKey = event.ctrlKey;
                    this.shiftKey = event.shiftKey;

                    if (this.isDown === true) {
                        this.repeats++;
                    } else {
                        this.isDown = true;
                        this.isUp = false;
                        this.timeDown = event.timeStamp;
                        this.duration = 0;
                    }
                } else if (event.type === 'keyup') {
                    this.isDown = false;
                    this.isUp = true;
                    this.timeUp = event.timeStamp;
                }
            };

            Key.prototype.justPressed = function (duration) {
                if (typeof duration === "undefined") { duration = this._manager.justPressedRate; }
                if (this.isDown === true && (this.timeDown + duration) < this._manager.game.time.now()) {
                    return true;
                } else {
                    return false;
                }
            };

            Key.prototype.justReleased = function (duration) {
                if (typeof duration === "undefined") { duration = this._manager.justReleasedRate; }
                if (this.isUp === true && (this.timeUp + duration) < this._manager.game.time.now()) {
                    return true;
                } else {
                    return false;
                }
            };
            return Key;
        })();
        Input.Key = Key;
    })(Kiwi.Input || (Kiwi.Input = {}));
    var Input = Kiwi.Input;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Input) {
        var Keyboard = (function () {
            function Keyboard(game) {
                this._domElement = null;
                this._keys = [];
                this.justPressedRate = 200;
                this.justReleasedRate = 200;
                this.game = game;
            }
            Keyboard.prototype.objType = function () {
                return "Keyboard";
            };

            Keyboard.prototype.boot = function () {
                this.start();
            };

            Keyboard.prototype.update = function () {
            };

            Keyboard.prototype.start = function () {
                var _this = this;
                if (this.game.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                    document.body.addEventListener('keydown', function (event) {
                        return _this.onKeyDown(event);
                    }, false);
                    document.body.addEventListener('keyup', function (event) {
                        return _this.onKeyUp(event);
                    }, false);
                }
            };

            Keyboard.prototype.stop = function () {
                var _this = this;
                if (this.game.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                    this._domElement.removeEventListener('keydown', function (event) {
                        return _this.onKeyDown(event);
                    }, false);
                    this._domElement.removeEventListener('keyup', function (event) {
                        return _this.onKeyUp(event);
                    }, false);
                }
            };

            Keyboard.prototype.onKeyDown = function (event) {
                if (this._keys[event.keyCode]) {
                    this._keys[event.keyCode].update(event);
                } else {
                    this._keys[event.keyCode] = new Kiwi.Input.Key(this, event.keyCode, event);
                }
            };

            Keyboard.prototype.onKeyUp = function (event) {
                if (this._keys[event.keyCode]) {
                    this._keys[event.keyCode].update(event);
                } else {
                    this._keys[event.keyCode] = new Kiwi.Input.Key(this, event.keyCode, event);
                }
            };

            Keyboard.prototype.addKey = function (keycode) {
                return this._keys[keycode] = new Kiwi.Input.Key(this, keycode);
            };

            Keyboard.prototype.justPressed = function (key) {
            };

            Keyboard.prototype.justReleased = function (key) {
            };

            Keyboard.prototype.isDown = function (keycode) {
                if (this._keys[keycode]) {
                    return this._keys[keycode].isDown;
                } else {
                    return false;
                }
            };

            Keyboard.prototype.isUp = function (keycode) {
                if (this._keys[keycode]) {
                    return this._keys[keycode].isUp;
                } else {
                    return false;
                }
            };

            Keyboard.prototype.reset = function () {
            };
            return Keyboard;
        })();
        Input.Keyboard = Keyboard;
    })(Kiwi.Input || (Kiwi.Input = {}));
    var Input = Kiwi.Input;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Input) {
        var Keycodes = (function () {
            function Keycodes() {
            }
            Keycodes.prototype.objType = function () {
                return "Keycodes";
            };

            Keycodes.A = "A".charCodeAt(0);
            Keycodes.B = "B".charCodeAt(0);
            Keycodes.C = "C".charCodeAt(0);
            Keycodes.D = "D".charCodeAt(0);
            Keycodes.E = "E".charCodeAt(0);
            Keycodes.F = "F".charCodeAt(0);
            Keycodes.G = "G".charCodeAt(0);
            Keycodes.H = "H".charCodeAt(0);
            Keycodes.I = "I".charCodeAt(0);
            Keycodes.J = "J".charCodeAt(0);
            Keycodes.K = "K".charCodeAt(0);
            Keycodes.L = "L".charCodeAt(0);
            Keycodes.M = "M".charCodeAt(0);
            Keycodes.N = "N".charCodeAt(0);
            Keycodes.O = "O".charCodeAt(0);
            Keycodes.P = "P".charCodeAt(0);
            Keycodes.Q = "Q".charCodeAt(0);
            Keycodes.R = "R".charCodeAt(0);
            Keycodes.S = "S".charCodeAt(0);
            Keycodes.T = "T".charCodeAt(0);
            Keycodes.U = "U".charCodeAt(0);
            Keycodes.V = "V".charCodeAt(0);
            Keycodes.W = "W".charCodeAt(0);
            Keycodes.X = "X".charCodeAt(0);
            Keycodes.Y = "Y".charCodeAt(0);
            Keycodes.Z = "Z".charCodeAt(0);

            Keycodes.ZERO = "0".charCodeAt(0);
            Keycodes.ONE = "1".charCodeAt(0);
            Keycodes.TWO = "2".charCodeAt(0);
            Keycodes.THREE = "3".charCodeAt(0);
            Keycodes.FOUR = "4".charCodeAt(0);
            Keycodes.FIVE = "5".charCodeAt(0);
            Keycodes.SIX = "6".charCodeAt(0);
            Keycodes.SEVEN = "7".charCodeAt(0);
            Keycodes.EIGHT = "8".charCodeAt(0);
            Keycodes.NINE = "9".charCodeAt(0);

            Keycodes.NUMPAD_0 = 96;
            Keycodes.NUMPAD_1 = 97;
            Keycodes.NUMPAD_2 = 98;
            Keycodes.NUMPAD_3 = 99;
            Keycodes.NUMPAD_4 = 100;
            Keycodes.NUMPAD_5 = 101;
            Keycodes.NUMPAD_6 = 102;
            Keycodes.NUMPAD_7 = 103;
            Keycodes.NUMPAD_8 = 104;
            Keycodes.NUMPAD_9 = 105;
            Keycodes.NUMPAD_MULTIPLY = 106;
            Keycodes.NUMPAD_ADD = 107;
            Keycodes.NUMPAD_ENTER = 108;
            Keycodes.NUMPAD_SUBTRACT = 109;
            Keycodes.NUMPAD_DECIMAL = 110;
            Keycodes.NUMPAD_DIVIDE = 111;

            Keycodes.F1 = 112;
            Keycodes.F2 = 113;
            Keycodes.F3 = 114;
            Keycodes.F4 = 115;
            Keycodes.F5 = 116;
            Keycodes.F6 = 117;
            Keycodes.F7 = 118;
            Keycodes.F8 = 119;
            Keycodes.F9 = 120;
            Keycodes.F10 = 121;
            Keycodes.F11 = 122;
            Keycodes.F12 = 123;
            Keycodes.F13 = 124;
            Keycodes.F14 = 125;
            Keycodes.F15 = 126;

            Keycodes.COLON = 186;
            Keycodes.EQUALS = 187;
            Keycodes.UNDERSCORE = 189;
            Keycodes.QUESTION_MARK = 191;
            Keycodes.TILDE = 192;
            Keycodes.OPEN_BRACKET = 219;
            Keycodes.BACKWARD_SLASH = 220;
            Keycodes.CLOSED_BRACKET = 221;
            Keycodes.QUOTES = 222;

            Keycodes.BACKSPACE = 8;
            Keycodes.TAB = 9;
            Keycodes.CLEAR = 12;
            Keycodes.ENTER = 13;
            Keycodes.SHIFT = 16;
            Keycodes.CONTROL = 17;
            Keycodes.ALT = 18;
            Keycodes.CAPS_LOCK = 20;
            Keycodes.ESC = 27;
            Keycodes.SPACEBAR = 32;
            Keycodes.PAGE_UP = 33;
            Keycodes.PAGE_DOWN = 34;
            Keycodes.END = 35;
            Keycodes.HOME = 36;
            Keycodes.LEFT = 37;
            Keycodes.UP = 38;
            Keycodes.RIGHT = 39;
            Keycodes.DOWN = 40;
            Keycodes.INSERT = 45;
            Keycodes.DELETE = 46;
            Keycodes.HELP = 47;
            Keycodes.NUM_LOCK = 144;
            return Keycodes;
        })();
        Input.Keycodes = Keycodes;
    })(Kiwi.Input || (Kiwi.Input = {}));
    var Input = Kiwi.Input;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Input) {
        var Pointer = (function () {
            function Pointer(game) {
                this.x = -1;
                this.y = -1;
                this.clientX = -1;
                this.clientY = -1;
                this.pageX = -1;
                this.pageY = -1;
                this.screenX = -1;
                this.screenY = -1;
                this.isDown = false;
                this.isUp = true;
                this.withinGame = false;
                this.active = false;
                this.timeDown = 0;
                this.timeUp = 0;
                this.duration = 0;
                this.frameDuration = 0;
                this.justPressedRate = 200;
                this.justReleasedRate = 200;
                this._game = game;
                this.point = new Kiwi.Geom.Point();
                this.circle = new Kiwi.Geom.Circle(0, 0, 1);
                this.startPoint = new Kiwi.Geom.Point();
                this.endPoint = new Kiwi.Geom.Point();
            }
            Pointer.prototype.objType = function () {
                return 'Pointer';
            };

            Object.defineProperty(Pointer.prototype, "game", {
                get: function () {
                    return this._game;
                },
                enumerable: true,
                configurable: true
            });

            Pointer.prototype.start = function (event) {
                this.move(event);
                this.startPoint.setTo(this.x, this.y);
                this.frameDuration = 0;
                this.withinGame = true;
                this.isDown = true;
                this.isUp = false;
                this.timeDown = this.game.time.now();
            };

            Pointer.prototype.stop = function (event) {
                this.withinGame = false;
                this.endPoint.setTo(this.x, this.y);
                this.isDown = false;
                this.isUp = true;

                this.timeUp = this.game.time.now();
                this.duration = this.timeUp - this.timeDown;
            };

            Pointer.prototype.move = function (event) {
                this.clientX = event.clientX;
                this.clientY = event.clientY;

                this.pageX = event.pageX;
                this.pageY = event.pageY;

                this.screenX = event.screenX;
                this.screenY = event.screenY;

                this.x = this.pageX - this.game.stage.offset.x;
                this.y = this.pageY - this.game.stage.offset.y;

                this.point.setTo(this.x, this.y);
                this.circle.x = this.x;
                this.circle.y = this.y;

                this.duration = this.game.time.now() - this.timeDown;
            };

            Pointer.prototype.justPressed = function (duration) {
                if (typeof duration === "undefined") { duration = this.justPressedRate; }
                if (this.isDown === true && (this.timeDown + duration) > this._game.time.now()) {
                    return true;
                } else {
                    return false;
                }
            };

            Pointer.prototype.justReleased = function (duration) {
                if (typeof duration === "undefined") { duration = this.justReleasedRate; }
                if (this.isUp === true && (this.timeUp + duration) > this._game.time.now()) {
                    return true;
                } else {
                    return false;
                }
            };

            Pointer.prototype.reset = function () {
                this.isDown = false;
                this.isUp = true;
                this.timeDown = 0;
                this.timeUp = 0;
                this.duration = 0;
                this.frameDuration = 0;
            };

            Pointer.prototype.update = function () {
                if (this.isDown === true) {
                    this.frameDuration++;
                    this.duration = this._game.time.now() - this.timeDown;
                }
            };
            return Pointer;
        })();
        Input.Pointer = Pointer;
    })(Kiwi.Input || (Kiwi.Input = {}));
    var Input = Kiwi.Input;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Input) {
        var MouseCursor = (function (_super) {
            __extends(MouseCursor, _super);
            function MouseCursor() {
                _super.apply(this, arguments);
            }
            MouseCursor.prototype.objType = function () {
                return 'MouseCursor';
            };

            MouseCursor.prototype.start = function (event) {
                this.ctrlKey = event.ctrlKey;
                this.shiftKey = event.shiftKey;
                this.altKey = event.altKey;
                this.button - event.button;

                _super.prototype.start.call(this, event);
            };

            MouseCursor.prototype.stop = function (event) {
                this.move(event);
                _super.prototype.stop.call(this, event);
            };

            MouseCursor.prototype.wheel = function (event) {
                if (event['wheelDeltaX']) {
                    this.wheelDeltaX = event['wheelDeltaX'];
                } else {
                    this.wheelDeltaX = event.deltaX;
                }

                if (event['wheelDeltaY']) {
                    this.wheelDeltaY = event['wheelDeltaY'];
                } else {
                    this.wheelDeltaY = event.deltaY;
                }
            };
            return MouseCursor;
        })(Input.Pointer);
        Input.MouseCursor = MouseCursor;
    })(Kiwi.Input || (Kiwi.Input = {}));
    var Input = Kiwi.Input;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Input) {
        var Mouse = (function () {
            function Mouse(game) {
                this._domElement = null;
                this._game = game;
            }
            Mouse.prototype.objType = function () {
                return "Mouse";
            };

            Object.defineProperty(Mouse.prototype, "cursor", {
                get: function () {
                    return this._cursor;
                },
                enumerable: true,
                configurable: true
            });

            Mouse.prototype.boot = function () {
                this._domElement = this._game.stage.container;

                this._cursor = new Kiwi.Input.MouseCursor(this._game);
                this._cursor.active = true;
                this._cursor.id = 1;

                this.mouseDown = new Kiwi.Signal();
                this.mouseUp = new Kiwi.Signal();

                this.start();
            };

            Object.defineProperty(Mouse.prototype, "isDown", {
                get: function () {
                    return this._cursor.isDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Mouse.prototype, "isUp", {
                get: function () {
                    return this._cursor.isUp;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Mouse.prototype, "duration", {
                get: function () {
                    return this._cursor.duration;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Mouse.prototype, "x", {
                get: function () {
                    return this._cursor.x;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Mouse.prototype, "y", {
                get: function () {
                    return this._cursor.y;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Mouse.prototype, "wheelDeltaX", {
                get: function () {
                    return this._cursor.wheelDeltaX;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Mouse.prototype, "wheelDeltaY", {
                get: function () {
                    return this._cursor.wheelDeltaY;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Mouse.prototype, "ctrlKey", {
                get: function () {
                    return this._cursor.ctrlKey;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Mouse.prototype, "shiftKey", {
                get: function () {
                    return this._cursor.shiftKey;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Mouse.prototype, "altKey", {
                get: function () {
                    return this._cursor.altKey;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Mouse.prototype, "button", {
                get: function () {
                    return this._cursor.button;
                },
                enumerable: true,
                configurable: true
            });

            Mouse.prototype.update = function () {
                this._cursor.update();
            };

            Mouse.prototype.start = function () {
                var _this = this;
                if (this._game.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                    if (Kiwi.DEVICE.ie && Kiwi.DEVICE.ieVersion < 9) {
                        this._domElement.attachEvent('onmousedown', function (event) {
                            return _this.onMouseDown(event);
                        });
                        this._domElement.attachEvent('onmousemove', function (event) {
                            return _this.onMouseMove(event);
                        });
                        this._domElement.attachEvent('onmouseup', function (event) {
                            return _this.onMouseUp(event);
                        });
                        this._domElement.attachEvent('onmousewheel', function (event) {
                            return _this.onMouseWheel(event);
                        });
                    } else {
                        this._domElement.addEventListener('mousedown', function (event) {
                            return _this.onMouseDown(event);
                        }, true);
                        this._domElement.addEventListener('mousemove', function (event) {
                            return _this.onMouseMove(event);
                        }, true);
                        this._domElement.addEventListener('mouseup', function (event) {
                            return _this.onMouseUp(event);
                        }, true);
                        this._domElement.addEventListener('mousewheel', function (event) {
                            return _this.onMouseWheel(event);
                        }, true);
                        this._domElement.addEventListener('DOMMouseScroll', function (event) {
                            return _this.onMouseWheel(event);
                        }, true);
                    }
                }
            };

            Mouse.prototype.stop = function () {
                var _this = this;
                if (this._game.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                    this._domElement.removeEventListener('mousedown', function (event) {
                        return _this.onMouseDown(event);
                    }, false);
                    this._domElement.removeEventListener('mousedown', this.onMouseDown, false);
                    this._domElement.removeEventListener('mousemove', this.onMouseMove, false);
                    this._domElement.removeEventListener('mouseup', this.onMouseUp, false);
                    this._domElement.removeEventListener('mousewheel', this.onMouseWheel, false);
                    this._domElement.removeEventListener('DOMMouseScroll', this.onMouseWheel, false);
                }
            };

            Mouse.prototype.onMouseDown = function (event) {
                this._cursor.start(event);
                this.mouseDown.dispatch(this._cursor.x, this._cursor.y, this._cursor.timeDown, this._cursor.timeUp, this.duration, this._cursor);
            };

            Mouse.prototype.onMouseMove = function (event) {
                this._cursor.move(event);
            };

            Mouse.prototype.onMouseUp = function (event) {
                this._cursor.stop(event);
                this.mouseUp.dispatch(this._cursor.x, this._cursor.y, this._cursor.timeDown, this._cursor.timeUp, this.duration, this._cursor);
            };

            Mouse.prototype.onMouseWheel = function (event) {
                this._cursor.wheel(event);
            };

            Mouse.prototype.justPressed = function (duration) {
                if (typeof duration === "undefined") { duration = this._cursor.justPressedRate; }
                return this._cursor.justPressed(duration);
            };

            Mouse.prototype.justReleased = function (duration) {
                if (typeof duration === "undefined") { duration = this._cursor.justReleasedRate; }
                return this._cursor.justReleased(duration);
            };

            Mouse.prototype.reset = function () {
                this._cursor.reset();
            };
            Mouse.LEFT_BUTTON = 0;

            Mouse.MIDDLE_BUTTON = 1;

            Mouse.RIGHT_BUTTON = 2;
            return Mouse;
        })();
        Input.Mouse = Mouse;
    })(Kiwi.Input || (Kiwi.Input = {}));
    var Input = Kiwi.Input;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Input) {
        var Manager = (function () {
            function Manager(game) {
                this.game = game;
            }
            Manager.prototype.objType = function () {
                return "Manager";
            };

            Object.defineProperty(Manager.prototype, "pointers", {
                get: function () {
                    return this._pointers;
                },
                enumerable: true,
                configurable: true
            });

            Manager.prototype.boot = function () {
                if (Kiwi.DEVICE.touch === true) {
                    this.touch = new Kiwi.Input.Touch(this.game);
                    this.touch.boot();
                    this.touch.touchDown.add(this._onDownEvent, this);
                    this.touch.touchUp.add(this._onUpEvent, this);
                    this._pointers = this.touch.fingers;
                } else {
                    this.mouse = new Kiwi.Input.Mouse(this.game);
                    this.mouse.boot();
                    this.mouse.mouseDown.add(this._onDownEvent, this);
                    this.mouse.mouseUp.add(this._onUpEvent, this);
                    this._pointers = [this.mouse.cursor];
                    this.keyboard = new Kiwi.Input.Keyboard(this.game);
                    this.keyboard.boot();
                }

                this.isDown = false;
                this.position = new Kiwi.Geom.Point();

                this.onDown = new Kiwi.Signal();
                this.onUp = new Kiwi.Signal();
            };

            Manager.prototype._onDownEvent = function (x, y, timeDown, timeUp, duration, pointer) {
                this.onDown.dispatch(x, y, timeDown, timeUp, duration, pointer);
            };

            Manager.prototype._onUpEvent = function (x, y, timeDown, timeUp, duration, pointer) {
                this.onUp.dispatch(x, y, timeDown, timeUp, duration, pointer);
            };

            Object.defineProperty(Manager.prototype, "onPressed", {
                get: function () {
                    return this.onDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Manager.prototype, "onReleased", {
                get: function () {
                    return this.onUp;
                },
                enumerable: true,
                configurable: true
            });

            Manager.prototype.update = function () {
                if (Kiwi.DEVICE.touch === true) {
                    this.touch.update();
                    this.position.setTo(this.touch.x, this.touch.y);
                    this.isDown = this.touch.isDown;
                } else {
                    this.keyboard.update();
                    this.mouse.update();
                    this.position.setTo(this.mouse.x, this.mouse.y);
                    this.isDown = this.mouse.isDown;
                }
            };

            Manager.prototype.reset = function () {
                if (Kiwi.DEVICE.touch === true) {
                    this.touch.reset();
                } else {
                    this.mouse.reset();
                    this.keyboard.reset();
                }
            };

            Object.defineProperty(Manager.prototype, "x", {
                get: function () {
                    return this.position.x;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Manager.prototype, "y", {
                get: function () {
                    return this.position.y;
                },
                enumerable: true,
                configurable: true
            });
            return Manager;
        })();
        Input.Manager = Manager;
    })(Kiwi.Input || (Kiwi.Input = {}));
    var Input = Kiwi.Input;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Input) {
        var Finger = (function (_super) {
            __extends(Finger, _super);
            function Finger(game) {
                _super.call(this, game);
                this.circle.diameter = 44;
            }
            Finger.prototype.objType = function () {
                return 'Finger';
            };

            Finger.prototype.start = function (event) {
                this.id = event.identifier;
                this.active = true;
                _super.prototype.start.call(this, event);
            };

            Finger.prototype.stop = function (event) {
                this.active = false;
                _super.prototype.stop.call(this, event);
            };

            Finger.prototype.leave = function (event) {
                this.withinGame = false;
                this.move(event);
            };

            Finger.prototype.reset = function () {
                this.active = false;
                _super.prototype.reset.call(this);
            };
            return Finger;
        })(Input.Pointer);
        Input.Finger = Finger;
    })(Kiwi.Input || (Kiwi.Input = {}));
    var Input = Kiwi.Input;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Input) {
        var Touch = (function () {
            function Touch(game) {
                this._domElement = null;
                this.isDown = false;
                this.isUp = true;
                this._maxPointers = 10;
                this._game = game;
            }
            Object.defineProperty(Touch.prototype, "fingers", {
                get: function () {
                    return this._fingers;
                },
                enumerable: true,
                configurable: true
            });

            Touch.prototype.boot = function () {
                this._domElement = this._game.stage.container;

                this.finger1 = new Kiwi.Input.Finger(this._game);
                this.finger2 = new Kiwi.Input.Finger(this._game);
                this.finger3 = new Kiwi.Input.Finger(this._game);
                this.finger4 = new Kiwi.Input.Finger(this._game);
                this.finger5 = new Kiwi.Input.Finger(this._game);
                this.finger6 = new Kiwi.Input.Finger(this._game);
                this.finger7 = new Kiwi.Input.Finger(this._game);
                this.finger8 = new Kiwi.Input.Finger(this._game);
                this.finger9 = new Kiwi.Input.Finger(this._game);
                this.finger10 = new Kiwi.Input.Finger(this._game);

                this._fingers = [this.finger1, this.finger2, this.finger3, this.finger4, this.finger5, this.finger6, this.finger7, this.finger8, this.finger9, this.finger10];
                this.latestFinger = this.finger1;

                this.touchDown = new Kiwi.Signal();
                this.touchUp = new Kiwi.Signal();
                this.touchCancel = new Kiwi.Signal();

                this.start();
            };

            Touch.prototype.start = function () {
                var _this = this;
                if (this._game.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                    this._domElement.addEventListener('touchstart', function (event) {
                        return _this.onTouchStart(event);
                    }, false);
                    this._domElement.addEventListener('touchmove', function (event) {
                        return _this.onTouchMove(event);
                    }, false);
                    this._domElement.addEventListener('touchend', function (event) {
                        return _this.onTouchEnd(event);
                    }, false);
                    this._domElement.addEventListener('touchenter', function (event) {
                        return _this.onTouchEnter(event);
                    }, false);
                    this._domElement.addEventListener('touchleave', function (event) {
                        return _this.onTouchLeave(event);
                    }, false);
                    this._domElement.addEventListener('touchcancel', function (event) {
                        return _this.onTouchCancel(event);
                    }, false);

                    document.addEventListener('touchmove', function (event) {
                        return _this.consumeTouchMove(event);
                    }, false);
                }
            };

            Touch.prototype.consumeTouchMove = function (event) {
                event.preventDefault();
            };

            Object.defineProperty(Touch.prototype, "x", {
                get: function () {
                    return this.latestFinger.x;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Touch.prototype, "y", {
                get: function () {
                    return this.latestFinger.y;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Touch.prototype, "maximumPointers", {
                get: function () {
                    return this._maxPointers;
                },
                set: function (val) {
                    if (val < 0)
                        val = 1;
                    if (val > this._fingers.length)
                        val = this._fingers.length;

                    this._maxPointers = val;
                },
                enumerable: true,
                configurable: true
            });

            Touch.prototype.onTouchStart = function (event) {
                event.preventDefault();

                for (var i = 0; i < event.changedTouches.length; i++) {
                    for (var f = 0; f < this._maxPointers; f++) {
                        if (this._fingers[f].active === false) {
                            this._fingers[f].start(event.changedTouches[i]);
                            this.latestFinger = this._fingers[f];

                            this.touchDown.dispatch(this._fingers[f].x, this._fingers[f].y, this._fingers[f].timeDown, this._fingers[f].timeUp, this._fingers[f].duration, this._fingers[f]);

                            this.isDown = true;
                            this.isUp = false;
                            break;
                        }
                    }
                }
            };

            Touch.prototype.onTouchCancel = function (event) {
                for (var i = 0; i < event.changedTouches.length; i++) {
                    for (var f = 0; f < this._fingers.length; f++) {
                        if (this._fingers[f].id === event.changedTouches[i].identifier) {
                            this._fingers[f].stop(event.changedTouches[i]);
                            this.touchCancel.dispatch(this._fingers[f].x, this._fingers[f].y, this._fingers[f].timeDown, this._fingers[f].timeUp, this._fingers[f].duration, this._fingers[f]);
                            break;
                        }
                    }
                }
            };

            Touch.prototype.onTouchEnter = function (event) {
                for (var i = 0; i < event.changedTouches.length; i++) {
                    for (var f = 0; f < this._maxPointers; f++) {
                        if (this._fingers[f].active === false) {
                            this._fingers[f].start(event.changedTouches[i]);
                            break;
                        }
                    }
                }
            };

            Touch.prototype.onTouchLeave = function (event) {
                for (var i = 0; i < event.changedTouches.length; i++) {
                    for (var f = 0; f < this._fingers.length; f++) {
                        if (this._fingers[f].id === event.changedTouches[i].identifier) {
                            this._fingers[f].leave(event.changedTouches[i]);
                            break;
                        }
                    }
                }
            };

            Touch.prototype.onTouchMove = function (event) {
                for (var i = 0; i < event.changedTouches.length; i++) {
                    for (var f = 0; f < this._fingers.length; f++) {
                        if (this._fingers[f].id === event.changedTouches[i].identifier) {
                            this._fingers[f].move(event.changedTouches[i]);
                            this.latestFinger = this._fingers[f];
                            break;
                        }
                    }
                }
            };

            Touch.prototype.onTouchEnd = function (event) {
                for (var i = 0; i < event.changedTouches.length; i++) {
                    for (var f = 0; f < this._fingers.length; f++) {
                        if (this._fingers[f].id === event.changedTouches[i].identifier) {
                            this._fingers[f].stop(event.changedTouches[i]);
                            this.latestFinger = this._fingers[f];

                            this.touchUp.dispatch(this._fingers[f].x, this._fingers[f].y, this._fingers[f].timeDown, this._fingers[f].timeUp, this._fingers[f].duration, this._fingers[f]);

                            this.isDown = false;
                            this.isUp = true;
                            break;
                        }
                    }
                }

                for (var i = 0; i < this._fingers.length; i++) {
                    if (this._fingers[i].active) {
                        this.isDown = true;
                        this.isUp = false;
                    }
                }
            };

            Touch.prototype.update = function () {
                if (this.isDown) {
                    for (var i = 0; i < this._fingers.length; i++) {
                        if (this._fingers[i].active) {
                            this._fingers[i].update();
                        }
                    }
                }
            };

            Touch.prototype.stop = function () {
                var _this = this;
                this._domElement.removeEventListener('touchstart', function (event) {
                    return _this.onTouchStart(event);
                }, false);
                this._domElement.removeEventListener('touchmove', function (event) {
                    return _this.onTouchMove(event);
                }, false);
                this._domElement.removeEventListener('touchend', function (event) {
                    return _this.onTouchEnd(event);
                }, false);
                this._domElement.removeEventListener('touchenter', function (event) {
                    return _this.onTouchEnter(event);
                }, false);
                this._domElement.removeEventListener('touchleave', function (event) {
                    return _this.onTouchLeave(event);
                }, false);
                this._domElement.removeEventListener('touchcancel', function (event) {
                    return _this.onTouchCancel(event);
                }, false);
            };

            Touch.prototype.reset = function () {
                for (var i = 0; i < this._fingers.length; i++) {
                    this._fingers[i].reset();
                }
            };
            return Touch;
        })();
        Input.Touch = Touch;
    })(Kiwi.Input || (Kiwi.Input = {}));
    var Input = Kiwi.Input;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Plugins) {
        (function (Gamefroot) {
            var TileMapConverter = (function () {
                function TileMapConverter(jsonData, imageData) {
                    this._gfData = JSON.parse(jsonData);
                    this._gfImg = imageData;
                    this.kiwiData = {
                        "version": 1,
                        "height": 0,
                        "width": 0,
                        "tileheight": TileMapConverter.GF_TILE_WIDTH,
                        "tilewidth": TileMapConverter.GF_TILE_HEIGHT,
                        "orientation": "orthogonal",
                        "layers": [],
                        "tilesets": [],
                        "properties": {}
                    };
                }
                TileMapConverter.prototype.convert = function () {
                    this._convertWidthHeight();
                    this._convertTilesets();
                    this._convertLayers();
                };

                TileMapConverter.prototype._convertWidthHeight = function () {
                    var terrain = this._gfData.map.terrain;

                    for (var i = 0; i < terrain.length; i++) {
                        if (parseInt(terrain[i].xpos) > this.kiwiData.width)
                            this.kiwiData.width = parseInt(terrain[i].xpos) + 1;
                        if (parseInt(terrain[i].ypos) > this.kiwiData.height)
                            this.kiwiData.height = parseInt(terrain[i].ypos) + 1;
                    }
                };

                TileMapConverter.prototype._convertTilesets = function () {
                    var tileset = {
                        "firstgid": 1,
                        "image": "",
                        "imageheight": 0,
                        "imagewidth": 0,
                        "margin": 0,
                        "name": "",
                        "properties": {},
                        "spacing": 0,
                        "tileheight": 48,
                        "tilewidth": 48
                    };
                    tileset.image = this._gfImg.src;
                    tileset.imagewidth = this._gfImg.width;
                    tileset.imageheight = this._gfImg.height;
                    tileset.name = "gf_tileset";
                    this.kiwiData.tilesets.push(tileset);
                };

                TileMapConverter.prototype._convertLayers = function () {
                    this.kiwiData.layers.push(this._convertLayer(1));
                };
                TileMapConverter.prototype._convertLayer = function (layerNumber) {
                    var layer = {
                        "name": "gf_layer_" + layerNumber,
                        "data": [],
                        "height": this.kiwiData.height,
                        "width": this.kiwiData.width,
                        "opacity": 1,
                        "type": "tilelayer",
                        "visible": true,
                        "x": 0,
                        "y": 0
                    };

                    var totalTiles = layer.width * layer.height;
                    for (var i = 0; i < totalTiles; i++) {
                        layer.data.push(0);
                    }
                    var tilesPerRow = this.kiwiData.tilesets[0].imagewidth / TileMapConverter.GF_TILE_WIDTH;
                    var tilesPerColumn = this.kiwiData.tilesets[0].imageheight / TileMapConverter.GF_TILE_HEIGHT;

                    var terrain = this._gfData.map.terrain;

                    var count = 0;
                    for (var i = 0; i < terrain.length; i++) {
                        if (terrain[i].zpos === String(layerNumber)) {
                            count++;

                            var x = terrain[i].xpos;
                            var y = terrain[i].ypos;

                            var dataIndex = y * this.kiwiData.width + x;

                            var gfpos = this._getSpritePosition(terrain[i].animation_id);

                            layer.data[dataIndex] = gfpos + 1;
                        }
                    }
                    return layer;
                };

                TileMapConverter.prototype._getSpritePosition = function (id) {
                    var sprites = this._gfData.sprites.animations;
                    var result = -1;
                    for (var i = 0; i < sprites.length; i++) {
                        if (sprites[i].id === String(id)) {
                            return sprites[i].sprite_id;
                        }
                    }

                    return result;
                };
                TileMapConverter.GF_TILE_WIDTH = 48;
                TileMapConverter.GF_TILE_HEIGHT = 48;
                return TileMapConverter;
            })();
            Gamefroot.TileMapConverter = TileMapConverter;
        })(Plugins.Gamefroot || (Plugins.Gamefroot = {}));
        var Gamefroot = Plugins.Gamefroot;
    })(Kiwi.Plugins || (Kiwi.Plugins = {}));
    var Plugins = Kiwi.Plugins;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Renderers) {
        var CanvasRenderer = (function () {
            function CanvasRenderer(game) {
                this._game = game;
            }
            CanvasRenderer.prototype.boot = function () {
            };

            CanvasRenderer.prototype.objType = function () {
                return "CanvasRenderer";
            };

            CanvasRenderer.prototype._recurse = function (child) {
                if (!child.willRender)
                    return;

                if (child.childType() === Kiwi.GROUP) {
                    for (var i = 0; i < (child).members.length; i++) {
                        this._recurse((child).members[i]);
                    }
                } else {
                    child.render(this._currentCamera);
                }
            };

            CanvasRenderer.prototype.render = function (camera) {
                this._currentCamera = camera;
                var root = this._game.states.current.members;

                this._game.stage.ctx.fillStyle = this._game.stage.color;

                this._game.stage.ctx.fillRect(0, 0, this._game.stage.canvas.width, this._game.stage.canvas.height);

                for (var i = 0; i < root.length; i++) {
                    this._recurse(root[i]);
                }
            };
            return CanvasRenderer;
        })();
        Renderers.CanvasRenderer = CanvasRenderer;
    })(Kiwi.Renderers || (Kiwi.Renderers = {}));
    var Renderers = Kiwi.Renderers;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Renderers) {
        var GLRenderer = (function () {
            function GLRenderer(game) {
                this._entityCount = 0;
                this._maxItems = 1000;
                this._texApplied = false;
                this._firstPass = true;
                this._currentTextureAtlas = null;
                this._game = game;
            }
            GLRenderer.prototype.boot = function () {
                this._initState();
            };

            GLRenderer.prototype.objType = function () {
                return "GLRenderer";
            };

            GLRenderer.prototype._initState = function () {
                var gl = this._game.stage.gl;
                this._stageResolution = new Float32Array([this._game.stage.width, this._game.stage.height]);

                this._shaders = new Renderers.GLShaders(gl);
                gl.enable(gl.BLEND);
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

                this.mvMatrix = mat4.create();
                mat2d.identity(this.mvMatrix);

                this._vertBuffer = new Renderers.GLArrayBuffer(gl, 2);
                this._uvBuffer = new Renderers.GLArrayBuffer(gl, 2, Renderers.GLArrayBuffer.squareUVs);

                this._indexBuffer = new Renderers.GLElementArrayBuffer(gl, 1, this._generateIndices(this._maxItems));
                this._colorBuffer = new Renderers.GLArrayBuffer(gl, 1, this._generateColors(this._maxItems));

                this._shaders.use(gl, this._shaders.shaderProgram);

                var prog = this._shaders.texture2DProg;

                gl.bindBuffer(gl.ARRAY_BUFFER, this._vertBuffer.buffer);
                gl.vertexAttribPointer(prog.vertexPositionAttribute, this._vertBuffer.itemSize, gl.FLOAT, false, 0, 0);

                gl.bindBuffer(gl.ARRAY_BUFFER, this._uvBuffer.buffer);
                gl.vertexAttribPointer(prog.vertexTexCoordAttribute, this._uvBuffer.itemSize, gl.FLOAT, false, 0, 0);

                gl.bindBuffer(gl.ARRAY_BUFFER, this._colorBuffer.buffer);
                gl.vertexAttribPointer(prog.vertexColorAttribute, this._colorBuffer.itemSize, gl.FLOAT, false, 0, 0);

                gl.uniform1i(prog.samplerUniform, 0);

                gl.uniform2fv(prog.resolutionUniform, this._stageResolution);
            };

            GLRenderer.prototype.render = function (camera) {
                this._currentCamera = camera;
                var root = this._game.states.current.members;
                var gl = this._game.stage.gl;

                this._entityCount = 0;
                this._vertBuffer.clear();
                this._uvBuffer.clear();

                gl.clearColor(0, 0, 0, 0);
                gl.clear(gl.COLOR_BUFFER_BIT);

                var prog = this._shaders.texture2DProg;

                var cm = camera.transform.getConcatenatedMatrix();
                var ct = camera.transform;
                this.mvMatrix = new Float32Array([
                    cm.a,
                    cm.b,
                    0,
                    0,
                    cm.c,
                    cm.d,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0,
                    cm.tx + ct.rotPointX,
                    cm.ty + ct.rotPointY,
                    0,
                    1
                ]);

                gl.uniformMatrix4fv(prog.mvMatrixUniform, false, this.mvMatrix);
                gl.uniform2fv(prog.cameraOffsetUniform, new Float32Array([ct.rotPointX, ct.rotPointY]));

                for (var i = 0; i < root.length; i++) {
                    this._recurse(gl, root[i], camera);
                }

                this._flush(gl);

                this._firstPass = false;
            };

            GLRenderer.prototype._recurse = function (gl, child, camera) {
                if (!child.willRender)
                    return;

                if (child.childType() === Kiwi.GROUP) {
                    for (var i = 0; i < (child).members.length; i++) {
                        this._recurse(gl, (child).members[i], camera);
                    }
                } else {
                    if (!this._texApplied) {
                        this._applyTexture(gl, (child).atlas.image);
                        this._texApplied = true;
                        this._currentTextureAtlas = (child).atlas;
                    }

                    if ((child).atlas !== this._currentTextureAtlas) {
                        this._flush(gl);
                        this._entityCount = 0;
                        this._vertBuffer.clear();
                        this._uvBuffer.clear();
                        this._changeTexture(gl, (child).atlas.image);
                        this._currentTextureAtlas = (child).atlas;
                    }
                    this._compileVertices(gl, child, camera);
                    this._compileUVs(gl, child);
                    this._entityCount++;
                }
            };

            GLRenderer.prototype._flush = function (gl) {
                this._vertBuffer.refresh(gl, this._vertBuffer.items);
                this._uvBuffer.refresh(gl, this._uvBuffer.items);
                this._draw(gl);
            };

            GLRenderer.prototype._compileVertices = function (gl, entity, camera) {
                var t = entity.transform;
                var m = t.getConcatenatedMatrix();
                var ct = camera.transform;
                var cm = ct.getConcatenatedMatrix();

                var cell = entity.atlas.cells[entity.cellIndex];

                var pt1 = new Kiwi.Geom.Point(0 - t.rotPointX, 0 - t.rotPointY);
                var pt2 = new Kiwi.Geom.Point(cell.w - t.rotPointX, 0 - t.rotPointY);
                var pt3 = new Kiwi.Geom.Point(cell.w - t.rotPointX, cell.h - t.rotPointY);
                var pt4 = new Kiwi.Geom.Point(0 - t.rotPointX, cell.h - t.rotPointY);

                pt1 = m.transformPoint(pt1);
                pt2 = m.transformPoint(pt2);
                pt3 = m.transformPoint(pt3);
                pt4 = m.transformPoint(pt4);

                this._vertBuffer.items.push(pt1.x + t.rotPointX, pt1.y + t.rotPointY, pt2.x + t.rotPointX, pt2.y + t.rotPointY, pt3.x + t.rotPointX, pt3.y + t.rotPointY, pt4.x + t.rotPointX, pt4.y + t.rotPointY);
            };

            GLRenderer.prototype._compileUVs = function (gl, entity) {
                var t = entity.transform;
                var c = entity.atlas.cells[entity.cellIndex];

                this._uvBuffer.items.push(c.x, c.y, c.x + c.w, c.y, c.x + c.w, c.y + c.h, c.x, c.y + c.h);
            };

            GLRenderer.prototype._applyTexture = function (gl, image) {
                this._texture = new Renderers.GLTexture(gl, image);
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, this._texture.texture);
                var prog = this._shaders.texture2DProg;
                gl.uniform2fv(prog.textureSizeUniform, new Float32Array([this._texture.image.width, this._texture.image.height]));
            };

            GLRenderer.prototype._changeTexture = function (gl, image) {
                this._texture.refresh(gl, image);
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, this._texture.texture);
                var prog = this._shaders.texture2DProg;
                gl.uniform2fv(prog.textureSizeUniform, new Float32Array([this._texture.image.width, this._texture.image.height]));
            };

            GLRenderer.prototype._draw = function (gl) {
                gl.drawElements(gl.TRIANGLES, this._entityCount * 6, gl.UNSIGNED_SHORT, 0);
            };

            GLRenderer.prototype._generateIndices = function (numQuads) {
                var quads = new Array();
                for (var i = 0; i < numQuads; i++) {
                    quads.push(i * 4 + 0, i * 4 + 1, i * 4 + 2, i * 4 + 0, i * 4 + 2, i * 4 + 3);
                }
                return quads;
            };

            GLRenderer.prototype._generateColors = function (numVerts) {
                var cols = new Array();
                for (var i = 0; i < numVerts; i++) {
                    cols.push(1);
                }
                return cols;
            };
            return GLRenderer;
        })();
        Renderers.GLRenderer = GLRenderer;
    })(Kiwi.Renderers || (Kiwi.Renderers = {}));
    var Renderers = Kiwi.Renderers;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Renderers) {
        var GLShaders = (function () {
            function GLShaders(gl) {
                this.ready = false;
                this.texture2DProg = {
                    vertexPositionAttribute: null,
                    vertexTexCoordAttribute: null,
                    vertexColorAttribute: null,
                    mvMatrixUniform: null,
                    samplerUniform: null,
                    resolutionUniform: null,
                    textureSizeUniform: null,
                    cameraOffsetUniform: null
                };
                this.texture2DFrag = [
                    "precision mediump float;",
                    "varying vec2 vTextureCoord;",
                    "varying float vColor;",
                    "uniform sampler2D uSampler;",
                    "void main(void) {",
                    "gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));",
                    "gl_FragColor = gl_FragColor * vColor;",
                    "}"
                ];
                this.texture2DVert = [
                    "attribute vec2 aVertexPosition;",
                    "attribute vec2 aTextureCoord;",
                    "attribute float aColor;",
                    "uniform mat4 uMVMatrix;",
                    "uniform vec2 uResolution;",
                    "uniform vec2 uTextureSize;",
                    "uniform vec2 uCameraOffset;",
                    "varying vec2 vTextureCoord;",
                    "varying float vColor;",
                    "void main(void) {",
                    "vec4 transpos = vec4(aVertexPosition - uCameraOffset,0,1); ",
                    "transpos =  uMVMatrix * transpos;",
                    "vec2 zeroToOne = transpos.xy / uResolution;",
                    "vec2 zeroToTwo = zeroToOne * 2.0;",
                    "vec2 clipSpace = zeroToTwo - 1.0;",
                    "gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);",
                    "vTextureCoord = aTextureCoord / uTextureSize;",
                    "vColor = aColor;",
                    "}"
                ];
                this.vertShader = this.compile(gl, this.texture2DVert.join("\n"), gl.VERTEX_SHADER);
                this.fragShader = this.compile(gl, this.texture2DFrag.join("\n"), gl.FRAGMENT_SHADER);
                this.shaderProgram = this.attach(gl, this.vertShader, this.fragShader);
                this.use(gl, this.shaderProgram);
                this.ready = true;
            }
            GLShaders.prototype.attach = function (gl, vertShader, fragShader) {
                var shaderProgram = gl.createProgram();
                gl.attachShader(shaderProgram, fragShader);
                gl.attachShader(shaderProgram, vertShader);
                gl.linkProgram(shaderProgram);
                return shaderProgram;
            };

            GLShaders.prototype.compile = function (gl, src, shaderType) {
                var shader = gl.createShader(shaderType);
                gl.shaderSource(shader, src);
                gl.compileShader(shader);

                if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                    return null;
                }
                return shader;
            };

            GLShaders.prototype.use = function (gl, shaderProgram) {
                gl.useProgram(this.shaderProgram);

                this.texture2DProg.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
                gl.enableVertexAttribArray(this.texture2DProg.vertexPositionAttribute);
                this.texture2DProg.vertexTexCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
                gl.enableVertexAttribArray(this.texture2DProg.vertexTexCoordAttribute);
                this.texture2DProg.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aColor");
                gl.enableVertexAttribArray(this.texture2DProg.vertexColorAttribute);

                this.texture2DProg.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
                this.texture2DProg.resolutionUniform = gl.getUniformLocation(shaderProgram, "uResolution");
                this.texture2DProg.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
                this.texture2DProg.textureSizeUniform = gl.getUniformLocation(shaderProgram, "uTextureSize");
                this.texture2DProg.cameraOffsetUniform = gl.getUniformLocation(shaderProgram, "uCameraOffset");
            };
            return GLShaders;
        })();
        Renderers.GLShaders = GLShaders;
    })(Kiwi.Renderers || (Kiwi.Renderers = {}));
    var Renderers = Kiwi.Renderers;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Renderers) {
        var GLTexture = (function () {
            function GLTexture(gl, _image) {
                this.texture = gl.createTexture();

                this.image = _image;
                gl.bindTexture(gl.TEXTURE_2D, this.texture);
                gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                gl.bindTexture(gl.TEXTURE_2D, null);
            }
            GLTexture.prototype.refresh = function (gl, _image) {
                this.image = _image;
                gl.bindTexture(gl.TEXTURE_2D, this.texture);
                gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                gl.bindTexture(gl.TEXTURE_2D, null);
            };
            return GLTexture;
        })();
        Renderers.GLTexture = GLTexture;
    })(Kiwi.Renderers || (Kiwi.Renderers = {}));
    var Renderers = Kiwi.Renderers;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Renderers) {
        var GLArrayBuffer = (function () {
            function GLArrayBuffer(gl, _itemSize, items, init) {
                if (typeof init === "undefined") { init = true; }
                this.items = items || GLArrayBuffer.squareVertices;
                this.itemSize = _itemSize || 2;
                this.numItems = this.items.length / this.itemSize;
                if (init) {
                    this.buffer = this.init(gl);
                }
            }
            GLArrayBuffer.prototype.clear = function () {
                this.items = new Array();
            };

            GLArrayBuffer.prototype.init = function (gl) {
                var buffer = gl.createBuffer();
                var f32 = new Float32Array(this.items);
                gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
                gl.bufferData(gl.ARRAY_BUFFER, f32, gl.DYNAMIC_DRAW);

                return buffer;
            };

            GLArrayBuffer.prototype.refresh = function (gl, items) {
                this.items = items;
                this.numItems = this.items.length / this.itemSize;
                var f32 = new Float32Array(this.items);

                gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
                gl.bufferData(gl.ARRAY_BUFFER, f32, gl.DYNAMIC_DRAW);
                return this.buffer;
            };

            GLArrayBuffer.squareVertices = [
                0,
                0,
                100,
                0,
                100,
                100,
                0,
                100
            ];

            GLArrayBuffer.squareUVs = [
                0,
                0,
                .1,
                0,
                .1,
                .1,
                0,
                .1
            ];

            GLArrayBuffer.squareCols = [
                1,
                1,
                1,
                1
            ];
            return GLArrayBuffer;
        })();
        Renderers.GLArrayBuffer = GLArrayBuffer;
    })(Kiwi.Renderers || (Kiwi.Renderers = {}));
    var Renderers = Kiwi.Renderers;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Renderers) {
        var GLElementArrayBuffer = (function () {
            function GLElementArrayBuffer(gl, _itemSize, _indices, init) {
                if (typeof init === "undefined") { init = true; }
                this.indices = _indices || GLElementArrayBuffer.square;
                this.itemSize = _itemSize || 1;
                this.numItems = this.indices.length / this.itemSize;
                if (init) {
                    this.buffer = this.init(gl);
                }
            }
            GLElementArrayBuffer.prototype.clear = function () {
                this.indices = new Array();
            };

            GLElementArrayBuffer.prototype.init = function (gl) {
                var buffer = gl.createBuffer();
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

                return buffer;
            };

            GLElementArrayBuffer.prototype.refresh = function (gl, indices) {
                this.numItems = this.indices.length / this.itemSize;
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

                return this.buffer;
            };

            GLElementArrayBuffer.square = [
                0,
                1,
                2,
                0,
                2,
                3
            ];
            return GLElementArrayBuffer;
        })();
        Renderers.GLElementArrayBuffer = GLElementArrayBuffer;
    })(Kiwi.Renderers || (Kiwi.Renderers = {}));
    var Renderers = Kiwi.Renderers;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (System) {
        var Bootstrap = (function () {
            function Bootstrap() {
                this.isReady = false;
                this.container = null;
                this.input = null;
            }
            Bootstrap.prototype.objType = function () {
                return "Bootstrap";
            };

            Bootstrap.prototype.boot = function (domParent, callback, createContainer) {
                if (typeof callback === "undefined") { callback = null; }
                if (typeof createContainer === "undefined") { createContainer = true; }
                var _this = this;
                this._callback = callback;
                this._domParent = domParent;

                this._createContainer = createContainer;

                if (document.readyState === 'complete' || document.readyState === 'interactive') {
                    this.ready();
                } else {
                    document.addEventListener('DOMContentLoaded', function () {
                        return _this.ready();
                    }, false);
                    window.addEventListener('load', function () {
                        return _this.ready();
                    }, false);
                }
            };

            Bootstrap.prototype.ready = function () {
                var _this = this;
                if (this.isReady === true) {
                    return;
                }

                if (!document.body) {
                    window.setTimeout(function () {
                        return _this.ready();
                    }, 13);
                } else {
                    this.isReady = true;

                    if (this._createContainer === true) {
                        if (this._domParent === '') {
                            this.container = document.createElement('div');
                            this._setupContainer('KiwiGame' + Date.now().toString());
                            document.body.appendChild(this.container);
                        } else {
                            if (document.getElementById(this._domParent)) {
                                this.container = document.getElementById(this._domParent);
                                this._setupContainer();
                            } else {
                                this.container = document.createElement('div');
                                this._setupContainer(this._domParent);
                                document.body.appendChild(this.container);
                            }
                        }
                    }

                    if (this._callback !== null) {
                        this._callback();
                    }
                }
            };

            Bootstrap.prototype._setupContainer = function (id) {
                if (typeof id === "undefined") { id = ''; }
                if (id) {
                    this.container.id = id;
                }

                this.container.style.width = '800px';
                this.container.style.height = '600px';
                this.container.style.position = 'relative';
                this.container.style.overflow = 'hidden';
            };
            return Bootstrap;
        })();
        System.Bootstrap = Bootstrap;
    })(Kiwi.System || (Kiwi.System = {}));
    var System = Kiwi.System;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (System) {
        var Browser = (function () {
            function Browser(game) {
                this._game = game;
            }
            Browser.prototype.objType = function () {
                return "Browser";
            };

            Browser.prototype.boot = function () {
            };

            Browser.prototype.getOffsetPoint = function (element, output) {
                if (typeof output === "undefined") { output = new Kiwi.Geom.Point(); }
                var box = element.getBoundingClientRect();

                var clientTop = element.clientTop || document.body.clientTop || 0;
                var clientLeft = element.clientLeft || document.body.clientLeft || 0;
                var scrollTop = window.pageYOffset || element.scrollTop || document.body.scrollTop;
                var scrollLeft = window.pageXOffset || element.scrollLeft || document.body.scrollLeft;

                return output.setTo(box.left + scrollLeft - clientLeft, box.top + scrollTop - clientTop);
            };
            return Browser;
        })();
        System.Browser = Browser;
    })(Kiwi.System || (Kiwi.System = {}));
    var System = Kiwi.System;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (System) {
        var Device = (function () {
            function Device() {
                this.iOS = false;
                this.android = false;
                this.chromeOS = false;
                this.linux = false;
                this.macOS = false;
                this.windows = false;
                this.canvas = false;
                this.file = false;
                this.fileSystem = false;
                this.localStorage = false;
                this.webGL = false;
                this.worker = false;
                this.blob = false;
                this.touch = false;
                this.css3D = false;
                this.arora = false;
                this.chrome = false;
                this.epiphany = false;
                this.firefox = false;
                this.ie = false;
                this.ieVersion = 0;
                this.mobileSafari = false;
                this.midori = false;
                this.opera = false;
                this.safari = false;
                this.webApp = false;
                this.audioData = false;
                this.webaudio = false;
                this.ogg = false;
                this.mp3 = false;
                this.wav = false;
                this.m4a = false;
                this.iPhone = false;
                this.iPhone4 = false;
                this.iPad = false;
                this.pixelRatio = 0;
                this._checkAudio();
                this._checkBrowser();
                this._checkCSS3D();
                this._checkDevice();
                this._checkFeatures();
                this._checkOS();
            }
            Device.prototype.objType = function () {
                return "Device";
            };

            Device.prototype._checkOS = function () {
                var ua = navigator.userAgent;

                if (/Android/.test(ua)) {
                    this.android = true;
                } else if (/CrOS/.test(ua)) {
                    this.chromeOS = true;
                } else if (/iP[ao]d|iPhone/i.test(ua)) {
                    this.iOS = true;
                } else if (/Linux/.test(ua)) {
                    this.linux = true;
                } else if (/Mac OS/.test(ua)) {
                    this.macOS = true;
                } else if (/Windows/.test(ua)) {
                    this.windows = true;
                }
            };

            Device.prototype._checkFeatures = function () {
                if (typeof window['Blob'] !== 'undefined')
                    this.blob = true;

                this.canvas = !!window['CanvasRenderingContext2D'];

                try  {
                    this.localStorage = !!localStorage.getItem;
                } catch (error) {
                    this.localStorage = false;
                }

                this.file = !!window['File'] && !!window['FileReader'] && !!window['FileList'] && !!window['Blob'];
                this.fileSystem = !!window['requestFileSystem'];
                this.webGL = !!window['WebGLRenderingContext'];
                this.worker = !!window['Worker'];

                if ('ontouchstart' in document.documentElement || window.navigator.msPointerEnabled) {
                    this.touch = true;
                }
            };

            Device.prototype._checkBrowser = function () {
                var ua = navigator.userAgent;

                if (/Arora/.test(ua)) {
                    this.arora = true;
                } else if (/Chrome/.test(ua)) {
                    this.chrome = true;
                } else if (/Epiphany/.test(ua)) {
                    this.epiphany = true;
                } else if (/Firefox/.test(ua)) {
                    this.firefox = true;
                } else if (/Mobile Safari/.test(ua)) {
                    this.mobileSafari = true;
                } else if (/MSIE (\d+\.\d+);/.test(ua)) {
                    this.ie = true;
                    this.ieVersion = parseInt(RegExp.$1);
                } else if (/Midori/.test(ua)) {
                    this.midori = true;
                } else if (/Opera/.test(ua)) {
                    this.opera = true;
                } else if (/Safari/.test(ua)) {
                    this.safari = true;
                }

                if (navigator['standalone']) {
                    this.webApp = true;
                }
            };

            Device.prototype._checkAudio = function () {
                this.audioData = !!(window['Audio']);
                this.webaudio = !!(window['webkitAudioContext'] || window['AudioContext']);

                var audioElement = document.createElement('audio');
                var result = false;

                try  {
                    if (result = !!audioElement.canPlayType) {
                        if (audioElement.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, '')) {
                            this.ogg = true;
                        }

                        if (audioElement.canPlayType('audio/mpeg;').replace(/^no$/, '')) {
                            this.mp3 = true;
                        }

                        if (audioElement.canPlayType('audio/wav; codecs="1"').replace(/^no$/, '')) {
                            this.wav = true;
                        }

                        if (audioElement.canPlayType('audio/x-m4a;') || audioElement.canPlayType('audio/aac;').replace(/^no$/, '')) {
                            this.m4a = true;
                        }
                    }
                } catch (e) {
                }
            };

            Device.prototype._checkDevice = function () {
                this.pixelRatio = window['devicePixelRatio'] || 1;
                this.iPhone = navigator.userAgent.toLowerCase().indexOf('iphone') != -1;
                this.iPhone4 = (this.pixelRatio == 2 && this.iPhone);
                this.iPad = navigator.userAgent.toLowerCase().indexOf('ipad') != -1;
            };

            Device.prototype._checkCSS3D = function () {
                var el = document.createElement('p');
                var has3d;
                var transforms = {
                    'webkitTransform': '-webkit-transform',
                    'OTransform': '-o-transform',
                    'msTransform': '-ms-transform',
                    'MozTransform': '-moz-transform',
                    'transform': 'transform'
                };

                document.body.insertBefore(el, null);

                for (var t in transforms) {
                    if (el.style[t] !== undefined) {
                        el.style[t] = "translate3d(1px,1px,1px)";
                        has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
                    }
                }

                document.body.removeChild(el);

                this.css3D = (has3d !== undefined && has3d.length > 0 && has3d !== "none");
            };

            Device.prototype.getAll = function () {
                var output = '';

                output = output.concat('Device\n');
                output = output.concat('iPhone : ' + this.iPhone + '\n');
                output = output.concat('iPhone4 : ' + this.iPhone4 + '\n');
                output = output.concat('iPad : ' + this.iPad + '\n');

                output = output.concat('\n');
                output = output.concat('Operating System\n');
                output = output.concat('iOS: ' + this.iOS + '\n');
                output = output.concat('Android: ' + this.android + '\n');
                output = output.concat('ChromeOS: ' + this.chromeOS + '\n');
                output = output.concat('Linux: ' + this.linux + '\n');
                output = output.concat('MacOS: ' + this.macOS + '\n');
                output = output.concat('Windows: ' + this.windows + '\n');

                output = output.concat('\n');
                output = output.concat('Browser\n');
                output = output.concat('Arora: ' + this.arora + '\n');
                output = output.concat('Chrome: ' + this.chrome + '\n');
                output = output.concat('Epiphany: ' + this.epiphany + '\n');
                output = output.concat('Firefox: ' + this.firefox + '\n');
                output = output.concat('Internet Explorer: ' + this.ie + ' (' + this.ieVersion + ')\n');
                output = output.concat('Mobile Safari: ' + this.mobileSafari + '\n');
                output = output.concat('Midori: ' + this.midori + '\n');
                output = output.concat('Opera: ' + this.opera + '\n');
                output = output.concat('Safari: ' + this.safari + '\n');

                output = output.concat('\n');
                output = output.concat('Features\n');
                output = output.concat('Blob: ' + this.blob + '\n');
                output = output.concat('Canvas: ' + this.canvas + '\n');
                output = output.concat('File: ' + this.file + '\n');
                output = output.concat('FileSystem: ' + this.fileSystem + '\n');
                output = output.concat('LocalStorage: ' + this.localStorage + '\n');
                output = output.concat('WebGL: ' + this.webGL + '\n');
                output = output.concat('Worker: ' + this.worker + '\n');
                output = output.concat('Touch: ' + this.touch + '\n');
                output = output.concat('CSS 3D: ' + this.css3D + '\n');

                output = output.concat('\n');
                output = output.concat('Audio\n');
                output = output.concat('Audio Data: ' + this.canvas + '\n');
                output = output.concat('Web Audio: ' + this.canvas + '\n');
                output = output.concat('Can play OGG: ' + this.canvas + '\n');
                output = output.concat('Can play MP3: ' + this.canvas + '\n');
                output = output.concat('Can play M4A: ' + this.canvas + '\n');
                output = output.concat('Can play WAV: ' + this.canvas + '\n');

                return output;
            };
            return Device;
        })();
        System.Device = Device;
    })(Kiwi.System || (Kiwi.System = {}));
    var System = Kiwi.System;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Textures) {
        var TextureAtlas = (function () {
            function TextureAtlas(name, type, cells, image, sequences) {
                this.cellIndex = 0;
                this.name = name;
                this.cells = cells || new Array();
                this.sequences = sequences || new Array();
                this.image = image;
                this._type = type;
            }
            TextureAtlas.prototype.objType = function () {
                return "TextureAtlas";
            };

            Object.defineProperty(TextureAtlas.prototype, "type", {
                get: function () {
                    return this._type;
                },
                enumerable: true,
                configurable: true
            });

            TextureAtlas.prototype.readJSON = function (atlasJSON) {
                var obj = JSON.parse(atlasJSON);
                this.name = obj.name;

                for (var i = 0; i < obj.cells.length; i++) {
                    this.cells.push(obj.cells[i]);

                    if (obj.cells[i].hitboxes === undefined) {
                        this.cells[i].hitboxes = new Array();
                        this.cells[i].hitboxes.push({ x: 0, y: 0, w: this.cells[i].w, h: this.cells[i].h });
                    }
                }

                if (obj.sequences) {
                    for (var i = 0; i < obj.sequences.length; i++) {
                        var seq = new Kiwi.Animation.Sequence(obj.sequences[i].name, obj.sequences[i].cells);

                        if (obj.sequences[i].speed !== undefined)
                            seq.speed = obj.sequences[i].speed;
                        if (obj.sequences[i].loop !== undefined)
                            seq.loop = obj.sequences[i].loop;

                        this.sequences.push(seq);
                    }
                }
            };
            TextureAtlas.SINGLE_IMAGE = 0;

            TextureAtlas.SPRITE_SHEET = 1;

            TextureAtlas.TEXTURE_ATLAS = 2;
            return TextureAtlas;
        })();
        Textures.TextureAtlas = TextureAtlas;
    })(Kiwi.Textures || (Kiwi.Textures = {}));
    var Textures = Kiwi.Textures;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Textures) {
        var TextureLibrary = (function () {
            function TextureLibrary(game) {
                this._base2Sizes = [2, 4, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096];
                this._game = game;
                this.textures = new Object();
            }
            TextureLibrary.prototype.objType = function () {
                return "TextureLibrary";
            };

            TextureLibrary.prototype.clear = function () {
                for (var prop in this.textures) {
                    delete this.textures[prop];
                }
            };

            TextureLibrary.prototype.add = function (imageFile) {
                if (this._game.renderOption === Kiwi.RENDERER_WEBGL) {
                    imageFile = this._rebuildImage(imageFile);
                }

                switch (imageFile.dataType) {
                    case Kiwi.Files.File.SPRITE_SHEET:
                        this.textures[imageFile.key] = this._buildSpriteSheet(imageFile);
                        break;
                    case Kiwi.Files.File.IMAGE:
                        this.textures[imageFile.key] = this._buildImage(imageFile);
                        break;
                    case Kiwi.Files.File.TEXTURE_ATLAS:
                        this.textures[imageFile.key] = this._buildTextureAtlas(imageFile);
                        break;
                    default:
                        break;
                }
            };

            TextureLibrary.prototype._rebuildImage = function (imageFile) {
                var width = imageFile.data.width;
                var height = imageFile.data.height;

                if (this._base2Sizes.indexOf(width) == -1) {
                    var i = 0;
                    while (width > this._base2Sizes[i])
                        i++;
                    width = this._base2Sizes[i];
                }

                if (this._base2Sizes.indexOf(height) == -1) {
                    var i = 0;
                    while (height > this._base2Sizes[i])
                        i++;
                    height = this._base2Sizes[i];
                }

                if (imageFile.data.width !== width || imageFile.data.height !== height) {
                    var canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    canvas.getContext("2d").drawImage(imageFile.data, 0, 0);

                    var image = new Image(width, height);
                    image.src = canvas.toDataURL("image/png");

                    if (imageFile.dataType === Kiwi.Files.File.SPRITE_SHEET) {
                        if (!imageFile.metadata.rows)
                            imageFile.metadata.rows = imageFile.data.height / imageFile.metadata.frameHeight;

                        if (!imageFile.metadata.cols)
                            imageFile.metadata.cols = imageFile.data.width / imageFile.metadata.frameWidth;
                    }

                    imageFile.data = image;
                    canvas = null;
                    width = null;
                    height = null;
                }

                return imageFile;
            };

            TextureLibrary.prototype._buildTextureAtlas = function (imageFile) {
                var atlas = new Kiwi.Textures.TextureAtlas(imageFile.key, Kiwi.Textures.TextureAtlas.TEXTURE_ATLAS, null, imageFile.data);
                var m = imageFile.metadata;

                var json = this._game.fileStore.getFile(m.jsonID).data;
                json.trim();

                atlas.readJSON(json);

                return atlas;
            };

            TextureLibrary.prototype._buildSpriteSheet = function (imageFile) {
                var m = imageFile.metadata;

                var spriteSheet = new Kiwi.Textures.SpriteSheet(imageFile.key, imageFile.data, m.frameWidth, m.frameHeight, m.numCells, m.rows, m.cols, m.sheetOffsetX, m.sheetOffsetY, m.cellOffsetX, m.cellOffsetY);
                return spriteSheet;
            };

            TextureLibrary.prototype._buildImage = function (imageFile) {
                var m = imageFile.metadata;
                return new Kiwi.Textures.SingleImage(imageFile.key, imageFile.data, m.width, m.height, m.offsetX, m.offsetY);
            };
            return TextureLibrary;
        })();
        Textures.TextureLibrary = TextureLibrary;
    })(Kiwi.Textures || (Kiwi.Textures = {}));
    var Textures = Kiwi.Textures;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Textures) {
        var SpriteSheet = (function (_super) {
            __extends(SpriteSheet, _super);
            function SpriteSheet(name, texture, cellWidth, cellHeight, numCells, rows, cols, sheetOffsetX, sheetOffsetY, cellOffsetX, cellOffsetY) {
                this.cellWidth = cellWidth;
                this.cellHeight = cellHeight;

                this._cols = cols || texture.width / cellWidth;
                this._rows = rows || texture.height / cellHeight;
                this.numCells = numCells || this.cols * this.rows;

                this.sheetOffsetX = sheetOffsetX || 0;
                this.sheetOffsetY = sheetOffsetY || 0;

                this.cellOffsetX = cellOffsetX || 0;
                this.cellOffsetY = cellOffsetY || 0;

                _super.call(this, name, Kiwi.Textures.TextureAtlas.SPRITE_SHEET, this.generateAtlasCells(), texture, this.sequences);
            }
            SpriteSheet.prototype.objType = function () {
                return "SpriteSheet";
            };

            Object.defineProperty(SpriteSheet.prototype, "rows", {
                get: function () {
                    return this._rows;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(SpriteSheet.prototype, "cols", {
                get: function () {
                    return this._cols;
                },
                enumerable: true,
                configurable: true
            });

            SpriteSheet.prototype.generateAtlasCells = function () {
                var cells = new Array();
                var cellNumeric = new Array();

                var dx = this.sheetOffsetX;
                var dy = this.sheetOffsetY;
                var i = 0;

                for (var y = 0; y < this.rows; y++) {
                    for (var x = 0; x < this.cols; x++) {
                        cells.push({
                            x: dx,
                            y: dy,
                            w: this.cellWidth,
                            h: this.cellHeight,
                            hitboxes: [
                                {
                                    x: 0,
                                    y: 0,
                                    w: this.cellWidth,
                                    h: this.cellHeight
                                }
                            ]
                        });

                        cellNumeric.push(i++);

                        dx += this.cellOffsetX + this.cellWidth;
                    }
                    dx = this.sheetOffsetX;
                    dy += this.cellOffsetY + this.cellHeight;
                }

                this.sequences = new Array();
                this.sequences.push(new Kiwi.Animation.Sequence('default', cellNumeric));

                return cells;
            };
            return SpriteSheet;
        })(Textures.TextureAtlas);
        Textures.SpriteSheet = SpriteSheet;
    })(Kiwi.Textures || (Kiwi.Textures = {}));
    var Textures = Kiwi.Textures;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Textures) {
        var SingleImage = (function (_super) {
            __extends(SingleImage, _super);
            function SingleImage(name, image, width, height, offsetX, offsetY) {
                this.width = width || image.width;
                this.height = height || image.height;
                this.offsetX = offsetX || 0;
                this.offsetY = offsetY || 0;

                _super.call(this, name, Kiwi.Textures.TextureAtlas.SINGLE_IMAGE, this.generateAtlasCells(), image);
            }
            SingleImage.prototype.objType = function () {
                return "SingleImage";
            };

            SingleImage.prototype.generateAtlasCells = function () {
                return [{ x: this.offsetX, y: this.offsetY, w: this.width, h: this.height, hitboxes: [{ x: 0, y: 0, w: this.width, h: this.height }] }];
            };
            return SingleImage;
        })(Textures.TextureAtlas);
        Textures.SingleImage = SingleImage;
    })(Kiwi.Textures || (Kiwi.Textures = {}));
    var Textures = Kiwi.Textures;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Time) {
        var TimerEvent = (function () {
            function TimerEvent(type, callback, context) {
                this._callback = null;
                this.type = 0;
                this.type = type;
                this._callback = callback;
                this._callbackContext = context;
            }
            TimerEvent.prototype.objType = function () {
                return "TimerEvent";
            };

            TimerEvent.prototype.run = function () {
                if (this._callback) {
                    this._callback.apply(this._callbackContext);
                }
            };
            TimerEvent.TIMER_START = 1;

            TimerEvent.TIMER_COUNT = 2;

            TimerEvent.TIMER_STOP = 3;
            return TimerEvent;
        })();
        Time.TimerEvent = TimerEvent;
    })(Kiwi.Time || (Kiwi.Time = {}));
    var Time = Kiwi.Time;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Time) {
        var Timer = (function () {
            function Timer(name, clock, delay, repeatCount) {
                if (typeof repeatCount === "undefined") { repeatCount = 0; }
                this._currentCount = 0;
                this._startEvents = null;
                this._countEvents = null;
                this._stopEvents = null;
                this._clock = null;
                this._timeLastCount = null;
                this._isRunning = false;
                this._isStopped = true;
                this._isPaused = false;
                this.name = null;
                this.delay = 0;
                this.repeatCount = 0;
                this._clock = clock;

                this._startEvents = [];
                this._countEvents = [];
                this._stopEvents = [];

                this.name = name;
                this.delay = delay;
                this.repeatCount = repeatCount;
            }
            Timer.prototype.objType = function () {
                return "Timer";
            };

            Timer.prototype.currentCount = function () {
                return this._currentCount;
            };

            Timer.prototype.isRunning = function () {
                return this._isRunning;
            };

            Timer.prototype.isStopped = function () {
                return this._isStopped;
            };

            Timer.prototype.isPaused = function () {
                return this._isPaused;
            };

            Timer.prototype.processEvents = function (type) {
                if (type === Time.TimerEvent.TIMER_START) {
                    for (var i = 0; i < this._startEvents.length; i++) {
                        this._startEvents[i].run();
                    }
                } else if (type === Time.TimerEvent.TIMER_COUNT) {
                    for (var i = 0; i < this._countEvents.length; i++) {
                        this._countEvents[i].run();
                    }
                } else if (type === Time.TimerEvent.TIMER_STOP) {
                    for (var i = 0; i < this._stopEvents.length; i++) {
                        this._stopEvents[i].run();
                    }
                }
            };

            Timer.prototype.update = function () {
                if (this._clock.elapsed() - this._timeLastCount >= this.delay && this._isPaused === false) {
                    this._currentCount++;

                    this.processEvents(Time.TimerEvent.TIMER_COUNT);

                    this._timeLastCount = this._clock.elapsed() || 0;

                    if (this._currentCount >= this.repeatCount) {
                        this.stop();
                    }
                }
            };

            Timer.prototype.start = function () {
                if (this._isStopped === true) {
                    this._isRunning = true;
                    this._isPaused = false;
                    this._isStopped = false;

                    this._currentCount = 0;
                    this._timeLastCount = this._clock.elapsed() || 0;

                    this.processEvents(Time.TimerEvent.TIMER_START);
                }

                return this;
            };

            Timer.prototype.stop = function () {
                if (this._isRunning === true || this._isPaused === true) {
                    this._isRunning = false;
                    this._isPaused = false;
                    this._isStopped = true;

                    this.processEvents(Time.TimerEvent.TIMER_STOP);
                }

                return this;
            };

            Timer.prototype.pause = function () {
                if (this._isRunning === true) {
                    this._isRunning = false;
                    this._isPaused = true;
                }

                return this;
            };

            Timer.prototype.resume = function () {
                if (this._isPaused === true) {
                    this._isRunning = true;
                    this._isPaused = false;
                }

                return this;
            };

            Timer.prototype.addTimerEvent = function (event) {
                if (event.type === Time.TimerEvent.TIMER_START) {
                    this._startEvents.push(event);
                } else if (event.type === Time.TimerEvent.TIMER_COUNT) {
                    this._countEvents.push(event);
                } else if (event.type === Time.TimerEvent.TIMER_STOP) {
                    this._stopEvents.push(event);
                }

                return event;
            };

            Timer.prototype.createTimerEvent = function (type, callback, context) {
                if (type === Time.TimerEvent.TIMER_START) {
                    this._startEvents.push(new Time.TimerEvent(type, callback, context));
                    return this._startEvents[this._startEvents.length - 1];
                } else if (type === Time.TimerEvent.TIMER_COUNT) {
                    this._countEvents.push(new Time.TimerEvent(type, callback, context));
                    return this._countEvents[this._countEvents.length - 1];
                } else if (type === Time.TimerEvent.TIMER_STOP) {
                    this._stopEvents.push(new Time.TimerEvent(type, callback, context));
                    return this._stopEvents[this._stopEvents.length - 1];
                }

                return null;
            };

            Timer.prototype.removeTimerEvent = function (event) {
                var removed = [];

                if (event.type === Time.TimerEvent.TIMER_START) {
                    removed = this._startEvents.splice(this._startEvents.indexOf(event), 1);
                } else if (event.type === Time.TimerEvent.TIMER_COUNT) {
                    removed = this._countEvents.splice(this._countEvents.indexOf(event), 1);
                } else if (event.type === Time.TimerEvent.TIMER_STOP) {
                    removed = this._stopEvents.splice(this._stopEvents.indexOf(event), 1);
                }

                if (removed.length === 1) {
                    return true;
                } else {
                    return false;
                }
            };

            Timer.prototype.clear = function (type) {
                if (typeof type === "undefined") { type = 0; }
                if (type === 0) {
                    this._startEvents.length = 0;
                    this._countEvents.length = 0;
                    this._stopEvents.length = 0;
                } else if (type === Time.TimerEvent.TIMER_START) {
                    this._startEvents.length = 0;
                } else if (type === Time.TimerEvent.TIMER_COUNT) {
                    this._countEvents.length = 0;
                } else if (type === Time.TimerEvent.TIMER_STOP) {
                    this._stopEvents.length = 0;
                }
            };

            Timer.prototype.toString = function () {
                return "[{Timer (name=" + this.name + " delay=" + this.delay + " repeatCount=" + this.repeatCount + " running=" + this._isRunning + ")}]";
            };
            return Timer;
        })();
        Time.Timer = Timer;
    })(Kiwi.Time || (Kiwi.Time = {}));
    var Time = Kiwi.Time;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Time) {
        var MasterClock = (function () {
            function MasterClock() {
                this.time = 0;
                this.now = 0;
                this.delta = 0;
                this._started = Date.now();
                this.time = this._started;
            }
            MasterClock.prototype.objType = function () {
                return "MasterClock";
            };

            MasterClock.prototype.elapsed = function () {
                return this.now - this._started;
            };

            MasterClock.prototype.totalElapsedSeconds = function () {
                return (this.now - this._started) * 0.001;
            };

            MasterClock.prototype.update = function () {
                this.now = Date.now();

                this.delta = this.now - this.time;

                this.time = this.now;

                if (this.delta > 0.1) {
                    this.delta = 0.1;
                }
            };

            MasterClock.prototype.elapsedSince = function (since) {
                return this.now - since;
            };

            MasterClock.prototype.elapsedSecondsSince = function (since) {
                return (this.now - since) * 0.001;
            };

            MasterClock.prototype.reset = function () {
                this._started = this.now;
            };
            return MasterClock;
        })();
        Time.MasterClock = MasterClock;
    })(Kiwi.Time || (Kiwi.Time = {}));
    var Time = Kiwi.Time;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Time) {
        var Clock = (function () {
            function Clock(manager, master, name, units) {
                if (typeof units === "undefined") { units = 1000; }
                this._timeFirstStarted = null;
                this._timeLastStarted = null;
                this._timeLastStopped = null;
                this._timeLastPaused = null;
                this._timeLastUnpaused = null;
                this._totalPaused = 0;
                this._isRunning = false;
                this._isStopped = true;
                this._isPaused = false;
                this._elapsedState = 0;
                this.manager = null;
                this.master = null;
                this.name = null;
                this.units = 0;
                this.manager = manager;
                this.master = master;
                this.name = name;
                this.units = units;
                this.timers = [];

                if (this.units < 1) {
                    this.units = 1;
                }
            }
            Clock.prototype.objType = function () {
                return "Clock";
            };

            Clock.prototype.elapsedSinceFirstStarted = function () {
                return (this._timeLastStarted) ? (this.master.elapsed() - this._timeFirstStarted) / this.units : null;
            };

            Clock.prototype.started = function () {
                return this._timeLastStarted;
            };

            Clock.prototype.elapsed = function () {
                if (this._elapsedState === 0) {
                    return (this._timeLastStarted) ? ((this.master.elapsed() - this._timeLastStarted) - this._totalPaused) / this.units : null;
                } else if (this._elapsedState === 1) {
                    return (this._timeLastPaused - this._timeLastStarted - this._totalPaused) / this.units;
                } else if (this._elapsedState === 2) {
                    return (this._timeLastStarted) ? ((this.master.elapsed() - this._timeLastStarted) - this._totalPaused) / this.units : null;
                } else if (this._elapsedState === 3) {
                    return (this._timeLastStopped - this._timeLastStarted - this._totalPaused) / this.units;
                }
            };

            Clock.prototype.elapsedSinceLastStopped = function () {
                return (this._timeLastStarted) ? (this.master.elapsed() - this._timeLastStopped) / this.units : null;
            };

            Clock.prototype.elapsedSinceLastPaused = function () {
                return (this._timeLastStarted) ? (this.master.elapsed() - this._timeLastPaused) / this.units : null;
            };

            Clock.prototype.elapsedSinceLastUnpaused = function () {
                return (this._timeLastStarted) ? (this.master.elapsed() - this._timeLastUnpaused) / this.units : null;
            };

            Clock.prototype.isRunning = function () {
                return this._isRunning;
            };

            Clock.prototype.isStopped = function () {
                return this._isStopped;
            };

            Clock.prototype.isPaused = function () {
                return this._isPaused;
            };

            Clock.prototype.addTimer = function (timer) {
                this.timers.push(timer);

                return this;
            };

            Clock.prototype.createTimer = function (name, delay, repeatCount) {
                if (typeof delay === "undefined") { delay = 1; }
                if (typeof repeatCount === "undefined") { repeatCount = 0; }
                this.timers.push(new Time.Timer(name, this, delay, repeatCount));

                return this.timers[this.timers.length - 1];
            };

            Clock.prototype.removeTimer = function (timer, timerName) {
                if (typeof timer === "undefined") { timer = null; }
                if (typeof timerName === "undefined") { timerName = ''; }
                if (timer !== null) {
                    if (this.timers[timer.name]) {
                        delete this.timers[timer.name];

                        return true;
                    } else {
                        return false;
                    }
                }

                if (timerName !== '') {
                    if (this.timers[timerName]) {
                        delete this.timers[timerName];

                        return true;
                    } else {
                        return false;
                    }
                }

                return false;
            };

            Clock.prototype.checkExists = function (name) {
                if (this.timers[name]) {
                    return true;
                } else {
                    return false;
                }
            };

            Clock.prototype.stopAllTimers = function () {
                for (var i = 0; i < this.timers.length; i++) {
                    this.timers[i].stop();
                }

                return this;
            };

            Clock.prototype.convertToMilliseconds = function (time) {
                return time * this.units;
            };

            Clock.prototype.update = function () {
                for (var i = 0; i < this.timers.length; i++) {
                    this.timers[i].update();
                }
            };

            Clock.prototype.start = function () {
                this._timeLastStarted = this.master.elapsed();
                this._totalPaused = 0;

                if (!this._timeFirstStarted) {
                    this._timeFirstStarted = this._timeLastStarted;
                }

                this._isRunning = true;
                this._isPaused = false;
                this._isStopped = false;

                this._elapsedState = 0;

                return this;
            };

            Clock.prototype.pause = function () {
                if (this._isRunning === true) {
                    this._timeLastPaused = this.master.elapsed();
                    this._isRunning = false;
                    this._isPaused = true;
                    this._isStopped = false;

                    this._elapsedState = 1;
                }

                return this;
            };

            Clock.prototype.resume = function () {
                if (this._isPaused === true) {
                    this._timeLastUnpaused = this.master.elapsed();
                    this._totalPaused += this._timeLastUnpaused - this._timeLastPaused;
                    this._isRunning = true;
                    this._isPaused = false;
                    this._isStopped = false;

                    this._elapsedState = 2;
                }

                return this;
            };

            Clock.prototype.stop = function () {
                if (this._isStopped === false) {
                    this._timeLastStopped = this.master.elapsed();

                    if (this._isPaused === true) {
                        this._totalPaused += this._timeLastStopped - this._timeLastPaused;
                    }

                    this._isRunning = false;
                    this._isPaused = false;
                    this._isStopped = true;

                    this._elapsedState = 3;
                }

                return this;
            };

            Clock.prototype.toString = function () {
                return "[{Clock (name=" + this.name + " units=" + this.units + " running=" + this._isRunning + ")}]";
            };
            return Clock;
        })();
        Time.Clock = Clock;
    })(Kiwi.Time || (Kiwi.Time = {}));
    var Time = Kiwi.Time;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Time) {
        var Manager = (function () {
            function Manager(game) {
                this._clocks = [];
                this._game = game;
            }
            Manager.prototype.objType = function () {
                return "Manager";
            };

            Manager.prototype.boot = function () {
                this.master = new Kiwi.Time.MasterClock();

                this.clock = new Time.Clock(this, this.master, 'default', 1000);
                this.clock.start();
            };

            Manager.prototype.addClock = function (name, units) {
                if (typeof units === "undefined") { units = 1000; }
                this._clocks.push(new Time.Clock(this, this.master, name, units));

                return this._clocks[this._clocks.length - 1];
            };

            Manager.prototype.getClock = function (name) {
                for (var i = 0; i < this._clocks.length; i++) {
                    if (this._clocks[i].name === name) {
                        return this._clocks[i];
                    }
                }
            };

            Manager.prototype.update = function () {
                this.master.update();
                this.clock.update();

                for (var i = 0; i < this._clocks.length; i++) {
                    this._clocks[i].update();
                }
            };

            Manager.prototype.now = function () {
                return this.master.now;
            };

            Manager.prototype.delta = function () {
                return this.master.delta;
            };
            return Manager;
        })();
        Time.Manager = Manager;
    })(Kiwi.Time || (Kiwi.Time = {}));
    var Time = Kiwi.Time;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Utils) {
        var Canvas = (function () {
            function Canvas(width, height, visible, offScreen) {
                if (typeof visible === "undefined") { visible = true; }
                if (typeof offScreen === "undefined") { offScreen = false; }
                this.domElement = null;
                this.context = null;
                this._visible = true;
                this._offScreen = false;
                this._clearMode = 1;
                this.bgColor = 'rgb(0, 0, 0)';
                this.domElement = document.createElement('canvas');
                this.domElement.width = width;
                this.domElement.height = height;

                this._width = width;
                this._height = height;

                this.context = this.domElement.getContext('2d');

                this._offScreen = offScreen;
                this._visible = visible;

                if (visible === false) {
                    this.domElement.style.display = 'none';
                }
            }

            Object.defineProperty(Canvas.prototype, "width", {
                get: function () {
                    return this._width;
                },
                set: function (value) {
                    this._width = value;
                    this._updatedSize();
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Canvas.prototype, "height", {
                get: function () {
                    return this._height;
                },
                set: function (value) {
                    this._height = value;
                    this._updatedSize();
                },
                enumerable: true,
                configurable: true
            });

            Canvas.prototype.objType = function () {
                return "Canvas";
            };

            Canvas.prototype._updatedSize = function () {
                this.domElement.width = this._width;
                this.domElement.height = this._height;
            };

            Canvas.prototype.destroy = function () {
                if (this._offScreen === false) {
                    this.domElement.style.display = 'none';
                }
            };


            Object.defineProperty(Canvas.prototype, "visible", {
                get: function () {
                    return this._visible;
                },
                set: function (value) {
                    if (value !== null && value !== this._visible) {
                        this._visible = value;

                        if (value === true) {
                            this.domElement.style.display = 'block';
                        } else {
                            this.domElement.style.display = 'none';
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Canvas.prototype, "clearMode", {
                get: function () {
                    return this._clearMode;
                },
                set: function (value) {
                    if (value !== null && value !== this._clearMode && value >= Kiwi.Utils.Canvas.CLEARMODE_NONE && value <= Kiwi.Utils.Canvas.CLEARMODE_FILLRECT_ALPHA) {
                        this._clearMode = value;
                    }
                },
                enumerable: true,
                configurable: true
            });

            Canvas.prototype.clear = function () {
                if (this._clearMode === Canvas.CLEARMODE_NONE) {
                } else if (this._clearMode === Canvas.CLEARMODE_CLEARRECT) {
                    this.context.clearRect(0, 0, this.domElement.width, this.domElement.height);
                } else if (this._clearMode === Canvas.CLEARMODE_FILLRECT) {
                    this.context.fillStyle = this.bgColor;
                    this.context.fillRect(0, 0, this.domElement.width, this.domElement.height);
                } else if (this._clearMode === Canvas.CLEARMODE_FILLRECT_ALPHA) {
                    this.context.clearRect(0, 0, this.domElement.width, this.domElement.height);
                    this.context.fillStyle = this.bgColor;
                    this.context.fillRect(0, 0, this.domElement.width, this.domElement.height);
                }
            };

            Canvas.prototype.saveAsPNG = function () {
                return this.domElement.toDataURL();
            };

            Canvas.prototype.toString = function () {
                return '[{Canvas (width=' + this.width + ' height=' + this.height + ' visible=' + this.visible + ' offScreen=' + this._offScreen + ' clearMode=' + this.clearMode + ')}]';
            };
            Canvas.CLEARMODE_NONE = 0;

            Canvas.CLEARMODE_CLEARRECT = 1;

            Canvas.CLEARMODE_FILLRECT = 2;

            Canvas.CLEARMODE_FILLRECT_ALPHA = 3;
            return Canvas;
        })();
        Utils.Canvas = Canvas;
    })(Kiwi.Utils || (Kiwi.Utils = {}));
    var Utils = Kiwi.Utils;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Utils) {
        var Common = (function () {
            function Common() {
            }
            Common.defaultCompare = function (a, b) {
                if (a < b) {
                    return -1;
                } else if (a === b) {
                    return 0;
                } else {
                    return 1;
                }
            };

            Common.prototype.objType = function () {
                return "Common";
            };

            Common.defaultEquals = function (a, b) {
                return a === b;
            };

            Common.defaultTostring = function (item) {
                if (item === null) {
                    return 'KIWI_NULL';
                } else if (Kiwi.Utils.Common.isUndefined(item)) {
                    return 'KIWI_UNDEFINED';
                } else if (Kiwi.Utils.Common.isString(item)) {
                    return item;
                } else {
                    return item.toString();
                }
            };

            Common.isFunction = function (func) {
                return (typeof func) === 'function';
            };

            Common.isNumeric = function (value) {
                return !isNaN(value);
            };

            Common.isUndefined = function (obj) {
                return (typeof obj) === 'undefined';
            };

            Common.isString = function (obj) {
                return Object.prototype.toString.call(obj) === '[object string]';
            };

            Common.reverseCompareFunction = function (compareFunction) {
                if (!Kiwi.Utils.Common.isFunction(compareFunction)) {
                    return function (a, b) {
                        if (a < b) {
                            return 1;
                        } else if (a === b) {
                            return 0;
                        } else {
                            return -1;
                        }
                    };
                } else {
                    return function (d, v) {
                        return compareFunction(d, v) * -1;
                    };
                }
            };

            Common.compareToEquals = function (compareFunction) {
                return function (a, b) {
                    return compareFunction(a, b) === 0;
                };
            };

            Common.shuffleArray = function (array) {
                for (var i = array.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    var temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }

                return array;
            };
            return Common;
        })();
        Utils.Common = Common;
    })(Kiwi.Utils || (Kiwi.Utils = {}));
    var Utils = Kiwi.Utils;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Utils) {
        var RandomDataGenerator = (function () {
            function RandomDataGenerator(seeds) {
                if (typeof seeds === "undefined") { seeds = []; }
                this.c = 1;
                this._data = {
                    lipsum: [
                        "lorem",
                        "ipsum",
                        "dolor",
                        "sit",
                        "amet",
                        "consectetur",
                        "adipiscing",
                        "elit",
                        "nunc",
                        "sagittis",
                        "tortor",
                        "ac",
                        "mi",
                        "pretium",
                        "sed",
                        "convallis",
                        "massa",
                        "pulvinar",
                        "curabitur",
                        "non",
                        "turpis",
                        "velit",
                        "vitae",
                        "rutrum",
                        "odio",
                        "aliquam",
                        "sapien",
                        "orci",
                        "tempor",
                        "sed",
                        "elementum",
                        "sit",
                        "amet",
                        "tincidunt",
                        "sed",
                        "risus",
                        "etiam",
                        "nec",
                        "lacus",
                        "id",
                        "ante",
                        "hendrerit",
                        "malesuada",
                        "donec",
                        "porttitor",
                        "magna",
                        "eget",
                        "libero",
                        "pharetra",
                        "sollicitudin",
                        "aliquam",
                        "mattis",
                        "mattis",
                        "massa",
                        "et",
                        "porta",
                        "morbi",
                        "vitae",
                        "magna",
                        "augue",
                        "vestibulum",
                        "at",
                        "lectus",
                        "sed",
                        "tellus",
                        "facilisis",
                        "tincidunt",
                        "suspendisse",
                        "eros",
                        "magna",
                        "consequat",
                        "at",
                        "sollicitudin",
                        "ac",
                        "vestibulum",
                        "vel",
                        "dolor",
                        "in",
                        "egestas",
                        "lacus",
                        "quis",
                        "lacus",
                        "placerat",
                        "et",
                        "molestie",
                        "ipsum",
                        "scelerisque",
                        "nullam",
                        "sit",
                        "amet",
                        "tortor",
                        "dui",
                        "aenean",
                        "pulvinar",
                        "odio",
                        "nec",
                        "placerat",
                        "fringilla",
                        "neque",
                        "dolor"
                    ]
                };
                this.sow(seeds);
            }
            RandomDataGenerator.prototype.objType = function () {
                return "RandomDataGenerator";
            };

            RandomDataGenerator.prototype.uint32 = function () {
                return this.rnd.apply(this) * 0x100000000;
            };

            RandomDataGenerator.prototype.fract32 = function () {
                return this.rnd.apply(this) + (this.rnd.apply(this) * 0x200000 | 0) * 1.1102230246251565e-16;
            };

            RandomDataGenerator.prototype.rnd = function () {
                var t = 2091639 * this.s0 + this.c * 2.3283064365386963e-10;

                this.c = t | 0;
                this.s0 = this.s1;
                this.s1 = this.s2;
                this.s2 = t - this.c;

                return this.s2;
            };

            RandomDataGenerator.prototype.hash = function (data) {
                var h, i, n;

                n = 0xefc8249d;

                data = data.toString();

                for (i = 0; i < data.length; i++) {
                    n += data.charCodeAt(i);
                    h = 0.02519603282416938 * n;
                    n = h >>> 0;
                    h -= n;
                    h *= n;
                    n = h >>> 0;
                    h -= n;
                    n += h * 0x100000000;
                }

                return (n >>> 0) * 2.3283064365386963e-10;
            };

            RandomDataGenerator.prototype.sow = function (seeds) {
                if (typeof seeds === "undefined") { seeds = []; }
                this.s0 = this.hash(' ');
                this.s1 = this.hash(this.s0);
                this.s2 = this.hash(this.s1);

                var seed;

                for (var i = 0; seed = seeds[i++]; ) {
                    this.s0 -= this.hash(seed);
                    this.s0 += ~~(this.s0 < 0);

                    this.s1 -= this.hash(seed);
                    this.s1 += ~~(this.s1 < 0);

                    this.s2 -= this.hash(seed);
                    this.s2 += ~~(this.s2 < 0);
                }
            };

            RandomDataGenerator.prototype.integer = function () {
                return this.uint32();
            };

            RandomDataGenerator.prototype.frac = function () {
                return this.fract32();
            };

            RandomDataGenerator.prototype.real = function () {
                return this.uint32() + this.fract32();
            };

            RandomDataGenerator.prototype.integerInRange = function (min, max) {
                return Math.floor(this.realInRange(min, max));
            };

            RandomDataGenerator.prototype.realInRange = function (min, max) {
                min = min || 0;
                max = max || 0;

                return this.frac() * (max - min) + min;
            };

            RandomDataGenerator.prototype.normal = function () {
                return 1 - 2 * this.frac();
            };

            RandomDataGenerator.prototype.uuid = function () {
                var a, b;

                for (b = a = ''; a++ < 36; b += ~a % 5 | a * 3 & 4 ? (a ^ 15 ? 8 ^ this.frac() * (a ^ 20 ? 16 : 4) : 4).toString(16) : '-')
                    ;

                return b;
            };

            RandomDataGenerator.prototype.pick = function (array) {
                return array[this.integerInRange(0, array.length)];
            };

            RandomDataGenerator.prototype.weightedPick = function (array) {
                return array[~~(Math.pow(this.frac(), 2) * array.length)];
            };

            RandomDataGenerator.prototype.word = function () {
                return this.pick(this._data.lipsum);
            };

            RandomDataGenerator.prototype.words = function (quantity) {
                if (typeof quantity === "undefined") { quantity = 3; }
                var ret = [];

                for (var i = 0; i < quantity; i++) {
                    ret.push(this.pick(this._data.lipsum));
                }

                return ret.join(' ');
            };

            RandomDataGenerator.prototype.sentence = function () {
                var ret;

                ret = this.words(this.integerInRange(2, 16)).replace(/[a-z]/, function (m) {
                    return m.toUpperCase();
                });

                return ret + '.';
            };

            RandomDataGenerator.prototype.sentences = function (quantity) {
                if (typeof quantity === "undefined") { quantity = 3; }
                var ret = [];

                for (var i = 0; i < quantity; i++) {
                    ret.push(this.sentence());
                }

                return ret.join(' ');
            };

            RandomDataGenerator.prototype.timestamp = function (min, max) {
                if (typeof min === "undefined") { min = 946684800000; }
                if (typeof max === "undefined") { max = 1577862000000; }
                return this.realInRange(min, max);
            };

            RandomDataGenerator.prototype.angle = function () {
                return this.integerInRange(-180, 180);
            };
            return RandomDataGenerator;
        })();
        Utils.RandomDataGenerator = RandomDataGenerator;
    })(Kiwi.Utils || (Kiwi.Utils = {}));
    var Utils = Kiwi.Utils;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Utils) {
        var RequestAnimationFrame = (function () {
            function RequestAnimationFrame(callback) {
                this._isSetTimeOut = false;
                this.lastTime = 0;
                this.currentTime = 0;
                this.isRunning = false;
                this._callback = callback;

                var vendors = ['ms', 'moz', 'webkit', 'o'];

                for (var x = 0; x < vendors.length && !window.requestAnimationFrame; x++) {
                    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
                    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'];
                }
            }
            RequestAnimationFrame.prototype.objType = function () {
                return "RequestAnimationFrame";
            };

            RequestAnimationFrame.prototype.setCallback = function (callback) {
                this._callback = callback;
            };

            RequestAnimationFrame.prototype.isUsingSetTimeOut = function () {
                return this._isSetTimeOut;
            };

            RequestAnimationFrame.prototype.isUsingRAF = function () {
                if (this._isSetTimeOut === true) {
                    return false;
                } else {
                    return true;
                }
            };

            RequestAnimationFrame.prototype.start = function (callback) {
                if (typeof callback === "undefined") { callback = null; }
                var _this = this;
                if (callback) {
                    this._callback = callback;
                }

                if (!window.requestAnimationFrame) {
                    this._isSetTimeOut = true;
                    this._timeOutID = window.setTimeout(function () {
                        return _this.SetTimeoutUpdate();
                    }, 0);
                } else {
                    this._isSetTimeOut = false;
                    window.requestAnimationFrame(function () {
                        return _this.RAFUpdate();
                    });
                }

                this.isRunning = true;
            };

            RequestAnimationFrame.prototype.stop = function () {
                if (this._isSetTimeOut) {
                    clearTimeout(this._timeOutID);
                } else {
                    window.cancelAnimationFrame;
                }

                this.isRunning = false;
            };

            RequestAnimationFrame.prototype.RAFUpdate = function () {
                var _this = this;
                this.currentTime = Date.now();

                if (this._callback) {
                    this._callback();
                }

                var timeToCall = Math.max(0, 16 - (this.currentTime - this.lastTime));

                window.requestAnimationFrame(function () {
                    return _this.RAFUpdate();
                });

                this.lastTime = this.currentTime + timeToCall;
            };

            RequestAnimationFrame.prototype.SetTimeoutUpdate = function () {
                var _this = this;
                this.currentTime = Date.now();

                if (this._callback) {
                    this._callback();
                }

                var timeToCall = Math.max(0, 16 - (this.currentTime - this.lastTime));

                this._timeOutID = window.setTimeout(function () {
                    return _this.SetTimeoutUpdate();
                }, timeToCall);

                this.lastTime = this.currentTime + timeToCall;
            };
            return RequestAnimationFrame;
        })();
        Utils.RequestAnimationFrame = RequestAnimationFrame;
    })(Kiwi.Utils || (Kiwi.Utils = {}));
    var Utils = Kiwi.Utils;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Utils) {
        var Dictionary = (function () {
            function Dictionary(toStrFunction) {
                if (typeof toStrFunction === "undefined") { toStrFunction = Kiwi.Utils.Common.defaultTostring; }
                this.nElements = 0;
                this.table = {};
                this.toStr = null;
                this.toStr = toStrFunction;
            }
            Dictionary.prototype.objType = function () {
                return "Dictionary";
            };

            Dictionary.prototype.size = function () {
                return this.nElements;
            };

            Dictionary.prototype.isEmpty = function () {
                return this.nElements <= 0;
            };

            Dictionary.prototype.get = function (key) {
                var pair = this.table[this.toStr(key)];

                if (Kiwi.Utils.Common.isUndefined(pair)) {
                    return undefined;
                }

                return pair.value;
            };

            Dictionary.prototype.set = function (key, value) {
                if (Kiwi.Utils.Common.isUndefined(key) || Kiwi.Utils.Common.isUndefined(value)) {
                    return undefined;
                }

                var ret;
                var k = this.toStr(key);
                var previousElement = this.table[k];

                if (Kiwi.Utils.Common.isUndefined(previousElement)) {
                    this.nElements++;
                    ret = undefined;
                } else {
                    ret = previousElement.value;
                }

                this.table[k] = { key: key, value: value };

                return ret;
            };

            Dictionary.prototype.remove = function (key) {
                var k = this.toStr(key);
                var previousElement = this.table[k];

                if (!Kiwi.Utils.Common.isUndefined(previousElement)) {
                    delete this.table[k];
                    this.nElements--;
                    return previousElement.value;
                }

                return undefined;
            };

            Dictionary.prototype.keys = function () {
                var array = [];

                for (var name in this.table) {
                    if (this.table.hasOwnProperty(name)) {
                        array.push(this.table[name].key);
                    }
                }

                return array;
            };

            Dictionary.prototype.values = function () {
                var array = [];

                for (var name in this.table) {
                    if (this.table.hasOwnProperty(name)) {
                        array.push(this.table[name].value);
                    }
                }

                return array;
            };

            Dictionary.prototype.forEach = function (callback) {
                for (var name in this.table) {
                    if (this.table.hasOwnProperty(name)) {
                        var pair = this.table[name];
                        var ret = callback(pair.key, pair.value);

                        if (ret === false) {
                            return;
                        }
                    }
                }
            };

            Dictionary.prototype.containsKey = function (key) {
                return !Kiwi.Utils.Common.isUndefined(this.get(key));
            };

            Dictionary.prototype.clear = function () {
                this.table = {};
                this.nElements = 0;
            };

            Dictionary.prototype.toString = function () {
                return '[{Dictionary (size=' + this.size() + ' isEmpty=' + this.isEmpty() + ')}]';
            };
            return Dictionary;
        })();
        Utils.Dictionary = Dictionary;
    })(Kiwi.Utils || (Kiwi.Utils = {}));
    var Utils = Kiwi.Utils;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Utils) {
        var LinkedList = (function () {
            function LinkedList() {
                this.firstNode = null;
                this.lastNode = null;
                this.nElements = 0;
            }
            LinkedList.prototype.objType = function () {
                return "LinkedList";
            };

            LinkedList.prototype.size = function () {
                return this.nElements;
            };

            LinkedList.prototype.isEmpty = function () {
                return this.nElements <= 0;
            };

            LinkedList.prototype.nodeAtIndex = function (index) {
                if (index < 0 || index >= this.nElements) {
                    return null;
                }

                if (index === (this.nElements - 1)) {
                    return this.lastNode;
                }

                var node = this.firstNode;

                for (var i = 0; i < index; i++) {
                    node = node.next;
                }

                return node;
            };

            LinkedList.prototype.createNode = function (item) {
                return {
                    element: item,
                    next: null
                };
            };

            LinkedList.prototype.equalsAux = function (n1, n2, eqF) {
                while (n1 !== null) {
                    if (!eqF(n1.element, n2.element)) {
                        return false;
                    }

                    n1 = n1.next;
                    n2 = n2.next;
                }

                return true;
            };

            LinkedList.prototype.add = function (item, index) {
                if (Kiwi.Utils.Common.isUndefined(index)) {
                    index = this.nElements;
                }

                if (index < 0 || index > this.nElements || Kiwi.Utils.Common.isUndefined(item)) {
                    return false;
                }

                var newNode = this.createNode(item);

                if (this.nElements === 0) {
                    this.firstNode = newNode;
                    this.lastNode = newNode;
                } else if (index === this.nElements) {
                    this.lastNode.next = newNode;
                    this.lastNode = newNode;
                } else if (index === 0) {
                    newNode.next = this.firstNode;
                    this.firstNode = newNode;
                } else {
                    var prev = this.nodeAtIndex(index - 1);
                    newNode.next = prev.next;
                    prev.next = newNode;
                }

                this.nElements++;

                return true;
            };

            LinkedList.prototype.first = function () {
                if (this.firstNode !== null) {
                    return this.firstNode.element;
                }

                return undefined;
            };

            LinkedList.prototype.last = function () {
                if (this.lastNode !== null) {
                    return this.lastNode.element;
                }

                return undefined;
            };

            LinkedList.prototype.elementAtIndex = function (index) {
                var node = this.nodeAtIndex(index);

                if (node === null) {
                    return undefined;
                }

                return node.element;
            };

            LinkedList.prototype.indexOf = function (item, equalsFunction) {
                if (typeof equalsFunction === "undefined") { equalsFunction = Kiwi.Utils.Common.defaultEquals; }
                var equalsF = equalsFunction;

                if (Kiwi.Utils.Common.isUndefined(item)) {
                    return -1;
                }

                var currentNode = this.firstNode;
                var index = 0;

                while (currentNode !== null) {
                    if (equalsF(currentNode.element, item)) {
                        return index;
                    }

                    index++;
                    currentNode = currentNode.next;
                }

                return -1;
            };

            LinkedList.prototype.contains = function (item, equalsFunction) {
                return (this.indexOf(item, equalsFunction) >= 0);
            };

            LinkedList.prototype.remove = function (item, equalsFunction) {
                if (typeof equalsFunction === "undefined") { equalsFunction = Kiwi.Utils.Common.defaultEquals; }
                var equalsF = equalsFunction;

                if (this.nElements < 1 || Kiwi.Utils.Common.isUndefined(item)) {
                    return false;
                }

                var previous = null;
                var currentNode = this.firstNode;

                while (currentNode !== null) {
                    if (equalsF(currentNode.element, item)) {
                        if (currentNode === this.firstNode) {
                            this.firstNode = this.firstNode.next;

                            if (currentNode === this.lastNode) {
                                this.lastNode = null;
                            }
                        } else if (currentNode === this.lastNode) {
                            this.lastNode = previous;
                            previous.next = currentNode.next;
                            currentNode.next = null;
                        } else {
                            previous.next = currentNode.next;
                            currentNode.next = null;
                        }

                        this.nElements--;

                        return true;
                    }

                    previous = currentNode;
                    currentNode = currentNode.next;
                }

                return false;
            };

            LinkedList.prototype.clear = function () {
                this.firstNode = null;
                this.lastNode = null;
                this.nElements = 0;
            };

            LinkedList.prototype.equals = function (other, equalsFunction) {
                if (typeof equalsFunction === "undefined") { equalsFunction = Kiwi.Utils.Common.defaultEquals; }
                var eqF = equalsFunction;

                if (!(other instanceof Kiwi.Utils.LinkedList)) {
                    return false;
                }

                if (this.size !== other.size) {
                    return false;
                }

                return this.equalsAux(this.firstNode, other.firstNode, eqF);
            };

            LinkedList.prototype.removeElementAtIndex = function (index) {
                if (index < 0 || index >= this.nElements) {
                    return undefined;
                }

                var element;

                if (this.nElements === 1) {
                    element = this.firstNode.element;
                    this.firstNode = null;
                    this.lastNode = null;
                } else {
                    var previous = this.nodeAtIndex(index - 1);

                    if (previous === null) {
                        element = this.firstNode.element;
                        this.firstNode = this.firstNode.next;
                    } else if (previous.next === this.lastNode) {
                        element = this.lastNode.element;
                        this.lastNode = previous;
                    }

                    if (previous !== null) {
                        element = previous.next.element;
                        previous.next = previous.next.next;
                    }
                }

                this.nElements--;

                return element;
            };

            LinkedList.prototype.forEach = function (callback) {
                var currentNode = this.firstNode;

                while (currentNode !== null) {
                    if (callback(currentNode.element) === false) {
                        break;
                    }

                    currentNode = currentNode.next;
                }
            };

            LinkedList.prototype.reverse = function () {
                var previous = null;
                var current = this.firstNode;
                var temp = null;

                while (current !== null) {
                    temp = current.next;
                    current.next = previous;
                    previous = current;
                    current = temp;
                }

                temp = this.firstNode;
                this.firstNode = this.lastNode;
                this.lastNode = temp;
            };

            LinkedList.prototype.toArray = function () {
                var array = [];
                var currentNode = this.firstNode;

                while (currentNode !== null) {
                    array.push(currentNode.element);
                    currentNode = currentNode.next;
                }

                return array;
            };

            LinkedList.prototype.toString = function () {
                return '[{LinkedList (size=' + this.size() + ' isEmpty=' + this.isEmpty() + ')}]';
            };
            return LinkedList;
        })();
        Utils.LinkedList = LinkedList;
    })(Kiwi.Utils || (Kiwi.Utils = {}));
    var Utils = Kiwi.Utils;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    Kiwi.VERSION = "1.0";

    Kiwi.RENDERER_CANVAS = 0;
    Kiwi.RENDERER_WEBGL = 1;

    Kiwi.TARGET_BROWSER = 0;
    Kiwi.TARGET_COCOON = 1;

    Kiwi.DEBUG_ON = 0;
    Kiwi.DEBUG_OFF = 1;

    Kiwi.DEVICE = null;

    Kiwi.ADDED_TO_STATE = 0;
    Kiwi.ADDED_TO_LAYER = 1;
    Kiwi.ADDED_TO_GROUP = 2;
    Kiwi.ADDED_TO_ENTITY = 3;
    Kiwi.REMOVED_FROM_STATE = 4;
    Kiwi.REMOVED_FROM_LAYER = 5;
    Kiwi.REMOVED_FROM_GROUP = 6;
    Kiwi.REMOVED_FROM_ENTITY = 7;

    Kiwi.STATE = 0;
    Kiwi.LAYER = 1;
    Kiwi.GROUP = 2;
    Kiwi.ENTITY = 3;
    Kiwi.CAMERA = 4;
    Kiwi.HUD_WIDGET = 5;
    Kiwi.TILE_LAYER = 6;

    var GameManager = (function () {
        function GameManager() {
        }
        GameManager.prototype.objType = function () {
            return "GameManager";
        };

        GameManager.register = function (game) {
            return Kiwi.GameManager._games.push(game);
        };

        GameManager.total = function () {
            return Kiwi.GameManager._games.length;
        };
        GameManager._games = [];
        return GameManager;
    })();
    Kiwi.GameManager = GameManager;
})(Kiwi || (Kiwi = {}));
