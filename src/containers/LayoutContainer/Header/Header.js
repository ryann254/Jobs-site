import React, { useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { openModal } from "@redq/reuse-modal";
import SearchBox from "components/SearchBox/SearchBox";
import { SearchContext } from "contexts/search/search.context";
import { AuthContext } from "contexts/auth/auth.context";
import AuthenticationForm from "../../SignInOutForm/Form";
import { RightMenu } from "./Menu/RightMenu/RightMenu";
import { LeftMenu } from "./Menu/LeftMenu/LeftMenu";
import HeaderWrapper from "./Header.style";
import UserImage from "image/user.jpg";
import LogoImage from "image/logo.svg";
import { isCategoryPage } from "../is-home-page";

const Header = ({ className }) => {
  const location = useLocation();
  const history = useHistory();
  const path = location.pathname.replace(/\/+$/, "");
  const pathname = path[0] === "/" ? path.substr(1) : path;
  const query = new URLSearchParams(location.search);
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = React.useContext(AuthContext);
  const { state, dispatch } = useContext(SearchContext);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      authDispatch({ type: "SIGN_OUT" });
      history.push("/");
    }
  };

  const handleJoin = () => {
    authDispatch({
      type: "SIGNIN",
    });

    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: AuthenticationForm,
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
  const onSearch = (text) => {
    dispatch({
      type: "UPDATE",
      payload: {
        ...state,
        text,
      },
    });
  };

  const onClickHandler = (searchValue) => {
    const categoryParam = query.get("category") ? query.get("category") : "";

    const queryParams = query.get("category")
      ? `category=${categoryParam}&text=${searchValue}`
      : `&text=${searchValue}`;
    console.log("pathname or location", pathname);

    history.push(`${pathname}?${queryParams}`);
  };
  const showSearch = isCategoryPage(pathname);
  return (
    <HeaderWrapper className={className}>
      <LeftMenu logo={LogoImage} />
      {showSearch && (
        <SearchBox
          className="headerSearch"
          handleSearch={(value) => onSearch(value)}
          onClick={(value) => onClickHandler(value)}
          placeholder="Search anything..."
          hideType={true}
          minimal={true}
          showSvg={true}
          style={{ width: "100%" }}
          value={state.text || ""}
        />
      )}
      <RightMenu
        isAuthenticated={isAuthenticated}
        onJoin={handleJoin}
        onLogout={handleLogout}
        avatar={UserImage}
      />
    </HeaderWrapper>
  );
};

export default Header;