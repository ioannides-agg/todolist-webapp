import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/TodoPage" element={<TodoPage />} />
        <Route path="/Login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
