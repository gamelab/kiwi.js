var Kiwi;
(function (Kiwi) {
    var Component = (function () {
        function Component(name, supportsCanvas, supportsDOM, supportsWebGL) {
            if (typeof supportsCanvas === "undefined") { supportsCanvas = true; }
            if (typeof supportsDOM === "undefined") { supportsDOM = false; }
            if (typeof supportsWebGL === "undefined") { supportsWebGL = false; }
            this.layer = null;
            this.state = null;
            this.group = null;
            this.entity = null;
            this.game = null;
            this.active = true;
            this.dirty = false;
            this.name = name;
            this.active = true;

            this._supportsCanvas = supportsCanvas;
            this._supportsDOM = supportsDOM;
            this._supportsWebGL = supportsWebGL;

            this.onAddedToState = new Kiwi.Signal();
            this.onAddedToLayer = new Kiwi.Signal();
            this.onAddedToGroup = new Kiwi.Signal();
            this.onAddedToEntity = new Kiwi.Signal();
            this.onRemovedFromState = new Kiwi.Signal();
            this.onRemovedFromLayer = new Kiwi.Signal();
            this.onRemovedFromGroup = new Kiwi.Signal();
            this.onRemovedFromEntity = new Kiwi.Signal();
        }
        Component.prototype.objType = function () {
            return "Component";
        };

        Component.prototype.modify = function (action, parent) {
            if (action === Kiwi.ADDED_TO_GROUP) {
                return this._addedToGroup(parent);
            } else if (action === Kiwi.ADDED_TO_LAYER) {
                return this._addedToLayer(parent);
            } else if (action === Kiwi.ADDED_TO_STATE) {
                return this._addedToState(parent);
            } else if (action === Kiwi.ADDED_TO_ENTITY) {
                return this._addedToEntity(parent);
            } else if (action === Kiwi.REMOVED_FROM_GROUP) {
                return this._removedFromGroup(parent);
            } else if (action === Kiwi.REMOVED_FROM_LAYER) {
                return this._removedFromLayer(parent);
            } else if (action === Kiwi.REMOVED_FROM_STATE) {
                return this._removedFromState(parent);
            } else if (action === Kiwi.REMOVED_FROM_ENTITY) {
                return this._removedFromEntity(parent);
            }
        };

        Component.prototype._addedToLayer = function (layer) {
            if (this.layer !== null) {
                klog.warn('Component already exists on Layer ' + this.layer.id);

                return false;
            } else {
                if (this.supportsType(layer.type) === true) {
                    this.layer = layer;

                    if (layer.game !== null) {
                        this.game = layer.game;
                    }

                    this.onAddedToLayer.dispatch(this, this.layer);

                    return true;
                } else {
                    klog.warn('Warning - Component does not support Layer of this type: ' + layer.type);
                    return false;
                }
            }
        };

        Component.prototype._removedFromLayer = function (layer) {
            this.layer = null;

            this.onRemovedFromLayer.dispatch(this, layer);
        };

        Component.prototype._addedToState = function (state) {
            klog.info('Component added to State');

            this.state = state;

            this.game = this.state.game;

            this.onAddedToState.dispatch(this, this.state);

            return true;
        };

        Component.prototype._removedFromState = function (state) {
            klog.info('Component removed from State');

            this.state = null;

            this.onAddedToState.dispatch(this, state);
        };

        Component.prototype._addedToGroup = function (group) {
            klog.info('Component added to Group');

            this.group = group;

            if (group.game !== null) {
                this.game = group.game;
            }

            this.onAddedToGroup.dispatch(this, group);
        };

        Component.prototype._removedFromGroup = function (group) {
            klog.info('Component removed from Group');

            this.group = null;

            this.onRemovedFromGroup.dispatch(this, group);
        };

        Component.prototype._addedToEntity = function (entity) {
            klog.info('Component added to Entity');

            this.entity = entity;

            if (this.entity.game !== null) {
                this.game = this.entity.game;
            }

            this.onAddedToEntity.dispatch(this, this.entity);

            return true;
        };

        Component.prototype._removedFromEntity = function (entity) {
            klog.info('Component removed from Entity');

            this.entity = null;

            this.onRemovedFromEntity.dispatch(this, entity);
        };

        Component.prototype.supportsType = function (type) {
            if (type === Kiwi.TYPE_CANVAS && this._supportsCanvas) {
                return true;
            }

            if (type === Kiwi.TYPE_DOM && this._supportsDOM) {
                return true;
            }

            if (type === Kiwi.TYPE_WEBGL && this._supportsWebGL) {
                return true;
            }

            return false;
        };

        Component.prototype.supportsCanvas = function () {
            return this._supportsCanvas;
        };

        Component.prototype.supportsDOM = function () {
            return this._supportsDOM;
        };

        Component.prototype.supportsWebGL = function () {
            return this._supportsWebGL;
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
            this.layer = null;

            this.name = '';
        };
        return Component;
    })();
    Kiwi.Component = Component;
})(Kiwi || (Kiwi = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Kiwi;
(function (Kiwi) {
    (function (Components) {
        var Alpha = (function (_super) {
            __extends(Alpha, _super);
            function Alpha(value) {
                if (typeof value === "undefined") { value = 0; }
                _super.call(this, 'Alpha', true, true, true);
                this._alpha0 = 0;

                this.updated = new Kiwi.Signal();

                this.alpha(value);
            }
            Alpha.prototype.objType = function () {
                return "Alpha";
            };

            Alpha.prototype.alpha = function (value) {
                if (typeof value === "undefined") { value = null; }
                if (value !== null && value !== this._alpha0) {
                    if (value > 1)
                        value = 1; else if (value < 0)
                        value = 0;
                    this._alpha0 = value;
                    this.cssOpactiy = value.toString();
                    this.dirty = true;
                    this.updated.dispatch(this._alpha0, this.cssOpactiy);
                }

                return this._alpha0;
            };

            Alpha.prototype.addAlpha = function (value) {
                if (value !== null && value > 0) {
                    if (value + this._alpha0 > 1) {
                        return this.alpha(1);
                    } else {
                        return this.alpha(value + this._alpha0);
                    }
                }

                return this._alpha0;
            };

            Alpha.prototype.subAlpha = function (value) {
                if (value !== null && value > 0) {
                    if (this._alpha0 - value < 0) {
                        return this.alpha(0);
                    } else {
                        return this.alpha(this._alpha0 - value);
                    }
                }

                return this._alpha0;
            };

            Alpha.prototype.addStyleUpdates = function (entity) {
                if (entity === null) {
                    return;
                }

                entity.addStyleUpdate('opacity', this.cssOpactiy);
            };

            Alpha.prototype.addStyleImmediately = function (entity) {
                if (entity.domElement === null || entity.domElement.element === null) {
                    return;
                }

                entity.domElement.element.style.opacity = this.cssOpactiy;
            };

            Alpha.prototype.setContext = function (canvas) {
                if (this._alpha0 >= 0 && this._alpha0 < 1) {
                    console.log('canvas', this._alpha0);
                    canvas.context.globalAlpha = this._alpha0;
                }
            };

            Alpha.prototype.setCSS = function (element) {
                element.style.opacity = this.cssOpactiy;

                return element;
            };

            Alpha.prototype.toString = function () {
                return '[{Alpha (opacity=' + this._alpha0 + ')}]';
            };
            return Alpha;
        })(Kiwi.Component);
        Components.Alpha = Alpha;
    })(Kiwi.Components || (Kiwi.Components = {}));
    var Components = Kiwi.Components;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Components) {
        var ArcadePhysics = (function (_super) {
            __extends(ArcadePhysics, _super);
            function ArcadePhysics(entity, position, size) {
                _super.call(this, 'ArcadePhysics', true, true, true);

                this._parent = entity;
                this.position = position;
                this.size = size;

                this.last = new Kiwi.Geom.Point(this.position.x(), this.position.y());
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

            ArcadePhysics.collide = function (gameObject1, gameObject2, notifyCallback) {
                if (typeof notifyCallback === "undefined") { notifyCallback = null; }
                return ArcadePhysics.overlaps(gameObject1, gameObject2, notifyCallback, true);
            };

            ArcadePhysics.collideGroup = function (gameObject, group, notifyCallback) {
                if (typeof notifyCallback === "undefined") { notifyCallback = null; }
                return ArcadePhysics.overlapsObjectGroup(gameObject, group, notifyCallback, true);
            };

            ArcadePhysics.collideGroupGroup = function (group1, group2, notifyCallback) {
                if (typeof notifyCallback === "undefined") { notifyCallback = null; }
                return ArcadePhysics.overlapsGroupGroup(group1, group2, notifyCallback, true);
            };

            ArcadePhysics.overlaps = function (gameObject1, gameObject2, notifyCallback, separateObjects) {
                if (typeof notifyCallback === "undefined") { notifyCallback = null; }
                if (typeof separateObjects === "undefined") { separateObjects = true; }
                var obj1Physics = gameObject1.components.getComponent("ArcadePhysics");

                return obj1Physics.overlaps(gameObject2, true);
            };

            ArcadePhysics.overlapsObjectGroup = function (gameObject, group, notifyCallback, separateObjects) {
                if (typeof notifyCallback === "undefined") { notifyCallback = null; }
                if (typeof separateObjects === "undefined") { separateObjects = true; }
                var objPhysics = gameObject.components.getComponent("ArcadePhysics");
                return objPhysics.overlapsGroup(group, separateObjects);
            };

            ArcadePhysics.overlapsGroupGroup = function (group1, group2, notifyCallback, separateObjects) {
                if (typeof notifyCallback === "undefined") { notifyCallback = null; }
                if (typeof separateObjects === "undefined") { separateObjects = true; }
                var result = false;
                var members = group1.members;
                var i = 0;
                while (i < group1.members.length) {
                    result = ArcadePhysics.overlapsObjectGroup(members[i++], group2, notifyCallback, separateObjects);
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
                var obj1delta = phys1.position.x() - phys1.last.x;
                var obj2delta = phys2.position.x() - phys2.last.x;
                if (obj1delta != obj2delta) {
                    var obj1deltaAbs = (obj1delta > 0) ? obj1delta : -obj1delta;
                    var obj2deltaAbs = (obj2delta > 0) ? obj2delta : -obj2delta;
                    var obj1rect = new Kiwi.Geom.Rectangle(phys1.position.x() - ((obj1delta > 0) ? obj1delta : 0), phys1.last.y, phys1.size.width() + ((obj1delta > 0) ? obj1delta : -obj1delta), phys1.size.height());
                    var obj2rect = new Kiwi.Geom.Rectangle(phys2.position.x() - ((obj2delta > 0) ? obj2delta : 0), phys2.last.y, phys2.size.width() + ((obj2delta > 0) ? obj2delta : -obj2delta), phys2.size.height());
                    if ((obj1rect.x + obj1rect.width > obj2rect.x) && (obj1rect.x < obj2rect.x + obj2rect.width) && (obj1rect.y + obj1rect.height > obj2rect.y) && (obj1rect.y < obj2rect.y + obj2rect.height)) {
                        var maxOverlap = obj1deltaAbs + obj2deltaAbs + ArcadePhysics.OVERLAP_BIAS;

                        if (obj1delta > obj2delta) {
                            overlap = phys1.position.x() + phys1.size.width() - phys2.position.x();
                            if ((overlap > maxOverlap) || !(phys1.allowCollisions & ArcadePhysics.RIGHT) || !(phys2.allowCollisions & ArcadePhysics.LEFT))
                                overlap = 0; else {
                                phys1.touching |= ArcadePhysics.RIGHT;
                                phys2.touching |= ArcadePhysics.LEFT;
                            }
                        } else if (obj1delta < obj2delta) {
                            overlap = phys1.position.x() - phys1.size.width() - phys2.position.x();
                            if ((-overlap > maxOverlap) || !(phys1.allowCollisions & ArcadePhysics.LEFT) || !(phys2.allowCollisions & ArcadePhysics.RIGHT))
                                overlap = 0; else {
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
                        phys1.position.x(phys1.position.x() - overlap);
                        phys2.position.x(phys2.position.x() + overlap);

                        var obj1velocity = Math.sqrt((obj2v * obj2v * phys2.mass) / phys1.mass) * ((obj2v > 0) ? 1 : -1);
                        var obj2velocity = Math.sqrt((obj1v * obj1v * phys1.mass) / phys2.mass) * ((obj1v > 0) ? 1 : -1);
                        var average = (obj1velocity + obj2velocity) * 0.5;
                        obj1velocity -= average;
                        obj2velocity -= average;
                        phys1.velocity.x = average + obj1velocity * phys1.elasticity;
                        phys2.velocity.x = average + obj2velocity * phys2.elasticity;
                    } else if (!obj1immovable) {
                        phys1.position.x(phys1.position.x() - overlap);
                        phys1.velocity.x = obj2v - obj1v * phys1.elasticity;
                    } else if (!obj2immovable) {
                        phys2.position.x(phys2.position.x() + overlap);
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

                var obj1delta = phys1.position.y() - phys1.last.y;

                var obj2delta = phys2.position.y() - phys2.last.y;
                if (obj1delta != obj2delta) {
                    var obj1deltaAbs = (obj1delta > 0) ? obj1delta : -obj1delta;
                    var obj2deltaAbs = (obj2delta > 0) ? obj2delta : -obj2delta;
                    var obj1rect = new Kiwi.Geom.Rectangle(phys1.position.x(), phys1.position.y() - ((obj1delta > 0) ? obj1delta : 0), phys1.size.width(), phys1.size.height() + obj1deltaAbs);
                    var obj2rect = new Kiwi.Geom.Rectangle(phys2.position.x(), phys2.position.y() - ((obj2delta > 0) ? obj2delta : 0), phys2.size.width(), phys2.size.height() + obj2deltaAbs);
                    if ((obj1rect.x + obj1rect.width > obj2rect.x) && (obj1rect.x < obj2rect.x + obj2rect.width) && (obj1rect.y + obj1rect.height > obj2rect.y) && (obj1rect.y < obj2rect.y + obj2rect.height)) {
                        var maxOverlap = obj1deltaAbs + obj2deltaAbs + ArcadePhysics.OVERLAP_BIAS;

                        if (obj1delta > obj2delta) {
                            overlap = phys1.position.y() + phys1.size.height() - phys2.position.y();
                            if ((overlap > maxOverlap) || !(phys1.allowCollisions & ArcadePhysics.DOWN) || !(phys2.allowCollisions & ArcadePhysics.UP)) {
                                overlap = 0;
                            } else {
                                phys1.touching |= ArcadePhysics.DOWN;
                                phys2.touching |= ArcadePhysics.UP;
                            }
                        } else if (obj1delta < obj2delta) {
                            overlap = phys1.position.y() - phys1.size.height() - phys2.position.y();
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
                        phys1.position.y(phys1.position.y() - overlap);
                        phys2.position.y(phys2.position.y() + overlap);

                        var obj1velocity = Math.sqrt((obj2v * obj2v * phys2.mass) / phys1.mass) * ((obj2v > 0) ? 1 : -1);
                        var obj2velocity = Math.sqrt((obj1v * obj1v * phys1.mass) / phys2.mass) * ((obj1v > 0) ? 1 : -1);
                        var average = (obj1velocity + obj2velocity) * 0.5;
                        obj1velocity -= average;
                        obj2velocity -= average;
                        phys1.velocity.y = average + obj1velocity * phys1.elasticity;
                        phys2.velocity.y = average + obj2velocity * phys2.elasticity;
                    } else if (!obj1immovable) {
                        phys1.position.y(phys1.position.y() - overlap);
                        phys1.velocity.y = obj2v - obj1v * phys1.elasticity;

                        if (object2.active && phys2.moves && (obj1delta > obj2delta))
                            phys1.position.x(phys1.position.x() + object2.x - phys2.last.x);
                    } else if (!obj2immovable) {
                        phys2.position.y(phys2.position.y() + overlap);
                        phys2.velocity.y = obj1v - obj2v * phys2.elasticity;

                        if (object1.active && phys1.moves && (obj1delta < obj2delta))
                            phys1.position.x(phys2.position.x() + object1.x - phys1.last.x);
                    }
                    return true;
                } else
                    return false;
            };

            ArcadePhysics.computeVelocity = function (velocity, acceleration, drag, max) {
                if (typeof acceleration === "undefined") { acceleration = 0; }
                if (typeof drag === "undefined") { drag = 0; }
                if (typeof max === "undefined") { max = 10000; }
                if (acceleration != 0)
                    velocity += acceleration * ArcadePhysics.updateInterval; else if (drag != 0) {
                    drag = drag * ArcadePhysics.updateInterval;
                    if (velocity - drag > 0)
                        velocity = velocity - drag; else if (velocity + drag < 0)
                        velocity += drag; else
                        velocity = 0;
                }
                if ((velocity != 0) && (max != 10000)) {
                    if (velocity > max)
                        velocity = max; else if (velocity < -max)
                        velocity = -max;
                }
                return velocity;
            };

            ArcadePhysics.prototype.overlaps = function (gameObject, separateObjects) {
                if (typeof separateObjects === "undefined") { separateObjects = false; }
                if (!gameObject.components.hasComponent("Size") || !gameObject.components.hasComponent("Position")) {
                    return false;
                }
                var objPosition = gameObject.components.getComponent("Position");
                var objSize = gameObject.components.getComponent("Size");

                var result = (objPosition.x() + objSize.width() > this.position.x()) && (objPosition.x() < this.position.x() + this.size.width()) && (objPosition.y() + objSize.height() > this.position.y()) && (objPosition.y() < this.position.y() + this.size.height());

                if (result && separateObjects) {
                    ArcadePhysics.separate(this._parent, gameObject);
                }

                return result;
            };

            ArcadePhysics.prototype.overlapsGroup = function (group, separateObjects) {
                if (typeof separateObjects === "undefined") { separateObjects = false; }
                var results = false;

                var childPhysics;
                for (var i = 0; i < group.members.length; i++) {
                    childPhysics = group.members[i].components._components["ArcadePhysics"];
                    childPhysics.overlaps(this._parent, true);
                }

                return results;
            };

            ArcadePhysics.prototype.updateMotion = function () {
                var delta;
                var velocityDelta;

                velocityDelta = (ArcadePhysics.computeVelocity(this.angularVelocity, this.angularAcceleration, this.angularDrag, this.maxAngular) - this.angularVelocity) / 2;
                this.angularVelocity += velocityDelta;
                this.angle += this.angularVelocity * ArcadePhysics.updateInterval;
                this.angularVelocity += velocityDelta;

                velocityDelta = (ArcadePhysics.computeVelocity(this.velocity.x, this.acceleration.x, this.drag.x, this.maxVelocity.x) - this.velocity.x) / 2;
                this.velocity.x += velocityDelta;
                delta = this.velocity.x * ArcadePhysics.updateInterval;
                this.velocity.x += velocityDelta;
                this.position.x(this.position.x() + delta);

                velocityDelta = (ArcadePhysics.computeVelocity(this.velocity.y, this.acceleration.y, this.drag.y, this.maxVelocity.y) - this.velocity.y) / 2;
                this.velocity.y += velocityDelta;
                delta = this.velocity.y * ArcadePhysics.updateInterval;
                this.velocity.y += velocityDelta;
                this.position.y(this.position.y() + delta);
            };

            ArcadePhysics.prototype.update = function () {
                this.last.x = this.position.x();
                this.last.y = this.position.y();

                if (this.moves)
                    this.updateMotion();

                this.wasTouching = this.touching;
                this.touching = ArcadePhysics.NONE;
            };
            ArcadePhysics.updateInterval = 1 / 10;

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
    (function (Components) {
        var Bounds = (function (_super) {
            __extends(Bounds, _super);
            function Bounds(x, y, width, height) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                if (typeof width === "undefined") { width = 0; }
                if (typeof height === "undefined") { height = 0; }
                _super.call(this, 'Bounds', true, true, true);
                this.showDebug = false;
                this.debugLineColor = 0xffff0000;

                this._rect = new Kiwi.Geom.Rectangle(x, y, width, height);
                this._AABB = new Kiwi.Geom.Rectangle(x, y, width, height);

                this.offsetX = 0;
                this.offsetY = 0;
                this.offsetWidth = 0;
                this.offsetHeight = 0;
            }
            Bounds.prototype.objType = function () {
                return "Bounds";
            };

            Bounds.prototype.pointWithin = function (point) {
                return this._rect.containsPoint(point);
            };

            Bounds.prototype.calculateBounds = function (transform, position, size) {
                var centerPoint = new Kiwi.Geom.Point(size.width() / 2, size.height() / 2);
                var topLeftPoint = new Kiwi.Geom.Point(0, 0);
                var bottomLeftPoint = new Kiwi.Geom.Point(0, size.height());
                var topRightPoint = new Kiwi.Geom.Point(size.width(), 0);
                var bottomRightPoint = new Kiwi.Geom.Point(size.width(), size.height());

                var posx = position.x();
                var posy = position.y();
                var ox = position.transformPoint().x;
                var oy = position.transformPoint().y;

                this._transformPoint(centerPoint, transform, posx, posy, ox, oy);
                this._transformPoint(topLeftPoint, transform, posx, posy, ox, oy);
                this._transformPoint(bottomLeftPoint, transform, posx, posy, ox, oy);
                this._transformPoint(topRightPoint, transform, posx, posy, ox, oy);
                this._transformPoint(bottomRightPoint, transform, posx, posy, ox, oy);

                var left = Math.min(topLeftPoint.x, topRightPoint.x, bottomRightPoint.x, bottomLeftPoint.x);
                var right = Math.max(topLeftPoint.x, topRightPoint.x, bottomRightPoint.x, bottomLeftPoint.x);
                var top = Math.min(topLeftPoint.y, topRightPoint.y, bottomRightPoint.y, bottomLeftPoint.y);
                var bottom = Math.max(topLeftPoint.y, topRightPoint.y, bottomRightPoint.y, bottomLeftPoint.y);

                this._AABB = new Kiwi.Geom.Rectangle(left, top, right - left, bottom - top);

                var sx = Math.abs(transform.scaleX());
                var sy = Math.abs(transform.scaleY());

                var ubW = (size.width() - this.offsetWidth) * sx;
                var ubH = (size.height() - this.offsetHeight) * sy;
                var ubX = (centerPoint.x - this.offsetX * sx) - ubW / 2;
                var ubY = (centerPoint.y - this.offsetY * sy) - ubH / 2;

                this._rect = new Kiwi.Geom.Rectangle(ubX, ubY, ubW, ubH);
            };

            Bounds.prototype._transformPoint = function (point, trans, x, y, ox, oy) {
                point.x -= ox;
                point.y -= oy;

                point = trans.transformPoint(point);

                point.x += ox + x;
                point.y += oy + y;
            };

            Bounds.prototype.getRect = function () {
                var rect = this._rect.clone();
                return rect;
            };

            Bounds.prototype.getOffsetRect = function () {
                var rect = this._rect.clone();
                rect.x += this.offsetX;
                rect.y += this.offsetY;
                rect.width += this.offsetWidth;
                rect.height += this.offsetHeight;

                return rect;
            };

            Bounds.prototype.getAABB = function () {
                var rect = this._AABB.clone();

                return rect;
            };

            Bounds.prototype.setTo = function (x, y, width, height) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                if (typeof width === "undefined") { width = 0; }
                if (typeof height === "undefined") { height = 0; }
                this._rect.setTo(x, y, width, height);
            };

            Bounds.prototype.setSize = function (width, height) {
                this._rect.setTo(this._rect.x, this._rect.y, width, height);
            };
            Bounds.prototype.setPosition = function (x, y) {
                this._rect.setTo(x, y, this._rect.width, this._rect.height);
            };

            Bounds.prototype.drawCanvasDebugOutline = function (layer) {
                if (layer.type === Kiwi.TYPE_CANVAS && this.showDebug === true) {
                    layer.canvas.context.strokeStyle = 'rgba(0, 255, 0, 0.8)';
                    layer.canvas.context.beginPath();
                    layer.canvas.context.rect(this._rect.x, this._rect.y, this._rect.width, this._rect.height);
                    layer.canvas.context.stroke();
                    layer.canvas.context.closePath();
                }
            };

            Bounds.prototype.toString = function () {
                return '[{Bounds (x=' + this._rect.x + ')}]';
            };
            return Bounds;
        })(Kiwi.Component);
        Components.Bounds = Bounds;
    })(Kiwi.Components || (Kiwi.Components = {}));
    var Components = Kiwi.Components;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Components) {
        var Color = (function (_super) {
            __extends(Color, _super);
            function Color(red, green, blue, alpha) {
                if (typeof red === "undefined") { red = 0; }
                if (typeof green === "undefined") { green = 0; }
                if (typeof blue === "undefined") { blue = 0; }
                if (typeof alpha === "undefined") { alpha = 1; }
                _super.call(this, 'Color', true, true, true);
                this._skipUpdate = false;

                this.updated = new Kiwi.Signal();

                this._skipUpdate = true;

                this.red(red);
                this.green(green);
                this.blue(blue);
                this.alpha(alpha);

                this._skipUpdate = false;

                this._processUpdate();
            }
            Color.prototype.objType = function () {
                return "Color";
            };

            Color.prototype.addStyleUpdates = function (entity) {
                if (entity === null) {
                    return;
                }

                if (Kiwi.DEVICE.ieVersion < 9) {
                    entity.addStyleUpdate('backgroundColor', this.cssColorHex);
                } else {
                    entity.addStyleUpdate('backgroundColor', this.cssColorRGBA);
                }
            };

            Color.prototype.addStyleImmediately = function (entity) {
                if (entity.domElement === null || entity.domElement.element === null) {
                    return;
                }

                if (Kiwi.DEVICE.ieVersion < 9) {
                    entity.domElement.element.style.backgroundColor = this.cssColorHex;
                } else {
                    entity.domElement.element.style.backgroundColor = this.cssColorRGBA;
                }
            };

            Color.prototype._processUpdate = function () {
                this.cssColorHex = '#' + this._colorToHexstring(this._red) + this._colorToHexstring(this._green) + this._colorToHexstring(this._blue);
                this.cssColorRGB = 'rgb(' + this._red + ',' + this._green + ',' + this._blue + ')';
                this.cssColorRGBA = 'rgba(' + this._red + ',' + this._green + ',' + this._blue + ',' + this._alpha + ')';
                this.dirty = true;

                this.updated.dispatch(this._red, this._green, this._blue, this._alpha, this.cssColorHex, this.cssColorRGB, this.cssColorRGBA);
            };

            Color.prototype.setRGBA = function (red, green, blue, alpha) {
                if (typeof red === "undefined") { red = 0; }
                if (typeof green === "undefined") { green = 0; }
                if (typeof blue === "undefined") { blue = 0; }
                if (typeof alpha === "undefined") { alpha = 1; }
                this._skipUpdate = true;

                this.red(red);
                this.green(green);
                this.blue(blue);
                this.alpha(alpha);

                this._skipUpdate = false;

                this._processUpdate();
            };

            Color.prototype.setColor = function (value) {
                this._skipUpdate = true;

                this._color = value;
                this.alpha((value >>> 24) / 255);
                this.red(value >> 16 & 0xFF);
                this.green(value >> 8 & 0xFF);
                this.blue(value & 0xFF);

                this._skipUpdate = false;

                this._processUpdate();
            };

            Color.prototype.getColor = function () {
                return this._color;
            };

            Color.prototype.red = function (value) {
                if (typeof value === "undefined") { value = null; }
                if (value !== null && value !== this._red) {
                    if (value >= 0 && value <= 255) {
                        this._red = value;

                        if (this._skipUpdate === false) {
                            this._processUpdate();
                        }
                    }
                }

                return this._red;
            };

            Color.prototype.green = function (value) {
                if (typeof value === "undefined") { value = null; }
                if (value !== null && value !== this._green) {
                    if (value >= 0 && value <= 255) {
                        this._green = value;

                        if (this._skipUpdate === false) {
                            this._processUpdate();
                        }
                    }
                }

                return this._green;
            };

            Color.prototype.blue = function (value) {
                if (typeof value === "undefined") { value = null; }
                if (value !== null && value !== this._blue) {
                    if (value >= 0 && value <= 255) {
                        this._blue = value;

                        if (this._skipUpdate === false) {
                            this._processUpdate();
                        }
                    }
                }

                return this._blue;
            };

            Color.prototype.alpha = function (value) {
                if (typeof value === "undefined") { value = null; }
                if (value !== null && value !== this._alpha) {
                    if (value >= 0 && value <= 1) {
                        this._alpha = value;

                        if (this._skipUpdate === false) {
                            this._processUpdate();
                        }
                    }
                }

                return this._alpha;
            };

            Color.prototype.setRandomColor = function (min, max, alpha) {
                if (typeof min === "undefined") { min = 0; }
                if (typeof max === "undefined") { max = 255; }
                if (typeof alpha === "undefined") { alpha = 1; }
                if (max > 255) {
                    klog.info("Color Warning: getRandomColor - max value too high");
                    this.setRGBA(255, 255, 255);
                }

                if (min > max) {
                    klog.info("Color Warning: getRandomColor - min value higher than max");
                    this.setRGBA(255, 255, 255);
                }

                var red = min + Math.round(Math.random() * (max - min));
                var green = min + Math.round(Math.random() * (max - min));
                var blue = min + Math.round(Math.random() * (max - min));

                this.setRGBA(red, green, blue, alpha);
            };

            Color.prototype._colorToHexstring = function (color) {
                var digits = "0123456789ABCDEF";

                var lsd = color % 16;
                var msd = (color - lsd) / 16;

                var hexified = digits.charAt(msd) + digits.charAt(lsd);

                return hexified;
            };
            return Color;
        })(Kiwi.Component);
        Components.Color = Color;
    })(Kiwi.Components || (Kiwi.Components = {}));
    var Components = Kiwi.Components;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Components) {
        var Input = (function (_super) {
            __extends(Input, _super);
            function Input(entity, bounds) {
                _super.call(this, 'Input', true, true, true);
                this._dragEnabled = false;
                this._dragSnapToCenter = false;

                this.inputEntered = new Kiwi.Signal();
                this.inputLeft = new Kiwi.Signal();
                this.inputOnDown = new Kiwi.Signal();
                this.inputOnRelease = new Kiwi.Signal();
                this.inputDragStarted = new Kiwi.Signal();
                this.inputDragStopped = new Kiwi.Signal();

                this._entity = entity;
                this._bounds = bounds;
                this.pointDown = new Kiwi.Geom.Point();

                this.distance = new Kiwi.Geom.Point();
                this.withinBounds = false;
                this.outsideBounds = true;
                this.isUp = true;
                this.isDown = false;
                this.isDragging = false;
            }
            Input.prototype.objType = function () {
                return "Input";
            };

            Input.prototype.enableDrag = function (snapToCenter, distance) {
                if (typeof snapToCenter === "undefined") { snapToCenter = false; }
                if (typeof distance === "undefined") { distance = 1; }
                this._dragEnabled = true;
                this._dragSnapToCenter = snapToCenter;
                this._dragDistance = distance;
                this.isDragging = false;
            };

            Input.prototype.disableDrag = function () {
                this._dragEnabled = false;
                this.isDragging = false;
            };

            Input.prototype.update = function () {
                if (!this._entity.game || this._entity.active() === false || this._entity.willRender() === false) {
                    return;
                }

                if (this._bounds.pointWithin(this._entity.game.input.position)) {
                    this.distance.x = this._entity.game.input.position.x - this._bounds.getRect().left();
                    this.distance.y = this._entity.game.input.position.y - this._bounds.getRect().top();

                    if (this.withinBounds === false) {
                        this.withinBounds = true;
                        this.outsideBounds = false;
                        this.inputEntered.dispatch(this._entity, this.distance.x, this.distance.y);
                    }
                } else {
                    if (this.withinBounds === true) {
                        this.withinBounds = false;
                        this.outsideBounds = true;
                        this.inputLeft.dispatch(this._entity);
                    }
                }

                if (this._entity.game.input.isDown === true) {
                    if (this.withinBounds === true && this.isDown === false) {
                        this.isDown = true;
                        this.isUp = false;
                        this.pointDown.copyFrom(this.distance);
                        this.inputOnDown.dispatch(this._entity, this.pointDown.x, this.pointDown.y);
                    }

                    if (this._dragEnabled === true && this.isDragging === false) {
                        if (this.isDown === true && this.pointDown.distanceTo(this.distance) >= this._dragDistance) {
                            this.isDragging = true;

                            if (this._dragSnapToCenter === true) {
                                this._bounds.getRect().center(this.pointDown);
                            }

                            this.inputDragStarted.dispatch(this._entity, this.pointDown.x, this.pointDown.y, this._dragSnapToCenter);
                        }
                    }
                } else {
                    if (this.isDragging === true) {
                        this.isDragging = false;
                        this.inputDragStopped.dispatch(this._entity);
                    }

                    if (this.isDown === true) {
                        this.isDown = false;
                        this.isUp = true;
                        this.inputOnRelease.dispatch(this._entity);
                    }
                }
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
        (function (Motions) {
            var LinearMotion = (function () {
                function LinearMotion(sx, sy, ex, ey, duration, delay, ease) {
                    this.mx = 0;
                    this.my = 0;
                    this.sx = sx;
                    this.sy = sy;

                    this.ex = ex;
                    this.ey = ey;
                    this.duration = duration;
                    this.delay = delay;
                    this.ease = ease;
                    this.running = false;

                    this.onStarted = new Kiwi.Signal();
                    this.onCompleted = new Kiwi.Signal();
                }
                LinearMotion.prototype.objType = function () {
                    return "LinerMotion";
                };

                LinearMotion.prototype.refreshXY = function (x, y) {
                    this.sx = x;
                    this.sy = y;
                };

                LinearMotion.prototype.start = function (time, units) {
                    this.startTime = time + (this.delay / units);
                    this.duration = this.duration / units;

                    klog.info('motion will start at ' + this.startTime + ' current: ' + time + ' units: ' + units);
                };

                LinearMotion.prototype.update = function (time) {
                    if (time < this.startTime) {
                        return false;
                    } else {
                        if (this.running === false) {
                            this.running = true;
                            this.onStarted.dispatch(this);
                            this.ex = this.ex - this.sx;
                            this.ey = this.ey - this.sy;
                        }
                    }

                    this.elapsed = (time - this.startTime) / this.duration;

                    if (this.elapsed >= 1) {
                        this.elapsed = 1;
                        this.mx = this.ex;
                        this.my = this.ey;
                        this.onCompleted.dispatch(this);
                        return false;
                    } else {
                        this.value = this.ease(this.elapsed);
                        this.mx = this.sx + (this.ex * this.value);
                        this.my = this.sy + (this.ey * this.value);
                        return true;
                    }
                };
                return LinearMotion;
            })();
            Motions.LinearMotion = LinearMotion;
        })(Components.Motions || (Components.Motions = {}));
        var Motions = Components.Motions;
    })(Kiwi.Components || (Kiwi.Components = {}));
    var Components = Kiwi.Components;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Components) {
        var Motion = (function (_super) {
            __extends(Motion, _super);
            function Motion(position) {
                _super.call(this, 'Motion', true, true, true);
                this._motions = [];

                this._clock = null;
                this._position = position;
                this._motions = [];
            }
            Motion.prototype.objType = function () {
                return "Motion";
            };

            Motion.prototype.setClock = function (clock) {
                this._clock = clock;

                for (var i = 0; i < this._motions.length; i++) {
                    if (this._motions[i].delay > 0) {
                        this._motions[i].onStarted.add(this._motionStarted, this);
                    }

                    this._motions[i].onCompleted.add(this._motionCompleted, this);
                    this._motions[i].start(this._clock.elapsed(), this._clock.units);
                    klog.info('motion started from setClock');
                }
            };

            Motion.prototype._motionCompleted = function (motionObject) {
                var i = this._motions.indexOf(motionObject);

                if (i !== -1) {
                    this._motions.splice(i, 1);
                }
            };

            Motion.prototype._motionStarted = function (motionObject) {
                motionObject.refreshXY(this._position.x(), this._position.y());
            };

            Motion.prototype.move = function (x, y, duration, delay, ease) {
                if (typeof duration === "undefined") { duration = 1000; }
                if (typeof delay === "undefined") { delay = 0; }
                if (typeof ease === "undefined") { ease = Kiwi.Tweens.Easing.Linear.None; }
                klog.info('motion move');

                var temp = new Kiwi.Components.Motions.LinearMotion(this._position.x(), this._position.y(), x, y, duration, delay, ease);

                this._motions.push(temp);

                if (this._clock) {
                    if (delay > 0) {
                        temp.onStarted.add(this._motionStarted, this);
                    }

                    temp.onCompleted.add(this._motionCompleted, this);
                    temp.start(this._clock.elapsed(), this._clock.units);
                    klog.info('motion started from move');
                }
            };

            Motion.prototype.update = function () {
                if (this._clock) {
                    for (var i = 0; i < this._motions.length; i++) {
                        if (this._motions[i].update(this._clock.elapsed()) === true) {
                            this._position.setTo(this._motions[i].mx, this._motions[i].my);
                        }
                    }
                }
            };

            Motion.prototype.toString = function () {
                return '[{Motion (x=' + ')}]';
            };
            return Motion;
        })(Kiwi.Component);
        Components.Motion = Motion;
    })(Kiwi.Components || (Kiwi.Components = {}));
    var Components = Kiwi.Components;
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
    (function (Components) {
        var Position = (function (_super) {
            __extends(Position, _super);
            function Position(x, y, z) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                if (typeof z === "undefined") { z = 0; }
                _super.call(this, 'Position', true, true, true);
                this._oldX = 0;
                this._oldY = 0;
                this._oldZ = 0;
                this.differenceX = 0;
                this.differenceY = 0;
                this.differenceZ = 0;
                this.autoRound = true;
                this._wrap = null;

                this.updated = new Kiwi.Signal();

                x = Math.round(x);
                y = Math.round(y);
                z = Math.round(z);

                this._point = new Kiwi.Geom.Point(x, y);
                this._offset = new Kiwi.Geom.Point();
                this._transformPoint = new Kiwi.Geom.Point();
                this._z = z;

                this._processUpdate();
            }
            Position.prototype.objType = function () {
                return "Position";
            };

            Position.prototype.enableWrap = function (x, y, width, height) {
                if (this._wrap === null) {
                    this._wrap = new Kiwi.Geom.Rectangle();
                }

                this._wrap.setTo(x, y, width, height);
            };

            Position.prototype.disableWrap = function () {
                this._wrap = null;
            };

            Position.prototype.addStyleUpdates = function (entity) {
                if (entity === null) {
                    return;
                }

                if (Kiwi.DEVICE.css3D) {
                    this.entity.addStyleUpdate("-webkit-transform-origin", this._transformPoint.x + "px " + this._transformPoint.y + "px");

                    entity.addStyleTransformUpdate("translate", this.cssTranslate3d);
                } else {
                    entity.addStyleUpdate('left', this.cssLeft);
                    entity.addStyleUpdate('top', this.cssTop);
                }
            };

            Position.prototype.addStyleImmediately = function (entity) {
                if (entity.domElement === null || entity.domElement.element === null) {
                    return;
                }

                if (Kiwi.DEVICE.css3D) {
                    this.entity.addStyleTransformUpdate("translate", this.cssTranslate3d);
                    this.entity.addStyleUpdate("-webkit-transform-origin", this._transformPoint.x + "px " + this._transformPoint.y + "px");
                    this.entity.applyTransformStyle();
                } else {
                    entity.domElement.element.style.left = this.cssLeft;
                    entity.domElement.element.style.top = this.cssTop;
                }
            };

            Position.prototype._processUpdate = function () {
                this._point = this._point.addTo(this._offset.x, this._offset.y);

                if (this._wrap !== null && this._wrap.containsPoint(this._point) === false) {
                    this._point.x = Kiwi.Utils.GameMath.wrap(this._point.x, this._wrap.right(), this._wrap.x);
                    this._point.y = Kiwi.Utils.GameMath.wrap(this._point.y, this._wrap.bottom(), this._wrap.y);
                }

                this.differenceX = Kiwi.Utils.GameMath.difference(this._oldX, this._point.x);
                this.differenceY = Kiwi.Utils.GameMath.difference(this._oldY, this._point.y);
                this.differenceZ = Kiwi.Utils.GameMath.difference(this._oldZ, this._z);

                if (!this.autoRound) {
                    if (this._oldX > this._point.x)
                        this.differenceX = -this.differenceX;
                    if (this._oldY > this._point.y)
                        this.differenceY = -this.differenceY;
                    if (this._oldZ > this._z)
                        this.differenceZ = -this.differenceZ;
                }

                this.cssTranslate3d = 'translate3d(' + this._point.x + 'px, ' + this._point.y + 'px, ' + this._z + 'px)';
                this.cssLeft = this._point.x + 'px';
                this.cssTop = this._point.y + 'px';

                this.dirty = true;

                this.updated.dispatch(this._point.x, this._point.y, this._z, this.cssTranslate3d, this.cssLeft, this.cssTop);
            };

            Position.prototype.x = function (value) {
                if (typeof value === "undefined") { value = null; }
                if (value !== null && value !== this._point.x) {
                    if (this.autoRound) {
                        value = Math.round(value);
                    }

                    this._storeOldPosition();
                    this._point.x = value;
                    this._processUpdate();
                }

                return this._point.x;
            };

            Position.prototype.y = function (value) {
                if (typeof value === "undefined") { value = null; }
                if (value !== null && value !== this._point.y) {
                    if (this.autoRound) {
                        value = Math.round(value);
                    }

                    this._storeOldPosition();
                    this._point.y = value;
                    this._processUpdate();
                }

                return this._point.y;
            };

            Position.prototype.z = function (value) {
                if (typeof value === "undefined") { value = null; }
                if (value !== null && value !== this._z) {
                    if (this.autoRound) {
                        value = Math.round(value);
                    }

                    this._storeOldPosition();
                    this._z = value;
                    this._processUpdate();
                }

                return this._z;
            };

            Position.prototype.addTo = function (x, y, z) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                if (typeof z === "undefined") { z = 0; }
                this._storeOldPosition();
                this._point.addTo(x, y);
                this._z += z;
                this._processUpdate();
            };

            Position.prototype._storeOldPosition = function () {
                this._oldX = this._point.x;
                this._oldY = this._point.y;
                this._oldZ = this._z;
            };

            Position.prototype.subtractFrom = function (x, y, z) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                if (typeof z === "undefined") { z = 0; }
                this._storeOldPosition();
                this._point.subtractFrom(x, y);
                this._z -= z;
                this._processUpdate();
            };

            Position.prototype.equals = function (x, y) {
                if (this._point.x === x && this._point.y === y) {
                    return true;
                }

                return false;
            };

            Position.prototype.setTo = function (x, y, z) {
                if (typeof z === "undefined") { z = 0; }
                if (this._point.x !== x || this._point.y !== y || this._z !== z) {
                    if (this.autoRound) {
                        x = Math.round(x);
                        y = Math.round(y);
                        z = Math.round(z);
                    }

                    this._storeOldPosition();
                    this._point.setTo(x, y);
                    this._z = z;
                    this._processUpdate();
                }
            };

            Position.prototype.setOffset = function (x, y) {
                if (this._offset.x !== x || this._offset.y !== y) {
                    if (this.autoRound) {
                        x = Math.round(x);
                        y = Math.round(y);
                    }

                    this._offset.setTo(x, y);
                    this._processUpdate();
                }
            };

            Position.prototype.setPositionFromPoint = function (point) {
                if (this._point.x !== point.x || this._point.y !== point.y) {
                    this._storeOldPosition();
                    this._point.copyFrom(point);
                    this._processUpdate();
                }
            };

            Position.prototype.transformPoint = function (point) {
                if (point) {
                    this._transformPoint.copyFrom(point);
                    this._processUpdate();
                }

                return this._transformPoint;
            };

            Position.prototype.getPositionAsPoint = function (output) {
                if (typeof output === "undefined") { output = new Kiwi.Geom.Point(); }
                return output.copyFrom(this._point);
            };

            Position.prototype.toString = function () {
                return '[{Position (x=' + this._point.x + ' y=' + this._point.y + ' z=' + this._z + ')}]';
            };
            return Position;
        })(Kiwi.Component);
        Components.Position = Position;
    })(Kiwi.Components || (Kiwi.Components = {}));
    var Components = Kiwi.Components;
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
    (function (Components) {
        var Rotation = (function (_super) {
            __extends(Rotation, _super);
            function Rotation(angle) {
                if (typeof angle === "undefined") { angle = 0; }
                _super.call(this, 'Rotation', true, true, true);

                this.updated = new Kiwi.Signal();

                this._angleDegrees = Kiwi.Utils.GameMath.wrapAngle(angle);
                this._angleRadians = Kiwi.Utils.GameMath.degreesToRadians(this._angleDegrees);

                this._processUpdate();
            }
            Rotation.prototype.objType = function () {
                return "Rotation";
            };

            Rotation.prototype.addStyleUpdates = function (entity) {
                if (entity === null) {
                    return;
                }

                if (Kiwi.DEVICE.css3D) {
                    entity.addStyleTransformUpdate("rotate", this.cssRotate3d);
                } else {
                    entity.addStyleUpdate('less-super', this.cssRotate3d);
                }
            };

            Rotation.prototype.addStyleImmediately = function (entity) {
                if (entity.domElement === null || entity.domElement.element === null) {
                    return;
                }

                if (Kiwi.DEVICE.css3D) {
                    this.entity.addStyleTransformUpdate("rotate", this.cssRotate3d);
                    this.entity.applyTransformStyle();
                } else {
                }
            };

            Rotation.prototype._processUpdate = function () {
                this.cssRotate3d = 'rotate(' + this._angleDegrees + 'deg)';

                this.dirty = true;

                this.updated.dispatch(this._angleDegrees, this.cssRotate3d);
            };

            Rotation.prototype.angle = function (value) {
                if (typeof value === "undefined") { value = null; }
                if (value !== null) {
                    this._angleDegrees = Kiwi.Utils.GameMath.wrapAngle(value);
                    this._angleRadians = Kiwi.Utils.GameMath.degreesToRadians(this._angleDegrees);
                }
                this._processUpdate();
                return this._angleDegrees;
            };

            Rotation.prototype.radians = function (value) {
                if (typeof value === "undefined") { value = null; }
                if (value !== null) {
                    this._angleDegrees = Kiwi.Utils.GameMath.wrapAngle(Kiwi.Utils.GameMath.radiansToDegrees(value));
                    this._angleRadians = Kiwi.Utils.GameMath.degreesToRadians(this._angleDegrees);
                }
                this._processUpdate();
                return this._angleRadians;
            };

            Rotation.prototype.rotateClockwise = function (value) {
                this.angle(this._angleDegrees + value);
                this._processUpdate();
            };

            Rotation.prototype.rotateCounterClockwise = function (value) {
                this.angle(this._angleDegrees - value);
                this._processUpdate();
            };

            Rotation.prototype.pointUp = function () {
                this.angle(-90);
                this._processUpdate();
            };

            Rotation.prototype.pointDown = function () {
                this.angle(90);
                this._processUpdate();
            };

            Rotation.prototype.pointLeft = function () {
                this.angle(180);
                this._processUpdate();
            };

            Rotation.prototype.pointRight = function () {
                this.angle(0);
                this._processUpdate();
            };

            Rotation.prototype.toString = function () {
                return "[{Rotation (angle=" + this._angleDegrees + " radians=" + this._angleRadians + ")}]";
            };
            return Rotation;
        })(Kiwi.Component);
        Components.Rotation = Rotation;
    })(Kiwi.Components || (Kiwi.Components = {}));
    var Components = Kiwi.Components;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Components) {
        var Scale = (function (_super) {
            __extends(Scale, _super);
            function Scale(x, y, z) {
                if (typeof x === "undefined") { x = 1; }
                if (typeof y === "undefined") { y = 1; }
                if (typeof z === "undefined") { z = 1; }
                _super.call(this, 'Scale', true, true, true);

                this.updated = new Kiwi.Signal();

                this.setXYZ(x, y, z);

                this._processUpdate();
            }
            Scale.prototype.objType = function () {
                return "Scale";
            };

            Scale.prototype.x = function (value) {
                if (typeof value === "undefined") { value = null; }
                if (value !== null) {
                    this._x = value;
                }

                this._processUpdate();
                return this._x;
            };

            Scale.prototype.y = function (value) {
                if (typeof value === "undefined") { value = null; }
                if (value !== null) {
                    this._y = value;
                }
                this._processUpdate();
                return this._y;
            };

            Scale.prototype.setXY = function (x, y) {
                if (typeof x === "undefined") { x = 1; }
                if (typeof y === "undefined") { y = 1; }
                this._x = x;
                this._y = y;
                this._processUpdate();
            };

            Scale.prototype.setXYZ = function (x, y, z) {
                if (typeof x === "undefined") { x = 1; }
                if (typeof y === "undefined") { y = 1; }
                if (typeof z === "undefined") { z = 1; }
                this._x = x;
                this._y = y;
                this._z = z;
                this._processUpdate();
            };

            Scale.prototype.addStyleUpdates = function (entity) {
                if (entity === null) {
                    return;
                }

                if (Kiwi.DEVICE.css3D) {
                    entity.addStyleTransformUpdate("scale", this.cssScale3d);
                } else {
                }
            };

            Scale.prototype.addStyleImmediately = function (entity) {
                if (entity.domElement === null || entity.domElement.element === null) {
                    return;
                }

                if (Kiwi.DEVICE.css3D) {
                    this.entity.addStyleTransformUpdate("scale", this.cssScale3d);
                    this.entity.applyTransformStyle();
                } else {
                }
            };

            Scale.prototype._processUpdate = function () {
                this.dirty = true;

                this.cssScale3d = 'scale(' + this._x + ',' + this._y + ')';

                this.updated.dispatch(this._x, this._y);
            };

            Scale.prototype.setCSS = function (element) {
                return element;
            };

            Scale.prototype.invert = function () {
                if (this._x === this._y) {
                    return;
                } else {
                    this.setXY(this._y, this._x);
                }
            };

            Scale.prototype.setScaleFromPoint = function (point) {
                this.setXY(point.x, point.y);
            };

            Scale.prototype.getScaleAsPoint = function (output) {
                if (typeof output === "undefined") { output = new Kiwi.Geom.Point(); }
                return output.setTo(this._x, this._y);
            };

            Scale.prototype.toString = function () {
                return '[{Scale (x=' + this._x + ' y=' + this._y + ')}]';
            };
            return Scale;
        })(Kiwi.Component);
        Components.Scale = Scale;
    })(Kiwi.Components || (Kiwi.Components = {}));
    var Components = Kiwi.Components;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Components) {
        var Size = (function (_super) {
            __extends(Size, _super);
            function Size(width, height) {
                if (typeof width === "undefined") { width = 0; }
                if (typeof height === "undefined") { height = 0; }
                _super.call(this, 'Size', true, true, true);
                this._width = 0;
                this._height = 0;
                this.halfWidth = 0;
                this.halfHeight = 0;

                this.updated = new Kiwi.Signal();

                this.setTo(width, height);
            }
            Size.prototype.objType = function () {
                return "Size";
            };

            Size.prototype.width = function (value) {
                if (typeof value === "undefined") { value = null; }
                if (value !== null && value > 0) {
                    this._width = value;
                    this._processUpdate();
                }

                return this._width;
            };

            Size.prototype.height = function (value) {
                if (typeof value === "undefined") { value = null; }
                if (value !== null && value > 0) {
                    this._height = value;
                    this._processUpdate();
                }

                return this._height;
            };

            Size.prototype.inflate = function (value) {
                if (value !== null && value > 0) {
                    this._width += value;
                    this._height += value;
                    this._processUpdate();
                }
            };

            Size.prototype.deflate = function (value) {
                if (value !== null && value > 0) {
                    this._width -= value;
                    this._height -= value;
                    this._processUpdate();
                }
            };

            Size.prototype._processUpdate = function () {
                this.aspectRatio = this._width / this._height;
                this.dirty = true;
                this.cssWidth = this._width + 'px';
                this.cssHeight = this._height + 'px';
                this.halfWidth = Math.round(this._width / 2);
                this.halfHeight = Math.round(this._height / 2);
                this.updated.dispatch(this._width, this._height);
            };

            Size.prototype.setTo = function (width, height) {
                if (width > 0 && height > 0) {
                    this.width(width);
                    this.height(height);
                }
            };

            Size.prototype.addStyleUpdates = function (entity) {
                if (entity === null) {
                    return;
                }

                entity.addStyleUpdate('width', this.cssWidth);
                entity.addStyleUpdate('height', this.cssHeight);
            };

            Size.prototype.addStyleImmediately = function (entity) {
                if (entity.domElement === null || entity.domElement.element === null) {
                    return;
                }

                entity.domElement.element.style.width = this.cssWidth;
                entity.domElement.element.style.height = this.cssHeight;
            };

            Size.prototype.setCSS = function (element) {
                element.style.width = this.cssWidth;
                element.style.height = this.cssHeight;

                return element;
            };

            Size.prototype.toString = function () {
                return '[{Size (width=' + this._width + ' height=' + this._height + ')}]';
            };
            return Size;
        })(Kiwi.Component);
        Components.Size = Size;
    })(Kiwi.Components || (Kiwi.Components = {}));
    var Components = Kiwi.Components;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    var File = (function () {
        function File(dataType, path, cacheID, saveToCache, cache) {
            if (typeof cacheID === "undefined") { cacheID = ''; }
            if (typeof saveToCache === "undefined") { saveToCache = false; }
            if (typeof cache === "undefined") { cache = null; }
            this._saveToCache = true;
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
                klog.info('blob support found - using blob loader');
                this._useTagLoader = false;
            } else {
                klog.info('blob support NOT found - using tag loader');
                this._useTagLoader = true;
            }

            this._saveToCache = saveToCache;
            this._cache = cache;

            if (this.cacheID === '') {
                this.cacheID = this.fileName;
            } else {
                this.cacheID = cacheID;
            }

            klog.info('New Kiwi.File: ' + this.toString());
        }
        File.prototype.objType = function () {
            return "File";
        };

        File.prototype.load = function (onCompleteCallback, onProgressCallback, customCache, maxLoadAttempts, timeout) {
            if (typeof onCompleteCallback === "undefined") { onCompleteCallback = null; }
            if (typeof onProgressCallback === "undefined") { onProgressCallback = null; }
            if (typeof customCache === "undefined") { customCache = null; }
            if (typeof maxLoadAttempts === "undefined") { maxLoadAttempts = 1; }
            if (typeof timeout === "undefined") { timeout = 2000; }
            this.onCompleteCallback = onCompleteCallback;
            this.onProgressCallback = onProgressCallback;
            this.maxLoadAttempts = maxLoadAttempts;
            this.timeOutDelay = timeout;

            if (customCache !== null) {
                this._cache = customCache;
                this._saveToCache = true;
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
            if (this.dataType === Kiwi.File.IMAGE || this.dataType === Kiwi.File.SPRITE_SHEET || this.dataType === Kiwi.File.TEXTURE_ATLAS) {
                this.data = new Image();
            }

            this.data.onload = function (event) {
                return _this.tagLoaderOnLoad(event);
            };
            this.data.onerror = function (event) {
                return _this.tagLoaderOnError(event);
            };
            this.data.onreadystatechange = function (event) {
                return _this.tagLoaderOnReadyStateChange(event);
            };
            this.data.src = this.fileURL;
        };

        File.prototype.tagLoaderOnReadyStateChange = function (event) {
            klog.info('rs: ' + this.data.readyState);
            klog.info('tagLoader onReadyStateChange', event);
        };

        File.prototype.tagLoaderOnError = function (event) {
            klog.info('tagLoader onError', event);

            this.hasError = true;
            this.error = event;

            if (this.onCompleteCallback) {
                this.onCompleteCallback(this);
            }
        };

        File.prototype.tagLoaderOnLoad = function (event) {
            this.stop();

            if (this._saveToCache === true) {
                this._cache.addFile(this.cacheID, this);
            }

            if (this.onCompleteCallback) {
                this.onCompleteCallback(this);
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
            klog.info('xhrOnAbort', event);
        };

        File.prototype.xhrOnError = function (event) {
            klog.info('xhrOnError', event);
        };

        File.prototype.xhrOnTimeout = function (event) {
            klog.info('xhrOnTimeout', event);
        };

        File.prototype.xhrOnProgress = function (event) {
            klog.info('xhrOnProgress', event);

            this.bytesLoaded = parseInt(event.loaded);
            this.bytesTotal = parseInt(event.totalSize);
            this.percentLoaded = Math.round((this.bytesLoaded / this.bytesTotal) * 100);

            klog.info(this.fileName + ' = ' + this.bytesLoaded + ' / ' + this.bytesTotal);

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
                console.log("XHR SUCCESS");
                this.success = true;
                this.hasError = false;
                this.fileType = this._xhr.getResponseHeader('Content-Type');
                this.bytesTotal = parseInt(this._xhr.getResponseHeader('Content-Length'));
                this.lastModified = this._xhr.getResponseHeader('Last-Modified');
                this.ETag = this._xhr.getResponseHeader('ETag');
                this.buffer = this._xhr.response;

                if (this.dataType === Kiwi.File.IMAGE || this.dataType === Kiwi.File.SPRITE_SHEET || this.dataType === Kiwi.File.TEXTURE_ATLAS) {
                    this.createBlob();
                } else {
                    if (this.dataType === Kiwi.File.JSON) {
                        this.data = String.fromCharCode.apply(null, new Uint8Array(this._xhr.response));
                    }

                    this.parseComplete();
                }
            } else {
                this.success = false;
                this.hasError = true;
                this.parseComplete();
            }
        };

        File.prototype.createBlob = function () {
            var _this = this;
            klog.info('creating blob');

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
            klog.info('revoking');

            if (window['URL']) {
                window['URL'].revokeObjectURL(this.data.src);
            } else if (window['webkitURL']) {
                window['webkitURL'].revokeObjectURL(this.data.src);
            }

            this.parseComplete();
        };

        File.prototype.parseComplete = function () {
            klog.info('parse complete');

            if (this._saveToCache === true) {
                klog.info('saving to cache', this._cache, this.cacheID);
                this._cache.addFile(this.cacheID, this);
            }

            if (this.onCompleteCallback) {
                this.onCompleteCallback(this);
            }
        };

        File.prototype.getFileDetails = function (callback, maxLoadAttempts, timeout) {
            if (typeof callback === "undefined") { callback = null; }
            if (typeof maxLoadAttempts === "undefined") { maxLoadAttempts = 1; }
            if (typeof timeout === "undefined") { timeout = 2000; }
            klog.info('Getting File Details of ' + this.fileURL);

            this.onCompleteCallback = callback;
            this.maxLoadAttempts = maxLoadAttempts;
            this.timeOutDelay = timeout;

            this.sendXHRHeadRequest();
        };

        File.prototype.sendXHRHeadRequest = function () {
            var _this = this;
            klog.info('xhr send');

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
            klog.info('on XHR timeout', event);

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
            klog.info('on XHR error', event);

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

            klog.info('xhr response ' + this.status, this.statusText);

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

        File.prototype.saveToCache = function (value) {
            if (value) {
                this._saveToCache = value;
            }

            return this._saveToCache;
        };

        File.prototype.cache = function (value) {
            if (typeof value === "undefined") { value = null; }
            if (value !== null) {
                this._cache = value;
            }

            return this._cache;
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
    Kiwi.File = File;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    var FileCache = (function () {
        function FileCache() {
            this._cacheSize = 0;
            this._files = {};
        }
        FileCache.prototype.objType = function () {
            return "FileCache";
        };

        FileCache.prototype.getFile = function (key) {
            return this._files[key];
        };

        FileCache.prototype.size = function () {
            return this._cacheSize;
        };

        FileCache.prototype.addFile = function (key, value) {
            if (!this._files[key]) {
                this._files[key] = value;
                this._cacheSize++;
                return true;
            }

            return false;
        };

        FileCache.prototype.exists = function (key) {
            if (this._files[key]) {
                return true;
            } else {
                return false;
            }
        };

        FileCache.prototype.removeFile = function (key) {
            if (this._files[key]) {
                this._files[key] = null;
                delete this._files[key];
                return true;
            }

            return false;
        };
        return FileCache;
    })();
    Kiwi.FileCache = FileCache;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    var Cache = (function () {
        function Cache(game) {
            this.images = null;
            this.audio = null;
            this.data = null;
            this._game = game;
        }
        Cache.prototype.objType = function () {
            return "Cache";
        };

        Cache.prototype.boot = function () {
            this._caches = [];

            this._caches.push(new Kiwi.FileCache());
            this._caches.push(new Kiwi.FileCache());
            this._caches.push(new Kiwi.FileCache());

            this.images = this._caches[0];
            this.audio = this._caches[1];
            this.data = this._caches[2];
        };

        Cache.prototype.checkImageCacheID = function (cacheID, cache) {
            if (cacheID == '' || cache === null || cache.images === null || cache.images.exists(cacheID) === false) {
                klog.warn('Texture cannot be extracted from the cache. Invalid cacheID or cache given.', cacheID);
                return false;
            }

            return true;
        };

        Cache.prototype.checkDataCacheID = function (cacheID, cache) {
            if (cacheID == '' || cache === null || cache.images === null || cache.data.exists(cacheID) === false) {
                klog.warn('Data cannot be extracted from the cache. Invalid cacheID or cache given.', cacheID);
                return false;
            }

            return true;
        };
        return Cache;
    })();
    Kiwi.Cache = Cache;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Components) {
        var Texture = (function (_super) {
            __extends(Texture, _super);
            function Texture(cacheID, cache) {
                _super.call(this, 'Texture', true, true, true);
                this.file = null;

                if (!this._setTexture(cacheID, cache))
                    return;

                this.position = new Kiwi.Components.Position();
                this.size = new Kiwi.Components.Size(this.file.data.width, this.file.data.height);
                this._repeat = Kiwi.Components.Texture.REPEAT_NONE;
                this.ready = true;

                this.updatedRepeat = new Kiwi.Signal();
                this.updated = new Kiwi.Signal();
            }
            Texture.prototype.changeTexture = function (cacheID, cache) {
                if (!this._setTexture(cacheID, cache))
                    return;

                this.size.setTo(this.file.data.width, this.file.data.height);
                this.ready = true;

                this.updated.dispatch(this.getURL(), this.file.data.width, this.file.data.height);
            };

            Texture.prototype._setTexture = function (cacheID, cache) {
                if (cacheID == '' || cache === null || cache.images === null || cache.images.exists(cacheID) === false) {
                    klog.warn('Texture cannot be extracted from the cache. Invalid cacheID or cache given.', cacheID);
                    this.ready = false;
                    return;
                }
                this.cacheID = cacheID;
                this.file = cache.images.getFile(cacheID);
                this.image = this.file.data;

                return true;
            };

            Texture.prototype.objType = function () {
                return "Texture";
            };

            Texture.prototype.repeat = function (value) {
                if (typeof value === "undefined") { value = null; }
                if (value !== null && this._repeat !== value) {
                    this._repeat = value;
                    this.updatedRepeat.dispatch(value);
                }

                return this._repeat;
            };

            Texture.prototype.setCSS = function (element) {
                element.style.backgroundImage = 'url("' + this.getURL() + '")';
                element.style.backgroundRepeat = this._repeat;
            };

            Texture.prototype.getURL = function () {
                return this.file.fileURL;
            };

            Texture.prototype.toString = function () {
                return '[{Texture (cacheID=' + this.cacheID + ' url=' + this.getURL() + ' repeat=' + this._repeat + ')}]';
            };
            Texture.REPEAT_NONE = 'no-repeat';

            Texture.REPEAT_X = 'repeat-x';

            Texture.REPEAT_Y = 'repeat-y';

            Texture.REPEAT_BOTH = 'repeat';
            return Texture;
        })(Kiwi.Component);
        Components.Texture = Texture;
    })(Kiwi.Components || (Kiwi.Components = {}));
    var Components = Kiwi.Components;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Components) {
        var Visible = (function (_super) {
            __extends(Visible, _super);
            function Visible(value) {
                if (typeof value === "undefined") { value = true; }
                _super.call(this, 'Visible', true, true, true);

                this.updated = new Kiwi.Signal();

                this.visible(value);
            }
            Visible.prototype.objType = function () {
                return "Visible";
            };

            Visible.prototype.visible = function (value) {
                if (typeof value === "undefined") { value = null; }
                if (value !== null && value !== this._visible) {
                    this._visible = value;

                    if (value === true) {
                        this.cssVisibility = 'visible';
                    } else {
                        this.cssVisibility = 'hidden';
                    }

                    this.dirty = true;
                    this.updated.dispatch(this._visible, this.cssVisibility);
                }

                return this._visible;
            };

            Visible.prototype.addStyleUpdates = function (entity) {
                if (entity === null) {
                    return;
                }

                entity.addStyleUpdate('visibility', this.cssVisibility);
            };

            Visible.prototype.addStyleImmediately = function (entity) {
                if (entity.domElement === null || entity.domElement.element === null) {
                    return;
                }

                entity.domElement.element.style.visibility = this.cssVisibility;
            };

            Visible.prototype.setCSS = function (element) {
                element.style.visibility = this.cssVisibility;

                return element;
            };

            Visible.prototype.toString = function () {
                return '[{Visibility (value=' + this.cssVisibility + ')}]';
            };
            return Visible;
        })(Kiwi.Component);
        Components.Visible = Visible;
    })(Kiwi.Components || (Kiwi.Components = {}));
    var Components = Kiwi.Components;
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
    (function (Particles) {
        var Particle = (function () {
            function Particle(position, velocity, lifespan) {
                this._position = position;
                this._velocity = velocity;
                this.lifespan = lifespan;
                this.age = Date.now();
                this._dampen = Particle.DEFAULT_DAMPEN;
                this.birthTime = Date.now();
            }
            Particle.prototype.objType = function () {
                return "Particle";
            };

            Particle.prototype.position = function () {
                return this._position;
            };

            Particle.prototype.normalAge = function () {
                return this._normalAge;
            };

            Particle.generate = function (position, velocity, lifespan) {
                var p = new Particle(position, velocity, lifespan);

                return p;
            };

            Particle.prototype.update = function (time, force) {
                this.age = time - this.birthTime;
                if (this.age > this.lifespan)
                    return false;
                this._normalAge = 1 / this.lifespan * this.age;

                if (force)
                    this._velocity = this._velocity.add(force);

                this._velocity = this._velocity.multiplyScalar(this._dampen);

                this._position.x += this._velocity.x;
                this._position.y += this._velocity.y;
                return true;
            };
            Particle.DEFAULT_DAMPEN = 1;
            return Particle;
        })();
        Particles.Particle = Particle;
    })(Kiwi.Particles || (Kiwi.Particles = {}));
    var Particles = Kiwi.Particles;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Particles) {
        var ParticleSpriteSheet = (function () {
            function ParticleSpriteSheet(image, frames, rows, cols, frameWidth, frameHeight) {
                this.image = image;
                this.frames = frames;
                this.rows = rows;
                this.cols = cols;
                this.frameWidth = frameWidth;
                this.frameHeight = frameHeight;
                this._currentFrameIndex = -1;
            }
            ParticleSpriteSheet.prototype.objType = function () {
                return "ParticleSpriteSheet";
            };

            ParticleSpriteSheet.prototype.currentFrameIndex = function (value) {
                if (value !== undefined) {
                    this._currentFrameIndex = value;
                    if (this._currentFrameIndex >= this.frames)
                        this._currentFrameIndex = 0;
                }

                return this._currentFrameIndex;
            };

            ParticleSpriteSheet.prototype.getFramePos = function (frameNumber) {
                var col = frameNumber % this.cols;
                var row = Math.floor(frameNumber / this.cols);

                return new Kiwi.Geom.Vector2(col * this.frameWidth, row * this.frameHeight);
            };
            return ParticleSpriteSheet;
        })();
        Particles.ParticleSpriteSheet = ParticleSpriteSheet;
    })(Kiwi.Particles || (Kiwi.Particles = {}));
    var Particles = Kiwi.Particles;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Particles) {
        var Circle = (function () {
            function Circle(radius) {
                console.log("ParticleShape => Circle:construct");

                this.radius = radius;
            }
            Circle.prototype.objType = function () {
                return "ParticleSystemShapes";
            };

            Circle.prototype.getPositionArea = function (offset) {
                var off = offset || new Kiwi.Geom.Vector2();
                var ang = Math.random() * Math.PI * 2;
                var x = Math.random() * this.radius * Math.cos(ang);
                var y = Math.random() * this.radius * Math.sin(ang);

                var pos = new Kiwi.Geom.Vector2(x, y);
                pos = pos.add(off);
                return pos;
            };

            Circle.prototype.getPositionEdge = function (offset) {
                var off = offset || new Kiwi.Geom.Vector2();
                var ang = Math.random() * Math.PI * 2;
                var x = this.radius * Math.cos(ang);
                var y = this.radius * Math.sin(ang);

                var pos = new Kiwi.Geom.Vector2(x, y);
                pos = pos.add(off);
                return pos;
            };
            return Circle;
        })();
        Particles.Circle = Circle;

        var Rect = (function () {
            function Rect(width, height) {
                this.width = width;
                this.height = height;
            }
            Rect.prototype.getPositionArea = function (offset) {
                var pos = offset || new Kiwi.Geom.Vector2();
                pos.x += Math.random() * this.width - this.width / 2;
                pos.y += Math.random() * this.height - this.height / 2;

                return pos;
            };

            Rect.prototype.getPositionEdge = function (offset) {
                var pos = offset || new Kiwi.Geom.Vector2();
                var perim = this.height * 2 + this.width * 2;
                var rand = Math.random() * perim;

                if (rand > 0 && rand < this.width) {
                    pos.y -= this.height / 2;
                    pos.x += rand - this.width / 2;
                    return pos;
                } else if (rand >= this.width && rand < this.width + this.height) {
                    pos.x += this.width / 2;
                    pos.y += rand - this.width - this.height / 2;
                    return pos;
                } else if (rand >= (this.width + this.height) && rand < (this.width * 2 + this.height)) {
                    pos.y += this.height / 2;
                    pos.x += rand - this.width - this.height - this.width / 2;
                    return pos;
                } else {
                    pos.x -= this.width / 2;
                    pos.y += rand - this.width - this.width - this.height - this.height / 2;
                    return pos;
                }
            };
            return Rect;
        })();
        Particles.Rect = Rect;
    })(Kiwi.Particles || (Kiwi.Particles = {}));
    var Particles = Kiwi.Particles;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Particles) {
        var ParticleRenderer = (function () {
            function ParticleRenderer(particleSystem) {
            }
            ParticleRenderer.prototype.objType = function () {
                return "ParticleRenderer";
            };

            ParticleRenderer.prototype.particleSystem = function (value) {
                if (value !== undefined) {
                    this._particleSystem = value;
                    this.particles = this._particleSystem.particles();
                }
                return this._particleSystem;
            };

            ParticleRenderer.prototype.render = function (contextInfo) {
            };
            return ParticleRenderer;
        })();
        Particles.ParticleRenderer = ParticleRenderer;
    })(Kiwi.Particles || (Kiwi.Particles = {}));
    var Particles = Kiwi.Particles;
})(Kiwi || (Kiwi = {}));
var Geom = Kiwi.Geom;
var Kiwi;
(function (Kiwi) {
    (function (Particles) {
        var ParticleSystem = (function () {
            function ParticleSystem(numParticles, systemType, mode) {
                this._systemType = systemType;
                this.position = new Kiwi.Geom.Vector2();
                if (mode !== undefined) {
                    this.mode = mode;
                } else {
                    mode = ParticleSystem.DEFAULT_MODE;
                }

                this._numParticles = numParticles;
                this._particlesEmmitted = 0;
                this._particlesExhausted = 0;
                this._particles = new Array();
                this.particleGenerator = Kiwi.Particles.Particle;

                this.shape = new Particles.Rect(100, 0);
                this.constrainToEdge(true);
                this._spawnFunction = this.shape.getPositionArea;

                this.velocityShape = new Particles.Circle(2);
                this.velocityBase = ParticleSystem.DEFAULT_PARTICLE_VELOCITY;
                this.velocityFromPosMultiplier = 1;
                this.gravity = 0;
                this.wind = new Kiwi.Geom.Vector2();

                this.particleLifespan = ParticleSystem.DEFAULT_PARTICLE_LIFESPAN;
                this.spawnRate = ParticleSystem.DEFAULT_SPAWN_RATE;
                this.completedEmitting = false;
                this.exhausted = false;
                this._lastSpawnTime = Date.now();
                this.pause = true;

                console.log("mode is " + this.mode);
            }
            ParticleSystem.prototype.objType = function () {
                return "ParticleSystem";
            };

            ParticleSystem.prototype.systemType = function () {
                return this._systemType;
            };

            ParticleSystem.prototype.particles = function () {
                return this._particles;
            };

            ParticleSystem.prototype.numParticles = function (value) {
                if (value !== undefined) {
                    this._numParticles = value;
                }

                return this._numParticles;
            };

            ParticleSystem.prototype.constrainToEdge = function (value) {
                if (value !== undefined) {
                    this._constrainToEdge = value;
                }
                return this._constrainToEdge;
            };

            ParticleSystem.prototype.reset = function (start) {
                if (typeof start === "undefined") { start = true; }
                this._particlesEmmitted = 0;
                this._particlesExhausted = 0;

                this.completedEmitting = false;
                this.exhausted = false;
                this._lastSpawnTime = Date.now();
                this.pause = true;
                if (start)
                    this.start();
            };

            ParticleSystem.prototype.start = function (precook) {
                this.pause = false;
                if (precook) {
                    for (var i = 0; i < this._numParticles; i++) {
                        var particle = this.spawn();
                        var reverseTime = Math.random() * this.particleLifespan;
                        particle.birthTime -= reverseTime;
                    }
                }
                return this;
            };

            ParticleSystem.prototype.spawn = function () {
                if (!(this.mode == ParticleSystem.CONTINUOUS) && this._particlesEmmitted >= this._numParticles) {
                    this.completedEmitting = true;
                }

                if (this._particles.length < this._numParticles && !this.completedEmitting) {
                    var pos = this._spawnFunction.call(this.shape);

                    var vel;
                    if (this.calcVelocityFromPos) {
                        if (this.velocityFromPosVector) {
                            vel = new Kiwi.Geom.Vector2(pos.x, pos.y);
                            vel = vel.unit();
                        } else {
                            vel = new Kiwi.Geom.Vector2(pos.x * this.velocityFromPosMultiplier, pos.y * this.velocityFromPosMultiplier);
                        }
                    } else {
                        vel = this.velocityShape.getPositionArea();
                    }
                    vel.x += this.velocityBase.x;
                    vel.y += this.velocityBase.y;

                    pos.x += this.position.x;
                    pos.y += this.position.y;

                    var particle = this.particleGenerator.generate(pos, vel, this.particleLifespan);

                    this._particles.push(particle);

                    this._particlesEmmitted += 1;

                    return particle;
                } else {
                    return null;
                }
            };

            ParticleSystem.prototype.update = function (time, force) {
                force = force || new Kiwi.Geom.Vector2();
                force.x += this.wind.x;
                force.y += this.wind.y + this.gravity;
                if (!this.pause) {
                    if (time - this._lastSpawnTime > this.spawnRate) {
                        this._lastSpawnTime = Date.now();
                        this.spawn();
                    }
                    for (var i = this._particles.length - 1; i >= 0; i--) {
                        if (!this._particles[i].update(time, force)) {
                            this._particles.splice(i, 1);
                            this._particlesExhausted++;
                        }
                    }
                }

                if (!(this.mode == ParticleSystem.CONTINUOUS) && this._particlesExhausted >= this._numParticles) {
                    this.exhausted = true;

                    if (this.onExhausted)
                        this.onExhausted();
                }

                if (this.exhausted && this.mode == ParticleSystem.PULSE)
                    this.reset(true);
            };

            ParticleSystem.prototype.render = function (contextInfo) {
                this.particleRenderer.render(contextInfo);
            };
            ParticleSystem.CANVAS_GEOM_SYSTEM = "CANVAS_GEOM_SYSTEM";

            ParticleSystem.CANVAS_BITMAP_SYSTEM = "CANVAS_BITMAP_SYSTEM";

            ParticleSystem.UNDEFINED_SYSTEM = "UNDEFINED_SYSTEM";

            ParticleSystem.ONCE = 0;

            ParticleSystem.PULSE = 1;

            ParticleSystem.CONTINUOUS = 2;

            ParticleSystem.DEFAULT_MODE = 2;

            ParticleSystem.DEFAULT_SPAWN_RATE = 300;

            ParticleSystem.DEFAULT_PARTICLE_LIFESPAN = 1500;

            ParticleSystem.DEFAULT_PARTICLE_VELOCITY = new Kiwi.Geom.Vector2(0, 0);
            return ParticleSystem;
        })();
        Particles.ParticleSystem = ParticleSystem;
    })(Kiwi.Particles || (Kiwi.Particles = {}));
    var Particles = Kiwi.Particles;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Anims) {
        var Frame = (function () {
            function Frame(x, y, width, height) {
                this.rotated = false;
                this.rotationDirection = 'cw';
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;

                this.rotated = false;
                this.trimmed = false;
            }
            Frame.prototype.objType = function () {
                return "Frame";
            };

            Frame.prototype.setRotation = function (rotated, rotationDirection) {
            };

            Frame.prototype.setTrim = function (trimmed, actualWidth, actualHeight, destX, destY, destWidth, destHeight) {
            };

            Frame.prototype.update = function () {
            };
            return Frame;
        })();
        Anims.Frame = Frame;
    })(Kiwi.Anims || (Kiwi.Anims = {}));
    var Anims = Kiwi.Anims;
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
    (function (Anims) {
        var Animation = (function () {
            function Animation(name, file, frames, playSpeed, repeat) {
                this._clock = null;
                this._playPendingState = false;
                this.name = name;
                this.file = file;

                this._frames = frames;
                this._frameIndex = 0;
                this._speed = playSpeed;
                this._length = frames.length;
                this._repeat = repeat;
                this._isPlaying = true;

                this.currentFrame = this.getFrame(this._frameIndex);
            }
            Animation.prototype.objType = function () {
                return "Animation";
            };

            Animation.prototype.clock = function (value) {
                if (typeof value === "undefined") { value = null; }
                if (value !== null) {
                    this._clock = value;

                    if (this._playPendingState === true) {
                        this._playPendingState = false;
                        this._startTime = this._clock.elapsed();
                        this._tick = this._startTime + this._speed;
                        this._frameIndex = 0;
                        this.currentFrame = this.getFrame(this._frameIndex);
                    }
                }

                return this._clock;
            };

            Animation.prototype.setFrame = function (value) {
                this._frameIndex = value;
                this.currentFrame = this.getFrame(this._frameIndex);
            };

            Animation.prototype.speed = function (value) {
                if (typeof value === "undefined") { value = null; }
                if (value !== null) {
                    this._speed = value;
                }

                return this._speed;
            };

            Animation.prototype.frameIndex = function () {
                return this._frameIndex;
            };

            Animation.prototype.length = function () {
                return this._length;
            };

            Animation.prototype.play = function () {
                this._isPlaying = true;

                if (this._clock === null) {
                    this._playPendingState = true;
                } else {
                    this._startTime = this._clock.elapsed();
                    this._tick = this._startTime + this._speed;
                    this._frameIndex = 0;
                    this.currentFrame = this.getFrame(this._frameIndex);
                }
            };

            Animation.prototype.pause = function () {
            };

            Animation.prototype.resume = function () {
                this._isPlaying = true;
            };

            Animation.prototype.stop = function () {
                this._isPlaying = false;
            };

            Animation.prototype.update = function () {
                if (this._playPendingState) {
                } else if (this._clock.elapsed() >= this._tick) {
                    this._tick = this._clock.elapsed() + this._speed;
                    if (this._isPlaying) {
                        this._frameIndex++;

                        if (this._frameIndex === this._length && this._repeat != Kiwi.Anims.PLAY_ONCE) {
                            this._frameIndex = 0;
                        } else if (this._frameIndex === this._length && this._repeat == Kiwi.Anims.PLAY_ONCE) {
                            this._frameIndex = this._length - 1;
                            this.stop();
                        }
                    }
                    this.currentFrame = this.getFrame(this._frameIndex);
                }
            };

            Animation.prototype.renderToCanvas = function (layer, x, y) {
                layer.canvas.context.drawImage(this.file.data, this.currentFrame.x, this.currentFrame.y, this.currentFrame.width, this.currentFrame.height, x, y, this.currentFrame.width, this.currentFrame.height);
            };

            Animation.prototype.drawFrameToCanvasLayer = function (layer, frameNumber, x, y) {
                var frame = this.getFrame(frameNumber);

                if (frame !== null) {
                    layer.canvas.context.drawImage(this.file.data, frame.x, frame.y, frame.width, frame.height, x, y, frame.width, frame.height);
                }
            };

            Animation.prototype.frameExists = function (value) {
                if (value <= this._length) {
                    return true;
                }

                return false;
            };

            Animation.prototype.getFrame = function (value) {
                if (this.frameExists(value)) {
                    return this._frames[value];
                }

                return null;
            };

            Animation.prototype.isPlaying = function () {
                return this._isPlaying;
            };
            return Animation;
        })();
        Anims.Animation = Animation;
    })(Kiwi.Anims || (Kiwi.Anims = {}));
    var Anims = Kiwi.Anims;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Anims) {
        (function (Formats) {
            var SpriteSheet = (function () {
                function SpriteSheet() {
                }
                SpriteSheet.prototype.objType = function () {
                    return "SpriteSheet";
                };

                SpriteSheet.prototype.getFrameData = function (cacheID, cache, frameWidth, frameHeight) {
                    var width = cache.getFile(cacheID).data.width;
                    var height = cache.getFile(cacheID).data.height;

                    var row = Math.round(width / frameWidth);
                    var column = Math.round(height / frameHeight);
                    var total = row * column;

                    if (width == 0 || height == 0 || width < frameWidth || height < frameHeight || total === 0) {
                        return null;
                    }

                    var data = new Kiwi.Anims.FrameData(cacheID, cache);

                    var x = 0;
                    var y = 0;

                    for (var i = 0; i < total; i++) {
                        data.addFrame(new Anims.Frame(x, y, frameWidth, frameHeight));

                        x += frameWidth;

                        if (x === width) {
                            x = 0;
                            y += frameHeight;
                        }
                    }

                    return data;
                };
                return SpriteSheet;
            })();
            Formats.SpriteSheet = SpriteSheet;
        })(Anims.Formats || (Anims.Formats = {}));
        var Formats = Anims.Formats;
    })(Kiwi.Anims || (Kiwi.Anims = {}));
    var Anims = Kiwi.Anims;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Anims) {
        var FrameData = (function () {
            function FrameData(cacheID, cache) {
                this.cacheID = cacheID;
                this.cache = cache;
                this._frames = [];
            }
            FrameData.prototype.objType = function () {
                return "FrameData";
            };

            FrameData.prototype.addFrame = function (frame) {
                this._frames.push(frame);
            };

            FrameData.prototype.getFrame = function (frame) {
                return this._frames[frame];
            };

            FrameData.prototype.getFrameRange = function (start, end) {
                var output = [];

                for (var i = start; i <= end; i++) {
                    output.push(this._frames[i]);
                }

                return output;
            };

            FrameData.prototype.getAllFrames = function () {
                return this._frames;
            };

            FrameData.prototype.getFrames = function (range) {
                var output = [];

                for (var i = 0; i < range.length; i++) {
                    var f = range[i];
                    output.push(this._frames[f]);
                }

                return output;
            };
            return FrameData;
        })();
        Anims.FrameData = FrameData;
    })(Kiwi.Anims || (Kiwi.Anims = {}));
    var Anims = Kiwi.Anims;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Anims) {
        Anims.PLAY_ONCE = 0;
        Anims.PLAY_LOOP = 1;
        Anims.PLAY_BOUNCE = 2;

        var Manager = (function () {
            function Manager(game) {
                this._game = game;
            }
            Manager.prototype.objType = function () {
                return "Manager";
            };

            Manager.prototype.boot = function () {
                klog.info('Animations booted');

                this._data = {};

                this._spriteSheet = new Kiwi.Anims.Formats.SpriteSheet();
            };

            Manager.prototype.getSpriteSheetFrames = function (cacheID, cache, frameWidth, frameHeight) {
                return this._spriteSheet.getFrameData(cacheID, cache, frameWidth, frameHeight);
            };

            Manager.prototype.removeSpriteSheet = function (name) {
                if (this._data[name]) {
                    delete this._data[name];
                    return true;
                }

                return false;
            };

            Manager.prototype.prepareTextureAtlas = function () {
            };

            Manager.prototype.prepareBoneData = function () {
            };
            return Manager;
        })();
        Anims.Manager = Manager;
    })(Kiwi.Anims || (Kiwi.Anims = {}));
    var Anims = Kiwi.Anims;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    var Camera = (function () {
        function Camera(game, id, name, x, y, width, height) {
            this._compositeCanvasCreated = false;
            this.fitToStage = true;
            this._game = game;
            this.id = id;
            this.name = name;
            this.components = new Kiwi.ComponentManager(Kiwi.CAMERA, this);

            this.size = new Kiwi.Components.Size(width, height);
            this.position = new Kiwi.Components.Position(x, y);

            this.components.add(this.size);
            this.components.add(this.position);

            if (Kiwi.DEVICE.canvas) {
                this._createCompositeCanvas();
            } else {
                klog.warn("Canvas is not supported - no canvas was created on camera " + name);
            }

            this._game.stage.size.updated.add(this._updatedStageSize, this);

            this.size.updated.add(this._updatedSize, this);

            klog.info('Created Camera ' + this.id);
        }
        Camera.prototype.objType = function () {
            return "Camera";
        };

        Camera.prototype._createCompositeCanvas = function () {
            this._compositeCanvas = document.createElement("canvas");
            this._ctx = this._compositeCanvas.getContext("2d");

            this._compositeCanvas.id = this._game.id + "compositeCanvas";

            this._compositeCanvas.style.position = "absolute";

            this._resizeCompositeCanvas();

            this._game.stage.canvasLayers.appendChild(this._compositeCanvas);
            this._compositeCanvasCreated = true;
        };

        Camera.prototype._resizeCompositeCanvas = function () {
            this._compositeCanvas.width = this.size.width();
            this._compositeCanvas.height = this.size.height();
        };

        Camera.prototype._updatedStageSize = function (width, height) {
            this.size.setTo(width, height);
            this._resizeCompositeCanvas();
        };

        Camera.prototype._updatedSize = function (width, height) {
            this._game.stage.domLayersMask.style.width = width + "px";
            this._game.stage.domLayersMask.style.height = height + "px";
            this._resizeCompositeCanvas();
            for (var i = 0; i < this._game.layers.layers.length; i++) {
                var layer = this._game.layers.layers[i];
                layer.domContainer.style.width = width + "px";
                layer.domContainer.style.height = height + "px";
            }
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
            this.components.update();
        };

        Camera.prototype.render = function () {
            if (this._compositeCanvasCreated) {
                this._compositeCanvas.width = this.size.width();
                var layer;
                for (var i = 0; i < this._game.layers.layers.length; i++) {
                    layer = this._game.layers.layers[i];

                    if (layer.type === Kiwi.TYPE_CANVAS) {
                        this._ctx.drawImage(layer.canvas.domElement, 0, 0, this.size.width(), this.size.height(), 0, 0, this.size.width(), this.size.height());
                    }
                }
            }
        };
        return Camera;
    })();
    Kiwi.Camera = Camera;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    var CameraManager = (function () {
        function CameraManager(game, multiCameraMode) {
            klog.info('Layer Manager created');

            this._game = game;

            this._cameras = [];

            this._nextCameraID = 0;

            this._multiCameraMode = multiCameraMode;
        }
        CameraManager.prototype.objType = function () {
            return "CameraManager";
        };

        CameraManager.prototype.multiCameraMode = function (val) {
            if (val !== undefined) {
                this._multiCameraMode = val;
            }
            return this._multiCameraMode;
        };

        CameraManager.prototype.boot = function (domCamera) {
            this.create("defaultCamera", 0, 0, this._game.stage.size.width(), this._game.stage.size.height());

            this.defaultCamera = this._cameras[0];
            this._domCamera = domCamera;
        };

        CameraManager.prototype.create = function (name, x, y, width, height) {
            if (this._multiCameraMode === false && this._cameras.length > 0) {
                klog.error("Cannot add additional cameras in single camera mode. You can create other cameras assign them as default.");
                return null;
            }

            var newCamera = new Kiwi.Camera(this._game, this._nextCameraID++, name, x, y, width, height);

            this._cameras.push(newCamera);

            return newCamera;
        };

        CameraManager.prototype.remove = function (camera) {
            klog.info('Remove camera');

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

            if (!this._multiCameraMode) {
                this._cameras[0].update();

                this._domCamera.style.left = (-this._cameras[0].position.x()) + "px";
                this._domCamera.style.top = (-this._cameras[0].position.y()) + "px";

                for (var i = 0; i < this._game.layers.layers.length; i++) {
                    var layer = this._game.layers.layers[i];
                }

                this._game.layers.offsetCanvasLayers(this._cameras[0].position.x(), this._cameras[0].position.y());

                return;
            } else {
                for (var i = 0; i < this._cameras.length; i++) {
                    this._cameras[i].update();
                }
            }
        };

        CameraManager.prototype.render = function () {
            if (this._cameras.length === 0) {
                return false;
            }

            for (var i = 0; i < this._cameras.length; i++) {
                this._game.layers.render(this._cameras[i]);

                this._cameras[i].render();
            }
        };

        CameraManager.prototype.removeAll = function () {
            this._cameras.length = 0;
            klog.info('TODO removeAll');
        };
        return CameraManager;
    })();
    Kiwi.CameraManager = CameraManager;
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
            klog.info('Device DOM boot');

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
    Kiwi.Device = Device;
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
            klog.info('StateConfig created', name);

            this._state = parent;
            this.name = name;

            this.populate();
        }
        StateConfig.prototype.objType = function () {
            return "StateConfig";
        };

        StateConfig.prototype.populate = function () {
            klog.info('populate StateConfig');

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
                klog.info('If there are no init or create functions, then we consider the state already initialised');
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
    var State = (function () {
        function State(name) {
            this.game = null;
            this.members = [];
            klog.debug('----------- State created: ' + name + ' -----------');

            this.config = new Kiwi.StateConfig(this, name);
            this.cache = new Kiwi.Cache(this.game);
            this.components = new Kiwi.ComponentManager(Kiwi.STATE, this);
        }
        State.prototype.objType = function () {
            return "State";
        };

        State.prototype.boot = function () {
            klog.info('State booted: ', this.config.name);

            this.cache.boot();

            klog.info('Current Layer: ' + this.game.layers.currentLayer);

            this.currentLayer = this.game.layers.currentLayer;
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
                if (this.members[i].active() === true) {
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
                if (this.members[i].active() === true) {
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
            } else {
                klog.warn('State default type can only be changed in init()');
            }
        };

        State.prototype.swapLayer = function (layer) {
            this.currentLayer = layer;
        };

        State.prototype.addImage = function (cacheID, url, globalCache) {
            if (typeof globalCache === "undefined") { globalCache = true; }
            if (globalCache === true) {
                this.game.loader.addImage(cacheID, url, this.game.cache.images);
            } else {
                this.game.loader.addImage(cacheID, url, this.cache.images);
            }
        };

        State.prototype.addJSON = function (cacheID, url, globalCache) {
            if (typeof globalCache === "undefined") { globalCache = true; }
            if (globalCache === true) {
                this.game.loader.addJSON(cacheID, url, this.game.cache.data);
            } else {
                this.game.loader.addJSON(cacheID, url, this.cache.data);
            }
        };

        State.prototype.addSpriteSheet = function (cacheID, url, frameWidth, frameHeight, globalCache) {
            if (typeof globalCache === "undefined") { globalCache = true; }
            if (globalCache === true) {
                this.game.loader.addSpriteSheet(cacheID, url, frameWidth, frameHeight, this.game.cache.images);
            } else {
                this.game.loader.addSpriteSheet(cacheID, url, frameWidth, frameHeight, this.cache.images);
            }
        };

        State.prototype.addChild = function (child, layer) {
            if (typeof layer === "undefined") { layer = null; }
            child.modify(Kiwi.ADDED_TO_STATE, this);

            this.members.push(child);

            if (layer !== null) {
                layer.add(child);
            } else {
                this.currentLayer.add(child);
            }

            return child;
        };

        State.prototype.removeChild = function (child, layer) {
            if (typeof layer === "undefined") { layer = null; }
            child.modify(Kiwi.REMOVED_FROM_STATE, this);

            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].id === child.id) {
                    this.members.slice(i, 1);

                    if (layer !== null) {
                        layer.remove(child);
                    } else {
                        this.currentLayer.remove(child);
                    }
                    return true;
                }
            }

            return false;
        };

        State.prototype.destroy = function () {
            for (var i = 0; i < this.members.length; i++) {
                this.members[i].destroy();
            }
        };
        return State;
    })();
    Kiwi.State = State;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    var Entity = (function () {
        function Entity(supportsCanvas, supportsDOM, supportsWebGL) {
            this.game = null;
            this.state = null;
            this.name = '';
            this.type = Kiwi.TYPE_UNASSIGNED;
            this.layer = null;
            this.parent = null;
            this.domElement = null;
            this.domElementType = 'div';
            this._cssStack = {};
            this._cssTransformStack = {};
            this._clock = null;
            this._supportsCanvas = supportsCanvas;
            this._supportsDOM = supportsDOM;
            this._supportsWebGL = supportsWebGL;

            this._exists = true;
            this._active = true;
            this._willRender = true;
            this.components = new Kiwi.ComponentManager(Kiwi.ENTITY, this);

            this.onAddedToGroup = new Kiwi.Signal();
            this.onAddedToLayer = new Kiwi.Signal();
            this.onAddedToState = new Kiwi.Signal();
            this.onRemovedFromGroup = new Kiwi.Signal();
            this.onRemovedFromLayer = new Kiwi.Signal();
            this.onRemovedFromState = new Kiwi.Signal();
        }
        Entity.prototype.objType = function () {
            return "Entity";
        };

        Entity.prototype.modify = function (action, parent) {
            if (action === Kiwi.ADDED_TO_GROUP) {
                return this._addedToGroup(parent);
            } else if (action === Kiwi.ADDED_TO_LAYER) {
                return this._addedToLayer(parent);
            } else if (action === Kiwi.ADDED_TO_STATE) {
                return this._addedToState(parent);
            } else if (action === Kiwi.REMOVED_FROM_GROUP) {
                return this._removedFromGroup(parent);
            } else if (action === Kiwi.REMOVED_FROM_LAYER) {
                return this._removedFromLayer(parent);
            } else if (action === Kiwi.REMOVED_FROM_STATE) {
                return this._removedFromState(parent);
            }
        };

        Entity.prototype.exists = function (value) {
            if (value !== undefined) {
                this._exists = value;
            }

            return this._exists;
        };

        Entity.prototype.active = function (value) {
            if (value !== undefined) {
                this._active = value;
            }

            return this._active;
        };

        Entity.prototype.willRender = function (value) {
            if (value) {
                this._willRender = value;
            }

            return this._willRender;
        };

        Entity.prototype.inputEnabled = function (value) {
            if (value) {
                this._inputEnabled = value;
            }

            return this._inputEnabled;
        };

        Entity.prototype.clock = function (value) {
            if (typeof value === "undefined") { value = null; }
            if (value !== null) {
                this._clock = value;
            }

            return this._clock;
        };

        Entity.prototype.supportsType = function (type) {
            if (type === Kiwi.TYPE_UNASSIGNED) {
                return true;
            }

            if (type === Kiwi.TYPE_CANVAS && this._supportsCanvas) {
                return true;
            }

            if (type === Kiwi.TYPE_DOM && this._supportsDOM) {
                return true;
            }

            if (type === Kiwi.TYPE_WEBGL && this._supportsWebGL) {
                return true;
            }

            return false;
        };

        Entity.prototype.isGroup = function () {
            return false;
        };

        Entity.prototype._addedToLayer = function (layer) {
            if (this.layer !== null) {
                klog.warn('Entity already exists on Layer ' + this.layer.id);

                return false;
            } else {
                if (this.supportsType(layer.type) === true) {
                    this.layer = layer;
                    this.type = this.layer.type;

                    if (layer.game !== null) {
                        this.game = layer.game;

                        if (this._clock === null) {
                            this._clock = this.game.time.clock;
                        }
                    }

                    if (this.type === Kiwi.TYPE_DOM && this.domElement === null) {
                        this.layer.domCache.assignElement(this);
                    }

                    this.onAddedToLayer.dispatch(this, this.layer);

                    return true;
                } else {
                    klog.warn('Warning - Entity does not support Layer of this type: ' + layer.type);
                    return false;
                }
            }
        };

        Entity.prototype._removedFromLayer = function (layer) {
            this.layer = null;

            if (this.domElement) {
                this.domElement.unlink();
                this.domElement = null;
            }

            this.type = Kiwi.TYPE_UNASSIGNED;

            this.onRemovedFromLayer.dispatch(this, layer);
        };

        Entity.prototype._addedToState = function (state) {
            klog.info('Entity added to State');

            this.state = state;

            this.game = this.state.game;

            if (this._clock === null) {
                this._clock = this.game.time.clock;
            }

            this.id = this.game.rnd.uuid();

            this.onAddedToState.dispatch(this, this.state);

            return true;
        };

        Entity.prototype._removedFromState = function (state) {
            klog.info('Entity removed from State');

            this.state = null;

            this.game = null;

            this.onAddedToState.dispatch(this, state);
        };

        Entity.prototype._addedToGroup = function (group) {
            klog.info('Entity added to Group');

            if (this.parent === group || this.supportsType(group.type) === false) {
                klog.warn('Entity.addedToGroup() called but parent already set or type not supported');
                return;
            } else {
                this.type = group.type;
            }

            if (this.parent !== null) {
                this.parent.removeChild(this);
            }

            this.parent = group;

            if (group.game !== null) {
                this.game = group.game;

                if (this._clock === null) {
                    this._clock = this.game.time.clock;
                }
            }

            this.onAddedToGroup.dispatch(this, group);

            if (this.parent.layer !== null) {
                this._addedToLayer(this.parent.layer);
            }
        };

        Entity.prototype._removedFromGroup = function (group) {
            klog.info('Entity removed from Group');

            if (this.parent !== null) {
            }

            this.parent = null;

            if (this.type === Kiwi.TYPE_DOM && this.domElement !== null) {
                this.domElement.unlink();
            }

            this.onRemovedFromGroup.dispatch(this, group);
        };

        Entity.prototype._changedPosition = function (group, index) {
            klog.info('Entity changed position within the group');
        };

        Entity.prototype.addStyleUpdate = function (key, value) {
            this._cssStack[key] = value;
        };

        Entity.prototype.addStyleTransformUpdate = function (key, value) {
            this._cssTransformStack[key] = value;
        };

        Entity.prototype.applyTransformStyle = function () {
            var cssValue = "";
            for (var key in this._cssTransformStack) {
                cssValue += this._cssTransformStack[key] + " ";
            }

            this.domElement.element.style.transform = cssValue;
            this.domElement.element.style['-o-transform'] = cssValue;
            this.domElement.element.style['-ms-transform'] = cssValue;
            this.domElement.element.style['-moz-transform'] = cssValue;
            this.domElement.element.style['-webkit-transform'] = cssValue;
        };

        Entity.prototype.update = function () {
        };

        Entity.prototype.render = function (camera) {
            if (this.domElement) {
                for (var key in this._cssStack) {
                    this.domElement.element.style[key] = this._cssStack[key];
                    delete this._cssStack[key];
                }
                this.applyTransformStyle();
            }
        };

        Entity.prototype.destroy = function () {
            if (this.domElement) {
                this.domElement.unlink();
                this.domElement = null;
            }

            this._exists = false;
            this._active = false;
            this._willRender = false;
            this._cssStack = {};
        };
        return Entity;
    })();
    Kiwi.Entity = Entity;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    var Group = (function () {
        function Group(name) {
            if (typeof name === "undefined") { name = ''; }
            this.game = null;
            this.state = null;
            this.name = '';
            this.type = Kiwi.TYPE_UNASSIGNED;
            this.layer = null;
            this.domElement = null;
            this._cssStack = [];
            this.name = name;
            this.type = Kiwi.TYPE_UNASSIGNED;
            this.components = new Kiwi.ComponentManager(Kiwi.GROUP, this);

            this._exists = true;
            this._active = true;
            this._willRender = true;

            this.members = [];

            this.onAddedToLayer = new Kiwi.Signal();
            this.onAddedToState = new Kiwi.Signal();
            this.onRemovedFromLayer = new Kiwi.Signal();
            this.onRemovedFromState = new Kiwi.Signal();

            klog.info('Created Group ' + this.name);
        }
        Group.prototype.objType = function () {
            return "Group";
        };

        Group.prototype.modify = function (type, parent) {
            if (type === Kiwi.ADDED_TO_LAYER) {
                return this._addedToLayer(parent);
            } else if (type === Kiwi.ADDED_TO_STATE) {
                return this._addedToState(parent);
            } else if (type === Kiwi.REMOVED_FROM_LAYER) {
                return this._removedFromLayer(parent);
            } else if (type === Kiwi.REMOVED_FROM_STATE) {
                return this._removedFromState(parent);
            }
        };

        Group.prototype.numChildren = function () {
            return this.members.length;
        };

        Group.prototype.dirty = function (value) {
            for (var i = 0; i < this.members.length; i++) {
                this.members[i].dirty = value;
            }
        };

        Group.prototype.contains = function (child) {
            return (this.members.indexOf(child) === -1) ? false : true;
        };

        Group.prototype.addChild = function (child) {
            if (child.supportsType(this.type) === false) {
                klog.warn('Warning - Entity has been added to a Group that exists on a Layer it cannot render to');
                return null;
            }

            klog.info('Group.addChild ' + this.members.length);

            if (child.parent !== this) {
                this.members.push(child);

                child.modify(Kiwi.ADDED_TO_GROUP, this);
            }

            return child;
        };

        Group.prototype.addChildAt = function (child, index) {
            if (child.supportsType(this.type) === false) {
                klog.warn('Invalid Entity Type added to Group: ' + child.id);
                return null;
            }

            klog.info('Group.addChildAt ' + child.id);

            if (child.parent !== this) {
                this.members.splice(index, 0, child);

                child.modify(Kiwi.ADDED_TO_GROUP, this);
            }

            return child;
        };

        Group.prototype.addChildBefore = function (child, beforeChild) {
            if (child.supportsType(this.type) === false) {
                klog.warn('Invalid Entity Type added to Group: ' + child.id);
                return null;
            }

            klog.info('Group.addChildBefore ' + child.id);

            if (child.parent !== this && beforeChild.parent === this) {
                var index = this.getChildIndex(beforeChild);

                this.members.splice(index, 0, child);

                child.modify(Kiwi.ADDED_TO_GROUP, this);
            }

            return child;
        };

        Group.prototype.addChildAfter = function (child, beforeChild) {
            if (child.supportsType(this.type) === false) {
                klog.warn('Invalid Entity Type added to Group: ' + child.id);
                return null;
            }

            klog.info('Group.addChildAfter ' + child.id);

            if (child.parent !== this && beforeChild.parent === this) {
                var index = this.getChildIndex(beforeChild) + 1;

                this.members.splice(index, 0, child);

                child.modify(Kiwi.ADDED_TO_GROUP, this);
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
            if (child && child.parent === this) {
                var index = this.getChildIndex(child);

                if (index > -1) {
                    this.members.splice(index, 1);
                }

                child.modify(Kiwi.REMOVED_FROM_GROUP, this);
            }

            return child;
        };

        Group.prototype.removeChildAt = function (index) {
            if (this.members[index]) {
                var child = this.members[index];

                if (child) {
                    this.members.splice(index, 1);

                    child.modify(Kiwi.REMOVED_FROM_GROUP, this);
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

            for (var i = 0; i < removed.length; i++) {
                removed[i].modify(Kiwi.REMOVED_FROM_GROUP, this);
            }

            return removed.length;
        };

        Group.prototype.setChildIndex = function (child, index) {
            if (child.parent !== this || this.getChildIndex(child) === index) {
                return false;
            }

            this.removeChild(child);
            this.addChildAt(child, index);

            return true;
        };

        Group.prototype.swapChildren = function (child1, child2) {
            if (child1.parent !== this || child2.parent !== this) {
                return false;
            }

            var index1 = this.getChildIndex(child1);
            var index2 = this.getChildIndex(child2);

            if (index1 !== -1 && index2 !== -1 && index1 !== index2) {
                this.members[index1] = child2;
                this.members[index2] = child1;

                child1._changedPosition(this, index2);
                child2._changedPosition(this, index1);

                return true;
            }

            return false;
        };

        Group.prototype.swapChildrenAt = function (index1, index2) {
            if (child1.parent !== this || child2.parent !== this) {
                return false;
            }

            var child1 = this.getChildAt(index1);
            var child2 = this.getChildAt(index2);

            if (child1 !== null && child2 !== null) {
                this.members[index1] = child2;
                this.members[index2] = child1;

                child1._changedPosition(this, index2);
                child2._changedPosition(this, index1);

                return true;
            }

            return false;
        };

        Group.prototype.replaceChild = function (oldChild, newChild) {
            console.log(this.members[0]);
            klog.info("replaceChild on group " + this.name);

            if (newChild.supportsType(this.type) === false) {
                klog.warn('Invalid Entity Type added to Group: ' + newChild.id);
                return null;
            }

            if (oldChild === newChild)
                return;

            if (this.getChildIndex(newChild)) {
                this.removeChild(newChild);
            }

            var index = this.getChildIndex(oldChild);

            if (index > -1) {
                this.removeChildAt(index);

                this.addChildAt(newChild, index);

                oldChild.modify(Kiwi.REMOVED_FROM_GROUP, this);
                newChild.parent = null;
                newChild.modify(Kiwi.ADDED_TO_GROUP, this);
                console.log(this.members[0]);
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
                    if (child.exists())
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
                    console.log('callAll', this.members[i]);
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
            if (child.active() === true) {
                child.update();
            }
        };

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
            if (child.active() === true) {
                child.render(camera);
            }
        };

        Group.prototype.removeFirstAlive = function () {
            return this.removeChild(this.getFirstAlive());
        };

        Group.prototype.getFirstAlive = function () {
            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].exists() === true) {
                    return this.members[i];
                    break;
                }
            }

            return null;
        };

        Group.prototype.getFirstDead = function () {
            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].exists() === false) {
                    return this.members[i];
                    break;
                }
            }

            return null;
        };

        Group.prototype.countLiving = function () {
            var total = 0;

            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].exists() === true) {
                    total++;
                }
            }

            return total;
        };

        Group.prototype.countDead = function () {
            var total = 0;

            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].exists() === false) {
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
            for (var i = 0; i < this.members.length; i++) {
                this.members[i].modify(Kiwi.REMOVED_FROM_GROUP, this);
            }

            this.members.length = 0;
        };

        Group.prototype.exists = function (value) {
            if (value) {
                this._exists = value;
            }

            return this._exists;
        };

        Group.prototype.active = function (value) {
            if (value) {
                this._active = value;
            }

            return this._active;
        };

        Group.prototype.willRender = function (value) {
            if (value) {
                this._willRender = value;
            }

            return this._willRender;
        };

        Group.prototype.isGroup = function () {
            return true;
        };

        Group.prototype._addedToLayer = function (layer) {
            if (this.layer !== null) {
                klog.warn('Group already exists on Layer ' + this.layer.id);

                return false;
            } else {
                klog.info('Group added to Layer. Checking children: ' + this.members.length);

                this.layer = layer;
                this.type = this.layer.type;

                for (var i = 0; i < this.members.length; i++) {
                    if (this.members[i].modify(Kiwi.ADDED_TO_LAYER, this.layer) === false) {
                        this.members[i].exists(false);
                    }
                }

                this.onAddedToLayer.dispatch(this, layer);
                return true;
            }
        };

        Group.prototype._removedFromLayer = function (layer) {
            this.layer = null;

            if (this.domElement) {
                this.domElement.unlink();
                this.domElement = null;
            }

            this.type = Kiwi.TYPE_UNASSIGNED;

            this.onRemovedFromLayer.dispatch(this, layer);
        };

        Group.prototype._addedToState = function (state) {
            klog.info('Group added to State');

            this.state = state;

            this.game = this.state.game;

            this.id = this.game.rnd.uuid();

            this.onAddedToState.dispatch(this, state);
        };

        Group.prototype._removedFromState = function (state) {
            klog.info('Group removed from State');

            this.onRemovedFromState.dispatch(this, state);

            this.state = null;

            this.game = null;
        };

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
var Kiwi;
(function (Kiwi) {
    (function (DOM) {
        var Cache = (function () {
            function Cache(parent, game, size) {
                this._parent = parent;
                this._game = game;
                this.domContainer = this._parent.domContainer;

                this._cache = [];

                this._swapperA = document.createElement('div');
                this._swapperA.id = 'KiwiDOMSwapperA';

                this._swapperB = document.createElement('div');
                this._swapperB.id = 'KiwiDOMSwapperB';

                this._parent.domContainer.appendChild(this._swapperA);
                this._parent.domContainer.appendChild(this._swapperB);

                for (var i = 0; i < size; i++) {
                    this._cache.push(new Kiwi.DOM.Element('KiwiLayer_' + this._parent.id + 'Element_' + i, this));
                }
            }
            Cache.prototype.objType = function () {
                return "Cache";
            };

            Cache.prototype.increaseCacheSize = function (value) {
                for (var i = this._cache.length; i < this._cache.length + value; i++) {
                    this._cache.push(new Kiwi.DOM.Element('KiwiLayer_' + this._parent.id + 'Element_' + i, this));
                }

                return this._cache.length;
            };

            Cache.prototype.assignElement = function (parent) {
                for (var i = 0; i < this._cache.length; i++) {
                    if (this._cache[i].available === true && this._cache[i].type === parent.domElementType) {
                        return this._cache[i].link(parent);
                    }
                }

                klog.info("If we got this far then all of the current elements are in use or of the wrong type, so let's expand the cache size by 1");

                var index = this._cache.length;
                var newElement = new Kiwi.DOM.Element('KiwiLayer_' + this._parent.id + 'Element_' + index, this, parent.domElementType);

                this._cache.push(newElement);

                return newElement.link(parent);
            };

            Cache.prototype.swapElements = function (first, second) {
                klog.info('DOM Swapping Test 8');

                first.element = first.element.parentElement['replaceChild'](this._swapperA, first.element);
                second.element = second.element.parentElement['replaceChild'](this._swapperB, second.element);

                this._swapperA = this._swapperA.parentElement['replaceChild'](second.element, this._swapperA);
                this._swapperB = this._swapperB.parentElement['replaceChild'](first.element, this._swapperB);

                return true;
            };
            return Cache;
        })();
        DOM.Cache = Cache;
    })(Kiwi.DOM || (Kiwi.DOM = {}));
    var DOM = Kiwi.DOM;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Utils) {
        var Canvas = (function () {
            function Canvas(layer, width, height, visible, offScreen) {
                if (typeof visible === "undefined") { visible = true; }
                if (typeof offScreen === "undefined") { offScreen = false; }
                this.domElement = null;
                this.context = null;
                this._visible = true;
                this._offScreen = false;
                this._clearMode = 1;
                this.bgColor = 'rgb(0, 0, 0)';
                if (layer === null && offScreen === false) {
                    klog.warn('Cannot create a canvas on a null layer');
                    return;
                }

                this._layer = layer;

                this.domElement = document.createElement('canvas');
                this.domElement.width = width;
                this.domElement.height = height;

                this.size = new Kiwi.Components.Size(width, height);
                this.size.updated.add(this._updatedSize, this);

                this.context = this.domElement.getContext('2d');

                this._offScreen = offScreen;
                this._visible = visible;

                if (visible === false) {
                    this.domElement.style.display = 'none';
                }
            }
            Canvas.prototype.objType = function () {
                return "Canvas";
            };

            Canvas.prototype._updatedSize = function (width, height) {
                this.domElement.width = width;
                this.domElement.height = height;
                this.size.dirty = false;
            };

            Canvas.prototype.destroy = function () {
                if (this._offScreen === false) {
                    this.domElement.style.display = 'none';
                    this._layer.domContainer.removeChild(this.domElement);
                }
            };

            Canvas.prototype.visible = function (value) {
                if (typeof value === "undefined") { value = null; }
                if (value !== null && value !== this._visible) {
                    this._visible = value;

                    if (value === true) {
                        this.domElement.style.display = 'block';
                    } else {
                        this.domElement.style.display = 'none';
                    }
                }

                return this._visible;
            };

            Canvas.prototype.clearMode = function (value) {
                if (typeof value === "undefined") { value = null; }
                if (value !== null && value !== this._clearMode && value >= Kiwi.Utils.Canvas.CLEARMODE_NONE && value <= Kiwi.Utils.Canvas.CLEARMODE_FILLRECT_ALPHA) {
                    this._clearMode = value;
                }

                return this._clearMode;
            };

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
                return '[{Canvas (width=' + this.size.width() + ' height=' + this.size.height() + ' visible=' + this.visible + ' offScreen=' + this._offScreen + ' clearMode=' + this.clearMode + ')}]';
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
    var Layer = (function () {
        function Layer(game, id, type, name, size) {
            this._renderList = [];
            console.log("create layer");

            this.game = game;
            this.id = id;
            this.type = type;
            this.name = name;
            this.components = new Kiwi.ComponentManager(Kiwi.LAYER, this);

            this.domContainer = document.createElement('div');

            this.domContainer.style.position = 'absolute';
            this.domContainer.style.overflow = 'hidden';
            this.domContainer.style.left = '0px';
            this.domContainer.style.top = '0px';
            this.domContainer.style.width = '100%';
            this.domContainer.style.height = '100%';

            if (this.type === Kiwi.TYPE_DOM) {
                this.domCache = new Kiwi.DOM.Cache(this, this.game, size);
                this.domContainer.id = 'KiwiDOMLayer' + this.id;
                this.game.stage.domLayers.appendChild(this.domContainer);
            } else if (this.type === Kiwi.TYPE_CANVAS) {
                this.canvas = new Kiwi.Utils.Canvas(this, this.game.stage.size.width(), this.game.stage.size.height(), true, true);

                this.canvas.domElement.id = 'KiwiCanvasLayer' + this.id;
                this.canvas.domElement.style.position = 'absolute';

                this.canvas.domElement.style.left = '0px';
                this.canvas.domElement.style.top = '0px';
                this.canvas.domElement.style.width = '100%';
                this.canvas.domElement.style.height = '100%';
            }

            this.game.stage.size.updated.add(this._updatedStageSize, this);

            klog.info('Created Layer ' + this.id + ' of type ' + this.type);
        }
        Layer.prototype.objType = function () {
            return "Layer";
        };

        Layer.prototype._updatedStageSize = function (width, height) {
            if (this.type === Kiwi.TYPE_CANVAS) {
                this.canvas.size.setTo(width, height);
            }
        };

        Layer.prototype.numChildren = function () {
            return this._renderList.length;
        };

        Layer.prototype.visible = function (value) {
            if (typeof value === "undefined") { value = null; }
            if (value !== null && value !== this._visible) {
                this._visible = value;

                if (this.type === Kiwi.TYPE_DOM) {
                    if (this._visible === false) {
                        this.domContainer.style.display = 'none';
                    } else {
                        this.domContainer.style.display = 'block';
                    }
                } else if (this.type === Kiwi.TYPE_CANVAS) {
                    this.canvas.visible(this._visible);
                }
            }

            return this._visible;
        };

        Layer.prototype.dirty = function (value) {
            if (typeof value === "undefined") { value = null; }
            if (value !== null) {
                this._dirty = value;
            }

            return this._dirty;
        };

        Layer.prototype.add = function (child) {
            if (child instanceof Kiwi.Entity) {
                if (child.supportsType(this.type) === false) {
                    klog.warn('Entity failed to be added to Layer renderList');
                    return false;
                } else {
                    klog.info('Entity added to Layer renderList');
                }
            } else {
                klog.info('Group added to Layer renderList');
            }

            this._renderList.push(child);

            if (this.type === Kiwi.TYPE_DOM) {
                this.domCache.assignElement(child);
            }

            child.modify(Kiwi.ADDED_TO_LAYER, this);

            return true;
        };

        Layer.prototype.remove = function (child) {
            for (var i = 0; i < this._renderList.length; i++) {
                if (this._renderList[i].id === child.id) {
                    this._renderList.slice(i, 1);

                    child.modify(Kiwi.REMOVED_FROM_LAYER, this);

                    return true;
                }
            }

            return false;
        };

        Layer.prototype.update = function () {
            this.components.update();
        };

        Layer.prototype.render = function (camera) {
            if (this.type === Kiwi.TYPE_CANVAS) {
                this.canvas.clear();
            }

            this.components.preRender();

            this.components.render();

            for (var i = 0; i < this._renderList.length; i++) {
                if (this._renderList[i].willRender() === true) {
                    this._renderList[i].render(camera);
                }
            }

            this.components.postRender();
        };
        return Layer;
    })();
    Kiwi.Layer = Layer;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    var LayerManager = (function () {
        function LayerManager(game, defaultType) {
            klog.info('Layer Manager created');

            this._game = game;

            this._defaultType = defaultType;

            this.layers = [];

            this._nextLayerID = 0;
        }
        LayerManager.prototype.objType = function () {
            return "LayerManager";
        };

        LayerManager.prototype.boot = function () {
            if (this._defaultType === Kiwi.TYPE_CANVAS) {
                this.createCanvasLayer(null, 'default');
            } else if (this._defaultType === Kiwi.TYPE_DOM) {
                this.createDOMLayer(null, 'default');
            }

            this.defaultLayer = this.layers[0];
        };

        LayerManager.prototype.createCanvasLayer = function (state, name, size) {
            if (typeof state === "undefined") { state = null; }
            if (typeof name === "undefined") { name = ''; }
            if (typeof size === "undefined") { size = 100; }
            klog.info('Creating Canvas Layer');

            return this.create(Kiwi.TYPE_CANVAS, state, name);
        };

        LayerManager.prototype.createDOMLayer = function (state, name, size) {
            if (typeof state === "undefined") { state = null; }
            if (typeof name === "undefined") { name = ''; }
            if (typeof size === "undefined") { size = 100; }
            klog.info('Creating DOM Layer');

            return this.create(Kiwi.TYPE_DOM, state, name);
        };

        LayerManager.prototype.create = function (type, state, name, size) {
            if (typeof state === "undefined") { state = null; }
            if (typeof name === "undefined") { name = ''; }
            if (typeof size === "undefined") { size = 100; }
            if (this._game.cameras.multiCameraMode() == true && type === Kiwi.TYPE_DOM) {
                klog.error("Cannot create DOM layers in multicamera mode");
                return null;
            }

            var newLayer = new Kiwi.Layer(this._game, this._nextLayerID, type, name, size);

            newLayer.parent = state;

            this.layers.push(newLayer);

            this._nextLayerID++;

            this.currentLayer = newLayer;

            return newLayer;
        };

        LayerManager.prototype.offsetCanvasLayers = function (x, y) {
            var domContainer;
            for (var i = 0; i < this.layers.length; i++) {
                if (this.layers[i].type == Kiwi.TYPE_CANVAS) {
                    domContainer = this.layers[i].domContainer;

                    domContainer.style.left = x + "px";
                    domContainer.style.top = y + "px";
                }
            }
        };

        LayerManager.prototype.remove = function (layer) {
            klog.info('Remove layer');

            var i = this.layers.indexOf(layer);

            if (i !== -1) {
                this.layers.splice(i, 1);
            }
        };

        LayerManager.prototype.update = function () {
            if (this.layers.length === 0) {
                return false;
            }

            for (var i = 0; i < this.layers.length; i++) {
                this.layers[i].update();
            }
        };

        LayerManager.prototype.render = function (camera) {
            if (this.layers.length === 0) {
                return false;
            }

            for (var i = 0; i < this.layers.length; i++) {
                this.layers[i].render(camera);
            }
        };

        LayerManager.prototype.removeStateLayers = function () {
            klog.info('TODO removeStateLayers');
        };

        LayerManager.prototype.removeAll = function () {
            this.layers.length = 0;
            klog.info('TODO removeAll');
        };
        return LayerManager;
    })();
    Kiwi.LayerManager = LayerManager;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
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
            klog.info('Loader Boot');

            this._fileList = [];
            this._loadList = [];
        };

        Loader.prototype.init = function (progress, complete, calculateBytes) {
            if (typeof progress === "undefined") { progress = null; }
            if (typeof complete === "undefined") { complete = null; }
            if (typeof calculateBytes === "undefined") { calculateBytes = false; }
            klog.info('Loader init - calculate bytes: ' + calculateBytes);

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

        Loader.prototype.addImage = function (cacheID, url, cache) {
            if (typeof cache === "undefined") { cache = null; }
            if (cache === null) {
                cache = this._game.cache.images;
            }

            this._fileList.push(new Kiwi.File(Kiwi.File.IMAGE, url, cacheID, true, cache));
        };

        Loader.prototype.addSpriteSheet = function (cacheID, url, frameWidth, frameHeight, cache) {
            if (typeof cache === "undefined") { cache = null; }
            if (cache === null) {
                cache = this._game.cache.images;
            }

            var file = new Kiwi.File(Kiwi.File.SPRITE_SHEET, url, cacheID, true, cache);

            file.frameWidth = frameWidth;
            file.frameHeight = frameHeight;

            this._fileList.push(file);
        };

        Loader.prototype.addAudio = function (cacheID, url, cache) {
            if (typeof cache === "undefined") { cache = null; }
            if (cache === null) {
                cache = this._game.cache.audio;
            }

            this._fileList.push(new Kiwi.File(Kiwi.File.AUDIO, url, cacheID, true, cache));
        };

        Loader.prototype.addJSON = function (cacheID, url, cache) {
            if (typeof cache === "undefined") { cache = null; }
            if (cache === null) {
                cache = this._game.cache.data;
            }

            this._fileList.push(new Kiwi.File(Kiwi.File.JSON, url, cacheID, true, cache));
        };

        Loader.prototype.addXML = function (cacheID, url, cache) {
            if (typeof cache === "undefined") { cache = null; }
            if (cache === null) {
                cache = this._game.cache.data;
            }

            this._fileList.push(new Kiwi.File(Kiwi.File.XML, url, cacheID, true, cache));
        };

        Loader.prototype.addBinaryFile = function (cacheID, url, cache) {
            if (typeof cache === "undefined") { cache = null; }
            if (cache === null) {
                cache = this._game.cache.data;
            }

            this._fileList.push(new Kiwi.File(Kiwi.File.BINARY_DATA, url, cacheID, true, cache));
        };

        Loader.prototype.addTextFile = function (cacheID, url, cache) {
            if (typeof cache === "undefined") { cache = null; }
            if (cache === null) {
                cache = this._game.cache.data;
            }

            this._fileList.push(new Kiwi.File(Kiwi.File.TEXT_DATA, url, cacheID, true, cache));
        };

        Loader.prototype.addCustomFile = function (file, cache) {
            if (typeof cache === "undefined") { cache = null; }
            if (cache !== null) {
                file.saveToCache(true);
                file.cache(cache);
            }

            this._fileList.push(file);
        };

        Loader.prototype.startLoad = function () {
            klog.info('Loader startLoad');

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
                    klog.info('Loader - startLoad - getting total file sizes');
                    this.getNextFileSize();
                } else {
                    klog.info('Loader - startLoad - skipping xhr file size check');
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
            klog.info('Loader - addToBytesTotal - ' + file.fileName + ' = ' + file.fileSize);

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

            if (file.dataType === Kiwi.File.SPRITE_SHEET) {
                file.frames = this._game.anims.getSpriteSheetFrames(file.cacheID, file.cache(), file.frameWidth, file.frameHeight);
            }

            if (this._loadList.length === 0) {
                this._complete = true;

                if (this._onCompleteCallback) {
                    klog.info('onCompleteCallback');
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
    Kiwi.Loader = Loader;
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

            Rectangle.prototype.bottom = function (value) {
                if (value) {
                    if (value < this.y) {
                        this.height = 0;
                    } else {
                        this.height = value;
                    }
                }

                return this.y + this.height;
            };

            Rectangle.prototype.center = function (output) {
                if (typeof output === "undefined") { output = new Geom.Point(); }
                return output.setTo(Math.round(this.width / 2), Math.round(this.height / 2));
            };

            Rectangle.prototype.bottomRight = function (value, output) {
                if (typeof output === "undefined") { output = new Geom.Point(); }
                if (value) {
                    this.right(value.x);
                    this.bottom(value.y);
                }

                return output.setTo(this.right(), this.bottom());
            };

            Rectangle.prototype.left = function (value) {
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

                return this.x;
            };

            Rectangle.prototype.right = function (value) {
                if (value) {
                    if (value < this.x) {
                        this.width = 0;

                        return this.x;
                    } else {
                        this.width = (value - this.x);
                    }
                }

                return this.x + this.width;
            };

            Rectangle.prototype.size = function (output) {
                if (typeof output === "undefined") { output = new Geom.Point(); }
                return output.setTo(this.width, this.height);
            };

            Rectangle.prototype.volume = function () {
                return this.width * this.height;
            };

            Rectangle.prototype.perimeter = function () {
                return (this.width * 2) + (this.height * 2);
            };

            Rectangle.prototype.top = function (value) {
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

                return this.y;
            };

            Rectangle.prototype.topLeft = function (value, output) {
                if (typeof output === "undefined") { output = new Geom.Point(); }
                if (value) {
                    this.x = value.x;
                    this.y = value.y;
                }

                return output.setTo(this.x, this.y);
            };

            Rectangle.prototype.clone = function (output) {
                if (typeof output === "undefined") { output = new Rectangle(); }
                return output.setTo(this.x, this.y, this.width, this.height);
            };

            Rectangle.prototype.contains = function (x, y) {
                if (x >= this.x && x <= this.right() && y >= this.y && y <= this.bottom()) {
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

                if (rect.x >= this.x && rect.y >= this.y && rect.right() <= this.right() && rect.bottom() <= this.bottom()) {
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
                    output.width = Math.min(toIntersect.right(), this.right()) - output.x;
                    output.height = Math.min(toIntersect.bottom(), this.bottom()) - output.y;
                }

                return output;
            };

            Rectangle.prototype.intersects = function (toIntersect) {
                if (toIntersect.x > this.right() - 1) {
                    return false;
                }

                if (toIntersect.right() - 1 < this.x) {
                    return false;
                }

                if (toIntersect.bottom() - 1 < this.y) {
                    return false;
                }

                if (toIntersect.y > this.bottom() - 1) {
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
                return output.setTo(Math.min(toUnion.x, this.x), Math.min(toUnion.y, this.y), Math.max(toUnion.right(), this.right()), Math.max(toUnion.bottom(), this.bottom()));
            };

            Rectangle.prototype.scale = function (x, y, translation) {
                var trans = new Kiwi.Geom.Transform();
                trans.scale(x, y);
                trans.x(translation.x);
                trans.y(translation.y);

                var tl = this.topLeft();
                trans.transformPoint(tl);
                this.topLeft(tl);

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
        function Stage(game, name, defaultType) {
            this.offset = new Kiwi.Geom.Point();
            this.container = null;
            this.layers = null;
            this.domLayers = null;
            this.domLayersMask = null;
            this.canvasLayers = null;
            this._framerate = 30;
            this._game = game;

            this.name = name;

            this.domReady = false;

            this.defaultType = defaultType;

            this.alpha = new Kiwi.Components.Alpha();
            this.color = new Kiwi.Components.Color();
            this.position = new Kiwi.Components.Position();
            this.size = new Kiwi.Components.Size();
        }
        Stage.prototype.objType = function () {
            return "Stage";
        };

        Stage.prototype.boot = function (dom) {
            klog.info('Stage DOM boot');

            this.domReady = true;

            this.container = dom.container;

            this.domLayers = dom.domLayers;
            this.canvasLayers = dom.canvasLayers;
            this.domLayersMask = dom.domLayersMask;

            this.offset = this._game.browser.getOffsetPoint(this.container);

            this.position.setTo(this.offset.x, this.offset.y);
            this.size.setTo(parseInt(this.container.style.width), parseInt(this.container.style.height));

            this.alpha.updated.add(this._updatedAlpha, this);
            this.color.updated.add(this._updatedColor, this);
            this.position.updated.add(this._updatedPosition, this);
            this.size.updated.add(this._updatedSize, this);
        };

        Stage.prototype._updatedPosition = function (x, y, z, cssTranslate3d, cssLeft, cssTop) {
            this.container.style.left = cssLeft;
            this.container.style.top = cssTop;
        };

        Stage.prototype._updatedColor = function (red, green, blue, alpha, cssColorHex, cssColorRGB, cssColorRGBA) {
            if (Kiwi.DEVICE.ieVersion < 10) {
                this.container.style.backgroundColor = cssColorHex;
            } else {
                this.container.style.backgroundColor = cssColorRGBA;
            }
        };

        Stage.prototype._updatedAlpha = function () {
            this.alpha.setCSS(this.container);
        };

        Stage.prototype._updatedSize = function () {
            this.size.setCSS(this.container);
        };

        Stage.prototype.frameRate = function (value) {
            if (value) {
                this._framerate = value;
            }

            return this._framerate;
        };
        return Stage;
    })();
    Kiwi.Stage = Stage;
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
            klog.info('Adding new State');

            var tempState;

            if (typeof state === 'function') {
                tempState = new state();
            } else if (typeof state === 'string') {
                tempState = window[state];
            } else {
                tempState = state;
            }

            if (tempState.config.name && this.checkKeyExists(tempState.config.name) === true) {
                klog.warn('State with this name already exists or state is malformed');
                return false;
            }

            tempState.game = this._game;
            tempState.config.type = this._game.stage.defaultType;

            if (this.checkValidState(tempState) === false) {
                klog.info('checkValidState failed');
                return false;
            } else {
                klog.info('State successfully added to StateManager');

                this._states.push(tempState);

                if (switchTo === true) {
                    this.setCurrentState(tempState.config.name);
                }

                return true;
            }
        };

        StateManager.prototype.boot = function () {
            klog.info('StateManager booting');

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
            klog.debug('-------------------------------------------------------------');
            klog.info('Start of Setting Current State ' + key);

            if (this.current !== null && this.current.config.name === key) {
                klog.info('Bailing out, switching to already current state');
                return false;
            }

            if (this.current !== null) {
                klog.info('Current State: ' + this.current.config.name + ' being destroyed');
                this._game.input.reset();
                this.current.destroy();
            }

            if (this.checkKeyExists(key) === true) {
                this.current = this.getState(key);

                klog.info('Key exists, so setting current state to: ', this.current.config.name);

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
                klog.warn('Apparently the State key doesn\'t exist');
                return false;
            }
        };

        StateManager.prototype.switchState = function (key, state, initParams, createParams) {
            if (typeof state === "undefined") { state = null; }
            if (typeof initParams === "undefined") { initParams = null; }
            if (typeof createParams === "undefined") { createParams = null; }
            klog.info('Attempting to switch to State ' + key);

            if (this.current !== null && this.current.config.isReady === false) {
                klog.warn('You cannot call switchState before the current state has called create()');
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
                    klog.info('No preloaded, calling create function');
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

            this.current.config.isReady = true;

            if (this.current.config.hasCreate === true) {
                klog.info('preload finished - now calling create function');
                this.current.config.isCreated = true;
                if (this.current.config.createParams) {
                    this.current.create.apply(this.current, this.current.config.createParams);
                } else {
                    this.current.create.call(this.current);
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
    (function (DOM) {
        var Bootstrap = (function () {
            function Bootstrap() {
                this.isReady = false;
                this.container = null;
                this.domLayersMask = null;
                this.domLayers = null;
                this.canvasLayers = null;
                this.input = null;
            }
            Bootstrap.prototype.objType = function () {
                return "Bootstrap";
            };

            Bootstrap.prototype.boot = function (domParent, callback, createContainer) {
                if (typeof callback === "undefined") { callback = null; }
                if (typeof createContainer === "undefined") { createContainer = true; }
                var _this = this;
                klog.info('DOM Boot: ' + document.readyState);

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
                klog.info('DOM Ready Check');

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

                            klog.info('DOM Alive');
                        }
                    }

                    this.domLayersMask = document.createElement('div');
                    this.domLayersMask.id = this.container.id + 'LayersMask';
                    this.domLayersMask.style.position = 'absolute';
                    this.domLayersMask.style.overflow = 'hidden';
                    this.domLayersMask.style.top = '0px';
                    this.domLayersMask.style.left = '0px';
                    this.domLayersMask.style.width = '100%';
                    this.domLayersMask.style.height = '100%';

                    this.domLayers = document.createElement('div');
                    this.domLayers.id = this.container.id + 'domLayers';
                    this.domLayers.style.position = 'absolute';
                    this.domLayers.style.overflow = 'hidden';

                    this.domLayers.style.top = '0px';
                    this.domLayers.style.left = '0px';
                    this.domLayers.style.width = '100%';
                    this.domLayers.style.height = '100%';

                    this.canvasLayers = document.createElement('div');
                    this.canvasLayers.id = this.container.id + 'canvasLayers';
                    this.canvasLayers.style.position = 'absolute';
                    this.canvasLayers.style.top = '0px';
                    this.canvasLayers.style.left = '0px';
                    this.canvasLayers.style.width = '100%';
                    this.canvasLayers.style.height = '100%';

                    this.container.appendChild(this.domLayersMask);
                    this.domLayersMask.appendChild(this.domLayers);
                    this.container.appendChild(this.canvasLayers);

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
        DOM.Bootstrap = Bootstrap;
    })(Kiwi.DOM || (Kiwi.DOM = {}));
    var DOM = Kiwi.DOM;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (DOM) {
        var Browser = (function () {
            function Browser(game) {
                this._game = game;
            }
            Browser.prototype.objType = function () {
                return "Browser";
            };

            Browser.prototype.boot = function () {
                klog.info('DOM.Browser booting');
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
        DOM.Browser = Browser;
    })(Kiwi.DOM || (Kiwi.DOM = {}));
    var DOM = Kiwi.DOM;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (DOM) {
        var Element = (function () {
            function Element(id, cache, type) {
                if (typeof type === "undefined") { type = 'div'; }
                this._cache = cache;

                this.id = id;
                this.entity = null;
                this.type = type;
                this.available = true;

                this.element = document.createElement(this.type);
                this.element.id = this.id;
                this.element.style.display = 'block';
                this.element.style.position = 'absolute';
            }
            Element.prototype.objType = function () {
                return "Element";
            };

            Element.prototype.link = function (entity) {
                this.entity = entity;
                this.entity.domElement = this;
                this.available = false;

                if (this.entity.isGroup() === true) {
                    klog.info('DOM.Element ' + this.id + ' linking with Group');
                    this._cache.domContainer.appendChild(this.element);
                } else {
                    if (this.entity.parent !== null) {
                        klog.info('DOM.Element ' + this.id + ' linking with Group Member');
                        this.entity.parent.domElement.element.appendChild(this.element);
                    } else {
                        klog.info('DOM.Element ' + this.id + ' linking with Entity');
                        this._cache.domContainer.appendChild(this.element);
                    }
                }

                return this;
            };

            Element.prototype.unlink = function () {
                this.available = true;

                this.element.parentNode.removeChild(this.element);

                this.element = document.createElement(this.type);
                this.element.id = this.id;
                this.element.style.display = 'block';
                this.element.style.position = 'absolute';
            };
            return Element;
        })();
        DOM.Element = Element;
    })(Kiwi.DOM || (Kiwi.DOM = {}));
    var DOM = Kiwi.DOM;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (GameObjects) {
        (function (DOM) {
            var Button = (function (_super) {
                __extends(Button, _super);
                function Button(text, x, y) {
                    if (typeof x === "undefined") { x = 0; }
                    if (typeof y === "undefined") { y = 0; }
                    _super.call(this, false, true, false);

                    this.type = Kiwi.TYPE_DOM;
                    this.domElementType = 'button';
                    this._tempText = text;

                    this.position = new Kiwi.Components.Position(x, y);

                    this.onAddedToLayer.add(this._onAddedToLayer, this);
                    this.position.updated.add(this._updatePosition, this);

                    klog.info('Created DOM Button Game Object');
                }
                Button.prototype.objType = function () {
                    return "Button";
                };

                Button.prototype._updatePosition = function (x, y) {
                    this.position.addStyleUpdates(this);
                };

                Button.prototype._onAddedToLayer = function (layer) {
                    klog.info('DOM Button added to Layer');

                    this.button = this.domElement.element;
                    this.button.textContent = this._tempText;

                    this.position.addStyleUpdates(this);

                    return true;
                };
                return Button;
            })(Kiwi.Entity);
            DOM.Button = Button;
        })(GameObjects.DOM || (GameObjects.DOM = {}));
        var DOM = GameObjects.DOM;
    })(Kiwi.GameObjects || (Kiwi.GameObjects = {}));
    var GameObjects = Kiwi.GameObjects;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (GameObjects) {
        var Pixel = (function (_super) {
            __extends(Pixel, _super);
            function Pixel(x, y, color, size) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                if (typeof color === "undefined") { color = 0xFF000000; }
                if (typeof size === "undefined") { size = 1; }
                _super.call(this, true, true, false);

                this.position = this.components.add(new Kiwi.Components.Position(x, y));
                this.bounds = this.components.add(new Kiwi.Components.Bounds(x, y, size, size));
                this.color = this.components.add(new Kiwi.Components.Color());
                this.color.setColor(color);

                this._pixelSize = size;

                this.onAddedToLayer.add(this._onAddedToLayer, this);
                this.position.updated.add(this._updatePosition, this);
                this.color.updated.add(this._updateColor, this);

                klog.info('Created Pixel Game Object');
            }
            Pixel.prototype.objType = function () {
                return "Pixel";
            };

            Pixel.prototype._onAddedToLayer = function (layer) {
                klog.info('Pixel added to Layer ' + layer.name);

                if (this.type === Kiwi.TYPE_DOM) {
                    this.domElement.element.style.width = this._pixelSize + 'px';
                    this.domElement.element.style.height = this._pixelSize + 'px';

                    this.position.addStyleImmediately(this);
                    this.color.addStyleImmediately(this);
                }

                return true;
            };

            Pixel.prototype._updatePosition = function (x, y, z, cssTranslate3d, cssLeft, cssTop) {
                if (this.type === Kiwi.TYPE_DOM) {
                    this.position.addStyleUpdates(this);
                }

                this.bounds.setTo(x, y, this._pixelSize, this._pixelSize);
            };

            Pixel.prototype._updateColor = function () {
                if (this.type === Kiwi.TYPE_DOM) {
                    this.color.addStyleUpdates(this);
                }
            };

            Pixel.prototype.update = function () {
            };

            Pixel.prototype.render = function (camera) {
                _super.prototype.render.call(this, camera);

                if (this.type === Kiwi.TYPE_CANVAS && this.willRender() === true) {
                    this.layer.canvas.context.fillStyle = this.color.cssColorRGB;
                    this.layer.canvas.context.fillRect(this.position.x(), this.position.y(), this._pixelSize, this._pixelSize);
                }
            };
            return Pixel;
        })(Kiwi.Entity);
        GameObjects.Pixel = Pixel;
    })(Kiwi.GameObjects || (Kiwi.GameObjects = {}));
    var GameObjects = Kiwi.GameObjects;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Components) {
        var Animation = (function (_super) {
            __extends(Animation, _super);
            function Animation(entity) {
                _super.call(this, 'Animation', true, true, true);
                this.currentAnimation = null;
                this.isPlaying = false;

                this.updated = new Kiwi.Signal();

                this._entity = entity;

                this._animations = {};

                var texture = this._entity.components.getComponent('Texture');

                if (texture.file !== null && (texture.file.dataType === Kiwi.File.SPRITE_SHEET || texture.file.dataType === Kiwi.File.TEXTURE_ATLAS)) {
                    this._animations['default'] = new Kiwi.Anims.Animation(name, texture.file, texture.file.frames.getAllFrames(), 0, 0);

                    this.currentAnimation = this._animations['default'];
                } else {
                    return;
                }
            }
            Animation.prototype.objType = function () {
                return "Animation";
            };

            Animation.prototype.setFrame = function (value) {
                if (this.currentAnimation) {
                    this.currentAnimation.setFrame(value);
                }
            };

            Animation.prototype.add = function (name, speed, frames, repeat) {
                if (typeof frames === "undefined") { frames = null; }
                if (typeof repeat === "undefined") { repeat = Kiwi.Anims.PLAY_LOOP; }
                var texture = this._entity.components.getComponent('Texture');

                if (frames === null) {
                    this._animations[name] = new Kiwi.Anims.Animation(name, texture.file, texture.file.frames.getAllFrames(), speed, repeat);
                } else {
                    this._animations[name] = new Kiwi.Anims.Animation(name, texture.file, texture.file.frames.getFrames(frames), speed, repeat);
                }

                this.currentAnimation = this._animations[name];
            };

            Animation.prototype.play = function (name) {
                this.isPlaying = true;

                this.currentAnimation = this._animations[name];

                this._animations[name].play();
            };

            Animation.prototype.switchTo = function (name) {
                if (!(this.currentAnimation.name == name)) {
                    this.currentAnimation.stop();

                    this.play(name);
                }
            };

            Animation.prototype.update = function () {
                if (this.currentAnimation) {
                    this.currentAnimation.update();
                }
            };

            Animation.prototype.addStyleUpdates = function (entity) {
                if (entity === null) {
                    return;
                }

                if (Kiwi.DEVICE.css3D) {
                    entity.addStyleUpdate('-webkit-super-thingy', this.cssExampleProperty);
                } else {
                    entity.addStyleUpdate('less-super', this.cssExampleProperty);
                }
            };

            Animation.prototype.addStyleImmediately = function (entity) {
                if (entity.domElement === null || entity.domElement.element === null) {
                    return;
                }

                if (Kiwi.DEVICE.css3D) {
                    entity.domElement.element.style.transform = this.cssExampleProperty;
                } else {
                    entity.domElement.element.style.left = this.cssExampleProperty;
                }
            };

            Animation.prototype._processUpdate = function () {
                this.dirty = true;
            };

            Animation.prototype.toString = function () {
                return '[{Animation (x=' + this.active + ')}]';
            };
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
            function Sprite(cacheID, cache, x, y) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                _super.call(this, true, true, false);

                if (cache.checkImageCacheID(cacheID, cache) == false) {
                    console.log('Missing texture', cacheID);
                    return;
                }

                this.alpha = this.components.add(new Kiwi.Components.Alpha(1));
                this.texture = this.components.add(new Kiwi.Components.Texture(cacheID, cache));
                this.size = this.components.add(new Kiwi.Components.Size(this.texture.file.data.width, this.texture.file.data.height));

                this.position = this.components.add(new Kiwi.Components.Position(x, y));

                this.position.transformPoint(new Kiwi.Geom.Point(this.size.width() / 2, this.size.height() / 2));
                this.rotation = this.components.add(new Kiwi.Components.Rotation());
                this.scale = this.components.add(new Kiwi.Components.Scale());

                this.animation = this.components.add(new Kiwi.Components.Animation(this));

                this.bounds = this.components.add(new Kiwi.Components.Bounds(x, y, this.size.width(), this.size.height()));
                this.input = this.components.add(new Kiwi.Components.Input(this, this.bounds));
                this.motion = this.components.add(new Kiwi.Components.Motion(this.position));
                this.visible = this.components.add(new Kiwi.Components.Visible(true));

                if (this.texture.file !== null) {
                    if (this.texture.file.dataType === Kiwi.File.IMAGE) {
                        this._isAnimated = false;
                    } else if (this.texture.file.dataType === Kiwi.File.SPRITE_SHEET || this.texture.file.dataType === Kiwi.File.TEXTURE_ATLAS) {
                        this._isAnimated = true;
                        this.size.setTo(this.texture.file.frameWidth, this.texture.file.frameHeight);
                    }
                } else {
                    this._isAnimated = false;
                }

                this.alpha.updated.add(this._updateAlpha, this);
                this.position.updated.add(this._updatePosition, this);
                this.rotation.updated.add(this._updateRotation, this);
                this.scale.updated.add(this._updateScale, this);
                this.texture.updatedRepeat.add(this._updateRepeat, this);
                this.texture.updated.add(this._updateTexture, this);
                this.texture.position.updated.add(this._updateTexturePosition, this);
                this.size.updated.add(this._updateSize, this);

                this.visible.updated.add(this._updateVisible, this);

                this.onAddedToLayer.add(this._onAddedToLayer, this);
                this.onAddedToState.add(this._onAddedToState, this);

                this._transform = new Kiwi.Geom.Transform();
                this._center = new Kiwi.Geom.Point(x + this.size.width() / 2, y + this.size.height() / 2);

                klog.info('Created Sprite Game Object');
            }
            Sprite.prototype.objType = function () {
                return "Sprite";
            };

            Sprite.prototype.center = function () {
                return this._center;
            };

            Sprite.prototype._updatePosition = function (x, y, z) {
                if (this.type === Kiwi.TYPE_DOM) {
                    this.position.addStyleUpdates(this);
                }

                this._center.x = this.position.x() + this.size.width() / 2;
                this._center.y = this.position.y() + this.size.height() / 2;

                this.bounds.calculateBounds(this._transform, this.position, this.size);
            };

            Sprite.prototype._updateRotation = function (angle) {
                if (this.type === Kiwi.TYPE_DOM) {
                    this.rotation.addStyleUpdates(this);
                }

                this._transform.rotation(angle * Math.PI / 180);

                this.bounds.calculateBounds(this._transform, this.position, this.size);
            };

            Sprite.prototype._updateScale = function (x, y, z) {
                if (this.type === Kiwi.TYPE_DOM) {
                    this.scale.addStyleUpdates(this);
                }

                this._transform.scale(x, y);

                this.bounds.calculateBounds(this._transform, this.position, this.size);
            };

            Sprite.prototype._updateAlpha = function (value) {
                if (this.type === Kiwi.TYPE_DOM) {
                    this.alpha.addStyleUpdates(this);
                }
            };

            Sprite.prototype._updateVisible = function (value) {
                if (this.type === Kiwi.TYPE_DOM) {
                    this.visible.addStyleUpdates(this);
                }
            };

            Sprite.prototype._updateSize = function (width, height) {
                if (this.type === Kiwi.TYPE_DOM) {
                    this.size.addStyleUpdates(this);
                }

                this.bounds.setTo(this.position.x(), this.position.y(), width, height);
            };

            Sprite.prototype._updateTexturePosition = function (x, y) {
                if (this.type === Kiwi.TYPE_DOM) {
                    this.addStyleUpdate('backgroundPositionX', x + 'px');
                    this.addStyleUpdate('backgroundPositionY', y + 'px');
                }
            };

            Sprite.prototype._updateRepeat = function (value) {
                if (this.type === Kiwi.TYPE_DOM) {
                    this.addStyleUpdate('backgroundRepeat', value);
                }
            };

            Sprite.prototype._updateTexture = function (value, width, height) {
                if (this.type === Kiwi.TYPE_DOM) {
                    this.domElement.element.style.backgroundImage = 'url("' + value + '")';
                }
                this.size.setTo(width, height);
            };

            Sprite.prototype._onAddedToLayer = function (layer) {
                klog.info('Sprite added to Layer: ' + layer.name);

                if (this.type === Kiwi.TYPE_DOM) {
                    this.domElement.element.style.backgroundImage = 'url("' + this.texture.getURL() + '")';
                    this.domElement.element.style.backgroundRepeat = this.texture.repeat();
                    this.domElement.element.style.backgroundSize = '100%';

                    this.alpha.addStyleImmediately(this);
                    this.size.addStyleImmediately(this);
                    this.position.addStyleImmediately(this);
                    this.rotation.addStyleImmediately(this);
                    this.scale.addStyleImmediately(this);
                    this.visible.addStyleImmediately(this);
                }

                if (this._isAnimated) {
                    this.animation.currentAnimation.clock(this.clock());
                }

                return true;
            };

            Sprite.prototype._onAddedToState = function (state) {
                klog.info('Sprite added to State');

                this.motion.setClock(this.clock());

                if (this._isAnimated) {
                    this.animation.currentAnimation.clock(this.clock());
                }

                return true;
            };

            Sprite.prototype.update = function () {
                _super.prototype.update.call(this);

                this.input.update();

                if (this.input.isDragging === true) {
                    this.position.setTo(this.game.input.position.x - this.input.pointDown.x, this.game.input.position.y - this.input.pointDown.y);
                }

                this.motion.update();

                if (this._isAnimated) {
                    this.animation.update();
                    this.bounds.setSize(this.animation.currentAnimation.currentFrame.width, this.animation.currentAnimation.currentFrame.height);
                    this.size.setTo(this.animation.currentAnimation.currentFrame.width, this.animation.currentAnimation.currentFrame.height);
                }
            };

            Sprite.prototype.render = function (camera) {
                _super.prototype.render.call(this, camera);

                if (this.type === Kiwi.TYPE_CANVAS && this.willRender() === true && this.visible.visible() === true) {
                    if (this.bounds.showDebug === true) {
                        this.bounds.drawCanvasDebugOutline(this.layer);
                    }

                    if (this.alpha.alpha() >= 0 && this.alpha.alpha() <= 1) {
                        this.layer.canvas.context.save();
                        this.alpha.setContext(this.layer.canvas);
                    }

                    var offsetX = camera.position.x();
                    var offsetY = camera.position.y();

                    var dx = this.position.x();
                    var dy = this.position.y();
                    var dw = this.size.width();
                    var dh = this.size.height();

                    if (this.rotation.angle() !== 0) {
                        this.layer.canvas.context.save();

                        this.layer.canvas.context.translate(dx + (dw / 2), dy + (dh / 2));

                        this.layer.canvas.context.rotate(this.rotation.angle() * (Math.PI / 180));
                        this.layer.canvas.context.scale(this.scale.x(), this.scale.y());
                        dx = -(dw / 2);
                        dy = -(dh / 2);
                    }

                     {
                        if (this._isAnimated === true) {
                            this.animation.currentAnimation.renderToCanvas(this.layer, dx, dy);
                        } else {
                            this.layer.canvas.context.drawImage(this.texture.image, dx - offsetX, dy - offsetY, dw, dh);
                        }
                    }

                    if (this.rotation.angle() !== 0) {
                        this.layer.canvas.context.translate(0, 0);
                        this.layer.canvas.context.restore();
                    }

                    if (this.alpha.alpha() > 0 && this.alpha.alpha() <= 1) {
                        this.layer.canvas.context.restore();
                    }
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
            function StaticImage(cacheID, cache, x, y) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                _super.call(this, true, true, false);

                if (cache.checkImageCacheID(cacheID, cache) == false) {
                    console.log('Missing texture', cacheID);
                    return;
                }

                this.position = this.components.add(new Kiwi.Components.Position(x, y));
                this.texture = this.components.add(new Kiwi.Components.Texture(cacheID, cache));
                this.size = this.components.add(new Kiwi.Components.Size(this.texture.file.data.width, this.texture.file.data.height));
                this.bounds = this.components.add(new Kiwi.Components.Bounds(x, y, this.size.width(), this.size.height()));

                this.onAddedToLayer.add(this._onAddedToLayer, this);

                this.position.updated.add(this._updatePosition, this);
                this.texture.updatedRepeat.add(this._updateRepeat, this);
                this.texture.updated.add(this._updateTexture, this);
                this.texture.position.updated.add(this._updateTexturePosition, this);
                this.size.updated.add(this._updateSize, this);

                klog.info('Created StaticImage Game Object');
            }
            StaticImage.prototype.objType = function () {
                return "StaticImage";
            };

            StaticImage.prototype._updatePosition = function (x, y, z) {
                if (this.type === Kiwi.TYPE_DOM) {
                    this.position.addStyleUpdates(this);
                }

                this.bounds.setTo(x, y, this.size.width(), this.size.height());
            };

            StaticImage.prototype._updateSize = function (width, height) {
                if (this.type === Kiwi.TYPE_DOM) {
                    this.size.addStyleUpdates(this);
                }

                this.bounds.setTo(this.position.x(), this.position.y(), width, height);
            };

            StaticImage.prototype._updateTexturePosition = function (x, y) {
                if (this.type === Kiwi.TYPE_DOM) {
                    this.addStyleUpdate('backgroundPositionX', x + 'px');
                    this.addStyleUpdate('backgroundPositionY', y + 'px');
                }
            };

            StaticImage.prototype._updateTexture = function (value) {
                if (this.type === Kiwi.TYPE_DOM) {
                    this.domElement.element.style.backgroundImage = 'url("' + value + '")';
                }
                this.size.setTo(this.texture.image.width, this.texture.image.height);
            };

            StaticImage.prototype._updateRepeat = function (value) {
                if (this.type === Kiwi.TYPE_DOM) {
                    this.addStyleUpdate('backgroundRepeat', value);
                }
            };

            StaticImage.prototype._onAddedToLayer = function (layer) {
                klog.info('StaticImage added to Layer: ' + layer.name + ' type: ' + this.type);

                if (this.type === Kiwi.TYPE_DOM) {
                    this.domElement.element.style.backgroundImage = 'url("' + this.texture.getURL() + '")';
                    this.domElement.element.style.backgroundRepeat = this.texture.repeat();
                    this.domElement.element.style.backgroundSize = '100%';
                    this.size.addStyleImmediately(this);
                    this.position.addStyleImmediately(this);
                    klog.info('StaticImage DOM set');
                }

                return true;
            };

            StaticImage.prototype.render = function (camera) {
                _super.prototype.render.call(this, camera);

                if (this.type === Kiwi.TYPE_CANVAS && this.willRender() === true) {
                    if (this.bounds.showDebug === true) {
                        this.bounds.drawCanvasDebugOutline(this.layer);
                    }

                    this.layer.canvas.context.drawImage(this.texture.image, this.position.x(), this.position.y(), this.size.width(), this.size.height());
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
        var StaticObject = (function (_super) {
            __extends(StaticObject, _super);
            function StaticObject(x, y, width, height) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                if (typeof width === "undefined") { width = 1; }
                if (typeof height === "undefined") { height = 1; }
                _super.call(this, true, true, false);

                this.position = this.components.add(new Kiwi.Components.Position(x, y));
                this.size = this.components.add(new Kiwi.Components.Size(width, height));
                this.bounds = this.components.add(new Kiwi.Components.Bounds(x, y, width, height));

                this.onAddedToLayer.add(this._onAddedToLayer, this);

                this.position.updated.add(this._updatePosition, this);
                this.size.updated.add(this._updateSize, this);

                klog.info('Created StaticObject Game Object');
            }
            StaticObject.prototype._updatePosition = function (x, y, z) {
                if (this.type === Kiwi.TYPE_DOM) {
                    this.position.addStyleUpdates(this);
                }

                this.bounds.setTo(x, y, this.size.width(), this.size.height());
            };

            StaticObject.prototype._updateSize = function (width, height) {
                if (this.type === Kiwi.TYPE_DOM) {
                    this.size.addStyleUpdates(this);
                }

                this.bounds.setTo(this.position.x(), this.position.y(), width, height);
            };

            StaticObject.prototype._updateRepeat = function (value) {
                if (this.type === Kiwi.TYPE_DOM) {
                    this.addStyleUpdate('backgroundRepeat', value);
                }
            };

            StaticObject.prototype._onAddedToLayer = function (layer) {
                klog.info('StaticObject added to Layer: ' + layer.name + ' type: ' + this.type);

                if (this.type === Kiwi.TYPE_DOM) {
                    this.size.addStyleImmediately(this);
                    this.position.addStyleImmediately(this);
                    klog.info('StaticObject DOM set');
                }

                return true;
            };
            return StaticObject;
        })(Kiwi.Entity);
        GameObjects.StaticObject = StaticObject;
    })(Kiwi.GameObjects || (Kiwi.GameObjects = {}));
    var GameObjects = Kiwi.GameObjects;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (GameObjects) {
        var Textfield = (function (_super) {
            __extends(Textfield, _super);
            function Textfield(text, x, y, color, size, weight, fontFamily) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                if (typeof color === "undefined") { color = '#ffffff'; }
                if (typeof size === "undefined") { size = '32px'; }
                if (typeof weight === "undefined") { weight = 'normal'; }
                if (typeof fontFamily === "undefined") { fontFamily = 'cursive'; }
                _super.call(this, true, true, false);

                this.position = this.components.add(new Kiwi.Components.Position(x, y));

                this.alpha = this.components.add(new Kiwi.Components.Alpha(1));

                this._text = text;
                this._fontWeight = weight;
                this._fontSize = size;
                this._fontColor = color;
                this._fontFamily = fontFamily;
                this._lineHeight = '1em';
                this._textAlign = 'left';

                this.alpha.updated.add(this._updateAlpha, this);
                this.onAddedToLayer.add(this._onAddedToLayer, this);
                this.position.updated.add(this._updatePosition, this);

                klog.info('Created Textfield Game Object');
            }
            Textfield.prototype.objType = function () {
                return "Textfield";
            };

            Textfield.prototype.setText = function (value) {
                this._text = value;

                if (this.type === Kiwi.TYPE_DOM) {
                    this.domElement.element.innerHTML = this._text;
                }
            };

            Textfield.prototype.setSize = function (width, height) {
                this.size = this.components.add(new Kiwi.Components.Size(width, height));
                this.size.updated.add(this._updateSize, this);
                this._updateSize();
            };

            Textfield.prototype._updateSize = function () {
                if (this.type === Kiwi.TYPE_DOM) {
                    console.log('updatedSize');
                    this.size.addStyleUpdates(this);
                }
            };

            Textfield.prototype.fontColor = function (val) {
                if (val !== undefined) {
                    this._fontColor = val;
                }
                return this._fontColor;
            };

            Textfield.prototype.fontWeight = function (val) {
                if (val !== undefined) {
                    this._fontWeight = val;
                }
                return this._fontWeight;
            };

            Textfield.prototype.fontSize = function (val) {
                if (val !== undefined) {
                    this._fontSize = val;
                }
                return this._fontSize;
            };

            Textfield.prototype.fontFamily = function (val) {
                if (val !== undefined) {
                    this._fontFamily = val;
                }
                return this._fontFamily;
            };

            Textfield.prototype.lineHeight = function (val) {
                if (val !== undefined) {
                    this._lineHeight = val;
                }
                return this._lineHeight;
            };

            Textfield.prototype.textAlign = function (val) {
                if (val !== undefined) {
                    this._textAlign = val;
                }
                return this._textAlign;
            };

            Textfield.prototype._updateAlpha = function (value) {
                if (this.type === Kiwi.TYPE_DOM) {
                    this.alpha.addStyleUpdates(this);
                }
            };

            Textfield.prototype._onAddedToLayer = function (layer) {
                klog.info('Textfield added to Layer ' + layer.name);

                if (this.type === Kiwi.TYPE_DOM) {
                    this.domElement.element.style.fontFamily = this._fontFamily;
                    this.domElement.element.style.fontSize = this._fontSize;
                    this.domElement.element.style.fontWeight = this._fontWeight;
                    this.domElement.element.style.color = this._fontColor;
                    this.domElement.element.style.lineHeight = this._lineHeight;
                    this.domElement.element.style.textAlign = this._textAlign;
                    this.domElement.element.innerHTML = this._text;

                    this.position.addStyleImmediately(this);
                    this.alpha.addStyleImmediately(this);
                    if (this.size !== undefined)
                        this.size.addStyleImmediately(this);
                }

                return true;
            };

            Textfield.prototype._updatePosition = function (x, y, z, cssTranslate3d, cssLeft, cssTop) {
                if (this.type === Kiwi.TYPE_DOM) {
                    this.position.addStyleUpdates(this);
                }
            };

            Textfield.prototype.render = function (camera) {
                _super.prototype.render.call(this, camera);

                if (this.type === Kiwi.TYPE_CANVAS && this.willRender() === true) {
                    if (this.alpha.alpha() > 0 && this.alpha.alpha() <= 1) {
                        this.layer.canvas.context.save();
                        this.alpha.setContext(this.layer.canvas);
                    }

                    this.layer.canvas.context.font = this._fontWeight + ' ' + this._fontSize + ' ' + this._fontFamily;
                    this.layer.canvas.context.textAlign = this._textAlign;
                    this.layer.canvas.context.textBaseline = 'top';
                    this.layer.canvas.context.fillStyle = this._fontColor;

                    if (this.size !== undefined) {
                        this.layer.canvas.context.fillText(this._text, this.position.x(), this.position.y(), this.size.width());
                    } else {
                        this.layer.canvas.context.fillText(this._text, this.position.x(), this.position.y());
                    }

                    if (this.alpha.alpha() > 0 && this.alpha.alpha() <= 1) {
                        this.layer.canvas.context.restore();
                    }
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
        var LinkedGroup = (function (_super) {
            __extends(LinkedGroup, _super);
            function LinkedGroup(name, x, y, z) {
                if (typeof name === "undefined") { name = ''; }
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                if (typeof z === "undefined") { z = 0; }
                _super.call(this, name);

                this.position = this.components.add(new Kiwi.Components.Position(x, y, z));
                this.position.autoRound = false;
                this.position.updated.add(this._updatedPosition, this);
            }
            LinkedGroup.prototype.objType = function () {
                return "LinkedGroup";
            };

            LinkedGroup.prototype._updatedPosition = function (x, y, z) {
                this.forEach(this, this._updateChild, x, y);
            };

            LinkedGroup.prototype._updateChild = function (child, x, y) {
                if (child.components.hasActiveComponent('Position')) {
                    child.components.getComponent('Position').addTo(this.position.differenceX, this.position.differenceY);
                }
            };
            return LinkedGroup;
        })(Kiwi.Group);
        GameObjects.LinkedGroup = LinkedGroup;
    })(Kiwi.GameObjects || (Kiwi.GameObjects = {}));
    var GameObjects = Kiwi.GameObjects;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (GameObjects) {
        var Tile = (function () {
            function Tile(game, tilemap, index, width, height) {
                this.mass = 1.0;
                this.collideLeft = false;
                this.collideRight = false;
                this.collideUp = false;
                this.collideDown = false;
                this.separateX = true;
                this.separateY = true;
                this._game = game;
                this.tilemap = tilemap;
                this.index = index;

                this.width = width;
                this.height = height;
                this.allowCollisions = 0;
            }
            Tile.prototype.destroy = function () {
                this.tilemap = null;
            };

            Tile.prototype.setCollision = function (collision, resetCollisions, separateX, separateY) {
                if (resetCollisions) {
                    this.resetCollision();
                }

                this.separateX = separateX;
                this.separateY = separateY;

                this.allowCollisions = collision;
            };

            Tile.prototype.resetCollision = function () {
                this.collideLeft = false;
                this.collideRight = false;
                this.collideUp = false;
                this.collideDown = false;
            };

            Tile.prototype.toString = function () {
                return "[{Tiled (index=" + this.index + " collisions=" + this.allowCollisions + " width=" + this.width + " height=" + this.height + ")}]";
            };
            return Tile;
        })();
        GameObjects.Tile = Tile;
    })(Kiwi.GameObjects || (Kiwi.GameObjects = {}));
    var GameObjects = Kiwi.GameObjects;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (GameObjects) {
        var TileMap = (function (_super) {
            __extends(TileMap, _super);
            function TileMap() {
                console.log('TileMap Constructor');
                _super.call(this, true, false, false);
            }
            TileMap.prototype.createFromData = function (tileMapData, tileMapImageKey, tileMapImageCache, game, format) {
                var data;

                if (tileMapImageCache.checkImageCacheID(tileMapImageKey, tileMapImageCache) == false) {
                    console.log('Missing tilemap image data', tileMapImageKey);
                    return;
                }

                this._tileMapImageKey = tileMapImageKey;
                this._tileMapImageCache = tileMapImageCache;
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
                console.log('Created TileMap Game Object');
            };

            TileMap.prototype.createFromCache = function (tileMapDataKey, tileMapDataCache, tileMapImageKey, tileMapImageCache, game, format) {
                if (tileMapDataCache.checkDataCacheID(tileMapDataKey, tileMapDataCache) == false) {
                    console.log('Missing json data', tileMapDataKey);
                    return;
                }

                if (tileMapImageCache.checkImageCacheID(tileMapImageKey, tileMapImageCache) == false) {
                    console.log('Missing tilemap image data', tileMapImageKey);
                    return;
                }

                this._tileMapDataKey = tileMapDataKey;
                this._tileMapDataCache = tileMapDataCache;
                this._tileMapImageKey = tileMapImageKey;
                this._tileMapImageCache = tileMapImageCache;

                this.tiles = [];
                this.layers = [];

                this._game = game;

                this.mapFormat = format;

                switch (format) {
                    case TileMap.FORMAT_CSV:
                        break;

                    case TileMap.FORMAT_TILED_JSON:
                        var obj = JSON.parse(tileMapDataCache.data.getFile(tileMapDataKey).data);

                        this.parseTiledJSON(obj);

                        break;
                }

                console.log('Created TileMap Game Object');
            };

            TileMap.prototype.objType = function () {
                return "TileMap";
            };

            TileMap.prototype.update = function () {
            };

            TileMap.prototype.render = function (camera) {
                for (var i = 0; i < this.layers.length; i++) {
                    this.layers[i].render(camera);
                }
            };

            TileMap.prototype.parseTiledJSON = function (data) {
                console.log("parsing tiled json");

                var mapObj = data;

                for (var i = 0; i < mapObj.layers.length; i++) {
                    var layer = new GameObjects.TileMapLayer(this._game, this, this._tileMapImageCache, this._tileMapImageKey, TileMap.FORMAT_TILED_JSON, mapObj.layers[i].name, mapObj.tilewidth, mapObj.tileheight);

                    layer.alpha = mapObj.layers[i].opacity;
                    layer.visible = mapObj.layers[i].visible;
                    layer.tileMargin = mapObj.tilesets[0].margin;
                    layer.tileSpacing = mapObj.tilesets[0].spacing;

                    var c = 0;
                    var row;

                    for (var t = 0; t < mapObj.layers[i].data.length; t++) {
                        if (c == 0) {
                            row = [];
                        }

                        row.push(mapObj.layers[i].data[t]);

                        c++;

                        if (c == mapObj.layers[i].width) {
                            layer.addColumn(row);
                            c = 0;
                        }
                    }

                    layer.updateBounds();

                    var tileQuantity = layer.parseTileOffsets();

                    this.currentLayer = layer;

                    this.layers.push(layer);
                }

                this.generateTiles(tileQuantity);
            };

            TileMap.prototype.generateTiles = function (qty) {
                console.log("generate tiles" + qty);
                for (var i = 0; i < qty; i++) {
                    this.tiles.push(new GameObjects.Tile(this._game, this, i, this.currentLayer.tileWidth, this.currentLayer.tileHeight));
                }
            };

            TileMap.prototype.getTileByIndex = function (value) {
                if (this.tiles[value]) {
                    return this.tiles[value];
                }

                return null;
            };

            TileMap.prototype.getTile = function (x, y, layer) {
                if (typeof layer === "undefined") { layer = 0; }
                return this.tiles[this.layers[layer].getTileIndex(x, y)];
            };

            TileMap.prototype.getTileFromWorldXY = function (x, y, layer) {
                if (typeof layer === "undefined") { layer = 0; }
                return null;
            };

            TileMap.prototype.putTile = function (x, y, index, layer) {
                if (typeof layer === "undefined") { layer = 0; }
                this.layers[layer].putTile(x, y, index);
            };
            TileMap.FORMAT_CSV = 0;
            TileMap.FORMAT_TILED_JSON = 1;
            return TileMap;
        })(Kiwi.Entity);
        GameObjects.TileMap = TileMap;
    })(Kiwi.GameObjects || (Kiwi.GameObjects = {}));
    var GameObjects = Kiwi.GameObjects;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (GameObjects) {
        var TileMapLayer = (function () {
            function TileMapLayer(game, parent, imageCache, imageKey, mapFormat, name, tileWidth, tileHeight) {
                this._startX = 0;
                this._startY = 0;
                this._maxX = 0;
                this._maxY = 0;
                this._tx = 0;
                this._ty = 0;
                this._dx = 0;
                this._dy = 0;
                this._oldCameraX = 0;
                this._oldCameraY = 0;
                this.alpha = 1;
                this.exists = true;
                this.visible = true;
                this.widthInTiles = 0;
                this.heightInTiles = 0;
                this.widthInPixels = 0;
                this.heightInPixels = 0;
                this.tileMargin = 0;
                this.tileSpacing = 0;
                this.once = false;
                this._game = game;
                this._parent = parent;

                this.name = name;
                this.mapFormat = mapFormat;
                this.tileWidth = tileWidth;
                this.tileHeight = tileHeight;
                this.boundsInTiles = new Kiwi.Geom.Rectangle();

                this.mapData = [];
                this._tempTileBlock = [];
                this._texture = imageCache.images.getFile(imageKey).data;
            }
            TileMapLayer.prototype.putTile = function (x, y, index) {
                if (y >= 0 && y < this.mapData.length) {
                    if (x >= 0 && x < this.mapData[y].length) {
                        this.mapData[y][x] = index;
                    }
                }
            };

            TileMapLayer.prototype.getTileIndex = function (x, y) {
                if (y >= 0 && y < this.mapData.length) {
                    if (x >= 0 && x < this.mapData[y].length) {
                        return this.mapData[y][x];
                    }
                }

                return null;
            };

            TileMapLayer.prototype.addColumn = function (column) {
                var data = [];

                for (var c = 0; c < column.length; c++) {
                    data[c] = parseInt(column[c]);
                }

                if (this.widthInTiles == 0) {
                    this.widthInTiles = data.length;
                    this.widthInPixels = this.widthInTiles * this.tileWidth;
                }

                this.mapData.push(data);

                this.heightInTiles++;
                this.heightInPixels += this.tileHeight;
            };

            TileMapLayer.prototype.updateBounds = function () {
                this.boundsInTiles.setTo(0, 0, this.widthInTiles, this.heightInTiles);
            };

            TileMapLayer.prototype.parseTileOffsets = function () {
                console.log("parseTIleOffsets");
                this._tileOffsets = [];

                var i = 0;

                if (this.mapFormat == GameObjects.TileMap.FORMAT_TILED_JSON) {
                    this._tileOffsets[0] = null;
                    i = 1;
                }

                for (var ty = this.tileMargin; ty < this._texture.height; ty += (this.tileHeight + this.tileSpacing)) {
                    for (var tx = this.tileMargin; tx < this._texture.width; tx += (this.tileWidth + this.tileSpacing)) {
                        this._tileOffsets[i] = { x: tx, y: ty };
                        i++;
                    }
                }

                return this._tileOffsets.length;
            };

            TileMapLayer.prototype.render = function (camera) {
                this._maxX = Math.min(Math.ceil(camera.size.width() / this.tileWidth) + 1, this.widthInTiles);
                this._maxY = Math.min(Math.ceil(camera.size.height() / this.tileHeight) + 1, this.heightInTiles);

                this._startX = Math.floor(camera.position.x() / this.tileWidth);
                this._startY = Math.floor(camera.position.y() / this.tileHeight);

                if (!this.once) {
                }

                var ctx = this._parent.layer.canvas.context;
                this._dx = 0;
                this._dy = 0;

                this._dx += -(camera.position.x() - (this._startX * this.tileWidth));
                this._dy += -(camera.position.y() - (this._startY * this.tileHeight));

                this._tx = this._dx;
                this._ty = this._dy;

                for (var row = this._startY; row < this._startY + this._maxY; row++) {
                    this._columnData = this.mapData[row];

                    for (var tile = this._startX; tile < this._startX + this._maxX; tile++) {
                        if (this._tileOffsets[this._columnData[tile]]) {
                            ctx.drawImage(this._texture, this._tileOffsets[this._columnData[tile]].x, this._tileOffsets[this._columnData[tile]].y, this.tileWidth, this.tileHeight, this._tx, this._ty, this.tileWidth, this.tileHeight);
                        }

                        this._tx += this.tileWidth;
                    }

                    this._tx = this._dx;
                    this._ty += this.tileHeight;
                }

                this.once = true;
                return true;
            };
            return TileMapLayer;
        })();
        GameObjects.TileMapLayer = TileMapLayer;
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

            Circle.prototype.diameter = function (value) {
                if (value && value > 0) {
                    this._diameter = value;
                    this._radius = value * 0.5;
                }

                return this._diameter;
            };

            Circle.prototype.radius = function (value) {
                if (value && value > 0) {
                    this._radius = value;
                    this._diameter = value * 2;
                }

                return this._radius;
            };

            Circle.prototype.circumference = function () {
                return 2 * (Math.PI * this._radius);
            };

            Circle.prototype.bottom = function (value) {
                if (value && !isNaN(value)) {
                    if (value < this.y) {
                        this._radius = 0;
                        this._diameter = 0;
                    } else {
                        this.radius(value - this.y);
                    }
                }

                return this.y + this._radius;
            };

            Circle.prototype.left = function (value) {
                if (value && !isNaN(value)) {
                    if (value < this.x) {
                        this.radius(this.x - value);
                    } else {
                        this._radius = 0;
                        this._diameter = 0;
                    }
                }

                return this.x - this._radius;
            };

            Circle.prototype.right = function (value) {
                if (value && !isNaN(value)) {
                    if (value > this.x) {
                        this.radius(value - this.x);
                    } else {
                        this._radius = 0;
                        this._diameter = 0;
                    }
                }

                return this.x + this._radius;
            };

            Circle.prototype.top = function (value) {
                if (value && !isNaN(value)) {
                    if (value > this.y) {
                        this._radius = 0;
                        this._diameter = 0;
                    } else {
                        this.radius(this.y - value);
                    }
                }

                return this.y - this._radius;
            };

            Circle.prototype.area = function () {
                if (this._radius > 0) {
                    return Math.PI * this._radius * this._radius;
                } else {
                    return 0;
                }
            };

            Circle.prototype.isEmpty = function () {
                if (this._diameter <= 0) {
                    return true;
                }

                return false;
            };

            Circle.prototype.clone = function (output) {
                if (typeof output === "undefined") { output = new Circle(); }
                return output.setTo(this.x, this.y, this._diameter);
            };

            Circle.prototype.copyFrom = function (source) {
                return this.setTo(source.x, source.y, source.diameter());
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
                if (this.x === toCompare.x && this.y === toCompare.y && this.diameter() === toCompare.diameter()) {
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
                    angle = angle * (180 / Math.PI);
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
                return "[{Circle (x=" + this.x + " y=" + this.y + " diameter=" + this.diameter() + " radius=" + this.radius() + ")}]";
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

            Line.prototype.length = function () {
                return Math.sqrt((this.x2 - this.x1) * (this.x2 - this.x1) + (this.y2 - this.y1) * (this.y2 - this.y1));
            };

            Line.prototype.getY = function (x) {
                return this.slope() * x + this.yIntercept();
            };

            Line.prototype.angle = function () {
                return Math.atan2(this.x2 - this.x1, this.y2 - this.y1);
            };

            Line.prototype.slope = function () {
                return (this.y2 - this.y1) / (this.x2 - this.x1);
            };

            Line.prototype.perpSlope = function () {
                return -((this.x2 - this.x1) / (this.y2 - this.y1));
            };

            Line.prototype.yIntercept = function () {
                return (this.y1 - this.slope() * this.x1);
            };

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

                var yInt = (y - this.perpSlope() * x);

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
                if (line.perp(circle.x, circle.y).length() <= circle.radius()) {
                    output.result = true;
                }

                return output;
            };

            Intersect.lineToRectangle = function (line, rect, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                Intersect.lineToRawSegment(line, rect.x, rect.y, rect.right(), rect.y, output);

                if (output.result === true) {
                    return output;
                }

                Intersect.lineToRawSegment(line, rect.x, rect.y, rect.x, rect.bottom(), output);

                if (output.result === true) {
                    return output;
                }

                Intersect.lineToRawSegment(line, rect.x, rect.bottom(), rect.right(), rect.bottom(), output);

                if (output.result === true) {
                    return output;
                }

                Intersect.lineToRawSegment(line, rect.right(), rect.y, rect.right(), rect.bottom(), output);

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

                if (perp.length() <= circle.radius()) {
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
                    Intersect.lineToRawSegment(seg, rect.x, rect.y, rect.right(), rect.bottom(), output);

                    if (output.result === true) {
                        return output;
                    }

                    Intersect.lineToRawSegment(seg, rect.x, rect.y, rect.x, rect.bottom(), output);

                    if (output.result === true) {
                        return output;
                    }

                    Intersect.lineToRawSegment(seg, rect.x, rect.bottom(), rect.right(), rect.bottom(), output);

                    if (output.result === true) {
                        return output;
                    }

                    Intersect.lineToRawSegment(seg, rect.right(), rect.y, rect.right(), rect.bottom(), output);

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
                output.result = ((circle1.radius() + circle2.radius()) * (circle1.radius() + circle2.radius())) >= Intersect.distanceSquared(circle1.x, circle1.y, circle2.x, circle2.y);

                return output;
            };

            Intersect.circleToRectangle = function (circle, rect, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                var inflatedRect = rect.clone();

                inflatedRect.inflate(circle.radius(), circle.radius());

                output.result = inflatedRect.contains(circle.x, circle.y);

                return output;
            };

            Intersect.circleContainsPoint = function (circle, point, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                output.result = circle.radius() * circle.radius() >= Intersect.distanceSquared(circle.x, circle.y, point.x, point.y);

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
                var rightX = Math.min(rect1.right(), rect2.right());
                var topY = Math.max(rect1.y, rect2.y);
                var bottomY = Math.min(rect1.bottom(), rect2.bottom());

                output.setTo(leftX, topY, rightX - leftX, bottomY - topY, rightX - leftX, bottomY - topY);

                var cx = output.x + output.width * .5;
                var cy = output.y + output.height * .5;

                if ((cx > rect1.x && cx < rect1.right()) && (cy > rect1.y && cy < rect1.bottom())) {
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

            AABB.prototype.height = function () {
                return this.halfHeight * 2;
            };

            AABB.prototype.width = function () {
                return this.halfWidth * 2;
            };

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

            Ray.prototype.angle = function () {
                return Math.atan2(this.x2 - this.x1, this.y2 - this.y1);
            };

            Ray.prototype.slope = function () {
                return (this.y2 - this.y1) / (this.x2 - this.x1);
            };

            Ray.prototype.yIntercept = function () {
                return (this.y1 - this.slope() * this.x1);
            };

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

            Matrix.prototype.toString = function () {
                return "[{Matrix (a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + ")}]";
            };
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
            function Transform(x, y, scaleX, scaleY, rotation, regX, regY) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                if (typeof scaleX === "undefined") { scaleX = 1; }
                if (typeof scaleY === "undefined") { scaleY = 1; }
                if (typeof rotation === "undefined") { rotation = 0; }
                if (typeof regX === "undefined") { regX = 0; }
                if (typeof regY === "undefined") { regY = 0; }
                this._x = 0;
                this._y = 0;
                this._scaleX = 1;
                this._scaleY = 1;
                this._rotation = 0;
                this._regX = 0;
                this._regY = 0;
                this.setTransform(x, y, scaleX, scaleY, rotation, regX, regY);

                this._matrix = new Geom.Matrix();

                this._matrix.setFromTransform(this._x, this._y, this._scaleX, this._scaleY, this._rotation);

                this._cachedConcatenatedMatrix = this.getConcatenatedMatrix();
            }
            Transform.prototype.objType = function () {
                return "Transform";
            };

            Transform.prototype.x = function (value) {
                if (typeof value === "undefined") { value = null; }
                if (value !== null && value !== this._x) {
                    this._x = value;
                }

                return this._x;
            };

            Transform.prototype.y = function (value) {
                if (typeof value === "undefined") { value = null; }
                if (value !== null && value !== this._y) {
                    this._y = value;
                }

                return this._y;
            };

            Transform.prototype.scaleX = function (value) {
                if (typeof value === "undefined") { value = null; }
                if (value !== null && value !== this._scaleX) {
                    this._scaleX = value;
                }

                return this._scaleX;
            };

            Transform.prototype.scaleY = function (value) {
                if (typeof value === "undefined") { value = null; }
                if (value !== null && value !== this._scaleY) {
                    this._scaleY = value;
                }

                return this._scaleY;
            };

            Transform.prototype.rotation = function (value) {
                if (typeof value === "undefined") { value = null; }
                if (value !== null && value !== this._rotation) {
                    this._rotation = value;
                }

                return this._rotation;
            };

            Transform.prototype.regX = function (value) {
                if (typeof value === "undefined") { value = null; }
                if (value !== null && value !== this._regX) {
                    this._regX = value;
                }

                return this._regX;
            };

            Transform.prototype.regY = function (value) {
                if (typeof value === "undefined") { value = null; }
                if (value !== null && value !== this._regY) {
                    this._regY = value;
                }

                return this._regY;
            };

            Transform.prototype.matrix = function () {
                return this._matrix;
            };

            Transform.prototype.worldX = function () {
                return this.getConcatenatedMatrix().tx;
            };

            Transform.prototype.worldY = function () {
                return this.getConcatenatedMatrix().ty;
            };

            Transform.prototype.parent = function (value) {
                if (typeof value === "undefined") { value = null; }
                if (value !== null) {
                    if (!this.checkAncestor(value)) {
                        this._parent = value;
                    }
                }

                return this._parent;
            };

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

            Transform.prototype.scale = function (scaleX, scaleY) {
                this._scaleX = scaleX;
                this._scaleY = scaleY;

                return this;
            };

            Transform.prototype.setTransform = function (x, y, scaleX, scaleY, rotation, regX, regY) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                if (typeof scaleX === "undefined") { scaleX = 1; }
                if (typeof scaleY === "undefined") { scaleY = 1; }
                if (typeof rotation === "undefined") { rotation = 0; }
                if (typeof regX === "undefined") { regX = 0; }
                if (typeof regY === "undefined") { regY = 0; }
                this._x = x;
                this._y = y;
                this._scaleX = scaleX;
                this._scaleY = scaleY;
                this._rotation = rotation;
                this._regX = regX;
                this._regY = regY;

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
                this.setTransform(source.x(), source.y(), source.scaleX(), source.scaleY(), source.rotation(), source.regX(), source.regY());

                this.parent = source.parent;

                this._matrix = source.matrix().clone();

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
                if (transform === this) {
                    klog.warn("transform cannot be a parent to itself or an ancestor");
                    return true;
                }

                if (transform._parent !== null) {
                    return (this.checkAncestor(transform._parent));
                }

                return false;
            };

            Transform.prototype.toString = function () {
                return "[{Transform (x=" + this._x + " y=" + this._y + " scaleX=" + this._scaleX + " scaleY=" + this._scaleY + " rotation=" + this._rotation + " regX=" + this._regX + " regY=" + this.regY + " matrix=" + this._matrix + ")}]";
            };
            return Transform;
        })();
        Geom.Transform = Transform;
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

            HUDManager.prototype.defaultHUD = function (val) {
                if (val) {
                    if (this._currentHUD === this._defaultHUD) {
                        this._currentHUD = val;
                        this.setHUD(this._currentHUD);
                    }
                    this._defaultHUD = val;
                }

                return this._defaultHUD;
            };

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
                    klog.error("Cannot remove the default HUD.");
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
                this.position = this.components.add(new Kiwi.Components.Position(x, y));
                this.position.updated.add(this._updatePosition, this);
                this._updateCSS();
            }
            HUDWidget.prototype.setTemplate = function (main, element) {
                var containerElement = document.getElementById(main);
                if (containerElement === undefined) {
                    console.log('Container element not found');
                    return;
                }

                if (element === undefined) {
                    var fieldElement = containerElement;
                } else {
                    var fieldElement = document.getElementById(element);
                    if (fieldElement === undefined || containerElement.contains(fieldElement) === false) {
                        console.log('Field element not found inside container');
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

            HUDWidget.prototype._updatePosition = function () {
                this._updateCSS();
            };

            HUDWidget.prototype._updateCSS = function () {
                this.container.style.left = this.position.x() + "px";
                this.container.style.top = this.position.y() + "px";
            };

            HUDWidget.prototype.update = function () {
                this.components.update();
            };

            HUDWidget.prototype.render = function () {
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
                }
                return this._text;
            };

            TextField.prototype.update = function () {
                this._textField.innerText = this._text;
                _super.prototype.update.call(this);
            };
            return TextField;
        })(Kiwi.HUD.HUDWidget);
        HUD.TextField = TextField;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        var Bar = (function (_super) {
            __extends(Bar, _super);
            function Bar(current, max, x, y) {
                _super.call(this, "bar", x, y);

                this._horizontal = true;
                this._bar = document.createElement('div');
                this._bar.className = 'innerBar';

                this.range = this.components.add(new Kiwi.Components.Range(current, max, 0));
                this.range.updated.add(this.updateCSS, this);

                this.bar = this._bar;
                this.container.appendChild(this.bar);

                this._bar.style.height = '100%';
                this._bar.style.width = '100%';

                this.updateCSS();
            }
            Bar.prototype.horizontal = function (val) {
                if (val !== undefined) {
                    this._horizontal = val;
                    this.updateCSS();
                }
                return this._horizontal;
            };

            Bar.prototype.vertical = function (val) {
                if (val !== undefined) {
                    this._horizontal = !val;
                    this.updateCSS();
                }
                return !this._horizontal;
            };

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
            };

            Bar.prototype.update = function () {
                _super.prototype.update.call(this);
            };

            Bar.prototype.render = function () {
            };
            return Bar;
        })(Kiwi.HUD.HUDWidget);
        HUD.Bar = Bar;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        var Icon = (function (_super) {
            __extends(Icon, _super);
            function Icon(cacheID, cache, x, y) {
                _super.call(this, 'Icon', x, y);

                if (cache.checkImageCacheID(cacheID, cache) == false) {
                    console.log('Missing texture', cacheID);
                    return;
                }

                this.texture = this.components.add(new Kiwi.Components.Texture(cacheID, cache));
                this.size = this.components.add(new Kiwi.Components.Size(this.texture.file.data.width, this.texture.file.data.height));
                this.texture.updated.add(this._changeTexture, this);
                this.size.updated.add(this._applyCSS, this);

                this.icon = this.container;
                this._applyCSS();
            }
            Icon.prototype._changeTexture = function (value, width, height) {
                this.size.setTo(width, height);
            };

            Icon.prototype._removeCSS = function () {
                this.icon.style.width = '';
                this.icon.style.height = '';
                this.icon.style.backgroundImage = '';
                this.icon.style.backgroundRepeat = '';
                this.icon.style.backgroundSize = '';
            };

            Icon.prototype._applyCSS = function () {
                this.size.setCSS(this.icon);
                this.icon.style.backgroundImage = 'url("' + this.texture.getURL() + '")';
                this.icon.style.backgroundRepeat = 'no-repeat';
                this.icon.style.backgroundSize = '100%';
            };

            Icon.prototype.update = function () {
                _super.prototype.update.call(this);
            };

            Icon.prototype.setTemplate = function (main, icon) {
                this._removeCSS();

                _super.prototype.setTemplate.call(this, main, icon);

                if (this.tempElement !== undefined) {
                    this.icon = this.tempElement;
                }

                this._applyCSS();

                return true;
            };

            Icon.prototype.removeTemplate = function () {
                _super.prototype.removeTemplate.call(this);

                this._removeCSS();
                this.icon = this.container;
                this._applyCSS();

                return true;
            };
            return Icon;
        })(Kiwi.HUD.HUDWidget);
        HUD.Icon = Icon;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        var BasicBar = (function (_super) {
            __extends(BasicBar, _super);
            function BasicBar(current, max, x, y) {
                _super.call(this, current, max, x, y);

                this.container.style.width = '100px';
                this.container.style.height = '20px';
            }
            BasicBar.prototype.updateCSS = function () {
                if (this.horizontal() === true) {
                    this.bar.style.width = String(this.range.currentPercent()) + '%';
                    this.bar.style.height = '100%';
                } else {
                    this.bar.style.height = String(this.range.currentPercent()) + '%';
                    this.bar.style.width = '100%';
                }
            };

            BasicBar.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return BasicBar;
        })(Kiwi.HUD.Bar);
        HUD.BasicBar = BasicBar;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        var IconCounter = (function (_super) {
            __extends(IconCounter, _super);
            function IconCounter(cacheID, cache, current, max, x, y) {
                _super.call(this, cacheID, cache, x, y);

                this._horizontal = true;

                this._current = current;

                this.range = this.components.add(new Kiwi.Components.Range(current, max, 0));
                this.range.updated.add(this._changeSize, this);

                this._changeSize();
                this._applyCSS();
            }
            IconCounter.prototype._changeSize = function () {
                if (this._horizontal) {
                    this.texture.repeat('repeat-x');
                    this.size.setTo(this.texture.file.data.width * this.range.current(), this.texture.file.data.height);
                } else {
                    this.texture.repeat('repeat-y');
                    this.size.setTo(this.texture.file.data.width, this.texture.file.data.height * this.range.current());
                }
            };

            IconCounter.prototype._applyCSS = function () {
                _super.prototype._applyCSS.call(this);
                this.icon.style.backgroundRepeat = this.texture.repeat();
                this.icon.style.backgroundSize = this.texture.file.data.width + 'px ' + this.texture.file.data.height + 'px';
            };

            IconCounter.prototype.horizontal = function (val) {
                if (val !== undefined) {
                    this._horizontal = val;
                    this._applyCSS();
                }
                return this._horizontal;
            };

            IconCounter.prototype.vertical = function (val) {
                if (val !== undefined) {
                    this._horizontal = !val;
                    this._applyCSS();
                }
                return !this._horizontal;
            };

            IconCounter.prototype.update = function () {
                if (this._current != this.range.current()) {
                    this._applyCSS();
                    this._current = this.range.current();
                }
                _super.prototype.update.call(this);
            };
            return IconCounter;
        })(Kiwi.HUD.Icon);
        HUD.IconCounter = IconCounter;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        var BasicScore = (function (_super) {
            __extends(BasicScore, _super);
            function BasicScore(x, y) {
                _super.call(this, "basicScore", x, y);
                this.counter = this.components.add(new Kiwi.Components.Counter(0, 1));
            }
            BasicScore.prototype.update = function () {
                this.text(String(this.counter.value()));
                _super.prototype.update.call(this);
            };
            return BasicScore;
        })(Kiwi.HUD.TextField);
        HUD.BasicScore = BasicScore;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        var Button = (function (_super) {
            __extends(Button, _super);
            function Button(game, cacheID, cache, x, y) {
                _super.call(this, cacheID, cache, x, y);

                this.game = game;

                this.bounds = this.components.add(new Kiwi.Components.Bounds(this.position.x(), this.position.y(), this.size.width(), this.size.height()));
                this.input = this.components.add(new Kiwi.Components.WidgetInput(this.game, this.bounds));
            }
            return Button;
        })(Kiwi.HUD.Icon);
        HUD.Button = Button;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        var Time = (function (_super) {
            __extends(Time, _super);
            function Time(format, x, y) {
                _super.call(this, 'time', x, y);

                this.time = this.components.add(new Kiwi.Components.Time(0));

                this.format(format);
                this.updateTime();
            }
            Time.prototype.setTime = function (milliseconds, seconds, minutes, hours) {
                this.time.setTime(milliseconds, seconds, minutes, hours);

                this.text(this.updateTime());
            };

            Time.prototype.format = function (val) {
                if (val !== undefined) {
                    this._format = val;
                }
                return this._format;
            };

            Time.prototype.updateTime = function () {
                var ms = String(this.time.milliseconds());
                var s = String(this.time.seconds());
                var m = String(this.time.minutes());
                var h = String(this.time.hours());

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

                return time;
            };

            Time.prototype.update = function () {
                if (!this.time.paused)
                    this.text(this.updateTime());

                _super.prototype.update.call(this);
            };
            return Time;
        })(Kiwi.HUD.TextField);
        HUD.Time = Time;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        var Menu = (function (_super) {
            __extends(Menu, _super);
            function Menu(game, x, y) {
                _super.call(this, 'menu', x, y);

                this.game = game;
                this._menuItems = [];
            }
            Menu.prototype.addMenuItem = function (item) {
                this._menuItems.push(item);
                this.container.appendChild(item.container);
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
                    console.log('Failed find container');
                    return;
                }

                var subElements = mainElement.getElementsByTagName(sub);
                if (subElements === undefined) {
                    console.log('No menu items found');
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
        HUD.Menu = Menu;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        var MenuItem = (function (_super) {
            __extends(MenuItem, _super);
            function MenuItem(name, width, height, x, y) {
                _super.call(this, name, x, y);

                this.size = this.components.add(new Kiwi.Components.Size(width, height));
                this.bounds = this.components.add(new Kiwi.Components.Bounds(this.position.x(), this.position.y(), this.size.width(), this.size.height()));

                this.size.updated.add(this._applyCSS);

                this.container.innerText = name;
                this._applyCSS();
            }
            MenuItem.prototype.addedToStage = function (game, menu) {
                this.game = game;
                this.menu = menu;
                this._applyCSS();
                this.input = this.components.add(new Kiwi.Components.WidgetInput(this.game, this.bounds));
            };

            MenuItem.prototype._applyCSS = function () {
                this.size.setCSS(this.container);
                var addX = 0;
                var addY = 0;
                if (this.menu !== undefined) {
                    addX += this.menu.position.x();
                    addY += this.menu.position.y();
                }
                this.bounds.setTo(this.position.x() + addX, this.position.y() + addY, this.size.width(), this.size.height());
            };
            return MenuItem;
        })(Kiwi.HUD.HUDWidget);
        HUD.MenuItem = MenuItem;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Components) {
        var Counter = (function (_super) {
            __extends(Counter, _super);
            function Counter(initial, step) {
                _super.call(this, "counter", true, true, true);
                this._value = 0;
                this._value = initial;
                this.step = step;
            }
            Counter.prototype.value = function (val) {
                if (val !== undefined) {
                    this._value = val;
                }

                return this._value;
            };

            Counter.prototype.increment = function (val) {
                if (val !== undefined) {
                    this._value += val;
                } else {
                    this._value += this.step;
                }
            };

            Counter.prototype.decrement = function (val) {
                if (val !== undefined) {
                    this._value -= val;
                } else {
                    this._value -= this.step;
                }
            };
            return Counter;
        })(Kiwi.Component);
        Components.Counter = Counter;
    })(Kiwi.Components || (Kiwi.Components = {}));
    var Components = Kiwi.Components;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Components) {
        var WidgetInput = (function (_super) {
            __extends(WidgetInput, _super);
            function WidgetInput(game, bounds) {
                _super.call(this, 'WidgetInput', true, true, true);

                this.game = game;

                this.inputEntered = new Kiwi.Signal();
                this.inputLeft = new Kiwi.Signal();
                this.inputOnDown = new Kiwi.Signal();
                this.inputOnRelease = new Kiwi.Signal();

                this._bounds = bounds;
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
                if (this._bounds.pointWithin(this.game.input.position)) {
                    this.distance.x = this.game.input.position.x - this._bounds.getRect().left();
                    this.distance.y = this.game.input.position.y - this._bounds.getRect().top();

                    if (this.withinBounds === false) {
                        this.withinBounds = true;
                        this.outsideBounds = false;
                        this.inputEntered.dispatch(this.distance.x, this.distance.y);
                    }
                } else {
                    if (this.withinBounds === true) {
                        this.withinBounds = false;
                        this.outsideBounds = true;
                        this.inputLeft.dispatch();
                    }
                }

                if (this.game.input.isDown === true) {
                    if (this.withinBounds === true && this.isDown === false) {
                        this.isDown = true;
                        this.isUp = false;
                        this.pointDown.copyFrom(this.distance);
                        this.inputOnDown.dispatch(this.pointDown.x, this.pointDown.y);
                    }
                } else {
                    if (this.isDown === true) {
                        this.isDown = false;
                        this.isUp = true;
                        this.inputOnRelease.dispatch();
                    }
                }
            };

            WidgetInput.prototype.toString = function () {
                return '[{WidgetInput (x=' + this.withinBounds + ')}]';
            };
            return WidgetInput;
        })(Kiwi.Component);
        Components.WidgetInput = WidgetInput;
    })(Kiwi.Components || (Kiwi.Components = {}));
    var Components = Kiwi.Components;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Components) {
        var Range = (function (_super) {
            __extends(Range, _super);
            function Range(current, max, min) {
                _super.call(this, "counter", true, true, true);

                this._current = current;

                this._max = max;

                this._min = min;

                this.updated = new Kiwi.Signal();
            }
            Range.prototype.max = function (val) {
                if (val !== undefined) {
                    this._max = val;
                    this.updated.dispatch(this._current, this._max, this._min);
                }
                return this._max;
            };

            Range.prototype.min = function (val) {
                if (val !== undefined) {
                    this._min = val;
                    this.updated.dispatch(this._current, this._max, this._min);
                }
                return this._min;
            };

            Range.prototype.current = function (val) {
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
                return this._current;
            };

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
            };

            Range.prototype.currentPercent = function () {
                return ((this.current()) / (this.max())) * 100;
            };
            return Range;
        })(Kiwi.Component);
        Components.Range = Range;
    })(Kiwi.Components || (Kiwi.Components = {}));
    var Components = Kiwi.Components;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Components) {
        var Time = (function (_super) {
            __extends(Time, _super);
            function Time(milliseconds, seconds, minutes, hours) {
                _super.call(this, "time", true, true, true);

                this.paused = true;
                this._countDown = true;

                this._lastTime = Date.now();
                this.setTime(milliseconds, seconds, minutes, hours);
            }
            Time.prototype.countingDown = function (val) {
                if (val !== undefined) {
                    if (val == true)
                        this.paused = false;

                    this._countDown = val;
                }
                return this._countDown;
            };

            Time.prototype.countingUp = function (val) {
                if (val !== undefined) {
                    if (val == true)
                        this.paused = false;

                    this._countDown = !val;
                }
                return !this._countDown;
            };

            Time.prototype.setTime = function (milliseconds, seconds, minutes, hours) {
                if (seconds !== undefined)
                    milliseconds += this.convertToMilli(seconds, 's');
                if (minutes !== undefined)
                    milliseconds += this.convertToMilli(minutes, 'm');
                if (hours !== undefined)
                    milliseconds += this.convertToMilli(hours, 'h');

                this._milliseconds = milliseconds;

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

            Time.prototype.milliseconds = function (val) {
                if (val !== undefined) {
                    this._milliseconds = val;
                }
                return this._milliseconds % 1000;
            };

            Time.prototype.seconds = function (val) {
                if (val !== undefined) {
                    this._milliseconds = this.convertToMilli(val, 's');
                }
                return Math.floor(this._milliseconds / 1000) % 60;
            };

            Time.prototype.minutes = function (val) {
                if (val !== undefined) {
                    this._milliseconds = this.convertToMilli(val, 'm');
                }
                return Math.floor(this._milliseconds / 1000 / 60) % 60;
            };

            Time.prototype.hours = function (val) {
                if (val !== undefined) {
                    this._milliseconds = this.convertToMilli(val, 'h');
                }
                return Math.floor(this._milliseconds / 1000 / 60 / 60);
            };

            Time.prototype.update = function () {
                if (!this.paused) {
                    var newTime = Date.now();
                    var difference = newTime - this._lastTime;
                    this._lastTime = newTime;

                    if (this._countDown) {
                        this.milliseconds(this._milliseconds - difference);
                    } else {
                        this.milliseconds(this._milliseconds + difference);
                    }
                }

                _super.prototype.update.call(this);
            };
            return Time;
        })(Kiwi.Component);
        Components.Time = Time;
    })(Kiwi.Components || (Kiwi.Components = {}));
    var Components = Kiwi.Components;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Input) {
        var Finger = (function () {
            function Finger(game) {
                this.point = null;
                this.circle = null;
                this.withinGame = false;
                this.clientX = -1;
                this.clientY = -1;
                this.pageX = -1;
                this.pageY = -1;
                this.screenX = -1;
                this.screenY = -1;
                this.x = -1;
                this.y = -1;
                this.isDown = false;
                this.isUp = false;
                this.timeDown = 0;
                this.duration = 0;
                this.timeUp = 0;
                this.justPressedRate = 200;
                this.justReleasedRate = 200;
                this._game = game;
                this.active = false;
            }
            Finger.prototype.objType = function () {
                return "Finger";
            };

            Finger.prototype.start = function (event) {
                this.identifier = event.identifier;
                this.target = event.target;

                if (this.point === null) {
                    this.point = new Kiwi.Geom.Point();
                }

                if (this.circle === null) {
                    this.circle = new Kiwi.Geom.Circle(0, 0, 44);
                }

                this.move(event);

                this.active = true;
                this.withinGame = true;
                this.isDown = true;
                this.isUp = false;
                this.timeDown = this._game.time.now();
            };

            Finger.prototype.move = function (event) {
                this.clientX = event.clientX;
                this.clientY = event.clientY;
                this.pageX = event.pageX;
                this.pageY = event.pageY;
                this.screenX = event.screenX;
                this.screenY = event.screenY;

                this.x = this.pageX - this._game.stage.offset.x;
                this.y = this.pageY - this._game.stage.offset.y;

                this.point.setTo(this.x, this.y);
                this.circle.setTo(this.x, this.y, 44);

                this.duration = this._game.time.now() - this.timeDown;
            };

            Finger.prototype.leave = function (event) {
                this.withinGame = false;
                this.move(event);
            };

            Finger.prototype.stop = function (event) {
                this.active = false;
                this.withinGame = false;

                this.isDown = false;
                this.isUp = true;
                this.timeUp = this._game.time.now();
                this.duration = this.timeUp - this.timeDown;
            };

            Finger.prototype.justPressed = function (duration) {
                if (typeof duration === "undefined") { duration = this.justPressedRate; }
                if (this.isDown === true && (this.timeDown + duration) > this._game.time.now()) {
                    return true;
                } else {
                    return false;
                }
            };

            Finger.prototype.justReleased = function (duration) {
                if (typeof duration === "undefined") { duration = this.justReleasedRate; }
                if (this.isUp === true && (this.timeUp + duration) > this._game.time.now()) {
                    return true;
                } else {
                    return false;
                }
            };

            Finger.prototype.toString = function () {
                return "[{Finger (identifer=" + this.identifier + " active=" + this.active + " duration=" + this.duration + " withinGame=" + this.withinGame + " x=" + this.x + " y=" + this.y + " clientX=" + this.clientX + " clientY=" + this.clientY + " screenX=" + this.screenX + " screenY=" + this.screenY + " pageX=" + this.pageX + " pageY=" + this.pageY + ")}]";
            };
            return Finger;
        })();
        Input.Finger = Finger;
    })(Kiwi.Input || (Kiwi.Input = {}));
    var Input = Kiwi.Input;
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
                klog.info('Keyboard Handler booted');

                this.start();
            };

            Keyboard.prototype.update = function () {
            };

            Keyboard.prototype.start = function () {
                var _this = this;
                document.body.addEventListener('keydown', function (event) {
                    return _this.onKeyDown(event);
                }, false);
                document.body.addEventListener('keyup', function (event) {
                    return _this.onKeyUp(event);
                }, false);
            };

            Keyboard.prototype.stop = function () {
                var _this = this;
                this._domElement.removeEventListener('keydown', function (event) {
                    return _this.onKeyDown(event);
                }, false);
                this._domElement.removeEventListener('keyup', function (event) {
                    return _this.onKeyUp(event);
                }, false);
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
        var Mouse = (function () {
            function Mouse(game) {
                this._domElement = null;
                this.point = null;
                this.justPressedRate = 200;
                this.justReleasedRate = 200;
                this.isDown = false;
                this.isUp = true;
                this.timeDown = 0;
                this.duration = 0;
                this.timeUp = 0;
                this._game = game;
            }
            Mouse.prototype.objType = function () {
                return "Mouse";
            };

            Mouse.prototype.boot = function () {
                klog.info('Mouse Handler booted');

                this._domElement = this._game.stage.container;

                this.point = new Kiwi.Geom.Point();

                this.mouseDown = new Kiwi.Signal();
                this.mouseUp = new Kiwi.Signal();

                this.start();
            };

            Mouse.prototype.update = function () {
                if (this.isDown === true) {
                    this.duration = this._game.time.now() - this.timeDown;
                }
            };

            Mouse.prototype.start = function () {
                var _this = this;
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
            };

            Mouse.prototype.stop = function () {
                var _this = this;
                this._domElement.removeEventListener('mousedown', function (event) {
                    return _this.onMouseDown(event);
                }, false);
                this._domElement.removeEventListener('mousedown', this.onMouseDown, false);
                this._domElement.removeEventListener('mousemove', this.onMouseMove, false);
                this._domElement.removeEventListener('mouseup', this.onMouseUp, false);
                this._domElement.removeEventListener('mousewheel', this.onMouseWheel, false);
                this._domElement.removeEventListener('DOMMouseScroll', this.onMouseWheel, false);
            };

            Mouse.prototype.onMouseDown = function (event) {
                this.screenX = event.screenX;
                this.screenY = event.screenY;
                this.clientX = event.clientX;
                this.clientY = event.clientY;
                this.ctrlKey = event.ctrlKey;
                this.shiftKey = event.shiftKey;
                this.altKey = event.altKey;
                this.button - event.button;

                this._x = this.clientX - this._game.stage.offset.x;
                this._y = this.clientY - this._game.stage.offset.y;

                this.point.setTo(this._x, this._y);

                this.isDown = true;
                this.isUp = false;
                this.timeDown = event.timeStamp;

                this.mouseDown.dispatch(this._x, this._y, this.timeDown, this.timeUp, this.duration);
            };

            Mouse.prototype.onMouseMove = function (event) {
                this.screenX = event.screenX;
                this.screenY = event.screenY;
                this.clientX = event.clientX;
                this.clientY = event.clientY;
                this.ctrlKey = event.ctrlKey;
                this.shiftKey = event.shiftKey;
                this.altKey = event.altKey;
                this.button - event.button;

                this._x = this.clientX - this._game.stage.offset.x;
                this._y = this.clientY - this._game.stage.offset.y;

                this.point.setTo(this._x, this._y);
            };

            Mouse.prototype.onMouseUp = function (event) {
                this.screenX = event.screenX;
                this.screenY = event.screenY;
                this.clientX = event.clientX;
                this.clientY = event.clientY;
                this.ctrlKey = event.ctrlKey;
                this.shiftKey = event.shiftKey;
                this.altKey = event.altKey;
                this.button - event.button;

                this.isDown = false;
                this.isUp = true;
                this.timeUp = event.timeStamp;
                this.duration = this.timeUp - this.timeDown;

                this._x = this.clientX - this._game.stage.offset.x;
                this._y = this.clientY - this._game.stage.offset.y;

                this.mouseUp.dispatch(this._x, this._y, this.timeDown, this.timeUp, this.duration);
            };

            Mouse.prototype.x = function () {
                return this._x;
            };

            Mouse.prototype.y = function () {
                return this._y;
            };

            Mouse.prototype.onMouseWheel = function (event) {
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

            Mouse.prototype.justPressed = function (duration) {
                if (typeof duration === "undefined") { duration = this.justPressedRate; }
                if (this.isDown === true && (this.timeDown + duration) > this._game.time.now()) {
                    return true;
                } else {
                    return false;
                }
            };

            Mouse.prototype.justReleased = function (duration) {
                if (typeof duration === "undefined") { duration = this.justReleasedRate; }
                if (this.isUp === true && (this.timeUp + duration) > this._game.time.now()) {
                    return true;
                } else {
                    return false;
                }
            };

            Mouse.prototype.reset = function () {
                this.timeUp = 0;
                this.timeDown = 0;
                this.isDown = false;
                this.isUp = false;
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

            Manager.prototype.boot = function () {
                if (Kiwi.DEVICE.touch === true) {
                    this.touch = new Kiwi.Input.Touch(this.game);
                    this.touch.boot();
                    this.touch.touchDown.add(this._onDownEvent, this);
                    this.touch.touchUp.add(this._onUpEvent, this);
                } else {
                    this.mouse = new Kiwi.Input.Mouse(this.game);
                    this.mouse.boot();
                    this.mouse.mouseDown.add(this._onDownEvent, this);
                    this.mouse.mouseUp.add(this._onUpEvent, this);
                    this.keyboard = new Kiwi.Input.Keyboard(this.game);
                    this.keyboard.boot();
                }

                this.isDown = false;
                this.position = new Kiwi.Geom.Point();

                this.onDown = new Kiwi.Signal();
                this.onUp = new Kiwi.Signal();
                this.onPressed = new Kiwi.Signal();
                this.onReleased = new Kiwi.Signal();
            };

            Manager.prototype._onDownEvent = function (x, y, timeDown, timeUp, duration) {
                this.onDown.dispatch(x, y, timeDown, timeUp, duration);
            };

            Manager.prototype._onUpEvent = function (x, y, timeDown, timeUp, duration) {
                this.onUp.dispatch(x, y, timeDown, timeUp, duration);
            };

            Manager.prototype._onPressedEvent = function () {
            };

            Manager.prototype._onReleasedEvent = function () {
            };

            Manager.prototype.update = function () {
                if (Kiwi.DEVICE.touch === true) {
                    this.touch.update();
                    this.position.setTo(this.touch.x(), this.touch.y());
                    this.isDown = this.touch.isDown;
                } else {
                    this.keyboard.update();
                    this.mouse.update();
                    this.position.setTo(this.mouse.x(), this.mouse.y());
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

            Manager.prototype.x = function () {
                return this.position.x;
            };

            Manager.prototype.y = function () {
                return this.position.y;
            };
            return Manager;
        })();
        Input.Manager = Manager;
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
                this._game = game;
            }
            Touch.prototype.objType = function () {
                return "Touch";
            };

            Touch.prototype.boot = function () {
                klog.info('Touch Handler booted');

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

                this.touchDown = new Kiwi.Signal();
                this.touchUp = new Kiwi.Signal();

                this.start();
            };

            Touch.prototype.start = function () {
                var _this = this;
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
            };

            Touch.prototype.consumeTouchMove = function (event) {
                event.preventDefault();
            };

            Touch.prototype.x = function () {
                return this._x;
            };

            Touch.prototype.y = function () {
                return this._y;
            };

            Touch.prototype.onTouchStart = function (event) {
                klog.info('touch start');

                event.preventDefault();

                for (var i = 0; i < event.changedTouches.length; i++) {
                    for (var f = 0; f < this._fingers.length; f++) {
                        if (this._fingers[f].active === false) {
                            this._fingers[f].start(event.changedTouches[i]);
                            this._x = this._fingers[f].x;
                            this._y = this._fingers[f].y;
                            klog.info('x: ' + this._x + ' y: ' + this._y);
                            this.touchDown.dispatch(this._fingers[f].x, this._fingers[f].y, this._fingers[f].timeDown, this._fingers[f].timeUp, this._fingers[f].duration);
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
                        if (this._fingers[f].identifier === event.changedTouches[i].identifier) {
                            this._fingers[f].stop(event.changedTouches[i]);
                            break;
                        }
                    }
                }
            };

            Touch.prototype.onTouchEnter = function (event) {
                for (var i = 0; i < event.changedTouches.length; i++) {
                    for (var f = 0; f < this._fingers.length; f++) {
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
                        if (this._fingers[f].identifier === event.changedTouches[i].identifier) {
                            this._fingers[f].leave(event.changedTouches[i]);
                            break;
                        }
                    }
                }
            };

            Touch.prototype.onTouchMove = function (event) {
                for (var i = 0; i < event.changedTouches.length; i++) {
                    for (var f = 0; f < this._fingers.length; f++) {
                        if (this._fingers[f].identifier === event.changedTouches[i].identifier) {
                            this._fingers[f].move(event.changedTouches[i]);
                            this._x = this._fingers[f].x;
                            this._y = this._fingers[f].y;

                            break;
                        }
                    }
                }
            };

            Touch.prototype.onTouchEnd = function (event) {
                for (var i = 0; i < event.changedTouches.length; i++) {
                    for (var f = 0; f < this._fingers.length; f++) {
                        if (this._fingers[f].identifier === event.changedTouches[i].identifier) {
                            this._fingers[f].stop(event.changedTouches[i]);
                            this._x = this._fingers[f].x;
                            this._y = this._fingers[f].y;
                            this.touchUp.dispatch(this._fingers[f].x, this._fingers[f].y, this._fingers[f].timeDown, this._fingers[f].timeUp, this._fingers[f].duration);
                            this.isDown = false;
                            this.isUp = true;
                            break;
                        }
                    }
                }
            };

            Touch.prototype.calculateDistance = function (finger1, finger2) {
            };

            Touch.prototype.calculateAngle = function (finger1, finger2) {
            };

            Touch.prototype.checkOverlap = function (finger1, finger2) {
            };

            Touch.prototype.update = function () {
            };

            Touch.prototype.stop = function () {
            };

            Touch.prototype.reset = function () {
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
                    console.log("converting GF to Kiwi Width Height");
                    var terrain = this._gfData.map.terrain;

                    for (var i = 0; i < terrain.length; i++) {
                        if (parseInt(terrain[i].xpos) > this.kiwiData.width)
                            this.kiwiData.width = parseInt(terrain[i].xpos) + 1;
                        if (parseInt(terrain[i].ypos) > this.kiwiData.height)
                            this.kiwiData.height = parseInt(terrain[i].ypos) + 1;
                    }
                    console.log("width = " + this.kiwiData.width + ", height = " + this.kiwiData.height);
                };

                TileMapConverter.prototype._convertTilesets = function () {
                    console.log("converting GF to Kiwi TileSets");

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
                    console.log("converting GF to Kiwi Layers");

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

                    console.log("data len " + layer.data.length);
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

                            console.log("dataIndex" + dataIndex, x, y);

                            var gfpos = this._getSpritePosition(terrain[i].animation_id);

                            layer.data[dataIndex] = gfpos + 1;
                        }
                    }
                    console.log("count " + count);
                    console.log("data len " + layer.data.length);
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
    (function (Structs) {
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
        Structs.Dictionary = Dictionary;
    })(Kiwi.Structs || (Kiwi.Structs = {}));
    var Structs = Kiwi.Structs;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Structs) {
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

                if (!(other instanceof Kiwi.Structs.LinkedList)) {
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
        Structs.LinkedList = LinkedList;
    })(Kiwi.Structs || (Kiwi.Structs = {}));
    var Structs = Kiwi.Structs;
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
                klog.info('MasterClock booted');

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

                klog.error("No clock with the name: " + name + " exists.");
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
    (function (Tweens) {
        var Manager = (function () {
            function Manager(game) {
                klog.info('Tween Manager created');
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
                return new Kiwi.Tween(object, this._game);
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
    })(Kiwi.Tweens || (Kiwi.Tweens = {}));
    var Tweens = Kiwi.Tweens;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
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
    })(Kiwi.Tweens || (Kiwi.Tweens = {}));
    var Tweens = Kiwi.Tweens;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Tweens) {
        (function (Easing) {
            var Bounce = (function () {
                function Bounce() {
                }
                Bounce.prototype.objType = function () {
                    return "Bounce";
                };

                Bounce.In = function (k) {
                    return 1 - Kiwi.Tweens.Easing.Bounce.Out(1 - k);
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
                        return Kiwi.Tweens.Easing.Bounce.In(k * 2) * 0.5;
                    return Kiwi.Tweens.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
                };
                return Bounce;
            })();
            Easing.Bounce = Bounce;
        })(Tweens.Easing || (Tweens.Easing = {}));
        var Easing = Tweens.Easing;
    })(Kiwi.Tweens || (Kiwi.Tweens = {}));
    var Tweens = Kiwi.Tweens;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
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
    })(Kiwi.Tweens || (Kiwi.Tweens = {}));
    var Tweens = Kiwi.Tweens;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
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
    })(Kiwi.Tweens || (Kiwi.Tweens = {}));
    var Tweens = Kiwi.Tweens;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
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
    })(Kiwi.Tweens || (Kiwi.Tweens = {}));
    var Tweens = Kiwi.Tweens;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
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
    })(Kiwi.Tweens || (Kiwi.Tweens = {}));
    var Tweens = Kiwi.Tweens;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
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
    })(Kiwi.Tweens || (Kiwi.Tweens = {}));
    var Tweens = Kiwi.Tweens;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
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
    })(Kiwi.Tweens || (Kiwi.Tweens = {}));
    var Tweens = Kiwi.Tweens;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
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
    })(Kiwi.Tweens || (Kiwi.Tweens = {}));
    var Tweens = Kiwi.Tweens;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
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
    })(Kiwi.Tweens || (Kiwi.Tweens = {}));
    var Tweens = Kiwi.Tweens;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
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
    })(Kiwi.Tweens || (Kiwi.Tweens = {}));
    var Tweens = Kiwi.Tweens;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
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
            this._easingFunction = Kiwi.Tweens.Easing.Linear.None;
            this._interpolationFunction = Kiwi.Utils.GameMath.linearInterpolation;
            this._chainedTweens = [];
            this._onStartCallback = null;
            this._onStartCallbackFired = false;
            this._onUpdateCallback = null;
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

        Tween.prototype.onStart = function (callback) {
            this._onStartCallback = callback;
            return this;
        };

        Tween.prototype.onUpdate = function (callback) {
            this._onUpdateCallback = callback;
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
                    this._onStartCallback.call(this._object);
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
                this._onUpdateCallback.call(this._object, value);
            }

            if (elapsed == 1) {
                this.isRunning = false;

                if (this._onCompleteCallback !== null && this._onCompleteCalled == false) {
                    this._onCompleteCalled = true;
                    this._onCompleteCallback.apply(this._onCompleteContext, this._object);
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
    Kiwi.Tween = Tween;
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
                klog.info('Random Data Generator created');

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
                    klog.info('Kiwi.Utils.RequestAnimationFrame: false');
                    this._isSetTimeOut = true;
                    this._timeOutID = window.setTimeout(function () {
                        return _this.SetTimeoutUpdate();
                    }, 0);
                } else {
                    klog.info('Kiwi.Utils.RequestAnimationFrame: true');
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
    Kiwi.VERSION = "1.0";

    Kiwi.TYPE_UNASSIGNED = 0;
    Kiwi.TYPE_CANVAS = 1;
    Kiwi.TYPE_DOM = 2;
    Kiwi.TYPE_WEBGL = 3;
    Kiwi.TYPE_AUTODETECT = 4;

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

    var GameManager = (function () {
        function GameManager() {
        }
        GameManager.prototype.objType = function () {
            return "GameManager";
        };

        GameManager.register = function (game) {
            klog.info('Registering game with Kiwi.GameManager v' + Kiwi.VERSION);

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

var klog;
var Kiwi;
(function (Kiwi) {
    var Game = (function () {
        function Game(domParent, defaultType, name, state) {
            if (typeof domParent === "undefined") { domParent = ''; }
            if (typeof defaultType === "undefined") { defaultType = Kiwi.TYPE_DOM; }
            if (typeof name === "undefined") { name = 'KiwiGame'; }
            if (typeof state === "undefined") { state = null; }
            var _this = this;
            this._dom = null;
            this.anims = null;
            this.browser = null;
            this.cache = null;
            this.input = null;
            this.layers = null;
            this.cameras = null;
            this.loader = null;
            this.raf = null;
            this.stage = null;
            this.states = null;
            this.time = null;
            this.tweens = null;
            this.rnd = null;
            this.id = Kiwi.GameManager.register(this);

            this._dom = new Kiwi.DOM.Bootstrap();

            this.anims = new Kiwi.Anims.Manager(this);

            this.browser = new Kiwi.DOM.Browser(this);
            this.cache = new Kiwi.Cache(this);
            this.input = new Kiwi.Input.Manager(this);

            this.stage = new Kiwi.Stage(this, name, defaultType);
            this.layers = new Kiwi.LayerManager(this, defaultType);
            this.cameras = new Kiwi.CameraManager(this, false);
            this.huds = new Kiwi.HUD.HUDManager(this);

            this.loader = new Kiwi.Loader(this);

            this.states = new Kiwi.StateManager(this);
            this.rnd = new Kiwi.Utils.RandomDataGenerator([Date.now.toString()]);
            this.time = new Kiwi.Time.Manager(this);
            this.tweens = new Kiwi.Tweens.Manager(this);

            if (state !== null) {
                if (this.states.addState(state, true) === false) {
                    throw Error("Invalid State passed to Kiwi.Game");
                }
            }

            this._dom.boot(domParent, function () {
                return _this.start();
            });
        }
        Game.prototype.objType = function () {
            return "Game";
        };

        Game.prototype.start = function () {
            var _this = this;
            if (Kiwi.DEVICE === null) {
                Kiwi.DEVICE = new Kiwi.Device();
            }

            this.browser.boot();
            this.stage.boot(this._dom);
            this.layers.boot();
            this.cameras.boot(this._dom.domLayers);
            this.huds.boot();
            this.time.boot();
            this.anims.boot();

            this.input.boot();
            this.cache.boot();
            this.loader.boot();
            this.states.boot();

            klog.info('Game Started. DOM Available. Valid State Given');
            klog.info('Game Time: ' + this.time.now());

            this.raf = new Kiwi.Utils.RequestAnimationFrame(function () {
                return _this.loop();
            });
            this.raf.start();
        };

        Game.prototype.loop = function () {
            this.time.update();
            this.input.update();
            this.tweens.update();
            this.cameras.update();
            this.layers.update();
            this.huds.update();

            this.states.update();

            this.cameras.render();
            this.huds.render();

            this.states.postRender();
        };
        return Game;
    })();
    Kiwi.Game = Game;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Components) {
        (function (DOM) {
            (function (Filters) {
                var Blur = (function (_super) {
                    __extends(Blur, _super);
                    function Blur(radius) {
                        if (typeof radius === "undefined") { radius = 0; }
                        _super.call(this, 'DOM.Filters.Blur', false, true, false);
                        this._prefix = 'blur';
                        this._unit = 'px';
                        this._value = 0;
                        this._filter = '';

                        this.radius(radius);
                    }
                    Blur.prototype.objType = function () {
                        return "Blur";
                    };

                    Blur.prototype.radius = function (value) {
                        if (value && value !== this._value) {
                            this._value = value;
                            this._filter = this._prefix + '(' + this._value + this._unit + ')';
                        }

                        return this._value;
                    };

                    Blur.prototype.unit = function (value) {
                        if (value && value !== this._unit) {
                            this._unit = value;
                            this._filter = this._prefix + '(' + this._value + this._unit + ')';
                        }

                        return this._unit;
                    };

                    Blur.prototype.toString = function () {
                        return '[{Blur (value=' + this._value + ' unit=' + this._unit + ')}]';
                    };
                    return Blur;
                })(Kiwi.Component);
                Filters.Blur = Blur;
            })(DOM.Filters || (DOM.Filters = {}));
            var Filters = DOM.Filters;
        })(Components.DOM || (Components.DOM = {}));
        var DOM = Components.DOM;
    })(Kiwi.Components || (Kiwi.Components = {}));
    var Components = Kiwi.Components;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Components) {
        (function (DOM) {
            (function (Transforms) {
                var Skew = (function (_super) {
                    __extends(Skew, _super);
                    function Skew(x, y, asDegrees) {
                        if (typeof x === "undefined") { x = 0; }
                        if (typeof y === "undefined") { y = 0; }
                        if (typeof asDegrees === "undefined") { asDegrees = true; }
                        _super.call(this, 'DOM.Transforms.Skew', false, true, false);
                        this.css = '';
                        this._unit = '';
                        this._skewX = 0;
                        this._skewXUnit = 'deg';
                        this._skewXTransform = '';
                        this._skewY = 0;
                        this._skewYUnit = 'deg';
                        this._skewYTransform = '';

                        if (asDegrees === true) {
                            this.setDegrees();
                        } else {
                            this.setRadians();
                        }

                        this.setXY(x, y);
                    }
                    Skew.prototype.objType = function () {
                        return "Skew";
                    };

                    Skew.prototype.xUnit = function (value) {
                        if (value) {
                            this.setUnit(value, this._skewXUnit);
                        }

                        return this._skewXUnit;
                    };

                    Skew.prototype.yUnit = function (value) {
                        if (value) {
                            this.setUnit(value, this._skewYUnit);
                        }

                        return this._skewYUnit;
                    };

                    Skew.prototype.x = function (value) {
                        if (value && value !== this._skewX) {
                            this._skewX = value;
                            this._skewXTransform = 'skewX(' + value + this._skewXUnit + ') ';
                            this.css = this._skewXTransform + this._skewYTransform;
                        }

                        return this._skewX;
                    };

                    Skew.prototype.y = function (value) {
                        if (value && value !== this._skewY) {
                            this._skewY = value;
                            this._skewYTransform = 'skewY(' + value + this._skewYUnit + ') ';
                            this.css = this._skewXTransform + this._skewYTransform;
                        }

                        return this._skewY;
                    };

                    Skew.prototype.setXY = function (x, y) {
                        this.x(x);
                        this.y(y);
                    };

                    Skew.prototype.setDegrees = function () {
                        this._skewXUnit = 'deg';
                        this._skewYUnit = 'deg';
                    };

                    Skew.prototype.setRadians = function () {
                        this._skewXUnit = 'rad';
                        this._skewYUnit = 'rad';
                    };

                    Skew.prototype.setUnit = function (unit, value) {
                        if (unit === 'deg' || unit === 'rad') {
                            value = unit;
                            return true;
                        } else {
                            return false;
                        }
                    };

                    Skew.prototype.toString = function () {
                        return "[{Skew (x=" + this._skewX + " y=" + this._skewY + " xUnit=" + this._skewXUnit + " yUnit=" + this._skewYUnit + ")}]";
                    };
                    return Skew;
                })(Kiwi.Component);
                Transforms.Skew = Skew;
            })(DOM.Transforms || (DOM.Transforms = {}));
            var Transforms = DOM.Transforms;
        })(Components.DOM || (Components.DOM = {}));
        var DOM = Components.DOM;
    })(Kiwi.Components || (Kiwi.Components = {}));
    var Components = Kiwi.Components;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Components) {
        (function (DOM) {
            var Gradient = (function (_super) {
                __extends(Gradient, _super);
                function Gradient() {
                    _super.call(this, 'DOM.Gradient', false, true, false);
                }
                Gradient.prototype.objType = function () {
                    return "Gradient";
                };

                Gradient.prototype.toString = function () {
                    return "";
                };
                return Gradient;
            })(Kiwi.Component);
            DOM.Gradient = Gradient;
        })(Components.DOM || (Components.DOM = {}));
        var DOM = Components.DOM;
    })(Kiwi.Components || (Kiwi.Components = {}));
    var Components = Kiwi.Components;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Components) {
        (function (GameMath) {
            var SinewaveGenerator = (function (_super) {
                __extends(SinewaveGenerator, _super);
                function SinewaveGenerator(length, sinAmplitude, cosAmplitude, frequency) {
                    if (typeof length === "undefined") { length = 100; }
                    if (typeof sinAmplitude === "undefined") { sinAmplitude = 1.0; }
                    if (typeof cosAmplitude === "undefined") { cosAmplitude = 1.0; }
                    if (typeof frequency === "undefined") { frequency = 1.0; }
                    _super.call(this, 'SinewaveGenerator', true, true, true);

                    this.cosTable = [];
                    this.sinTable = [];

                    this.create(length, sinAmplitude, cosAmplitude, frequency);
                }
                SinewaveGenerator.prototype.objType = function () {
                    return "SinewaveGenerator";
                };

                SinewaveGenerator.prototype.create = function (length, sinAmplitude, cosAmplitude, frequency) {
                    if (typeof sinAmplitude === "undefined") { sinAmplitude = 1.0; }
                    if (typeof cosAmplitude === "undefined") { cosAmplitude = 1.0; }
                    if (typeof frequency === "undefined") { frequency = 1.0; }
                    var sin = sinAmplitude;
                    var cos = cosAmplitude;
                    var frq = frequency * Math.PI / length;

                    this.cosTable.length = 0;
                    this.sinTable.length = 0;

                    for (var c = 0; c < length; c++) {
                        cos -= sin * frq;
                        sin += cos * frq;

                        this.cosTable[c] = cos;
                        this.sinTable[c] = sin;
                    }

                    return this.sinTable;
                };
                return SinewaveGenerator;
            })(Kiwi.Component);
            GameMath.SinewaveGenerator = SinewaveGenerator;
        })(Components.GameMath || (Components.GameMath = {}));
        var GameMath = Components.GameMath;
    })(Kiwi.Components || (Kiwi.Components = {}));
    var Components = Kiwi.Components;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Components) {
        (function (DOM) {
            var Translate3D = (function (_super) {
                __extends(Translate3D, _super);
                function Translate3D(x, y, z) {
                    if (typeof x === "undefined") { x = 0; }
                    if (typeof y === "undefined") { y = 0; }
                    if (typeof z === "undefined") { z = 0; }
                    _super.call(this, 'DOM.Translate3D', true, true, true);
                }
                Translate3D.prototype.objType = function () {
                    return "Translate3D";
                };
                return Translate3D;
            })(Kiwi.Component);
            DOM.Translate3D = Translate3D;
        })(Components.DOM || (Components.DOM = {}));
        var DOM = Components.DOM;
    })(Kiwi.Components || (Kiwi.Components = {}));
    var Components = Kiwi.Components;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Components) {
        var Template = (function (_super) {
            __extends(Template, _super);
            function Template(x) {
                if (typeof x === "undefined") { x = 0; }
                _super.call(this, 'Template', true, true, true);

                this.updated = new Kiwi.Signal();

                x = Math.round(x);

                this._processUpdate();
            }
            Template.prototype.objType = function () {
                return "Template";
            };

            Template.prototype.addStyleUpdates = function (entity) {
                if (entity === null) {
                    return;
                }

                if (Kiwi.DEVICE.css3D) {
                    entity.addStyleUpdate('-webkit-super-thingy', this.cssExampleProperty);
                } else {
                    entity.addStyleUpdate('less-super', this.cssExampleProperty);
                }
            };

            Template.prototype.addStyleImmediately = function (entity) {
                if (entity.domElement === null || entity.domElement.element === null) {
                    return;
                }

                if (Kiwi.DEVICE.css3D) {
                    entity.domElement.element.style.transform = this.cssExampleProperty;
                } else {
                    entity.domElement.element.style.left = this.cssExampleProperty;
                }
            };

            Template.prototype._processUpdate = function () {
                this.cssExampleProperty = 'translate3d(' + this._x + 'px)';

                this.dirty = true;

                this.updated.dispatch(this._x, this.cssExampleProperty);
            };

            Template.prototype.x = function (value) {
                if (typeof value === "undefined") { value = null; }
                if (value !== null && value !== this._x) {
                    this._x = value;

                    this._processUpdate();
                }

                return this._x;
            };

            Template.prototype.setTo = function (x, y, z) {
                if (typeof z === "undefined") { z = 0; }
            };

            Template.prototype.toString = function () {
                return '[{Template (x=' + this._x + ')}]';
            };
            return Template;
        })(Kiwi.Component);
        Components.Template = Template;
    })(Kiwi.Components || (Kiwi.Components = {}));
    var Components = Kiwi.Components;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (GameObjects) {
        (function (Canvas) {
            var Grid = (function (_super) {
                __extends(Grid, _super);
                function Grid(cellWidth, cellHeight, width, height, alternate, color1, color2) {
                    if (typeof width === "undefined") { width = -1; }
                    if (typeof height === "undefined") { height = -1; }
                    if (typeof alternate === "undefined") { alternate = true; }
                    if (typeof color1 === "undefined") { color1 = 0xffe7e6e6; }
                    if (typeof color2 === "undefined") { color2 = 0xffd9d5d5; }
                    _super.call(this, true, false, false);

                    this.position = new Kiwi.Components.Position(0, 0);

                    this.color1 = new Kiwi.Components.Color();
                    this.color1.setColor(color1);

                    this.color2 = new Kiwi.Components.Color();
                    this.color2.setColor(color2);

                    this.cellWidth = cellWidth;
                    this.cellHeight = cellHeight;
                    this.width = width;
                    this.height = height;
                    this.alternate = alternate;

                    this.onAddedToLayer.add(this._onAddedToLayer, this);

                    klog.info('Created Grid Game Object');
                }
                Grid.prototype.objType = function () {
                    return "Grid";
                };

                Grid.prototype._onAddedToLayer = function (layer) {
                    klog.info('Grid added to Layer ' + layer.name);

                    if (this.width === -1 || this.height === -1) {
                        this.width = layer.game.stage.size.width();
                        this.height = layer.game.stage.size.height();
                    }

                    return true;
                };

                Grid.prototype.render = function (camera) {
                    _super.prototype.render.call(this, camera);

                    if (this.willRender() === false) {
                        return;
                    }

                    var rowColor = this.color1.cssColorRGBA;
                    var lastColor = this.color1.cssColorRGBA;

                    for (var y = 0; y <= this.height; y += this.cellHeight) {
                        if (y > 0 && lastColor == rowColor && this.alternate) {
                            (lastColor == this.color1.cssColorRGBA) ? lastColor = this.color2.cssColorRGBA : lastColor = this.color1.cssColorRGBA;
                        } else if (y > 0 && lastColor != rowColor && this.alternate == false) {
                            (lastColor == this.color2.cssColorRGBA) ? lastColor = this.color1.cssColorRGBA : lastColor = this.color2.cssColorRGBA;
                        }

                        for (var x = 0; x <= this.width; x += this.cellWidth) {
                            if (x == 0) {
                                rowColor = lastColor;
                            }

                            this.layer.canvas.context.fillStyle = lastColor;
                            this.layer.canvas.context.fillRect(this.position.x() + x, this.position.y() + y, this.cellWidth, this.cellHeight);

                            if (lastColor == this.color1.cssColorRGBA) {
                                lastColor = this.color2.cssColorRGBA;
                            } else {
                                lastColor = this.color1.cssColorRGBA;
                            }
                        }
                    }
                };
                return Grid;
            })(Kiwi.Entity);
            Canvas.Grid = Grid;
        })(GameObjects.Canvas || (GameObjects.Canvas = {}));
        var Canvas = GameObjects.Canvas;
    })(Kiwi.GameObjects || (Kiwi.GameObjects = {}));
    var GameObjects = Kiwi.GameObjects;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (GameObjects) {
        (function (Canvas) {
            var Starfield = (function (_super) {
                __extends(Starfield, _super);
                function Starfield(x, y, width, height, quantity, type, updateInterval) {
                    if (typeof quantity === "undefined") { quantity = 200; }
                    if (typeof type === "undefined") { type = 1; }
                    if (typeof updateInterval === "undefined") { updateInterval = 0; }
                    _super.call(this, true, false, false);
                    this.starXOffset = -1;
                    this.starYOffset = 0;
                    this.backgroundColor = 0xff000000;

                    this.onAddedToLayer.add(this._onAddedToLayer, this);

                    this.position = new Kiwi.Components.Position(x, y);

                    this.starfieldType = type;

                    this.updateSpeed = updateInterval;

                    this.centerX = width >> 1;
                    this.centerY = height >> 1;

                    this._width = width;
                    this._height = height;

                    this.stars = [];

                    for (var i = 0; i < quantity; i++) {
                        var star = { x: Math.random() * width, y: Math.random() * height, d: 1, speed: Math.random(), alpha: 0, r: Math.random() * Math.PI * 2 };

                        if (type == Kiwi.GameObjects.Canvas.Starfield.STARFIELD_TYPE_2D) {
                            star.speed = 1 + Math.round(Math.random() * 5);
                        }

                        this.stars.push(star);
                    }

                    klog.info('Created Starfield Game Object');
                }
                Starfield.prototype.objType = function () {
                    return "Starfield";
                };

                Starfield.prototype.setBackgroundColor = function (backgroundColor) {
                };

                Starfield.prototype.setStarDepthColors = function (depth, lowestColor, highestColor) {
                    if (typeof lowestColor === "undefined") { lowestColor = 0xff585858; }
                    if (typeof highestColor === "undefined") { highestColor = 0xffF4F4F4; }
                };

                Starfield.prototype.setStarSpeed = function (xShift, yShift) {
                    this.starXOffset = xShift;
                    this.starYOffset = yShift;
                };

                Starfield.prototype.speed = function (value) {
                    if (typeof value === "undefined") { value = null; }
                    if (value !== null) {
                        this.updateSpeed = value;
                    }

                    return this.updateSpeed;
                };

                Starfield.prototype._onAddedToLayer = function (layer) {
                    klog.info('Starfield added to Layer ' + layer.name);

                    this.tick = layer.game.time.now();

                    return true;
                };

                Starfield.prototype._render3DStarfield = function () {
                    for (var i = 0; i < this.stars.length; i++) {
                        this.stars[i].d *= 1.1;
                        this.stars[i].x = this.centerX + ((Math.cos(this.stars[i].r) * this.stars[i].d) * this.stars[i].speed);
                        this.stars[i].y = this.centerY + ((Math.sin(this.stars[i].r) * this.stars[i].d) * this.stars[i].speed);

                        this.stars[i].alpha = this.stars[i].d * 2;

                        if (this.stars[i].alpha > 255) {
                            this.stars[i].alpha = 255;
                        }

                        this.layer.canvas.context.fillRect(this.position.x() + this.stars[i].x, this.position.y() + this.stars[i].y, 1, 1);

                        if (this.stars[i].x < 0 || this.stars[i].x > this._width || this.stars[i].y < 0 || this.stars[i].y > this._height) {
                            this.stars[i] = { x: 0, y: 0, d: 1, speed: Math.random(), alpha: 0, r: Math.random() * Math.PI * 2 };
                        }
                    }
                };

                Starfield.prototype._render2DStarfield = function () {
                    for (var i = 0; i < this.stars.length; i++) {
                        this.stars[i].x += (this.starXOffset * this.stars[i].speed);
                        this.stars[i].y += (this.starYOffset * this.stars[i].speed);

                        this.layer.canvas.context.fillRect(this.position.x() + this.stars[i].x, this.position.y() + this.stars[i].y, 1, 1);

                        if (this.stars[i].x > this._width) {
                            this.stars[i].x = 0;
                        } else if (this.stars[i].x < 0) {
                            this.stars[i].x = this._width;
                        }

                        if (this.stars[i].y > this._height) {
                            this.stars[i].y = 0;
                        } else if (this.stars[i].y < 0) {
                            this.stars[i].y = this._height;
                        }
                    }
                };

                Starfield.prototype.render = function (camera) {
                    _super.prototype.render.call(this, camera);

                    if (this.willRender() === false) {
                        return;
                    }

                    this.layer.canvas.context.fillStyle = 'rgb(255,255,255)';

                    if (this.layer.game.time.now() > this.tick) {
                        if (this.starfieldType === Kiwi.GameObjects.Canvas.Starfield.STARFIELD_TYPE_2D) {
                            this._render2DStarfield();
                        } else {
                            this._render3DStarfield();
                        }

                        if (this.updateSpeed > 0) {
                            this.tick = this.layer.game.time.now() + this.updateSpeed;
                        }
                    }
                };
                Starfield.STARFIELD_TYPE_2D = 1;

                Starfield.STARFIELD_TYPE_3D = 2;
                return Starfield;
            })(Kiwi.Entity);
            Canvas.Starfield = Starfield;
        })(GameObjects.Canvas || (GameObjects.Canvas = {}));
        var Canvas = GameObjects.Canvas;
    })(Kiwi.GameObjects || (Kiwi.GameObjects = {}));
    var GameObjects = Kiwi.GameObjects;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (GameObjects) {
        var MouseDebug = (function (_super) {
            __extends(MouseDebug, _super);
            function MouseDebug(x, y, followMouse) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                if (typeof followMouse === "undefined") { followMouse = false; }
                _super.call(this, true, true, false);

                this.position = new Kiwi.Components.Position(x, y);
                this._followMouse = followMouse;

                this.onAddedToLayer.add(this._onAddedToLayer, this);
                this.position.updated.add(this._updatePosition, this);

                klog.info('Created MouseDebug Game Object');
            }
            MouseDebug.prototype.objType = function () {
                return "MouseDebug";
            };

            MouseDebug.prototype._updatePosition = function (x, y) {
                this.position.addStyleUpdates(this);
            };

            MouseDebug.prototype._onAddedToLayer = function (layer) {
                klog.info('MouseDebug added to Layer');

                if (this.layer.type === Kiwi.TYPE_DOM) {
                }

                this.position.addStyleUpdates(this);

                return true;
            };

            MouseDebug.prototype.render = function (camera) {
                _super.prototype.render.call(this, camera);

                if (this.layer.type === Kiwi.TYPE_CANVAS) {
                    this.layer.canvas.context.fillStyle = 'rgba(0, 114, 188, 0.7)';
                    this.layer.canvas.context.fillRect(this.position.x(), this.position.y(), 200, 100);
                    this.layer.canvas.context.font = '12px Arial';
                    this.layer.canvas.context.fillStyle = '#ffffff';
                    this.layer.canvas.context.fillText('X: ' + this.game.input.x(), this.position.x(), this.position.y() + 10);
                    this.layer.canvas.context.fillText('Y: ' + this.game.input.y(), this.position.x(), this.position.y() + 24);
                }
            };
            return MouseDebug;
        })(Kiwi.Entity);
        GameObjects.MouseDebug = MouseDebug;
    })(Kiwi.GameObjects || (Kiwi.GameObjects = {}));
    var GameObjects = Kiwi.GameObjects;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Plugins) {
        (function (Gamefroot) {
            var TileMapConverter_old = (function () {
                function TileMapConverter_old(jsonData, imageData) {
                    this._gf = JSON.parse(jsonData);
                    this._gfImg = imageData;
                }
                TileMapConverter_old.prototype.convert = function () {
                    console.log(this._gf);
                    console.log(this._gfImg);

                    if (!this._gfTerrain) {
                        console.log("no terrain found in gf object");
                    }
                    this._gfTerrain = this._gf.map.terrain;

                    this._initTileMap();

                    this._kiwiTileset = this._createTileSet();

                    this._analyseGFImage();

                    this._kiwiTileMap.tilesets.push(this._kiwiTileset);

                    this._analyseGFData();

                    for (var i = 0; i < this._totalLayers; i++) {
                        var layer = this._createLayer();
                        layer.name = "Layer" + (i);
                        this._fillBlanks(layer.data);
                        this._translateTiles(layer.data, this._layerInfo["layer" + i]);
                        this._kiwiTileMap.layers.push(layer);
                    }

                    console.log(this._kiwiTileMap);
                    return this._kiwiTileMap;
                };

                TileMapConverter_old.prototype._translateTiles = function (layerData, layerInfo) {
                };

                TileMapConverter_old.prototype._fillBlanks = function (arr) {
                    var length = (this._maxX + 1) * (this._maxY + 1);
                    for (var i = 0; i < length; i++) {
                        arr.push(-1);
                    }
                };

                TileMapConverter_old.prototype._initTileMap = function () {
                    this._kiwiTileMap = {
                        "height": 40,
                        "layers": [],
                        "orientation": "orthogonal",
                        "properties": {},
                        "tileheight": 48,
                        "tilesets": [],
                        "tilewidth": 48,
                        "version": 1,
                        "width": 40
                    };
                };

                TileMapConverter_old.prototype._createTileSet = function () {
                    return {
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
                };

                TileMapConverter_old.prototype._createLayer = function () {
                    return {
                        "data": [],
                        "height": 40,
                        "name": "",
                        "opacity": 1,
                        "type": "tilelayer",
                        "visible": true,
                        "width": 40,
                        "x": 0,
                        "y": 0
                    };
                };

                TileMapConverter_old.prototype._analyseGFImage = function () {
                    console.log("Analysing GF Image Data");
                    console.log(this._gfImg.width, this._gfImg.height);
                    this._kiwiTileset.imagewidth = this._gfImg.width;
                    this._kiwiTileset.imageheight = this._gfImg.height;
                };

                TileMapConverter_old.prototype._analyseGFData = function () {
                    console.log("Analysing GF Tilemap Data");

                    this._totalTiles = this._gfTerrain.length;
                    console.log("Total tiles : " + this._totalTiles);

                    this._totalLayers = 0;
                    this._maxX = 0;
                    this._maxY = 0;

                    this._layerInfo = {};
                    for (var i = 0; i < this._totalTiles; i++) {
                        var layerName = "layer" + this._gfTerrain[i].zpos;
                        if (parseInt(this._gfTerrain[i].xpos) > this._maxX)
                            this._maxX = parseInt(this._gfTerrain[i].xpos);
                        if (parseInt(this._gfTerrain[i].ypos) > this._maxY)
                            this._maxY = parseInt(this._gfTerrain[i].ypos);

                        if (!this._layerInfo.hasOwnProperty(layerName)) {
                            this._layerInfo[layerName] = [i];
                            this._totalLayers++;
                        } else {
                            this._layerInfo[layerName].push(i);
                        }
                    }

                    console.log(this._layerInfo);
                    console.log("Total layers : " + this._totalLayers);
                    console.log("MaxX : " + this._maxX);
                    console.log("MaxY : " + this._maxY);
                };
                return TileMapConverter_old;
            })();
            Gamefroot.TileMapConverter_old = TileMapConverter_old;
        })(Plugins.Gamefroot || (Plugins.Gamefroot = {}));
        var Gamefroot = Plugins.Gamefroot;
    })(Kiwi.Plugins || (Kiwi.Plugins = {}));
    var Plugins = Kiwi.Plugins;
})(Kiwi || (Kiwi = {}));
