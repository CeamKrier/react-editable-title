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
    var text = _a.text, _b = _a.editButton, editButton = _b === void 0 ? false : _b, _c = _a.editControls, editControls = _c === void 0 ? false : _c, _d = _a.placeholder, placeholder = _d === void 0 ? 'Type Here' : _d, cb = _a.cb;
    var _e = react_1.useState(false), editing = _e[0], setEditing = _e[1];
    var _f = react_1.useState(''), displayText = _f[0], setDisplayText = _f[1];
    var inputRef = react_1.useRef(null);
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
        setDisplayText(((_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.value) || '<Oops>');
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
    return react_1.useMemo(function () {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: 'title-wrapper' },
                react_1.default.createElement("input", { className: "customTitleInput " + (editControls ? '' : 'bendRightSide'), style: editing ? undefined : { display: 'none' }, ref: inputRef, placeholder: placeholder, value: displayText, onChange: updateDisplayText, onKeyDown: handleKeyDown }),
                react_1.default.createElement("span", { className: 'displayText', style: !editing ? undefined : { display: 'none' }, onClick: handleClickOnText }, text),
                editButton ?
                    react_1.default.createElement("button", { className: "mainButton edit " + (editButton ? 'showControl' : 'hideControl'), style: !editing ? undefined : { display: 'none' }, onClick: handleClickOnText },
                        react_1.default.createElement("i", { className: "gg-pen" }))
                    :
                        undefined,
                editControls ?
                    react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement("button", { hidden: editControls, className: "mainButton save " + (editControls ? 'showControl' : 'hideControl'), style: editing ? undefined : { display: 'none' }, onClick: handleSaveText, disabled: text === displayText },
                            react_1.default.createElement("i", { className: "gg-check" })),
                        react_1.default.createElement("button", { hidden: editControls, className: "mainButton cancel " + (editControls ? 'showControl' : 'hideControl'), style: editing ? undefined : { display: 'none' }, onClick: terminateEditing },
                            react_1.default.createElement("i", { className: "gg-close" })))
                    :
                        undefined)));
    }, [displayText, editing]);
};
exports.default = Editable;
//# sourceMappingURL=index.js.map