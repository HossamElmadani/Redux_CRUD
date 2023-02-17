import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, deleteUser, updateUser, setSearchQuery } from "../Action/actions";

export default function UserList() {
  const users = useSelector((state) => state.users);
  const searchQuery = useSelector((state) => state.searchQuery);
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [editUser, setEditUser] = useState(null);

  const handleAddUser = (event) => {
    event.preventDefault();
    dispatch(addUser({ ...newUser, id: Date.now() }));
    setNewUser({ name: "", email: "" });
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    setNewUser(user);
  };

  const handleUpdateUser = (event) => {
    event.preventDefault();
    dispatch(updateUser(newUser));
    setEditUser(null);
    setNewUser({ name: "", email: "" });
  };

  const handleSearchQueryChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toString().includes(searchQuery)
  );

  return (
    <div>
      <h1>User List</h1>
      <div className="row" >
      <div className="col-md-4">
      <form onSubmit={editUser ? handleUpdateUser : handleAddUser}>
        <h2>{editUser ? "Edit User" : "Add User"}</h2>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={newUser.name}
            onChange={(event) =>
              setNewUser({ ...newUser, name: event.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={newUser.email}
            onChange={(event) =>
              setNewUser({ ...newUser, email: event.target.value })
            }
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editUser ? "Save" : "Add"}
        </button>
        {editUser && (
          <button
            type="button"
            className="btn btn-danger ms-2"
            onClick={() => {
              setEditUser(null);
              setNewUser({ name: "", email: "" });
            }}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
    <div className="col-md-8">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or ID"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <button className="btn btn-outline-secondary" type="button">
          Search
        </button>
      </div>
      <ul className="list-group">
        {filteredUsers.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{user.name}</span>
            <span>{user.email}</span>
            <div>
              <button
                type="button"
                className="btn btn-primary me-2"
                onClick={() => handleEditUser(user)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDeleteUser(user.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>
  )
}