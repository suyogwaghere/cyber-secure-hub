// @mui
import { ThemeProvider } from "@mui/material";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { darkTheme } from "utils/utilities";
//

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function CompactLayout({ children }: Props) {
  return (
    <>
      <Container component="main">
        <Stack
          sx={{
            // py: 12,
            m: "auto",
            maxWidth: 400,
            minHeight: "98vh",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
        </Stack>
      </Container>
    </>
  );
}
