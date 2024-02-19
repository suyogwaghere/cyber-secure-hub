// @mui
import Box, { BoxProps } from "@mui/material/Box";
//

// ----------------------------------------------------------------------

export default function SplashScreen({ sx, ...other }: BoxProps) {
  return (
    <Box
      sx={{
        right: 0,
        width: 1,
        bottom: 0,
        height: 1,
        zIndex: 9998,
        display: "flex",
        position: "fixed",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        ...sx,
      }}
      {...other}
    >
      <>Heyy</>
    </Box>
  );
}
