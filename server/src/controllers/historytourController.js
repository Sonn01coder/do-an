import { pool } from "../config/connectDB";

const getAllHistoryTour = async (req, res) => {
  try {
    const [rows, fields] = await pool.execute('SELECT * FROM historytour');
    
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

const createHistoryTour = async (req, res) => {
  const { userId, tourId, dateStart, dateEnd, tickerNumber } = req.body;

  if (!userId || !tourId || !dateStart || !dateEnd || !tickerNumber) {
    return res.status(400).json({
      message: "Bad Request: Missing required fields"
    });
  }

  try {
    await pool.execute('INSERT INTO historytour (userId, tourId, dateStart, dateEnd, tickerNumber) VALUES (?, ?, ?, ?, ?)', [userId, tourId, dateStart, dateEnd, tickerNumber]);
    
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

const updateHistoryTour = async (req, res) => {
  const { userId,tourId, dateStart, dateEnd, tickerNumber, id } = req.body;

  if (!userId || !tourId || !dateStart ||!dateEnd || !tickerNumber || !id) {
    return res.status(400).json({
      message: "Bad Request: Missing required fields"
    });
  }

  try {
    const [rows] = await pool.execute('SELECT * FROM historytour WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    await pool.execute('UPDATE historytour SET userId = ?,tourId = ?, dateStart = ?,  dateEnd=?, tickerNumber=?  WHERE id = ?',
      [userId,tourId, dateStart, dateEnd, tickerNumber, id]);

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

const deleteHistoryTour = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      message: "Bad Request: ID not provided"
    });
  }

  try {
    const [rows] = await pool.execute('SELECT * FROM historytour WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    await pool.execute('DELETE FROM historytour WHERE id = ?', [id]);

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
  getAllHistoryTour,
  deleteHistoryTour,
  updateHistoryTour,
  createHistoryTour,
};
