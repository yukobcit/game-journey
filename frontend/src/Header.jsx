import React from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Link } from "react-router-dom";
import './styles/Header.css'

function Header() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  return (
    <header className="header">
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/games">Games</Link>
          </li>
          <li>
            <Link to="/my-games">My Games</Link>
          </li>
          <li>
            <Link to="/timeline">Time Line</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      {user && (
        <div className="user-info">
          <p>{user.username}</p>
          <p>email: {user.attributes.email}</p>
          <button onClick={signOut}>Sign Out</button>
        </div>
      )}
    </header>
  );
}

export default Header;
