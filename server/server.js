const express = require('express');
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const app = express();


app.use(express.json());
app.use(cors());

const routes = require('./routes/index.js');
app.use('/api', routes);

const swaggerDoc = require('./generate-docs.js')
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(3000, () => console.log("Server is started..."));