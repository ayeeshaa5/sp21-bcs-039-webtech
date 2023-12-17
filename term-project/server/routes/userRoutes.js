import express from "express";
import path from "path";
import { changePassword, requestPasswordReset, resetPassword, verifyEmail } from "../controllers/userController.js";
import { resetPasswordLink } from "../utils/sendEmail.js";

const router = express.Router();
const __dirname = path.resolve(path.dirname(""));

router.get("/verify/:userId/:token", verifyEmail);

//Password reaset
router.get("/reset-password/:userId/:token", resetPassword);
router.post("/request-passwordreset", requestPasswordReset)
router.post("/reset-password", changePassword)



router.get("/verified", (req, res) => {
    //  res.sendFile(path.join(__dirname, "./views/verifiedpage.html"));
     res.sendFile(path.join(__dirname, "./views/build" , "index.html"));
});
router.get("/resetpassword", (req, res) => {
    //  res.sendFile(path.join(__dirname, "./views/verifiedpage.html"));
     res.sendFile(path.join(__dirname, "./views/build" , "reset.html"));
});

export default router;