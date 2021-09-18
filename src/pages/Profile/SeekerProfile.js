import React from "react";
import { useAlert } from "react-alert";
import { isEmpty } from "lodash";
import moment from "moment";

import Loader from "components/Loader/Loader";
import UserContext from "contexts/user/user.provider";
import SeekerForm from "./SeekerForm";
import NetworkStatus from "components/NetworkStatus";
import OfflinePlaceholder from "components/OfflinePlaceholder";
import { MetaWrapper } from "components/Meta";
import {
  SEEKER_PROFILE_MUTATION,
  SEEKER_UPDATE_MUTATION,
} from "graphql/mutations";
import { SeekerStatus, SeekerGender, GET_INDUSTRIES } from "graphql/queries";
import { cleanSelectData, setFieldErrors, showNotification } from "helpers";
import { objDiff } from "utils";

import { TypedQuery } from "core/queries";
import { TypedMutation } from "core/mutations";

const TypedSeekerStatus = TypedQuery(SeekerStatus);
const TypedSeekerGender = TypedQuery(SeekerGender);
const TypedIndustriesQuery = TypedQuery(GET_INDUSTRIES);

const TypedSeekerProfileMutation = TypedMutation(SEEKER_PROFILE_MUTATION);
const TypedSeekerUpdateMutation = TypedMutation(SEEKER_UPDATE_MUTATION);

const SeekerProfile = () => {
  const alert = useAlert();
  const { user } = React.useContext(UserContext);
  const [updating, setUpdating] = React.useState(false);

  const initialData = {
    title: "",
    idNumber: "",
    dateOfBirth: "",
    description: "",
    location: "",
    gender: { value: "", label: "Select Gender" },
    mobile: "",
    status: { value: "", label: "Select Options" },
    industries: [],
    user: user ? user?.id : "",
  };

  const cleanIndustries = (data) => {
    return data.reduce((arr, b) => {
      arr.push({
        value: b.id,
        label: b.name,
      });
      return arr;
    }, []);
  };

  const cleanFormData = (data, oldData) => {
    const status = data.status.value;
    const gender = data.gender.value;
    const industries = data.industries.reduce((arr, b) => {
      arr.push(b.value);
      return arr;
    }, []);

    const originalObject = {
      ...oldData,
      status: status,
      gender: gender,
      industries: industries,
      dateOfBirth: moment(data.dateOfBirth).format("YYYY-MM-DD"),
    };
    const newObject = {
      ...data,
      status: status,
      gender: gender,
      industries: industries,
      dateOfBirth: moment(data.dateOfBirth).format("YYYY-MM-DD"),
    };

    const id = updating ? { id: user?.seeker?.id } : {};
    const formData = isEmpty(objDiff(originalObject, newObject, "id"))
      ? null
      : {
          ...newObject,
          ...id,
        };

    return formData;
  };
  const cleanInitialValues = (data, statusOptions, genderOptions) => {
    const obj = {
      status: statusOptions.find(({ value }) => value === data?.status),
      gender: genderOptions.find(({ value }) => value === data?.gender),
      description: data.description,
      title: data.title,
      idNumber: data.idNumber,
      dateOfBirth: data.dateOfBirth,
      location: data.location,
      mobile: data.mobile,
      industries: data.industries.reduce((acc, ind) => {
        acc.push({ value: ind.id, label: ind.name });
        return acc;
      }, []),
    };
    return obj;
  };
  if (!user) {
    return <Loader />;
  }

  return (
    <NetworkStatus>
      {(isOnline) => (
        <TypedSeekerGender>
          {(seekerGender) => {
            if (seekerGender.loading) {
              return <Loader />;
            }
            let genderOptions = [];
            if (seekerGender.data) {
              genderOptions = cleanSelectData(
                seekerGender.data.__type.enumValues,
              );
            }
            return (
              <TypedSeekerStatus>
                {(seekerStatus) => {
                  if (seekerStatus.loading) {
                    return <Loader />;
                  }
                  let statusOptions = [];
                  if (seekerStatus.data) {
                    statusOptions = cleanSelectData(
                      seekerStatus.data.__type.enumValues,
                    );
                  }
                  if (!isOnline) {
                    return <OfflinePlaceholder />;
                  }
                  return (
                    <TypedIndustriesQuery>
                      {(industriesData) => {
                        if (industriesData.loading) {
                          return <Loader />;
                        }
                        let industries = [];
                        if (industriesData.data) {
                          industries = cleanIndustries(
                            industriesData.data.allIndustries,
                          );
                        }
                        let initialValues = initialData;
                        if (user?.isSeeker && user.seeker) {
                          setUpdating(true);
                          initialValues = cleanInitialValues(
                            user?.seeker,
                            statusOptions,
                            genderOptions,
                          );
                        } else {
                          setUpdating(false);
                        }

                        return (
                          <MetaWrapper
                            meta={{
                              description: user.seeker
                                ? "Seeker Profile creation"
                                : user?.seeker?.descriptionPlaintext,
                              title: user.fullName,
                            }}
                          >
                            <TypedSeekerProfileMutation
                              onCompleted={(data, errors) =>
                                showNotification(
                                  data.seekerCreate,
                                  errors,
                                  alert,
                                  "accountErrors",
                                  "Profile Created",
                                )
                              }
                            >
                              {(seekerCreate) => {
                                return (
                                  <TypedSeekerUpdateMutation
                                    onCompleted={(data, errors) =>
                                      showNotification(
                                        data.seekerPatch,
                                        errors,
                                        alert,
                                        "accountErrors",
                                        "Profile Updated",
                                      )
                                    }
                                  >
                                    {(seekerUpdate) => {
                                      function onSubmit(values, { setErrors }) {
                                        const variables = {
                                          variables: cleanFormData(
                                            values,
                                            initialValues,
                                          ),
                                        };
                                        if (
                                          !cleanFormData(values, initialValues)
                                        ) {
                                          showNotification(
                                            null,
                                            null,
                                            alert,
                                            null,
                                            "No Chages Were Made",
                                          );
                                        } else {
                                          const mutationFn = updating
                                            ? seekerUpdate(variables)
                                            : seekerCreate(variables);
                                          mutationFn.then(({ data }) => {
                                            if (data) {
                                              setFieldErrors(
                                                updating
                                                  ? data.seekerUpdate
                                                  : data.seekerCreate,
                                                setErrors,
                                              );
                                            }
                                          });
                                        }
                                      }
                                      return (
                                        <SeekerForm
                                          initialValues={initialValues}
                                          onSubmit={onSubmit}
                                          loading={
                                            updating
                                              ? seekerUpdate.loading
                                              : seekerCreate.loading
                                          }
                                          industries={industries}
                                          statusOptions={statusOptions}
                                          genderOptions={genderOptions}
                                        />
                                      );
                                    }}
                                  </TypedSeekerUpdateMutation>
                                );
                              }}
                            </TypedSeekerProfileMutation>
                          </MetaWrapper>
                        );
                      }}
                    </TypedIndustriesQuery>
                  );
                }}
              </TypedSeekerStatus>
            );
          }}
        </TypedSeekerGender>
      )}
    </NetworkStatus>
  );
};

export default SeekerProfile;
