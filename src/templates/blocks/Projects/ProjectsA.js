import { useTranslation } from "react-i18next";
import React, { memo, useContext } from "react";
import ReactMarkdown from "react-markdown";
import PageContext from "contexts/page/page.provider";
import { formatDateRange, isItemVisible, safetyCheck } from "utils";

const ProjectItem = ({ item, language }) => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col text-left mr-2">
          <h6 className="font-semibold text-sm">{item.title}</h6>
          {item.link && (
            <a href={item.link} className="text-xs">
              {item.link}
            </a>
          )}
        </div>
        {item.startDate && (
          <h6 className="text-xs font-medium text-right">
            (
            {formatDateRange(
              {
                startDate: item.startDate,
                endDate: item.endDate,
                language,
              },
              t,
            )}
            )
          </h6>
        )}
      </div>
      {item.descriptionPlaintext && (
        <ReactMarkdown className="markdown mt-2 text-sm">
          {item.descriptionPlaintext}
        </ReactMarkdown>
      )}
    </div>
  );
};

const ProjectsA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.project) ? (
    <div>
      <Heading>{data.project.heading}</Heading>
      <div className="grid gap-4">
        {data.project.items.map(
          (x) =>
            isItemVisible(x) && (
              <ProjectItem
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

export default memo(ProjectsA);
