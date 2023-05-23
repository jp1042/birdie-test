import { formatDate, groupDates, queryDB, eventColorCode } from "./utils";

it("should format the timestamp correctly", () => {
  const timestamp = "2023-05-22T19:30:07+01:00";
  const formattedDate = formatDate(timestamp);
  expect(formattedDate).toEqual({ year: 2023, month: 5, day: 22 });
});

it("should group dates correctly", () => {
  const dates = ["2023-05-22", "2023-05-23", "2023-06-01"];
  const groupedDates = groupDates(dates);
  expect(groupedDates).toEqual([
    { month: "05", year: "2023", dates: ["22", "23"] },
    { month: "06", year: "2023", dates: ["01"] },
  ]);
});

describe("Search Validation", () => {
  const endpoint = "care-recipient";
  const mockData = [
    { id: "df50cac5-293c-490d-a06c-ee26796f850d", name: "John" },
  ];

  it("should fetch data from the API endpoint", async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );
    //@ts-ignore
    global.fetch = mockFetch;
    const id = "df50cac5-293c-490d-a06c-ee26796f850d";
    const [data, error] = await queryDB(endpoint, id);
    expect(mockFetch).toHaveBeenCalledWith(`/${endpoint}/${id}`);
    expect(data).toEqual(mockData);
    expect(error).toBeUndefined();
  });

  it("should fail to fetch data with invalid id", async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );
    //@ts-ignore
    global.fetch = mockFetch;
    const id = "invalid-id";
    const [data, error] = await queryDB(endpoint, id);
    expect(mockFetch).toHaveBeenCalledWith(`/${endpoint}/${id}`);
    expect(data).toEqual(mockData);
    expect(error).toBe("Invalid ID: Please enter a valid ID");
  });
});

it("should return the correct color code for the event type", () => {
  const eventType = "check_in";
  const colorCode = eventColorCode(eventType);
  expect(colorCode).toBe("#ffeaa8");
});
