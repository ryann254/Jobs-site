import { useTranslation } from "react-i18next";
import React, { memo, useContext } from "react";
import ReactMarkdown from "react-markdown";
import PageContext from "contexts/page/page.provider";
import { formatDateRange, isItemVisible, safetyCheck } from "utils";

const EducationItem = ({ item, language }) => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col text-left mr-2">
          <h6 className="font-semibold text-sm">{item.institution}</h6>
          <span className="text-xs">
            <strong>{item.degree}</strong> {item.fieldOfStudy}
          </span>
        </div>
        <div className="flex flex-col items-end text-right">
          {item.startDate && (
            <h6 className="text-xs font-medium mb-1">
              (
              {formatDateRange(
                {
                  startDate: item.schoolStart,
                  endDate: item.schoolEnd,
                  language,
                },
                t,
              )}
              )
            </h6>
          )}
          <span className="text-sm font-medium">{item.gpa}</span>
        </div>
      </div>
      {item.descriptionPlaintext && (
        <ReactMarkdown className="markdown mt-2 text-sm">
          {item.descriptionPlaintext}
        </ReactMarkdown>
      )}
    </div>
  );
};

const EducationA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.education) ? (
    <div>
      <Heading>{data.education.heading}</Heading>
      <div className="grid gap-4">
        {data.education.items.map(
          (x) =>
            isItemVisible(x) && (
              <EducationItem
                key={x.id}
                item={x}
                language={data.resumemetadata.language}
              />
            ),
        )}
      </div>
    </div>
  ) : null;
};

export default memo(EducationA);
