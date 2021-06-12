import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import styled from "styled-components";
import Uploader from "components/Uploader/Uploader";

function UploadInput(props) {
  const { label, name, file, setFieldValue, icon, ...rest } = props;

  return (
    <FormInput className={`form-row form-row-wide`}>
      <label htmlFor={name}>
        {label}
        <i className={`ln ${icon}`}></i>
        <Field name={name}>
          {({ form, field }) => {
            const { setFieldValue } = form;
            const { value } = field;
            return (
              <Uploader
                id={name}
                name={name}
                selected={value}
                {...field}
                {...rest}
                onChange={(val) => setFieldValue(name, val)}
                imageURL={value}
                onBlur={(e) => field.onBlur(e)}
              />
            );
          }}
        </Field>
        <ErrorMessage component={TextError} name={name} />
      </label>
    </FormInput>
  );
}

export default UploadInput;

const FormInput = styled.p`
  .error {
    color: palevioletred;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    font-style: italic;
  }
`;
