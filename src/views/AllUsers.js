// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import AuthContext from "../context/AuthContext";

// const AllUsers = () => {
//   const { authTokens, refreshAccessToken, logoutUser } = useContext(AuthContext);

//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       if (!authTokens?.access) {
//         setError("Please login first");
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await axios.get("https://chat-backend-ten-orcin.vercel.app/api/users/", {
//           headers: {
//             Authorization: `Bearer ${authTokens.access}`,
//           },
//         });
//         setUsers(res.data);
//         setLoading(false);
//       } catch (err) {
//         if (err.response && err.response.status === 401) {
//           // Token expired, try to refresh token
//           const newAccessToken = await refreshAccessToken();
//           if (newAccessToken) {
//             try {
//               const resRetry = await axios.get("https://chat-backend-ten-orcin.vercel.app/api/users/", {
//                 headers: {
//                   Authorization: `Bearer ${newAccessToken}`,
//                 },
//               });
//               setUsers(resRetry.data);
//             } catch (errRetry) {
//               setError("Failed to fetch users after refreshing token.");
//               logoutUser();
//             }
//           } else {
//             setError("Session expired. Please login again.");
//             logoutUser();
//           }
//         } else {
//           setError("Failed to fetch users");
//         }
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, [authTokens, refreshAccessToken, logoutUser]);

//   if (loading) return <div className="text-center mt-5">Loading users...</div>;
//   if (error) return <div className="alert alert-danger mt-3">{error}</div>;

//   return (
//     <div className="container mt-4">
//       <h2>All Users</h2>
//       <table className="table table-striped table-hover mt-3">
//         <thead className="table-dark">
//           <tr>
//             <th>ID</th>
//             <th>Username</th>
//             <th>Email</th>
//             <th>Profile</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>{user.id}</td>
//               <td>{user.username}</td>
//               <td>{user.email}</td>
//               <td>
//                 {user.profile ? (
//                   <>
//                     {user.profile.image && (
//                       <img
//                         src={user.profile.image}
//                         alt={`${user.username} avatar`}
//                         style={{ width: "40px", borderRadius: "50%" }}
//                         className="me-2"
//                       />
//                     )}
//                     {user.profile.bio || "No bio"}
//                   </>
//                 ) : (
//                   "No Profile"
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AllUsers;
