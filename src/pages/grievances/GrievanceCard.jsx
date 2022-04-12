import React from "react";
import FadeIn from "components/FadeIn";
import { MdDelete, MdDone } from "react-icons/md";
import Button from "@mui/material/Button";

export default function GrievanceCard({ grievances, setId, setOpenPopup }) {
  return (
    <>
      <div className="row">
        {grievances.map((grievance, index) => (
          <div
            className="col-lg-6 col-xl-4"
            key={`${grievance.grievanceTitle}-${index}`}
          >
            <FadeIn duration={index + 2.5}>
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
                  <div className="d-flex justify-content-end">
                    <Button
                      sx={{ marginRight: "10px" }}
                      variant="outlined"
                      onClick={() => {
                        setId({
                          deleteId: null,
                          resolveId: grievance.grievanceId,
                        });
                        setOpenPopup(true);
                      }}
                    >
                      <MdDone style={{ height: "20px", width: "auto" }} />
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setId({
                          deleteId: grievance.grievanceId,
                          resolveId: null,
                        });
                        setOpenPopup(true);
                      }}
                    >
                      <MdDelete style={{ height: "20px", width: "auto" }} />
                    </Button>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        ))}
      </div>
    </>
  );
}
