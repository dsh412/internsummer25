import pool from '../lib/db';

export default async (req, res) => {
  try {
    const result = await pool.query('SELECT * from player');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Internal server error'});
  }
};
