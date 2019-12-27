import React from 'react';
import '../src/css/index.css';
interface EditableProps {
    text: string;
    editButton?: boolean;
    editControls?: boolean;
    placeholder?: string;
    seamlessInput?: boolean;
    cb: (currentText: string) => any;
}
declare const Editable: React.FC<EditableProps>;
export default Editable;
