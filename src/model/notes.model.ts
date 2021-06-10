import {NotesInterface} from '../interface/notes.interface'
import notesEntity from '../entity/notes.entity'

export class NotesModel{
    public static async Create(body: NotesInterface){
        const notes = new notesEntity(body)
        const save = await notes.save()
        return save 
    }
}