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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/DcoreSDK.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/DcoreSDK.ts":
/*!*************************!*\
  !*** ./src/DcoreSDK.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class DcoreSDK {
    getBalance(accountId) {
        return null;
    }
}
exports.DcoreSDK = DcoreSDK;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Rjb3JlU0RLLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM5REE7SUFFVyxVQUFVLENBQUMsU0FBc0I7UUFDcEMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQTJESjtBQS9ERCw0QkErREMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL0Rjb3JlU0RLLnRzXCIpO1xuIiwiaW1wb3J0IHsgQXNzZXRBbW91bnQgfSBmcm9tIFwiLi9tb2RlbHMvQXNzZXRBbW91bnRcIjtcbmltcG9ydCB7IENoYWluT2JqZWN0IH0gZnJvbSBcIi4vbW9kZWxzL0NoYWluT2JqZWN0XCI7XG5cbmltcG9ydCB7IENvbnRyYWN0QVBJIH0gZnJvbSBcIi4vQ29udHJhY3RBUElcIjtcblxuZXhwb3J0IGNsYXNzIERjb3JlU0RLIGltcGxlbWVudHMgQ29udHJhY3RBUEkge1xuXG4gICAgcHVibGljIGdldEJhbGFuY2UoYWNjb3VudElkOiBDaGFpbk9iamVjdCk6IFByb21pc2U8QXNzZXRBbW91bnRbXT4ge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QWNjb3VudEJ5TmFtZShuYW1lOiBzdHJpbmcpOiBQcm9taXNlPEFjY291bnQ+O1xuXG4gICAgLyoqXG4gICAgICogZ2V0IEFjY291bnQgb2JqZWN0IGJ5IGlkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYWNjb3VudElkIG9iamVjdCBpZCBvZiB0aGUgYWNjb3VudCwgMS4yLipcbiAgICAgKiBAcmV0dXJuIGFuIGFjY291bnQgaWYgZm91bmQsIE9iamVjdE5vdEZvdW5kRXhjZXB0aW9uIG90aGVyd2lzZVxuICAgICAqL1xuXG4gICAgcHVibGljIGdldEFjY291bnRCeUlkKGFjY291bnRJZDogQ2hhaW5PYmplY3QpOiBQcm9taXNlPEFjY291bnQ+O1xuXG4gICAgLyoqXG4gICAgICogc2VhcmNoIGFjY291bnQgaGlzdG9yeVxuICAgICAqXG4gICAgICogQHBhcmFtIGFjY291bnRJZCBvYmplY3QgaWQgb2YgdGhlIGFjY291bnQsIDEuMi4qXG4gICAgICogQHBhcmFtIG9yZGVyXG4gICAgICogQHBhcmFtIGZyb20gb2JqZWN0IGlkIG9mIHRoZSBoaXN0b3J5IG9iamVjdCB0byBzdGFydCBmcm9tLCB1c2UgMC4wLjAgdG8gaWdub3JlXG4gICAgICogQHBhcmFtIGxpbWl0IG51bWJlciBvZiBlbnRyaWVzLCBtYXggMTAwXG4gICAgICovXG5cbiAgICBwdWJsaWMgc2VhcmNoQWNjb3VudEhpc3RvcnkoXG4gICAgICAgIGFjY291bnRJZDogQ2hhaW5PYmplY3QsXG4gICAgICAgIG9yZGVyOiBTZWFyY2hBY2NvdW50SGlzdG9yeU9yZGVyID0gU2VhcmNoQWNjb3VudEhpc3RvcnlPcmRlci5USU1FX0RFU0MsXG4gICAgICAgIGZyb206IENoYWluT2JqZWN0ID0gQ2hhaW5PYmplY3QuTk9ORSxcbiAgICAgICAgbGltaXQ6IEludCA9IDEwMFxuICAgICk6IFByb21pc2U8VHJhbnNhY3Rpb25EZXRhaWxbXT47XG5cbiAgICAvKipcbiAgICAgKiBzZWFyY2ggY29uc3VtZXIgb3BlbiBhbmQgaGlzdG9yeSBwdXJjaGFzZXNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb25zdW1lciBvYmplY3QgaWQgb2YgdGhlIGFjY291bnQsIDEuMi4qXG4gICAgICogQHBhcmFtIG9yZGVyY1xuICAgICAqIEBwYXJhbSBmcm9tIG9iamVjdCBpZCBvZiB0aGUgaGlzdG9yeSBvYmplY3QgdG8gc3RhcnQgZnJvbSwgdXNlIDAuMC4wIHRvIGlnbm9yZVxuICAgICAqIEBwYXJhbSBsaW1pdCBudW1iZXIgb2YgZW50cmllcywgbWF4IDEwMFxuICAgICAqL1xuXG4gICAgc2VhcmNoUHVyY2hhc2VzKFxuICAgICAgICBjb25zdW1lcjogQ2hhaW5PYmplY3QsXG4gICAgICAgIG9yZGVyOiBTZWFyY2hQdXJjaGFzZXNPcmRlciA9IFNlYXJjaFB1cmNoYXNlc09yZGVyLlBVUkNIQVNFRF9ERVNDLFxuICAgICAgICBmcm9tOiBDaGFpbk9iamVjdCA9IENoYWluT2JqZWN0Lk5PTkUsXG4gICAgICAgIHRlcm06IFN0cmluZyA9IFwiXCIsXG4gICAgICAgIGxpbWl0OiBJbnQgPSAxMDBcbiAgICApOiBQcm9taXNlPFB1cmNoYXNlW10+XG5cbiAgICAvKipcbiAgICAgKiBnZXQgY29uc3VtZXIgYnV5aW5nIGJ5IGNvbnRlbnQgdXJpXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29uc3VtZXIgb2JqZWN0IGlkIG9mIHRoZSBhY2NvdW50LCAxLjIuKlxuICAgICAqIEBwYXJhbSB1cmkgYSB1cmkgb2YgdGhlIGNvbnRlbnRcbiAgICAgKlxuICAgICAqIEByZXR1cm4gYW4gYWNjb3VudCBpZiBmb3VuZCwgT2JqZWN0Tm90Rm91bmRFeGNlcHRpb24gb3RoZXJ3aXNlXG4gICAgICovXG5cbiAgICBnZXRQdXJjaGFzZShcbiAgICAgICAgY29uc3VtZXI6IENoYWluT2JqZWN0LFxuICAgICAgICB1cmk6IHN0cmluZ1xuICAgICk6IFByb21pc2U8UHVyY2hhc2U+O1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==