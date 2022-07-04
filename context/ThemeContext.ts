import { createContext } from "react";
import { theme } from "../models/theme";

interface themeContext {
  theme: "dark" | "light";
  changeTheme: any;
}

export const ThemeContext = createContext<themeContext>({
  theme: "light",
  changeTheme: () => {},
});
