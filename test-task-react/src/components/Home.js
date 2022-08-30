import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import UserService from "../services/user-service";
const Home = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [content, setContent] = useState("");
  const [contentData, setContentData] = useState([])
  const [totalPages, setTotalPages] = useState("")
  const [page, setPage] = useState(1)
  useEffect(() => {
    UserService.getOnePageUsers(page).then(
      (response) => {
        setContent(response.data);
        setContentData(response.data.data)
        setTotalPages(response.data.total_pages)
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, [page]);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  const nextPage = () =>{
    let npage = page+1
    setPage(npage);
  }
  const previousPage = () =>{
    let npage = page-1
    setPage(npage);
  }
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          Page <strong>{content.page}</strong>
        </h3>
        {page - 1 > 0 ? (
          <button onClick={previousPage}>Previous page</button>
        ) : (
          <button onClick={previousPage} disabled>
            Previous page
          </button>
        )}
        {page + 1 > totalPages ? (
          <button onClick={nextPage} disabled>
            Next page
          </button>
        ) : (
          <button onClick={nextPage}>Next page</button>
        )}
      </header>
      {contentData.map((item) => (
        <div key={item.id}>
          <p>
            <strong>Id:</strong> {item.id}
          </p>
          <p>
            <strong>Email:</strong> {item.email}
          </p>
          <p>
            <strong>First name:</strong> {item.first_name}
          </p>
          <p>
            <strong>Last name:</strong> {item.last_name}
          </p>
          <p>
            <img src={item.avatar}></img>
          </p>
        </div>
      ))}
    </div>
  );
};
export default Home;