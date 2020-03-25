import React from "react";
import { makeStyles, TextFieldProps, Theme, MenuItem } from "@material-ui/core";
import { useField, FieldValidator } from "formik";
import clsx from "clsx";

type TProps = Partial<TextFieldProps> & {
    name: string
    control: React.ComponentType<any>
    inputClass?: string
    selectOptions?: { label: string, value: number | string }[]
    helperText?: string
    validate?: FieldValidator
};

const useStyles = makeStyles((theme: Theme) => ({
    input: {
        width: "100%"
    },
    label: {
        color: theme.palette.primary.main
    }
}));

const FormField: React.FC<TProps> = ({
    name,
    control: Component,
    inputClass,
    select,
    selectOptions,
    helperText = "",
    validate,
    ...props
}) => {
    const [field, meta] = useField({ name, validate });
    const errorText = meta.error && meta.touched ? meta.error : "";
    const classes = useStyles();

    return !select || !selectOptions ? (
        <Component
            className={clsx(classes.input, inputClass)}
            defaultValue={props.defaultValue}
            helperText={errorText || helperText}
            error={errorText}
            InputLabelProps={{
                className: classes.label
            }}
            {...field}
            {...props}
        />
    ) : (
            <Component
                className={clsx(classes.input, inputClass)}
                {...field}
                {...props}
            >
                {selectOptions.map(option => (
                    <MenuItem value={option.value} key={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Component>
        );
};

export default FormField;
