import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosRequest } from "components/DataFetch";
import Problem from "components/Problem";
import Loader from "components/Loader";
import Popup from "components/Popup";
import GrievanceCard from "./GrievanceCard";
import ResolveForm from "./ResolveForm";

export default function GetGrievances() {
  const history = useHistory();
  const [openPopup, setOpenPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [grievanceList, setGrievanceList] = useState([]);

  const [id, setId] = useState({
    resolveId: null,
    deleteId: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosRequest("/admin");
        setGrievanceList(data.grievanceList);
      } catch ({ response }) {
        if (response.status === 5000) {
          setError(true);
        } else {
          history.push("/");
        }
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loader />;
  } else if (error) {
    return <Problem />;
  } else {
    return (
      <>
        <GrievanceCard
          grievances={grievanceList}
          setId={setId}
          setOpenPopup={setOpenPopup}
        />
        <Popup
          title={id.deleteId ? "Are you sure wanna delete?" : "Member Form"}
          openModal={openPopup}
          setOpenModal={setOpenPopup}
        >
          {id.deleteId ? (
            <h1>Delete</h1>
          ) : (
            <ResolveForm id={id.resolveId} setError={setError} />
          )}
        </Popup>
      </>
    );
  }
}
