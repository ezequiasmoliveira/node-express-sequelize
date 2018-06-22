const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const models = require('./models/index');
const bunyan = require('bunyan');
const bunyanMiddleware = require('bunyan-middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

//Rotas
const index = require('./routes/index');
const personRoute = require('./routes/personRoute');
const userRoute = require('./routes/userRoute');

// configuração do bunyan
var logger = bunyan.createLogger({
  name: 'node-express-sequelize',
  streams: [ 
    {
      level: 'info',
      stream: process.stdout
    },
    {
      level: 'warn',
      path: __dirname + './../log/app-error.log'
    },
    {
      level: 'error',
      path: __dirname + './../log/app-error.log'
    }
  ]
});

// configura o bunyan-middleware
app.use(bunyanMiddleware(
  { headerName: 'X-Request-Id' // o nome do cabeçalho HTTP para o ID da solicitação.
    , propertyName: 'reqId' // O nome da propriedade no objeto de solicitação para definir o ID da solicitação.
    , logName: 'req_id' // O nome do id da solicitação na saída do log.
    , obscureHeaders: [] // Defina como uma matriz com nomes de cabeçalho para ocultar os valores de cabeçalho da saída do log. A saída ainda mostrará os nomes dos cabeçalhos, com o valor definido como null.
    , logger: logger // a instância do logger bunyan
    // Uma função recebendo req e res como argumentos, retornando um objeto. 
    // Os elementos no objeto retornado serão adicionados aos campos da request finish mensagem.
    , additionalRequestFinishData: function(req, res) {
        return { example: true };
      }
    }
));

//Configurando o body parser para pegar POSTS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configurando o swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Configurando as rotas
app.use('/', index);
app.use('/persons', personRoute);
app.use('/users', userRoute);

//Sincroniza todos os models, definidos, com o banco de dados
models.sequelize.sync();

module.exports = app;