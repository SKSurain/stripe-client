import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pay from "../pages/pay"
import Success from "../pages/success"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/pay" element={<Pay />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
};

export default App;