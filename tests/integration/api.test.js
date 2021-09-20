import { api, data } from "@serverless/cloud";

describe("index.js", ()=> {
    beforeAll(async () => {
        await data.seed("tests/integration/data.json", true);
    });

    test("should get reviews", async () => {    
        const { status, body } = await api.get("/reviews").invoke();
    
        expect(status).toBe(200);
        expect(body).toEqual({
            items: [
            {
                id: 1,
                review: "book was full of fluff",
                rating: 4
            },
            {
                id: 2,
                review: "book was fluff",
                rating: 3
            }
            ],
        });
    });

    test("should post a review", async () => {
        const { status, body } = await api.post("/reviews").invoke({
            review: "book was awesome",
            rating: 4
        });

        expect(status).toBe(200);
        expect(body).toEqual({
            items: [
            {
                id: 1,
                review: "book was full of fluff",
                rating: 4
            },
            {
                id: 2,
                review: "book was fluff",
                rating: 3
            },
            {
                id: 3,
                review: "book was awesome",
                rating: 4
            }
            ],
        });
    });

    test("should return a 400 if no review in body", async () => {
        const { status, body } = await api.post("/reviews").invoke({
            rating: 4
        });

        expect(status).toBe(400);
        expect(body).toBe("Bad Request, Please enter both review and rating");
    });

    test("should return a 400 if no review in body", async () => {
        const { status, body } = await api.post("/reviews").invoke({
            review: "book was awesome",
        });

        expect(status).toBe(400);
        expect(body).toBe("Bad Request, Please enter both review and rating");
    });

});