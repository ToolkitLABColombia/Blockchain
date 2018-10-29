import SwaggerExpress from 'swagger-express-mw'
import Express from 'express'
import Cors from 'cors'

const app = Express();
const cors = Cors();

app.use(cors);

module.exports = app; // for testing

const config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, (err, swaggerExpress) => {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  const port = process.env.PORT || 10010;
  app.listen(port);

  console.log(`API running at Port ${port}`)
});
