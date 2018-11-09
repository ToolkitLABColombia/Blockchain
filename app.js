import SwaggerExpress from 'swagger-express-mw'
import Express from 'express'
import Cors from 'cors'
import fs from 'fs'
import Https from 'https'

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

  try {
    const private_key = fs.readFileSync('/etc/ssl/api.key', 'utf8')
    const certificate = fs.readFileSync('/etc/ssl/api.crt', 'utf8')
    const credentials = {
      key: private_key, cert: certificate
    }
    const https = Https.Server(credentials, app)
    const sport = 10443
    https.listen(sport)
    console.log(`API running with SSL at Port ${sport}`)
  } catch (e) {
    const port = 10010
    app.listen(port)
    console.log(`API running insecurely on Port ${port}, due to ${e.message}`)
  }

});
