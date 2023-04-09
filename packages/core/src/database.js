import pg from 'pg'
const { Pool } = pg

const dotenv = require('dotenv');
dotenv.config();

let pool
function getPool() {
  if (!pool) {
    
   const connectionString = process.env.DATABASE_URL;

    pool = new Pool({
      connectionString,
      application_name: "",
      max: 1,
    });
  }
  return pool
}

export async function getGames() {
  const res = await getPool().query(`
  SELECT * FROM games
  `)
  return res.rows
}

export async function getGameDetail(gameId) {
  const res = await getPool().query(`
  SELECT * FROM games
  WHERE id = $1
  `, [gameId]);
  return res.rows[0];
}

export async function postGame(game) {
  const { name, company, console, description, releaseDate, userId } = game;
  const res = await getPool().query(`
    INSERT INTO games (name, company, console, description, release_date, user_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `, [name, company, console, description, releaseDate, userId]);
  return res.rows[0];
}

export async function postUser(user) {
  const { username, email, uerId } = user;
  const res = await getPool().query(`
    INSERT INTO users (username, email, id)
    VALUES ($1, $2, $3)
    RETURNING *
  `, [username, email, userId]);
  return res.rows[0];
}

export async function getMyGames(userId) {
  const res = await getPool().query(`
  SELECT * FROM my_games
  WHERE user_id = $1
  `, [userId]);
  return res.rows;
}

export async function postMyGame(userId, gameId) {
  const res = await getPool().query(`
    INSERT INTO my_games (user_id, game_id)
    VALUES ($1, $2)
    RETURNING *
  `, [userId, gameId]);
  return res.rows[0];
}

export async function deleteMyGame(userId, gameId) {
  const res = await getPool().query(`
    DELETE FROM my_games
    WHERE user_id = $1 AND game_id = $2
    RETURNING *
  `, [userId, gameId]);
  return res.rows[0];
}

export async function getMyGamesDetails(userId, gameId) {
  const res = await getPool().query(`
    SELECT games.*
    FROM my_games
    JOIN games ON games.id = my_games.game_id
    WHERE my_games.user_id = $1 AND my_games.game_id = $2
  `, [userId, gameId]);
  return res.rows;
}

export async function getJornals(gameId, userId){
  const res = await getPool().query(`
    SELECT * FROM my_games_log
    WHERE game_id = $1 AND user_id = $2
  `, [gameId, userId]);
  return res.rows;
}

export async function postJornal(gameId, userId, jornal){
  const res = await getPool().query(`
    INSERT INTO my_games_log (game_id, user_id, jornal)
    VALUES ($1, $2, $3)
    RETURNING *
  `, [gameId, userId, jornal]);
  return res.rows[0];
}

export async function updateJornal(userId, jornalId, entry){
  const res = await getPool().query(`
    UPDATE my_games_log
    SET jornal = $3
    WHERE user_id = $1 AND id = $2
    RETURNING *
  `, [userId, jornalId, entry]);
  return res.rows[0];
}

export async function deleteJornal(userId, jornalId){
  const res = await getPool().query(`
    DELETE FROM my_games_log
    WHERE user_id = $1 AND id = $2
    RETURNING *
  `, [userId, jornalId]);
  return res.rows[0];
}

export async function getAllJornals(){
  const res = await getPool().query(`
    SELECT my_games_log.*, games.name as game_name
    FROM my_games_log
    INNER JOIN games ON my_games_log.game_id = games.id
    ORDER BY my_games_log.played_at DESC
  `);
  return res.rows;
}