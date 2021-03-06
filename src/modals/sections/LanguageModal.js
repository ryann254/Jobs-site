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
  fluency: "",
};

const LanguageModal = () => {
  const { t } = useTranslation();

  const schema = Yup.object().shape({
    name: Yup.string().required(t("shared.forms.validation.required")),
    fluency: Yup.string().required(t("shared.forms.validation.required")),
  });

  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(formik) => (
        <DataModal
          name={t("builder.sections.language")}
          path="language.items"
          event={ModalEvents.LANGUAGE_MODAL}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label={t("shared.forms.name")}
              placeholder="German"
              {...getFieldProps(formik, schema, "name")}
            />

            <Input
              label={t("builder.languages.fluency")}
              placeholder="Native/B1"
              {...getFieldProps(formik, schema, "fluency")}
            />
          </div>
        </DataModal>
      )}
    </Formik>
  );
};

export default memo(LanguageModal);
