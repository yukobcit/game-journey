import { getGames } from "@gamejorney/core/database";

export async function main(event) {

  const connectionString = process.env.DATABASE_URL;
  const games = await getGames()
  return {
    statusCode: 200,
    body: JSON.stringify({ games: games }),
  }
}