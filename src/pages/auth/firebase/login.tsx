// import { Helmet } from "react-helmet-async";
// sections
import { FirebaseLoginView } from "sections/auth/firebase";

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      {/* <Helmet>
        <title> Firebase: Login</title>
      </Helmet> */}

      <FirebaseLoginView />
    </>
  );
}
