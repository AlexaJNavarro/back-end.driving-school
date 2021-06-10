import {Router} from 'express'
import {NotesController} from '../controller/notes.controller'
const notesRouter = Router()
notesRouter
    .post("/", NotesController.Create)

export default notesRouter