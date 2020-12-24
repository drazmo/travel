// Import the js file to test
import { checkForCity } from "../src/client/js/formChecker"

//window.alert = jest.fn();

describe("Testing the Form Validation", () => {
    test("Testing the checkForCity() function", () => {
        expect(checkForCity).toBeDefined();
        expect(checkForCity("Miami")).toEqual(true);
    })

    test("Testing the checkForCity() for bad input", () => {
        expect(checkForCity("")).toEqual(false);
        //  expect(window.alert.mock.calls.length).toBe(1);
    })
});