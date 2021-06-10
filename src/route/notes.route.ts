import {Router} from 'express'
import {NotesController} from '../controller/notes.controller'
const notesRouter = Router()
notesRouter
    .get("/", NotesController.GetAll)
    .post("/", NotesController.Create)
    .put("/:ID", NotesController.Update)
    .delete("/:ID", NotesController.Delete)

export default notesRouter