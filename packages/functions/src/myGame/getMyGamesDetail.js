import { getMyGames } from "@gamejorney/core/database";
import API from "@gamejorney/core/api";

export async function main(event) {
  try {
    // Get the user ID from the authorization context
    const userId = event.requestContext.authorizer.iam?.cognitoIdentity?.identityId;

    // Fetch the user's games from the database
    const myGames = await getMyGamesDetail(userId);

    // Fetch game data for each game ID in the user's collection
    const gameDataPromises = myGames.map((myGame) => API.get("api", `/game/${myGame.game_id}`));
    const gameData = await Promise.all(gameDataPromises);

    // Return the game data as the response
    return {
      statusCode: 200,
      body: JSON.stringify({ games: gameData }),
    };
  } catch (error) {
    console.error(error);
    // Return an error response in case of any errors
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
}
