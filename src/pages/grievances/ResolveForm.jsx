import React, { useState } from "react";
import { axiosRequest } from "components/DataFetch";
import { TextField, Button } from "@mui/material";

export default function ResolveForm({ id, setError }) {
  const [resolveDetails, setResolveDetails] = useState({
    grievanceId: id,
    resolvedUser: "",
    resolvedBy: "",
  });
  const [errors, setErrors] = useState({
    resolvedUserError: "",
    resolvedByError: "",
  });

  async function handleResolve() {
    let noofErrors = 0;
    let err = { ...errors };

    Object.entries(resolveDetails).forEach(([key, value]) => {
      if (typeof value === "string" && value.trim() === "") {
        err[`${key}Error`] = "This field is required";
        noofErrors++;
      } else if (key === "resolvedBy" && value.trim().length < 100) {
        err[`${key}Error`] = "It would be nice if you can give us more details";
        noofErrors++;
      } else {
        err[`${key}Error`] = "";
      }
    });
    setErrors(err);

    if (noofErrors === 0) {
      try {
        await axiosRequest(`/admin/resolve`, "POST", resolveDetails);
      } catch (error) {
        setError(true);
      }
    }
  }

  return (
    <>
      <TextField
        error={errors.resolvedUserError ? true : false}
        sx={{ mb: 4 }}
        id="outlined-basic"
        label="Your Name"
        variant="outlined"
        fullWidth
        onChange={(e) =>
          setResolveDetails({ ...resolveDetails, resolvedUser: e.target.value })
        }
        helperText={errors.resolvedUserError}
      />
      <br />
      <TextField
        error={errors.resolvedByError ? true : false}
        sx={{ mb: 4 }}
        id="outlined-multiline-static"
        label="Measures took to resolve"
        multiline
        fullWidth
        rows={4}
        onChange={(e) =>
          setResolveDetails({ ...resolveDetails, resolvedBy: e.target.value })
        }
        helperText={errors.resolvedByError}
      />
      <Button variant="contained" onClick={handleResolve}>
        Submit
      </Button>
    </>
  );
}
