/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useCallback } from "react";
import { useRouterQuery } from "helpers/useRouterQuery";
import { useLocation, useHistory } from "react-router-dom";
import { Waypoint } from "react-waypoint";
import SearchBox from "components/SearchBox/SearchBox";
import { SearchContext } from "contexts/search/search.context";
import { useStickyDispatch } from "contexts/app/app.provider";
import {
  BannerWrapper,
  BannerHeading,
  BannerSubHeading,
  BannerComponent,
} from "./Banner.style";

const Banner = ({ imageUrl }) => {
  const { state, dispatch } = useContext(SearchContext);
  const history = useHistory();
  const location = useLocation();
  const query = useRouterQuery();

  const pathname = location.pathname;

  const handleSearchInput = (text) => {
    dispatch({
      type: "UPDATE",
      payload: {
        ...state,
        text,
      },
    });
  };

  function handleClickSearchButton(searchValue) {
    const categoryParam = query.get("category") ? query.get("category") : ``;

    const queryParams = query.get("category")
      ? `category=${categoryParam}&text=${searchValue}`
      : `&text=${searchValue}`;
    console.log("pathname or location", pathname);

    history.push(`${pathname}?${queryParams}`);
  }
  const useDispatch = useStickyDispatch();
  const setSticky = useCallback(() => useDispatch({ type: "SET_STICKY" }), [
    useDispatch,
  ]);
  const removeSticky = useCallback(
    () => useDispatch({ type: "REMOVE_STICKY" }),
    [useDispatch]
  );

  const onWaypointPositionChange = ({ currentPosition }) => {
    if (!currentPosition || currentPosition === "above") {
      setSticky();
    }
  };

  return (
    <BannerWrapper
      style={{
        backgroundImage: `linear-gradient(      to right,      #e6c018,      #e6c018    ),url(${imageUrl})`,
      }}
    >
      <BannerComponent>
        <BannerHeading>The Database - Jobs Need People</BannerHeading>
        <BannerSubHeading>
          Stay on top of shifting job markets by using a platform that gives you
          flexibility. Get or Post a Gig, Employ or Meet Dream Employers on
          TheDB.
        </BannerSubHeading>
        <BannerSubHeading>
          Get or Post a Gig, Employ or Meet Dream Employers on TheDB.
        </BannerSubHeading>

        <SearchBox
          style={{
            width: 700,
            boxShadow: "0 21px 36px rgba(0,0,0,0.05)",
            borderRadius: "6px",
            overflow: "hidden",
          }}
          handleSearch={(value) => handleSearchInput(value)}
          value={state.text || ""}
          onClick={handleClickSearchButton}
          className="banner-search"
          pathname={pathname}
        />
        <Waypoint
          onEnter={removeSticky}
          onLeave={setSticky}
          onPositionChange={onWaypointPositionChange}
        />
      </BannerComponent>
    </BannerWrapper>
  );
};
export default Banner;