import { useTranslation } from "react-i18next";
import React, { memo } from "react";
import { useSelector } from "contexts/resume/resume.provider";

const Heading = ({ id }) => {
  const { t } = useTranslation();
  const heading = useSelector(`${id}.heading`, t(`builder.sections.${id}`));

  return <h2 className="text-4xl focus:outline-none">{heading}</h2>;
};

export default memo(Heading);
