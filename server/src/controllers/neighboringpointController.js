import { pool } from "../config/connectDB";

const getAllNei = async (req, res) => {
  try {
    const [rows, fields] = await pool.execute('SELECT * FROM neighboringpoints');
    
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

const createNei = async (req, res) => {
  const { name, category, villageId, geocode } = req.body;

  if (!name || !category || !villageId || !geocode) {
    return res.status(400).json({
      message: "Bad Request: Missing required fields"
    });
  }

  try {
    await pool.execute('INSERT INTO neighboringpoints (name, category, villageId, geocode) VALUES (?, ?, ?, ?)', [name, category, villageId, geocode]);
    
    return res.status(201).json({
      message: "Product created successfully",
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

const updateNei = async (req, res) => {
  const { name,category, villageId, geocode, id } = req.body;

  if (!name || !category || !villageId || !id || !geocode) {
    return res.status(400).json({
      message: "Bad Request: Missing required fields"
    });
  }

  try {
    const [rows] = await pool.execute('SELECT * FROM neighboringpoints WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    await pool.execute('UPDATE neighboringpoints SET name = ?,category = ?, villageId = ?,  geocode=?  WHERE id = ?',
      [name,category, villageId, geocode, id]);

    return res.status(200).json({
      message: "Product updated successfully"
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  }
};

const deleteNei = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      message: "Bad Request: ID not provided"
    });
  }

  try {
    const [rows] = await pool.execute('SELECT * FROM neighboringpoints WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    await pool.execute('DELETE FROM neighboringpoints WHERE id = ?', [id]);

    return res.status(204).json({
        message: "Delete product"
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  }
};

export default {
  getAllNei,
  deleteNei,
  updateNei,
  createNei,
};
