
import React, { useState } from "react";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  return (
    <div className="container">
      <h1>User Management Application</h1>

      <AddUser users={users} setUsers={setUsers} editUser={editUser} setEditUser={setEditUser} />
      <UserList users={users} setUsers={setUsers} setEditUser={setEditUser} />

    </div>
  );
}

export default App;