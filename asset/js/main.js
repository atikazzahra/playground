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

/***/ "./node_modules/compute-cosine-similarity/lib/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/compute-cosine-similarity/lib/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// MODULES //\n\nvar dot = __webpack_require__( /*! compute-dot */ \"./node_modules/compute-dot/lib/index.js\" ),\n\tl2norm = __webpack_require__( /*! compute-l2norm */ \"./node_modules/compute-l2norm/lib/index.js\" ),\n\tisArray = __webpack_require__( /*! validate.io-array */ \"./node_modules/validate.io-array/lib/index.js\" ),\n\tisFunction = __webpack_require__( /*! validate.io-function */ \"./node_modules/validate.io-function/lib/index.js\" );\n\n\n// FUNCTIONS //\n\n/**\n * FUNCTION: partial( fn, j )\n *\tPartially applied function from the right.\n *\n * @private\n * @param {Function} fn - input function\n * @param {Number} j - array index\n * @returns {Function} partially applied function\n */\nfunction partial( fn, j ) {\n\treturn function accessor( d, i ) {\n\t\treturn fn( d, i, j );\n\t};\n} // end FUNCTION partial()\n\n\n// COSINE SIMILARITY //\n\n/**\n* FUNCTION: similarity( x, y[, accessor] )\n*\tComputes the cosine similarity between two arrays.\n*\n* @param {Number[]|Array} x - input array\n* @param {Number[]|Array} y - input array\n* @param {Function} [accessor] - accessor function for accessing array values\n* @returns {Number|Null} cosine similarity or null\n*/\nfunction similarity( x, y, clbk ) {\n\tvar a, b, c;\n\tif ( !isArray( x ) ) {\n\t\tthrow new TypeError( 'cosine-similarity()::invalid input argument. First argument must be an array. Value: `' + x + '`.' );\n\t}\n\tif ( !isArray( y ) ) {\n\t\tthrow new TypeError( 'cosine-similarity()::invalid input argument. Second argument must be an array. Value: `' + y + '`.' );\n\t}\n\tif ( arguments.length > 2 ) {\n\t\tif ( !isFunction( clbk ) ) {\n\t\t\tthrow new TypeError( 'cosine-similarity()::invalid input argument. Accessor must be a function. Value: `' + clbk + '`.' );\n\t\t}\n\t}\n\tif ( x.length !== y.length ) {\n\t\tthrow new Error( 'cosine-similarity()::invalid input argument. Input arrays must have the same length.' );\n\t}\n\tif ( !x.length ) {\n\t\treturn null;\n\t}\n\tif ( clbk ) {\n\t\ta = dot( x, y, clbk );\n\t\tb = l2norm( x, partial( clbk, 0 ) );\n\t\tc = l2norm( y, partial( clbk, 1 ) );\n\t} else {\n\t\ta = dot( x, y );\n\t\tb = l2norm( x );\n\t\tc = l2norm( y );\n\t}\n\treturn a / ( b*c );\n} // end FUNCTION similarity()\n\n\n// EXPORTS //\n\nmodule.exports = similarity;\n\n\n//# sourceURL=webpack:///./node_modules/compute-cosine-similarity/lib/index.js?");

/***/ }),

/***/ "./node_modules/compute-dot/lib/index.js":
/*!***********************************************!*\
  !*** ./node_modules/compute-dot/lib/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// MODULES //\n\nvar isArray = __webpack_require__( /*! validate.io-array */ \"./node_modules/validate.io-array/lib/index.js\" ),\n\tisFunction = __webpack_require__( /*! validate.io-function */ \"./node_modules/validate.io-function/lib/index.js\" );\n\n\n// DOT PRODUCT //\n\n/**\n* FUNCTION: dot( x, y[, accessor] )\n*\tComputes the dot product between two arrays.\n*\n* @param {Array} x - input array\n* @param {Array} y - input array\n* @param {Function} [accessor] - accessor function for accessing array values\n* @returns {Number|Null} dot product\n*/\nfunction dot( x, y, clbk ) {\n\tif ( !isArray( x ) ) {\n\t\tthrow new TypeError( 'dot()::invalid input argument. First argument must be an array. Value: `' + x + '`.' );\n\t}\n\tif ( !isArray( y ) ) {\n\t\tthrow new TypeError( 'dot()::invalid input argument. Second argument must be an array. Value: `' + y + '`.' );\n\t}\n\tif ( arguments.length > 2 ) {\n\t\tif ( !isFunction( clbk ) ) {\n\t\t\tthrow new TypeError( 'dot()::invalid input argument. Accessor must be a function. Value: `' + clbk + '`.' );\n\t\t}\n\t}\n\tvar len = x.length,\n\t\tsum = 0,\n\t\ti;\n\n\tif ( len !== y.length ) {\n\t\tthrow new Error( 'dot()::invalid input argument. Arrays must be of equal length.' );\n\t}\n\tif ( !len ) {\n\t\treturn null;\n\t}\n\tif ( clbk ) {\n\t\tfor ( i = 0; i < len; i++ ) {\n\t\t\tsum += clbk( x[ i ], i, 0 ) * clbk( y[ i ], i, 1 );\n\t\t}\n\t} else {\n\t\tfor ( i = 0; i < len; i++ ) {\n\t\t\tsum += x[ i ] * y[ i ];\n\t\t}\n\t}\n\treturn sum;\n} // end FUNCTION dot()\n\n\n// EXPORTS //\n\nmodule.exports = dot;\n\n\n//# sourceURL=webpack:///./node_modules/compute-dot/lib/index.js?");

