import express from "express";
import { careRecipientsController } from "./controllers/careRecipientController";

const app = express();

app.use(careRecipientsController);

export default app;
