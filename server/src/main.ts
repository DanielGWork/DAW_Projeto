import express, { Express, NextFunction, Request, Response } from "express"
import http from "http"
import cors from "cors"
import mongoose from "mongoose"
import router from "./router"
import compression from "compression"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"


const app: Express = express()
const PORT = 8080
const MONGO_URL = 'mongodb+srv://admin:admin@backenddb.qfqwr.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB'

app.use(express.json())
app.use(cors())
app.use(cors({
  credentials : true,
  origin : 'http://localhost:3000'
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

//const server = http.createServer(app);
/*
app.get("/", (inRequest: Request, inResponse: Response) => {
  inResponse.json({message : "Like this!!"})
})
*/

/*
server.listen(PORT, () => {
  console.log(`Server a correr na porta ${PORT}`)
})
*/

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => {
  console.log(error)
})

app.use('/', router());
app.get("/", (inRequest: Request, inResponse: Response) => {
  inResponse.json({message : "Like this!!"})
})

app.listen(PORT, () => {
  console.log(`Server a correr na porta ${PORT}`)
})