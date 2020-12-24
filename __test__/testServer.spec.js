// Import the js file to test
import dateUtils from "../src/server/dateUtils";

describe("Testing the Server", () => {
    let testDate = new Date("12/23/2020")

    test("Testing the formatDate() function", () => {
        expect(dateUtils.formatDate).toBeDefined();
        expect(dateUtils.formatDate(testDate)).toEqual("2020-12-23");
    })

    test("Testing the addDays()", () => {
        expect(dateUtils.addDays(testDate, 1)).toEqual(new Date("12/24/2020"));
        expect(dateUtils.addDays(testDate, 5)).toEqual(new Date("12/28/2020"));
    })
});