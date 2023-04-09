import { useState, useEffect } from "react";
import '../styles/MyGames.css'
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth, API } from "aws-amplify";
import Jornal from './Jornal.jsx';

const MyGames = ({onSelect, selectedGame}) => {
    const [myGames, setMyGames] = useState([]);
    const { user, signOut } = useAuthenticator((context) => [context.user]);
    const [jornals, setJornals] = useState([]);
    const [selectedGameJornals, setSelectedGameJornals] = useState([]);

    const fetchGameData = async (gameId) => {
      console.log("gameId", gameId);
        try {
          const response = await API.get("api", `/game/${gameId}`);
          console.log("response", response);
          return response;
        } catch (error) {
          console.error(error);
          // Handle the error in whatever way is appropriate for your application
        }
    };

    useEffect (() => {
        const fetchData = async () => {
            try {
                const response = await API.get("api", "/mygames");
                const myGames = response.myGames;
                const gameDataPromises = myGames.map((myGame) => fetchGameData(myGame.game_id));
                const gameData = await Promise.all(gameDataPromises);
                const newGameData = gameData.map((game) => game.game);
                setMyGames(newGameData);
                console.log("mygames",gameData);
            } catch (error) {
                console.error(error);
                // Handle the error in whatever way is appropriate for your application
            }
        };
        fetchData();
    }, []);

    const handleSelectGame = (game) => {
      console.log("selectedGame", game);
      onSelect(game);
    };

    return (
      <div className="my-container">
        <h1>My Games</h1>
        <div className="my-games-container">
          {myGames.map((game) => (
            <div
              className="my-game-container"
              key={game.id}
              onClick={() => handleSelectGame(game)}
            >
              <div className="my-game-info">
                <h2 className="my-game-name">{game.name}</h2>
                <p className="my-game-company">{game.company}</p>
                <p className="my-game-console">{game.console}</p>
                <p className="my-game-description">{game.description}</p>
                <p className="my-game-release-date">{game.releaseDate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default MyGames
