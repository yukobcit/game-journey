import { postGame } from "@gamejorney/core/database";

export async function main(event) {
  // Get the form data from the POST body
  const { name, company, console, description, releaseDate } = JSON.parse(event.body);

  // Get the user ID from the authorization context
  const userId = event.requestContext.authorizer.iam?.cognitoIdentity?.identityId;

  // Create the game object
  const game = {
    name,
    company,
    console,
    description,
    releaseDate,
    userId
  };

  // Save the game to the database
  const savedGame = await postGame(game);

  // Return the saved game as the response
  return {
    statusCode: 200,
    body: JSON.stringify(savedGame)
  };
}
