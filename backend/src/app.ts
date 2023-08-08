import express, { Application } from 'express'
import cors from 'cors';
import { connect } from './infra/database';

class App {

    public app: Application;

    constructor() {
        this.app = express();
        this.middlewaresInitialize();
        this.initializeRoutes();
        this.interceptionError();
        connect();
    }

    initializeRoutes() {
        //   this.app.use('/', );
    }

    interceptionError() {
        //   this.app.use();
    }

    middlewaresInitialize() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    listen() {
        const port = 3333;
        this.app.listen(port, () => console.log(`Server is running at port ${port}.`))
    }
}

export { App };