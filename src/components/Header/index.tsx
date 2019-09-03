import React from 'react';
import TalkienLogo from 'assets/TALKIEN.svg';
import './Header.scss';



function Header () {
    return (
        <header className="App-header">
            <div className="header">
                 <TalkienLogo />
                 <p className="search">Recherche</p>
                 <p className="management">Gestion</p>
                 <p className="gitHub">GitHub</p>
           </div>
        </header>
                )
    };
    
    export default Header;