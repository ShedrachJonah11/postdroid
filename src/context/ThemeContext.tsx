import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import { Theme, lightTheme, darkTheme } from "../constants/theme";

type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  isDark: false,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState<boolean>(colorScheme === "dark");

  useEffect(() => {
    setIsDark(colorScheme === "dark");
  }, [colorScheme]);

  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
