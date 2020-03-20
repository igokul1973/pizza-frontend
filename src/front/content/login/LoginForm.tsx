import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import FormField from "../../../components/inputs/FormField";
import { TextField, Grid, Button } from "@material-ui/core";

interface IProps {
    formSubmitted: ({ fields, errors, isValid }: any) => Promise<any>;
}

export interface ILoginFormValues {
    email: string;
    password: string;
}

const initialValues: ILoginFormValues = {
    email: "",
    password: ""
};

const validationSchema = Yup.object({
    email: Yup.string().required(),
    password: Yup.string().required()
});

const LoginForm: React.FC<IProps> = ({ formSubmitted }) => {
    const submitForm = (values: ILoginFormValues) => {
        formSubmitted(values);
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={submitForm}
            validationSchema={validationSchema}
        >
            {values => (
                <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormField
                                name="email"
                                control={TextField}
                                placeholder="Email"
                                autoFocus={true}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormField
                                name="password"
                                control={TextField}
                                type="password"
                                placeholder="Password"
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                color="primary"
                                type="submit"
                                variant="contained"
                            >
                                Log in
							</Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;