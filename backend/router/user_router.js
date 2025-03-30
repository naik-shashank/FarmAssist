const user=require("../controllers/user_controller")
const auth=require("../utils/jwt&key")
const express=require("express")
const router=express.Router()

router.route("/signup").post(user.SignUp)
router.route("/login").post(user.login)
router.route("/dashboard").get(auth.verifyAuthToken,user.dashboard)

module.exports=router