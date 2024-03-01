import * as Sentry from "@sentry/react";
import { AuthConsumer, AuthProvider } from "auth/context/firebase";
import Router from "routes/sections";
import Styled from "styled-components";

import colors from "styles/colors";

const Container = Styled.main`
  background: ${colors.background};
  color: ${colors.textColor};
  margin: 0;
`;

Sentry.init({
  dsn: "https://30eb6135d37643fb95c7da4e77a46142@glitch.as93.net/1",
  beforeSend(event) {
    // Check if error logging is disabled
    const ignoredHosts = ["localhost", "127.0.0.1"];
    const disableErrors = process.env.REACT_APP_DISABLE_ERROR_LOGGING;
    if (disableErrors || ignoredHosts.includes(window.location.hostname)) {
      return null;
    }
    return event;
  },
});

const App: React.FC = () => {
  return (
    <Container>
      <AuthProvider>
        <AuthConsumer>
          <Router />
        </AuthConsumer>
      </AuthProvider>
    </Container>
  );
};

export default App;
