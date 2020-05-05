import { CSSProperties } from 'react';

export enum Key {
	Enter = 13,
	ESC = 27,
}

export interface EditableProps {
	text: string;
	editButton?: boolean;
	editControlButtons?: boolean;
	seamlessInput?: boolean;
	saveOnBlur?: boolean;
	placeholder?: string;
	textStyle?: CSSProperties;
	inputStyle?: CSSProperties;
	editButtonStyle?: CSSProperties;
	saveButtonStyle?: CSSProperties;
	cancelButtonStyle?: CSSProperties;
	inputPattern?: string;
	inputErrorMessage?: string;
	inputErrorMessageStyle?: CSSProperties;
	inputMinLength?: number;
	inputMaxLength?: number;
	cb: (currentText: string) => any;
	onEditCancel?: Function;
	onValidationFail?: Function;
}