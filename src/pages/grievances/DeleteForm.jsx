import React, { useRef } from "react";
import fetchData from "components/fetchData";

export default function DeleteForm({ id, setError, setOpenModal }) {
  const btnRef = useRef(null);

  async function handleDelete() {
    btnRef.current.disabled = true;
    btnRef.current.innerHTML = `<div class="spinner-border p-2 spinner-border-sm" role="status" aria-hidden="true"><span class="visually-hidden">Loading...</span></div>`;
    try {
      await fetchData(`/admin/delete`, "PATCH", { grievanceId: id });
      setOpenModal(false);
    } catch ({ response }) {
      setError(true);
    }
  }

  return (
    <>
      <button
        ref={btnRef}
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
