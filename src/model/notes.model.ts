import {NotesInterface} from '../interface/notes.interface'
import notesEntity from '../entity/notes.entity'

export class NotesModel{
    public static GetAll(){
        const notes = notesEntity.find()
        return notes
    }
    public static async Create(body: NotesInterface){
        const notes = new notesEntity(body)
        const save = await notes.save()
        return save 
    }
    public static async Update(id:string, body:NotesInterface){
        const notes = await notesEntity.findByIdAndUpdate(id, body, {useFindAndModify: false})
        return notes 
    }

    public static Delete(id:string){
        const notes = notesEntity.deleteOne({_id:id})
        return notes
    }
    public static async DeleteAll(body:Array<object>){
        const value = null
        for (var i = 0; i < body.length;i++) {
            await notesEntity.findByIdAndRemove(body[i],{useFindAndModify: false})
        }
        return value
    }
}