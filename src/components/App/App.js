import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Notes from "../../routes/Notes/Notes";
import Add from "../../routes/Add";
import Note from "../../routes/Note";
import Edit from "../../routes/Edit";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact={true} path={"/"} component={Notes} />
        <Route path={"/add"} component={Add} />
        <Route path={"/note/:id"} component={Note} />
        <Route path={"/edit/:id"} component={Edit} />
      </Switch>
    </Router>
  );
};

export default App;
