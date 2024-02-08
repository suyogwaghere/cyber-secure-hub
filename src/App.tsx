import * as Sentry from "@sentry/react";
import { Route, Routes } from "react-router-dom";
import Styled from "styled-components";

import About from "pages/About";
import Home from "pages/Home";
import Login from "pages/Login";
import NotFound from "pages/NotFound";
import Results from "pages/Results";
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

function App() {
  return (
    <Container>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/results/:address" element={<Results />} />
      </Routes>
    </Container>
  );
}

export default App;
