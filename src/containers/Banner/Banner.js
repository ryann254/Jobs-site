/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback } from "react";
import { Waypoint } from "react-waypoint";
import { useStickyDispatch } from "contexts/app/app.provider";
import bgImg from "image/landing.jpg";
import SearchContainer from "containers/Search/SearchContainer";

const Banner = () => {
  const useDispatch = useStickyDispatch();
  const setSticky = useCallback(
    () => useDispatch({ type: "SET_STICKY" }),
    [useDispatch],
  );
  const removeSticky = useCallback(
    () => useDispatch({ type: "REMOVE_STICKY" }),
    [useDispatch],
  );

  const onWaypointPositionChange = ({ currentPosition }) => {
    if (!currentPosition || currentPosition === "above") {
      setSticky();
    }
  };

  return (
    <div
      id="banner"
      className="with-transparent-header parallax background"
      style={{
        backgroundImage: `url(${bgImg})`,
        maxHeight: "100vh",
        height: "100vh",
      }}
      data-img-width={2000}
      data-img-height={1330}
      data-diff={300}
    >
      <div className="container">
        <div className="sixteen columns">
          <div className="search-container">
            {/* Form */}
            <h2>Great Careers Start Here</h2> <SearchContainer />
            <Waypoint
              onEnter={removeSticky}
              onLeave={setSticky}
              onPositionChange={onWaypointPositionChange}
            />
            {/* Browse Jobs */}
            <div className="browse-jobs">
              Browse job offers by{" "}
              <a href="browse-categories.html"> category</a> or{" "}
              <a href="/">job titles</a>
            </div>
            {/* Announce */}
            <div className="announce">
              We’ve over <strong>15,000</strong> internship offers for you!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
