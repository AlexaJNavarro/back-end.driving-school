import {Request, Response} from 'express'
import {Answer} from '../helper/answer.helper'
import notesEntity from '../entity/notes.entity'
import {DataInterface}from '../interface/data.interface'
import { isValidObjectId } from 'mongoose'
export class DataController{

    public static async Validate(req:Request, res:Response):Promise<Response>{
        const data:DataInterface = req.body
        if(data.id.length == 24 && data.id_student.length == 24 && typeof data.score === 'number'){
            const value:any = await notesEntity.findById(data.id).exec()

            try {
                if(value!=null){
                    const result = await notesEntity.findByIdAndUpdate(data.id , {$set: {"notes.simulacrum": data.score}},{useFindAndModify: false})
                    const response = new Answer("Message", "Se actulizo el puntaje exitosamente",false,result)
                    return res.status(200).json(response) 
                }else{
                    const notes = await notesEntity.create({id_student:data.id_student,"notes.simulacrum": data.score})
                    console.log(notes)
                    const response = new Answer("Message", "Se requistro el puntaje exitosamente", false, notes)
                    return res.status(201).json(response)
                }
            } catch (error) {
                const response = new Answer("Error", error, true, null)
                return res.status(500).json(response)
            }
        }else{
            const response = new Answer("Error", "Los datos enviados, no son correctos", true, null)
            return res.status(404).json(response)
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
                },
                {
                    question: "La siguiente señal vertical reglamentaria R-53:",
                    image: "data:image/jpeg;base64,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",
                    option1: "Prohíbe estacionar.",
                    option2: "Prohíbe al conductor detener el vehículo dentro del área de la intersección.",
                    option3: "Prohíbe la carga y descarga.",
                    option4: "Prohíbe la circulación de vehículos motorizados.",
                    response: 2,
                    value:0
                },
                {
                    question: "Sobre la emisión vehicular de sustancias contaminantes, marque la opción correcta:",
                    image: "",
                    option1: "Está permitida.",
                    option2: "Está prohibida, en un índice superior al límite máximo que permite la norma.",
                    option3: "Está prohibida en el ámbito urbano.",
                    option4: "La norma no regula sobre ello.",
                    response: 2,
                    value:0
                },
                {
                    question: "La siguiente señal (P-46-A), indica:",
                    image: "data:image/jpeg;base64,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",
                    option1: "Que los ciclistas deben usar la ciclovía.",
                    option2: "Que nos aproximamos a un cruce de ciclovía.",
                    option3: "Que la ciclovía es solo para los ciclistas.",
                    option4: "Todas las alternativas son correctas.",
                    response: 2,
                    value:0
                },
                {
                    question: "Si un conductor sale de su propiedad y tiene que cruzar la acera e ingresar a una vía, la conducta correcta es:",
                    image: "",
                    option1: "Dar preferencia de paso solo a los vehículos que circulan por la vía, pero no a los peatones.",
                    option2: "Dar preferencia de paso a los vehículos que circulan por la vía y a los peatones que circulan por la acera.",
                    option3: "Tocar el claxon para advertir a los peatones que circulen por la acera, que se detengan.",
                    option4: "Salir rápidamente, a fin de evitar accidentes.",
                    response: 2,
                    value:0
                },
                {
                    question: "El conductor que en una vía urbana va a girar a la izquierda, a la derecha o en “U” debe hacer la señal respectiva con la luz direccional, por lo menos:",
                    image: "",
                    option1: "2 segundos antes de realizar la maniobra.",
                    option2: "1 metro antes de realizar la maniobra.",
                    option3: "20 metros antes de realizar la maniobra.",
                    option4: "3 metros antes de realizar la maniobra.",
                    response: 3,
                    value:0
                },
                {
                    question: "La siguiente señal (I-18), se utiliza para indicar:",
                    image: "data:image/jpeg;base64,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",
                    option1: "Cercanía a una ferretería.",
                    option2: "Cercanía a un servicio mecánico.",
                    option3: "Cercanía a un grifo.",
                    option4: "Ninguna de las alternativas es correcta.",
                    response: 2,
                    value:0
                },
                {
                    question: "Si llega a una intersección donde el semáforo muestra una luz intermitente, qué afirmación es correcta",
                    image: "",
                    option1: "Si la luz intermitente es roja, ésta es equivalente a un “CEDA EL PASO”.",
                    option2: "Si la luz intermitente es ámbar, tiene preferencia, debiendo reducir la velocidad y continuar con precaución.",
                    option3: "Si la luz intermitente es verde, ésta es equivalente a un “PARE”.",
                    option4: "Ninguna de las alternativas es correcta.",
                    response: 2,
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

