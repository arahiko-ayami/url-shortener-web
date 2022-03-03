import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RedirectToUrl from "./views/RedirectToUrl";
import CreateUrl from "./views/CreateUrl";
import NotFound from "./views/NotFound";

function App() {
  return (
    <div className="flex flex-col">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateUrl />} />
          <Route path="/:id" element={<RedirectToUrl />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/go/not-found" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
