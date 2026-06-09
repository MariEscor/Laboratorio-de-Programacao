import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";

test("snapshot da tela de login", () => {
    const { container } = render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
});