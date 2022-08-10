const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const { Client, Environment } = require("square");
const { parse } = require("uuid");
require("dotenv").config();
admin.initializeApp();

const accessToken = process.env.SQUARE_ACCESS_TOKEN;
const client = new Client({
	environment: Environment.Sandbox,
	accessToken:
		"EAAAEBWxZXEn5w9-zyWjsYlzPlob1SNEPSS0_Bys0jtIhTDur6WijIzyvCfXbom7",
});

const paymentsApi = client.paymentsApi;
const customersApi = client.customersApi;

const sgMail = require("@sendgrid/mail");

exports.createCustomer = functions.https.onRequest((req, res) => {
	return cors(req, res, async () => {
		const data = req.body.data;

		const body = {
			idempotencyKey: data.idempotencyKey,
			givenName: data.givenName,
			emailAddress: data.emailAddress,
		};
		try {
			customersApi
				.createCustomer(body)
				.then((ress) => {
					const respuesta = JSON.stringify(
						ress.result,
						(key, value) =>
							typeof value === "bigint" ? value.toString() : value // return everything else unchanged
					);
					console.log(respuesta, "desde el cloud");
					res.status(200).send({ data: respuesta });
				})
				.catch((err) => {
					console.log(err, "error 400 pupusito");
					res.status(400).send({ error: err });
				});
		} catch (error) {
			console.log(error);
			res.status(400).send({ error: error });
		}
	});
});
