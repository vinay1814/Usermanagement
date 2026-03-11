import React, { useState, useEffect } from "react";

function AddUser({ users, setUsers, editUser, setEditUser }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {

    if (editUser) {

      setName(editUser.name);
      setEmail(editUser.email);
      setPhone(editUser.phone);

    }

  }, [editUser]);


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (editUser) {

      const updatedUsers = users.map((user) =>
        user.id === editUser.id
          ? { ...user, name, email, phone }
          : user
      );

      setUsers(updatedUsers);

      localStorage.setItem("users", JSON.stringify(updatedUsers));

      setEditUser(null);

    } else {

      const newUser = { name, email, phone };

      const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      });

      const data = await res.json();

      const updatedUsers = [...users, data];

      setUsers(updatedUsers);

      localStorage.setItem("users", JSON.stringify(updatedUsers));

    }

    setName("");
    setEmail("");
    setPhone("");
  };

  return (

    <form onSubmit={handleSubmit}>

      <h2>{editUser ? "Edit User" : "Add New User"}</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      <button type="submit">
        {editUser ? "Update User" : "Add User"}
      </button>

    </form>

  );
}

export default AddUser;