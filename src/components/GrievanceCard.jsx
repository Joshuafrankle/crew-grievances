import React from "react";
import FadeIn from "./FadeIn";

export default function GrievanceCard({ grievances, setGrievanceId }) {
  return (
    <>
      <div className="row">
        {grievances.map((grievance, index) => (
          <div
            className="col-lg-6 col-xl-4"
            key={`${grievance.grievanceTitle}-${index}`}
          >
            <FadeIn>
              <div className="card mb-3">
                <div className="card-body">
                  <h5>
                    <span className="badge" style={{ marginRight: "10px" }}>
                      {grievance.grievanceTitle}
                    </span>
                    <span className="badge">{grievance.severity}</span>
                  </h5>
                  <p className="card-text font-weight-bold mt-3">
                    {grievance.grievance}
                  </p>
                  <button
                    type="button"
                    className="btn me-3"
                    onClick={() => setGrievanceId(grievance.grievanceId)}
                  >
                    Resolve
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => setGrievanceId(grievance.grievanceId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </FadeIn>
          </div>
        ))}
      </div>
    </>
  );
}
