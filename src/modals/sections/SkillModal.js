import * as Yup from "yup";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import React, { memo } from "react";
import { getFieldProps } from "../../utils";
import DataModal from "../DataModal";
import Input from "../../components/shared/Input";
import ModalEvents from "../../constants/ModalEvents";

const initialValues = {
  name: "",
  level: "",
};

const SkillModal = () => {
  const { t } = useTranslation();

  const schema = Yup.object().shape({
    name: Yup.string().required(t("shared.forms.validation.required")),
    level: Yup.string(),
  });

  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(formik) => (
        <DataModal
          name={t("builder.sections.skill")}
          path="skill.items"
          event={ModalEvents.SKILL_MODAL}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label={t("shared.forms.name")}
              placeholder="ReactJS"
              {...getFieldProps(formik, schema, "name")}
            />

            <Input
              label={t("builder.skills.level")}
              placeholder="Novice"
              {...getFieldProps(formik, schema, "level")}
            />
          </div>
        </DataModal>
      )}
    </Formik>
  );
};

export default memo(SkillModal);
