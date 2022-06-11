import React, { useState } from "react";
import fetchData from "components/fetchData";
import { TextField, Button } from "@mui/material";

export default function AddMember({ id, setError, setOpenModal }) {
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

    if (noofErrors === 0) {
      try {
        await fetchData(`/admin/resolve`, "PATCH", resolveDetails);
        setOpenModal(false);
      } catch (error) {
        setError(true);
      }
    } else {
      setErrors(err);
    }
  }

  return (
    <>
      <TextField
        focused
        error={errors.resolvedUserError ? true : false}
        sx={{ mb: 4 }}
        id="outlined-basic"
        label="Email"
        variant="outlined"
        fullWidth
        onChange={(e) =>
          setResolveDetails({ ...resolveDetails, resolvedUser: e.target.value })
        }
        helperText={errors.resolvedUserError}
      />
      <br />
      <TextField
        focused
        error={errors.resolvedByError ? true : false}
        sx={{ mb: 4 }}
        id="outlined-multiline-static"
        label="Password"
        fullWidth
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
