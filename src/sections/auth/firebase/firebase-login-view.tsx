import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
// @mui
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
// routes
import { RouterLink } from "routes/components";
import { useRouter, useSearchParams } from "routes/hook";
import { paths } from "routes/paths";
// config
import { PATH_AFTER_LOGIN } from "config-global";
// hooks
import { useBoolean } from "hooks/use-boolean";
// auth
import { useAuthContext } from "auth/hooks";
// components
import { Box } from "@mui/material";
import FormProvider, { RHFTextField } from "components/hook-form";
import Iconify from "components/iconify";

// ----------------------------------------------------------------------

export default function FirebaseLoginView() {
  const { login, loginWithGoogle, loginWithGithub } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState("");

  const searchParams = useSearchParams();

  const returnTo = searchParams.get("returnTo");

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    email: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login?.(data.email, data.password);

      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error: any) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === "string" ? error : error.message);
    }
  });

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle?.();
    } catch (error) {
      console.error(error);
    }
  };

  const handleGithubLogin = async () => {
    try {
      await loginWithGithub?.();
    } catch (error) {
      console.error(error);
    }
  };

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 4 }}>
      <Typography
        variant="h4"
        sx={{
          color: "inherit",
        }}
      >
        Sign in
      </Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">New user?</Typography>

        <Link
          component={RouterLink}
          href={paths.auth.firebase.register}
          variant="subtitle2"
          sx={{
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Create an account
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <RHFTextField
        name="email"
        label="Email address"
        sx={{
          color: "inherit",
        }}
      />

      <RHFTextField
        name="password"
        label="Password"
        sx={{
          color: "inherit",
        }}
        type={password.value ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify
                  icon={
                    password.value ? "solar:eye-bold" : "solar:eye-closed-bold"
                  }
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Link
        component={RouterLink}
        href={paths.auth.firebase.forgotPassword}
        variant="body2"
        color="primary"
        underline="always"
        sx={{ alignSelf: "flex-end", color: "inherit", textDecoration: "none" }}
      >
        Forgot password?
      </Link>

      <LoadingButton
        fullWidth
        color="info"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </Stack>
  );

  const renderLoginOption = (
    <div>
      <Divider
        sx={{
          my: 2.5,
          typography: "overline",
          color: "inherit",
          "&::before, ::after": {
            borderTopStyle: "dashed",
          },
          borderColor: "inherit",
        }}
      >
        OR
      </Divider>

      <Stack direction="row" justifyContent="center" spacing={2}>
        <IconButton onClick={handleGoogleLogin}>
          <Iconify icon="eva:google-fill" color="#DF3E30" />
        </IconButton>

        <IconButton color="inherit" onClick={handleGithubLogin}>
          <Iconify icon="eva:github-fill" />
        </IconButton>
      </Stack>
    </div>
  );

  return (
    <Box
      sx={{
        marginTop: "5%",
        mx: "10%",
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderHead}

        {renderForm}

        {renderLoginOption}
      </FormProvider>
    </Box>
  );
}
