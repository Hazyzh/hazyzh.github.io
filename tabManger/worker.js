/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 949:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TabsManagerEvents = exports.workerEvents = void 0;
exports.workerEvents = {
    activeTabId: 'tabs-manager-active-tab-id',
    setActiveTab: 'tabs-manager-set-active-tab',
    checkActiveTab: 'tabs-manager-check-active-tab',
    closeWindow: 'tabs-manager-close-window',
};
exports.TabsManagerEvents = {
    error: 'tabs-manager-error',
    activeTab: 'tabs-manager-active-tab',
};


/***/ }),

/***/ 827:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TabsManagerWorkerServer = void 0;
var helper_1 = __webpack_require__(949);
// eslint-disable-next-line  @typescript-eslint/no-explicit-any,no-restricted-globals
var globalSelf = self;
var TabsManagerWorkerServer = /** @class */ (function () {
    function TabsManagerWorkerServer() {
        var _this = this;
        this.connections = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.protIdMap = new WeakMap();
        this.portListener = function (port) { return function (e) {
            var _a = e.data, type = _a.type, id = _a.id;
            switch (type) {
                case helper_1.workerEvents.setActiveTab:
                    _this.activeId = id;
                    _this.protIdMap.set(port, id);
                    _this.broadcastMessage({ type: helper_1.workerEvents.activeTabId, id: _this.activeId });
                    break;
                case helper_1.workerEvents.checkActiveTab:
                    _this.protIdMap.set(port, id);
                    if (!_this.activeId) {
                        _this.activeId = id;
                    }
                    _this.broadcastMessage({ type: helper_1.workerEvents.activeTabId, id: _this.activeId });
                    break;
                case helper_1.workerEvents.closeWindow:
                    _this.connections = _this.connections.filter(function (item) { return item !== port; });
                    if (_this.activeId === id) {
                        _this.protIdMap.delete(port);
                        _this.activeId = _this.protIdMap.get(_this.connections[0]);
                        _this.broadcastMessage({ type: helper_1.workerEvents.activeTabId, id: _this.activeId });
                    }
                    break;
                default:
            }
        }; };
        this.broadcastMessage = function (data) {
            _this.connections.forEach(function (port) {
                port.postMessage(data);
            });
        };
    }
    TabsManagerWorkerServer.prototype.init = function () {
        var _this = this;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        globalSelf.addEventListener('connect', function (e) {
            var port = e.ports[0];
            _this.connections.push(port);
            port.addEventListener('message', _this.portListener(port));
            port.start();
        });
    };
    return TabsManagerWorkerServer;
}());
exports.TabsManagerWorkerServer = TabsManagerWorkerServer;
exports["default"] = TabsManagerWorkerServer;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
var worker_1 = __webpack_require__(827);
var server = new worker_1.TabsManagerWorkerServer();
server.init();

})();

/******/ })()
;