'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

var _react = _interopRequireWildcard(require('react'))

require('./src/css/index.css')

var _semanticUiReact = require('semantic-ui-react')

require('semantic-ui-css/semantic.min.css')

function _interopRequireWildcard (obj) { if (obj && obj.__esModule) { return obj } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc) } else { newObj[key] = obj[key] } } } } newObj.default = obj; return newObj } }

function _typeof (obj) { if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof = function _typeof (obj) { return typeof obj } } else { _typeof = function _typeof (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj } } return _typeof(obj) }

function _classCallCheck (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function') } }

function _defineProperties (target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } }

function _createClass (Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor }

function _possibleConstructorReturn (self, call) { if (call && (_typeof(call) === 'object' || typeof call === 'function')) { return call } return _assertThisInitialized(self) }

function _assertThisInitialized (self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called") } return self }

function _getPrototypeOf (o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf (o) { return o.__proto__ || Object.getPrototypeOf(o) }; return _getPrototypeOf(o) }

function _inherits (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function') } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass) }

function _setPrototypeOf (o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf (o, p) { o.__proto__ = p; return o }; return _setPrototypeOf(o, p) }

var index =
/* #__PURE__ */
(function (_Component) {
  _inherits(index, _Component)

  function index (props) {
    var _this

    _classCallCheck(this, index)

    _this = _possibleConstructorReturn(this, _getPrototypeOf(index).call(this, props))
    _this.state = {
      content: _this.props.name,
      lastUpdatedContent: _this.props.name,
      editing: false,
      editButtonVisible: props.editButton,
      editControlsVisible: props.editControls,
      placeholderText: props.placeholder || 'Type here'
    }
    _this.inputRef = _react.default.createRef()
    return _this
  }

  _createClass(index, [{
    key: 'setFocusOnInputElement',
    value: function setFocusOnInputElement () {
      this.inputRef.current.focus()
    }
  }, {
    key: 'handleOnClick',
    value: function handleOnClick () {
      var _this2 = this

      this.setState(function (prevState) {
        return {
          editing: !prevState.editing
        }
      }, function () {
        return _this2.state.editing ? _this2.setFocusOnInputElement() : null
      })
    }
  }, {
    key: 'saveContent',
    value: function saveContent () {
      this.setState({
        content: this.inputRef.current.value
      })
    }
  }, {
    key: 'handleOnKeyDown',
    value: function handleOnKeyDown (event) {
      var stroke = event.keyCode || event.which

      if (stroke === 13) {
        this.confirmEdit()
      } else if (stroke === 27) {
        this.cancelEdit()
      }
    }
  }, {
    key: 'cancelEdit',
    value: function cancelEdit () {
      this.handleOnClick()
      this.setState(function (prevState) {
        return {
          content: prevState.lastUpdatedContent
        }
      })
    }
  }, {
    key: 'confirmEdit',
    value: function confirmEdit () {
      var _this3 = this

      this.saveContent()
      this.setState({
        lastUpdatedContent: this.state.content
      }, function () {
        _this3.props.contentRefs(_this3.state.lastUpdatedContent)
      })
      this.handleOnClick()
    }
  }, {
    key: 'render',
    value: function render () {
      var toBeRendered = this.state.editing ? _react.default.createElement('div', {
        className: 'title-wrapper'
      }, _react.default.createElement('input', {
        placeholder: this.state.placeholderText + '',
        className: 'customTitleInput',
        ref: this.inputRef,
        value: this.state.content,
        onChange: this.saveContent.bind(this),
        onKeyDown: this.handleOnKeyDown.bind(this)
      }), _react.default.createElement(_semanticUiReact.Button, {
        size: 'mini',
        style: this.state.editControlsVisible ? null : {
          display: 'none'
        },
        onClick: this.confirmEdit.bind(this)
      }, 'Save'), _react.default.createElement(_semanticUiReact.Button, {
        size: 'mini',
        style: this.state.editControlsVisible ? null : {
          display: 'none'
        },
        onClick: this.cancelEdit.bind(this)
      }, 'Cancel')) : _react.default.createElement('div', {
        className: 'title-wrapper'
      }, _react.default.createElement('h3', {
        style: {
          margin: 0
        },
        onClick: this.handleOnClick.bind(this)
      }, this.state.content), _react.default.createElement(_semanticUiReact.Button, {
        size: 'mini',
        style: this.state.editButtonVisible ? null : {
          display: 'none'
        },
        className: 'editButton',
        onClick: this.handleOnClick.bind(this)
      }, 'Edit'))
      return toBeRendered
    }
  }])

  return index
}(_react.Component))

exports.default = index
