# react-editable-title [![Build Status](https://travis-ci.org/CeamKrier/react-editable-title.svg?branch=master)](https://travis-ci.org/CeamKrier/react-editable-title)

An editable title implementation for react.

## Installation



```
npm install react-editable-title
```

## Usage

```javascript
import Editable from 'react-editable-title'

handleNewTitle (data) {
    console.log('Your new title is ' + data)
  }

<Editable contentRefs={this.handleNewTitle} name='This is a test text'/>

```



## Features
You can enable/disable both edit button and control buttons of component.

```javascript
<Editable contentRefs={this.handleNewTitle} name='All buttons are visible' editButton controlButtons />
```
```javascript
<Editable contentRefs={this.handleNewTitle} name='Buttons are invisible' />
```

You can specify which placeholder you would like to present on the input element. It is set to be 'Type here' as default.

```javascript
<Editable contentRefs={this.handleNewTitle} name='Placeholder example' placeholder='Enter new ID' />
```

Component also can be controlled by keys. Hit 'Enter' to save or 'Esc' to cancel your edit.

## Styling
As default, semantic-ui has utilized on this component. It will render via that styling as out of the box but you always can override it with your own css rules.


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
Thanks :raised_hands:


## License
[GPL](https://choosealicense.com/licenses/gpl-3.0/)
