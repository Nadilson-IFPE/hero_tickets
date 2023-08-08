import express, { Application } from 'express'
import cors from 'cors';
import { connect } from './infra/database';
import { errorMiddleware } from './middlewares/error.middleware';
import { EventRoutes } from './routes/event.routes';

class App {

    public app: Application;
    private eventRoutes = new EventRoutes();

    constructor() {
        this.app = express();
        this.middlewaresInitialize();
        this.initializeRoutes();
        this.interceptionError();
        connect();
    }

    initializeRoutes() {
        this.app.use('/events', this.eventRoutes.router);
    }

    interceptionError() {
        this.app.use(errorMiddleware);
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