 import { pool } from "../config/connectDB";

const getAllVillages = async (req, res) => {
  try {
    const [rows, fields] = await pool.execute('SELECT * FROM village');
    
    return res.status(200).json({
      message: "Success",
      data: rows
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  }
};

const createVillage = async (req, res) => {
  const { name, slug, address, image, history, geocode } = req.body;

  if (!name || !slug || !address || !image || !history || !geocode) {
    return res.status(400).json({
      message: "Bad Request: Missing required fields"
    });
  }

  try {
    await pool.execute('INSERT INTO village (name, slug, address, image, history, geocode) VALUES (?, ?, ?, ?, ?, ?)', [name, slug, address, image, history, geocode]);
    
    return res.status(201).json({
      message: "Village created successfully",
      data: req.body
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  }
};

const updateVillage = async (req, res) => {
  const { name, slug, address, image, history, geocode, id } = req.body;

  if (!name || !slug || !address || !image || !history || !geocode || !id) {
    return res.status(400).json({
      message: "Bad Request: Missing required fields"
    });
  }

  try {
    const [rows] = await pool.execute('SELECT * FROM village WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Village not found"
      });
    }

    await pool.execute('UPDATE village SET name = ?, slug = ?, address = ?, image = ?, history = ?, geocode = ? WHERE id = ?',
      [name, slug, address, image, history, geocode, id]);

    return res.status(200).json({
      message: "Village updated successfully"
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  }
};

const deleteVillage = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      message: "Bad Request: ID not provided"
    });
  }

  try {
    const [rows] = await pool.execute('SELECT * FROM village WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Village not found"
      });
    }

    await pool.execute('DELETE FROM village WHERE id = ?', [id]);

    return res.status(204).json();
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  }
};

export default {
  getAllVillages,
  createVillage,
  updateVillage,
  deleteVillage
};
