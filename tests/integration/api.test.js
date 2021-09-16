import { api, data } from "@serverless/cloud";

describe("index.js", ()=> {
    beforeAll(async () => {
        await data.seed("tests/integration/data.json", true);
    });

    test("should get reviews", async () => {    
        const { body } = await api.get("/reviews").invoke();
    
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
        const { body } = await api.post("/reviews").invoke({
            review: "book was awesome",
            rating: 4
        });

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
});