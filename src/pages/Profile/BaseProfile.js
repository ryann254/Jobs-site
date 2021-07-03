import React from "react";
import { useAlert } from "react-alert";
import { Form, Formik } from "formik";
import FormikControl from "containers/FormikContainer/FormikControl";
import { maybe } from "core/utils";
import {
  TypedBaseProfileMutation,
  TypedAvatarUpdateMutation,
} from "./mutations";
import Button from "components/Button/Button";
import { normalizeErrors } from "helpers";
import { baseProfileSchema } from "./validation.schema";
import LogoImage from "image/thedb.png";
import { AuthContext } from "contexts/auth/auth.context";

const BaseProfile = () => {
  const alert = useAlert();
  const {
    authState: { profile },
  } = React.useContext(AuthContext);
  const initialValues = {
    avatar: profile?.avatar?.url ? profile.avatar.url : LogoImage,
    firstName: "",
    lastName: "",
  };
  const handleMemberAvatarUpdate = (data, errors) => {
    if (errors) {
      console.log("Server Error kwa login", errors[0].message);
      return errors[0].message;
    }
    const successful = maybe(() => data.userAvatarUpdate.success);

    if (successful) {
      alert.show(
        {
          title: "Avatar Update Successful",
        },
        { type: "success", timeout: 5000 },
      );
    } else {
      const err = maybe(() => data.userAvatarUpdate.errors, []);

      if (err) {
        const nonFieldErr = normalizeErrors(
          maybe(() => data.userAvatarUpdate.errors, []),
        );
        alert.show(
          {
            title: nonFieldErr?.nonFieldErrors,
          },
          { type: "error", timeout: 5000 },
        );
      }
    }
  };
  const showNotification = (data, errors, alert) => {
    console.log(errors);
    if (errors) {
      console.log("Server Error kwa login", errors[0].message);
      return errors[0].message;
    }

    const successful = maybe(() => data.updateAccount.success);

    if (successful) {
      alert.show(
        {
          title: "Update Successful",
        },
        { type: "success", timeout: 5000 },
      );
    } else {
      const err = maybe(() => data.updateAccount.errors, []);

      if (err) {
        const nonFieldErr = normalizeErrors(
          maybe(() => data.updateAccount.errors, []),
        );
        alert.show(
          {
            title: nonFieldErr?.nonFieldErrors,
          },
          { type: "error", timeout: 5000 },
        );
      }
    }
  };

  return (
    <TypedBaseProfileMutation
      onCompleted={(data, errors) => showNotification(data, errors, alert)}
    >
      {(updateAccount, { loading }) => {
        function onSubmit(values, { setErrors, setSubmitting }) {
          console.log(values);
          updateAccount({
            variables: values,
          }).then(({ data }) => {
            console.log(data);
            if (data) {
              if (data.updateAccount) {
                if (!data.updateAccount.success) {
                  // setErrors(normalizeErrors(data.updateAccount.errors));
                  setErrors(
                    normalizeErrors(maybe(() => data.updateAccount.errors, [])),
                  );
                }
              }
            }
          });
        }

        return (
          <Formik
            initialValues={initialValues}
            validationSchema={baseProfileSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <div className="my-profile">
                    <FormikControl
                      control="input"
                      type="text"
                      label="First Name"
                      placeholder="First Name"
                      name="firstName"
                    />
                    <FormikControl
                      control="input"
                      type="text"
                      label="Last Name"
                      placeholder="Last Name"
                      name="lastName"
                    />
                    {/* <FormikControl
                      control="input"
                      type="text"
                      label="Facebook"
                      placeholder="https://www.facebook.com/"
                      name="facebook"
                      icon="fa fa-facebook-square"
                      iconPosition="left"
                    />
                    <FormikControl
                      control="input"
                      type="text"
                      label="Twitter Handle"
                      placeholder="https://www.twitter.com/"
                      name="twitter"
                      icon="fa fa-twitter"
                      iconPosition="left"
                    />
                    <FormikControl
                      control="input"
                      type="text"
                      label="LinkedIn"
                      placeholder="https://www.linkedin.com/"
                      name="linkedin"
                      icon="fa fa-linkedin-square"
                      iconPosition="left"
                    /> 
                    <FormikControl
                      control="input"
                      type="text"
                      label="Instagram"
                      placeholder="https://www.instagram.com/"
                      name="instagram"
                      icon="fa fa-instagram"
                      iconPosition="left"
                    />*/}

                    <TypedAvatarUpdateMutation
                      onCompleted={(data, errors) =>
                        handleMemberAvatarUpdate(data, errors, alert)
                      }
                    >
                      {(updateAvatar) => {
                        const handleAvatarChange = (file) => {
                          for (let i = 0; i < file.length; i++) {
                            const f = file[i];
                            updateAvatar({
                              variables: { image: f },
                            })
                              .then((res) => {
                                handleMemberAvatarUpdate(res.data, null, alert);
                              })
                              .catch((err) => console.log(err));
                          }
                        };

                        return (
                          <FormikControl
                            control="file"
                            type="file"
                            setFieldValue={formik.setFieldValue}
                            version="profile"
                            directUpload={true}
                            action={handleAvatarChange}
                            label="Profile Image"
                            name="avatar"
                          />
                        );
                      }}
                    </TypedAvatarUpdateMutation>

                    <Button
                      type="submit"
                      disabled={!formik.isValid}
                      fullwidth
                      loading={loading}
                      title={loading ? "Saving... " : "Save"}
                      className="button margin-top-15"
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
        );
      }}
    </TypedBaseProfileMutation>
  );
};

export default BaseProfile;
