// @mui
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { SxProps, Theme } from "@mui/material/styles";
// hooks

// components
import { Box } from "@mui/material";
import { useAuthContext } from "auth/hooks";

// ----------------------------------------------------------------------

type RoleBasedGuardProp = {
  hasContent?: boolean;
  roles?: string[];
  children: React.ReactNode;
  sx?: SxProps<Theme>;
};

export default function RoleBasedGuard({
  hasContent,
  roles,
  children,
  sx,
}: RoleBasedGuardProp) {
  // Logic here to get current user role
  const { user } = useAuthContext();

  // const currentRole = 'user';
  const currentRole = user?.role; // admin;

  if (typeof roles !== "undefined" && !roles.includes(currentRole)) {
    return hasContent ? (
      <Container sx={{ textAlign: "center", ...sx }}>
        <Box>
          <Typography variant="h3" paragraph>
            Permission Denied
          </Typography>
        </Box>

        <Box>
          <Typography sx={{ color: "text.secondary" }}>
            You do not have permission to access this page
          </Typography>
        </Box>

        <Box></Box>
      </Container>
    ) : null;
  }

  return <> {children} </>;
}
