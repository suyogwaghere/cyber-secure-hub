import Button from 'components/Form/Button';
import { Card } from 'components/Form/Card';
import { useState } from 'react';
import styled from 'styled-components';
import colors from 'styles/colors';

const CardStyles = `
margin: 0 auto 1rem auto;
width: 100%;
position: relative;
transition: all 0.2s ease-in-out;
display: flex;
flex-direction: column;
a {
  color: ${colors.primary};
}
.controls {
  display: flex;
  flex-wrap: wrap;
  button {
    max-width: 300px;
  }
}
small {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  opacity: 0.5;
  color: ${colors.textColor};
}
`;

const StyledIframe = styled.iframe`
  width: calc(100% - 2rem);
  outline: none;
  border: none;
  border-radius: 4px;
  min-height: 50vh;
  height: 100%;
  margin: 1rem;
  background: ${colors.background};
`;

const ViewRaw = (props: { everything: { id: string; result: any }[] }) => {
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<string>();

  const makeResults = () => {
    const result: { [key: string]: any } = {};
    props.everything.forEach((item: { id: string; result: any }) => {
      result[item.id] = item.result;
    });
    return result;
  };

  const fetchResultsUrl = async () => {
    const resultContent = makeResults();
    const response = await fetch('https://jsonhero.io/api/create.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'cyber-secure-hub results',
        content: resultContent,
        readOnly: true,
        ttl: 3600,
      }),
    });
    if (!response.ok) {
      setError(`HTTP error! status: ${response.status}`);
    } else {
      setError(null);
    }
    await response.json().then((data) => setResultUrl(data.location));
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(makeResults(), null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cyber-secure-hub-results.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleViewResults = () => {
    if (resultUrl) {
      setResults(resultUrl);
      setResultUrl(null);
    }
  };
  return (
    <Card heading='View / Download Raw Data' styles={CardStyles}>
      <div className='controls'>
        <Button onClick={handleDownload}>Download Results</Button>
        <Button onClick={fetchResultsUrl}>
          {resultUrl ? 'Update Results' : 'View Results'}
        </Button>
        {resultUrl && <Button onClick={handleViewResults}>Hide Results</Button>}
      </div>
      {(resultUrl || results) && !error ? (
        <>
          <StyledIframe
            title='Results, via JSON Hero'
            src={resultUrl || results}
          />
          <small>
            Your results are available to view{' '}
            <a href={resultUrl || results}>here</a>.
          </small>
        </>
      ) : (
        <p>No results available.</p>
      )}
      {error && <p className='error'>{error}</p>}
      <small>
        These are the raw results generated from your URL, and in JSON format.
        You can import these into your own program, for further analysis.
      </small>
    </Card>
  );
};

export default ViewRaw;
