/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useContext, useCallback } from "react";
import { CardWrapper } from "./Jobs.style";
import axios from "axios";
import { BASE_URL, CURRENCY } from "constants/constants";
import { tokenConfig } from "helpers";
import ImageWrapper from "components/Image/Image";
import {
  LeftContent,
  ListingLogo,
  ListingTitle,
  H4,
  TypeList,
  ListSpan,
  ListingIcons,
} from "styles/pages.style";
import { GiftBox, SearchIcon, LockIcon } from "components/AllSvgIcon";
import Button from "components/Button/Button";
import { useStickyDispatch } from "contexts/app/app.provider";
import { AuthContext } from "contexts/auth/auth.context";
import EmailVerificationModal from "containers/SignInOutForm/emailVerificationModal";
import { openModal, closeModal } from "@redq/reuse-modal";
import ApplicationModal from "pages/common/ApplicationModal";
import Loader from "components/Loader/Loader";
import Error500 from "components/Error/Error500";
import { categorySelector } from "pages/common/helpers";
import { useHistory } from "react-router-dom";
import { Offer, LinkButton } from "pages/common/style";

function MyJobs() {
  const {
    authState: { profile },
  } = useContext(AuthContext);
  const [jobs, setJobs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      axios
        .get(`${BASE_URL}/jobs/`, tokenConfig())
        .then((res) => {
          console.log("industry data", res.data.results);
          setJobs(
            res.data.results.filter(
              (filteredJob) => filteredJob.creator === profile.id
            )
          );
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log("Catching Errors:", err);
          setError(err);
        });
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useDispatch = useStickyDispatch();
  const setManage = useCallback(() => useDispatch({ type: "MANAGE" }), [
    useDispatch,
  ]);
  const setPost = useCallback(() => useDispatch({ type: "POST" }), [
    useDispatch,
  ]);
  const toggleManage = (category, id) => {
    setManage();
    history.push(`/dashboard/${category}/${id}`);
  };
  const togglePost = () => {
    setPost();
  };
  const handleApplication = (jobId) => {
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: localStorage.getItem("thedb_individual_profile")
        ? () => ApplicationModal(jobId)
        : () =>
            EmailVerificationModal(
              `Hey ${profile.full_name}`,
              "Complete your 'Additional Details' profile to apply for this job",
              <Offer style={{ padding: "10px 0" }}>
                Update{" "}
                <LinkButton
                  onClick={() => {
                    closeModal();
                    history.push("/dashboard/profile");
                  }}
                >
                  Profile
                </LinkButton>
              </Offer>
            ),
      closeComponent: "",
      config: {
        enableResizing: false,
        disableDragging: true,
        className: "quick-view-modal",
        width: 458,
        height: "auto",
      },
    });
  };
  const handleModal = (text) => {
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: () => EmailVerificationModal(text),
      closeComponent: "",
      config: {
        enableResizing: false,
        disableDragging: true,
        className: "quick-view-modal",
        width: 458,
        height: "auto",
      },
    });
  };
  if (error) {
    return <Error500 err={error} />;
  }

  return (
    <CardWrapper>
      <H4>
        Jobs You've Posted{" "}
        {profile.is_individual ? null : (
          <Button
            onClick={
              profile.dummy_verified
                ? () => togglePost()
                : () => handleModal("Confirm Email First to post a job")
            }
            size="small"
            title="Post a Job"
            // disabled={!profile.dummy_verified}
            style={{
              fontSize: 15,
              color: "#5918e6",
              backgroundColor: profile.dummy_verified ? "#e6c018" : "#f2f2f2",
              float: "right",
            }}
          />
        )}
      </H4>
      {loading ? (
        <Loader />
      ) : (
        <LeftContent>
          {jobs !== null && jobs.length > 0 ? (
            <ul>
              {jobs
                .filter(
                  (filteredJob) =>
                    filteredJob.job_type !== "gig" &&
                    filteredJob.job_type !== "Gig" &&
                    filteredJob.job_type !== "internship" &&
                    filteredJob.job_type !== "Internship"
                )
                .map((job, index) => (
                  <li key={index}>
                    <section>
                      <ListingLogo>
                        <ImageWrapper
                          url={job.companyLogo}
                          alt={"company logo"}
                        />
                      </ListingLogo>
                      <ListingTitle>
                        <h3>
                          {job.title}

                          <TypeList>
                            <ListSpan className={`${job.job_type}`}>
                              {job.job_type}
                            </ListSpan>

                            {job.creator === profile.id ? (
                              <Button
                                onClick={() =>
                                  toggleManage(
                                    categorySelector(job.job_type),
                                    job.id
                                  )
                                }
                                size="small"
                                title={`Manage Job`}
                                disabled={!profile.dummy_verified}
                                style={{
                                  fontSize: 15,
                                  color: "#5918e6",
                                  backgroundColor: "#e6c018",
                                  float: "right",
                                  height: "29px",
                                  margin: "0 0 0 10px",
                                }}
                              />
                            ) : (
                              <>
                                {profile.is_individual ? (
                                  <>
                                    {localStorage.getItem(
                                      "thedb_applications"
                                    ) ? (
                                      <>
                                        {localStorage
                                          .getItem("thedb_applications")
                                          .includes(job.id) ? (
                                          <Button
                                            onClick={() =>
                                              profile.dummy_verified
                                                ? handleApplication(job.id)
                                                : handleModal()
                                            }
                                            size="small"
                                            title={`Applied ✔`}
                                            disabled={true}
                                            style={{
                                              fontSize: 15,
                                              color: "#5918e6",
                                              backgroundColor: "#f2f2f2",
                                              float: "right",
                                              height: "29px",
                                              margin: "0 0 0 10px",
                                            }}
                                          />
                                        ) : (
                                          <Button
                                            onClick={() =>
                                              profile.dummy_verified
                                                ? handleApplication(job.id)
                                                : handleModal()
                                            }
                                            size="small"
                                            title={`Apply`}
                                            // disabled={!profile.dummy_verified}
                                            style={{
                                              fontSize: 15,
                                              color: "#5918e6",
                                              backgroundColor: profile.dummy_verified
                                                ? "#e6c018"
                                                : "#f2f2f2",
                                              float: "right",
                                              height: "29px",
                                              margin: "0 0 0 10px",
                                            }}
                                          />
                                        )}
                                      </>
                                    ) : (
                                      <Button
                                        onClick={() =>
                                          profile.dummy_verified
                                            ? handleApplication(job.id)
                                            : handleModal()
                                        }
                                        size="small"
                                        title={`Apply`}
                                        // disabled={!profile.dummy_verified}
                                        style={{
                                          fontSize: 15,
                                          color: "#5918e6",
                                          backgroundColor: profile.dummy_verified
                                            ? "#e6c018"
                                            : "#f2f2f2",
                                          float: "right",
                                          height: "29px",
                                          margin: "0 0 0 10px",
                                        }}
                                      />
                                    )}
                                  </>
                                ) : null}
                              </>
                            )}
                          </TypeList>
                        </h3>
                        <ListingIcons>
                          <li>
                            <GiftBox />
                            {job.description}
                          </li>
                          <li>
                            <SearchIcon />
                            {job.location}
                          </li>
                          <li>
                            <LockIcon />
                            {CURRENCY}
                            {job.salary} - {CURRENCY}
                            {job.salary}
                          </li>
                        </ListingIcons>
                      </ListingTitle>
                    </section>
                  </li>
                ))}
            </ul>
          ) : (
            <div>Sorry No Jobs posted recently</div>
          )}
        </LeftContent>
      )}
    </CardWrapper>
  );
}

export default MyJobs;