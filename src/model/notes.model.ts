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
        // const notes = new notesEntity(body)
        // const update = await notesEntity.({id_student:id}, notes, { multi: true },(err, numAffected)=>{
        //     if(err){
        //         console.log(err)
        //     }
        //     console.log(numAffected)
        // })
        // return update 
    }

    public static Delete(id:string){
        const notes = notesEntity.deleteOne({id_student:id})
        return notes
    }
}