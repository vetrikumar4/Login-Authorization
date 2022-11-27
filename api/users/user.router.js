const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createUser,
  login,
  getUserByUserId,
  getUsers,
  updateUsers,
  deleteUser
} = require("./user.controller");
router.get("/",checkToken, getUsers);
router.post("/",createUser);
router.get("/:id",checkToken, getUserByUserId);
router.post("/login", login);
//router.post("/logout",checkToken,logout);
router.patch("/", checkToken, updateUsers);
router.delete("/", checkToken, deleteUser);

module.exports = router;