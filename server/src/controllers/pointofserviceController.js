import { pool } from "../config/connectDB";

const getAllPOS = async (req, res) => {
  try {
    const [rows, fields] = await pool.execute('SELECT * FROM pointofservice');
    
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

const createPOS = async (req, res) => {
  const { name, slug, address, villageId, image, geocode } = req.body;

  if (!name || !slug || !villageId || !image  || !geocode || !address) {
    return res.status(400).json({
      message: "Bad Request: Missing required fields"
    });
  }

  try {
    await pool.execute('INSERT INTO pointofservice (name, slug, address, villageId, image, geocode) VALUES (?, ?, ?, ?, ?, ?)', [name, slug, address, villageId, image, geocode]);
    
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

const updatePOS = async (req, res) => {
  const { name, slug, address, villageId, image, geocode, id } = req.body;

  if (!name || !slug || !villageId || !image || !id || !geocode || !address) {
    return res.status(400).json({
      message: "Bad Request: Missing required fields"
    });
  }

  try {
    const [rows] = await pool.execute('SELECT * FROM pointofservice WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    await pool.execute('UPDATE pointofservice SET name = ?, slug = ?,address = ?, villageId = ?, image = ?, geocode=? WHERE id = ?',
      [name, slug, address, villageId, image, geocode, id]);

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

const deletePOS = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      message: "Bad Request: ID not provided"
    });
  }

  try {
    const [rows] = await pool.execute('SELECT * FROM pointofservice WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    await pool.execute('DELETE FROM pointofservice WHERE id = ?', [id]);

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
  getAllPOS,
  deletePOS,
  updatePOS,
  createPOS,
};
