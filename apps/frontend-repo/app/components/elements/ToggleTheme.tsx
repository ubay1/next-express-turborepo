import { useTheme } from "@/theme";
import { DarkMode, LightMode } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function ToggleTheme({ customStyle }: { customStyle?: React.CSSProperties }) {
  const { isDarkTheme, toggleTheme } = useTheme();
  return (
    <IconButton style={{ position: "absolute", bottom: 10, right: 10, ...customStyle }} onClick={toggleTheme}>
      {isDarkTheme ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
}
