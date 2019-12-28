import React, { CSSProperties } from 'react';
import '../src/css/index.css';
interface EditableProps {
    text: string;
    editButton?: boolean;
    editControlButtons?: boolean;
    placeholder?: string;
    seamlessInput?: boolean;
    textStyle?: CSSProperties;
    inputStyle?: CSSProperties;
    editButtonStyle?: CSSProperties;
    saveButtonStyle?: CSSProperties;
    cancelButtonStyle?: CSSProperties;
    cb: (currentText: string) => any;
}
declare const Editable: React.FC<EditableProps>;
export default Editable;
