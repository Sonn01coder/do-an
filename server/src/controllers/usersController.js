import { pool } from "../config/connectDB";

const bcrypt = require('bcrypt');

require('dotenv').config();


//get list user member || village user
const getAllUsersExceptAdminAndSuperUser = async (req, res) => {
  try {
    const [rows, fields] = await pool.execute('SELECT * FROM users WHERE role NOT IN ("admin", "super_user")');
    
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

//get list user member || village user || administrators
const getAllUsersExceptSuperUser= async (req, res) => {
  try {
    const [rows, fields] = await pool.execute('SELECT * FROM users WHERE role NOT IN ("super_user")');
    
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


//register user
const registerUser = async (req, res) => {
    const { email, password, role } = req.body;

    // Kiểm tra xem email đã tồn tại hay chưa
    const [existingUser] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (existingUser.length > 0) {
        return res.status(409).json({
            message: "Email already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND));

    //set role or get value default
    const userRole = role || 'member';

    try {
        await pool.execute('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', [email, hashedPassword, userRole]);

        return res.status(201).json({
            message: "User created successfully",
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
  
//update info user
const updateInfoUser = async (req, res) => {
  const { name, phone1 , id} = req.body;

  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    await pool.execute('UPDATE users SET name = ?, phone1 = ?  WHERE id = ?',
      [name,phone1, id]);

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

//update role user
const updateRoleUser = async (req, res) => {
  const {role, id} = req.body

  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    await pool.execute('UPDATE users SET role = ?  WHERE id = ?',
      [role, id]);

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
}

//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Kiểm tra xem email tồn tại trong cơ sở dữ liệu hay không
      const [user] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
  
      if (user.length === 0) {
        return res.status(401).json({
          message: "Invalid email or password"
        });
      }
  
      // So sánh mật khẩu đã mã hóa với mật khẩu người dùng nhập
      const isPasswordMatch = await bcrypt.compare(password, user[0].password);
  
      if (isPasswordMatch) {
        return res.status(200).json({
          message: "Login successful",
          data: user[0]
        });
      } else {
        return res.status(401).json({
          message: "Invalid email or password"
        });
      }
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    }
  };

//delete user
const deleteUser = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      message: "Bad Request: ID not provided"
    });
  }

  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    await pool.execute('DELETE FROM users WHERE id = ?', [id]);

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


//change password
const changePassword = async (req, res) => {
    const { id, oldPassword, newPassword } = req.body;
  
    try {
      // Kiểm tra xem người dùng tồn tại và lấy mật khẩu đã mã hóa từ cơ sở dữ liệu
      const [user] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
  
      if (user.length === 0) {
        return res.status(404).json({
          message: "User not found"
        });
      }
  
      const isPasswordMatch = await bcrypt.compare(oldPassword, user[0].password);
  
      if (!isPasswordMatch) {
        return res.status(401).json({
          message: "Incorrect old password"
        });
      }
  
      // Mật khẩu cũ khớp, tiến hành cập nhật mật khẩu mới
      const hashedNewPassword = await bcrypt.hash(newPassword, parseInt(process.env.BCRYPT_SALT_ROUND));
  
      await pool.execute('UPDATE users SET password = ? WHERE id = ?', [hashedNewPassword, id]);
  
      return res.status(200).json({
        message: "Password updated successfully"
      });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    }
};


//get user = id
const getUserById = async (req, res) => {
  const {id} = req.params; // Lấy id từ tham số đường dẫn

  try {
    const [rows, fields] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      message: "Success",
      data: rows[0]
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
  getUserById,
  loginUser,
  updateInfoUser,
  registerUser,
  deleteUser,
  changePassword,
  getAllUsersExceptAdminAndSuperUser,
  getAllUsersExceptSuperUser,
  updateRoleUser
};