/***/ }),

/***/ "./node_modules/compute-l2norm/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/compute-l2norm/lib/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// MODULES //\n\nvar isArray = __webpack_require__( /*! validate.io-array */ \"./node_modules/validate.io-array/lib/index.js\" ),\n\tisFunction = __webpack_require__( /*! validate.io-function */ \"./node_modules/validate.io-function/lib/index.js\" );\n\n\n// L2NORM //\n\n/**\n* FUNCTION: l2norm( arr[, accessor] )\n*\tCalculates the L2 norm (Euclidean norm) of an array.\n*\n* @param {Array} arr - input array\n* @param {Function} [accessor] - accessor function for accessing array values\n* @returns {Number|Null} L2 norm or null\n*/\nfunction l2norm( arr, clbk ) {\n\tif ( !isArray( arr ) ) {\n\t\tthrow new TypeError( 'l2norm()::invalid input argument. Must provide an array.  Value: `' + arr + '`.' );\n\t}\n\tif ( arguments.length > 1 ) {\n\t\tif ( !isFunction( clbk ) ) {\n\t\t\tthrow new TypeError( 'l2norm()::invalid input argument. Accessor must be a function. Value: `' + clbk + '`.' );\n\t\t}\n\t}\n\tvar len = arr.length,\n\t\tt = 0,\n\t\ts = 1,\n\t\tr,\n\t\tval,\n\t\tabs,\n\t\ti;\n\n\tif ( !len ) {\n\t\treturn null;\n\t}\n\tif ( clbk ) {\n\t\tfor ( i = 0; i < len; i++ ) {\n\t\t\tval = clbk( arr[ i ], i );\n\t\t\tabs = ( val < 0 ) ? -val : val;\n\t\t\tif ( abs > 0 ) {\n\t\t\t\tif ( abs > t ) {\n\t\t\t\t\tr = t / val;\n\t\t\t\t\ts = 1 + s*r*r;\n\t\t\t\t\tt = abs;\n\t\t\t\t} else {\n\t\t\t\t\tr = val / t;\n\t\t\t\t\ts = s + r*r;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t} else {\n\t\tfor ( i = 0; i < len; i++ ) {\n\t\t\tval = arr[ i ];\n\t\t\tabs = ( val < 0 ) ? -val : val;\n\t\t\tif ( abs > 0 ) {\n\t\t\t\tif ( abs > t ) {\n\t\t\t\t\tr = t / val;\n\t\t\t\t\ts = 1 + s*r*r;\n\t\t\t\t\tt = abs;\n\t\t\t\t} else {\n\t\t\t\t\tr = val / t;\n\t\t\t\t\ts = s + r*r;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\treturn t * Math.sqrt( s );\n} // end FUNCTION l2norm()\n\n\n// EXPORTS //\n\nmodule.exports = l2norm;\n\n\n//# sourceURL=webpack:///./node_modules/compute-l2norm/lib/index.js?");

/***/ }),

/***/ "./node_modules/validate.io-array/lib/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/validate.io-array/lib/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n* FUNCTION: isArray( value )\n*\tValidates if a value is an array.\n*\n* @param {*} value - value to be validated\n* @returns {Boolean} boolean indicating whether value is an array\n*/\nfunction isArray( value ) {\n\treturn Object.prototype.toString.call( value ) === '[object Array]';\n} // end FUNCTION isArray()\n\n// EXPORTS //\n\nmodule.exports = Array.isArray || isArray;\n\n\n//# sourceURL=webpack:///./node_modules/validate.io-array/lib/index.js?");

/***/ }),

