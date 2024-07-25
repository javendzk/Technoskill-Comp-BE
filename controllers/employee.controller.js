const pg = require("../utils/connect");

exports.addEmployee = async function addEmployee(req, res) {
  // Insert kode ADD di sini
  try {
    const { name, division, salary } = req.body;
    const response = await pg.query('INSERT INTO employee (name, division, salary) VALUES ($1, $2, $3) RETURNING *', [name, division, salary]);

    res.status(201).json(response.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getEmployee = async function getEmployee(req, res) {
  // Insert kode GET di sini
  try {
    const response = await pg.query('SELECT * FROM employee');
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getOneEmployee = async function getOneEmployee(req, res) {
  // Insert kode GET di sini
  try {
    const { id } = req.params;
    const response = await pg.query('SELECT * FROM employee WHERE id = $1', [id]);
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateEmployee = async function updateEmployee(req, res) {
  // Insert kode UPDATE di sini
  try {
    const { id } = req.params;
    const { name, division, salary } = req.body;
    const response = await pg.query('UPDATE employee SET name = $1, division = $2, salary = $3 WHERE id = $4 RETURNING *', [name, division, salary, id]);

    res.status(200).json(response.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteEmployee = async function deleteEmployee(req, res) {
  // Insert kode DELETE di sini
  try {
    const { id } = req.params;
    const response = await pg.query('DELETE FROM employee WHERE id = $1', [id]);
    res.status(200).json({ message: 'Employee deleted successfully!' });
  } catch (error) {
    res.status(500).json(error);
  }
};
