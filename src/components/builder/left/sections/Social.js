import { useTranslation } from "react-i18next";
import React, { memo } from "react";
import Heading from "components/shared/Heading";
import Input from "components/shared/Input";
import List from "../../lists/List";

const Social = ({ id, event }) => {
  const path = `${id}.items`;
  const { t } = useTranslation();

  return (
    <section>
      <Heading id={id} />

      <Input
        name="heading"
        label={t("builder.sections.heading")}
        path={`${id}.heading`}
      />

      <List
        path={path}
        event={event}
        titlePath="network"
        subtitlePath="username"
      />
    </section>
  );
};

export default memo(Social);
