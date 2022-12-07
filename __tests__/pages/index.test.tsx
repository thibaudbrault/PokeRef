import Pokedex from "../../src/pages/index"
import { render, screen } from '@testing-library/react';


// jest.mock("axios", () => ({
//     __esModule: true,

//     default: {
//         get: () => ({
//             data: { id: 1, name: "Pikachu" }
//         })
//     }
// }))

jest.mock("react-query", () => ({
    useQuery: () => ({
        isLoading: false,
        error: {},
        data: [],
    })
}))

test("Renders list of all pokemon", async () => {
    render(<Pokedex />)
    const name = await screen.findByText("Pikachu")
    expect(name).toBeInTheDocument();
})