/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/three/build/three.module.js":
/*!**************************************************!*\
  !*** ./node_modules/three/build/three.module.js ***!
  \**************************************************/
/*! exports provided: ACESFilmicToneMapping, AddEquation, AddOperation, AdditiveAnimationBlendMode, AdditiveBlending, AlphaFormat, AlwaysDepth, AlwaysStencilFunc, AmbientLight, AmbientLightProbe, AnimationClip, AnimationLoader, AnimationMixer, AnimationObjectGroup, AnimationUtils, ArcCurve, ArrayCamera, ArrowHelper, Audio, AudioAnalyser, AudioContext, AudioListener, AudioLoader, AxesHelper, AxisHelper, BackSide, BasicDepthPacking, BasicShadowMap, BinaryTextureLoader, Bone, BooleanKeyframeTrack, BoundingBoxHelper, Box2, Box3, Box3Helper, BoxBufferGeometry, BoxGeometry, BoxHelper, BufferAttribute, BufferGeometry, BufferGeometryLoader, ByteType, Cache, Camera, CameraHelper, CanvasRenderer, CanvasTexture, CatmullRomCurve3, CineonToneMapping, CircleBufferGeometry, CircleGeometry, ClampToEdgeWrapping, Clock, Color, ColorKeyframeTrack, CompressedTexture, CompressedTextureLoader, ConeBufferGeometry, ConeGeometry, CubeCamera, CubeReflectionMapping, CubeRefractionMapping, CubeTexture, CubeTextureLoader, CubeUVReflectionMapping, CubeUVRefractionMapping, CubicBezierCurve, CubicBezierCurve3, CubicInterpolant, CullFaceBack, CullFaceFront, CullFaceFrontBack, CullFaceNone, Curve, CurvePath, CustomBlending, CustomToneMapping, CylinderBufferGeometry, CylinderGeometry, Cylindrical, DataTexture, DataTexture2DArray, DataTexture3D, DataTextureLoader, DataUtils, DecrementStencilOp, DecrementWrapStencilOp, DefaultLoadingManager, DepthFormat, DepthStencilFormat, DepthTexture, DirectionalLight, DirectionalLightHelper, DiscreteInterpolant, DodecahedronBufferGeometry, DodecahedronGeometry, DoubleSide, DstAlphaFactor, DstColorFactor, DynamicBufferAttribute, DynamicCopyUsage, DynamicDrawUsage, DynamicReadUsage, EdgesGeometry, EdgesHelper, EllipseCurve, EqualDepth, EqualStencilFunc, EquirectangularReflectionMapping, EquirectangularRefractionMapping, Euler, EventDispatcher, ExtrudeBufferGeometry, ExtrudeGeometry, FaceColors, FileLoader, FlatShading, Float16BufferAttribute, Float32Attribute, Float32BufferAttribute, Float64Attribute, Float64BufferAttribute, FloatType, Fog, FogExp2, Font, FontLoader, FrontSide, Frustum, GLBufferAttribute, GLSL1, GLSL3, GammaEncoding, GreaterDepth, GreaterEqualDepth, GreaterEqualStencilFunc, GreaterStencilFunc, GridHelper, Group, HalfFloatType, HemisphereLight, HemisphereLightHelper, HemisphereLightProbe, IcosahedronBufferGeometry, IcosahedronGeometry, ImageBitmapLoader, ImageLoader, ImageUtils, ImmediateRenderObject, IncrementStencilOp, IncrementWrapStencilOp, InstancedBufferAttribute, InstancedBufferGeometry, InstancedInterleavedBuffer, InstancedMesh, Int16Attribute, Int16BufferAttribute, Int32Attribute, Int32BufferAttribute, Int8Attribute, Int8BufferAttribute, IntType, InterleavedBuffer, InterleavedBufferAttribute, Interpolant, InterpolateDiscrete, InterpolateLinear, InterpolateSmooth, InvertStencilOp, JSONLoader, KeepStencilOp, KeyframeTrack, LOD, LatheBufferGeometry, LatheGeometry, Layers, LensFlare, LessDepth, LessEqualDepth, LessEqualStencilFunc, LessStencilFunc, Light, LightProbe, Line, Line3, LineBasicMaterial, LineCurve, LineCurve3, LineDashedMaterial, LineLoop, LinePieces, LineSegments, LineStrip, LinearEncoding, LinearFilter, LinearInterpolant, LinearMipMapLinearFilter, LinearMipMapNearestFilter, LinearMipmapLinearFilter, LinearMipmapNearestFilter, LinearToneMapping, Loader, LoaderUtils, LoadingManager, LogLuvEncoding, LoopOnce, LoopPingPong, LoopRepeat, LuminanceAlphaFormat, LuminanceFormat, MOUSE, Material, MaterialLoader, Math, MathUtils, Matrix3, Matrix4, MaxEquation, Mesh, MeshBasicMaterial, MeshDepthMaterial, MeshDistanceMaterial, MeshFaceMaterial, MeshLambertMaterial, MeshMatcapMaterial, MeshNormalMaterial, MeshPhongMaterial, MeshPhysicalMaterial, MeshStandardMaterial, MeshToonMaterial, MinEquation, MirroredRepeatWrapping, MixOperation, MultiMaterial, MultiplyBlending, MultiplyOperation, NearestFilter, NearestMipMapLinearFilter, NearestMipMapNearestFilter, NearestMipmapLinearFilter, NearestMipmapNearestFilter, NeverDepth, NeverStencilFunc, NoBlending, NoColors, NoToneMapping, NormalAnimationBlendMode, NormalBlending, NotEqualDepth, NotEqualStencilFunc, NumberKeyframeTrack, Object3D, ObjectLoader, ObjectSpaceNormalMap, OctahedronBufferGeometry, OctahedronGeometry, OneFactor, OneMinusDstAlphaFactor, OneMinusDstColorFactor, OneMinusSrcAlphaFactor, OneMinusSrcColorFactor, OrthographicCamera, PCFShadowMap, PCFSoftShadowMap, PMREMGenerator, ParametricBufferGeometry, ParametricGeometry, Particle, ParticleBasicMaterial, ParticleSystem, ParticleSystemMaterial, Path, PerspectiveCamera, Plane, PlaneBufferGeometry, PlaneGeometry, PlaneHelper, PointCloud, PointCloudMaterial, PointLight, PointLightHelper, Points, PointsMaterial, PolarGridHelper, PolyhedronBufferGeometry, PolyhedronGeometry, PositionalAudio, PropertyBinding, PropertyMixer, QuadraticBezierCurve, QuadraticBezierCurve3, Quaternion, QuaternionKeyframeTrack, QuaternionLinearInterpolant, REVISION, RGBADepthPacking, RGBAFormat, RGBAIntegerFormat, RGBA_ASTC_10x10_Format, RGBA_ASTC_10x5_Format, RGBA_ASTC_10x6_Format, RGBA_ASTC_10x8_Format, RGBA_ASTC_12x10_Format, RGBA_ASTC_12x12_Format, RGBA_ASTC_4x4_Format, RGBA_ASTC_5x4_Format, RGBA_ASTC_5x5_Format, RGBA_ASTC_6x5_Format, RGBA_ASTC_6x6_Format, RGBA_ASTC_8x5_Format, RGBA_ASTC_8x6_Format, RGBA_ASTC_8x8_Format, RGBA_BPTC_Format, RGBA_ETC2_EAC_Format, RGBA_PVRTC_2BPPV1_Format, RGBA_PVRTC_4BPPV1_Format, RGBA_S3TC_DXT1_Format, RGBA_S3TC_DXT3_Format, RGBA_S3TC_DXT5_Format, RGBDEncoding, RGBEEncoding, RGBEFormat, RGBFormat, RGBIntegerFormat, RGBM16Encoding, RGBM7Encoding, RGB_ETC1_Format, RGB_ETC2_Format, RGB_PVRTC_2BPPV1_Format, RGB_PVRTC_4BPPV1_Format, RGB_S3TC_DXT1_Format, RGFormat, RGIntegerFormat, RawShaderMaterial, Ray, Raycaster, RectAreaLight, RedFormat, RedIntegerFormat, ReinhardToneMapping, RepeatWrapping, ReplaceStencilOp, ReverseSubtractEquation, RingBufferGeometry, RingGeometry, SRGB8_ALPHA8_ASTC_10x10_Format, SRGB8_ALPHA8_ASTC_10x5_Format, SRGB8_ALPHA8_ASTC_10x6_Format, SRGB8_ALPHA8_ASTC_10x8_Format, SRGB8_ALPHA8_ASTC_12x10_Format, SRGB8_ALPHA8_ASTC_12x12_Format, SRGB8_ALPHA8_ASTC_4x4_Format, SRGB8_ALPHA8_ASTC_5x4_Format, SRGB8_ALPHA8_ASTC_5x5_Format, SRGB8_ALPHA8_ASTC_6x5_Format, SRGB8_ALPHA8_ASTC_6x6_Format, SRGB8_ALPHA8_ASTC_8x5_Format, SRGB8_ALPHA8_ASTC_8x6_Format, SRGB8_ALPHA8_ASTC_8x8_Format, Scene, SceneUtils, ShaderChunk, ShaderLib, ShaderMaterial, ShadowMaterial, Shape, ShapeBufferGeometry, ShapeGeometry, ShapePath, ShapeUtils, ShortType, Skeleton, SkeletonHelper, SkinnedMesh, SmoothShading, Sphere, SphereBufferGeometry, SphereGeometry, Spherical, SphericalHarmonics3, SplineCurve, SpotLight, SpotLightHelper, Sprite, SpriteMaterial, SrcAlphaFactor, SrcAlphaSaturateFactor, SrcColorFactor, StaticCopyUsage, StaticDrawUsage, StaticReadUsage, StereoCamera, StreamCopyUsage, StreamDrawUsage, StreamReadUsage, StringKeyframeTrack, SubtractEquation, SubtractiveBlending, TOUCH, TangentSpaceNormalMap, TetrahedronBufferGeometry, TetrahedronGeometry, TextBufferGeometry, TextGeometry, Texture, TextureLoader, TorusBufferGeometry, TorusGeometry, TorusKnotBufferGeometry, TorusKnotGeometry, Triangle, TriangleFanDrawMode, TriangleStripDrawMode, TrianglesDrawMode, TubeBufferGeometry, TubeGeometry, UVMapping, Uint16Attribute, Uint16BufferAttribute, Uint32Attribute, Uint32BufferAttribute, Uint8Attribute, Uint8BufferAttribute, Uint8ClampedAttribute, Uint8ClampedBufferAttribute, Uniform, UniformsLib, UniformsUtils, UnsignedByteType, UnsignedInt248Type, UnsignedIntType, UnsignedShort4444Type, UnsignedShort5551Type, UnsignedShort565Type, UnsignedShortType, VSMShadowMap, Vector2, Vector3, Vector4, VectorKeyframeTrack, Vertex, VertexColors, VideoTexture, WebGL1Renderer, WebGLCubeRenderTarget, WebGLMultipleRenderTargets, WebGLMultisampleRenderTarget, WebGLRenderTarget, WebGLRenderTargetCube, WebGLRenderer, WebGLUtils, WireframeGeometry, WireframeHelper, WrapAroundEnding, XHRLoader, ZeroCurvatureEnding, ZeroFactor, ZeroSlopeEnding, ZeroStencilOp, sRGBEncoding */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/***/ }),

