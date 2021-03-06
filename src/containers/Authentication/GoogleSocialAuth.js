import React, { useState } from "react";
// import { axiosInstance } from "utils/axios";
import { Google } from "components/AllSvgIcon";
import GoogleLogin from "react-google-login";
import Button from "components/Button/Button";
// import { AuthContext } from "contexts/auth/auth.context";
// import { useAlert } from "react-alert";
// import { addArrayToLocalStorage, parseJwt } from "utils";
// import { useHistory } from "react-router-dom";
// import { tokenConfig } from "utils/axios";
// import { addObjectToLocalStorageObject } from "utils";
import { logToConsole } from "utils/logging";
import { TypedGoogleAuthMutation } from "graphql/mutations";
import { maybe } from "core/utils";

function GoogleSocialAuth() {
  // const { state, authDispatch } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(Boolean());
  // const history = useHistory();
  // const alert = useAlert();
  // const googleResponse = (response) => {
  //   logToConsole(response);
  // };

  return (
    <TypedGoogleAuthMutation>
      {(googleAuthLogin, { loading }) => {
        const googleLogin = async (accesstoken) => {
          googleAuthLogin({
            variables: { accessToken: accesstoken.accessToken },
          }).then(({ data }) => {
            const successful = maybe(() => data.tokenAuth.success);
            console.log(successful);
          });

          setIsLoading(true);
          logToConsole(accesstoken);
          logToConsole(accesstoken.accessToken);

          // await axiosInstance
          //   .post(`/google/`, {
          //     access_token: accesstoken.accessToken,
          //   })
          //   .then(async (res) => {
          //     logToConsole("google response from django", res);
          //     const userPayload = parseJwt(res.data.refresh_token);
          //     logToConsole("user payload", userPayload);
          //     const roles = userPayload.role;
          //     if (roles) {
          //       localStorage.removeItem("thedb_auth_roles");
          //       addArrayToLocalStorage("thedb_auth_roles", roles);
          //     }

          //     await localStorage.setItem("access_token", `${res.data.access_token}`);
          //     await localStorage.setItem(
          //       "refresh_token",
          //       `${res.data.refresh_token}`,
          //     );
          //     await localStorage.setItem("thedb_email", res.data.user.email);
          //     await localStorage.setItem("thedb_name", res.data.user.first_name);
          //     setIsLoading(false);
          //     axiosInstance.get("/auth/profile/", tokenConfig()).then((res) => {
          //       logToConsole(res);
          //       logToConsole(res.data.phone_number);
          //       if (res.data.phone_number) {
          //         const roles = [];
          //         if (res.data.is_student) {
          //           roles.push("student");
          //           localStorage.removeItem("thedb_auth_roles");
          //           addArrayToLocalStorage("thedb_auth_roles", roles);
          //         }
          //         if (res.data.is_publisher) {
          //           roles.push("publisher");
          //           localStorage.removeItem("thedb_auth_roles");
          //           addArrayToLocalStorage("thedb_auth_roles", roles);
          //         }
          //         if (res.data.is_teacher) {
          //           roles.push("teacher");
          //           localStorage.removeItem("thedb_auth_roles");
          //           addArrayToLocalStorage("thedb_auth_roles", roles);
          //         }
          //         const auth_profile = res.data;
          //         addObjectToLocalStorageObject("thedb_auth_profile", auth_profile);
          //         authDispatch({
          //           type: "UPDATE",
          //           payload: {
          //             ...state,
          //             profile: auth_profile,
          //           },
          //         });
          //         history.push("/dashboard");
          //       } else {
          //         authDispatch({
          //           type: "COMPLETEGOOGLELOGIN",
          //           payload: {
          //             ...state,
          //           },
          //         });
          //       }
          //     });

          //     logToConsole(res);
          //     return await res.status;
          //   })
          //   .catch((err) => {
          //     setIsLoading(false);
          //     if (err.response) {
          //       if (err.response.data) {
          //         if (err.response.data.non_field_errors) {
          //           alert.error(err.response.data.non_field_errors[0]);
          //           logToConsole(err.response.data.non_field_errors[0]);
          //         }
          //         logToConsole(err.response.data);
          //       }
          //       logToConsole(err.response);
          //     }
          //     logToConsole(err);
          //   });
        };
        return (
          <GoogleLogin
            render={(renderProps) => (
              <Button
                fullwidth
                title={"Continue with Google"}
                isLoading={isLoading}
                className="google"
                icon={<Google />}
                iconPosition="left"
                iconStyle={{ color: "#ffffff", marginRight: 5 }}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                style={{ color: "#ffffff" }}
              />
            )}
            // clientId={
            //   process.env.REACT_APP_GOOGLE_CLIENT_ID ||
            //   "948225711672-3553sbnjkq2kcuma94grhd4hl7935ahp.apps.googleusercontent.com"
            // }
            clientId={
              "948225711672-3553sbnjkq2kcuma94grhd4hl7935ahp.apps.googleusercontent.com"
            }
            onSuccess={(accesstoken) => googleLogin(accesstoken)}
            onFailure={(accesstoken) => googleLogin(accesstoken)}
            cookiePolicy={"single_host_origin"}
          />
        );
      }}
    </TypedGoogleAuthMutation>
  );
}

export default GoogleSocialAuth;
