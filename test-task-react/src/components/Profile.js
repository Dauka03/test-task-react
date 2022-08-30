import React, { useState } from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import UserService from "../services/user-service";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [id, setId] = useState("");
  const [ content, setContent] = useState("")
  useEffect(() => {
    if (currentUser) {
      const user = JSON.parse(localStorage.getItem(currentUser.token));
      setId(user.id)
        }
    UserService.getUsersById(id).then(
      (response) => {
        setContent(response.data.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, [id]);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{content.first_name+" "+content.last_name}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Id:</strong> {content.id}
      </p>
      <p>
        <strong>Email:</strong> {content.email}
      </p>
      <p>
            <img src={content.avatar}></img>
          </p>
    </div>
  );
};

export default Profile;