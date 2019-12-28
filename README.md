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

| Attribute            | Type            | Description                                                                        | Required |
|----------------------|-----------------|------------------------------------------------------------------------------------|----------|
| `text`               | `string`        | Text to be displayed                                                               | **Yes**  |
| `cb`                 | `function`      | Callback function that will be called when the text has edited                     | **Yes**  |
| `editButton`         | `boolean`       | Sets the visibility of the edit button. **Default** is `false`                     | No       |
| `editControlButtons` | `boolean`       | Sets the visibility of the control buttons. **Default** is `false`                 | No       |
| `placeholder`        | `string`        | Placeholder text of the input element                                              | No       |
| `seamlessInput`      | `boolean`       | Removes all stylings to infer text-editor alike experience. **Default** is `false` | No       |
| `textStyle`          | `CSSProperties` | Custom styling                                                                     | No       |
| `inputStyle`         | `CSSProperties` | Custom styling                                                                     | No       |
| `editButtonStyle`    | `CSSProperties` | Custom styling                                                                     | No       |
| `saveButtonStyle`    | `CSSProperties` | Custom styling                                                                     | No       |
| `cancelButtonStyle`  | `CSSProperties` | Custom styling                                                                     | No       |


## Features
The component can be controlled by keyboard keys. Hit **Enter** to save or **Esc** to cancel your edit.
If there is **no** change in the text, neither **Enter** nor the **Edit** button would work.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
Thanks :raised_hands:


## License
[GPL](https://choosealicense.com/licenses/gpl-3.0/)
