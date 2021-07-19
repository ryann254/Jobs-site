import React from "react";

const VacancyFilter = () => {
  return (
    <div className="five columns">
      {/* Sort by */}
      <div className="widget">
        <h4>Sort by</h4>
        {/* Select */}
        <select
          data-placeholder="Choose Category"
          className="chosen-select-no-single"
        >
          <option selected="selected" value="recent">
            Newest
          </option>
          <option value="oldest">Oldest</option>
          <option value="expiry">Expiring Soon</option>
          <option value="ratehigh">Hourly Rate – Highest First</option>
          <option value="ratelow">Hourly Rate – Lowest First</option>
        </select>
      </div>
      {/* Location */}
      <div className="widget">
        <h4>Location</h4>
        <form action="#" method="get">
          <input type="text" placeholder="State / Province" />
          <input type="text" placeholder="City" />
          <input type="text" className="miles" placeholder="Miles" />
          <label htmlFor="zip-code" className="from">
            from
          </label>
          <input
            type="text"
            id="zip-code"
            className="zip-code"
            placeholder="Zip-Code"
          />
          <br />
          <button className="button">Filter</button>
        </form>
      </div>
      {/* Job Type */}
      <div className="widget">
        <h4>Job Type</h4>
        <ul className="checkboxes">
          <li>
            <input
              id="check-1"
              type="checkbox"
              name="check"
              defaultValue="check-1"
              defaultChecked
            />
            <label htmlFor="check-1">Any Type</label>
          </li>
          <li>
            <input
              id="check-2"
              type="checkbox"
              name="check"
              defaultValue="check-2"
            />
            <label htmlFor="check-2">
              Full-Time <span>(312)</span>
            </label>
          </li>
          <li>
            <input
              id="check-3"
              type="checkbox"
              name="check"
              defaultValue="check-3"
            />
            <label htmlFor="check-3">
              Part-Time <span>(269)</span>
            </label>
          </li>
          <li>
            <input
              id="check-4"
              type="checkbox"
              name="check"
              defaultValue="check-4"
            />
            <label htmlFor="check-4">
              Internship <span>(46)</span>
            </label>
          </li>
          <li>
            <input
              id="check-5"
              type="checkbox"
              name="check"
              defaultValue="check-5"
            />
            <label htmlFor="check-5">
              Freelance <span>(119)</span>
            </label>
          </li>
        </ul>
      </div>
      {/* Rate/Hr */}
      <div className="widget">
        <h4>Rate / Hr</h4>
        <ul className="checkboxes">
          <li>
            <input
              id="check-6"
              type="checkbox"
              name="check"
              defaultValue="check-6"
              defaultChecked
            />
            <label htmlFor="check-6">Any Rate</label>
          </li>
          <li>
            <input
              id="check-7"
              type="checkbox"
              name="check"
              defaultValue="check-7"
            />
            <label htmlFor="check-7">
              $0 - $25 <span>(231)</span>
            </label>
          </li>
          <li>
            <input
              id="check-8"
              type="checkbox"
              name="check"
              defaultValue="check-8"
            />
            <label htmlFor="check-8">
              $25 - $50 <span>(297)</span>
            </label>
          </li>
          <li>
            <input
              id="check-9"
              type="checkbox"
              name="check"
              defaultValue="check-9"
            />
            <label htmlFor="check-9">
              $50 - $100 <span>(78)</span>
            </label>
          </li>
          <li>
            <input
              id="check-10"
              type="checkbox"
              name="check"
              defaultValue="check-10"
            />
            <label htmlFor="check-10">
              $100 - $200 <span>(98)</span>
            </label>
          </li>
          <li>
            <input
              id="check-11"
              type="checkbox"
              name="check"
              defaultValue="check-11"
            />
            <label htmlFor="check-11">
              $200+ <span>(21)</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VacancyFilter;