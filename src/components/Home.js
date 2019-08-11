import React, { useState, useContext, useRef } from "react";
import { postRequest } from "../utils/axios";
import UserContext from "./UserContext";

const Home = ({ history }) => {
  const userContext = useContext(UserContext);
  const [error, setError] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const _handleFormSubmit = async e => {
    try {
      e.preventDefault();

      const response = await postRequest("/user/login", {
        email: email.current.value,
        password: password.current.value,
      });
      console.log(response);
      switch (response.status) {
        case 200:
          userContext.handleLogin(response.data.user, history);

          break;

        case 204:
          setError("User does not exist");
          break;
        case 401:
          setError("Invalid password");

          break;
        default:
          setError("Invalid password");
          break;
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <div className="uk-container  uk-padding">
      {error && (
        <div className="uk-text-danger uk-flex uk-flex-center">{error}</div>
      )}

      <div className="uk-flex uk-flex-center">
        <form className="uk-form-stacked" onSubmit={_handleFormSubmit}>
          <div className="uk-width-1-1 uk-margin">
            <label className="uk-label">Email</label>
            <input
              className="uk-input"
              placeholder="email"
              type="text"
              ref={email}
              onClick={() => email.current.focus()}
            />
          </div>
          <div className="uk-width-1-1 uk-margin">
            <label className="uk-label">Password</label>
            <input
              className="uk-input"
              placeholder="password"
              type="password"
              ref={password}
              onClick={() => password.current.focus()}
            />
          </div>
          <button className="uk-button uk-button-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
