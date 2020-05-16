import React, { useState, useCallback, useRef, useMemo } from 'react';
import { AiOutlineCheck, AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';
import {
	ControlButton,
	CustomTitle,
	EditableTitlePopover,
	EditableWrapper,
} from './styledComponents';
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
		const spanHeight = displayTextRef.current?.offsetHeight!;
		const spanWidth = displayTextRef.current?.offsetWidth!;
		return {
			width: spanWidth > 0 ? spanWidth * 1.3 : 'inherit',
			height: spanHeight > 0 ? spanHeight : 'inherit',
		};
	}, [editing]);

	const renderCustomTitle = useMemo(() => {
		return (
			<CustomTitle
				style={{
					...(editing
						? {
								...inputStyle,
								minWidth: `${placeholder.length * 8}px`,
								padding: 'unset',
								...(seamlessInput && styles.seamlessInput),
								...(seamlessInput && calculateDimensions),
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
				onBlur={(saveOnBlur && handleSaveText) || undefined}
			/>
		);
	}, [
		editing,
		displayText,
		inputStyle,
		placeholder,
		seamlessInput,
		saveOnBlur,
		inputMaxLength,
		inputMinLength,
	]);

	const renderTitlePopover = useMemo(() => {
		return (
			inputPattern &&
			popupVisibile &&
			editing && (
				<EditableTitlePopover>
					<span style={inputErrorMessageStyle}>{inputErrorMessage}</span>
				</EditableTitlePopover>
			)
		);
	}, [
		inputPattern,
		popupVisibile,
		editing,
		inputErrorMessageStyle,
		inputErrorMessage,
	]);

	const renderEditControlButtons = useMemo(() => {
		return (
			editControlButtons && (
				<React.Fragment>
					<ControlButton
						style={{
							...(editing
								? {
										...saveButtonStyle,
										...(text === displayText &&
											styles.mainButton_save_disabled),
										...styles.save,
										position: 'relative',
								  }
								: { display: 'none' }),
						}}
						onClick={handleSaveText}
						disabled={text === displayText}>
						<AiOutlineCheck style={styles.editControlButtonIcon} />
					</ControlButton>
					<ControlButton
						style={{
							...(editing
								? {
										...cancelButtonStyle,
										...styles.cancel,
								  }
								: { display: 'none' }),
						}}
						onClick={terminateEditing}>
						<AiOutlineClose style={styles.editControlButtonIcon} />
					</ControlButton>
				</React.Fragment>
			)
		);
	}, [editControlButtons, editing, text, displayText, saveButtonStyle, cancelButtonStyle]);

	const renderEditButton = useMemo(() => {
		return (
			editButton && (
				<ControlButton
					style={{
						...(!editing
							? {
									...editButtonStyle,
									...styles.edit,
							  }
							: { display: 'none' }),
					}}
					onClick={handleClickOnText}>
					<AiOutlineEdit style={styles.editButtonIcon} />
				</ControlButton>
			)
		);
	}, [editButton, editing, editButtonStyle]);

	const renderTextDisplay = useMemo(() => {
		return (
			<span
					ref={displayTextRef}
					className='displayText'
					style={
						!editing
							? { ...textStyle, ...styles.displayText }
							: { display: 'none' }
					}
					onClick={handleClickOnText}>
					{text}
				</span>
		)
	}, [textStyle, editing])

	return (
		<React.Fragment>
			<EditableWrapper className='editable-title-wrapper'>
				{renderCustomTitle}

				{renderTitlePopover}

				{renderTextDisplay}

				{renderEditButton}

				{renderEditControlButtons}
			</EditableWrapper>
		</React.Fragment>
	);
};

const styles = {
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
		marginRight: '1em',
		cursor: 'pointer',
		display: 'flex',
		alignItems: 'center',
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
		minWidth: 'unset',
	},
	editable_title_popover: {
		marginTop: '-0.15em',
	},
	editButtonIcon: { width: '1.25em', height: '1.25em', marginTop: '-50%' },
	editControlButtonIcon: { marginTop: '50%' },
};

export default Editable;
