import {Request, Response} from 'express'
import {Answer} from '../helper/answer.helper'
import notesEntity from '../entity/notes.entity'
export class DataController{

    public static async Validate(req:Request, res:Response){
        const data:any = req.body
        const value = notesEntity.findById(data.id)
        console.log(value)
        if(!value){
            const notes = new notesEntity({simulacrum: data.score})
            const save = await notes.save()
            return save 
        }else{
            const notes = await notesEntity.findByIdAndUpdate(data.id, {simulacrum: data.score}, {useFindAndModify: false})
            return notes 
        }

    }





    public static GetAll(req:Request, res:Response):Response{
        try {

            const data: {question:string, image:string, option1:string, option2:string, option3:string, option4:string, response:number, value:number}[] = [
                {
                    question: "¿Cuál de las siguientes afirmaciones es correcta?",
                    image: "",
                    option1: "El conductor debe respetar los límites máximos y mínimos de velocidad establecidos.",
                    option2: "El conductor debe respetar únicamente los límites máximos de velocidad, pues no existen límites mínimos.",
                    option3: "El conductor puede conducir a la velocidad que desee, siempre que lo haga de manera prudente.",
                    option4: "Ninguna de las alternativas es correcta.",
                    response: 1,
                    value:0
                },
                {
                    question: "Al cambiar de carril en una vía de un solo sentido con múltiples carriles, ¿cuál es la conducta correcta?",
                    image: "",
                    option1: "Se deben encender las luces direccionales primero, buscar una brecha y realizar el cambio de carril con precaución.",
                    option2: "Se debe encontrar una brecha, luego cambiar de carril con precaución; no es necesario el uso de luces direccionales para cambios de carril.",
                    option3: "Se debe advertir utilizando el claxon, identificar una brecha y realizar el cambio de carril con precaución.",
                    option4: "Está prohibido el cambio de carril en vías de un solo sentido.",
                    response: 1,
                    value:0
                },
                {
                    question: "Señale cuáles de las siguientes conductas constituye una infracción al tránsito:?",
                    image: "",
                    option1: "Tener la puerta, capot o maletera del vehículo abierta, cuando el vehículo está en marcha.",
                    option2: "Conducir un vehículo lentamente por el carril de la izquierda causando congestión.",
                    option3: "Conducir un vehículo con el motor en punto neutro o apagado.",
                    option4: "Todas las alternativas son correctas.",
                    response: 4,
                    value:0
                }
            ]

            return res.status(200).json(data)

        } catch (error) {
            const response = new Answer("Error", "Se ha producido un error", true, null)
            return res.status(500).json(response)
        }

    }


}

