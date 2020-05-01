import React, { CSSProperties } from 'react';
import '../src/css/index.css';
interface EditableProps {
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
declare const Editable: React.FC<EditableProps>;
export default Editable;
