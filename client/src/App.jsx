import { BrowserRouter } from "react-router-dom";
import RoutePaths from "./RoutePaths";

const App = () => {
  return (
    <div className="">
      <BrowserRouter>
        <RoutePaths />
      </BrowserRouter>
    </div>
  );
};

export default App;
