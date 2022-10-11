require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.status(200).json({
        message: "Welcome to Movie API",
        api_docs_url:"https://movie-api.xyz/api-docs/"
    })
})

const swaggerUi = require('swagger-ui-express');
const apiDocumentation = require('./apiDocs.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocumentation));

const moviesRoutes = require('./src/api/routes/moviesRoutes');
app.use('/movies', moviesRoutes);

app.listen(port, () => {
    console.log(`port : ${port}`);
})
