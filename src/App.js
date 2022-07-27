import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CommonModal from "./components/CommonModal";
import Events from "./components/Events";
import Page1 from "./components/hierarchy/Page1";
import Page11 from "./components/hierarchy/Page11";
import Page12 from "./components/hierarchy/Page12";
import Page2 from "./components/hierarchy/Page2";
import Page21 from "./components/hierarchy/Page21";

function App() {
  return (
    <>
      <div className="container-fluid">
        <Header />
      </div>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events-details" element={<CommonModal />} />
            <Route path="/events" element={<Events />} />
            <Route path="/page1" element={<Page1 />} />
            <Route path="/page11" element={<Page11 />} />
            <Route path="/page12" element={<Page12 />} />
            <Route path="/page2" element={<Page2 />} />
            <Route path="/page21" element={<Page21 />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
