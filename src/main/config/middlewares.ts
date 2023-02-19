
import { Express } from 'express'
import { bodyParser } from '../middlewares/body-parser'

interface MyExpress extends Express {
  use: any
}

export default (app: MyExpress): void => {
  app.use(bodyParser)
}
