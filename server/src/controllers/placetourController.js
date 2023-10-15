import { pool } from "../config/connectDB";

const getAllPlaceTour = async (req, res) => {
  try {
    const [rows, fields] = await pool.execute('SELECT * FROM placetour');
    
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

const createPlaceTour = async (req, res) => {
  const { name, image, link, geocode } = req.body;

  if (!name || !image || !link || !geocode) {
    return res.status(400).json({
      message: "Bad Request: Missing required fields"
    });
  }

  try {
    await pool.execute('INSERT INTO placetour (name, image, link, geocode) VALUES (?, ?, ?, ?)', [name, image, link, geocode]);
    
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

const updatePlaceTour = async (req, res) => {
  const { name,image, link, geocode, id } = req.body;

  if (!name || !image || !link || !id || !geocode) {
    return res.status(400).json({
      message: "Bad Request: Missing required fields"
    });
  }

  try {
    const [rows] = await pool.execute('SELECT * FROM placetour WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    await pool.execute('UPDATE placetour SET name = ?,image = ?, link = ?,  geocode=?  WHERE id = ?',
      [name,image, link, geocode, id]);

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

const deletePlaceTour = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      message: "Bad Request: ID not provided"
    });
  }

  try {
    const [rows] = await pool.execute('SELECT * FROM placetour WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    await pool.execute('DELETE FROM placetour WHERE id = ?', [id]);

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
  getAllPlaceTour,
  deletePlaceTour,
  updatePlaceTour,
  createPlaceTour,
};
