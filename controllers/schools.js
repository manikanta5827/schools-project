const { pool } = require('../config/postgres');

const addschool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // PostgreSQL parameterized query uses $1, $2, $3, etc.
    const result = await pool.query(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, address, parseFloat(latitude), parseFloat(longitude)]
    );

    res.status(201).json({
      message: 'School added successfully',
      schoolId: result.rows[0].id, // Get the id of the inserted record
    });
  } catch (error) {
    res.status(500).json({ error: 'Database error', details: error.message });
  }
};

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;

  const R = 6371; 
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distanceInKm = R * c; 

  
  return `${distanceInKm.toFixed(2)} km`;  
};


const listschools = async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ error: 'Latitude and longitude are required.' });
  }

  try {
    const { rows: schools } = await pool.query('SELECT * FROM schools');
    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

   
    const schoolsWithDistance = schools.map((school) => ({
      ...school,
      distance: haversineDistance(
        userLat,
        userLon,
        school.latitude,
        school.longitude
      ),
    }));


    schoolsWithDistance.sort((a, b) => {
      const distanceA = parseFloat(a.distance);
      const distanceB = parseFloat(b.distance);
      return distanceA - distanceB;
    });

    res.status(200).json(schoolsWithDistance);
  } catch (error) {
    res.status(500).json({ error: 'Database error', details: error.message });
  }
};


module.exports = { addschool, listschools };
