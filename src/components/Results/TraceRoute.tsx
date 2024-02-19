import { Card } from "components/Form/Card";
import styled from "styled-components";
import colors from "styles/colors";

const RouteRow = styled.div`
  text-align: center;
  width: fit-content;
  margin: 0 auto;
  .ipName {
    font-size: 1rem;
  }
`;

const RouteTimings = styled.div`
  p {
    margin: 0 auto;
  }
  .arrow {
    font-size: 2.5rem;
    color: ${colors.primary};
    margin-top: -1rem;
  }
  .times {
    font-size: 0.85rem;
    color: ${colors.textColorSecondary};
  }
  .completed {
    text-align: center;
    font-weight: bold;
  }
`;

const cardStyles = ``;

const TraceRouteCard = (props: {
  data: any;
  title: string;
  actionButtons: any;
}): JSX.Element => {
  const traceRouteResponse = props.data;
  const routes = traceRouteResponse.result;
  return (
    <Card
      heading={props.title}
      actionButtons={props.actionButtons}
      styles={cardStyles}
    >
      {Object.entries(routes).map(
        (
          [key, value] // Changed from routes.filter to Object.entries(routes).map
        ) => (
          <RouteRow key={key}>
            <span className="ipName">{key}</span>{" "}
            {/* Displaying the key of the current route */}
            <RouteTimings>
              {Array.isArray(value) ? ( // Checking if the value is an array
                value.map((time, packetIndex) => (
                  <p className="times" key={`timing-${packetIndex}-${time}`}>
                    {value.length > 1 && <>Packet #{packetIndex + 1}:</>}
                    Took {time} ms
                  </p>
                ))
              ) : (
                <p className="times">Took {value as any}</p>
              )}
              <p className="arrow">↓</p>
            </RouteTimings>
          </RouteRow>
        )
      )}
      <RouteTimings>
        <p className="completed">
          Round trip completed in {traceRouteResponse.timeTaken} ms
        </p>
      </RouteTimings>
    </Card>
  );
};

export default TraceRouteCard;
