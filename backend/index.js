const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const client = require("prom-client");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ==============================
// PROMETHEUS METRICS
// ==============================

const register = new client.Registry();

client.collectDefaultMetrics({
  register,
});

app.get("/metrics", async (req, res) => {
  try {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
  } catch (error) {
    console.error("Lỗi tạo metrics:", error.message);
    res.status(500).end("Không thể tạo metrics");
  }
});

// ==============================
// KẾT NỐI MYSQL
// ==============================

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "portfolio_user",
  password: process.env.DB_PASSWORD || "portfolio_password",
  database: process.env.DB_NAME || "portfolio_db",
  waitForConnections: true,
  connectionLimit: 10,
});

// ==============================
// API KIỂM TRA SỨC KHỎE
// ==============================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Portfolio API đang hoạt động",
  });
});

// ==============================
// API THÔNG TIN CÁ NHÂN
// ==============================

app.get("/api/personal-info", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, full_name, title, introduction, email, github_url FROM personal_info LIMIT 1"
    );

    res.json({
      success: true,
      data: rows[0] || null,
    });
  } catch (error) {
    console.error("Lỗi truy vấn thông tin cá nhân:", error.message);
    res.status(500).json({
      success: false,
      message: "Không thể lấy thông tin cá nhân",
    });
  }
});


/* ==============================
   API CẬP NHẬT THÔNG TIN CÁ NHÂN
   ============================== */

app.put("/api/personal-info", async (req, res) => {
  try {
    const { full_name, title, introduction, email, github_url } = req.body;

    if (!full_name || !title || !introduction || !email || !github_url) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập đầy đủ thông tin cá nhân",
      });
    }

    const [result] = await db.query(
      `UPDATE personal_info
       SET full_name = ?, title = ?, introduction = ?, email = ?, github_url = ?
       WHERE id = 1`,
      [full_name, title, introduction, email, github_url]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy thông tin cá nhân có id = 1",
      });
    }

    res.json({
      success: true,
      message: "Cập nhật thông tin cá nhân thành công",
    });
  } catch (error) {
    console.error("Lỗi cập nhật thông tin cá nhân:", error.message);
    res.status(500).json({
      success: false,
      message: "Không thể cập nhật thông tin cá nhân",
    });
  }
});

// ==============================
// API DANH SÁCH KỸ NĂNG
// ==============================

app.get("/api/skills", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, skill_name, description FROM skills"
    );

    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Lỗi truy vấn kỹ năng:", error.message);
    res.status(500).json({
      success: false,
      message: "Không thể lấy danh sách kỹ năng",
    });
  }
});

// ==============================
// API DANH SÁCH DỰ ÁN
// ==============================

app.get("/api/projects", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, project_name, description, project_url, created_at FROM projects"
    );

    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Lỗi truy vấn dự án:", error.message);
    res.status(500).json({
      success: false,
      message: "Không thể lấy danh sách dự án",
    });
  }
});

// ==============================
// KHỞI ĐỘNG BACKEND
// ==============================

async function startServer() {
  try {
    const connection = await db.getConnection();

    console.log("Đã kết nối MySQL thành công!");
    connection.release();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Backend đang chạy tại cổng ${PORT}`);
    });
  } catch (error) {
    console.error("Không thể kết nối MySQL:", error.message);
    process.exit(1);
  }
}

startServer();
