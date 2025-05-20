/**
 * Tests for the stats API using Supertest and Jest.
 * Covers /mean, /median, and /mode routes.
 */

const request = require("supertest");
const app = require("./app");

describe("GET /mean", () => {
  test("calculates mean correctly", async () => {
    const res = await request(app).get("/mean?nums=1,2,3,4");
    expect(res.body).toEqual({ operation: "mean", value: 2.5 });
  });

  test("returns error for invalid input", async () => {
    const res = await request(app).get("/mean?nums=1,foo,3");
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("foo is not a number.");
  });

  test("returns error if no nums", async () => {
    const res = await request(app).get("/mean");
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("nums are required.");
  });
});

describe("GET /median", () => {
  test("calculates median correctly for even count", async () => {
    const res = await request(app).get("/median?nums=1,2,3,4");
    expect(res.body).toEqual({ operation: "median", value: 2.5 });
  });

  test("calculates median correctly for odd count", async () => {
    const res = await request(app).get("/median?nums=1,2,3");
    expect(res.body).toEqual({ operation: "median", value: 2 });
  });
});

describe("GET /mode", () => {
  test("calculates mode correctly", async () => {
    const res = await request(app).get("/mode?nums=1,2,2,3,3,3,4");
    expect(res.body).toEqual({ operation: "mode", value: 3 });
  });

  test("returns error for invalid input", async () => {
    const res = await request(app).get("/mode?nums=1,bar,3");
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("bar is not a number.");
  });
});
