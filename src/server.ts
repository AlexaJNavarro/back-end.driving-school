import express, {Application} from 'express'
import cors from 'cors'
import dataRouter from './route/data.route'
import notesRouter from './route/notes.route'
export class Server{
    private app: Application
    constructor(){
        this.app = express()
    }

    public Run(){
        this.Middleware()
        this.Route()
        this.Listening()
    }

    private Middleware(){
        this.app.use(cors())
        this.app.use(express.json())
    }

    private Route(){
        this.app.use(process.env.BASE_URL+'/data',dataRouter)
        this.app.use(process.env.BASE_URL+'/notes',notesRouter)
    }

    private Listening(){
        this.app.listen(process.env.PORT)
        console.log(process.env.PORT)
    }
}