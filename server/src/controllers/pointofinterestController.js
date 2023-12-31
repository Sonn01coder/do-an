import { pool } from "../config/connectDB";

const getAllPOI = async (req, res) => {
  try {
    const [rows, fields] = await pool.execute('SELECT * FROM pointofinterest');
    
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

const createPOI = async (req, res) => {
  const { name, slug, address, villageId, image, description, geocode } = req.body;

  if (!name || !slug || !villageId || !image || !description || !geocode || !address) {
    return res.status(400).json({
      message: "Bad Request: Missing required fields"
    });
  }

  try {
    await pool.execute('INSERT INTO pointofinterest (name, slug, address, villageId, image, description, geocode) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, slug, address, villageId, image, description, geocode]);
    
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

const updatePOI = async (req, res) => {
  const { name, slug, address, villageId, image, description, geocode, id } = req.body;

  if (!name || !slug || !villageId || !image  || !description || !id || !geocode || !address) {
    return res.status(400).json({
      message: "Bad Request: Missing required fields"
    });
  }

  try {
    const [rows] = await pool.execute('SELECT * FROM pointofinterest WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    await pool.execute('UPDATE pointofinterest SET name = ?, slug = ?, address = ?, villageId = ?, image = ?, description = ?, geocode=?  WHERE id = ?',
      [name, slug, address, villageId, image, description, geocode, id]);

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

const deletePOI = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      message: "Bad Request: ID not provided"
    });
  }

  try {
    const [rows] = await pool.execute('SELECT * FROM pointofinterest WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    await pool.execute('DELETE FROM pointofinterest WHERE id = ?', [id]);

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
  getAllPOI,
  deletePOI,
  updatePOI,
  createPOI,
};
