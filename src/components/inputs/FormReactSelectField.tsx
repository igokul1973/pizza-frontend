import React, { ChangeEvent, useMemo } from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import Autocomplete, { AutocompleteProps } from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useField, useFormikContext } from "formik";
import { UseAutocompleteProps } from "@material-ui/lab/useAutocomplete";
import { makeStyles, Theme } from "@material-ui/core";
import { debounce } from "lodash";

// import { inspect } from 'util';

export type TOption = {
    value: string;
    label: string;
};

type TSingleOrMultipleOption = TOption[] | (TOption | null);

export type TOnSelectChangeArgs = {
    event: ChangeEvent<{}>;
    selectedOption: TSingleOrMultipleOption;
    setValues: (values: any, shouldValidate?: boolean) => void;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean
    ) => void;
};

interface IProps extends Omit<AutocompleteProps<TOption>, "renderInput"> {
    name: string;
    defaultSingleValue?: TOption;
    defaultMultipleValue?: TOption[];
    getOptions?: (input: string) => Promise<TOption[]>;
    helperText?: string;
    onSelectChange?: (argsObject: TOnSelectChangeArgs) => void;
    onSelectInputChange?: () => void;
    onClear?: () => void;
    debounceDelay?: number;
    searchFromCharacter?: number;
    shouldFilterOptions?: boolean;
}

type TProps = IProps & UseAutocompleteProps<TOption> & TextFieldProps;

const useStyles = makeStyles((theme: Theme) => ({
    label: {
        color: theme.palette.primary.main
    }
}));

const FormReactSelectField: React.FC<TProps> = ({
    name,
    multiple,
    defaultSingleValue,
    defaultMultipleValue,
    label,
    getOptions,
    onSelectChange,
    onSelectInputChange,
    onClear,
    placeholder,
    debounceDelay = 0,
    fullWidth = true,
    variant = "standard",
    options: defaultOptions = [],
    helperText = "",
    autoFocus = false,
    searchFromCharacter = 0,
    shouldFilterOptions = false
}) => {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [options, setOptions] = React.useState<TOption[] | []>(
        defaultOptions
    );
    const [inputValue, setInputValue] = React.useState<string>("");
    // const [resetKey, setResetKey] = React.useState<1 | 2>(1);

    const { setFieldValue, setValues } = useFormikContext<any>();
    const [field, meta] = useField(name);
    const errorText = meta.error && meta.touched ? meta.error : "";

    const classes = useStyles();

    const handleSearch = async (inputValue: string) => {
        if (getOptions) {
            const result = await getOptions(inputValue);
            const newOptions = [
                ...defaultOptions.filter(
                    option => !option.value.includes(inputValue)
                ),
                ...result
            ];
            setLoading(false);
            setOptions(newOptions);
        }
    };

    const handleSearchDebounced = useMemo(() => {
        return debounce(
            (inputValue: string) => {
                handleSearch(inputValue);
            },
            debounceDelay,
            { leading: false, trailing: true }
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        if (!loading || !inputValue || !getOptions) {
            return;
        }
        if (debounceDelay) {
            handleSearchDebounced(inputValue);
        } else {
            handleSearch(inputValue);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, getOptions, inputValue]);

    /* React.useEffect(() => {
        if (values[name].length === 0) {
            setResetKey(resetKey === 1 ? 2 : 1);
            setOpen(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values[name]]); */

    const onInputChange = (event: object, value: string, reason: string) => {
        if (onSelectInputChange) {
            onSelectInputChange();
        }

        if (reason === "reset") {
            return;
        }

        if (reason === "clear") {
            if (onClear) return onClear();
        }

        if (value.length >= searchFromCharacter) {
            setInputValue(value);
            setLoading(true);
            return setOpen(true);
        }
        setOpen(false);
        setOptions(defaultOptions);
        setLoading(false);
    };

    const onChange = (
        event: ChangeEvent<{}>,
        selectedOption: TOption[] | (TOption | null)
    ) => {
        if (onSelectChange && selectedOption) {
            onSelectChange({ event, selectedOption, setValues, setFieldValue });
        }
        if (Array.isArray(selectedOption)) {
            // Autocomplete with 'multiple' set
            // TODO: Check that it works on multiple autocomplete
            setFieldValue(
                name,
                selectedOption.map(o => o.value)
            );
        } else {
            setFieldValue(
                name,
                (selectedOption && (selectedOption as TOption).value) || ""
            );
        }
    };

    if (multiple) {
        return (
            <Autocomplete
                multiple={true}
                filterOptions={(shouldFilterOptions) ? (options) => {
                    return options;
                } : undefined}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                filterSelectedOptions={true}
                getOptionSelected={(option, userInput) =>
                    option.value === userInput.value
                }
                getOptionLabel={(option: TOption) => option.label}
                options={options}
                loading={loading}
                onInputChange={onInputChange}
                defaultValue={defaultMultipleValue}
                onChange={onChange}
                renderInput={params => {
                    return (
                        <TextField
                            {...field}
                            {...params}
                            fullWidth={fullWidth}
                            label={label}
                            helperText={errorText || helperText}
                            error={!!errorText}
                            InputLabelProps={{
                                className: classes.label
                            }}
                            variant={variant as any}
                            placeholder={placeholder}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {loading ? (
                                            <CircularProgress
                                                color="inherit"
                                                size={20}
                                            />
                                        ) : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                )
                            }}
                        />
                    );
                }}
            />
        );
    }

    // const currentOption = options.find(o => o.value === field.value);

    return (
        <Autocomplete
            filterOptions={(shouldFilterOptions) ? (options) => {
                return options;
            } : undefined}
            onFocus={() => (options.length ? setOpen(true) : setOpen(false))}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            filterSelectedOptions={true}
            getOptionSelected={(option, userInput) =>
                option.value === userInput.value
            }
            getOptionLabel={(option: TOption) => option.label}
            options={options}
            loading={loading}
            // This gives a warning about changing a controlled input of type text to be uncontrolled.
            // Thereby I disable it temporarily until I understand whether it should be used.
            // inputValue={field.value ? currentOption && currentOption.label : ""}
            onInputChange={onInputChange}
            defaultValue={defaultSingleValue}
            onChange={onChange}
            renderInput={params => {
                return (
                    <TextField
                        autoFocus={autoFocus}
                        {...params}
                        {...field}
                        fullWidth={fullWidth}
                        label={label}
                        helperText={errorText || helperText}
                        error={!!errorText}
                        InputLabelProps={{
                            ...params.InputLabelProps,
                            className: classes.label
                        }}
                        variant={variant as any}
                        placeholder={placeholder}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? (
                                        <CircularProgress
                                            color="inherit"
                                            size={20}
                                        />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            )
                        }}
                    />
                );
            }}
        />
    );
};

export default FormReactSelectField;
