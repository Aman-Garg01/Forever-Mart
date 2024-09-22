import express from "express";
import { addCloth, listCloth, removeCloth,singleCloth } from "../controller/clothController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";


const clothRouter = express.Router();


clothRouter.post("/add",adminAuth,upload.fields([{name:'image1', maxCount:1},{name:'image2', maxCount:1},{name:'image3', maxCount:1},{name:'image4', maxCount:1}]), addCloth)

clothRouter.get("/list", listCloth)
clothRouter.post("/remove", removeCloth)
clothRouter.post("/single",singleCloth)



export default clothRouter