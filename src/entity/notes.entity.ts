import {Schema, model} from 'mongoose'
import {NotesInterface} from '../interface/notes.interface'

const notesSchema:Schema = new Schema({
    id_student:{
        type: String,
        requiere:true
    },
    id_teacher:{
        type: String,
        requiere:true
    },
    notes:{
        simulacrum: {
            type: Number,
            requiere:true
        },
        hours: {
            type: Number,
            requiere:true
        },
        theoric_exam: {
            type: Number,
            requiere:true
        },
        practice_exam: {
            type: Number,
            requiere:true
        }
    }
})

export default model<NotesInterface>('notes',notesSchema)