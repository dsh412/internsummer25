import data from '../lib/db';

export default async (requestAnimationFrame, res) => {
  try {
    const result = await data.query('SELECT * from Player');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Internal server error'});
  }
};
