"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("../src/css/index.css");
var Editable = function (_a) {
    var text = _a.text, _b = _a.editButton, editButton = _b === void 0 ? false : _b, _c = _a.editControls, editControls = _c === void 0 ? false : _c, _d = _a.placeholder, placeholder = _d === void 0 ? 'Type Here' : _d, _e = _a.seamlessInput, seamlessInput = _e === void 0 ? false : _e, cb = _a.cb;
    var _f = react_1.useState(false), editing = _f[0], setEditing = _f[1];
    var _g = react_1.useState(''), displayText = _g[0], setDisplayText = _g[1];
    var inputRef = react_1.useRef(null);
    var displayTextRef = react_1.useRef(null);
    var handleClickOnText = react_1.useCallback(function () {
        setEditing(!editing);
        setDisplayText(text);
        // A little hack to wait event-loop to flush-out itself
        setTimeout(function () {
            var _a;
            (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }, 0);
    }, [editing]);
    var updateDisplayText = react_1.useCallback(function () {
        var _a;
        setDisplayText(((_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.value) || '*');
    }, []);
    var terminateEditing = react_1.useCallback(function () {
        setEditing(false);
    }, []);
    var handleKeyDown = react_1.useCallback(function (event) {
        var _a;
        var stroke = event.keyCode || event.which;
        if (stroke === 13 && text !== ((_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.value)) {
            handleSaveText();
            terminateEditing();
        }
        else if (stroke === 27) {
            terminateEditing();
        }
    }, [text]);
    var handleSaveText = react_1.useCallback(function () {
        terminateEditing();
        if (inputRef.current) {
            cb(inputRef.current.value);
            inputRef.current.value = '';
        }
    }, []);
    var calculateDimensions = react_1.useMemo(function () {
        var _a, _b;
        return {
            width: (_a = displayTextRef.current) === null || _a === void 0 ? void 0 : _a.offsetWidth,
            height: (_b = displayTextRef.current) === null || _b === void 0 ? void 0 : _b.offsetHeight
        };
    }, [editing]);
    return react_1.useMemo(function () {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: 'title-wrapper', style: seamlessInput ? calculateDimensions : undefined },
                react_1.default.createElement("input", { className: (seamlessInput ? 'seamlessInput' : 'customTitleInput') + " " + (editControls ? '' : 'bendRightSide'), style: editing ? undefined : { display: 'none' }, ref: inputRef, placeholder: placeholder, value: displayText, onChange: updateDisplayText, onKeyDown: handleKeyDown }),
                react_1.default.createElement("span", { ref: displayTextRef, className: 'displayText', style: !editing ? undefined : { display: 'none' }, onClick: handleClickOnText }, text),
                editButton ?
                    react_1.default.createElement("button", { className: "mainButton edit " + (editButton ? 'showControl' : 'hideControl'), style: !editing ? undefined : { display: 'none' }, onClick: handleClickOnText },
                        react_1.default.createElement("i", { className: "gg-pen" }))
                    :
                        undefined,
                editControls ?
                    react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement("button", { className: "mainButton save " + (editControls ? 'showControl' : 'hideControl'), style: editing ? undefined : { display: 'none' }, onClick: handleSaveText, disabled: text === displayText },
                            react_1.default.createElement("i", { className: "gg-check" })),
                        react_1.default.createElement("button", { className: "mainButton cancel " + (editControls ? 'showControl' : 'hideControl'), style: editing ? undefined : { display: 'none' }, onClick: terminateEditing },
                            react_1.default.createElement("i", { className: "gg-close" })))
                    :
                        undefined)));
    }, [displayText, editing]);
};
exports.default = Editable;
//# sourceMappingURL=index.js.map