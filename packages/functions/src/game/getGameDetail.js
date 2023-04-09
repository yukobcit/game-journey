import { getGameDetail } from "@gamejorney/core/database";

export async function main(event) {


  // Get the game ID from the POST body
  const gameId  = event.pathParameters.gameId;
  console.log("this is gameId",gameId);

  // Save the game to the database
  const game = await getGameDetail(gameId);

  console.log(game);

  // Return the saved game as the response
  return {
    statusCode: 200,
    body: JSON.stringify({game : game})
  };
}
