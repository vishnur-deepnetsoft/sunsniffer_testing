import express, { Application, Request, Response } from "express";
import MongodDBConnector from "@sunsniffer/mongodb-connector";
import { MongoClient } from "@sunsniffer/mongodb-connector";
import connectDB from '../sunsniffer/config/database';
import { connection as mongoRawDataConnection } from "@sunsniffer/mongodb-connector"

const app: Application = express();
const port = 3000;

// Connect to MongoDB
connectDB();

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get(
    "/",
    async (req: Request, res: Response): Promise<Response> => {    
        const mongoDbConnector = new MongodDBConnector(
            {
              mysql: {},
              mongo: { uri: 'mongodb://localhost:27017/modules' }
            }
          );
          const module15minEnergyParams = {
            type: "module",
            parentId: "4e43d9f735c98",
            density: "15m",
            timezone: "Europe/Berlin",
            dataDensity: "15min",
            from: "2022-03-09 23:00:00",
            to: "2022-03-10 22:59:59"
          }
          console.log(mongoRawDataConnection.readyState,'db')
        const module15minEnergyData = await mongoDbConnector.getData(module15minEnergyParams);
        return res.status(200).send({
            data: module15minEnergyData,
        });
    }
);

try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error) {
    console.error(error);
}
