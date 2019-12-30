"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var Key;
(function (Key) {
    Key[Key["Enter"] = 13] = "Enter";
    Key[Key["ESC"] = 27] = "ESC";
})(Key || (Key = {}));
var Editable = function (_a) {
    var text = _a.text, _b = _a.editButton, editButton = _b === void 0 ? false : _b, _c = _a.editControlButtons, editControlButtons = _c === void 0 ? false : _c, _d = _a.placeholder, placeholder = _d === void 0 ? 'Type Here' : _d, _e = _a.seamlessInput, seamlessInput = _e === void 0 ? false : _e, textStyle = _a.textStyle, inputStyle = _a.inputStyle, editButtonStyle = _a.editButtonStyle, saveButtonStyle = _a.saveButtonStyle, cancelButtonStyle = _a.cancelButtonStyle, inputPattern = _a.inputPattern, inputMinLength = _a.inputMinLength, inputMaxLength = _a.inputMaxLength, cb = _a.cb;
    var _f = react_1.useState(false), editing = _f[0], setEditing = _f[1];
    var _g = react_1.useState(''), displayText = _g[0], setDisplayText = _g[1];
    var inputRef = react_1.useRef(null);
    var displayTextRef = react_1.useRef(null);
    var handleClickOnText = react_1.useCallback(function () {
        setEditing(!editing);
        setDisplayText(text);
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
        if (stroke === Key.Enter && text !== ((_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.value)) {
            handleSaveText();
            terminateEditing();
        }
        else if (stroke === Key.ESC) {
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
                react_1.default.createElement("input", { className: (seamlessInput ? 'seamlessInput' : 'customTitleInput') + " \n                 " + (editControlButtons ? '' : 'bendRightSide'), style: editing ? __assign({}, inputStyle) : { display: 'none' }, ref: inputRef, placeholder: placeholder, value: displayText, onChange: updateDisplayText, onKeyDown: handleKeyDown, pattern: inputPattern, minLength: inputMinLength, maxLength: inputMaxLength }),
                react_1.default.createElement("span", { ref: displayTextRef, className: 'displayText', style: !editing ? __assign({}, textStyle) : { display: 'none' }, onClick: handleClickOnText }, text),
                editButton ?
                    react_1.default.createElement("button", { className: "mainButton edit " + (editButton ? 'showControl' : 'hideControl'), style: !editing ? __assign({}, editButtonStyle) : { display: 'none' }, onClick: handleClickOnText },
                        react_1.default.createElement("i", { className: "gg-pen" }))
                    :
                        undefined,
                editControlButtons ?
                    react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement("button", { className: "mainButton save " + (editControlButtons ? 'showControl' : 'hideControl'), style: editing ? __assign({}, saveButtonStyle) : { display: 'none' }, onClick: handleSaveText, disabled: text === displayText },
                            react_1.default.createElement("i", { className: "gg-check" })),
                        react_1.default.createElement("button", { className: "mainButton cancel " + (editControlButtons ? 'showControl' : 'hideControl'), style: editing ? __assign({}, cancelButtonStyle) : { display: 'none' }, onClick: terminateEditing },
                            react_1.default.createElement("i", { className: "gg-close" })))
                    :
                        undefined)));
    }, [displayText, editing]);
};
exports.default = Editable;
//# sourceMappingURL=index.js.map