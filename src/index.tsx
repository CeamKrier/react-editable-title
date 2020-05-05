import React, { useState, useCallback, useRef, useMemo } from 'react';
import { AiOutlineCheck, AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';
import { EditableProps, Key } from './types';


const Editable: React.FC<EditableProps> = ({
	text,
	editButton = false,
	editControlButtons = false,
	seamlessInput = false,
	saveOnBlur = true,
	placeholder = 'Type Here',
	textStyle,
	inputStyle,
	editButtonStyle,
	saveButtonStyle,
	cancelButtonStyle,
	inputPattern,
	inputErrorMessage = 'Input does not match the pattern',
	inputErrorMessageStyle,
	inputMinLength,
	inputMaxLength,
	cb,
	onEditCancel,
	onValidationFail,
}) => {
	const [editing, setEditing] = useState(false);
	const [popupVisibile, setPopupVisible] = useState(false);
	const [displayText, setDisplayText] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);
	const displayTextRef = useRef<HTMLSpanElement>(null);

	const handleClickOnText = useCallback(() => {
		setEditing(!editing);
		setDisplayText(text);
		/* 
         A little hack to wait event-loop to flush-out itself
         The issue is, when the user clicked on the text 
         or the edit button, the focus instantly being given
         to the input element. But, it`s not visible at the moment.
         By calling the `setTimeout`, function call will be done
         after the event-loop has executed all the functions.
      */
		setTimeout(() => {
			inputRef.current?.focus();
		}, 0);
	}, [editing]);

	const updateDisplayText = useCallback(() => {
		setDisplayText(inputRef.current!.value);
		if (popupVisibile) {
			setPopupVisible(false);
		}
	}, []);

	const terminateEditing = useCallback(() => {
		setEditing(false);
		setPopupVisible(false);
		onEditCancel ? onEditCancel() : undefined;
	}, []);

	const handleKeyDown = useCallback(
		(event) => {
			const stroke = event.keyCode || event.which;

			if (stroke === Key.Enter && text !== inputRef.current?.value) {
				handleSaveText();
			} else if (stroke === Key.ESC) {
				terminateEditing();
			}
		},
		[text]
	);

	const saveText = useCallback(() => {
		terminateEditing();
		cb(inputRef.current!.value);
	}, []);

	const handleSaveText = useCallback(() => {
		if (inputRef.current && inputRef.current.value.trim() !== '') {
			if (inputPattern) {
				if (inputRef.current.value.match(new RegExp(inputPattern))) {
					saveText();
				} else {
					setPopupVisible(true);
					onValidationFail ? onValidationFail() : undefined;
				}
			} else {
				saveText();
			}
		}
	}, []);

	const calculateDimensions = useMemo(() => {
		return {
			width: displayTextRef.current?.offsetWidth,
			height: displayTextRef.current?.offsetHeight,
		};
	}, [editing]);

	return useMemo(() => {
		return (
			<React.Fragment>
				<div
					className='editable-title-wrapper'
					style={{
						...styles.title_wrapper,
						...(seamlessInput && calculateDimensions),
					}}>
					<input
						style={{
							...(editing
								? {
										...inputStyle,
										minWidth: `${placeholder.length * 8}px`,
										...(seamlessInput
											? { ...styles.seamlessInput }
											: {
													...styles.customTitleInput,
													boxSizing: 'border-box',
													position: 'relative',
											  }),
								  }
								: { display: 'none' }),
						}}
						ref={inputRef}
						placeholder={placeholder}
						value={displayText}
						onChange={updateDisplayText}
						onKeyDown={handleKeyDown}
						minLength={inputMinLength}
						maxLength={inputMaxLength}
						onBlur={saveOnBlur ? handleSaveText : undefined}
					/>
					{inputPattern && popupVisibile ? (
						<div
							style={{
								...styles.editable_title_popover,
								position: 'absolute',
							}}>
							<span style={inputErrorMessageStyle}>{inputErrorMessage}</span>
						</div>
					) : undefined}
					<span
						ref={displayTextRef}
						className='displayText'
						style={!editing ? { ...textStyle, marginRight: '1em' } : { display: 'none' }}
						onClick={handleClickOnText}>
						{text}
					</span>
					{editButton && (
						<button
							style={{
								...(!editing
									? {
											...editButtonStyle,
											...styles.mainButton,
											...styles.edit,
										
									  }
									: { display: 'none' }),
							}}
							onClick={handleClickOnText}>
							<AiOutlineEdit
								style={{ width: '1.2em', height: '1.2em', marginTop: '-50%' }}
							/>
						</button>
					)}
					{editControlButtons && (
						<React.Fragment>
							<button
                style={{
                  ...(editing
                    ? {
                        ...saveButtonStyle,
                        ...styles.mainButton,
                        ...styles.save,
                        position: 'relative'
                      }
                    : { display: 'none' }),
                }}
								onClick={handleSaveText}
								disabled={text === displayText}>
								<AiOutlineCheck style={{marginTop: '50%'}} />
							</button>
							<button
                style={{
                  ...(editing
                    ? {
                        ...cancelButtonStyle,
                        ...styles.mainButton,
                        ...styles.cancel,
                        
                      }
                    : { display: 'none' }),
                }}
								onClick={terminateEditing}>
								<AiOutlineClose style={{marginTop: '50%'}} />
							</button>
						</React.Fragment>
					)}
				</div>
			</React.Fragment>
		);
	}, [displayText, editing, popupVisibile]);
};

const styles = {
	customTitleInput: {
		boxSizing: 'border-box',
		display: 'inline-block',
		height: '32px',
		padding: '4px 11px',
		color: 'rgba(0,0,0,0.65)',
		fontSize: '14px',
		fontFamily: 'sans-serif',
		lineHeight: '1.5',
		backgroundColor: '#fff',
		border: '1px solid #d9d9d9',
		borderRadius: '4px',
		borderTopRightRadius: 'unset',
		borderBottomRightRadius: 'unset',
	},
	title_wrapper: {
		display: '-webkit-inline-box',
	},
	mainButton: {
		cursor: 'pointer',
		display: 'inline-block',
		minHeight: '1em',
		outline: '0',
		border: 'none',
		background: '#e0e1e2 none',
		color: 'rgba(0,0,0,.6)',
		margin: '0 .25em 0 0',
		padding: '.0em 1em .78571429em',
		borderRadius: '.28571429rem',
		verticalAlign: 'bottom',
    maxHeight: '32px',
    "&:hover": {
      background: 'red'
    }
	},
	edit: {
		padding: '.78571429em',
	},
	save: {
		marginLeft: '-.1em',
		borderRadius: 'unset',
	},
	cancel: {
		marginLeft: '-0.3em',
		borderTopLeftRadius: 'unset',
		borderBottomLeftRadius: 'unset',
	},
	displayText: {
		position: 'relative',
		marginRight: '1em',
		fontFamily: 'sans-serif',
		bottom: '.1em',
		cursor: 'pointer',
	},
	mainButton_save_disabled: {
		background: '#a4a5a7',
		cursor: 'not-allowed',
		color: '#ededed',
		transition: 'all .3s',
	},
	bendRightSide: {
		borderTopRightRadius: '4px',
		borderBottomRightRadius: '4px',
	},
	seamlessInput: {
		outline: 'none',
		border: '0',
		width: 'inherit',
	},
	editable_title_popover: {
		marginTop: '-0.15em',
	},
};

export default Editable;
