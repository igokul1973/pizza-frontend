import React from 'react';
import InputMask from 'react-input-mask';
import { TextField } from '@material-ui/core';

interface IProps {
    name: string;
    value: string;
    label?: string;
    id?: string;
    inputClass?: string;
    placeholder?: string;
}

const MaskedPhoneInput: React.FC<IProps> = (props) => {
    return (
        <InputMask
            mask='+1-999-999-99-99'
            {...props}
        >
            {
                (inputProps: IProps) => {
                    return (
                        <TextField
                            type="tel"
                            value={props.value}
                            {...inputProps}
                        />
                    )
                }
            }
        </InputMask>
    );
}

export default MaskedPhoneInput;
