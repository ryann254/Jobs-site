import React from "react";
import { Form, Formik } from "formik";
import FormikControl from "containers/FormikContainer/FormikControl";
import Button from "components/Button/Button";
import { vacancySchema } from "./validation.schema";

import Box from "@material-ui/core/Box";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";

const steps = ["Overview", "Detail", "Publish"];
// const steps = ["Overview", "Detail", "Sceening", "Publish"];

const StepOne = ({ formik, jobType }) => {
  return (
    <div className="form grid grid-cols-2 gap-6">
      <FormikControl
        control="input"
        type="text"
        label="Title"
        placeholder="Front Desk Assistant"
        name="title"
      />
      <FormikControl
        control="select"
        hideButton={() => {}}
        label="Job Type"
        name="jobType"
        style={{ margin: 0 }}
        options={jobType}
        defaultValue={formik.values.jobType}
      />
      <FormikControl
        control="input"
        type="number"
        label="Open Positions"
        name="positions"
      />
      <FormikControl
        control="location"
        type="text"
        label="Office Location"
        name="location"
        placeholder="e.g. Nairobi, Kasarani - Corner"
      />
      <FormikControl
        control="input"
        type="number"
        label="Salary"
        placeholder="Salary"
        name="salary"
      />
      <FormikControl
        control="date"
        label="Closing Date"
        name="closingDate"
        minDate={new Date()}
      />
    </div>
  );
};
const StepTwo = ({ formik, qualification, rate, experience, industries }) => {
  return (
    <>
      <div className="form grid grid-cols-2 gap-6">
        <FormikControl
          control="select"
          hideButton={() => {}}
          label="Minimum Education Qualification"
          name="minQualification"
          style={{ margin: 0 }}
          options={qualification}
          defaultValue={formik.values.minQualification}
        />

        <FormikControl
          control="select"
          hideButton={() => {}}
          label="Pay Rate"
          name="payRate"
          style={{ margin: 0 }}
          options={rate}
          defaultValue={formik.values.payRate}
        />

        <FormikControl
          control="select"
          hideButton={() => {}}
          label="Years of Experience required"
          name="yearsOfExp"
          style={{ margin: 0 }}
          options={experience}
          defaultValue={formik.values.experience}
        />
        <FormikControl
          control="input"
          type="link"
          label="Application link"
          name="applicationUrl"
        />
        <FormikControl
          control="select"
          hideButton={() => {}}
          label="Industry"
          name="industry"
          options={industries}
          defaultValue={formik.values.industries}
          //   isMulti={true}
        />
      </div>
      <div className="form" style={{ width: "100%" }}>
        <FormikControl
          control="textarea"
          label="Job Description, requirements, duties and more information"
          name="description"
          rte={true}
          fullWidth
        />
        <h3>
          NB : copy and paste as plain text to add pre-compiled description
        </h3>
      </div>
    </>
  );
};
const StepThree = ({ formik, loading, setPublish }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <card className="grid grid-cols-6 max-w-5xl rounded-xl bg-blue-800 my-2">
        <div className="col-span-4">
          <h2 className="font-bold text-3xl text-white ml-10 mt-8">
            Save and Publish Now
          </h2>
          <p className="font-light text-white text-sm ml-10 mt-5">
            You're one step away from Getting the right employees. Publish your
            listing directly to the listings page and get the Workforce that
            suits you.
          </p>
          <div onClick={() => setPublish(true)}>
            <Button
              type="submit"
              disabled={!formik.isValid}
              isLoading={loading}
              title={
                loading ? (
                  "Publishing... "
                ) : (
                  <>
                    Save and Publish
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline-block h-6 w-6 group-hover:translate-x-2 transition delay-100 transition-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </>
                )
              }
              className="text-white font-semibold ml-10 mt-5 mb-8 group"
              // className="button margin-top-15"
            />
          </div>
        </div>
        <div className="col-span-2 relative">
          <img
            src="https://www.digitalocean.com/_next/static/media/cloudJourneyImage.954519ea.svg"
            className="absolute bottom-0 right-0"
            alt="loop"
          />
        </div>
      </card>
      <card className="grid grid-cols-6 max-w-5xl rounded-xl bg-blue-800 my-2">
        <div className="col-span-4">
          <h2 className="font-bold text-3xl text-white ml-10 mt-8">
            Save and Publish Later
          </h2>
          <p className="font-light text-white text-sm ml-10 mt-5">
            You can Alternatively Save your post and publish later. The job post
            will not appear on the listings page.
          </p>
          <div onClick={() => setPublish(false)}>
            <Button
              type="submit"
              disabled={!formik.isValid}
              isLoading={loading}
              title={
                loading ? (
                  "Saving... "
                ) : (
                  <>
                    Save
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline-block h-6 w-6 group-hover:translate-x-2 transition delay-100 transition-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </>
                )
              }
              className="text-white font-semibold ml-10 mt-5 mb-8 group"
              // className="button margin-top-15"
            />
          </div>
        </div>
        <div className="col-span-2 relative">
          <img
            src="https://www.digitalocean.com/_next/static/media/cloudJourneyImage.954519ea.svg"
            className="absolute bottom-0 right-0"
            alt="loop"
          />
        </div>
      </card>
    </div>
  );
};
const VacancyForm = ({
  initialValues,
  onSubmit,
  loading,
  industries,
  experience,
  qualification,
  jobType,
  rate,
  setPublish,
}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 6;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={vacancySchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(formik) => {
        return (
          <div class="grid grid-cols-12 gap-6">
            <div className="col-span-12 sm:col-span-12 md:col-span-7 lg:col-span-8 xxl:col-span-8">
              <section className="py-1 bg-blueGray-50">
                <div className="w-full px-4 mx-auto mt-6">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                      <Box sx={{ width: "100%" }}>
                        <Stepper activeStep={activeStep}>
                          {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            if (isStepOptional(index)) {
                              labelProps.optional = (
                                <Typography variant="caption">
                                  Optional
                                </Typography>
                              );
                            }
                            if (isStepSkipped(index)) {
                              stepProps.completed = false;
                            }
                            return (
                              <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                              </Step>
                            );
                          })}
                        </Stepper>
                      </Box>
                    </div>
                    <div className="flex-auto px-4 lg:px-10 py-10 bg-gray-100">
                      <Form>
                        <div>
                          {activeStep === 0 && (
                            <StepOne formik={formik} jobType={jobType} />
                          )}
                          {activeStep === 1 && (
                            <StepTwo
                              formik={formik}
                              qualification={qualification}
                              rate={rate}
                              experience={experience}
                              industries={industries}
                              setPublish={setPublish}
                            />
                          )}
                          {activeStep === 2 && (
                            <StepThree
                              setPublish={setPublish}
                              formik={formik}
                              loading={loading}
                            />
                          )}

                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              pt: 2,
                            }}
                          >
                            <Button
                              color="inherit"
                              disabled={activeStep === 0}
                              onClick={handleBack}
                              sx={{ mr: 1 }}
                            >
                              Back
                            </Button>
                            <Box sx={{ flex: "1 1 auto" }} />
                            {isStepOptional(activeStep) && (
                              <Button
                                color="inherit"
                                onClick={handleSkip}
                                sx={{ mr: 1 }}
                              >
                                Skip
                              </Button>
                            )}
                            {activeStep === steps.length - 1 ? null : (
                              <Button onClick={handleNext}>
                                {activeStep === steps.length - 1
                                  ? "Finish"
                                  : "Next"}
                              </Button>
                            )}
                          </Box>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </section>{" "}
            </div>

            <div className="col-span-12 sm:col-span-12 md:col-span-5 lg:col-span-4 xxl:col-span-4">
              <div className="py-1 px-1 rounded-lg my-6 mx-1">
                <i
                  class="fa fa-lightbulb-o"
                  style={{
                    fontSize: "48px",
                    color: "#1849B1",
                  }}
                />
                <div className="my-4" />
                <h1 className="text-blueGray-700 text-xl font-bold">
                  Why use screening questions?
                </h1>
                Your job post is targeted to people who match your requirements,
                and you’ll be notified of applicants who pass your screening
                questions.
                <div className="my-4" />
                <h1 className="text-blueGray-700 text-xl font-bold">
                  Will my network know that I’m hiring?
                </h1>
                When you post your job, we’ll notify close connections that
                you’re hiring to help increase your job post’s visibility. Close
                connections can choose to share your job post to help you reach
                qualified candidates.
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default VacancyForm;
