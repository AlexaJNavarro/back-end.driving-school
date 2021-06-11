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
                    image: "img",
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
                    image: "img",
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
                    image: "img",
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

