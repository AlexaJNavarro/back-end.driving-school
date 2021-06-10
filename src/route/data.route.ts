import {Router} from 'express'
import {DataController} from '../controller/data.controller'
const dataRouter = Router()
dataRouter
    .get("/", DataController.GetAll)
    .post("/", DataController.Validate)

export default dataRouter