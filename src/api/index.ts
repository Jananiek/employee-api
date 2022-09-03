import { Router } from 'express';
import employee from './routes/employee';
import health from './routes/health';

export default () => {
  const app = Router();
  health(app);
  employee(app);

  return app;
};
