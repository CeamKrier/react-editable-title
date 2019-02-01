import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Editable from '../index'

export default class Demo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: ''
    }
  }

  handleTitleChange (data) {
    this.setState({
      title: data
    })
  }

  render () {
    return (
      <div style={{position: 'absolute', right: '50%', bottom: '50%'}}>
        <Editable contentRefs={this.handleTitleChange.bind(this)} name='Extraordinary claims requires extraordinary evidence.' />
        <p>You can access the value from root component.</p>
        <p>Your title is: {this.state.title}</p>
      </div>
    )
  }
}

ReactDOM.render(
  <Demo />,
  document.getElementById('main')
)
module.hot.accept()
