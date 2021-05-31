import React, { useState } from "react";
import axios from "axios";
import "./user.css";
import { withRouter } from "react-router-dom";

/**
 * User Component is a landing page after the app
 * starts. The user can enter his/her name and after pressing 
 * submit button the user will be redirected to dashboard
 */

const User = (props) => {
  const [user, setUser] = useState(null);

  // api to add user 
  const addUser = () => {
    axios
      .post("http://localhost:4001/timer/createUser", {
        username: user,
      })
      .then((res) => {
        const user = res.status === 200 && res.data.message.split(" ")[1];
        // redirect the user to dashboard 
        // where user can see and add tasks along with their time lapsed
        props.history.push({
          pathname: "/dashboard",
          state: {
            user,
          },
        });
      });
  };

  return (
    <div className="wrapper">
      <input
        className="username"
        placeholder="username"
        onKeyDown={(e) => {
          const val = e.key;
          const reg = new RegExp("[a-zA-Z0-9\s]+");
          // allow only alpha numeric input
          if(!reg.test(val)) {
            e.preventDefault();
            return;
          }
        }}
        onChange={(e) => {
          setUser(e.target.value)
        }}
      />
      <button type="submit" onClick={addUser}>
        Submit
      </button>
    </div>
  );
};

export default withRouter(User);
