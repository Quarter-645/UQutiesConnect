import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  NoPage,
  Login,
  Home,
  Profile,
  Register,
  FriendProfile,
  FriendsList,
} from "./pages";
import { NavBar } from "./components";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<NoPage />} />
            <Route path="Friend" element={<FriendProfile />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="Friends-list" element={<FriendsList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
