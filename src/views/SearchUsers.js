import './style/Message.css';
import { useState, useEffect } from 'react';
import useAxios from '../utils/useAxios';
import { Link, useParams, useNavigate } from 'react-router-dom';
const swal = require('sweetalert2');

function SearchUsers() {
  const baseurl = "https://chat-backend-ten-orcin.vercel.app"; // ✅ production backend
  const [users, setUser] = useState([]);
  let [newSearch, setnewSearch] = useState({ username: "" });

  const { username } = useParams();
  const navigate = useNavigate();
  const axios = useAxios();

  useEffect(() => {
    axios.get(`${baseurl}/search/${username}/`)
      .then((res) => setUser(res.data))
      .catch((error) => {
        swal.fire({
          title: "User Does Not Exist",
          icon: "error",
          toast: true,
          timer: 2000,
          position: 'middle',
          timerProgressBar: true,
          showConfirmButton: false,
        });
      });
  }, [username]);

  const handleSearchChange = (event) => {
    setnewSearch({
      ...newSearch,
      [event.target.name]: event.target.value,
    });
  };

  const SearchUser = () => {
    axios.get(`${baseurl}/search/${newSearch.username}/`)
      .then((res) => {
        navigate(`/search/${newSearch.username}/`);
        setUser(res.data);
      })
      .catch((error) => {
        swal.fire({
          title: "User Does Not Exist",
          icon: "error",
          toast: true,
          timer: 2000,
          position: 'middle',
          timerProgressBar: true,
          showConfirmButton: false,
        });
      });
  };

  return (
    <main className="content" style={{ marginTop: "150px" }}>
      <div className="container p-0">
        <h1 className="h3 mb-3">Messages</h1>
        <div className="card">
          <div className="row g-0">
            <div className="col-12 col-lg-5 col-xl-3 border-right">
              <div className="px-4">
                <div className="d-flfex align-itemfs-center">
                  <div className="flex-grow-1 d-flex align-items-center mt-2">
                    <input
                      type="text"
                      className="form-control my-3"
                      placeholder="Search..."
                      onChange={handleSearchChange}
                      name="username"
                    />
                    <button className="ml-2" onClick={SearchUser} style={{ border: "none", borderRadius: "50%" }}>
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>

              {users.map((user, index) =>
                <Link
                  key={index}
                  to={`/inbox/${user.id}`}
                  className="list-group-item list-group-item-action border-0"
                >
                  <div className="d-flex align-items-start">
                    <img src={user.image} className="rounded-circle mr-1" alt="1" width={40} height={40} />
                    <div className="flex-grow-1 ml-3">
                      {user.full_name}
                      <div className="small">
                        <small><i className="fas fa-envelope"> Send Message</i></small>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              <hr className="d-block d-lg-none mt-1 mb-0" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SearchUsers;
