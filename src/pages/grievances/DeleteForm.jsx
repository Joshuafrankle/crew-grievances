import React, { useRef } from "react";
import fetchData from "components/fetchData";

export default function DeleteForm({ id, setError, setOpenModal }) {
  const btnYes = useRef(null);
  const btnNo = useRef(null);

  async function handleDelete() {
    btnYes.current.disabled = true;
    btnNo.current.disabled = true;
    btnYes.current.innerHTML = `<div class="spinner-border p-2 spinner-border-sm" role="status" aria-hidden="true"><span class="visually-hidden">Loading...</span></div>`;
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
        ref={btnYes}
        type="button"
        className="btn btn-outline me-3"
        onClick={handleDelete}
      >
        Yes
      </button>
      <button
        ref={btnNo}
        type="button"
        className="btn btn-outline"
        onClick={() => setOpenModal(false)}
      >
        No
      </button>
    </>
  );
}
