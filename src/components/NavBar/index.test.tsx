import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppThemeProvider } from "../../styles/themeProvider";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./index"


describe("Navbar", () => {
    it("deve abrir e fechar o menu ao clicar no botão", () => {
        render(
          <AppThemeProvider>
            <BrowserRouter>
              <Navbar />
            </BrowserRouter>
          </AppThemeProvider>
        );

        const menuButton = screen.getByRole('button')
        const menu = document.querySelector('.navbar-collapse')

        expect(menu).not.toBeVisible()

        fireEvent.click(menuButton)
        expect(menu).toBeVisible()

        fireEvent.click(menuButton)
        expect(menu).not.toBeVisible()
    });

    it("deve direcionar para a Home (/) ao clicar no logo Hoster", () => {
        render(
          <AppThemeProvider>
            <BrowserRouter>
              <Navbar />
            </BrowserRouter>
          </AppThemeProvider>
        );

        const logoLink = screen.getByText('Hoster');
        expect(logoLink).toBeInTheDocument();
        expect(logoLink.getAttribute('href')).toBe('/');
    });

    it("deve direcionar para o Login (/login) ao clicar no botão Login", () => {
        render(
          <AppThemeProvider>
            <BrowserRouter>
              <Navbar />
            </BrowserRouter>
          </AppThemeProvider>
        );

        const loginLink = screen.getByText('Login');
        expect(loginLink).toBeInTheDocument();
        expect(loginLink.getAttribute('href')).toBe('/login');
    });
});

