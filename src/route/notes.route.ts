import {Router} from 'express'
import {NotesController} from '../controller/notes.controller'
const notesRouter = Router()
notesRouter
    .get("/:ID", NotesController.GetAll)
    .post("/", NotesController.Create)
    .put("/:ID", NotesController.Update)
    .delete("/:ID", NotesController.Delete)
    .post("/delete-all", NotesController.DeleteAll)

export default notesRouter