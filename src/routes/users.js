import express from "express";

export default function usersRoute(pool) {
  const router = express.Router();

  // GET all students
  router.get("/", async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM users"); // your table name
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // POST new student
  router.post("/", async (req, res) => {
    const { name, marks } = req.body;
    try {
      const [result] = await pool.query(
        "INSERT INTO users (name, marks) VALUES (?, ?)",
        [name, marks]
      );
      res.json({ success: true, id: result.insertId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}
