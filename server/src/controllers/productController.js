import { pool } from "../config/connectDB";

const getAllProducts = async (req, res) => {
  try {
    const [rows, fields] = await pool.execute('SELECT * FROM productvillages');
    
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

const createProduct = async (req, res) => {
  const { name, slug, villageId, image, description } = req.body;

  if (!name || !slug || !villageId || !image || !description) {
    return res.status(400).json({
      message: "Bad Request: Missing required fields"
    });
  }

  try {
    await pool.execute('INSERT INTO productvillages (name, slug, villageId, image, description) VALUES (?, ?, ?, ?, ?)', [name, slug, villageId, image, description]);
    
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

const updateProduct = async (req, res) => {
  const { name, slug, villageId, image, description, id } = req.body;

  if (!name || !slug || !villageId || !image  || !description || !id) {
    return res.status(400).json({
      message: "Bad Request: Missing required fields"
    });
  }

  try {
    const [rows] = await pool.execute('SELECT * FROM productvillages WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    await pool.execute('UPDATE productvillages SET name = ?, slug = ?, villageId = ?, image = ?, description = ? WHERE id = ?',
      [name, slug, villageId, image, description, id]);

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

const deleteProduct = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      message: "Bad Request: ID not provided"
    });
  }

  try {
    const [rows] = await pool.execute('SELECT * FROM productvillages WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    await pool.execute('DELETE FROM productvillages WHERE id = ?', [id]);

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
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
};
