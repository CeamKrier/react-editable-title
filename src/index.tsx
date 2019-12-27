import React, { useState, useCallback, useRef, useMemo } from 'react'
import '../src/css/index.css'

interface EditableProps {
  text: string;
  editButton?: boolean;
  editControls?: boolean;
  placeholder?: string;
  seamlessInput?: boolean;
  cb: (currentText: string) => any;
}

const Editable: React.FC<EditableProps> = ({
  text,
  editButton = false,
  editControls = false,
  placeholder = 'Type Here',
  seamlessInput = false,
  cb
}) => {
  const [editing, setEditing] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const displayTextRef = useRef<HTMLSpanElement>(null)

  const handleClickOnText = useCallback(
    () => {
      setEditing(!editing)
      setDisplayText(text)
      // A little hack to wait event-loop to flush-out itself
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0);
    },
    [editing],
  )

  const updateDisplayText = useCallback(
    () => {
      setDisplayText(inputRef.current?.value || '*')
    },
    [],
  )

  const terminateEditing = useCallback(
    () => {
      setEditing(false)
    },
    [],
  )

  const handleKeyDown = useCallback(
    (event) => {
      const stroke = event.keyCode || event.which

      if (stroke === 13 && text !== inputRef.current?.value) {
        handleSaveText()
        terminateEditing()
      } else if (stroke === 27) {
        terminateEditing()
      }
    },
    [text],
  )

  const handleSaveText = useCallback(
    () => {
      terminateEditing()
      if (inputRef.current) {
        cb(inputRef.current.value)
        inputRef.current.value = ''
      }
    },
    [],
  )

  const calculateDimensions = useMemo(() => {
    return {
       width: displayTextRef.current?.offsetWidth,
       height: displayTextRef.current?.offsetHeight 
      }
  }, [editing])

  return useMemo(() => {
    return (
      <React.Fragment>
  
          <div 
            className='title-wrapper'
            style={seamlessInput ? calculateDimensions : undefined}>
            <input 
              className={`${seamlessInput ? 'seamlessInput' : 'customTitleInput'} ${editControls ? '' : 'bendRightSide'}`}
              style={editing ? undefined : { display: 'none' }}
              ref={inputRef} 
              placeholder={placeholder}
              value={displayText}
              onChange={updateDisplayText}
              onKeyDown={handleKeyDown}/>
            <span
              ref={displayTextRef}
              className='displayText' 
              style={!editing ? undefined : { display: 'none' }} 
              onClick={handleClickOnText}>
                {text}
            </span>
            {
              editButton ? 
                <button
                  className={`mainButton edit ${editButton ? 'showControl' : 'hideControl'}`}
                  style={!editing ? undefined : { display: 'none' }}
                  onClick={handleClickOnText}>
                    <i className="gg-pen" />
                </button>
                :
                undefined
            }
            {
              editControls ? 
                <React.Fragment>
                  <button
                    className={`mainButton save ${editControls ? 'showControl' : 'hideControl'}`} 
                    style={editing ? undefined : { display: 'none' }}
                    onClick={handleSaveText}
                    disabled={text === displayText}>
                      <i className="gg-check" />
                  </button>
                  <button
                    className={`mainButton cancel ${editControls ? 'showControl' : 'hideControl'}`} 
                    style={editing ? undefined : { display: 'none' }}
                    onClick={terminateEditing}>
                      <i className="gg-close" />
                  </button>
                </React.Fragment>
                :
                undefined
            }
          </div>
  
      </React.Fragment>
    )
  }, [displayText, editing])
}

export default Editable