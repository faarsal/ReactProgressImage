"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.parse-int.js");

require("core-js/modules/es.parse-float.js");

require("core-js/modules/es.number.to-fixed.js");

require("core-js/modules/web.url.js");

require("core-js/modules/web.url-search-params.js");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let ImageLoader = props => {
  const {
    src
  } = props;
  let [state, setState] = (0, _react.useState)({
    downloadProgress: 0,
    responseImage: null,
    donwloadStarted: false
  });

  const DownloadImage = async () => {
    setState(_objectSpread(_objectSpread({}, state), {}, {
      donwloadStarted: true
    }));
    const myRequest = new Request(src);
    let imageUrl = "";

    try {
      let response = await fetch(myRequest);
      const contentLength = response.headers.get("content-length");
      const total = parseInt(contentLength, 10);
      let loaded = 0;
      const res = new Response(new ReadableStream({
        async start(controller) {
          const reader = response.body.getReader();

          for (;;) {
            const {
              done,
              value
            } = await reader.read();
            if (done) break;
            loaded += value.byteLength;
            const downloadProgress = parseFloat((loaded / total * 100).toFixed(1));
            setState(_objectSpread(_objectSpread({}, state), {}, {
              downloadProgress
            }));
            if (props.onProgressUpdate) props.onProgressUpdate(downloadProgress);
            controller.enqueue(value);
          }

          controller.close();
        }

      }));
      const blob = await res.blob();
      var urlCreator = window.URL || window.webkitURL;
      imageUrl = urlCreator.createObjectURL(blob);
    } catch (error) {
      imageUrl = src;
    }

    setState(_objectSpread(_objectSpread({}, state), {}, {
      downloadProgress: 100,
      responseImage: imageUrl
    }));
    if (props.onProgressUpdate) props.onProgressUpdate(100);
    if (props.onDone) props.onDone();
  };

  (0, _react.useEffect)(() => {
    if (state.donwloadStarted === false) DownloadImage();
  }, []);
  if (state.downloadProgress === 100) return /*#__PURE__*/_react.default.createElement("img", {
    src: state.responseImage,
    alt: props.alt
  });
  if (props.hideLoading !== true) return /*#__PURE__*/_react.default.createElement("div", null, "Loading Image ".concat(state.downloadProgress, "%"));
  return /*#__PURE__*/_react.default.createElement("div", null);
};

var _default = ImageLoader;
exports.default = _default;