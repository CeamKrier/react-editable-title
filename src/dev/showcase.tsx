import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Editable from '../../lib/index'

const Showcase: React.FC = () => {

  const [text, setText] = useState('Hellow')
  const [hondaModel, setHondaModel] = useState('Accord')

  const handleTextUpdate = (current: string) => {
    setText(current)
  }

  const handleHondaModelUpdate = (current: string) => {
    setHondaModel(current)
  }

  return (
    <React.Fragment>
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <Editable 
          text={text} 
          editButton
          editControlButtons
          placeholder="Type here"
          cb={handleTextUpdate}
          />
          <p />
          <p>
            You can control component with the buttons and also with <b>'Esc'</b>{" "}
            and <b>'Enter'</b> keys as well.
          </p>
          <p>
            Save button won`t be enabled until the user change the content. Also, the <b>'Enter'</b>
             won`t trigger, too.
          </p>
          <p>
            Also, you can use the <b>seamless</b> styling of the component as illustrated below.
          </p>
          <table className="pure-table" style={{ width: '100%' }}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Year</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>1</td>
                    <td>Honda</td>
                    <td>
                      <Editable 
                        text={hondaModel} 
                        seamlessInput
                        placeholder="Type here"
                        cb={handleHondaModelUpdate}
                      />
                    </td>
                    <td>2009</td>
                </tr>

                <tr>
                    <td>2</td>
                    <td>Toyota</td>
                    <td>Camry</td>
                    <td>2012</td>
                </tr>

                <tr>
                    <td>3</td>
                    <td>Hyundai</td>
                    <td>Elantra</td>
                    <td>2010</td>
                </tr>
            </tbody>
        </table>
      </div>
      
    </React.Fragment>
  )
}

ReactDOM.render(
  <Showcase />,
  document.getElementById('main')
)