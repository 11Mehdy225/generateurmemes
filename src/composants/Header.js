import React from 'react';
import logo from '../logo1.png'

//ici nous avons le composant header  qui a la barre de navigation en qlq sorte 

const Header = () => {
    return (
        <header>
      <nav className="navbar">
        <img src={logo} alt="logo" />
        <h2>MemeGenerator/projet/SupInfo</h2>

      </nav>
    </header>
    );
};

export default Header;