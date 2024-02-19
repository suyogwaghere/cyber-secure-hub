// routes
import { paths } from "routes/paths";

// API
// ----------------------------------------------------------------------

export const HOST_API = process.env.REACT_APP_HOST_API;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.dashboard.root; // as '/dashboard'
export const PATH_AFTER_ON = paths.auth.jwt.login; // as '/dashboard'
