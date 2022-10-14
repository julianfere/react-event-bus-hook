import { useState } from "react";
import { createRoot } from "react-dom/client";
import { useEventBus } from "./useEventBus";

import "./index.css";

interface TestMessage {
  text: string;
}

interface AnotherTestMessage {
  text: string;
}

interface BusEvents {
  // Topic          |     Payload
  AnotherTestMessage: AnotherTestMessage;
  Test: TestMessage;
}

const PublisherComponent = () => {
  const { publish } = useEventBus<BusEvents>();

  return (
    <>
      <button
        onClick={() => {
          publish({ topic: "Test", payload: { text: "this is a test" } });
        }}
      >
        Publish Test Message
      </button>
      <button
        onClick={() => {
          publish({
            topic: "AnotherTestMessage",
            payload: { text: "this is another test" },
          });
        }}
      >
        Publish Another Test Message
      </button>
    </>
  );
};

const SubscriberComponent = () => {
  const { subscribe } = useEventBus<BusEvents>();
  const [message, setMessage] = useState<string[]>([]);

  subscribe("Test", (payload) => {
    setMessage([...message, `\n ${JSON.stringify(payload)}`]);
  });

  subscribe("AnotherTestMessage", (payload) => {
    setMessage([...message, `\n ${JSON.stringify(payload)}`]);
  });

  return <textarea className="log" value={message} onChange={() => {}} />;
};

const App = () => {
  return (
    <div className="container">
      <PublisherComponent />
      <SubscriberComponent />
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
