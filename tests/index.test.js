import Home from '../pages/Index';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe("Home Page", () => {
    test("renders at least one link to  https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art", () => {
        const { container } = render(<Home />);

        // attempt to fetch the first child element within the "Col" (div) element
        const child = container.querySelector('div');

        // ensure the the child element exists
        expect(child).toBeTruthy();

        // get all "a" elements within the child element
        const childLinks = child.querySelectorAll("a");
        let museumLinks = 0;

        expect(childLinks.length).toBeGreaterThan(0);


        childLinks.forEach(link => {
            if (link.href.includes("https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art"))
                museumLinks++;
        });

        


        // ensure that there is at least one link that includes "https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art"
        expect(museumLinks).toBeGreaterThan(0); // at least one vercel link

    });
});