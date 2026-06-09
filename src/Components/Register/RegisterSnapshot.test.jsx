import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Register from "./Register";

test("snapshot da tela de cadastro", () => {
    const { container } = render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
});