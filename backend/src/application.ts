import * as express from "express";
import { careRecipientsController } from "./controllers/careRecipients";

const app = express();

app.use(careRecipientsController);

export default app;