/***/ "./node_modules/validate.io-function/lib/index.js":
/*!********************************************************!*\
  !*** ./node_modules/validate.io-function/lib/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n*\n*\tVALIDATE: function\n*\n*\n*\tDESCRIPTION:\n*\t\t- Validates if a value is a function.\n*\n*\n*\tNOTES:\n*\t\t[1]\n*\n*\n*\tTODO:\n*\t\t[1]\n*\n*\n*\tLICENSE:\n*\t\tMIT\n*\n*\tCopyright (c) 2014. Athan Reines.\n*\n*\n*\tAUTHOR:\n*\t\tAthan Reines. kgryte@gmail.com. 2014.\n*\n*/\n\n\n\n/**\n* FUNCTION: isFunction( value )\n*\tValidates if a value is a function.\n*\n* @param {*} value - value to be validated\n* @returns {Boolean} boolean indicating whether value is a function\n*/\nfunction isFunction( value ) {\n\treturn ( typeof value === 'function' );\n} // end FUNCTION isFunction()\n\n\n// EXPORTS //\n\nmodule.exports = isFunction;\n\n\n//# sourceURL=webpack:///./node_modules/validate.io-function/lib/index.js?");

/***/ }),

/***/ "./src/ImageTracker.js":
/*!*****************************!*\
  !*** ./src/ImageTracker.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ImageTracker; });\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nvar similarity = __webpack_require__(/*! compute-cosine-similarity */ \"./node_modules/compute-cosine-similarity/lib/index.js\");\n\nvar ImageTracker =\n/*#__PURE__*/\nfunction (_tracking$Tracker) {\n  _inherits(ImageTracker, _tracking$Tracker);\n\n  function ImageTracker() {\n    var _this;\n\n    _classCallCheck(this, ImageTracker);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(ImageTracker).call(this));\n    _this.templateKeypoints_ = null;\n    _this.fastThreshold = 60;\n    _this.blur = 3;\n    return _this;\n  }\n\n  _createClass(ImageTracker, [{\n    key: \"setTemplate\",\n    value: function setTemplate(keypoints, descriptor) {\n      this.templateKeypoints_ = keypoints;\n      this.templateDescriptors_ = descriptor;\n    }\n  }, {\n    key: \"track\",\n    value: function track(pixels, width, height) {\n      var blur = tracking.Image.blur(pixels, width, height, this.blur);\n      var grayscale = tracking.Image.grayscale(blur, width, height);\n      var keypoints = tracking.Fast.findCorners(grayscale, width, height, this.fastThreshold);\n      this.emit('track', {\n        corners: keypoints,\n        match: this.getSimilarity(this.templateKeypoints_, keypoints)\n      });\n    }\n  }, {\n    key: \"getSimilarity\",\n    value: function getSimilarity(templateKP, trackedKP) {\n      if (trackedKP.length < 120) {\n        return false;\n      }\n\n      var maxLength = templateKP.length >= trackedKP.length ? trackedKP.length : templateKP.length;\n      var slicedTemplateKP = templateKP.slice(0, maxLength);\n      var slicedTrackedKP = trackedKP.slice(0, maxLength);\n      var cosineSimilarity = similarity(slicedTemplateKP, slicedTrackedKP);\n      console.log(cosineSimilarity);\n      var distance = 2 * (1 - cosineSimilarity);\n      console.log(Math.sqrt(distance));\n      return Math.sqrt(distance) >= 0.5;\n    }\n  }]);\n\n  return ImageTracker;\n}(tracking.Tracker);\n\n\n\n//# sourceURL=webpack:///./src/ImageTracker.js?");

/***/ }),

