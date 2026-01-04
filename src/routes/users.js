import express from "express";

export default function usersRoute(pool) {
  const router = express.Router();

  // GET all users
  router.get("/", async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM users"); // replace 'users' with your table name
      res.json(rows);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  // POST new user
  router.post("/", async (req, res) => {
    const { name, marks } = req.body;

    if (!name || marks === undefined) {
      return res.status(400).json({ error: "Name and marks are required" });
    }

    try {
      const [result] = await pool.query(
        "INSERT INTO users (name, marks) VALUES (?, ?)",
        [name, marks]
      );
      res.status(201).json({ success: true, id: result.insertId });
    } catch (error) {
      console.error("Error adding user:", error);
      res.status(500).json({ error: "Failed to add user" });
    }
  });

  return router;
}




