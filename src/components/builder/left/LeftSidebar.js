import { Element } from "react-scroll";
import React, { Fragment, memo } from "react";
import SettingsContext from "contexts/settings/settings.provider";
import * as styles from "./LeftSidebar.module.css";
import Awards from "./sections/Awards";
import Certifications from "./sections/Certifications";
import Education from "./sections/Education";
import Hobbies from "./sections/Hobbies";
import Languages from "./sections/Languages";
import LeftNavbar from "./LeftNavbar";
import Objective from "./sections/Objective";
import Profile from "./sections/Profile";
import Projects from "./sections/Projects";
import References from "./sections/References";
import Skills from "./sections/Skills";
import Social from "./sections/Social";
import Work from "./sections/Work";
import sections from "data/leftSections";

const getComponent = (id) => {
  switch (id) {
    case "profile":
      return Profile;
    case "social":
      return Social;
    case "objective":
      return Objective;
    case "work":
      return Work;
    case "education":
      return Education;
    case "project":
      return Projects;
    case "award":
      return Awards;
    case "certification":
      return Certifications;
    case "skill":
      return Skills;
    case "hobby":
      return Hobbies;
    case "language":
      return Languages;
    case "reference":
      return References;
    default:
      throw new Error();
  }
};

const SidebarSection = ({ id, event }) => {
  const Component = getComponent(id);

  return (
    <Fragment key={id}>
      <Element name={id}>
        <Component id={id} event={event} />
      </Element>
      <hr />
    </Fragment>
  );
};

const LeftSidebar = () => {
  const { isSideBarOpen } = React.useContext(SettingsContext);
  return (
    <div className="flex">
      <LeftNavbar />

      {isSideBarOpen && (
        <div id="LeftSidebar" className={styles.container}>
          {sections.map(SidebarSection)}
        </div>
      )}
    </div>
  );
};

export default memo(LeftSidebar);
