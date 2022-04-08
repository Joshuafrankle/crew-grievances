import React from "react";
import FadeIn from "./FadeIn";

export default function GrievanceCard({ grievances }) {
  return (
    <>
      {grievances.map((grievance, index) => {
        return (
          <div key={`${grievance}-${index}`}>
            <FadeIn>
              <div className="card mb-3">
                <div className="card-body">
                  <h5>
                    <span className="badge" style={{ marginRight: "10px" }}>
                      {grievance[1]}
                    </span>
                    <span className="badge">{grievance[2]}</span>
                  </h5>
                  <p className="card-text font-weight-bold mt-3">
                    {grievance[3]}
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        );
      })}
    </>
  );
}
