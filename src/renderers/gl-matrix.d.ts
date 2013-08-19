
interface glMath {
	invsqrt(number : number) : Float32Array;
}
declare var glMath : glMath;


interface mat2 {
	create(src ?: Float32Array) : Float32Array;
	createFrom(m00 : number, m01 : number, m10 : number, m11 : number) : Float32Array;
	set(mat : Float32Array, dest ?: Float32Array) : Float32Array;
	equal(a : Float32Array, b : Float32Array) : bool;
	identity(dest ?: Float32Array) : Float32Array;
	transpose(mat : Float32Array, dest ?: Float32Array) : Float32Array;
	determinant(mat : Float32Array) : number;
	inverse(mat : Float32Array, dest ?: Float32Array) : Float32Array;
	multiply(matA : Float32Array, matB : Float32Array, dest ?: Float32Array) : Float32Array;
	rotate(mat : Float32Array, angle : number, dest ?: Float32Array) : Float32Array;
	multiplyVec2(matrix : Float32Array, vec : Float32Array, dest ?: Float32Array) : Float32Array;
	scale(matrix : Float32Array, vec : Float32Array, dest ?: Float32Array) : Float32Array;
	str(mat : Float32Array) : string;
}
declare var mat2 : mat2;


interface mat3 {
	create(mat : Float32Array) : Float32Array;
	createFrom(m00 : number, m01 : number, m02 : number, m10 : number, m11 : number, m12 : number, m20 : number, m21 : number, m22 : number) : Float32Array;
	determinant(mat : Float32Array) : number;
	inverse(mat : Float32Array, dest ?: Float32Array) : Float32Array;
	multiply(mat : Float32Array, mat2 : Float32Array, dest ?: Float32Array) : Float32Array;
	multiplyVec2(matrix : Float32Array, vec : Float32Array, dest ?: Float32Array) : Float32Array;
	multiplyVec3(matrix : Float32Array, vec : Float32Array, dest ?: Float32Array) : Float32Array;
	set(mat : Float32Array, dest ?: Float32Array) : Float32Array;
	equal(a : Float32Array, b : Float32Array) : bool;
	identity(dest ?: Float32Array) : Float32Array;
	transpose(mat : Float32Array, dest ?: Float32Array) : Float32Array;
	toMat4(mat : Float32Array, dest ?: Float32Array) : Float32Array;
	str(mat : Float32Array) : string;
	toQuat4(mat : Float32Array, dest ?: Float32Array) : Float32Array;
}
declare var mat3 : mat3;


interface mat4 {
	create(mat : Float32Array) : Float32Array;
	createFrom(m00 : number, m01 : number, m02 : number, m03 : number, m10 : number, m11 : number, m12 : number, m13 : number, m20 : number, m21 : number, m22 : number, m23 : number, m30 : number, m31 : number, m32 : number, m33 : number) : Float32Array;
	set(mat : Float32Array, dest ?: Float32Array) : Float32Array;
	equal(a : Float32Array, b : Float32Array) : bool;
	identity(dest ?: Float32Array) : Float32Array;
	transpose(mat : Float32Array, dest ?: Float32Array) : Float32Array;
	determinant(mat : Float32Array) : number;
	inverse(mat : Float32Array, dest ?: Float32Array) : Float32Array;
	toRotationMat(mat : Float32Array, dest ?: Float32Array) : Float32Array;
	toMat3(mat : Float32Array, dest ?: Float32Array) : Float32Array;
	toInverseMat3(mat : Float32Array, dest ?: Float32Array) : Float32Array;
	multiply(mat : Float32Array, mat2 : Float32Array, dest ?: Float32Array) : Float32Array;
	multiplyVec3(mat : Float32Array, vec : Float32Array, dest ?: Float32Array) : Float32Array;
	multiplyVec4(mat : Float32Array, vec : Float32Array, dest ?: Float32Array) : Float32Array;
	translate(mat : Float32Array, vec : Float32Array, dest ?: Float32Array) : Float32Array;
	scale(mat : Float32Array, vec : Float32Array, dest ?: Float32Array) : Float32Array;
	rotate(mat : Float32Array, angle : number, axis : Float32Array, dest ?: Float32Array) : Float32Array;
	rotateX(mat : Float32Array, angle : number, dest ?: Float32Array) : Float32Array;
	rotateY(mat : Float32Array, angle : number, dest ?: Float32Array) : Float32Array;
	rotateZ(mat : Float32Array, angle : number, dest ?: Float32Array) : Float32Array;
	frustum(left : number, right : number, bottom : number, top : number, near : number, far : number, dest ?: Float32Array) : Float32Array;
	perspective(fovy : number, aspect : number, near : number, far : number, dest ?: Float32Array) : Float32Array;
	ortho(left : number, right : number, bottom : number, top : number, near : number, far : number, dest ?: Float32Array) : Float32Array;
	lookAt(eye : Float32Array, center : Float32Array, up : Float32Array, dest ?: Float32Array) : Float32Array;
	fromRotationTranslation(quat : Float32Array, vec : Float32Array, dest ?: Float32Array) : Float32Array;
	str(mat : Float32Array) : string;
}
declare var mat4 : mat4;


