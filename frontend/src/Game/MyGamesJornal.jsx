import React, { useState } from 'react';
import MyGames from './MyGames';
import Jornal from './Jornal';
import { useAuthenticator } from "@aws-amplify/ui-react";
import '../styles/MyGamesJornal.css';

const MyGamesJornal = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div className='wrapper'>
    <div className='game-journey'>
      <div className='my-game-list'>
        <MyGames onSelect={setSelectedGame} selectedGame={selectedGame} />
      </div>
      <div className='jornal-window'> 
      {selectedGame ? (
        <Jornal game={selectedGame} />
        ) : (
          <div>Please select a game to see jornal.</div>
      )}
      </div>
    </div>
  </div>
  );
};

export default MyGamesJornal;