/***/ "./src/Polaroid.js":
/*!*************************!*\
  !*** ./src/Polaroid.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Polaroid; });\n/* harmony import */ var _ImageTracker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ImageTracker.js */ \"./src/ImageTracker.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar Polaroid =\n/*#__PURE__*/\nfunction () {\n  function Polaroid() {\n    _classCallCheck(this, Polaroid);\n\n    this.video = document.getElementById('video');\n    this.canvas = document.getElementById('canvas');\n    this.action = document.getElementById('action');\n    this.gif = document.getElementById('ghost');\n    this.loading = document.getElementById('loading');\n    this.context = canvas.getContext('2d');\n    this.tracker = new _ImageTracker_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    this.camera = true;\n    this.videoSrc = '';\n    this.trackerTask = null;\n    this.match = 0;\n    this.showCorners = false;\n    this.template = {};\n  }\n\n  _createClass(Polaroid, [{\n    key: \"run\",\n    value: function run() {\n      var _this = this;\n\n      this.initTracker();\n      this.startTracking();\n\n      if (this.video.readyState === 4) {\n        this.loading.remove();\n        this.trackerTask.run();\n        this.initActionListener();\n      } else {\n        this.video.onloadeddata = function () {\n          _this.loading.remove();\n\n          _this.trackerTask.run();\n\n          _this.initActionListener();\n        };\n      }\n    }\n  }, {\n    key: \"initTracker\",\n    value: function initTracker() {\n      var _this2 = this;\n\n      this.tracker.templateKeypoints_ = this.template;\n      this.tracker.on('track', function (event) {\n        _this2.requestFrame(event);\n\n        _this2.isImageDetected(event.match);\n      });\n    }\n  }, {\n    key: \"startTracking\",\n    value: function startTracking() {\n      var options = {};\n\n      if (this.camera) {\n        options = {\n          camera: this.camera,\n          mediaConstraints: {\n            video: {\n              width: {\n                exact: 300\n              },\n              height: {\n                exact: 300\n              }\n            }\n          }\n        };\n      } else {\n        this.video.setAttribute('src', this.videoSrc);\n      }\n\n      this.trackerTask = tracking.track('#video', this.tracker, options);\n      this.trackerTask.stop();\n    }\n  }, {\n    key: \"initActionListener\",\n    value: function initActionListener() {\n      var _this3 = this;\n\n      this.action.onclick = function () {\n        var onPause = _this3.action.classList.contains('onpause');\n\n        var onPlay = _this3.action.classList.contains('onplay');\n\n        if (onPause) {\n          _this3.trackerTask.run();\n\n          _this3.action.classList.remove('onpause');\n\n          _this3.action.classList.add('onplay');\n        } else if (onPlay) {\n          _this3.trackerTask.stop();\n\n          _this3.action.classList.remove('onplay');\n\n          _this3.action.classList.add('onpause');\n        }\n      };\n    }\n  }, {\n    key: \"isImageDetected\",\n    value: function isImageDetected(match) {\n      if (match) {\n        this.gif.classList.remove('hide');\n      } else {\n        this.gif.classList.add('hide');\n      }\n    }\n  }, {\n    key: \"requestFrame\",\n    value: function requestFrame(event) {\n      var _this4 = this;\n\n      window.requestAnimationFrame(function () {\n        _this4.context.clearRect(0, 0, _this4.canvas.width, _this4.canvas.height);\n\n        try {\n          _this4.context.drawImage(_this4.video, 0, 0, _this4.video.width, _this4.video.height);\n\n          if (_this4.showCorners && event.match) {\n            for (var i = 0; i < event.corners.length; i += 2) {\n              _this4.context.fillStyle = '#0f0';\n\n              _this4.context.fillRect(event.corners[i], event.corners[i + 1], 3, 3);\n            }\n          }\n        } catch (err) {}\n      });\n    }\n  }]);\n\n  return Polaroid;\n}();\n\n\n\n//# sourceURL=webpack:///./src/Polaroid.js?");

/***/ }),

/***/ "./src/corners.json":
/*!**************************!*\
  !*** ./src/corners.json ***!
  \**************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, default */
/***/ (function(module) {

eval("module.exports = [263,25,269,25,270,29,226,46,242,49,194,51,187,53,257,54,268,54,177,55,216,55,257,55,269,55,181,56,215,56,155,57,156,58,243,58,261,58,243,59,261,59,160,60,261,60,261,63,82,64,261,64,141,65,141,66,24,71,166,71,281,72,285,72,111,73,282,73,111,74,212,74,198,77,198,78,261,78,202,79,197,81,290,82,55,86,139,87,166,87,120,88,139,88,150,88,120,89,142,89,142,90,113,91,125,91,134,91,8,92,125,92,134,92,115,93,115,94,87,95,87,96,191,96,87,97,223,98,88,101,101,101,148,101,165,101,88,102,148,102,165,102,154,104,87,106,86,107,86,108,110,114,110,115,81,117,82,118,239,119,239,120,61,122,63,123,67,123,38,124,46,124,57,124,66,124,38,125,44,125,57,125,66,125,39,126,73,126,42,127,72,127,21,128,28,128,34,128,62,128,72,128,20,129,24,129,28,129,34,129,62,129,72,129,8,130,21,130,25,130,35,130,51,130,72,130,5,131,25,131,51,131,5,132,25,132,37,132,52,132,169,132,200,132,25,133,32,133,38,133,118,133,168,133,118,134,157,134,181,134,118,135,157,135,182,135,67,137,72,137,126,137,59,138,66,138,72,138,126,138,53,139,59,139,126,139,28,141,28,142,32,142,202,217,202,218,259,223,259,224,259,225,173,226];\n\n//# sourceURL=webpack:///./src/corners.json?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Polaroid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Polaroid.js */ \"./src/Polaroid.js\");\n/* harmony import */ var _corners_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./corners.json */ \"./src/corners.json\");\nvar _corners_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./corners.json */ \"./src/corners.json\", 1);\n\n\n\nwindow.onload = function () {\n  var manager = new _Polaroid_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  manager.template = _corners_json__WEBPACK_IMPORTED_MODULE_1__;\n  manager.showCorners = true; // manager.camera = false\n  // manager.videoSrc = 'asset/video/trial.mp4'\n\n  manager.run();\n};\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });