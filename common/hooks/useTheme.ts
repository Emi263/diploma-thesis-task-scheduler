import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { ColorsDark, ColorsLight } from "../../theme/globals";

export default function useTheme() {
  const { theme } = useContext(ThemeContext);
  return {
    colors: theme === "light" ? ColorsLight : ColorsDark,
  };
}