interface vec2 {
	create(vec : Float32Array) : Float32Array;
	createFrom(x : number, y : number) : Float32Array;
	add(vecA : Float32Array, vecB : Float32Array, dest ?: Float32Array) : Float32Array;
	subtract(vecA : Float32Array, vecB : Float32Array, dest ?: Float32Array) : Float32Array;
	multiply(vecA : Float32Array, vecB : Float32Array, dest ?: Float32Array) : Float32Array;
	divide(vecA : Float32Array, vecB : Float32Array, dest ?: Float32Array) : Float32Array;
	scale(vecA : Float32Array, scalar : number, dest ?: Float32Array) : Float32Array;
	dist(vecA : Float32Array, vecB : Float32Array) : number;
	set(vec : Float32Array, dest ?: Float32Array) : Float32Array;
	equal(a : Float32Array, b : Float32Array) : bool;
	negate(vec : Float32Array, dest ?: Float32Array) : Float32Array;
	normalize(vec : Float32Array, dest ?: Float32Array) : Float32Array;
	cross(vecA : Float32Array, vecB : Float32Array, dest ?: Float32Array) : Float32Array;
	length(vec : Float32Array) : number;
	squaredLength(vec : Float32Array) : number;
	dot(vecA : Float32Array, vecB : Float32Array) : number;
	direction(vecA : Float32Array, vecB : Float32Array, dest ?: Float32Array) : Float32Array;
	lerp(vecA : Float32Array, vecB : Float32Array, lerp : number, dest ?: Float32Array) : Float32Array;
	str(vec : Float32Array) : string;
}
declare var vec2 : vec2;


interface vec3 {
	create(vec : Float32Array) : Float32Array;
	createFrom(x : number, y : number, z : number) : Float32Array;
	set(vec : Float32Array, dest ?: Float32Array) : Float32Array;
	equal(a : Float32Array, b : Float32Array) : bool;
	add(vec : Float32Array, vec2 : Float32Array, dest ?: Float32Array) : Float32Array;
	subtract(vec : Float32Array, vec2 : Float32Array, dest ?: Float32Array) : Float32Array;
	multiply(vec : Float32Array, vec2 : Float32Array, dest ?: Float32Array) : Float32Array;
	negate(vec : Float32Array, dest ?: Float32Array) : Float32Array;
	scale(vec : Float32Array, val : number, dest ?: Float32Array) : Float32Array;
	normalize(vec : Float32Array, dest ?: Float32Array) : Float32Array;
	cross(vec : Float32Array, vec2 : Float32Array, dest ?: Float32Array) : Float32Array;
	length(vec : Float32Array) : number;
	squaredLength(vec : Float32Array) : number;
	dot(vec : Float32Array, vec2 : Float32Array) : number;
	direction(vec : Float32Array, vec2 : Float32Array, dest ?: Float32Array) : Float32Array;
	lerp(vec : Float32Array, vec2 : Float32Array, lerp : number, dest ?: Float32Array) : Float32Array;
	dist(vec : Float32Array, vec2 : Float32Array) : number;
	unproject(vec : Float32Array, view : Float32Array, proj : Float32Array, viewport : Float32Array, dest ?: Float32Array) : Float32Array;
	rotationTo(a : Float32Array, b : Float32Array, dest ?: Float32Array) : Float32Array;
	str(vec : Float32Array) : string;
}
declare var vec3 : vec3;


interface vec4 {
	create(vec : Float32Array) : Float32Array;
	createFrom(x : number, y : number, z : number, w : number) : Float32Array;
	add(vecA : Float32Array, vecB : Float32Array, dest ?: Float32Array) : Float32Array;
	subtract(vecA : Float32Array, vecB : Float32Array, dest ?: Float32Array) : Float32Array;
	multiply(vecA : Float32Array, vecB : Float32Array, dest ?: Float32Array) : Float32Array;
	divide(vecA : Float32Array, vecB : Float32Array, dest ?: Float32Array) : Float32Array;
	scale(vecA : Float32Array, scalar : number, dest ?: Float32Array) : Float32Array;
	set(vec : Float32Array, dest ?: Float32Array) : Float32Array;
	equal(a : Float32Array, b : Float32Array) : bool;
	negate(vec : Float32Array, dest ?: Float32Array) : Float32Array;
	length(vec : Float32Array) : number;
	squaredLength(vec : Float32Array) : number;
	lerp(vecA : Float32Array, vecB : Float32Array, lerp : number, dest ?: Float32Array) : Float32Array;
	str(vec : Float32Array) : string;
}
declare var vec4 : vec4;


interface quat4 {
	create(quat : Float32Array) : Float32Array;
	createFrom(x : number, y : number, z : number, w : number) : Float32Array;
	set(quat : Float32Array, dest ?: Float32Array) : Float32Array;
	equal(a : Float32Array, b : Float32Array) : bool;
	identity(dest ?: Float32Array) : Float32Array;
	calculateW(quat : Float32Array, dest ?: Float32Array) : Float32Array;
	dot(quat : Float32Array, quat2 : Float32Array) : number;
	inverse(quat : Float32Array, dest ?: Float32Array) : Float32Array;
	conjugate(quat : Float32Array, dest ?: Float32Array) : Float32Array;
	length(quat : Float32Array) : number;
	normalize(quat : Float32Array, dest ?: Float32Array) : Float32Array;
	add(quat : Float32Array, quat2 : Float32Array, dest ?: Float32Array) : Float32Array;
	multiply(quat : Float32Array, quat2 : Float32Array, dest ?: Float32Array) : Float32Array;
	multiplyVec3(quat : Float32Array, vec : Float32Array, dest ?: Float32Array) : Float32Array;
	scale(quat : Float32Array, val : number, dest ?: Float32Array) : Float32Array;
	toMat3(quat : Float32Array, dest ?: Float32Array) : Float32Array;
	toMat4(quat : Float32Array, dest ?: Float32Array) : Float32Array;
	slerp(quat : Float32Array, quat2 : Float32Array, slerp : number, dest ?: Float32Array) : Float32Array;
	fromRotationMatrix(mat : Float32Array, dest ?: Float32Array) : Float32Array;
	fromAxes(view : Float32Array, right : Float32Array, up : Float32Array, dest ?: Float32Array) : Float32Array;
	fromAngleAxis(angle : number, axis : Float32Array, dest ?: Float32Array) : Float32Array;
	toAngleAxis(src ?: Float32Array, dest ?: Float32Array) : Float32Array;
	str(quat : Float32Array) : string;
}
declare var quat4 : quat4;

