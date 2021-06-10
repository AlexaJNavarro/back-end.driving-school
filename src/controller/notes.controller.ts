import {Request, Response} from 'express'
import {NotesInterface} from '../interface/notes.interface'
import {NotesModel} from '../model/notes.model'
import {Answer} from '../helper/answer.helper'
export class NotesController{
    public static async Create(req:Request, res:Response):Promise<Response>{
        try {
            const body:NotesInterface = req.body
            const notes = await NotesModel.Create(body)
            const response = new Answer('Message',"Se registro correctamente",false,notes)
            return res.status(201).json(response)
        } catch (error) {
            const response = new Answer('Error',error,true,null)
            return res.status(404).json(response)
        }

    }
}