/***/ "./src/cloud.js":
/*!**********************!*\
  !*** ./src/cloud.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Cloud; });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\r\n\r\nclass Cloud {\r\n  constructor(element) {\r\n    this.element = element;\r\n    this.width = element.clientWidth;\r\n    this.height = element.clientHeight;\r\n\r\n    // Scene\r\n    this.scene = new three__WEBPACK_IMPORTED_MODULE_0__[\"Scene\"]();\r\n    this.scene.background = new three__WEBPACK_IMPORTED_MODULE_0__[\"Color\"](\"#ffffff\");\r\n\r\n    // Camera\r\n    this.camera = new three__WEBPACK_IMPORTED_MODULE_0__[\"PerspectiveCamera\"](\r\n      40,\r\n      this.width / this.height,\r\n      0.1,\r\n      1000\r\n    );\r\n    this.camera.position.z = 16;\r\n\r\n    // Renderer\r\n    this.renderer = new three__WEBPACK_IMPORTED_MODULE_0__[\"WebGLRenderer\"]({ antialias: true });\r\n    this.renderer.setSize(this.width, this.height);\r\n    element.appendChild(this.renderer.domElement);\r\n\r\n    // Lights\r\n    this.lights = {\r\n      ambient: new three__WEBPACK_IMPORTED_MODULE_0__[\"AmbientLight\"](0xffffff, 0.8),\r\n      dir: new three__WEBPACK_IMPORTED_MODULE_0__[\"DirectionalLight\"](0xffffff, 0.2),\r\n    };\r\n    this.scene.add(this.lights.ambient);\r\n    this.scene.add(this.lights.dir);\r\n    this.lights.dir.position.set(1, 1, 1);\r\n\r\n    // Nodes\r\n    this.nodes = Cloud.createNodes(20);\r\n    this.scene.add(this.nodes);\r\n\r\n    this.mouseRotation = new MouseRotation(this.element, this.nodes);\r\n  }\r\n\r\n  update() {\r\n    this.mouseRotation.update();\r\n  }\r\n\r\n  render() {\r\n    this.camera.lookAt(this.scene.position);\r\n    this.renderer.render(this.scene, this.camera);\r\n  }\r\n\r\n  static calcFibonacciSpherePoints(samples, radius = 1) {\r\n    let points = [];\r\n    let phi = Math.PI * (3 - Math.sqrt(5));\r\n    for (let i = 0; i < samples; i++) {\r\n      let y = 1 - (i / (samples - 1)) * 2;\r\n      let r = Math.sqrt(1 - y * y);\r\n      let theta = phi * i;\r\n\r\n      let x = Math.cos(theta) * r;\r\n      let z = Math.sin(theta) * r;\r\n\r\n      points.push([x * radius, y * radius, z * radius]);\r\n    }\r\n    return points;\r\n  }\r\n\r\n  static createNodeMesh(palette) {\r\n    const color = palette[Math.floor(Math.random() * palette.length)];\r\n    const geometry = new three__WEBPACK_IMPORTED_MODULE_0__[\"SphereGeometry\"](0.5, 40, 40);\r\n    const material = new three__WEBPACK_IMPORTED_MODULE_0__[\"MeshPhongMaterial\"]({ color: color });\r\n    const mesh = new three__WEBPACK_IMPORTED_MODULE_0__[\"Mesh\"](geometry, material);\r\n    return mesh;\r\n  }\r\n\r\n  static createNodes(nodes, radius = 5) {\r\n    const group = new three__WEBPACK_IMPORTED_MODULE_0__[\"Group\"]();\r\n    const palette = [0x5fb250, 0xe47e71, 0xcccc00, 0x00a3b4];\r\n    for (const point of this.calcFibonacciSpherePoints(nodes, radius)) {\r\n      const nodeMesh = this.createNodeMesh(palette);\r\n      nodeMesh.position.set(point[0], point[1], point[2]);\r\n      group.add(nodeMesh);\r\n    }\r\n    group.rotation.z = Math.PI / 2;\r\n    return group;\r\n  }\r\n}\r\n\r\nclass MouseRotation {\r\n  constructor(element, object) {\r\n    this.element = element;\r\n    this.object = object;\r\n\r\n    this.pointerHolding = false;\r\n    this.slowingDown = false;\r\n\r\n    this.slowDownFactor = 0.97;\r\n    this.moveSpeedFactor = 0.0001;\r\n    this.moveSpeedMax = 400;\r\n    this.moveSpeedMin = 3;\r\n\r\n    this.vectorX = 0;\r\n    this.vectorY = 0.7;\r\n\r\n    document.addEventListener(\"pointermove\", (e) => this.onPointerMove(e));\r\n    document.addEventListener(\"pointerdown\", (e) => this.onPointerDown(e));\r\n    document.addEventListener(\"pointerup\", (e) => this.onPointerUp(e));\r\n  }\r\n\r\n  update() {\r\n    if (Math.abs(this.vectorY) > this.moveSpeedMax)\r\n      this.vectorY = Math.sign(this.vectorY) * this.moveSpeedMax;\r\n    if (Math.abs(this.vectorX) > this.moveSpeedMax)\r\n      this.vectorX = Math.sign(this.vectorX) * this.moveSpeedMax;\r\n\r\n    if (this.pointerHolding) {\r\n      this.object.rotateOnWorldAxis(\r\n        new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, 1, 0),\r\n        this.vectorY * this.moveSpeedFactor\r\n      );\r\n      this.object.rotateOnWorldAxis(\r\n        new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](1, 0, 0),\r\n        this.vectorX * this.moveSpeedFactor\r\n      );\r\n    } else {\r\n      this.object.rotateOnWorldAxis(\r\n        new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, 1, 0),\r\n        this.vectorY * this.moveSpeedFactor\r\n      );\r\n      this.object.rotateOnWorldAxis(\r\n        new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](1, 0, 0),\r\n        this.vectorX * this.moveSpeedFactor\r\n      );\r\n\r\n      // Slowing down\r\n      if (this.slowingDown) {\r\n        this.vectorY *= this.slowDownFactor;\r\n        if (Math.abs(this.vectorY) < this.moveSpeedMin) this.vectorY = 0;\r\n\r\n        this.vectorX *= this.slowDownFactor;\r\n        if (Math.abs(this.vectorX) < this.moveSpeedMin) this.vectorX = 0;\r\n      }\r\n    }\r\n  }\r\n\r\n  onPointerMove(e) {\r\n    if (this.pointerHolding) {\r\n      this.vectorY += e.movementX;\r\n      this.vectorX += e.movementY;\r\n    }\r\n  }\r\n\r\n  onPointerDown(e) {\r\n    this.vectorY = 0;\r\n    this.vectorX = 0;\r\n    this.pointerHolding = true;\r\n  }\r\n\r\n  onPointerUp(e) {\r\n    this.pointerHolding = false;\r\n    this.slowingDown = true;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/cloud.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cloud__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cloud */ \"./src/cloud.js\");\n\r\n\r\nconst cloud = new _cloud__WEBPACK_IMPORTED_MODULE_0__[\"default\"](document.getElementById(\"cloud\"));\r\nfunction animate() {\r\n  requestAnimationFrame(animate);\r\n  cloud.update();\r\n  cloud.render();\r\n}\r\nanimate();\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });