module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Component({
    externalClasses: ['inner-class'],
    properties: {
        src: String,
        custom_class: String,
        width: {
            type: String
        },
        height: {
            type: String,
            observer: function observer(newVal) {
                this.setData({
                    // eslint-disable-next-line radix
                    initOffset: (parseInt(newVal) - this.data.touch.baseHeight) / 2
                });
            }
        }
    },
    data: {
        isLoading: true,
        touch: {
            distance: 0,
            scale: 1,
            baseWidth: '50%',
            baseHeight: '50%',
            scaleWidth: null,
            scaleHeight: null
        },
        initOffset: 0
    },
    lifetimes: {
        attached: function attached() {
            this._resizeToWidth(this.properties.width, this.properties.height);
        }
    },
    methods: {
        touchstartCallback: function touchstartCallback(e) {
            // 单手指缩放开始，也不做任何处理
            if (e.touches.length !== 2) return;
            var xMove = e.touches[1].clientX - e.touches[0].clientX;
            var yMove = e.touches[1].clientY - e.touches[0].clientY;
            var distance = Math.sqrt(xMove * xMove + yMove * yMove);
            this.setData({
                'touch.distance': distance
            });
        },
        touchmoveCallback: function touchmoveCallback(e) {
            var windowHeight = wx.getSystemInfoSync().windowHeight;
            var imgY = (windowHeight - this.data.touch.scaleHeight) / 2;
            var touch = this.data.touch;
            // 单手指缩放我们不做任何操作
            if (e.touches.length !== 2) return;
            var xMove = e.touches[1].clientX - e.touches[0].clientX;
            var yMove = e.touches[1].clientY - e.touches[0].clientY;
            // 新的 ditance
            var distance = Math.sqrt(xMove * xMove + yMove * yMove);
            var distanceDiff = distance - touch.distance;
            var newScale = touch.scale + 0.005 * distanceDiff;
            // 为了防止缩放得太大，所以scale需要限制，同理最小值也是
            if (newScale >= 2) {
                newScale = 2;
            }
            if (newScale <= 1) {
                newScale = 1;
            }
            var scaleWidth = newScale * touch.baseWidth;
            var scaleHeight = newScale * touch.baseHeight;
            // 赋值 新的 => 旧的
            this.setData({
                'touch.distance': distance,
                'touch.scale': newScale,
                'touch.scaleWidth': scaleWidth,
                'touch.scaleHeight': scaleHeight,
                'touch.diff': distanceDiff,
                initOffset: imgY
            });
        },
        bindload: function bindload(e) {
            if (this.data.src !== './assets/loading.gif') {
                this.setData({
                    isLoading: false
                });
            }
            var targetWidth = e.detail.width;
            var targetHeight = e.detail.height;
            this._resizeToWidth(targetWidth, targetHeight);
        },
        resize: function resize() {
            var targetWidth = this.data.touch.baseWidth;
            var targetHeight = this.data.touch.baseHeight;
            this._resizeToWidth(targetWidth, targetHeight);
        },
        _resizeToWidth: function _resizeToWidth(targetWidth, targetHeight) {
            var width = this.properties.width;
            var height = width * targetHeight / targetWidth;
            this.setData({
                'touch.baseWidth': width,
                'touch.baseHeight': height,
                'touch.scaleWidth': width,
                'touch.scaleHeight': height,
                initOffset: (this.properties.height - height) / 2
            });
        },
        _resizeToHeight: function _resizeToHeight(targetWidth, targetHeight) {
            var height = this.properties.height;
            var width = height * targetHeight / targetWidth;
            this.setData({
                'touch.baseWidth': width,
                'touch.baseHeight': height,
                'touch.scaleWidth': width,
                'touch.scaleHeight': height
            });
        }
    }
});

/***/ })
/******/ ]);
//# sourceMappingURL=scale-image.js.map