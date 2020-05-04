const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database");

router.get("/", (req, res) => {
  mysqlConnection.query("SELECT * FROM employees", (err, rows, field) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    `SELECT * FROM employees WHERE employees.id = ?`,
    [id],
    (err, rows, field) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});

/**
 * @param name, nombre salary data comes from postmant
 * ! name, nombre, salary
 */
router.post("/", (req, res) => {
  const { id, nombre, salary } = req.body;
  const query = `
        SET @id = ?;
        SET @nombre = ?;
        SET @salary = ?;
        Call EmployeeAddorEdit(@id, @nombre, @salary)
    `;
  mysqlConnection.query(query, [id, nombre, salary], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: "Employeed saved" });
    } else {
      console.log(err);
    }
  });
});

router.put("/:id", (req, res) => {
  const { nombre, salary } = req.body;
  const { id } = req.params;
  const query = `Call EmployeeAddorEdit(?, ?, ?)`;
  mysqlConnection.query(query, [id, nombre, salary], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: "Employeed updated" });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
