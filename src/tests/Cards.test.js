import Cards from '../components/Cards';
import { suits, values } from '../shared/Constants';
import { render, screen } from '@testing-library/react';
/* react-test-renderer is a library for rendering React components to pure JavaScript objects */
import { create } from "react-test-renderer";

const props = {
    suit: suits[0],
    value: values[0],
    color: "black",
    id: "1"
};
describe("Cards component render with valid props validation", () => {
    test('verify DOM with expected prop values', () => {
        render(CardsComponent());
        /* test that all elements with correct prop values are present in DOM */
        verifyElementInDOM();
    });
});
function verifyElementInDOM(id) {
    [props.id, `cardValue ${props.id}`, `suit ${props.id}`].forEach(id => {
        const ele = screen.queryByTestId(id);
        expect(ele).toBeInTheDocument();
    });
}

describe("Cards component", () => {
    test("Matches the snapshot", () => {
        /*  create is a method from react-test-renderer for "mounting" the component */
        const card = create(<CardsComponent />);
        expect(card.toJSON()).toMatchSnapshot();
    });
});

function CardsComponent() {
    return <Cards suit={props.suit}
        cardValue={props.value}
        color={props.color} id={props.id} />;
}