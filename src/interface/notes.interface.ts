import {Document} from 'mongoose'
export interface NotesInterface extends Document{
    id_teacher: string,
    id_student:string,
    notes:{
        simulacrum: number,
        hours: number,
        theoric_exam: number,
        practice_exam: number
    }

}