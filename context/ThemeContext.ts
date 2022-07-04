import { createContext } from "react";
import { theme } from "../models/theme";

interface themeContext {
  theme: "dark" | "light";
  setTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>;
}

export const ThemeContext = createContext<themeContext>({
  theme: "light",
  setTheme: () => {},
});
