import express from "express";

export default function usersRoute(pool) {
  const router = express.Router();

  // Test route
  router.get("/test", (req, res) => {
    res.json({ message: "Users API working" });
  });

  // GET all users
  router.get("/", async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM users");
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Database error" });
    }
  });

  // POST user
  router.post("/", async (req, res) => {
    const { name, marks } = req.body;

    if (!name || marks === undefined) {
      return res.status(400).json({ error: "Name & marks required" });
    }

    try {
      const [result] = await pool.query(
        "INSERT INTO users (name, marks) VALUES (?, ?)",
        [name, marks]
      );
      res.status(201).json({ id: result.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Insert failed" });
    }
  });

  return router;
}
 