import express from 'express';
const app = express();
import cors from 'cors';

require('dotenv').config();

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

app.use(cors({ credentials: true, origin: '*' }));
app.use(express.json());
app.use(express.static('public'));

// API V1

const swaggerOptionsV1 = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Authentication',
      version: '1.0.0',
      description: 'Documentation API',
    },
    basePath: '/api/v1',
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // optional, but recommended to specify
        },
      },
    },
  },
  apis: ['./api/v1/routes/*.ts'],
};

const swaggerSpecV1 = swaggerJSDoc(swaggerOptionsV1);
const swaggerHtmlV1 = swaggerUi.generateHTML(swaggerSpecV1, swaggerOptionsV1);
app.use('/api/v1/docs', swaggerUi.serveFiles(swaggerSpecV1, swaggerOptionsV1));
app.get('/api/v1/docs', (req, res) => {
  res.send(swaggerHtmlV1);
});

import AuthenticationRoutes from './api/v1/routes/AuthenticationRoutes';
app.use('/api/v1/users', AuthenticationRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
