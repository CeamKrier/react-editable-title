import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Editable from '../../lib/index'

const Showcase: React.FC = () => {

  const [text, setText] = useState('Hellow')
  const [hondaModel, setHondaModel] = useState('Accord')
  const [hondaYear, setHondaYear] = useState('2009')

  const handleEditCancel = () => {
    console.log('First editable title`s edit has been canceled')
  }

  const handleModelValidationFail = () => {
    console.log('Model re-name validation has been failed')
  }

  const handleTextUpdate = (current: string) => {
    setText(current)
  }

  const handleHondaModelUpdate = (current: string) => {
    setHondaModel(current)
  }

  const handleHondaYearUpdate = (current: string) => {
    setHondaYear(current)
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
          saveOnBlur={false}
          editButton
          editControlButtons
          placeholder="Type here"
          cb={handleTextUpdate}
          onEditCancel={handleEditCancel}
          initiallyFocused
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
            You can use the <b>seamless</b> styling of the component as illustrated below.
          </p>
          <p>
            For the sake illustration, model names limited to accept <b>only letters</b>. Also, year can accept <b>only numbers</b> as an input.
            Other inputs will generate an error message below the input field.
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
                        placeholder="Type model here"
                        inputErrorMessage='Only letters allowed'
                        inputErrorMessageStyle={{color: 'red'}}
                        inputPattern="^[A-Za-z]*$"
                        cb={handleHondaModelUpdate}
                        onValidationFail={handleModelValidationFail}
                      />
                    </td>
                    <td>
                    <Editable 
                        text={`${hondaYear}`} 
                        seamlessInput
                        placeholder="Type year here"
                        inputErrorMessage='Only numbers allowed'
                        inputErrorMessageStyle={{color: 'blue'}}
                        inputPattern="^[0-9]*$"
                        cb={handleHondaYearUpdate}
                      />
                    </td>
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
        <p>All of those are extremely customizable though the exposed props. Check the <a href="https://github.com/CeamKrier/react-editable-title#api">docs</a> for it!</p>

      </div>
      
    </React.Fragment>
  )
}

ReactDOM.render(
  <Showcase />,
  document.getElementById('main')
)