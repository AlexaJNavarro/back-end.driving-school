import {Router} from 'express'
import {DataController} from '../controller/data.controller'
const dataRouter = Router()
dataRouter
    .get("/", DataController.GetAll)

export default dataRouter