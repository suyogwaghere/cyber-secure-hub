// import { Helmet } from "react-helmet-async";
// sections
import { Box } from "@mui/material";
import { FirebaseRegisterView } from "sections/auth/firebase";

// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4 },
      }}
    >
      {/* <Helmet>
        <title> Firebase: Register</title>
      </Helmet> */}

      <FirebaseRegisterView />
    </Box>
  );
}
