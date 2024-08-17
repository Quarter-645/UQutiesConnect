import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NoPage, Login, Home, Profile, FriendProfile } from "./pages";
import NavBar from "./components";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Login />} />
            <Route path="Home" element={<Home />} />
            <Route path="*" element={<NoPage />} />
            <Route path="Friend" element={<FriendProfile />} />
            <Route path = "Profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
