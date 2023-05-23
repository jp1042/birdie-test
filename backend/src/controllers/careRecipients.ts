import * as express from "express";
import * as mysql from "mysql";
import { validate as uuidValidate } from "uuid";
import * as dotenv from "dotenv";

dotenv.config();

const con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

con.connect(function (err) {
  if (err) throw err;
});

export const careRecipientsController = express.Router();

careRecipientsController.get("/care-recipient/:id", (req, res) => {
  const { id } = req.params;

  if (!uuidValidate(id)) {
    res.status(400).json({ test: "no" });
  }

  con.query(
    `SELECT 
        eventTable.care_recipient_id as id,
        eventTable.timestamp,
        eventTable.payload, 
        eventTable.event_type as eventType, 
        recipientTable.name as careRecipientName, 
        caregiversTable.first_name as caregiverFirstName, 
        caregiversTable.last_name as caregiverLastName
    FROM events AS eventTable
    JOIN test_care_recipients AS recipientTable ON eventTable.care_recipient_id = recipientTable.id
    JOIN test_caregivers AS caregiversTable ON eventTable.caregiver_id = caregiversTable.id
    WHERE eventTable.care_recipient_id = ?
    AND DATE(eventTable.timestamp) = (SELECT DATE(MAX(events.timestamp)) FROM events WHERE care_recipient_id = ?)
    ORDER BY eventTable.timestamp DESC;`,
    [id, id],
    function (err, result, _fields) {
      if (err) throw err;
      res.status(200).json(result);
    }
  );
});

careRecipientsController.get("/events/:id/:timestamp", (req, res) => {
  const { id, timestamp } = req.params;

  if (!uuidValidate(id)) {
    res.status(400).json({ test: "no" });
  }

  con.query(
    `SELECT 
      eventTable.care_recipient_id as id,
      eventTable.timestamp,
      eventTable.payload, 
      eventTable.event_type as eventType, 
      recipientTable.name as careRecipientName, 
      caregiversTable.first_name as caregiverFirstName, 
      caregiversTable.last_name as caregiverLastName
      FROM events AS eventTable
      JOIN test_care_recipients AS recipientTable ON eventTable.care_recipient_id = recipientTable.id
      JOIN test_caregivers AS caregiversTable ON eventTable.caregiver_id = caregiversTable.id
      WHERE eventTable.care_recipient_id = ?
      AND DATE(eventTable.timestamp) = DATE(?) 
      ORDER BY eventTable.timestamp desc`,
    [id, timestamp],
    function (err, result, _fields) {
      if (err) throw err;
      res.status(200).json(result);
    }
  );
});

careRecipientsController.get("/event-times/:id", (req, res) => {
  const { id } = req.params;

  if (!uuidValidate(id)) {
    res.status(400).json({ test: "no" });
  }

  con.query(
    `SELECT DISTINCT DATE(timestamp) AS date_only
      FROM events
      WHERE care_recipient_id = ?
      GROUP BY timestamp
      ORDER BY timestamp DESC`,
    id,
    function (err, result, _fields) {
      if (err) throw err;
      res.status(200).json(result);
    }
  );
});
