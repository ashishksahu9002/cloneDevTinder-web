import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Test from "./components/Test";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/test" element={<Test />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
