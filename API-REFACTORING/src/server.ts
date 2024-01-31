import 'express-async-errors';
import cors from 'cors';
import Express, { NextFunction, Request, Response } from 'express';
import router from './routes';
/* import { connect } from './connectionRequest'; */
/* import { UserRepository } from './repositories/UserRepository'; */



const app = Express();
const PORT = 8000;
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use((error: Error,req: Request,res: Response, next: NextFunction)=>{

    return res.json({
        status: 'Error',
        message: error.message
    });
    next();
});
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  app.use(cors());
  next();
});

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  const M = {
    status: 'success',
    data: {
      id: 1,
      name: 'Exemplo API',
      version: '1.0.0',
      description: 'API DE REGISTRO DE DADOS',
    },
  };

  res.json(M);
});

app.use(router);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof Error) {
        return res.status(500).json({
            status: 'Error',
            message: error.message,
        });
    }

    return res.status(500).json({
        status: 'Error',
        message: 'Internal Server Error',
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

