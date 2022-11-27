const {
    create,
    getUserByUserEmail,
    getUserByUserId,
    getUsers,
    updateUser,
    deleteUser
  } = require("./user.service");
  const { hashSync, genSaltSync, compareSync } = require("bcrypt");
  const { sign } = require("jsonwebtoken");
  
  module.exports = {
    createUser: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      create(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: true,
          message: 'user created successfully' 
         // data: results
        });
      });
    },
    login: (req, res) => {
      const body = req.body;
      getUserByUserEmail(body.email, (err, results) => {
        if (err) {
          console.log(err);
        }
        if (!results) {
          return res.status(401).json({
            success: false,
            data: "Invalid email or password"
          });
        }
        const result = compareSync(body.password, results.password);
        if (result) {
          results.password = undefined;
          const jsontoken = sign({ result: results }, "vet1234", {
            expiresIn: "1h"
          });
          return res.json({
            success: true,
            message: "login successfully",
            token: jsontoken
          });
        } else {
          return res.status(401).json({
            success: false,
            data: "Invalid email or password"
          });
        }
      });
    },
    getUserByUserId: (req, res) => {
      const id = req.params.id;
      getUserByUserId(id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.status(404).json({
            success: false,
            message: "Record not Found"
          });
        }
        results.password = undefined;
        return res.json({
          success: true,
          message: 'details of ID:' +id ,
          data: results
        });
      });
    },
    getUsers: (req, res) => {
      getUsers((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: true,
          message: "list of all uers",
         data: results
        });
      });
    },
    updateUsers: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      updateUser(body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: true,
          message: "updated successfully",
          message: "result is "+results
        });
      });
    },
   
    deleteUser: (req, res) => {
      const data = req.body;
      deleteUser(data, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }

        if (!results) {
          return res.status(404).json({
            success: false,
            message: "Record Not Found",
          });
       
        }
        return res.json({
          success: true,
          message: "user deleted successfully"
        });
      });
    }
  };
