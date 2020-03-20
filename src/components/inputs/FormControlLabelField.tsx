import React from 'react';
import classNames from 'classnames';
import { FormControlLabel, makeStyles, FormControlLabelProps, CheckboxProps, RadioProps } from '@material-ui/core';

import { useField, FieldInputProps } from 'formik';

interface IProps extends Omit<FormControlLabelProps, 'control'> {
    name: string
    control: React.ComponentType<any>
    labelClass?: string
    inputClass?: string
}

type TProps = IProps & CheckboxProps & RadioProps & Partial<FieldInputProps<string>>;

const useStyles = makeStyles({
    label: {},
    input: {},
    error: {
        position: 'absolute',
        left: 0,
        top: 10
    },
});

const FormControlLabelField: React.FC<TProps> = ({
    name,
    control: Component,
    label,
    labelClass,
    inputClass,
    ...props
}) => {
    const [field] = useField(name);
    const classes = useStyles({});
    const control = (
        <Component
            className={classNames(classes.input, inputClass)}
        />
    );
    return (
        <FormControlLabel
            control={control}
            label={label}
            className={classNames(classes.label, labelClass)}
            {...field}
            {...props}
        />
    );
}

export default FormControlLabelField;