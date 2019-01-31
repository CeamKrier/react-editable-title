import React, { Component } from 'react'
import './src/css/index.css'
import { Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

export default class index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      content: this.props.name,
      lastUpdatedContent: this.props.name,
      editing: false,
      editButtonVisible: props.editButton,
      editControlsVisible: props.editControls,
      placeholderText: props.placeholder || 'Type here'
    }
    this.inputRef = React.createRef()
  }

  setFocusOnInputElement () {
    this.inputRef.current.focus()
  }

  handleOnClick () {
    this.setState(prevState => ({
      editing: !prevState.editing
    }), () => this.state.editing ? this.setFocusOnInputElement() : null)
  }

  saveContent () {
    this.setState({
      content: this.inputRef.current.value
    })
  }

  handleOnKeyDown (event) {
    let stroke = event.keyCode || event.which

    if (stroke === 13) {
      this.confirmEdit()
    } else if (stroke === 27) {
      this.cancelEdit()
    }
  }

  cancelEdit () {
    this.handleOnClick()
    this.setState(prevState => ({
      content: prevState.lastUpdatedContent
    }))
  }

  confirmEdit () {
    this.saveContent()
    this.setState({
      lastUpdatedContent: this.state.content
    }, () => {
      this.props.contentRefs(this.state.lastUpdatedContent)
    })
    this.handleOnClick()
  }

  render () {
    return (
      this.state.editing
        ? <div className='title-wrapper'>
          <input placeholder={this.state.placeholderText + ''} className='customTitleInput' ref={this.inputRef} value={this.state.content} onChange={this.saveContent.bind(this)} onKeyDown={this.handleOnKeyDown.bind(this)} />
          <Button size='mini' style={this.state.editControlsVisible ? null : { display: 'none' }} onClick={this.confirmEdit.bind(this)}>Save</Button>
          <Button size='mini' style={this.state.editControlsVisible ? null : { display: 'none' }} onClick={this.cancelEdit.bind(this)}>Cancel</Button>
        </div>
        : <div className='title-wrapper'>
          <h3 style={{ margin: 0 }} onClick={this.handleOnClick.bind(this)} >{this.state.content}</h3>
          <Button size='mini' style={this.state.editButtonVisible ? null : { display: 'none' }} className='editButton' onClick={this.handleOnClick.bind(this)}>Edit</Button>
        </div>
    )
  }
}
