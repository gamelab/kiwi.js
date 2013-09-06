declare module Kiwi.Animation.Tweens {
    class Manager {
        constructor(game: Kiwi.Game);
        public objType(): string;
        private _game;
        private _tweens;
        public getAll(): Animation.Tween[];
        public removeAll(): void;
        public create(object): Animation.Tween;
        public add(tween: Animation.Tween): Animation.Tween;
        public remove(tween: Animation.Tween): void;
        public update(): boolean;
    }
}
declare module Kiwi.Animation.Tweens.Easing {
    class Back {
        public objType(): string;
        static In(k): number;
        static Out(k): number;
        static InOut(k): number;
    }
}
declare module Kiwi.Animation.Tweens.Easing {
    class Bounce {
        public objType(): string;
        static In(k): number;
        static Out(k): number;
        static InOut(k): number;
    }
}
declare module Kiwi.Animation.Tweens.Easing {
    class Circular {
        public objType(): string;
        static In(k): number;
        static Out(k): number;
        static InOut(k): number;
    }
}
declare module Kiwi.Animation.Tweens.Easing {
    class Cubic {
        public objType(): string;
        static In(k): number;
        static Out(k): number;
        static InOut(k): number;
    }
}
declare module Kiwi.Animation.Tweens.Easing {
    class Elastic {
        public objType(): string;
        static In(k): number;
        static Out(k): number;
        static InOut(k): number;
    }
}
declare module Kiwi.Animation.Tweens.Easing {
    class Exponential {
        public objType(): string;
        static In(k): number;
        static Out(k): number;
        static InOut(k): number;
    }
}
declare module Kiwi.Animation.Tweens.Easing {
    class Linear {
        public objType(): string;
        static None(k);
    }
}
declare module Kiwi.Animation.Tweens.Easing {
    class Quadratic {
        public objType(): string;
        static In(k): number;
        static Out(k): number;
        static InOut(k): number;
    }
}
declare module Kiwi.Animation.Tweens.Easing {
    class Quartic {
        public objType(): string;
        static In(k): number;
        static Out(k): number;
        static InOut(k): number;
    }
}
declare module Kiwi.Animation.Tweens.Easing {
    class Quintic {
        public objType(): string;
        static In(k): number;
        static Out(k): number;
        static InOut(k): number;
    }
}
declare module Kiwi.Animation.Tweens.Easing {
    class Sinusoidal {
        public objType(): string;
        static In(k): number;
        static Out(k): number;
        static InOut(k): number;
    }
}
declare module Kiwi.Animation {
    class Tween {
        constructor(object, game?: Kiwi.Game);
        public objType(): string;
        private _game;
        private _manager;
        private _object;
        private _valuesStart;
        private _valuesEnd;
        private _duration;
        private _delayTime;
        private _startTime;
        private _easingFunction;
        private _interpolationFunction;
        private _chainedTweens;
        private _onStartCallback;
        private _onStartContext;
        private _onStartCallbackFired;
        private _onUpdateCallback;
        private _onUpdateContext;
        private _onCompleteCallback;
        private _onCompleteCalled;
        private _onCompleteContext;
        public isRunning: boolean;
        public to(properties, duration?: number, ease?: any, autoStart?: boolean): Tween;
        public start(): Tween;
        public stop(): Tween;
        public setParent(value: Kiwi.Game): void;
        public delay(amount): Tween;
        public easing(easing): Tween;
        public interpolation(interpolation): Tween;
        public chain(tween: Tween): Tween;
        public onStart(callback, context): Tween;
        public onUpdate(callback, context): Tween;
        public onComplete(callback, context): Tween;
        public debugValue;
        public update(time): boolean;
    }
}
declare module Kiwi {
    class Camera {
        constructor(game: Kiwi.Game, id: number, name: string, x: number, y: number, width: number, height: number);
        public width: number;
        public height: number;
        public objType(): string;
        public fitToStage: boolean;
        public transform: Kiwi.Geom.Transform;
        private _updatedStageSize(width, height);
        private _updatedSize(width, height);
        public _game: Kiwi.Game;
        public id: number;
        public name: string;
        private _visible;
        public visible(value?: boolean): boolean;
        private _dirty;
        public dirty(value?: boolean): boolean;
        public update(): void;
        public render(): void;
    }
}
declare module Kiwi {
    class Game {
        constructor(domParent?: string, name?: string, state?: any, options?);
        private _renderOption;
        public renderOption : number;
        private _deviceTargetOption;
        public deviceTargetOption : number;
        private _debugOption;
        public debugOption : number;
        public renderer: IRenderer;
        public huds: Kiwi.HUD.HUDManager;
        public objType(): string;
        private _startup;
        public id: number;
        public audio: Kiwi.Sound.AudioManager;
        public browser: Kiwi.System.Browser;
        public fileStore: Kiwi.Files.FileStore;
        public input: Kiwi.Input.Manager;
        public cameras: Kiwi.CameraManager;
        public loader: Kiwi.Files.Loader;
        public raf: Kiwi.Utils.RequestAnimationFrame;
        public stage: Kiwi.Stage;
        public states: Kiwi.StateManager;
        public time: Kiwi.Time.Manager;
        public tweens: Kiwi.Animation.Tweens.Manager;
        public rnd: Kiwi.Utils.RandomDataGenerator;
        private _frameRate;
        private _interval;
        private _delta;
        private _lastTime;
        public frameRate : number;
        private start();
        private loop();
    }
}
declare module Kiwi {
    class CameraManager {
        constructor(game: Kiwi.Game);
        public objType(): string;
        private _game;
        private _cameras;
        private _nextCameraID;
        public defaultCamera: Kiwi.Camera;
        public boot(): void;
        public create(name: string, x: number, y: number, width: number, height: number): Kiwi.Camera;
        public remove(camera: Kiwi.Camera): boolean;
        public update(): boolean;
        public render(): boolean;
        public removeAll(): void;
    }
}
declare module Kiwi {
    class Component {
        constructor(owner: Kiwi.IChild, name: string);
        public objType(): string;
        public owner: Kiwi.IChild;
        public game: Kiwi.Game;
        public name: string;
        public active: boolean;
        public dirty: boolean;
        public preUpdate(): void;
        public update(): void;
        public postUpdate(): void;
        public destroy(): void;
    }
}
declare module Kiwi {
    class ComponentManager {
        constructor(type: number, owner);
        public objType(): string;
        private _owner;
        private _type;
        public _components;
        public hasComponent(value: string): boolean;
        public hasActiveComponent(value: string): boolean;
        public getComponent(value: string): any;
        public add(component: Kiwi.Component): any;
        public addBatch(...paramsArr: any[]): void;
        public removeComponent(component: Kiwi.Component, destroy?: boolean): boolean;
        public removeComponentByName(name: string, destroy?: boolean): boolean;
        public removeAll(destroy?: boolean): void;
        public preUpdate(): void;
        public update(): void;
        public postUpdate(): void;
        public preRender(): void;
        public render(): void;
        public postRender(): void;
    }
}
declare module Kiwi {
    class Entity implements Kiwi.IChild {
        constructor(state: Kiwi.State, x: number, y: number);
        public transform: Kiwi.Geom.Transform;
        private _parent;
        public parent : Kiwi.Group;
        public x : number;
        public y : number;
        public scaleX : number;
        public scaleY : number;
        public rotation : number;
        public childType(): number;
        private _alpha;
        public alpha : number;
        private _visible;
        public visiblity : boolean;
        public width: number;
        public height: number;
        public atlas: Kiwi.Textures.TextureAtlas;
        public cellIndex: number;
        public components: Kiwi.ComponentManager;
        public game: Kiwi.Game;
        public state: Kiwi.State;
        public id: string;
        public name: string;
        private _exists;
        public exists : boolean;
        private _active;
        public active : boolean;
        private _willRender;
        public willRender : boolean;
        private _inputEnabled;
        public inputEnabled : boolean;
        private _clock;
        public clock : Kiwi.Time.Clock;
        private _dirty;
        public dirty : boolean;
        public objType(): string;
        public update(): void;
        public render(camera: Kiwi.Camera): void;
        public destroy(): void;
    }
}
declare module Kiwi {
    class StateConfig {
        constructor(parent: Kiwi.State, name: string);
        public objType(): string;
        private _state;
        public name: string;
        public isPersistent: boolean;
        public isCreated: boolean;
        public isInitialised: boolean;
        public isReady: boolean;
        public hasInit: boolean;
        public hasPreloader: boolean;
        public hasLoadProgress: boolean;
        public hasLoadComplete: boolean;
        public hasLoadUpdate: boolean;
        public hasCreate: boolean;
        public hasOnEnter: boolean;
        public hasUpdate: boolean;
        public hasRender: boolean;
        public hasOnExit: boolean;
        public hasShutDown: boolean;
        public hasDestroy: boolean;
        public runCount: number;
        public type: number;
        public initParams;
        public createParams;
        public populate(): void;
    }
}
declare module Kiwi {
    class Group implements Kiwi.IChild {
        constructor(state: Kiwi.State, name?: string);
        public objType(): string;
        public childType(): number;
        public name: string;
        public transform: Kiwi.Geom.Transform;
        private _parent;
        public parent : Group;
        public x : number;
        public y : number;
        public scaleX : number;
        public scaleY : number;
        public rotation : number;
        public components: Kiwi.ComponentManager;
        public game: Kiwi.Game;
        public state: Kiwi.State;
        public id: string;
        public members: Kiwi.IChild[];
        public numChildren(): number;
        private _dirty;
        public dirty : boolean;
        public contains(child: Kiwi.IChild): boolean;
        public containsDescendant(child: Kiwi.IChild): boolean;
        public containsAncestor(descendant: Kiwi.IChild, ancestor: Group): boolean;
        public addChild(child: Kiwi.IChild): Kiwi.IChild;
        public addChildAt(child: Kiwi.IChild, index: number): Kiwi.IChild;
        public addChildBefore(child: Kiwi.IChild, beforeChild: Kiwi.IChild): Kiwi.IChild;
        public addChildAfter(child: Kiwi.IChild, beforeChild: Kiwi.IChild): Kiwi.IChild;
        public getChildAt(index: number): Kiwi.IChild;
        public getChildByName(name: string): Kiwi.IChild;
        public getChildByID(id: string): Kiwi.IChild;
        public getChildIndex(child: Kiwi.IChild): number;
        public removeChild(child: Kiwi.IChild, destroy?: boolean): Kiwi.IChild;
        public removeChildAt(index: number): Kiwi.IChild;
        public removeChildren(begin?: number, end?: number, destroy?: boolean): number;
        public setChildIndex(child: Kiwi.IChild, index: number): boolean;
        public swapChildren(child1: Kiwi.IChild, child2: Kiwi.IChild): boolean;
        public swapChildrenAt(index1: number, index2: number): boolean;
        public replaceChild(oldChild: Kiwi.IChild, newChild: Kiwi.IChild): boolean;
        public forEach(context, callback, ...params: any[]): void;
        public forEachAlive(context, callback, ...params: any[]): void;
        public setAll(componentName: string, property: string, value: any): void;
        public callAll(componentName: string, functionName: string, args?: any[]): void;
        public update(): void;
        public processUpdate(child: Kiwi.IChild): void;
        private _exists;
        public exists : boolean;
        private _active;
        public active : boolean;
        public render(camera: Kiwi.Camera): void;
        public removeFirstAlive(destroy?: boolean): Kiwi.IChild;
        public getFirstAlive(): Kiwi.IChild;
        public getFirstDead(): Kiwi.IChild;
        public countLiving(): number;
        public countDead(): number;
        public getRandom(start?: number, length?: number): Kiwi.IChild;
        public clear(): void;
        private _willRender;
        public willRender : boolean;
        public destroy(destroyChildren?: boolean): void;
    }
}
declare module Kiwi {
    class State extends Kiwi.Group {
        constructor(name: string);
        public objType(): string;
        public childType(): number;
        public config: Kiwi.StateConfig;
        public game: Kiwi.Game;
        public textureLibrary: Kiwi.Textures.TextureLibrary;
        public audioLibrary: Kiwi.Sound.AudioLibrary;
        public dataLibrary: Kiwi.Files.DataLibrary;
        public textures;
        public audio;
        public data;
        public components: Kiwi.ComponentManager;
        public boot(): void;
        public init(...paramsArr: any[]): void;
        public preload(): void;
        public loadProgress(percent: number, bytesLoaded: number, file: Kiwi.Files.File): void;
        public loadComplete(): void;
        public loadUpdate(): void;
        public create(...paramsArr: any[]): void;
        public preUpdate(): void;
        public update(): void;
        public postUpdate(): void;
        public postRender(): void;
        public setType(value: number): void;
        public addImage(key: string, url: string, storeAsGlobal?: boolean, width?: number, height?: number, offsetX?: number, offsetY?: number): void;
        public addSpriteSheet(key: string, url: string, frameWidth: number, frameHeight: number, storeAsGlobal?: boolean, numCells?: number, rows?: number, cols?: number, sheetOffsetX?: number, sheetOffsetY?: number, cellOffsetX?: number, cellOffsetY?: number): void;
        public addTextureAtlas(key: string, imageURL: string, jsonID?: string, jsonURL?: string, storeAsGlobal?: boolean): void;
        public addJSON(key: string, url: string, storeAsGlobal?: boolean): void;
        public addAudio(key: string, url: string, storeAsGlobal?: boolean): void;
        private _trackingList;
        public addToTrackingList(child: Kiwi.IChild): void;
        public removeFromTrackingList(child: Kiwi.IChild): void;
        public destroyUnused(): number;
        public destroy(deleteAll?: boolean): void;
        private _destroyChildren(child);
    }
}
declare module Kiwi {
    interface IChild {
        render(camera: Kiwi.Camera);
        update();
        childType(): number;
        id: string;
        name: string;
        game: Kiwi.Game;
        state: Kiwi.State;
        components: Kiwi.ComponentManager;
        dirty: boolean;
        active: boolean;
        exists: boolean;
        willRender: boolean;
        parent: Kiwi.Group;
        transform: Kiwi.Geom.Transform;
        destroy(...params: any[]);
    }
}
declare module Kiwi {
    class SignalBinding {
        constructor(signal: Kiwi.Signal, listener, isOnce: boolean, listenerContext, priority?: number);
        public objType(): string;
        private _listener;
        private _isOnce;
        public context;
        private _signal;
        public priority: number;
        public active: boolean;
        public params;
        public execute(paramsArr?: any[]);
        public detach();
        public isBound(): boolean;
        public isOnce(): boolean;
        public getListener();
        public getSignal(): Kiwi.Signal;
        public _destroy(): void;
        public toString(): string;
    }
}
declare module Kiwi {
    class Signal {
        private _bindings;
        private _prevParams;
        static VERSION: string;
        public memorize: boolean;
        private _shouldPropagate;
        public active: boolean;
        public objType(): string;
        public validateListener(listener, fnName): void;
        private _registerListener(listener, isOnce, listenerContext, priority);
        private _addBinding(binding);
        private _indexOfListener(listener, context);
        public has(listener, context?: any): boolean;
        public add(listener, listenerContext?: any, priority?: number): Kiwi.SignalBinding;
        public addOnce(listener, listenerContext?: any, priority?: number): Kiwi.SignalBinding;
        public remove(listener, context?: any);
        public removeAll(): void;
        public getNumListeners(): number;
        public halt(): void;
        public dispatch(...paramsArr: any[]): void;
        public forget(): void;
        public dispose(): void;
        public toString(): string;
    }
}
declare module Kiwi.Geom {
    class Point {
        constructor(x?: number, y?: number);
        public objType(): string;
        public x: number;
        public y: number;
        public polar(distance: number, angle: number): Point;
        public add(toAdd: Point, output?: Point): Point;
        public addTo(x?: number, y?: number): Point;
        public subtractFrom(x?: number, y?: number): Point;
        public invert(): Point;
        public clamp(min: number, max: number): Point;
        public clampX(min: number, max: number): Point;
        public clampY(min: number, max: number): Point;
        public clone(output?: Point): Point;
        public copyFrom(source: Point): Point;
        public copyTo(target: Point): Point;
        public distanceTo(target: Point, round?: boolean): number;
        public distanceToXY(x: number, y: number, round?: boolean): number;
        static distanceBetween(pointA: Point, pointB: Point, round?: boolean): number;
        static polar(length: number, angle: number): Point;
        public distanceCompare(target: Point, distance: number): boolean;
        public equals(toCompare: Point): boolean;
        static interpolate(pointA: Point, pointB: Point, f: number): Point;
        public offset(dx: number, dy: number): Point;
        public setTo(x: number, y: number): Point;
        public subtract(point: Point, output?: Point): Point;
        public getCSS(): string;
        public toString(): string;
    }
}
declare module Kiwi.Geom {
    class Matrix {
        constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
        public objType(): string;
        public a: number;
        public b: number;
        public c: number;
        public d: number;
        public tx: number;
        public ty: number;
        public setTo(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number): Matrix;
        public setFromTransform(tx: number, ty: number, scaleX: number, scaleY: number, rotation: number): Matrix;
        public prepend(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number): Matrix;
        public prependMatrix(m: Matrix): Matrix;
        public append(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number): Matrix;
        public appendMatrix(m: Matrix): Matrix;
        public setPosition(x: number, y: number): Matrix;
        public setPositionPoint(p: any): Matrix;
        public getPosition(output?: Geom.Point): Geom.Point;
        public identity(): Matrix;
        public rotate(radians: number): Matrix;
        public translate(tx: number, ty: number): Matrix;
        public scale(scaleX: number, scaleY: number): Matrix;
        public transformPoint(pt: any);
        public invert(): Matrix;
        public copyFrom(m: Matrix): Matrix;
        public copyTo(m: Matrix): Matrix;
        public clone(): Matrix;
        public toString : string;
    }
}
declare module Kiwi.Geom {
    class Transform {
        constructor(x?: number, y?: number, scaleX?: number, scaleY?: number, rotation?: number, rotPointX?: number, rotPointY?: number);
        public objType(): string;
        private _x;
        public x : number;
        private _y;
        public y : number;
        private _scaleX;
        public scaleX : number;
        private _scaleY;
        public scaleY : number;
        private _rotation;
        public rotation : number;
        private _rotPointX;
        public rotPointX : number;
        private _rotPointY;
        public rotPointY : number;
        private _matrix;
        public matrix : Geom.Matrix;
        private _cachedConcatenatedMatrix;
        public worldX : number;
        public worldY : number;
        private _parent;
        public parent : Transform;
        public setPosition(x: number, y: number): Transform;
        public setPositionFromPoint(point: Geom.Point): Transform;
        public translatePositionFromPoint(point: Geom.Point): Transform;
        public getPositionPoint(output?: Geom.Point): Geom.Point;
        public scale : number;
        public setTransform(x?: number, y?: number, scaleX?: number, scaleY?: number, rotation?: number, rotPointX?: number, rotPointY?: number): Transform;
        public getParentMatrix(): Geom.Matrix;
        public getConcatenatedMatrix(): Geom.Matrix;
        public transformPoint(point: Geom.Point): Geom.Point;
        public copyFrom(source: Transform): Transform;
        public copyTo(destination: Transform): Transform;
        public clone(output?: Transform): Transform;
        public checkAncestor(transform: Transform): boolean;
        public toString : string;
    }
}
declare module Kiwi.Geom {
    class Rectangle {
        constructor(x?: number, y?: number, width?: number, height?: number);
        public objType(): string;
        public x: number;
        public y: number;
        public width: number;
        public height: number;
        public bottom : number;
        public center : Geom.Point;
        public bottomRight : Geom.Point;
        public left : number;
        public right : number;
        public size : Geom.Point;
        public volume : number;
        public perimeter : number;
        public top : number;
        public topLeft : Geom.Point;
        public clone(output?: Rectangle): Rectangle;
        public contains(x: number, y: number): boolean;
        public containsPoint(point: Geom.Point): boolean;
        public containsRect(rect: Rectangle): boolean;
        public copyFrom(source: Rectangle): Rectangle;
        public copyTo(target: Rectangle): Rectangle;
        public equals(toCompare: Rectangle): boolean;
        public inflate(dx: number, dy: number): Rectangle;
        public inflatePoint(point: Geom.Point): Rectangle;
        public intersection(toIntersect: Rectangle, output?: Rectangle): Rectangle;
        public intersects(toIntersect: Rectangle): boolean;
        public overlap(rect: Rectangle): any;
        public isEmpty(): boolean;
        public offset(dx: number, dy: number): Rectangle;
        public offsetPoint(point: Geom.Point): Rectangle;
        public setEmpty(): Rectangle;
        public setTo(x: number, y: number, width: number, height: number): Rectangle;
        public union(toUnion: Rectangle, output?: Rectangle): Rectangle;
        public scale(x: number, y: number, translation: Geom.Point): Rectangle;
        public toString(): string;
    }
}
declare module Kiwi {
    class Stage {
        constructor(game: Kiwi.Game, name: string);
        public objType(): string;
        private _alpha;
        public alpha : number;
        private _x;
        public x : number;
        private _y;
        public y : number;
        private _width;
        public width : number;
        private _height;
        public height : number;
        public onResize: Kiwi.Signal;
        public offset: Kiwi.Geom.Point;
        private _game;
        public name: string;
        public domReady: boolean;
        public _color: string;
        public color : string;
        public gl: WebGLRenderingContext;
        public ctx: CanvasRenderingContext2D;
        public canvas: HTMLCanvasElement;
        public debugCanvas: HTMLCanvasElement;
        public dctx: CanvasRenderingContext2D;
        public container: HTMLDivElement;
        public boot(dom: Kiwi.System.Bootstrap): void;
        private _createCompositeCanvas();
        private _createDebugCanvas();
        public clearDebugCanvas(color?: string): void;
        public toggleDebugCanvas(): void;
    }
}
declare module Kiwi.Components {
    class Box extends Kiwi.Component {
        constructor(parent: Kiwi.Entity, x?: number, y?: number, width?: number, height?: number);
        public entity: Kiwi.Entity;
        public objType(): string;
        public dirty: boolean;
        private _hitboxOffset;
        private _rawHitbox;
        public rawHitbox : Kiwi.Geom.Rectangle;
        private _transformedHitbox;
        public hitbox : Kiwi.Geom.Rectangle;
        private _rawBounds;
        public rawBounds : Kiwi.Geom.Rectangle;
        private _rawCenter;
        public rawCenter : Kiwi.Geom.Point;
        private _transformedCenter;
        public center : Kiwi.Geom.Point;
        private _transformedBounds;
        public bounds : Kiwi.Geom.Rectangle;
        private _rotateRect(rect);
        private _rotateHitbox(rect);
        public draw(ctx: CanvasRenderingContext2D): void;
        public extents(topLeftPoint: Kiwi.Geom.Point, topRightPoint: Kiwi.Geom.Point, bottomRightPoint: Kiwi.Geom.Point, bottomLeftPoint: Kiwi.Geom.Point): Kiwi.Geom.Rectangle;
        public destroy(): void;
    }
}
declare module Kiwi.Components {
    class Input extends Kiwi.Component {
        constructor(owner: Kiwi.IChild, box: Components.Box, enabled: boolean);
        public objType(): string;
        private _box;
        public _onEntered: Kiwi.Signal;
        public _onLeft: Kiwi.Signal;
        public _onDown: Kiwi.Signal;
        public _onUp: Kiwi.Signal;
        public _onDragStarted: Kiwi.Signal;
        public _onDragStopped: Kiwi.Signal;
        public onEntered : Kiwi.Signal;
        public onLeft : Kiwi.Signal;
        public onDown : Kiwi.Signal;
        public onUp : Kiwi.Signal;
        public onDragStarted : Kiwi.Signal;
        public onDragStopped : Kiwi.Signal;
        public onRelease : Kiwi.Signal;
        public onPress : Kiwi.Signal;
        public _enabled: boolean;
        public enabled : boolean;
        private _isDown;
        private _isUp;
        private _withinBounds;
        private _outsideBounds;
        private _justEntered;
        public isDown : boolean;
        public isUp : boolean;
        public withinBounds : boolean;
        public outsideBounds : boolean;
        private _isDragging;
        private _distance;
        private _tempDragDisabled;
        private _dragEnabled;
        private _dragDistance;
        private _dragSnapToCenter;
        public isDragging : boolean;
        public dragDistance : number;
        private _nowDown;
        private _nowUp;
        private _nowEntered;
        private _nowLeft;
        private _nowDragging;
        public enableDrag(snapToCenter?: boolean, distance?: number): void;
        public disableDrag(): void;
        public update(): void;
        private _updateTouch();
        private _evaluateTouchPointer(pointer);
        private _updateMouse();
        private _evaluateMousePointer(pointer);
        public toString(): string;
        public destroy(): void;
    }
}
declare module Kiwi.Components {
    class Sound extends Kiwi.Component {
        constructor(parent);
        private _audio;
        public addSound(name: string, key: string, volume: number, loop: boolean): Kiwi.Sound.Audio;
        public removeSound(name: string): void;
        public getSound(name: string): Kiwi.Sound.Audio;
        private _validate(name);
        public play(name: string): void;
        public stop(name: string): void;
        public pause(name: string): void;
        public resume(name: string): void;
        public destroy(): void;
    }
}
declare module Kiwi.Components {
    class ArcadePhysics extends Kiwi.Component {
        private _parent;
        public transform: Kiwi.Geom.Transform;
        public width: number;
        public height: number;
        constructor(entity: Kiwi.Entity);
        public objType(): string;
        static LEFT: number;
        static RIGHT: number;
        static UP: number;
        static DOWN: number;
        static NONE: number;
        static CEILING: number;
        static FLOOR: number;
        static WALL: number;
        static ANY: number;
        static OVERLAP_BIAS: number;
        public immovable: boolean;
        public velocity: Kiwi.Geom.Point;
        public mass: number;
        public elasticity: number;
        public acceleration: Kiwi.Geom.Point;
        public drag: Kiwi.Geom.Point;
        public maxVelocity: Kiwi.Geom.Point;
        public angle: number;
        public angularVelocity: number;
        public angularAcceleration: number;
        public angularDrag: number;
        public maxAngular: number;
        public moves: boolean;
        public touching: number;
        public wasTouching: number;
        public allowCollisions: number;
        public last: Kiwi.Geom.Point;
        private _solid;
        private _callbackFunction;
        private _callbackContext;
        public solid(value?: boolean): boolean;
        static collide(gameObject1: Kiwi.Entity, gameObject2: Kiwi.Entity, seperate?: boolean): boolean;
        static collideGroup(gameObject: Kiwi.Entity, group: any, seperate?: boolean): boolean;
        static collideGroupGroup(group1: any, group2: any, seperate?: boolean): boolean;
        static overlaps(gameObject1: Kiwi.Entity, gameObject2: Kiwi.Entity, separateObjects?: boolean): boolean;
        static overlapsObjectGroup(gameObject: Kiwi.Entity, group: any, separateObjects?: boolean): boolean;
        static overlapsGroupGroup(group1: any, group2: any, separateObjects?: boolean): boolean;
        static separate(object1: Kiwi.Entity, object2: Kiwi.Entity): boolean;
        static separateX(object1, object2): boolean;
        static separateY(object1, object2): boolean;
        static computeVelocity(velocity: number, acceleration?: number, drag?: number, max?: number): void;
        public overlaps(gameObject: Kiwi.Entity, separateObjects?: boolean): boolean;
        public overlapsGroup(group: any, separateObjects?: boolean): boolean;
        public updateMotion(): void;
        public setCallback(callbackFunction, callbackContext): void;
        public parent(): Kiwi.Entity;
        public update(): void;
        public destroy(): void;
    }
}
declare module Kiwi.Animation {
    class Anim {
        constructor(name: string, sequence: Animation.Sequence, clock: Kiwi.Time.Clock);
        public name: string;
        private _sequence;
        private _loop;
        public loop : boolean;
        private _frameIndex;
        public frameIndex : number;
        public currentCell : number;
        private _speed;
        public speed : number;
        private _clock;
        private _startTime;
        private _reverse;
        public reverse : boolean;
        private _tick;
        private _isPlaying;
        public onStop: Kiwi.Signal;
        public onPlay: Kiwi.Signal;
        public onUpdate: Kiwi.Signal;
        public onLoop: Kiwi.Signal;
        private _start(index?);
        public play(): void;
        public playAt(index: number): void;
        public pause(): void;
        public resume(): void;
        public stop(): void;
        public nextFrame(): void;
        public prevFrame(): void;
        public update(): boolean;
        private _validateFrame(frame);
        public length : number;
        public destroy(): void;
    }
}
declare module Kiwi.Animation {
    class Sequence {
        constructor(name: string, cells: number[], speed?: number, loop?: boolean);
        public name: string;
        public cells: number[];
        public speed: number;
        public loop: boolean;
    }
}
declare module Kiwi {
    class StateManager {
        constructor(game: Kiwi.Game);
        public objType(): string;
        private _game;
        private _states;
        public current: Kiwi.State;
        private checkKeyExists(key);
        private checkValidState(state);
        public addState(state: any, switchTo?: boolean): boolean;
        public boot(): void;
        private setCurrentState(key);
        public switchState(key: string, state?: any, initParams?, createParams?): boolean;
        private getState(key);
        private checkPreload();
        private onLoadProgress(percent, bytesLoaded, file);
        private onLoadComplete();
        public rebuildLibraries(): void;
        public update(): void;
        public postRender(): void;
    }
}
declare module Kiwi.Files {
    class Loader {
        constructor(game: Kiwi.Game);
        public objType(): string;
        private _game;
        private _fileList;
        private _loadList;
        private _onProgressCallback;
        private _onCompleteCallback;
        private _calculateBytes;
        private _fileTotal;
        private _currentFile;
        private _bytesTotal;
        private _bytesLoaded;
        private _bytesCurrent;
        private _fileChunk;
        private _percentLoaded;
        private _complete;
        public boot(): void;
        public init(progress?: any, complete?: any, calculateBytes?: boolean): void;
        public addImage(key: string, url: string, width?: number, height?: number, offsetX?: number, offsetY?: number, storeAsGlobal?: boolean): void;
        public addSpriteSheet(key: string, url: string, frameWidth: number, frameHeight: number, numCells?: number, rows?: number, cols?: number, sheetOffsetX?: number, sheetOffsetY?: number, cellOffsetX?: number, cellOffsetY?: number, storeAsGlobal?: boolean): void;
        public addTextureAtlas(key: string, imageURL: string, jsonID?: string, jsonURL?: string, storeAsGlobal?: boolean): void;
        public addAudio(key: string, url: string, storeAsGlobal?: boolean): void;
        public addJSON(key: string, url: string, storeAsGlobal?: boolean): void;
        public addXML(key: string, url: string, storeAsGlobal?: boolean): void;
        public addBinaryFile(key: string, url: string, storeAsGlobal?: boolean): void;
        public addTextFile(key: string, url: string, storeAsGlobal?: boolean): void;
        public startLoad(): void;
        private getNextFileSize();
        private addToBytesTotal(file);
        private nextFile();
        private fileLoadProgress(file);
        private fileLoadComplete(file);
        public getBytesLoaded(): number;
        public getPercentLoaded(): number;
        public calculateBytes(value?: boolean): boolean;
        public complete(): boolean;
    }
}
declare module Kiwi.Files {
    class DataLibrary {
        constructor(game: Kiwi.Game);
        public objType(): string;
        private _game;
        public data;
        public clear(): void;
        public add(dataFile: Files.File): void;
    }
}
declare module Kiwi.Files {
    class File {
        constructor(game: Kiwi.Game, dataType: number, path: string, name?: string, saveToFileStore?: boolean, storeAsGlobal?: boolean);
        public objType(): string;
        public ownerState: Kiwi.State;
        private _tags;
        public addTag(tag: string): void;
        public removeTag(tag: string): void;
        public hasTag(tag: string): boolean;
        static IMAGE: number;
        static SPRITE_SHEET: number;
        static TEXTURE_ATLAS: number;
        static AUDIO: number;
        static JSON: number;
        static XML: number;
        static BINARY_DATA: number;
        static TEXT_DATA: number;
        private _game;
        private _xhr;
        private _fileStore;
        private _saveToFileStore;
        private _useTagLoader;
        public dataType: number;
        public key: string;
        public fileName: string;
        public filePath: string;
        public fileType: string;
        public fileExtension: string;
        public fileURL: string;
        public fileSize: number;
        public status: number;
        public statusText: string;
        public ETag: string;
        public lastModified: string;
        public totalSize: number;
        public bytesLoaded: number;
        public bytesTotal: number;
        public readyState: number;
        public timeOutDelay: number;
        public hasTimedOut: boolean;
        public timedOut: number;
        public timeStarted: number;
        public timeFinished: number;
        public duration: number;
        public hasError: boolean;
        public success: boolean;
        public attemptCounter: number;
        public maxLoadAttempts: number;
        public error: any;
        public onCompleteCallback: any;
        public onProgressCallback: any;
        public lastProgress: number;
        public percentLoaded: number;
        public buffer: any;
        public data: any;
        public metadata: any;
        public isTexture : boolean;
        public isAudio : boolean;
        public isData : boolean;
        public load(onCompleteCallback?: any, onProgressCallback?: any, customFileStore?: Files.FileStore, maxLoadAttempts?: number, timeout?: number): void;
        private start();
        private stop();
        private tagLoader();
        private tagLoaderOnReadyStateChange(event);
        private tagLoaderOnError(event);
        private tagLoaderProgressThrough(event);
        private tagLoaderOnLoad(event);
        private xhrLoader();
        private xhrOnReadyStateChange(event);
        private xhrOnLoadStart(event);
        private xhrOnAbort(event);
        private xhrOnError(event);
        private xhrOnTimeout(event);
        private xhrOnProgress(event);
        private xhrOnLoad(event);
        private createBlob();
        private revoke();
        private parseComplete();
        public getFileDetails(callback?: any, maxLoadAttempts?: number, timeout?: number): void;
        private sendXHRHeadRequest();
        private xhrHeadOnTimeout(event);
        private xhrHeadOnError(event);
        private getXHRResponseHeaders(event);
        public toString(): string;
    }
}
declare module Kiwi.Files {
    class FileStore {
        constructor(game: Kiwi.Game);
        public objType(): string;
        private _game;
        private _files;
        private _size;
        public boot(): void;
        public getFile(key: string): Files.File;
        public getFilesByTag(tag: string): Object;
        public removeFilesByTag(tag: string): {};
        public keys : string[];
        public size(): number;
        public addFile(key: string, value: Files.File): boolean;
        public exists(key: string): boolean;
        public removeStateFiles(state: Kiwi.State): void;
        public removeFile(key: string): boolean;
    }
}
declare module Kiwi.Components {
    class Animation extends Kiwi.Component {
        constructor(entity: Kiwi.Entity);
        private entity;
        private _atlas;
        private _animations;
        public currentAnimation: Kiwi.Animation.Anim;
        private _isPlaying;
        public isPlaying : boolean;
        public objType(): string;
        public add(name: string, cells: number[], speed: number, loop?: boolean, play?: boolean): Kiwi.Animation.Anim;
        public createFromSequence(sequence: Kiwi.Animation.Sequence, play?: boolean): Kiwi.Animation.Anim;
        public play(name?: string): Kiwi.Animation.Anim;
        public playAt(index: number, name?: string): Kiwi.Animation.Anim;
        private _play(name, index?);
        public stop(): void;
        public pause(): void;
        public resume(): void;
        public switchTo(val: any, play?: boolean): void;
        public nextFrame(): void;
        public prevFrame(): void;
        private _setCurrentAnimation(name);
        public update(): void;
        public currentCell : number;
        public frameIndex : number;
        public length : number;
        public getAnimation(name: string): Kiwi.Animation.Anim;
        private _setCellIndex();
        public toString : string;
        public destroy(): void;
    }
}
declare module Kiwi.GameObjects {
    class Sprite extends Kiwi.Entity {
        constructor(state: Kiwi.State, atlas: Kiwi.Textures.TextureAtlas, x?: number, y?: number, enableInput?: boolean);
        public objType(): string;
        private _isAnimated;
        public animation: Kiwi.Components.Animation;
        public box: Kiwi.Components.Box;
        public input: Kiwi.Components.Input;
        public update(): void;
        public render(camera: Kiwi.Camera): void;
    }
}
declare module Kiwi.GameObjects {
    class StaticImage extends Kiwi.Entity {
        constructor(state: Kiwi.State, atlas: Kiwi.Textures.TextureAtlas, x?: number, y?: number);
        public objType(): string;
        public box: Kiwi.Components.Box;
        public render(camera: Kiwi.Camera): void;
    }
}
declare module Kiwi.GameObjects {
    class Textfield extends Kiwi.Entity {
        constructor(state: Kiwi.State, text: string, x?: number, y?: number, color?: string, size?: number, weight?: string, fontFamily?: string);
        public objType(): string;
        private _text;
        private _fontWeight;
        private _fontSize;
        private _fontColor;
        private _fontFamily;
        private _lineHeight;
        private _textAlign;
        private _baseline;
        public text : string;
        public color : string;
        public fontWeight : string;
        public fontSize : number;
        public fontFamily : string;
        public lineHeight : number;
        public textAlign : string;
        public baseline : string;
        public render(camera: Kiwi.Camera): void;
    }
}
declare module Kiwi.GameObjects.Tilemap {
    class Tile extends Kiwi.Entity {
        constructor(state: Kiwi.State, tileLayer: Tilemap.TileMapLayer, tileType: Tilemap.TileType, width: number, height: number, x: number, y: number);
        public objType(): string;
        public tileUpdate(tileType: Tilemap.TileType): void;
        public tileLayer: Tilemap.TileMapLayer;
        public tileType: Tilemap.TileType;
        public physics: Kiwi.Components.ArcadePhysics;
        public tx: number;
        public ty: number;
    }
}
declare module Kiwi.GameObjects.Tilemap {
    class TileType {
        constructor(game: Kiwi.Game, tilemap: Tilemap.TileMap, index: number, width: number, height: number);
        private _game;
        public name: string;
        public mass: number;
        public width: number;
        public height: number;
        public immovable: boolean;
        public allowCollisions: number;
        public seperate: boolean;
        public tilemap: Tilemap.TileMap;
        public index: number;
        public destroy(): void;
        public toString(): string;
    }
}
declare module Kiwi.GameObjects.Tilemap {
    class TileMap extends Kiwi.Entity {
        constructor(state: Kiwi.State);
        public createFromData(tileMapData: any, atlas: Kiwi.Textures.SpriteSheet, game: Kiwi.Game, format: number): void;
        public createFromFileStore(tileMapDataKey: string, atlas: Kiwi.Textures.SpriteSheet, game: Kiwi.Game, format: number): void;
        public objType(): string;
        private _tileMapDataKey;
        private _atlas;
        private _game;
        static FORMAT_CSV: number;
        static FORMAT_TILED_JSON: number;
        public tiles: Tilemap.TileType[];
        public layers: Tilemap.TileMapLayer[];
        public currentLayer: Tilemap.TileMapLayer;
        public mapFormat: number;
        private _collisionCallback;
        private _collisionCallbackContext;
        public render(camera: Kiwi.Camera): void;
        private parseTiledJSON(data);
        private generateTiles(layer, qty);
        public widthInPixels(): number;
        public heightInPixels(): number;
        public getTileTypeByIndex(value: number): Tilemap.TileType;
        public getTile(x: number, y: number, layer?: number): Tilemap.Tile;
        public getTilesByType(index: number, layer?: number): any[];
        public getTileFromWorldXY(x: number, y: number, layer?: number): Tilemap.Tile;
        public getTileFromInputXY(layer?: number): Tilemap.Tile;
        public getTileOverlaps(object: Kiwi.Entity);
        public putTile(x: number, y: number, index: number, layer?: number): void;
        public setCollisionCallback(callback, context): void;
        public setCollisionRange(start: number, end: number, collision?: number, seperate?: boolean): void;
        public setCollisionByIndex(index: number, collision?: number, seperate?: boolean): void;
        public collideSingle(object: Kiwi.Entity): boolean;
        public collideGroup(group: Kiwi.Group): void;
        public destroy(): void;
    }
}
declare module Kiwi.GameObjects.Tilemap {
    class TileMapLayer extends Kiwi.Entity {
        constructor(state: Kiwi.State, game: Kiwi.Game, parent: Tilemap.TileMap, atlas: Kiwi.Textures.SpriteSheet, name: string, tileWidth: number, tileHeight: number);
        public tileParent: Tilemap.TileMap;
        private _game;
        public components: Kiwi.ComponentManager;
        private _atlas;
        private _tileOffsets;
        private _startX;
        private _startY;
        private _maxX;
        private _maxY;
        private _tx;
        private _ty;
        private _dx;
        private _dy;
        private _columnData;
        private _tempTileBlock;
        private _tempTileX;
        private _tempTileY;
        private _tempTileW;
        private _tempTileH;
        public name: string;
        public mapData;
        public mapFormat: number;
        public tileWidth: number;
        public tileHeight: number;
        public widthInTiles: number;
        public heightInTiles: number;
        public widthInPixels: number;
        public heightInPixels: number;
        public tileMargin: number;
        public tileSpacing: number;
        public putTile(x: number, y: number, tileType: Tilemap.TileType): void;
        public fillTiles(index: number, x?: number, y?: number, width?: number, height?: number): void;
        public randomiseTiles(tiles: number[], x?: number, y?: number, width?: number, height?: number): void;
        public swapTiles(indexA: number, indexB: number, x?: number, y?: number, width?: number, height?: number): void;
        public replaceTiles(indexA: number, indexB: number, x?: number, y?: number, width?: number, height?: number): void;
        public getTileFromWorldXY(x: number, y: number): Tilemap.Tile;
        public getTilesByIndex(index: number): any[];
        private getTempBlock(x, y, width, height, collisionOnly?);
        public getTileOverlaps(object: Kiwi.Entity);
        public getTileIndex(x: number, y: number): number;
        public getTile(x: number, y: number): Tilemap.Tile;
        public addRow(row: Array<T>): void;
        public parseTileOffsets(): number;
        public render(camera: Kiwi.Camera): boolean;
    }
}
declare module Kiwi.Geom {
    class Circle {
        constructor(x?: number, y?: number, diameter?: number);
        public objType(): string;
        private _diameter;
        private _radius;
        public x: number;
        public y: number;
        public diameter : number;
        public radius : number;
        public circumference : number;
        public bottom : number;
        public left : number;
        public right : number;
        public top : number;
        public area : number;
        public isEmpty : boolean;
        public clone(output?: Circle): Circle;
        public copyFrom(source: Circle): Circle;
        public copyTo(target: Circle): Circle;
        public distanceTo(target: any, round?: boolean): number;
        public equals(toCompare: Circle): boolean;
        public intersects(toIntersect: Circle): boolean;
        public circumferencePoint(angle: number, asDegrees?: boolean, output?: Geom.Point): Geom.Point;
        public offset(dx: number, dy: number): Circle;
        public offsetPoint(point: Geom.Point): Circle;
        public setTo(x: number, y: number, diameter: number): Circle;
        public toString(): string;
    }
}
declare module Kiwi.Geom {
    class Line {
        constructor(x1?: number, y1?: number, x2?: number, y2?: number);
        public objType(): string;
        public x1: number;
        public y1: number;
        public x2: number;
        public y2: number;
        public clone(output?: Line): Line;
        public copyFrom(source: Line): Line;
        public copyTo(target: Line): Line;
        public setTo(x1?: number, y1?: number, x2?: number, y2?: number): Line;
        public length : number;
        public getY(x: number): number;
        public angle : number;
        public slope : number;
        public perpSlope : number;
        public yIntercept : number;
        public isPointOnLine(x: number, y: number): boolean;
        public isPointOnLineSegment(x: number, y: number): boolean;
        public intersectLineLine(line): any;
        public perp(x: number, y: number, output?: Line): Line;
        public toString(): string;
    }
}
declare module Kiwi.Geom {
    class IntersectResult {
        public objType(): string;
        public result: boolean;
        public x: number;
        public y: number;
        public x1: number;
        public y1: number;
        public x2: number;
        public y2: number;
        public width: number;
        public height: number;
        public setTo(x1: number, y1: number, x2?: number, y2?: number, width?: number, height?: number): void;
    }
}
declare module Kiwi.Geom {
    class Intersect {
        public objType(): string;
        static distance(x1: number, y1: number, x2: number, y2: number): number;
        static distanceSquared(x1: number, y1: number, x2: number, y2: number): number;
        static lineToLine(line1: Geom.Line, line2: Geom.Line, output?: Geom.IntersectResult): Geom.IntersectResult;
        static lineToLineSegment(line1: Geom.Line, seg: Geom.Line, output?: Geom.IntersectResult): Geom.IntersectResult;
        static lineToRawSegment(line: Geom.Line, x1: number, y1: number, x2: number, y2: number, output?: Geom.IntersectResult): Geom.IntersectResult;
        static lineToRay(line1: Geom.Line, ray: Geom.Line, output?: Geom.IntersectResult): Geom.IntersectResult;
        static lineToCircle(line: Geom.Line, circle: Geom.Circle, output?: Geom.IntersectResult): Geom.IntersectResult;
        static lineToRectangle(line: Geom.Line, rect: Geom.Rectangle, output?: Geom.IntersectResult): Geom.IntersectResult;
        static lineSegmentToLineSegment(line1: Geom.Line, line2: Geom.Line, output?: Geom.IntersectResult): Geom.IntersectResult;
        static lineSegmentToRay(line1: Geom.Line, ray: Geom.Line, output?: Geom.IntersectResult): Geom.IntersectResult;
        static lineSegmentToCircle(seg: Geom.Line, circle: Geom.Circle, output?: Geom.IntersectResult): Geom.IntersectResult;
        static lineSegmentToRectangle(seg: Geom.Line, rect: Geom.Rectangle, output?: Geom.IntersectResult): Geom.IntersectResult;
        static rayToRectangle(ray: Geom.Line, rect: Geom.Rectangle, output?: Geom.IntersectResult): Geom.IntersectResult;
        static rayToLineSegment(rayx1, rayy1, rayx2, rayy2, linex1, liney1, linex2, liney2, output?: Geom.IntersectResult): Geom.IntersectResult;
        static circleToCircle(circle1: Geom.Circle, circle2: Geom.Circle, output?: Geom.IntersectResult): Geom.IntersectResult;
        static circleToRectangle(circle: Geom.Circle, rect: Geom.Rectangle, output?: Geom.IntersectResult): Geom.IntersectResult;
        static circleContainsPoint(circle: Geom.Circle, point: Geom.Point, output?: Geom.IntersectResult): Geom.IntersectResult;
        static pointToRectangle(point: Geom.Point, rect: Geom.Rectangle, output?: Geom.IntersectResult): Geom.IntersectResult;
        static rectangleToRectangle(rect1: Geom.Rectangle, rect2: Geom.Rectangle, output?: Geom.IntersectResult): Geom.IntersectResult;
    }
}
declare module Kiwi.Utils {
    class GameMath {
        public objType(): string;
        static PI: number;
        static PI_2: number;
        static PI_4: number;
        static PI_8: number;
        static PI_16: number;
        static TWO_PI: number;
        static THREE_PI_2: number;
        static E: number;
        static LN10: number;
        static LN2: number;
        static LOG10E: number;
        static LOG2E: number;
        static SQRT1_2: number;
        static SQRT2: number;
        static DEG_TO_RAD: number;
        static RAD_TO_DEG: number;
        static B_16: number;
        static B_31: number;
        static B_32: number;
        static B_48: number;
        static B_53: number;
        static B_64: number;
        static ONE_THIRD: number;
        static TWO_THIRDS: number;
        static ONE_SIXTH: number;
        static COS_PI_3: number;
        static SIN_2PI_3: number;
        static CIRCLE_ALPHA: number;
        static ON: boolean;
        static OFF: boolean;
        static SHORT_EPSILON: number;
        static PERC_EPSILON: number;
        static EPSILON: number;
        static LONG_EPSILON: number;
        static computeMachineEpsilon(): number;
        static fuzzyEqual(a: number, b: number, epsilon?: number): boolean;
        static fuzzyLessThan(a: number, b: number, epsilon?: number): boolean;
        static fuzzyGreaterThan(a: number, b: number, epsilon?: number): boolean;
        static fuzzyCeil(val: number, epsilon?: number): number;
        static fuzzyFloor(val: number, epsilon?: number): number;
        static average(...args: any[]): number;
        static slam(value: number, target: number, epsilon?: number): number;
        static percentageMinMax(val: number, max: number, min?: number): number;
        static sign(n: number): number;
        static truncate(n: number): number;
        static shear(n: number): number;
        static wrap(val: number, max: number, min?: number): number;
        static arithWrap(value: number, max: number, min?: number): number;
        static clamp(input: number, max: number, min?: number): number;
        static snapTo(input: number, gap: number, start?: number): number;
        static snapToFloor(input: number, gap: number, start?: number): number;
        static snapToCeil(input: number, gap: number, start?: number): number;
        static snapToInArray(input: number, arr: number[], sort?: boolean): number;
        static roundTo(value: number, place?: number, base?: number): number;
        static floorTo(value: number, place?: number, base?: number): number;
        static ceilTo(value: number, place?: number, base?: number): number;
        static interpolateFloat(a: number, b: number, weight: number): number;
        static radiansToDegrees(angle: number): number;
        static degreesToRadians(angle: number): number;
        static angleBetween(x1: number, y1: number, x2: number, y2: number): number;
        static normalizeAngle(angle: number, radians?: boolean): number;
        static nearestAngleBetween(a1: number, a2: number, radians?: boolean): number;
        static normalizeAngleToAnother(dep: number, ind: number, radians?: boolean): number;
        static normalizeAngleAfterAnother(dep: number, ind: number, radians?: boolean): number;
        static normalizeAngleBeforeAnother(dep: number, ind: number, radians?: boolean): number;
        static interpolateAngles(a1: number, a2: number, weight: number, radians?: boolean, ease?): number;
        static logBaseOf(value: number, base: number): number;
        static GCD(m: number, n: number): number;
        static LCM(m: number, n: number): number;
        static factorial(value: number): number;
        static gammaFunction(value: number): number;
        static fallingFactorial(base: number, exp: number): number;
        static risingFactorial(base: number, exp: number): number;
        static binCoef(n: number, k: number): number;
        static risingBinCoef(n: number, k: number): number;
        static chanceRoll(chance?: number): boolean;
        static maxAdd(value: number, amount: number, max: number): number;
        static minSub(value: number, amount: number, min: number): number;
        static wrapValue(value: number, amount: number, max: number): number;
        static randomSign(): number;
        static isOdd(n: number): boolean;
        static isEven(n: number): boolean;
        static wrapAngle(angle: number): number;
        static angleLimit(angle: number, min: number, max: number): number;
        static linearInterpolation(v, k);
        static bezierInterpolation(v, k): number;
        static catmullRomInterpolation(v, k);
        static linear(p0, p1, t);
        static bernstein(n, i): number;
        static catmullRom(p0, p1, p2, p3, t);
        static difference(a: number, b: number): number;
    }
}
declare module Kiwi.Geom {
    class AABB {
        constructor(cx: number, cy: number, width: number, height: number);
        public objType(): string;
        public cx: number;
        public cy: number;
        public halfWidth: number;
        public halfHeight: number;
        public height : number;
        public width : number;
        public draw(ctx: CanvasRenderingContext2D): AABB;
        public setPosition(cx: number, cy: number): AABB;
        public setPositionPoint(pos: Geom.Point): AABB;
        public toRect(): Geom.Rectangle;
        public fromRect(rect: Geom.Rectangle): AABB;
    }
}
declare module Kiwi.Geom {
    class Ray {
        constructor(x1?: number, y1?: number, x2?: number, y2?: number);
        public objType(): string;
        public x1: number;
        public y1: number;
        public x2: number;
        public y2: number;
        public clone(output?: Ray): Ray;
        public copyFrom(source: Ray): Ray;
        public copyTo(target: Ray): Ray;
        public setTo(x1?: number, y1?: number, x2?: number, y2?: number): Ray;
        public angle : number;
        public slope : number;
        public yIntercept : number;
        public isPointOnRay(x: number, y: number): boolean;
        public toString(): string;
    }
}
declare module Kiwi.Geom {
    class Vector2 {
        constructor(x?: number, y?: number);
        public objType(): string;
        public x: number;
        public y: number;
        static fromAngle(angle: number): Vector2;
        static randomRadius(radius: number): Vector2;
        static fromPoint(point: Geom.Point): Vector2;
        public add(vector2: Vector2): Vector2;
        public addX(vector2: Vector2): Vector2;
        public addY(vector2: Vector2): Vector2;
        public subtract(vector2: Vector2): Vector2;
        public multiply(vector2: Vector2): Vector2;
        public multiplyScalar(scalar: number): Vector2;
        public dot(vector2: Vector2): number;
        public lenSqr(): number;
        public len(): number;
        public unit(): Vector2;
        public floor(): Vector2;
        public ceil(): Vector2;
        public round(): Vector2;
        public clamp(min: Vector2, max: Vector2): Vector2;
        public perp(): Vector2;
        public neg(): Vector2;
        public equal(vector2: Vector2): boolean;
        public point(): Geom.Point;
        public clear(): Vector2;
        public clone(output?: Vector2): Vector2;
        public copyFrom(source: Vector2): Vector2;
        public copyTo(target: Vector2): Vector2;
        public setTo(x: number, y: number): Vector2;
        public toString(): string;
    }
}
declare module Kiwi.HUD {
    class HUDDisplay {
        constructor(game: Kiwi.Game, name: string);
        public container: HTMLDivElement;
        public name: string;
        private _game;
        private _widgets;
        public addWidget(widget: HUD.HUDWidget): void;
        public removeWidget(widget: HUD.HUDWidget): boolean;
        public removeAllWidgets(): void;
        private destroyWidget(widget);
        public update(): void;
        public render(): void;
    }
}
declare module Kiwi.HUD {
    class HUDManager {
        constructor(game: Kiwi.Game);
        private _game;
        private _hudContainer;
        public boot(): void;
        public objType(): string;
        private _huds;
        private _defaultHUD;
        private _currentHUD;
        public defaultHUD : HUD.HUDDisplay;
        public setHUD(hud: HUD.HUDDisplay): void;
        public showHUD(): void;
        public hideHUD(): void;
        public createHUD(name: string): HUD.HUDDisplay;
        public removeHUD(hud: HUD.HUDDisplay): boolean;
        private destroyHUD(hud);
        public update(): void;
        public render(): void;
    }
}
declare module Kiwi.HUD {
    class HUDWidget {
        constructor(name: string, x: number, y: number);
        public onCoordsUpdate: Kiwi.Signal;
        private _x;
        public x : number;
        private _y;
        public y : number;
        public components: Kiwi.ComponentManager;
        public container: HTMLDivElement;
        public name: string;
        public tempElement: HTMLElement;
        private _tempParent;
        private _tempContainer;
        public setTemplate(main: string, element?: string, ...paramsArr: any[]): void;
        public removeTemplate(): void;
        public setStyle(cssClass: string): void;
        public update(): void;
    }
}
declare module Kiwi.HUD.Widget {
    class TextField extends HUD.HUDWidget {
        constructor(text: string, x: number, y: number);
        private _text;
        private _textField;
        public setTemplate(main: string, field?: string): void;
        public removeTemplate(): void;
        public text(val?: string): string;
    }
}
declare module Kiwi.HUD.Widget {
    class Bar extends HUD.HUDWidget {
        constructor(current: number, max: number, x: number, y: number, width?: number, height?: number);
        private _width;
        public width : number;
        private _height;
        public height : number;
        private _horizontal;
        public bar: HTMLElement;
        private _bar;
        public range: HUD.Components.Range;
        public horizontal : boolean;
        public vertical : boolean;
        public setTemplate(main: string, innerbar?: string): void;
        public removeTemplate(): void;
        public updateCSS(): void;
    }
}
declare module Kiwi.HUD.Widget {
    class Icon extends HUD.HUDWidget {
        constructor(atlas: Kiwi.Textures.TextureAtlas, x: number, y: number);
        public atlas: Kiwi.Textures.TextureAtlas;
        private _cellIndex;
        public cellIndex : number;
        public width : number;
        public height : number;
        public icon: HTMLElement;
        public _removeCSS(): void;
        public _applyCSS(): void;
        public setTemplate(main: string, icon?: string): void;
        public removeTemplate(): void;
    }
}
declare module Kiwi.HUD.Widget {
    class IconCounter extends Widget.Icon {
        constructor(atlas: Kiwi.Textures.TextureAtlas, current: number, max: number, x: number, y: number);
        private _horizontal;
        public range: HUD.Components.Range;
        public _repeat: string;
        public repeat : string;
        private _changeSize();
        public _applyCSS(): void;
        public horizontal : boolean;
        public vertical : boolean;
    }
}
declare module Kiwi.HUD.Widget {
    class BasicScore extends Widget.TextField {
        constructor(x: number, y: number);
        public counter: HUD.Components.Counter;
        private _updateText();
    }
}
declare module Kiwi.HUD.Widget {
    class Button extends Widget.TextField {
        constructor(game: Kiwi.Game, width: number, height: number, x: number, y: number);
        private _width;
        public width : number;
        private _height;
        public height : number;
        public game: Kiwi.Game;
        public input: HUD.Components.WidgetInput;
        private _changed();
    }
}
declare module Kiwi.HUD.Widget {
    class Time extends Widget.TextField {
        constructor(format: string, x: number, y: number);
        private _format;
        public time: HUD.Components.Time;
        public setTime(milliseconds: number, seconds?: number, minutes?: number, hours?: number): number;
        public format(val?: string): string;
        public updateTime(): void;
    }
}
declare module Kiwi.HUD.Widget {
    class Menu extends HUD.HUDWidget {
        constructor(game: Kiwi.Game, x: number, y: number);
        public game: Kiwi.Game;
        private _menuItems;
        public addMenuItem(item: Widget.MenuItem): Widget.MenuItem;
        public addMenuItems(items: Widget.MenuItem[]): void;
        public getMenuItem(val: any): Widget.MenuItem;
        public setTemplate(main: string, sub?: string): void;
        public removeTemplate(): void;
        public update(): void;
    }
}
declare module Kiwi.HUD.Widget {
    class MenuItem extends HUD.HUDWidget {
        constructor(name: string, width: number, height: number, x: number, y: number);
        public game: Kiwi.Game;
        public input: HUD.Components.WidgetInput;
        private menu;
        public addedToStage(game: Kiwi.Game, menu: Widget.Menu): void;
        private _applyCSS();
    }
}
declare module Kiwi.HUD.Components {
    class Counter extends Kiwi.Component {
        constructor(initial: number, step?: number);
        private _value;
        public step: number;
        public updated: Kiwi.Signal;
        public value : number;
        public increment(val?: number): number;
        public decrement(val?: number): number;
    }
}
declare module Kiwi.HUD.Components {
    class WidgetInput extends Kiwi.Component {
        constructor(game: Kiwi.Game);
        public objType(): string;
        public game: Kiwi.Game;
        public inputEntered: Kiwi.Signal;
        public inputLeft: Kiwi.Signal;
        public inputOnDown: Kiwi.Signal;
        public inputOnRelease: Kiwi.Signal;
        public distance: Kiwi.Geom.Point;
        public isDown: boolean;
        public isUp: boolean;
        public withinBounds: boolean;
        public outsideBounds: boolean;
        public pointDown: Kiwi.Geom.Point;
        public update(): void;
        public toString : string;
    }
}
declare module Kiwi.HUD.Components {
    class Range extends Kiwi.Component {
        constructor(current: number, max: number, min: number);
        private _current;
        private _max;
        private _min;
        public updated: Kiwi.Signal;
        public max : number;
        public min : number;
        public current : number;
        public decrease(val?: number): number;
        public increase(val?: number): number;
        public currentPercent(): number;
    }
}
declare module Kiwi.HUD.Components {
    class Time extends Kiwi.Component {
        constructor(milliseconds: number, seconds?: number, minutes?: number, hours?: number);
        private _milliseconds;
        public paused: boolean;
        private _lastTime;
        private _countDown;
        public updated: Kiwi.Signal;
        public countingDown : boolean;
        public countingUp : boolean;
        public setTime(milliseconds: number, seconds?: number, minutes?: number, hours?: number): number;
        public increaseTime(milliseconds: number, seconds?: number, minutes?: number, hours?: number): number;
        public decreaseTime(milliseconds: number, seconds?: number, minutes?: number, hours?: number): number;
        public convertToMilli(val: number, unit: string): number;
        public milliseconds : number;
        public seconds : number;
        public minutes : number;
        public hours : number;
        public update(): void;
    }
}
declare module Kiwi.Sound {
    class AudioManager {
        constructor(game: Kiwi.Game);
        public objType(): string;
        private _game;
        private _volume;
        private _muted;
        private _sounds;
        public channels: number;
        public noAudio: boolean;
        public usingWebAudio: boolean;
        public usingAudioTag: boolean;
        public context: any;
        public masterGain: any;
        private _muteVolume;
        public boot(): void;
        public mute : boolean;
        public volume : number;
        public add(key: string, volume?: number, loop?: boolean): Sound.Audio;
        public remove(sound: Sound.Audio): void;
        public playAll(): void;
        public stopAll(): void;
        public pauseAll(): void;
        public resumeAll(): void;
        public update(): void;
    }
}
declare module Kiwi.Sound {
    class Audio {
        constructor(game: Kiwi.Game, key: string, volume: number, loop: boolean);
        public objType(): string;
        private _game;
        public context: any;
        public masterGainNode: any;
        public gainNode: any;
        private _usingAudioTag;
        private _usingWebAudio;
        private _muted;
        private _volume;
        private _loop;
        public key: string;
        private _file;
        private _sound;
        public ready: boolean;
        public totalDuration: number;
        public duration: number;
        private _buffer;
        private _decoded;
        private _muteVolume;
        public isPlaying: boolean;
        public paused: boolean;
        private _pending;
        private _startTime;
        private _currentTime;
        private _stopTime;
        private _markers;
        private _currentMarker;
        public onPlay: Kiwi.Signal;
        public onStop: Kiwi.Signal;
        public onPause: Kiwi.Signal;
        public onResume: Kiwi.Signal;
        public onLoop: Kiwi.Signal;
        public onMute: Kiwi.Signal;
        private _setAudio(key);
        private _decode();
        public volume : number;
        public mute : boolean;
        public addMarker(name: string, start: number, stop: number, loop?: boolean): void;
        public removeMarker(name: string): void;
        public play(marker?: string, forceRestart?: boolean): void;
        public stop(): void;
        public pause(): void;
        public resume(): void;
        public update(): void;
        public destroy(): void;
    }
}
declare module Kiwi.Sound {
    class AudioLibrary {
        constructor(game: Kiwi.Game);
        public objType(): string;
        private _game;
        public audio;
        public clear(): void;
        public add(audioFile: Kiwi.Files.File): void;
    }
}
declare module Kiwi.Input {
    class Key {
        constructor(manager: Input.Keyboard, keycode: number, event?: KeyboardEvent);
        public objType(): string;
        private _manager;
        public keyCode: number;
        public isDown: boolean;
        public isUp: boolean;
        public altKey: boolean;
        public ctrlKey: boolean;
        public shiftKey: boolean;
        public timeDown: number;
        public duration: number;
        public timeUp: number;
        public repeats: number;
        public update(event: KeyboardEvent): void;
        public justPressed(duration?: number): boolean;
        public justReleased(duration?: number): boolean;
    }
}
declare module Kiwi.Input {
    class Keyboard {
        constructor(game: Kiwi.Game);
        public objType(): string;
        public game: Kiwi.Game;
        private _domElement;
        private _keys;
        public justPressedRate: number;
        public justReleasedRate: number;
        public boot(): void;
        public update(): void;
        public start(): void;
        public stop(): void;
        public onKeyDown(event: KeyboardEvent): void;
        public onKeyUp(event): void;
        public addKey(keycode: number): Input.Key;
        public justPressed(key): void;
        public justReleased(key): void;
        public isDown(keycode: number): boolean;
        public isUp(keycode: number): boolean;
        public reset(): void;
    }
}
declare module Kiwi.Input {
    class Keycodes {
        public objType(): string;
        static A: number;
        static B: number;
        static C: number;
        static D: number;
        static E: number;
        static F: number;
        static G: number;
        static H: number;
        static I: number;
        static J: number;
        static K: number;
        static L: number;
        static M: number;
        static N: number;
        static O: number;
        static P: number;
        static Q: number;
        static R: number;
        static S: number;
        static T: number;
        static U: number;
        static V: number;
        static W: number;
        static X: number;
        static Y: number;
        static Z: number;
        static ZERO: number;
        static ONE: number;
        static TWO: number;
        static THREE: number;
        static FOUR: number;
        static FIVE: number;
        static SIX: number;
        static SEVEN: number;
        static EIGHT: number;
        static NINE: number;
        static NUMPAD_0: number;
        static NUMPAD_1: number;
        static NUMPAD_2: number;
        static NUMPAD_3: number;
        static NUMPAD_4: number;
        static NUMPAD_5: number;
        static NUMPAD_6: number;
        static NUMPAD_7: number;
        static NUMPAD_8: number;
        static NUMPAD_9: number;
        static NUMPAD_MULTIPLY: number;
        static NUMPAD_ADD: number;
        static NUMPAD_ENTER: number;
        static NUMPAD_SUBTRACT: number;
        static NUMPAD_DECIMAL: number;
        static NUMPAD_DIVIDE: number;
        static F1: number;
        static F2: number;
        static F3: number;
        static F4: number;
        static F5: number;
        static F6: number;
        static F7: number;
        static F8: number;
        static F9: number;
        static F10: number;
        static F11: number;
        static F12: number;
        static F13: number;
        static F14: number;
        static F15: number;
        static COLON: number;
        static EQUALS: number;
        static UNDERSCORE: number;
        static QUESTION_MARK: number;
        static TILDE: number;
        static OPEN_BRACKET: number;
        static BACKWARD_SLASH: number;
        static CLOSED_BRACKET: number;
        static QUOTES: number;
        static BACKSPACE: number;
        static TAB: number;
        static CLEAR: number;
        static ENTER: number;
        static SHIFT: number;
        static CONTROL: number;
        static ALT: number;
        static CAPS_LOCK: number;
        static ESC: number;
        static SPACEBAR: number;
        static PAGE_UP: number;
        static PAGE_DOWN: number;
        static END: number;
        static HOME: number;
        static LEFT: number;
        static UP: number;
        static RIGHT: number;
        static DOWN: number;
        static INSERT: number;
        static DELETE: number;
        static HELP: number;
        static NUM_LOCK: number;
    }
}
declare module Kiwi.Input {
    class Pointer {
        constructor(game: Kiwi.Game);
        public objType(): string;
        private _game;
        public game : Kiwi.Game;
        public id: number;
        public x: number;
        public y: number;
        public clientX: number;
        public clientY: number;
        public pageX: number;
        public pageY: number;
        public screenX: number;
        public screenY: number;
        public point: Kiwi.Geom.Point;
        public circle: Kiwi.Geom.Circle;
        public isDown: boolean;
        public isUp: boolean;
        public withinGame: boolean;
        public active: boolean;
        public timeDown: number;
        public timeUp: number;
        public duration: number;
        public frameDuration: number;
        public justPressedRate: number;
        public justReleasedRate: number;
        public startPoint: Kiwi.Geom.Point;
        public endPoint: Kiwi.Geom.Point;
        public start(event): void;
        public stop(event): void;
        public move(event): void;
        public justPressed(duration?: number): boolean;
        public justReleased(duration?: number): boolean;
        public reset(): void;
        public update(): void;
    }
}
declare module Kiwi.Input {
    class MouseCursor extends Input.Pointer {
        public objType(): string;
        public wheelDeltaX: number;
        public wheelDeltaY: number;
        public ctrlKey: boolean;
        public shiftKey: boolean;
        public altKey: boolean;
        public button: number;
        public start(event): void;
        public stop(event): void;
        public wheel(event): void;
    }
}
declare module Kiwi.Input {
    class Mouse {
        constructor(game: Kiwi.Game);
        public objType(): string;
        private _game;
        private _domElement;
        static LEFT_BUTTON: number;
        static MIDDLE_BUTTON: number;
        static RIGHT_BUTTON: number;
        public mouseDown: Kiwi.Signal;
        public mouseUp: Kiwi.Signal;
        private _cursor;
        public cursor : Input.MouseCursor;
        public boot(): void;
        public isDown : boolean;
        public isUp : boolean;
        public duration : number;
        public x : number;
        public y : number;
        public wheelDeltaX : number;
        public wheelDeltaY : number;
        public ctrlKey : boolean;
        public shiftKey : boolean;
        public altKey : boolean;
        public button : number;
        public update(): void;
        public start(): void;
        public stop(): void;
        public onMouseDown(event: MouseEvent): void;
        public onMouseMove(event: MouseEvent): void;
        public onMouseUp(event: MouseEvent): void;
        public onMouseWheel(event: WheelEvent): void;
        public justPressed(duration?: number): boolean;
        public justReleased(duration?: number): boolean;
        public reset(): void;
    }
}
declare module Kiwi.Input {
    class Manager {
        constructor(game: Kiwi.Game);
        public objType(): string;
        public onDown: Kiwi.Signal;
        public onUp: Kiwi.Signal;
        public game: Kiwi.Game;
        public mouse: Input.Mouse;
        public keyboard: Input.Keyboard;
        public touch: Input.Touch;
        private _pointers;
        public pointers : any;
        public boot(): void;
        private _onDownEvent(x, y, timeDown, timeUp, duration, pointer);
        private _onUpEvent(x, y, timeDown, timeUp, duration, pointer);
        public onPressed : Kiwi.Signal;
        public onReleased : Kiwi.Signal;
        public update(): void;
        public reset(): void;
        public position: Kiwi.Geom.Point;
        public isDown: boolean;
        public x : number;
        public y : number;
    }
}
declare module Kiwi.Input {
    class Finger extends Input.Pointer {
        constructor(game: Kiwi.Game);
        public objType(): string;
        public start(event): void;
        public stop(event): void;
        public leave(event): void;
        public reset(): void;
    }
}
declare module Kiwi.Input {
    class Touch {
        constructor(game: Kiwi.Game);
        private _game;
        private _domElement;
        private _fingers;
        public fingers : Input.Finger[];
        public finger1: Input.Finger;
        public finger2: Input.Finger;
        public finger3: Input.Finger;
        public finger4: Input.Finger;
        public finger5: Input.Finger;
        public finger6: Input.Finger;
        public finger7: Input.Finger;
        public finger8: Input.Finger;
        public finger9: Input.Finger;
        public finger10: Input.Finger;
        public latestFinger: Input.Finger;
        public isDown: boolean;
        public isUp: boolean;
        public touchDown: Kiwi.Signal;
        public touchUp: Kiwi.Signal;
        public touchCancel: Kiwi.Signal;
        public boot(): void;
        public start(): void;
        private consumeTouchMove(event);
        public x : number;
        public y : number;
        private _maxPointers;
        public maximumPointers : number;
        private onTouchStart(event);
        private onTouchCancel(event);
        private onTouchEnter(event);
        private onTouchLeave(event);
        private onTouchMove(event);
        private onTouchEnd(event);
        public update(): void;
        public stop(): void;
        public reset(): void;
    }
}
declare module Kiwi.Plugins.Gamefroot {
    class TileMapConverter {
        constructor(jsonData: any, imageData: any);
        private static GF_TILE_WIDTH;
        private static GF_TILE_HEIGHT;
        private _gfData;
        private _gfImg;
        public kiwiData: any;
        public convert(): void;
        private _convertWidthHeight();
        private _convertTilesets();
        private _convertLayers();
        private _convertLayer(layerNumber);
        private _getSpritePosition(id);
    }
}
interface IRenderer {
    render(camera: Kiwi.Camera);
    boot();
}
declare module Kiwi.Renderers {
    class CanvasRenderer implements IRenderer {
        constructor(game: Kiwi.Game);
        public boot(): void;
        public objType(): string;
        private _game;
        private _currentCamera;
        private _recurse(child);
        public render(camera: Kiwi.Camera): void;
    }
}
declare module Kiwi.Renderers {
    class GLRenderer implements IRenderer {
        constructor(game: Kiwi.Game);
        public boot(): void;
        public objType(): string;
        private _game;
        private _currentCamera;
        private _stageResolution;
        private _shaders;
        private _vertBuffer;
        private _indexBuffer;
        private _uvBuffer;
        private _colorBuffer;
        private _texture;
        private _entityCount;
        private _maxItems;
        private _texApplied;
        private _firstPass;
        public mvMatrix: Float32Array;
        public mvMatrixStack: Array<T>;
        private _currentTextureAtlas;
        private _initState();
        public render(camera: Kiwi.Camera): void;
        private _recurse(gl, child, camera);
        private _flush(gl);
        private _compileVertices(gl, entity, camera);
        private _compileUVs(gl, entity);
        private _applyTexture(gl, image);
        private _changeTexture(gl, image);
        private _draw(gl);
        private _generateIndices(numQuads);
        private _generateColors(numVerts);
    }
}
declare module Kiwi.Renderers {
    class GLShaders {
        constructor(gl: WebGLRenderingContext);
        public ready: boolean;
        public vertShader: WebGLShader;
        public fragShader: WebGLShader;
        public shaderProgram: WebGLProgram;
        public attach(gl: WebGLRenderingContext, vertShader: WebGLShader, fragShader: WebGLShader): WebGLProgram;
        public compile(gl: WebGLRenderingContext, src: string, shaderType: number): WebGLShader;
        public texture2DProg: {
            vertexPositionAttribute: null;
            vertexTexCoordAttribute: null;
            vertexColorAttribute: null;
            mvMatrixUniform: null;
            samplerUniform: null;
            resolutionUniform: null;
            textureSizeUniform: null;
            cameraOffsetUniform: null;
        };
        public use(gl: WebGLRenderingContext, shaderProgram: WebGLProgram): void;
        public texture2DFrag: Array<T>;
        public texture2DVert: Array<T>;
    }
}
declare module Kiwi.Renderers {
    class GLTexture {
        constructor(gl: WebGLRenderingContext, _image?: HTMLImageElement);
        public texture: WebGLTexture;
        public image: HTMLImageElement;
        public refresh(gl: WebGLRenderingContext, _image: HTMLImageElement): void;
    }
}
declare module Kiwi.Renderers {
    class GLArrayBuffer {
        constructor(gl: WebGLRenderingContext, _itemSize?: number, items?: number[], init?: boolean);
        public items: number[];
        public buffer: WebGLBuffer;
        public itemSize: number;
        public numItems: number;
        public clear(): void;
        public init(gl: WebGLRenderingContext): WebGLBuffer;
        public refresh(gl: WebGLRenderingContext, items: number[]): WebGLBuffer;
        static squareVertices: number[];
        static squareUVs: number[];
        static squareCols: number[];
    }
}
declare module Kiwi.Renderers {
    class GLElementArrayBuffer {
        constructor(gl: WebGLRenderingContext, _itemSize?: number, _indices?: number[], init?: boolean);
        public indices: number[];
        public buffer: WebGLBuffer;
        public itemSize: number;
        public numItems: number;
        public clear(): void;
        public init(gl: WebGLRenderingContext): WebGLBuffer;
        public refresh(gl: WebGLRenderingContext, indices: number[]): WebGLBuffer;
        static square: number[];
    }
}
declare module Kiwi.System {
    class Bootstrap {
        private _callback;
        private _domParent;
        private _createContainer;
        public isReady: boolean;
        public container: HTMLDivElement;
        public input: HTMLDivElement;
        public objType(): string;
        public boot(domParent: string, callback?: any, createContainer?: boolean): void;
        public ready(): void;
        private _setupContainer(id?);
    }
}
declare module Kiwi.System {
    class Browser {
        constructor(game: Kiwi.Game);
        public objType(): string;
        private _game;
        public boot(): void;
        public getOffsetPoint(element, output?: Kiwi.Geom.Point): Kiwi.Geom.Point;
    }
}
declare module Kiwi.System {
    class Device {
        constructor();
        public objType(): string;
        public iOS: boolean;
        public android: boolean;
        public chromeOS: boolean;
        public linux: boolean;
        public macOS: boolean;
        public windows: boolean;
        public canvas: boolean;
        public file: boolean;
        public fileSystem: boolean;
        public localStorage: boolean;
        public webGL: boolean;
        public worker: boolean;
        public blob: boolean;
        public touch: boolean;
        public css3D: boolean;
        public arora: boolean;
        public chrome: boolean;
        public epiphany: boolean;
        public firefox: boolean;
        public ie: boolean;
        public ieVersion: number;
        public mobileSafari: boolean;
        public midori: boolean;
        public opera: boolean;
        public safari: boolean;
        public webApp: boolean;
        public audioData: boolean;
        public webaudio: boolean;
        public ogg: boolean;
        public mp3: boolean;
        public wav: boolean;
        public m4a: boolean;
        public iPhone: boolean;
        public iPhone4: boolean;
        public iPad: boolean;
        public pixelRatio: number;
        private _checkOS();
        private _checkFeatures();
        private _checkBrowser();
        private _checkAudio();
        private _checkDevice();
        private _checkCSS3D();
        public getAll(): string;
    }
}
declare module Kiwi.Textures {
    class TextureAtlas {
        constructor(name: string, type: number, cells, image?: HTMLImageElement, sequences?: Kiwi.Animation.Sequence[]);
        public objType(): string;
        public name: string;
        public image: HTMLImageElement;
        public cells: Array<T>;
        public sequences: Kiwi.Animation.Sequence[];
        public cellIndex: number;
        private _type;
        static SINGLE_IMAGE: number;
        static SPRITE_SHEET: number;
        static TEXTURE_ATLAS: number;
        public type : number;
        public readJSON(atlasJSON): void;
    }
}
declare module Kiwi.Textures {
    class TextureLibrary {
        constructor(game: Kiwi.Game);
        public objType(): string;
        private _game;
        public textures;
        public clear(): void;
        public add(imageFile: Kiwi.Files.File): void;
        private _base2Sizes;
        private _rebuildImage(imageFile);
        private _buildTextureAtlas(imageFile);
        private _buildSpriteSheet(imageFile);
        private _buildImage(imageFile);
    }
}
declare module Kiwi.Textures {
    class SpriteSheet extends Textures.TextureAtlas {
        constructor(name: string, texture: HTMLImageElement, cellWidth: number, cellHeight: number, numCells?: number, rows?: number, cols?: number, sheetOffsetX?: number, sheetOffsetY?: number, cellOffsetX?: number, cellOffsetY?: number);
        public objType(): string;
        private cellWidth;
        private cellHeight;
        private numCells;
        private _rows;
        public rows : number;
        private _cols;
        public cols : number;
        private sheetOffsetX;
        private sheetOffsetY;
        private cellOffsetX;
        private cellOffsetY;
        public generateAtlasCells(): Array<T>;
    }
}
declare module Kiwi.Textures {
    class SingleImage extends Textures.TextureAtlas {
        constructor(name: string, image: HTMLImageElement, width?: number, height?: number, offsetX?: number, offsetY?: number);
        public objType(): string;
        private width;
        private height;
        private offsetX;
        private offsetY;
        public generateAtlasCells(): Array<T>;
    }
}
declare module Kiwi.Time {
    class TimerEvent {
        constructor(type: number, callback, context);
        public objType(): string;
        static TIMER_START: number;
        static TIMER_COUNT: number;
        static TIMER_STOP: number;
        private _callback;
        private _callbackContext;
        public type: number;
        public run(): void;
    }
}
declare module Kiwi.Time {
    class Timer {
        constructor(name: string, clock: Time.Clock, delay: number, repeatCount?: number);
        public objType(): string;
        private _currentCount;
        public currentCount(): number;
        private _startEvents;
        private _countEvents;
        private _stopEvents;
        private _clock;
        private _timeLastCount;
        private _isRunning;
        public isRunning(): boolean;
        private _isStopped;
        public isStopped(): boolean;
        private _isPaused;
        public isPaused(): boolean;
        public name: string;
        public delay: number;
        public repeatCount: number;
        private processEvents(type);
        public update(): void;
        public start(): Timer;
        public stop(): Timer;
        public pause(): Timer;
        public resume(): Timer;
        public addTimerEvent(event: Time.TimerEvent): Time.TimerEvent;
        public createTimerEvent(type: number, callback, context): Time.TimerEvent;
        public removeTimerEvent(event: Time.TimerEvent): boolean;
        public clear(type?: number): void;
        public toString(): string;
    }
}
declare module Kiwi.Time {
    class MasterClock {
        constructor();
        public objType(): string;
        private _started;
        public time: number;
        public now: number;
        public delta: number;
        public elapsed(): number;
        public totalElapsedSeconds(): number;
        public update(): void;
        public elapsedSince(since: number): number;
        public elapsedSecondsSince(since: number): number;
        public reset(): void;
    }
}
declare module Kiwi.Time {
    class Clock {
        constructor(manager: Time.Manager, master: Time.MasterClock, name: string, units?: number);
        public objType(): string;
        private timers;
        private _timeFirstStarted;
        public elapsedSinceFirstStarted(): number;
        private _timeLastStarted;
        public started(): number;
        public elapsed(): number;
        private _timeLastStopped;
        public elapsedSinceLastStopped(): number;
        private _timeLastPaused;
        public elapsedSinceLastPaused(): number;
        private _timeLastUnpaused;
        public elapsedSinceLastUnpaused(): number;
        private _totalPaused;
        private _isRunning;
        public isRunning(): boolean;
        private _isStopped;
        public isStopped(): boolean;
        private _isPaused;
        public isPaused(): boolean;
        private _elapsedState;
        public manager: Time.Manager;
        public master: Time.MasterClock;
        public name: string;
        public units: number;
        public addTimer(timer: Time.Timer): Clock;
        public createTimer(name: string, delay?: number, repeatCount?: number): Time.Timer;
        public removeTimer(timer?: Time.Timer, timerName?: string): boolean;
        public checkExists(name: string): boolean;
        public stopAllTimers(): Clock;
        public convertToMilliseconds(time: number): number;
        public update(): void;
        public start(): Clock;
        public pause(): Clock;
        public resume(): Clock;
        public stop(): Clock;
        public toString(): string;
    }
}
declare module Kiwi.Time {
    class Manager {
        constructor(game: Kiwi.Game);
        public objType(): string;
        private _game;
        private _clocks;
        private master;
        public clock: Time.Clock;
        public boot(): void;
        public addClock(name: string, units?: number): Time.Clock;
        public getClock(name: string): Time.Clock;
        public update(): void;
        public now(): number;
        public delta(): number;
    }
}
declare module Kiwi.Utils {
    class Canvas {
        constructor(width: number, height: number, visible?: boolean, offScreen?: boolean);
        private _width;
        public width : number;
        private _height;
        public height : number;
        public objType(): string;
        public domElement: HTMLCanvasElement;
        public context: CanvasRenderingContext2D;
        private _visible;
        private _offScreen;
        private _clearMode;
        static CLEARMODE_NONE: number;
        static CLEARMODE_CLEARRECT: number;
        static CLEARMODE_FILLRECT: number;
        static CLEARMODE_FILLRECT_ALPHA: number;
        public bgColor: string;
        private _updatedSize();
        public destroy(): void;
        public visible : boolean;
        public clearMode : number;
        public clear(): void;
        public saveAsPNG(): string;
        public toString(): string;
    }
}
declare module Kiwi.Utils {
    class Common {
        static defaultCompare(a, b): number;
        public objType(): string;
        static defaultEquals(a, b): boolean;
        static defaultTostring(item);
        static isFunction(func): boolean;
        static isNumeric(value): boolean;
        static isUndefined(obj): boolean;
        static isString(obj): boolean;
        static reverseCompareFunction(compareFunction): (d: any, v: any) => number;
        static compareToEquals(compareFunction): (a: any, b: any) => boolean;
        static shuffleArray(array);
    }
}
declare module Kiwi.Utils {
    class RandomDataGenerator {
        constructor(seeds?: string[]);
        public objType(): string;
        private s0;
        private s1;
        private s2;
        private c;
        private _data;
        private uint32();
        private fract32();
        private rnd();
        private hash(data);
        public sow(seeds?: string[]): void;
        public integer(): number;
        public frac(): number;
        public real(): number;
        public integerInRange(min: number, max: number): number;
        public realInRange(min: number, max: number): number;
        public normal(): number;
        public uuid(): string;
        public pick(array);
        public weightedPick(array);
        public word();
        public words(quantity?: number): string;
        public sentence(): string;
        public sentences(quantity?: number): string;
        public timestamp(min?: number, max?: number): number;
        public angle(): number;
    }
}
declare module Kiwi.Utils {
    class RequestAnimationFrame {
        constructor(callback);
        public objType(): string;
        private _callback;
        public setCallback(callback): void;
        private _timeOutID;
        private _isSetTimeOut;
        public isUsingSetTimeOut(): boolean;
        public isUsingRAF(): boolean;
        public lastTime: number;
        public currentTime: number;
        public isRunning: boolean;
        public start(callback?): void;
        public stop(): void;
        public RAFUpdate(): void;
        public SetTimeoutUpdate(): void;
    }
}
declare module Kiwi.Utils {
    class Dictionary {
        constructor(toStrFunction?: (item: any) => any);
        public objType(): string;
        private nElements;
        public size(): number;
        public isEmpty(): boolean;
        private table;
        private toStr;
        public get(key);
        public set(key, value);
        public remove(key);
        public keys(): any[];
        public values(): any[];
        public forEach(callback): void;
        public containsKey(key): boolean;
        public clear(): void;
        public toString(): string;
    }
}
declare module Kiwi.Utils {
    class LinkedList {
        public objType(): string;
        public firstNode;
        public lastNode;
        private nElements;
        public size(): number;
        public isEmpty(): boolean;
        private nodeAtIndex(index);
        private createNode(item);
        private equalsAux(n1, n2, eqF);
        public add(item, index?: number): boolean;
        public first();
        public last();
        public elementAtIndex(index);
        public indexOf(item, equalsFunction?: (a: any, b: any) => boolean): number;
        public contains(item, equalsFunction): boolean;
        public remove(item, equalsFunction?: (a: any, b: any) => boolean): boolean;
        public clear(): void;
        public equals(other: LinkedList, equalsFunction?: (a: any, b: any) => boolean): boolean;
        public removeElementAtIndex(index);
        public forEach(callback): void;
        public reverse(): void;
        public toArray(): any[];
        public toString(): string;
    }
}
declare module Kiwi {
    var VERSION: string;
    var RENDERER_CANVAS: number;
    var RENDERER_WEBGL: number;
    var TARGET_BROWSER: number;
    var TARGET_COCOON: number;
    var DEBUG_ON: number;
    var DEBUG_OFF: number;
    var DEVICE: System.Device;
    var ADDED_TO_STATE: number;
    var ADDED_TO_LAYER: number;
    var ADDED_TO_GROUP: number;
    var ADDED_TO_ENTITY: number;
    var REMOVED_FROM_STATE: number;
    var REMOVED_FROM_LAYER: number;
    var REMOVED_FROM_GROUP: number;
    var REMOVED_FROM_ENTITY: number;
    var STATE: number;
    var LAYER: number;
    var GROUP: number;
    var ENTITY: number;
    var CAMERA: number;
    var HUD_WIDGET: number;
    var TILE_LAYER: number;
    class GameManager {
        public objType(): string;
        private static _games;
        static register(game: Kiwi.Game): number;
        static total(): number;
    }
}
