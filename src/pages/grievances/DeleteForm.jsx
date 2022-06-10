import React from "react";
import DataFetch from "components/DataFetch";

export default function DeleteForm({ id, setError, setOpenModal }) {
  async function handleDelete() {
    try {
      await DataFetch(`/admin/delete`, "PATCH", { grievanceId: id });
      setOpenModal(false);
    } catch ({ response }) {
      setError(true);
    }
  }
  return (
    <>
      <button
        type="button"
        className="btn btn-outline me-3"
        onClick={handleDelete}
      >
        Yes
      </button>
      <button
        type="button"
        className="btn btn-outline"
        onClick={() => setOpenModal(false)}
      >
        No
      </button>
    </>
  );
}
