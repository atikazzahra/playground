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

/***/ "./src/ImageTracker.js":
/*!*****************************!*\
  !*** ./src/ImageTracker.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ImageTracker; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar ImageTracker =\n/*#__PURE__*/\nfunction () {\n  function ImageTracker() {\n    _classCallCheck(this, ImageTracker);\n\n    this.templateImage = null;\n    this.predictedImage = null;\n    this.blurRadius = 5;\n    this.width = 300;\n    this.height = 300;\n    this.matchesThreshold = 15;\n    this.errorThreshold = 40;\n  }\n\n  _createClass(ImageTracker, [{\n    key: \"doMatch\",\n    value: function doMatch() {\n      var templateTrackData = this.trackImage(this.templateImage);\n      var predictedTrackData = this.trackImage(this.predictedImage);\n      var matches = tracking.Brief.reciprocalMatch(templateTrackData.keypoints, templateTrackData.descriptor, predictedTrackData.keypoints, predictedTrackData.descriptor);\n      return {\n        template: templateTrackData,\n        predicted: predictedTrackData,\n        matches: matches,\n        result: this.isMatch(matches)\n      };\n    }\n  }, {\n    key: \"isMatch\",\n    value: function isMatch(matches) {\n      if (matches.length <= this.matchesThreshold) {\n        return false;\n      }\n\n      var RMSE = this.getRMSE(matches);\n      return RMSE.result <= this.errorThreshold && RMSE.result > 0 ? true : false;\n    }\n  }, {\n    key: \"getRMSE\",\n    value: function getRMSE(matches) {\n      var _this = this;\n\n      var normTemplateKP = matches.map(function (x) {\n        return _this.normalizeVector(x.keypoint1, 300);\n      });\n      var normPredictedKP = matches.map(function (x) {\n        return _this.normalizeVector(x.keypoint2, 300);\n      });\n      var sumSquaredErrors = 0;\n\n      for (var i = 0; i < normPredictedKP.length; i++) {\n        var x = normPredictedKP[i][1] - normTemplateKP[i][1];\n        var y = normPredictedKP[i][0] - normTemplateKP[i][0];\n        var eucledianDistance = Math.sqrt(x * x + y * y);\n        sumSquaredErrors = sumSquaredErrors + Math.pow(eucledianDistance, 2);\n      }\n\n      var result = normPredictedKP.length ? Math.sqrt(sumSquaredErrors / normPredictedKP.length) : -1;\n      return {\n        normTemplateKP: normTemplateKP,\n        normPredictedKP: normPredictedKP,\n        result: result\n      };\n    }\n  }, {\n    key: \"normalizeVector\",\n    value: function normalizeVector(point, scale) {\n      var norm = Math.sqrt(point[0] * point[0] + point[1] * point[1]);\n\n      if (norm != 0) {\n        var x = scale * point[0] / norm;\n        var y = scale * point[1] / norm;\n        return [x, y];\n      }\n\n      return [0, 0];\n    }\n  }, {\n    key: \"trackImage\",\n    value: function trackImage(context) {\n      var imageData = context.getImageData(0, 0, this.width, this.height);\n      var imageBlur = tracking.Image.blur(imageData.data, this.width, this.height, this.blurRadius);\n      var imageGray = tracking.Image.grayscale(imageBlur, this.width, this.height);\n      var keypoints = tracking.Fast.findCorners(imageGray, this.width, this.height);\n      var templateDescriptor = tracking.Brief.getDescriptors(imageGray, this.width, keypoints);\n      return {\n        keypoints: keypoints,\n        descriptor: templateDescriptor\n      };\n    }\n  }]);\n\n  return ImageTracker;\n}();\n\n\n\n//# sourceURL=webpack:///./src/ImageTracker.js?");

/***/ }),

/***/ "./src/Polaroid.js":
/*!*************************!*\
  !*** ./src/Polaroid.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Polaroid2; });\n/* harmony import */ var _ImageTracker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ImageTracker.js */ \"./src/ImageTracker.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar Polaroid2 =\n/*#__PURE__*/\nfunction () {\n  function Polaroid2() {\n    _classCallCheck(this, Polaroid2);\n\n    this.tracker = new _ImageTracker_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    this.video = document.getElementById('video');\n    this.videoCanvas = document.getElementById('canvas');\n    this.template = document.getElementById('template');\n    this.templateCanvas = document.getElementById('canvas-template');\n    this.videoCtx = this.videoCanvas.getContext('2d');\n    this.templateCtx = this.templateCanvas.getContext('2d');\n    this.error = document.getElementById('error');\n    this.action = document.getElementById('action');\n    this.gif = document.getElementById('ghost');\n    this.loading = document.getElementById('loading');\n    this.stopTracking = false;\n    this.camera = true;\n    this.videoSrc = '';\n    this.setTimeout = 0;\n    this.showPlot = false;\n  }\n\n  _createClass(Polaroid2, [{\n    key: \"run\",\n    value: function run() {\n      var _this = this;\n\n      if (this.camera) {\n        this.initCamera();\n      } else {\n        this.video.setAttribute('src', this.videoSrc);\n      }\n\n      if (this.video.readyState === 4) {\n        this.loading.remove();\n        this.initTracker();\n        this.requestFrame();\n        this.initActionListener();\n      } else {\n        this.video.onloadeddata = function () {\n          _this.loading.remove();\n\n          _this.initTracker();\n\n          _this.requestFrame();\n\n          _this.initActionListener();\n        };\n      }\n    }\n  }, {\n    key: \"initCamera\",\n    value: function initCamera() {\n      var _this2 = this;\n\n      var constraints = {\n        audio: false,\n        facingMode: {\n          exact: \"environment\"\n        },\n        video: {\n          width: 300,\n          height: 300\n        }\n      };\n      navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {\n        _this2.video.srcObject = mediaStream;\n\n        _this2.video.onloadedmetadata = function () {\n          video.play();\n        };\n      }).catch(function (e) {\n        _this2.loading.remove();\n\n        _this2.error.classList.remove('hide');\n      });\n    }\n  }, {\n    key: \"initTracker\",\n    value: function initTracker() {\n      this.templateCtx.drawImage(this.template, 0, 0, this.template.width, this.template.height);\n\n      try {\n        this.videoCtx.drawImage(this.video, 0, 0, this.video.width, this.video.height);\n      } catch (err) {}\n\n      this.tracker.templateImage = this.templateCtx;\n      this.tracker.predictedImage = this.videoCtx;\n    }\n  }, {\n    key: \"initActionListener\",\n    value: function initActionListener() {\n      var _this3 = this;\n\n      this.action.onclick = function () {\n        var onPause = _this3.action.classList.contains('onpause');\n\n        var onPlay = _this3.action.classList.contains('onplay');\n\n        if (onPause) {\n          _this3.stopTracking = false;\n\n          _this3.action.classList.remove('onpause');\n\n          _this3.action.classList.add('onplay');\n        } else if (onPlay) {\n          _this3.stopTracking = true;\n\n          _this3.action.classList.remove('onplay');\n\n          _this3.action.classList.add('onpause');\n        }\n      };\n    }\n  }, {\n    key: \"requestFrame\",\n    value: function requestFrame() {\n      var _this4 = this;\n\n      window.requestAnimationFrame(function () {\n        if (!_this4.stopTracking) {\n          _this4.videoCtx.clearRect(0, 0, _this4.videoCtx.width, _this4.videoCtx.height);\n\n          try {\n            _this4.videoCtx.drawImage(_this4.video, 0, 0, _this4.video.width, _this4.video.height);\n          } catch (err) {}\n\n          if (_this4.video.readyState === _this4.video.HAVE_ENOUGH_DATA) {\n            var resultMatch = _this4.tracker.doMatch();\n\n            _this4.isImageDetected(resultMatch.result);\n\n            if (_this4.showPlot) {\n              _this4.drawPlotPoints(resultMatch);\n            } // console.log(resultMatch.result)\n\n          }\n        }\n\n        _this4.requestFrame();\n      });\n    }\n  }, {\n    key: \"drawPlotPoints\",\n    value: function drawPlotPoints(result) {\n      for (var i = 0; i < result.matches.length; i++) {\n        this.videoCtx.fillStyle = '#0f0';\n        this.videoCtx.fillRect(result.matches[i].keypoint2[0], result.matches[i].keypoint2[1], 4, 4); // this.videoCtx.fillRect(resultMatch.MSE.normPredictedKP[i][0], resultMatch.MSE.normPredictedKP[i][1], 4, 4);\n\n        this.videoCtx.fillStyle = '#e91e63';\n        this.videoCtx.fillRect(result.matches[i].keypoint1[0], result.matches[i].keypoint1[1], 4, 4); // this.videoCtx.fillRect(resultMatch.MSE.normTemplateKP[i][0], resultMatch.MSE.normTemplateKP[i][1], 4, 4);\n      }\n    }\n  }, {\n    key: \"isImageDetected\",\n    value: function isImageDetected(match) {\n      var _this5 = this;\n\n      if (match) {\n        clearTimeout(this.setTimeout);\n        this.setTimeout = 0;\n        this.gif.classList.remove('hide');\n      } else {\n        if (!this.gif.classList.contains('hide') && !this.setTimeout) {\n          var timeout = setTimeout(function () {\n            // console.log('call pls')\n            _this5.gif.classList.add('hide');\n\n            _this5.setTimeout = 0;\n          }, 300);\n          this.setTimeout = timeout;\n        }\n      }\n    }\n  }]);\n\n  return Polaroid2;\n}();\n\n\n\n//# sourceURL=webpack:///./src/Polaroid.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Polaroid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Polaroid.js */ \"./src/Polaroid.js\");\n\n\nwindow.onload = function () {\n  var manager = new _Polaroid_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](); // manager.camera = false\n  // manager.videoSrc = 'asset/video/trial.mp4'\n\n  manager.run();\n};\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });