import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from 'hooks/useFetch';
// import fetchData from "components/fetchData";
import Loader from 'components/Loader';
import Problem from 'components/Problem';
import Popup from 'components/Popup';
import DeleteForm from './grievances/DeleteForm';
import ResolveForm from './AddMember';
import { FiTrash } from 'react-icons/fi';

export default function UserManagement() {
  const { data, loading, error } = useFetch('/sadmin');
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);
  const [err, setErr] = useState(false);
  const [id, setId] = useState({
    resolveId: null,
    deleteId: null,
  });

  // async function handleAdd() {
  //   const { data } = await fetchData("/sadmin");
  // }

  if (loading) {
    return <Loader />;
  } else if (error || err) {
    return <Problem />;
  } else {
    return (
      <>
        <div
          className="d-flex flex-column align-items-center mt-10 mx-5"
          style={{
            height: '100vh',
          }}
        >
          <h1>UserManagement 🚧</h1>
          <button
            type="button"
            className="btn mt-3"
            onClick={() => {
              setId({
                deleteId: null,
                resolveId: 1,
              });
              setOpenPopup(true);
            }}
          >
            Add Admin
          </button>
          <button
            type="button"
            className="btn mt-3"
            onClick={() => {
              navigate('/home');
            }}
          >
            Go to Home
          </button>

          <table className="table table-hover mt-5">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((admin, index) => (
                <tr key={`${admin.email}-${index}`}>
                  <th scope="row">{index + 1}</th>
                  <td>{admin.email}</td>
                  <td>{admin.role}</td>
                  <td>
                    <button
                      type="button"
                      className="btn mx-3"
                      onClick={() => {
                        setId({
                          deleteId: admin.userId,
                          resolveId: null,
                        });
                        setOpenPopup(true);
                      }}
                    >
                      <FiTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Popup
          title={id.deleteId ? 'Are you sure wanna delete?' : 'Member Form'}
          openModal={openPopup}
          setOpenModal={setOpenPopup}
        >
          {id.deleteId ? (
            <DeleteForm id={id.deleteId} setError={setErr} setOpenModal={setOpenPopup} />
          ) : (
            <ResolveForm
              id={id.resolveId}
              setError={setErr}
              setOpenModal={setOpenPopup}
            />
          )}
        </Popup>
      </>
    );
  }
}
