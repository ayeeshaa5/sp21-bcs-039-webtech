import express from "express";
import path from "path";
import { changePassword, requestPasswordReset, resetPassword, verifyEmail } from "../controllers/userController.js";
import { resetPasswordLink } from "../utils/sendEmail.js";

const router = express.Router();
const __dirname = path.resolve(path.dirname(""));

router.get("/verify/:userId/:token", verifyEmail);

//Password reaset
// router.post("/reset-password", resetPassword);
router.post("/request-passwordreset", requestPasswordReset);
router.get("/reset-password/:userId/:token", resetPassword);
 router.post("/reset-password", changePassword);

//  router.post("/reset-password", async (req, res) => {
//     const { type, id } = req.query;

//     if (type === 'reset') {
//         // Call the function to reset the password
//         await resetPassword(req, res);
//     } else {
//         // Call the function to change the password
//         await changePassword(req, res);
//     }
// });



router.get("/verified", (req, res) => {
    //  res.sendFile(path.join(__dirname, "./views/verifiedpage.html"));
     res.sendFile(path.join(__dirname, "./views/build" , "index.html"));
});
router.get("/resetpassword", (req, res) => {
    //  res.sendFile(path.join(__dirname, "./views/verifiedpage.html"));
     res.sendFile(path.join(__dirname, "./views/build" , "reset.html"));
});

export default router;