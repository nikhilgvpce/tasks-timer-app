import "./App.css";
import User from "./User/user";
import { Route } from "react-router-dom";
import DashBoard from "./Dashboard/dashboard";

/**
 * App component contains route for
 * User and DashBoard components
 */

function App() {
  return (
    <div>
      <Route path="/" exact>
        <User />
      </Route>
      <Route path="/dashboard" exact>
        <DashBoard />
      </Route>
    </div>
  );
}

export default App;
