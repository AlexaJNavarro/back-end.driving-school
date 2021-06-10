import dotenv from 'dotenv'
import {Server} from './server'
import {Db} from './db/connection.db'
(()=>{
    dotenv.config()
    Db.Connection()
    const server = new Server()
    server.Run()
})()