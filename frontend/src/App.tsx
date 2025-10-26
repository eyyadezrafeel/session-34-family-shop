import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ShoppingList from "./pages/Shopping";
import IncludedItems from "./pages/IncludedItems";
import JoinFamily from "./pages/JoinFamily";
import ArchivedLists from "./pages/Archived";
import CreateFamily from "./pages/CreateFamily";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shopping" element={<ShoppingList />} />
        <Route path="/included" element={<IncludedItems />} />
        <Route path="/join" element={<JoinFamily />} />
        <Route path="/archivedList" element={<ArchivedLists/>}/>
        <Route path="/create" element={<CreateFamily/>}/>
      </Routes>
    </Router>
  );
}

export default App;
