module Kiwi.DOM {
    class Bootstrap {
        private _callback;
        private _domParent;
        private _createContainer;
        public isReady: bool;
        public container: HTMLDivElement;
        public layers: HTMLDivElement;
        public input: HTMLDivElement;
        public boot(domParent: string, callback?: any, createContainer?: bool): void;
        public ready(): void;
        private createLayersContainer();
        private createInputContainer();
    }
}
module Kiwi {
    class Device {
        constructor();
        public iOS: bool;
        public android: bool;
        public chromeOS: bool;
        public linux: bool;
        public macOS: bool;
        public windows: bool;
        public canvas: bool;
        public file: bool;
        public fileSystem: bool;
        public localStorage: bool;
        public webGL: bool;
        public worker: bool;
        public touch: bool;
        public css3D: bool;
        public arora: bool;
        public chrome: bool;
        public epiphany: bool;
        public firefox: bool;
        public ie: bool;
        public ieVersion: number;
        public mobileSafari: bool;
        public midori: bool;
        public opera: bool;
        public safari: bool;
        public audioData: bool;
        public webaudio: bool;
        public ogg: bool;
        public mp3: bool;
        public wav: bool;
        public m4a: bool;
        public iPhone: bool;
        public iPhone4: bool;
        public iPad: bool;
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
module Kiwi {
    class File {
        constructor(dataType: string, path: string, cacheID?: string, saveToCache?: bool, cache?: FileCache);
        private _xhr;
        private _cache;
        private _saveToCache;
        private _useTagLoader;
        static IMAGE: string;
        static AUDIO: string;
        static JSON: string;
        static XML: string;
        static BINARY_DATA: string;
        static TEXT_DATA: string;
        public dataType: string;
        public cacheID: string;
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
        public hasTimedOut: bool;
        public timedOut: number;
        public timeStarted: number;
        public timeFinished: number;
        public duration: number;
        public hasError: bool;
        public success: bool;
        public attemptCounter: number;
        public maxLoadAttempts: number;
        public error: any;
        public onCompleteCallback: any;
        public onProgressCallback: any;
        public lastProgress: number;
        public percentLoaded: number;
        public buffer: any;
        public data: any;
        public load(onCompleteCallback?: any, onProgressCallback?: any, customCache?: FileCache, maxLoadAttempts?: number, timeout?: number): void;
        private start();
        private stop();
        private tagLoader();
        private tagLoaderOnReadyStateChange(event);
        private tagLoaderOnError(event);
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
        public saveToCache(value?: bool): bool;
        public cache(value?: FileCache): FileCache;
        public toString(): string;
    }
}
module Kiwi {
    class FileCache {
        constructor();
        private _files;
        private _cacheSize;
        public getFile(key: string): File;
        public size(): number;
        public addFile(key: string, value: File): bool;
        public exists(key: string): bool;
        public removeFile(key: string): bool;
    }
}
module Kiwi {
    class Cache {
        constructor(game: Game);
        private _game;
        private _caches;
        public images: FileCache;
        public audio: FileCache;
        public data: FileCache;
        public boot(): void;
    }
}
module Kiwi {
    class StateConfig {
        constructor(parent: State, name: string);
        private _state;
        public name: string;
        public isPersistent: bool;
        public isCreated: bool;
        public isInitialised: bool;
        public isReady: bool;
        public hasInit: bool;
        public hasPreloader: bool;
        public hasLoadProgress: bool;
        public hasLoadComplete: bool;
        public hasCreate: bool;
        public hasOnEnter: bool;
        public hasUpdate: bool;
        public hasRender: bool;
        public hasOnExit: bool;
        public hasShutDown: bool;
        public hasDestroy: bool;
        public runCount: number;
        public type: number;
        public populate(): void;
    }
}
module Kiwi {
    class State {
        constructor(name: string);
        public config: StateConfig;
        public game: Game;
        public cache: Cache;
        public members: any[];
        public boot(): void;
        private currentLayer;
        public init(): void;
        public preload(): void;
        public loadProgress(percent: number, bytesLoaded: number, file: File): void;
        public loadComplete(): void;
        public create(): void;
        public update(): void;
        public setType(value: number): void;
        public swapLayer(layer: Layer): void;
        public addImage(cacheID: string, url: string): void;
        public addChild(child, layer?: Layer);
    }
}
module Kiwi {
    class Entity {
        constructor(supportsCanvas: bool, supportsDOM: bool, supportsWebGL: bool);
        public game: Game;
        public state: State;
        public id: string;
        public name: string;
        public type: number;
        public layer: Layer;
        public parent: Group;
        public domElement: DOM.Element;
        public domElementType: string;
        private _cssStack;
        private _exists;
        public exists(value?: bool): bool;
        private _active;
        public active(value?: bool): bool;
        private _visible;
        public visible(value?: bool): bool;
        public dirty: bool;
        private _supportsCanvas;
        private _supportsDOM;
        private _supportsWebGL;
        public supportsType(type: number): bool;
        public isGroup(): bool;
        public _addedToLayer(layer: Layer): bool;
        public _removedFromLayer(layer: Layer): void;
        public _addedToState(state: State): void;
        public _removedFromState(state: State): void;
        public _addedToGroup(group: Group): void;
        public _removedFromGroup(group: Group): void;
        public _changedPosition(group: Group, index: number): void;
        public addStyleUpdate(key: string, value: string): void;
        public update(): void;
        public render(): void;
        public destroy(): void;
    }
}
module Kiwi.DOM {
    class Cache {
        constructor(parent: Layer, game: Game, size: number);
        private _game;
        private _parent;
        private _cache;
        private _swapperA;
        private _swapperB;
        public domContainer: HTMLElement;
        public increaseCacheSize(value: number): number;
        public assignElement(parent): Element;
        public swapElements(first: Element, second: Element): bool;
    }
}
module Kiwi.Utils {
    class Canvas {
        constructor(layer: Layer, width: number, height: number, visible?: bool, offScreen?: bool);
        private _layer;
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
        public size: Components.Size;
        private _updatedSize(width, height);
        public destroy(): void;
        public visible(value?: bool): bool;
        public clearMode(value?: number): number;
        public clear(): void;
        public saveAsPNG(): string;
        public toString(): string;
    }
}
module Kiwi {
    class Layer {
        constructor(game: Game, id: number, type: number, name: string, size: number);
        private _updatedStageSize(width, height);
        public game: Game;
        public parent: State;
        public id: number;
        public name: string;
        public type: number;
        public domContainer: HTMLElement;
        public domCache: DOM.Cache;
        public canvas: Utils.Canvas;
        private _renderList;
        public numChildren(): number;
        private _visible;
        public visible(value?: bool): bool;
        private _dirty;
        public dirty(value?: bool): bool;
        public add(child): bool;
        public remove(child): bool;
        public update(): void;
        public render(): void;
    }
}
module Kiwi {
    class LayerManager {
        constructor(game: Game, defaultType: number);
        private _game;
        private _defaultType;
        private _layers;
        private _nextLayerID;
        public defaultLayer: Layer;
        public currentLayer: Layer;
        public boot(): void;
        public createCanvasLayer(state?: State, name?: string, size?: number): Layer;
        public createDOMLayer(state?: State, name?: string, size?: number): Layer;
        private create(type, state?, name?, size?);
        public remove(layer: Layer): void;
        public update(): bool;
        public render(): bool;
        public removeStateLayers(): void;
        public removeAll(): void;
    }
}
module Kiwi.Geom {
    class Point {
        constructor(x?: number, y?: number);
        public x: number;
        public y: number;
        public add(point: Point): Point;
        public addTo(x?: number, y?: number): Point;
        public subtractFrom(x?: number, y?: number): Point;
        public invert(): Point;
        public clamp(min: number, max: number): Point;
        public clampX(min: number, max: number): Point;
        public clampY(min: number, max: number): Point;
        public clone(output?: Point): Point;
        public copyFrom(source: Point): Point;
        public copyTo(target: Point): Point;
        public distanceTo(target: Point, round?: bool): number;
        static distanceBetween(pointA: Point, pointB: Point, round?: bool): number;
        public distanceCompare(target: Point, distance: number): bool;
        public equals(toCompare: Point): bool;
        public interpolate(pointA, pointB, f): void;
        public offset(dx: number, dy: number): Point;
        public polar(length, angle): void;
        public setTo(x: number, y: number): Point;
        public subtract(point: Point, output?: Point): Point;
        public getCSS(): string;
        public toString(): string;
    }
}
module Kiwi.Geom {
    class Rectangle {
        constructor(x?: number, y?: number, width?: number, height?: number);
        public x: number;
        public y: number;
        public width: number;
        public height: number;
        public bottom(value?: number): number;
        public bottomRight(value?: Point, output?: Point): Point;
        public left(value?: number): number;
        public right(value?: number): number;
        public size(output?: Point): Point;
        public volume(): number;
        public perimeter(): number;
        public top(value?: number): number;
        public topLeft(value?: Point, output?: Point): Point;
        public clone(output?: Rectangle): Rectangle;
        public contains(x: number, y: number): bool;
        public containsPoint(point: Point): bool;
        public containsRect(rect: Rectangle): bool;
        public copyFrom(source: Rectangle): Rectangle;
        public copyTo(target: Rectangle): Rectangle;
        public equals(toCompare: Rectangle): bool;
        public inflate(dx: number, dy: number): Rectangle;
        public inflatePoint(point: Point): Rectangle;
        public intersection(toIntersect: Rectangle, output?: Rectangle): Rectangle;
        public intersects(toIntersect: Rectangle): bool;
        public overlap(rect: Rectangle): any;
        public isEmpty(): bool;
        public offset(dx: number, dy: number): Rectangle;
        public offsetPoint(point: Point): Rectangle;
        public setEmpty(): Rectangle;
        public setTo(x: number, y: number, width: number, height: number): Rectangle;
        public union(toUnion: Rectangle, output?: Rectangle): Rectangle;
        public toString(): string;
    }
}
module Kiwi {
    class Stage {
        constructor(game: Game, name: string, defaultType: number);
        private _game;
        public name: string;
        public domReady: bool;
        public defaultType: number;
        public container: HTMLDivElement;
        public layers: HTMLDivElement;
        public input: HTMLDivElement;
        public position: Components.Position;
        public size: Components.Size;
        public boot(dom: DOM.Bootstrap): void;
        public setSize(width: number, height: number): void;
        public width(value?: number): number;
        public height(value?: number): number;
        private _framerate;
        public frameRate(value?: number): number;
    }
}
module Kiwi.Tweens {
    class Manager {
        constructor(game: Game);
        private _game;
        private _tweens;
        public getAll(): Tween[];
        public removeAll(): void;
        public create(object): Tween;
        public add(tween: Tween): Tween;
        public remove(tween: Tween): void;
        public update(): bool;
    }
}
module Kiwi.Utils {
    class RandomDataGenerator {
        constructor(seeds?: string[]);
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
module Kiwi.Utils {
    class RequestAnimationFrame {
        constructor(callback);
        private _callback;
        public setCallback(callback): void;
        private _timeOutID;
        private _isSetTimeOut;
        public isUsingSetTimeOut(): bool;
        public isUsingRAF(): bool;
        public lastTime: number;
        public currentTime: number;
        public isRunning: bool;
        public start(callback?): void;
        public stop(): void;
        public RAFUpdate(): void;
        public SetTimeoutUpdate(): void;
    }
}
module Kiwi {
    class Game {
        constructor(domParent?: string, defaultType?: number, name?: string, state?: any);
        private _dom;
        public id: number;
        public cache: Cache;
        public input: Input.Manager;
        public layers: LayerManager;
        public loader: Loader;
        public raf: Utils.RequestAnimationFrame;
        public stage: Stage;
        public states: StateManager;
        public time: Time.Manager;
        public tweens: Tweens.Manager;
        public rnd: Utils.RandomDataGenerator;
        private start();
        private loop();
    }
}
module Kiwi {
    class Component {
        constructor(name: string, supportsCanvas?: bool, supportsDOM?: bool, supportsWebGL?: bool);
        private _supportsCanvas;
        private _supportsDOM;
        private _supportsWebGL;
        public game: Game;
        public name: string;
        public supportsType(type: number): bool;
        public supportsCanvas(): bool;
        public supportsDOM(): bool;
        public supportsWebGL(): bool;
        public dirty: bool;
    }
}
module Kiwi.Components {
    class Color extends Component {
        constructor(red?: number, green?: number, blue?: number, alpha?: number);
        private _red;
        private _green;
        private _blue;
        private _alpha;
        private _skipUpdate;
        public updated: Signal;
        public cssColorHex: string;
        public cssColorRGB: string;
        public cssColorRGBA: string;
        public addStyleUpdates(entity: Entity): void;
        public addStyleImmediately(entity: Entity): void;
        private _processUpdate();
        public setRGBA(red?: number, green?: number, blue?: number, alpha?: number): void;
        public setColor(value: number): void;
        public red(value?: number): number;
        public green(value?: number): number;
        public blue(value?: number): number;
        public alpha(value?: number): number;
        public setRandomColor(min?: number, max?: number, alpha?: number): void;
        private _colorToHexstring(color);
    }
}
module Kiwi.Components {
    class Position extends Component {
        constructor(x?: number, y?: number, z?: number);
        private _point;
        private _z;
        public cssTranslate3d: string;
        public cssLeft: string;
        public cssTop: string;
        public updated: Signal;
        public autoRound: bool;
        public addStyleUpdates(entity: Entity): void;
        public addStyleImmediately(entity: Entity): void;
        private _processUpdate();
        public x(value?: number): number;
        public y(value?: number): number;
        public z(value?: number): number;
        public addTo(x?: number, y?: number, z?: number): void;
        public subtractFrom(x?: number, y?: number, z?: number): void;
        public equals(x: number, y: number): bool;
        public setTo(x: number, y: number, z?: number): void;
        public setPositionFromPoint(point: Geom.Point): void;
        public getPositionAsPoint(output?: Geom.Point): Geom.Point;
        public toString(): string;
    }
}
module Kiwi.Utils {
    class GameMath {
        private static RADTODEG;
        private static DEGTORAD;
        static chanceRoll(chance?: number): bool;
        static maxAdd(value: number, amount: number, max: number): number;
        static minSub(value: number, amount: number, min: number): number;
        static wrapValue(value: number, amount: number, max: number): number;
        static randomSign(): number;
        static isOdd(n: number): bool;
        static isEven(n: number): bool;
        static wrapAngle(angle: number): number;
        static angleLimit(angle: number, min: number, max: number): number;
        static asDegrees(radians: number): number;
        static asRadians(degrees: number): number;
        static Linear(p0, p1, t);
        static Bernstein(n, i): number;
        static Factorial(n): number;
        static CatmullRom(p0, p1, p2, p3, t);
    }
}
module Kiwi.Components {
    class Rotation extends Component {
        constructor(angle?: number);
        private _angleRadians;
        private _angleDegrees;
        public angle(value?: number): number;
        public radians(value?: number): number;
        public rotateClockwise(value: number): void;
        public rotateCounterClockwise(value: number): void;
        public pointUp(): void;
        public pointDown(): void;
        public pointLeft(): void;
        public pointRight(): void;
        public toString(): string;
    }
}
module Kiwi.Components {
    class Scale extends Component {
        constructor(x?: number, y?: number);
        private _x;
        private _y;
        public x(value?: number): number;
        public y(value?: number): number;
        public setTo(x: number, y: number): void;
        public invert(): void;
        public setScaleFromPoint(point: Geom.Point): void;
        public getScaleAsPoint(output?: Geom.Point): Geom.Point;
        public toString(): string;
    }
}
module Kiwi.Components {
    class Size extends Component {
        constructor(width?: number, height?: number);
        public updated: Signal;
        private _width;
        private _height;
        public aspectRatio: number;
        public width(value?: number): number;
        public height(value?: number): number;
        private _processUpdate();
        public setTo(width: number, height: number): void;
        public setCSS(element: HTMLElement): HTMLElement;
        public toString(): string;
    }
}
module Kiwi.Components {
    class Texture extends Component {
        constructor(cacheID: string, cache: Cache);
        private _repeat;
        public file: File;
        public image;
        public updatedRepeat: Signal;
        public position: Position;
        public size: Size;
        public cacheID: string;
        static REPEAT_NONE: string;
        static REPEAT_X: string;
        static REPEAT_Y: string;
        static REPEAT_BOTH: string;
        public repeat(value?: string): string;
        public getURL(): string;
        public toString(): string;
    }
}
module Kiwi.Components.GameMath {
    class SinewaveGenerator extends Component {
        constructor(length?: number, sinAmplitude?: number, cosAmplitude?: number, frequency?: number);
        public cosTable: number[];
        public sinTable: number[];
        public create(length: number, sinAmplitude?: number, cosAmplitude?: number, frequency?: number): number[];
    }
}
module Kiwi {
    class Group {
        constructor(name?: string);
        public game: Game;
        public state: State;
        public id: string;
        public name: string;
        public type: number;
        public members: Entity[];
        public layer: Layer;
        public domElement: DOM.Element;
        private _cssStack;
        public numChildren(): number;
        public dirty(value: bool): void;
        public addChild(child: Entity): Entity;
        public addChildAt(child: Entity, index: number): Entity;
        public getChildAt(index: number): Entity;
        public getChildByName(name: string): Entity;
        public getChildByID(id: string): Entity;
        public getChildIndex(child: Entity): number;
        public removeChild(child: Entity): Entity;
        public removeChildAt(index: number): Entity;
        public removeChildren(begin?: number, end?: number): number;
        public setChildIndex(child: Entity, index: number): bool;
        public swapChildren(child1: Entity, child2: Entity): bool;
        public swapChildrenAt(index1: number, index2: number): bool;
        public replaceChild(oldChild: Entity, newChild: Entity): bool;
        public forEach(context, callback, ...params: any[]): void;
        public update(): void;
        public processUpdate(child: Entity): void;
        public render(): void;
        public processRender(child: Entity): void;
        public removeFirstAlive(): Entity;
        public getFirstAlive(): Entity;
        public getFirstDead(): Entity;
        public countLiving(): number;
        public countDead(): number;
        public getRandom(start?: number, length?: number): Entity;
        public clear(): void;
        private _exists;
        public exists(value?: bool): bool;
        private _active;
        public active(value?: bool): bool;
        private _visible;
        public visible(value?: bool): bool;
        public isGroup(): bool;
        public _addedToLayer(layer: Layer): bool;
        public _removedFromLayer(layer: Layer): void;
        public _addedToState(state: State): void;
        public _removedFromState(state: State): void;
    }
}
module Kiwi {
    class Loader {
        constructor(game: Game);
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
        public init(progress?: any, complete?: any, calculateBytes?: bool): void;
        public addImage(cacheID: string, url: string, cache?: FileCache): void;
        public addAudio(cacheID: string, url: string, cache?: FileCache): void;
        public addJSON(cacheID: string, url: string, cache?: FileCache): void;
        public addXML(cacheID: string, url: string, cache?: FileCache): void;
        public addBinaryFile(cacheID: string, url: string, cache?: FileCache): void;
        public addTextFile(cacheID: string, url: string, cache?: FileCache): void;
        public addCustomFile(file: File, cache?: FileCache): void;
        public startLoad(): void;
        private getNextFileSize();
        private addToBytesTotal(file);
        private nextFile();
        private fileLoadProgress(file);
        private fileLoadComplete(file);
        public getBytesLoaded(): number;
        public getPercentLoaded(): number;
        public calculateBytes(value?: bool): bool;
        public complete(): bool;
    }
}
module Kiwi {
    class SignalBinding {
        constructor(signal: Signal, listener, isOnce: bool, listenerContext, priority?: number);
        private _listener;
        private _isOnce;
        public context;
        private _signal;
        public priority: number;
        public active: bool;
        public params;
        public execute(paramsArr?: any[]);
        public detach();
        public isBound(): bool;
        public isOnce(): bool;
        public getListener();
        public getSignal(): Signal;
        public _destroy(): void;
        public toString(): string;
    }
}
module Kiwi {
    class Signal {
        private _bindings;
        private _prevParams;
        static VERSION: string;
        public memorize: bool;
        private _shouldPropagate;
        public active: bool;
        public validateListener(listener, fnName): void;
        private _registerListener(listener, isOnce, listenerContext, priority);
        private _addBinding(binding);
        private _indexOfListener(listener, context);
        public has(listener, context?: any): bool;
        public add(listener, listenerContext?: any, priority?: number): SignalBinding;
        public addOnce(listener, listenerContext?: any, priority?: number): SignalBinding;
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
module Kiwi {
    class StateManager {
        constructor(game: Game);
        private _game;
        private _states;
        public current: State;
        private checkKeyExists(key);
        private checkValidState(state);
        public addState(state: any, switchTo?: bool): bool;
        public boot(): void;
        private setCurrentState(key);
        public switchState(key: string, state?: any): bool;
        private getState(key);
        private checkPreload();
        private onLoadProgress(percent, bytesLoaded, file);
        private onLoadComplete();
        public update(): void;
    }
}
module Kiwi.DOM {
    class Element {
        constructor(id: string, cache: Cache, type?: string);
        private _cache;
        public id: string;
        public available: bool;
        public element: HTMLElement;
        public type: string;
        public entity;
        public link(entity): Element;
        public unlink(): void;
    }
}
module Kiwi.GameObjects.DOM {
    class Button extends Entity {
        constructor(text: string, x?: number, y?: number);
        public button: HTMLButtonElement;
        public position: Components.Position;
        private _tempText;
        private _transformCSS;
        private _updatePosition(x, y);
        public _addedToLayer(layer: Layer): bool;
    }
}
module Kiwi.GameObjects {
    class Pixel extends Entity {
        constructor(x?: number, y?: number, color?: number, size?: number);
        public position: Components.Position;
        public color: Components.Color;
        public _addedToLayer(layer: Layer): bool;
        private _pixelSize;
        private _updatePosition(x, y, z, cssTranslate3d, cssLeft, cssTop);
        private _updateColor();
        public update(): void;
        public render(): void;
    }
}
module Kiwi.GameObjects {
    class StaticImage extends Entity {
        constructor(cacheID: string, cache: Cache, x?: number, y?: number);
        public position: Components.Position;
        public texture: Components.Texture;
        public size: Components.Size;
        private _transformCSS;
        private _updatePosition(x, y, z);
        private _updateTexturePosition(x, y);
        private _updateRepeat(value);
        public _addedToLayer(layer: Layer): bool;
        public render(): void;
    }
}
module Kiwi.Geom {
    class Circle {
        constructor(x?: number, y?: number, diameter?: number);
        private _diameter;
        private _radius;
        public x: number;
        public y: number;
        public diameter(value?: number): number;
        public radius(value?: number): number;
        public circumference(): number;
        public bottom(value?: number): number;
        public left(value?: number): number;
        public right(value?: number): number;
        public top(value?: number): number;
        public area(): number;
        public isEmpty(): bool;
        public clone(output?: Circle): Circle;
        public copyFrom(source: Circle): Circle;
        public copyTo(target: Circle): Circle;
        public distanceTo(target: any, round?: bool): number;
        public equals(toCompare: Circle): bool;
        public intersects(toIntersect: Circle): bool;
        public circumferencePoint(angle: number, asDegrees?: bool, output?: Point): Point;
        public offset(dx: number, dy: number): Circle;
        public offsetPoint(point: Point): Circle;
        public setTo(x: number, y: number, diameter: number): Circle;
        public toString(): string;
    }
}
module Kiwi.Geom {
    class IntersectResult {
        public result: bool;
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
module Kiwi.Geom {
    class Line {
        constructor(x1?: number, y1?: number, x2?: number, y2?: number);
        public x1: number;
        public y1: number;
        public x2: number;
        public y2: number;
        public clone(output?: Line): Line;
        public copyFrom(source: Line): Line;
        public copyTo(target: Line): Line;
        public setTo(x1?: number, y1?: number, x2?: number, y2?: number): Line;
        public length(): number;
        public getY(x: number): number;
        public angle(): number;
        public slope(): number;
        public perpSlope(): number;
        public yIntercept(): number;
        public isPointOnLine(x: number, y: number): bool;
        public isPointOnLineSegment(x: number, y: number): bool;
        public intersectLineLine(line): any;
        public perp(x: number, y: number, output?: Line): Line;
        public toString(): string;
    }
}
module Kiwi.Input {
    class Finger {
        constructor(game: Game);
        private _game;
        public identifier: number;
        public active: bool;
        public point: Geom.Point;
        public circle: Geom.Circle;
        public withinGame: bool;
        public clientX: number;
        public clientY: number;
        public pageX: number;
        public pageY: number;
        public screenX: number;
        public screenY: number;
        public x: number;
        public y: number;
        public target;
        public isDown: bool;
        public isUp: bool;
        public timeDown: number;
        public duration: number;
        public timeUp: number;
        public justPressedRate: number;
        public justReleasedRate: number;
        public start(event): void;
        public move(event): void;
        public leave(event): void;
        public stop(event): void;
        public justPressed(duration?: number): bool;
        public justReleased(duration?: number): bool;
        public toString(): string;
    }
}
module Kiwi.Input {
    class Key {
        constructor(manager: Keyboard, keycode: number, event?: KeyboardEvent);
        private _manager;
        public keyCode: number;
        public isDown: bool;
        public isUp: bool;
        public altKey: bool;
        public ctrlKey: bool;
        public shiftKey: bool;
        public timeDown: number;
        public duration: number;
        public timeUp: number;
        public repeats: number;
        public update(event: KeyboardEvent): void;
        public justPressed(duration?: number): bool;
        public justReleased(duration?: number): bool;
    }
}
module Kiwi.Input {
    class Keyboard {
        constructor(game: Game);
        public game: Game;
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
        public addKey(keycode: number): Key;
        public justPressed(key): void;
        public justReleased(key): void;
        public isDown(keycode: number): bool;
        public isUp(keycode: number): bool;
        public reset(): void;
    }
}
module Kiwi.Input {
    class Keycodes {
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
module Kiwi.Input {
    class Mouse {
        constructor(game: Game);
        private _game;
        private _domElement;
        public point: Geom.Point;
        public justPressedRate: number;
        public justReleasedRate: number;
        public x: number;
        public y: number;
        public screenX: number;
        public screenY: number;
        public clientX: number;
        public clientY: number;
        public wheelDeltaX: number;
        public wheelDeltaY: number;
        public ctrlKey: bool;
        public shiftKey: bool;
        public altKey: bool;
        public button: number;
        static LEFT_BUTTON: number;
        static MIDDLE_BUTTON: number;
        static RIGHT_BUTTON: number;
        public isDown: bool;
        public isUp: bool;
        public timeDown: number;
        public duration: number;
        public timeUp: number;
        public boot(): void;
        public update(): void;
        public start(): void;
        public stop(): void;
        public onMouseDown(event: MouseEvent): void;
        public onMouseMove(event: MouseEvent): void;
        public onMouseUp(event: MouseEvent): void;
        public onMouseWheel(event: WheelEvent): void;
        public justPressed(duration?: number): bool;
        public justReleased(duration?: number): bool;
        public reset(): void;
    }
}
module Kiwi.Input {
    class Manager {
        constructor(game: Game);
        public game: Game;
        public mouse: Mouse;
        public keyboard: Keyboard;
        public touch: Touch;
        public boot(): void;
        public update(): void;
        public reset(): void;
    }
}
module Kiwi.Input {
    class Touch {
        constructor(game: Game);
        private _game;
        private _domElement;
        private _fingers;
        public finger1: Finger;
        public finger2: Finger;
        public finger3: Finger;
        public finger4: Finger;
        public finger5: Finger;
        public finger6: Finger;
        public finger7: Finger;
        public finger8: Finger;
        public finger9: Finger;
        public finger10: Finger;
        public latestFinger: Finger;
        public boot(): void;
        public start(): void;
        private consumeTouchMove(event);
        public x(): void;
        public y(): void;
        private onTouchStart(event);
        private onTouchCancel(event);
        private onTouchEnter(event);
        private onTouchLeave(event);
        private onTouchMove(event);
        private onTouchEnd(event);
        public calculateDistance(finger1: Finger, finger2: Finger): void;
        public calculateAngle(finger1: Finger, finger2: Finger): void;
        public checkOverlap(finger1: Finger, finger2: Finger): void;
        public update(): void;
        public stop(): void;
        public reset(): void;
    }
}
module Kiwi.Time {
    class TimerEvent {
        constructor(type: number, callback);
        static TIMER_START: number;
        static TIMER_COUNT: number;
        static TIMER_STOP: number;
        private _callback;
        public type: number;
        public run(): void;
    }
}
module Kiwi.Time {
    class Timer {
        constructor(name: string, clock: Clock, delay: number, repeatCount?: number);
        private _currentCount;
        public currentCount(): number;
        private _startEvents;
        private _countEvents;
        private _stopEvents;
        private _clock;
        private _timeLastCount;
        private _isRunning;
        public isRunning(): bool;
        private _isStopped;
        public isStopped(): bool;
        private _isPaused;
        public isPaused(): bool;
        public name: string;
        public delay: number;
        public repeatCount: number;
        private processEvents(type);
        public update(): void;
        public start(): Timer;
        public stop(): Timer;
        public pause(): Timer;
        public resume(): Timer;
        public addTimerEvent(event: TimerEvent): TimerEvent;
        public createTimerEvent(type: number, callback): TimerEvent;
        public removeTimerEvent(event: TimerEvent): bool;
        public clear(type?: number): void;
        public toString(): string;
    }
}
module Kiwi.Time {
    class MasterClock {
        constructor();
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
module Kiwi.Time {
    class Clock {
        constructor(manager: Manager, name: string, units?: number);
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
        public isRunning(): bool;
        private _isStopped;
        public isStopped(): bool;
        private _isPaused;
        public isPaused(): bool;
        private _elapsedState;
        public manager: Manager;
        public master: MasterClock;
        public name: string;
        public units: number;
        public addTimer(timer: Timer): Clock;
        public createTimer(name: string, delay: number, repeatCount: number): Timer;
        public removeTimer(timer?: Timer, timerName?: string): bool;
        public checkExists(name: string): bool;
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
module Kiwi.Time {
    class Manager {
        constructor(game: Game);
        private _game;
        private _clocks;
        public master: MasterClock;
        public boot(): void;
        public addClock(name: string, units?: number): Clock;
        public getClock(name: string): Clock;
        public update(): void;
        public now(): number;
        public delta(): number;
    }
}
module Kiwi.Tweens.Easing {
    class Back {
        static In(k): number;
        static Out(k): number;
        static InOut(k): number;
    }
}
module Kiwi.Tweens.Easing {
    class Bounce {
        static In(k): number;
        static Out(k): number;
        static InOut(k): number;
    }
}
module Kiwi.Tweens.Easing {
    class Circular {
        static In(k): number;
        static Out(k): number;
        static InOut(k): number;
    }
}
module Kiwi.Tweens.Easing {
    class Cubic {
        static In(k): number;
        static Out(k): number;
        static InOut(k): number;
    }
}
module Kiwi.Tweens.Easing {
    class Elastic {
        static In(k): number;
        static Out(k): number;
        static InOut(k): number;
    }
}
module Kiwi.Tweens.Easing {
    class Exponential {
        static In(k): number;
        static Out(k): number;
        static InOut(k): number;
    }
}
module Kiwi.Tweens.Easing {
    class Linear {
        static None(k);
    }
}
module Kiwi.Tweens.Easing {
    class Quadratic {
        static In(k): number;
        static Out(k): number;
        static InOut(k): number;
    }
}
module Kiwi.Tweens.Easing {
    class Quartic {
        static In(k): number;
        static Out(k): number;
        static InOut(k): number;
    }
}
module Kiwi.Tweens.Easing {
    class Quintic {
        static In(k): number;
        static Out(k): number;
        static InOut(k): number;
    }
}
module Kiwi.Tweens.Easing {
    class Sinusoidal {
        static In(k): number;
        static Out(k): number;
        static InOut(k): number;
    }
}
module Kiwi {
    class Tween {
        constructor(object, game?: Game);
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
        private _onStartCallbackFired;
        private _onUpdateCallback;
        private _onCompleteCallback;
        public to(properties, duration?: number, ease?: any, autoStart?: bool): Tween;
        public start(): Tween;
        public stop(): Tween;
        public setParent(value: Game): void;
        public delay(amount): Tween;
        public easing(easing): Tween;
        public interpolation(interpolation): Tween;
        public chain(tween: Tween): Tween;
        public onStart(callback): Tween;
        public onUpdate(callback): Tween;
        public onComplete(callback): Tween;
        public debugValue;
        public update(time): bool;
    }
}
module Kiwi.Utils {
    class Interpolation {
        static Linear(v, k);
        static Bezier(v, k): number;
        static CatmullRom(v, k);
    }
}
module Kiwi {
    var VERSION: string;
    var TYPE_UNASSIGNED: number;
    var TYPE_CANVAS: number;
    var TYPE_DOM: number;
    var TYPE_WEBGL: number;
    var DEVICE: Device;
    class GameManager {
        private static _games;
        static register(game: Game): number;
        static total(): number;
    }
}
var klog;
