import React from 'react';
import { BrowserRouter as Router} from "react-router-dom";

const withRouter = Component => props => (
  <Router>
    <Component {...props} />
  </Router>
);

export default withRouter;