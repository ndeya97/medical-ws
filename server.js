const express = require('express');
const connectDb = require("./config/db");
const { doctors, patients } = require("./routes/index");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
connectDb();

app.use(express.json());

const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: 'Medical-ws REST API',
			description: "A REST API built with Express and MongoDB. This API provides the repository management of healthcare professionals."
		},
	},
	apis: ["./routes/doctors.js", "./routes/patients"]
}

app.use('/doctors', doctors)
app.use('/patients', patients)

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.listen(process.env.PORT || 5000, () => console.log('Up and run at PORT 5000 🚀✔️'));
