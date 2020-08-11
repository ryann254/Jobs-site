/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CardWrapper, FormWrapper } from "./Gigs.style";
import FormikControl from "containers/FormikContainer/FormikControl";
import axios from "axios";
import { BASE_URL } from "constants/constants";
import { tokenConfig } from "helpers";
import Button from "components/Button/Button";
import { useAppState } from "contexts/app/app.provider";
import { useRouteMatch } from "react-router-dom";
import { useStickyDispatch } from "contexts/app/app.provider";
import { Industries } from "pages/common/industry";

function GigManage() {
  const match = useRouteMatch();
  const industry = Industries;
  const [initialValues, setInitialValues] = useState([]);
  const useDispatch = useStickyDispatch();
  const setList = useCallback(() => useDispatch({ type: "MANAGE" }), [
    useDispatch,
  ]);
  const setForm = useCallback(() => useDispatch({ type: "EDIT" }), [
    useDispatch,
  ]);
  const currentForm = useAppState("currentForm");
  console.log("app state", currentForm);
  const isEdit = currentForm === "edit";
  useEffect(() => {
    setList();
    // axios
    //   .get(`${BASE_URL}/industry/`, tokenConfig())
    //   .then((res) => {
    //     const arr = res.data.results;
    //     const result = arr.reduce((acc, d) => {
    //       acc.push({
    //         key: d.name,
    //         value: d.id,
    //       });
    //       return acc;
    //     }, []);
    //     setIndustry(result);
    //   })
    //   .catch((err) => {
    //     console.log("error", err);
    //   });
    axios
      .get(`${BASE_URL}/jobs/${match.params.jobID}/`, tokenConfig())
      .then((res) => {
        const arr = res.data;
        console.log("array jobs", arr);
        // setJob(arr);
        setInitialValues(arr);
      })
      .catch((err) => {
        console.log("error", err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const minQualificationsOptions = [
    { value: "", key: "Select your Qualification" },
    { value: "none", key: "None" },
    { value: "pri", key: "Primary" },
    { value: "sec", key: "Secondary" },
    { value: "cert", key: "Certificate" },
    { value: "dip", key: "Diploma" },
    { value: "bsc", key: "BSc" },
    { value: "msc", key: "MSc" },
    { value: "phd", key: "PhD" },
  ];
  const experienceOptions = [
    { value: "", key: "Select Years of experience" },
    { value: "entry", key: "Entry Level" },
    { value: "1-2", key: "1-2 years" },
    { value: "3-5", key: "3-5 years" },
    { value: "6-10", key: "6-10 years" },
    { value: "above 10", key: "Above 10 years" },
  ];

  // const initialValues = {
  //   creator: localStorage.getItem("thedb_auth_profile") ? profile.id : "",
  //   title: "",
  //   industry: "",
  //   location: "",
  //   salary: "",
  //   description: "",
  //   job_type: "gig",
  //   experience: [],
  //   qualifications: [],
  //   courseDate: null,
  // };

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    industry: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    salary: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    experience: Yup.string().required("Required"),
    qualifications: Yup.string().required("Required"),
    // courseDate: Yup.date().required("Required").nullable(),
  });

  const onSubmit = async (values, { setErrors, setSubmitting }) => {
    console.log("val8es fdsf ", values);
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    axios
      .post(`${BASE_URL}/jobs/`, values, tokenConfig())
      .then((res) => {
        setSubmitting(false);
        console.log("res", res.data);
      })
      .catch((err) => {
        setSubmitting(false);
        console.log("error", err);

        setErrors(err.response.data);
      });
  };

  return (
    <CardWrapper>
      <h4>
        Manage Gig
        <Button
          onClick={isEdit ? setList : setForm}
          size="small"
          title={isEdit ? `Manage Applications` : `Edit Post`}
          style={{
            fontSize: 15,
            color: "#5918e6",
            backgroundColor: "#e6c018",
            float: "right",
          }}
        />
      </h4>
      {currentForm === "edit" && (
        <FormWrapper>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <FormikControl
                    control="input"
                    type="text"
                    label="Title"
                    name="title"
                  />
                  <FormikControl
                    control="select"
                    label="Industry"
                    name="industry"
                    options={industry}
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    label="Salary"
                    name="salary"
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    label="Location"
                    name="location"
                  />
                  <FormikControl
                    control="select"
                    label="Qualification"
                    name="qualifications"
                    options={minQualificationsOptions}
                  />
                  <FormikControl
                    control="select"
                    label="Experience"
                    name="experience"
                    options={experienceOptions}
                  />
                  <FormikControl
                    control="textarea"
                    label="description"
                    name="description"
                  />
                  <Button
                    type="submit"
                    size="small"
                    title={formik.isSubmitting ? "Submitting... " : "Submit"}
                    style={{ fontSize: 15, color: "#fff" }}
                    disabled={!formik.isValid}
                  />
                </Form>
              );
            }}
          </Formik>
        </FormWrapper>
      )}
      {currentForm === "manage" && (
        <ul>
          <li>applicant one</li>
          <li>applicant two</li>
        </ul>
      )}
    </CardWrapper>
  );
}

export default GigManage;
