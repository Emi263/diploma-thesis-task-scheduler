import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveThemeToLocalStorage = async (
  themeType: "dark" | "light"
): Promise<void> => {
  try {
    await AsyncStorage.setItem("theme", themeType);
  } catch (error) {
    console.log(error);
  }
};

export const getThemeFromLocalStorage = async (): Promise<
  "dark" | "light" | undefined
> => {
  try {
    const theme = await AsyncStorage.getItem("theme");
    if (theme) {
      return theme as any;
    }
  } catch (e) {}
};
