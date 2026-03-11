import React, { useEffect, useState } from "react";

function UserList({ users, setUsers, setEditUser }) {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const savedUsers = localStorage.getItem("users");

    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
      setLoading(false);
    } else {

      fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
          localStorage.setItem("users", JSON.stringify(data));
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load users");
          setLoading(false);
        });

    }

  }, [setUsers]);

  // DELETE USER
  const deleteUser = async (id) => {

    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE"
    });

    const updatedUsers = users.filter((user) => user.id !== id);

    setUsers(updatedUsers);

    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  return (

    <table border="1">

      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>

        {users.map((user) => (

          <tr key={user.id}>

            <td>{user.name}</td>

            <td>{user.email}</td>

            <td>{user.phone}</td>

            <td>

              <button onClick={() => setEditUser(user)} className="edit-btn">
                Edit
              </button>

              <button onClick={() => deleteUser(user.id)} className="delete-btn">
                Delete
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  );
}

export default UserList;