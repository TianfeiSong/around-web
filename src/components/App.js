import '../styles/App.css';
import TopBar from "./TopBar";
import { useState } from "react";
import { TOKEN_KEY } from "../constants";
import Main from "./Main";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
      localStorage.getItem(TOKEN_KEY) ? true : false
  );

  const logout = () => {
    console.log("log out");
    localStorage.removeItem(TOKEN_KEY);
    setIsLoggedIn(false);
  };

  const loggedIn = (token) => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="App">
      <TopBar isLoggedIn={isLoggedIn} handleLogout={logout} />
      <Main />
    </div>
  );
}

export default App;
