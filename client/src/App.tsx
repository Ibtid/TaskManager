import { FC, Fragment } from "react";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import store from "./store";

const App: FC = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
