import request from "supertest";
import express from "express";
import { careRecipientsController } from "../src/controllers/careRecipientController";
import { expect, jest, describe, beforeEach, it } from "@jest/globals";

const mockData = [
  {
    timestamp: "2019-05-12T19:30:07+01:00",
    payload:
      '{"id": "31c03a75-01bd-4f8c-8a0a-bc343adb622e", "visit_id": "5cd753f0-8b66-f8a8-43f7-330f62a3e1d6", "timestamp": "2019-05-12T19:30:07+01:00", "event_type": "regular_medication_taken", "caregiver_id": "f7a00df5-bbc4-4ad7-9918-c07e16e709f6", "medication_type": "SCHEDULED", "task_instance_id": "bXxlODRjZmI4My1hZjhlLTRlMzEtOGYxZS1kZWNiMjcxNDg3OTZ8MjAxOS0wNS0xMlQxOTowMDowMC4wMDBa", "care_recipient_id": "df50cac5-293c-490d-a06c-ee26796f850d"}',
    event_type: "regular_medication_taken",
    name: "Linda",
    first_name: "Karter",
    last_name: "Pruitt",
  },
  {
    timestamp: "2019-05-12T19:30:01+01:00",
    payload:
      '{"id": "5b044315-01a5-4879-9059-523733fdb33c", "visit_id": "5cd753f0-8b66-f8a8-43f7-330f62a3e1d6", "timestamp": "2019-05-12T19:30:01+01:00", "event_type": "regular_medication_taken", "caregiver_id": "f7a00df5-bbc4-4ad7-9918-c07e16e709f6", "medication_type": "SCHEDULED", "task_instance_id": "bXw3YmU3M2M3NC0zYzZkLTQ2ZjQtYWViMC01YzJmNTczMThiYWF8MjAxOS0wNS0xMlQxOTowMDowMC4wMDBa", "care_recipient_id": "df50cac5-293c-490d-a06c-ee26796f850d"}',
    event_type: "regular_medication_taken",
    name: "Linda",
    first_name: "Karter",
    last_name: "Pruitt",
  },
  {
    timestamp: "2019-05-12T19:29:31+01:00",
    payload:
      '{"id": "fc2ca145-059e-4da0-a837-efd76e54f540", "visit_id": "5cd753f0-8b66-f8a8-43f7-330f62a3e1d6", "timestamp": "2019-05-12T19:29:31+01:00", "event_type": "regular_medication_taken", "caregiver_id": "f7a00df5-bbc4-4ad7-9918-c07e16e709f6", "medication_type": "SCHEDULED", "task_instance_id": "bXxlNzJiMzc3MC0xYzgwLTQ5ZWEtYmY1ZS04NTRlMWY1NTk4ZjF8MjAxOS0wNS0xMlQxOTowMDowMC4wMDBa", "care_recipient_id": "df50cac5-293c-490d-a06c-ee26796f850d"}',
    event_type: "regular_medication_taken",
    name: "Linda",
    first_name: "Karter",
    last_name: "Pruitt",
  },
];

const mockQuery = jest.fn(
  (_query, _params, callback: (error, result) => void) =>
    callback(null, mockData)
);

const mockConnect = jest.fn((callback: () => void) => callback());

const app = express();
app.use(express.json());
app.use(careRecipientsController);

describe("Care Recipients Controller", () => {
  jest.mock("mysql", () => ({
    createConnection: jest.fn(() => ({
      connect: mockConnect,
      query: mockQuery,
    })),
  }));

  beforeEach(() => {
    // Reset the mock functions before each test
    mockQuery.mockReset();
    mockConnect.mockReset();
  });

  it("should return 200 and care recipient data for a valid ID", async () => {
    mockQuery.mockImplementation((_query, _params, callback) => {
      callback(null, mockData);
    });
    const response = await request(app).get(
      "/care-recipient/df50cac5-293c-490d-a06c-ee26796f850d"
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });

  it("should return 400 for an invalid ID", async () => {
    mockQuery.mockImplementation((_query, _params, callback) => {
      callback(null, mockData);
    });
    const response = await request(app).get("/care-recipient/invalid-id");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "invalid id" });
  });

  it("should return 200 and event data for a valid ID and timestamp", async () => {
    mockQuery.mockImplementation((_query, _params, callback) => {
      callback(null, mockData);
    });
    const response = await request(app).get(
      "/events/df50cac5-293c-490d-a06c-ee26796f850d/2023-05-22"
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });

  it("should return 400 for an invalid ID when fetching event data", async () => {
    mockQuery.mockImplementation((_query, _params, callback) => {
      callback(null, mockData);
    });
    const response = await request(app).get("/events/invalid-id/2023-05-22");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ test: "no" });
  });

  it("should return 200 and event times for a valid ID", async () => {
    mockQuery.mockImplementation((_query, _params, callback) => {
      callback(null, mockData);
    });
    const response = await request(app).get(
      "/event-times/df50cac5-293c-490d-a06c-ee26796f850d"
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });

  it("should return 400 for an invalid ID when fetching event times", async () => {
    mockQuery.mockImplementation((_query, _params, callback) => {
      callback(null, mockData);
    });
    const response = await request(app).get("/event-times/invalid-id");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ test: "no" });
  });
});
