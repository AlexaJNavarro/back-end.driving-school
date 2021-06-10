import mongoose from 'mongoose'
export class Db{
    public static Connection(){
        try {
            if(typeof process.env.URL_DB !=='undefined'){
                mongoose.connect(process.env.URL_DB,{
                    useNewUrlParser: true,
                    useUnifiedTopology:true
                })
                console.log("Base de datos conectada.")
            }else{
                throw new Error("No se logro conectar la base de datos.")
            }
        } catch (error) {
            throw error
        }
    }
}
