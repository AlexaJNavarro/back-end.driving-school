import {Request, Response} from 'express'
import {NotesInterface} from '../interface/notes.interface'
import {NotesModel} from '../model/notes.model'
import {Answer} from '../helper/answer.helper'
export class NotesController{
    public static async GetAll(req:Request, res:Response):Promise<Response>{
        try {
            const notes = await NotesModel.GetAll()
            const response = new Answer('Message',"Se realizo la consulta correctamente",false,notes)
            return res.status(200).json(response)
        } catch (error) {
            const response = new Answer('Error',error,true,null)
            return res.status(500).json(response)
        }
    }
    public static async GetById(req:Request, res:Response):Promise<Response>{
        const id = req.params.ID
        if(id.length==24){
            try {
                const notes = await NotesModel.GetById(id)
                if(notes!=null){
                    const response = new Answer('Message',"Se realizo la consulta correctamente.",false,notes)
                    return res.status(200).json(response)
                }else{
                    const response = new Answer('Message',"No se encontraron datos.",false,notes)
                    return res.status(200).json(response)
                }
                
            } catch (error) {
                const response = new Answer('Error',error,true,null)
                return res.status(500).json(response)
            }
        }else{
            const response = new Answer('Error',"No es valido el id",true,null)
            return res.status(404).json(response)
        }
        
    }

    public static async Create(req:Request, res:Response):Promise<Response>{
        const body:NotesInterface = req.body
        if(body.id_teacher.length == 24 && body.id_student.length==24){
            if(typeof body.notes.simulacrum === 'number' && typeof body.notes.hours === 'number' && typeof body.notes.theoric_exam === 'number' && typeof body.notes.practice_exam === 'number'){
                try {
                    const notes = await NotesModel.Create(body)
                    const response = new Answer('Message',"Se registro correctamente",false,notes)
                    return res.status(201).json(response)
                } catch (error) {
                    const response = new Answer('Error',error,true,null)
                    return res.status(500).json(response)
                }
            }else{
                const response = new Answer('Error',"No es valido los datos ingresados de la colección Notas",true,null)
                return res.status(404).json(response)
            }

        }else{
            const response = new Answer('Error',"No es valido el id del profesor o del estudiante",true,null)
            return res.status(404).json(response)
        }

    }
    public static async Update(req:Request, res:Response):Promise<Response>{
        const id = req.params.ID
        const body:NotesInterface = req.body

        if(id.length==24){
            if(body.id_teacher.length == 24 && body.id_student.length==24){
                if(typeof body.notes.simulacrum === 'number' && typeof body.notes.hours === 'number' && typeof body.notes.theoric_exam === 'number' && typeof body.notes.practice_exam === 'number'){
                    try {
            
                        const notes = await NotesModel.Update(id, body)
                        if(notes != null){
                            const response = new Answer('Message',"Se actualizo correctamente",false,notes)
                            return res.status(200).json(response)
                        }else{
                            const response = new Answer('Error',"El id es incorrecto ",false,null)
                            return res.status(404).json(response)
                        }
                    } catch (error) {
                        const response = new Answer('Error',error,true,null)
                        return res.status(500).json(response)
                    }
                }else{
                    const response = new Answer('Error',"No es valido los datos ingresados de la colección Notas",true,null)
                    return res.status(404).json(response)
                }

            }else{
                const response = new Answer('Error',"No es valido el id del profesor o del estudiante",true,null)
                return res.status(404).json(response)
            }

        }else{
            const response = new Answer('Error',"No es valido el id",true,null)
            return res.status(404).json(response)
        }
        
    }
    public static async Delete(req:Request, res:Response):Promise<Response>{
        const id = req.params.ID
        if(id.length==24){
            try {
                const notes = await NotesModel.Delete(id)
                if(notes.deletedCount != 0){
                    const response = new Answer("Message", "Se elimino el registro", false, notes)
                    return res.status(200).json(response)
                }else{
                    const response = new Answer('Error',"El id es incorrecto ",false,null)
                    return res.status(404).json(response)
                }
            } catch (error) {
                const response = new Answer("Error", error, true, null)
                return res.status(200).json(response)
            }
        }else{
            const response = new Answer('Error',"No es valido el id",true,null)
            return res.status(404).json(response)
        }
    }
    public static async DeleteAll(req:Request, res:Response):Promise<Response>{
        const body:Array<object> = req.body
        if(body!=null){
            try {
                const notes = await NotesModel.DeleteAll(body)
                const response = new Answer("Message", "Se elimino todos los registro", false, notes)
                return res.status(200).json(response)
            } catch (error) {
                const response = new Answer("Error", error, true, null)
                return res.status(500).json(response)
            }

        }else{
            const response = new Answer("Error", "Los datos enviados, son nulos", true, null)
            return res.status(404).json(response)
        }
        
    }
}