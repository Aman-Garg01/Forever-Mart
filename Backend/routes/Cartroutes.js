import express from 'express'
import { addToCart,getUserCart,updateCart } from '../controller/CartController.js'
import authUser from '../middleware/Auth.js'

const cartRouter = express.Router()

cartRouter.post('/get',authUser,getUserCart)
cartRouter.post('/add',authUser,addToCart)
cartRouter.post('/update',authUser,updateCart)

export default cartRouter