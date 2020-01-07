# react-editable-title [![Build Status](https://travis-ci.org/CeamKrier/react-editable-title.svg?branch=master)](https://travis-ci.org/CeamKrier/react-editable-title)

An editable title implementation for react.

## Installation



```
npm install react-editable-title
```

## Usage

```javascript
import React, { useState } from 'react'
import Editable from 'react-editable-title'

const App = () => {
  const [text, setText] = useState('')

  const handleTextUpdate = (current: string) => {
    setText(current)
  }

  return (
        <Editable 
          text={text} 
          editButton
          editControls
          placeholder="Type here"
          cb={handleTextUpdate}
         />
  )
}

```

[![Edit 7w063kppz6](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/7w063kppz6)

## API

| Attribute                | Type            | Description                                                        | Required |
|--------------------------|-----------------|--------------------------------------------------------------------|----------|
| `text`                   | `string`        | Text to be displayed                                               | **Yes**  |
| `textStyle`              | `CSSProperties` | Custom text styling                                                | No       |
| `cb`                     | `function`      | Invoked when the text has been edited                              | **Yes**  |
| `onEditCancel`           | `function`      | Invoked when the edit has been canceled                            | No       |
| `onValidationFail`       | `function`      | Invoked when the text hasn't matched the regex                     | No       |
| `editButton`             | `boolean`       | Sets the visibility of the edit button. **Default** is `false`     | No       |
| `editButtonStyle`        | `CSSProperties` | Custom edit button styling                                         | No       |
| `editControlButtons`     | `boolean`       | Sets the visibility of the control buttons. **Default** is `false` | No       |
| `saveButtonStyle`        | `CSSProperties` | Custom save button styling                                         | No       |
| `cancelButtonStyle`      | `CSSProperties` | Custom cancel button styling                                       | No       |
| `placeholder`            | `string`        | Placeholder text of the input element                              | No       |
| `seamlessInput`          | `boolean`       | Presents text-editor alike experience. **Default** is `false`      | No       |
| `inputStyle`             | `CSSProperties` | Custom input styling                                               | No       |
| `inputPattern`           | `string`        | Regex pattern of desired input                                     | No       |
| `inputErrorMessage`      | `string`        | Info message about mismatch of input                               | No       |
| `inputErrorMessageStyle` | `CSSProperties` | Custom error message styling                                       | No       |
| `inputMinLength`         | `number`        | Min length accepted as an input                                    | No       |
| `inputMaxLength`         | `number`        | Max length accepted as an input                                    | No       |



## Features
The component can be controlled by keyboard keys. Hit **Enter** to save or **Esc** to cancel your edit.
If there is **no** change in the text, neither **Enter** nor the **Edit** button would work.

You also can control the validity of inputs with the **regex** you would provide. If the regex won't match the user input
then your desired **error message** will be shown below of the input field.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
Thanks :raised_hands:


## License
[GPL](https://choosealicense.com/licenses/gpl-3.0/)
