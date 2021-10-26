import React from "react";
import Bounce from "react-reveal/Bounce";

import Loader from "components/Loader/Loader";
import NetworkStatus from "components/NetworkStatus";
import OfflinePlaceholder from "components/OfflinePlaceholder";

import { GET_COUNTED_INDUSTRIES } from "graphql/queries";

import { TypedQuery } from "core/queries";
import { landingPageIndustriesLimit } from "constants/constants";
import { Link } from "react-router-dom";

export const TypedIndustriesQuery = TypedQuery(GET_COUNTED_INDUSTRIES);

const CategoriesSection = () => {
  const variables = {
    first: landingPageIndustriesLimit,
  };

  return (
    <NetworkStatus>
      {(isOnline) => (
        <TypedIndustriesQuery variables={variables}>
          {(industriesList) => {
            if (industriesList.loading) {
              return <Loader />;
            }
            if (!isOnline) {
              return <OfflinePlaceholder />;
            }
            return (
              <div className="container-x">
                <div className="sixteen columns">
                  <Bounce bottom cascade>
                    {" "}
                    <h3 className="margin-bottom-20 margin-top-10">
                      Popular Categories
                    </h3>
                    {/* Popular Categories */}
                    <div className="categories-boxes-container">
                      {industriesList.data.industries.edges.map(
                        ({ node: industry }) => {
                          return (
                            <Link
                              to={{ pathname: "/vacancies" }}
                              className="category-small-box"
                            >
                              <i
                                className={
                                  industry.icon || "ln  ln-icon-Laptop-3"
                                }
                              />
                              <h4>{industry.name}</h4>
                              <span>{industry.vacanciesCount}</span>
                            </Link>
                          );
                        },
                      )}
                    </div>{" "}
                  </Bounce>
                  <div className="clearfix" />
                  <div className="margin-top-30" />
                  <a href="/categories" className="button centered">
                    Browse All Categories
                  </a>
                  <div className="margin-bottom-55" />
                </div>
              </div>
            );
          }}
        </TypedIndustriesQuery>
      )}
    </NetworkStatus>
  );
};

export default CategoriesSection;
