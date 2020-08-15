/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useContext, useCallback } from "react";
import { CardWrapper } from "./Internships.style";
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

import { AuthContext } from "contexts/auth/auth.context";
import ApplicationModal from "pages/common/ApplicationModal";
import { openModal } from "@redq/reuse-modal";
import EmailVerificationModal from "containers/SignInOutForm/emailVerificationModal";
import Loader from "components/Loader/Loader";
import { useStickyDispatch } from "contexts/app/app.provider";
import Error500 from "components/Error/Error500";
import { categorySelector } from "pages/common/helpers";
import { useHistory } from "react-router-dom";

function InternshipView() {
  const {
    authState: { profile },
  } = useContext(AuthContext);
  const [internships, setInternships] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`${BASE_URL}/jobs/`, tokenConfig())
        .then((res) => {
          console.log("industry data", res.data.results);
          setInternships(res.data.results);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log("Catching Errors:", err);
          setError(err);
        });
    }, 2000);
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
  const handleApplication = (jobId) => {
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: () => ApplicationModal(jobId),
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
        Internships{" "}
        {profile.is_individual ? null : (
          <Button
            onClick={() =>
              profile.dummy_verified
                ? togglePost()
                : handleModal("Confirm Email First to post an internship")
            }
            size="small"
            title="Post Internship"
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
          <ul>
            {internships !== null || internships.length > 0 ? (
              <>
                {internships
                  .filter(
                    (filteredJob) =>
                      filteredJob.job_type === "internship" ||
                      filteredJob.job_type === "Internship"
                  )
                  .map((job, index) => (
                    <li key={index}>
                      {job !== null || job !== undefined ? (
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
                      ) : (
                        <div>Sorry, No Internships posted recently</div>
                      )}
                    </li>
                  ))}
              </>
            ) : (
              <div>Sorry No Internships posted recently</div>
            )}
          </ul>
        </LeftContent>
      )}
    </CardWrapper>
  );
}

export default InternshipView;
