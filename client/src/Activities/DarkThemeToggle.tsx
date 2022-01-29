import { Button, useTheme } from "@primer/react";
import { useLocalStorage } from "@rehooks/local-storage";

import { MoonIcon } from "../Shared/icons/Moon";

export const DarkThemeToggle = () => {
  const theme = useTheme();
  const [, saveTheme] = useLocalStorage("theme", "day");

  const changeTheme = () => {
    const newTheme = theme.colorMode === "day" ? "night" : "day";

    theme.setColorMode(newTheme);
    saveTheme(newTheme);
  };

  return (
    <Button onClick={changeTheme}>
      <MoonIcon />
    </Button>
  );
};
