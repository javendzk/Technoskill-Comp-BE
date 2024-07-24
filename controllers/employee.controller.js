const pg = require("../utils/connect");

exports.addEmployee = async function addEmployee(req, res) {
  // Insert kode ADD di sini
  try {
    const result = await pg.pool.query(
      "INSERT INTO employee VALUES ('Nahle', 'PIPTE', 1001) RETURNING *"
    );

    return res.status(201).json(result.rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getEmployee = async function getEmployee(req, res) {
  // Insert kode GET di sini
};

exports.getOneEmployee = async function getOneEmployee(req, res) {
  // Insert kode GET di sini
};

exports.updateEmployee = async function updateEmployee(req, res) {
  // Insert kode UPDATE di sini
};

exports.deleteEmployee = async function deleteEmployee(req, res) {
  // Insert kode DELETE di sini
};
