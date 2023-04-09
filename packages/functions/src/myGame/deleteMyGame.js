import { deleteMyGame } from "@gamejorney/core/database";

export async function main(event) {
// Get the game ID from the POST body
const gameId  = event.pathParameters.gameId;

// Get the user ID from the authorization context
const userId = event.requestContext.authorizer.iam?.cognitoIdentity?.identityId;

// Save the game to the user's collection in the database
const savedGame = await deleteMyGame(userId, gameId);

// Return the saved game as the response
return {
statusCode: 200,
body: JSON.stringify(savedGame)
};
}