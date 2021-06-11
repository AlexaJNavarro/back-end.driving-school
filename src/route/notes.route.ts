import {Router} from 'express'
import {NotesController} from '../controller/notes.controller'
const notesRouter = Router()
notesRouter
    .get("/", NotesController.GetAll)
    .get("/:ID", NotesController.GetById)
    .post("/", NotesController.Create)
    .put("/:ID", NotesController.Update)
    .delete("/:ID", NotesController.Delete)
    .post("/delete-all", NotesController.DeleteAll)

export default notesRouter