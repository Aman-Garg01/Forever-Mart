import clothModel from "../models/clothModel.js";
import { v2 as cloudinary } from "cloudinary";



// add cloth item

const addCloth = async (req, res) => {


    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
                return result.secure_url
            })
        )

        const clothData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }

        // console.log(clothData);

        const cloth = new clothModel(clothData);
        await cloth.save();

        res.json({ success: true, message: "Cloth Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

// all cloth list 

const listCloth = async (req, res) => {
    try {
        const cloths = await clothModel.find({});
        res.json({ success: true, data: cloths })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// remove cloth item

const removeCloth = async (req, res) => {

    try {

        await clothModel.findByIdAndDelete(req.body.id);
        res.json({ succes: true, message: "Cloth Removed" })
    } catch (error) {
        console.log(error);
        res.json({ succes: false, message: error.message })
    }
}

// single cloth function

const singleCloth = async (req, res) => {
    try {

        const { clothId } = req.body
        const cloth = await clothModel.findById(clothId)
        res.json({ succes: true, cloth })

    } catch (error) {
        console.log(error);
        res.json({ succes: false, message: error.message })
    }
}



export { addCloth, listCloth, removeCloth, singleCloth }