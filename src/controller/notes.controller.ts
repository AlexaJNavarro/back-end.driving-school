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
            return res.status(404).json(response)
        }
    }
    public static async GetById(req:Request, res:Response):Promise<Response>{
        try {
            const id = req.params.ID
            const notes = await NotesModel.GetById(id)
            const response = new Answer('Message',"Se realizo la consulta correctamente",false,notes)
            return res.status(200).json(response)
        } catch (error) {
            const response = new Answer('Error',error,true,null)
            return res.status(404).json(response)
        }
    }

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
    public static async Update(req:Request, res:Response):Promise<Response>{
        try {
            const id = req.params.ID
            const body:NotesInterface = req.body
            const notes = await NotesModel.Update(id, body)
            const response = new Answer('Message',"Se actualizo correctamente",false,notes)
            return res.status(200).json(response)
        } catch (error) {
            const response = new Answer('Error',error,true,null)
            return res.status(404).json(response)
        }

    }
    public static async Delete(req:Request, res:Response):Promise<Response>{
        try {
            const id = req.params.ID
            const notes = await NotesModel.Delete(id)
            const response = new Answer("Message", "Se elimino el registro", false, notes)
            return res.status(200).json(response)
        } catch (error) {
            const response = new Answer("Error", error, true, null)
            return res.status(200).json(response)
        }
    }
    public static async DeleteAll(req:Request, res:Response):Promise<Response>{
        try {
            const body:Array<object> = req.body
            const notes = await NotesModel.DeleteAll(body)
            const response = new Answer("Message", "Se elimino todos los registro", false, notes)
            return res.status(200).json(response)
        } catch (error) {
            const response = new Answer("Error", error, true, null)
            return res.status(200).json(response)
        }
    }
}