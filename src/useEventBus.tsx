import {
  PublishOptions,
  SubscribeOptions,
  Message,
  Handler,
} from "./useEventBus.types";

const defaultPublishOptions: PublishOptions = {
  targetOrigin: "*",
  targetWindow: window,
};

const defaultSubscribeOptions: SubscribeOptions = {
  targetWindow: window,
};

const useEventBus = <MessageType extends Record<string, any>>() => {
  const publish = <Topic extends keyof MessageType>(
    message: Message<MessageType, Topic>,
    options: PublishOptions = defaultPublishOptions
  ) => {
    options.targetWindow.postMessage(message, options.targetOrigin);
  };

  const subscriptionHandler = <Topic extends keyof MessageType>(
    event: MessageEvent<Message<MessageType, Topic>>,
    topic: Topic,
    handler: Handler<MessageType[Topic]>
  ) => {
    if (event.data.topic === topic) {
      handler(event.data.payload);
    }
  };

  const subscribe = <Topic extends keyof MessageType>(
    topic: Topic,
    handler: Handler<MessageType[Topic]>,
    options: SubscribeOptions = defaultSubscribeOptions
  ) => {
    const messageEventHandler = (
      event: MessageEvent<Message<MessageType, Topic>>
    ) => subscriptionHandler(event, topic, handler);

    const attachEventListener = () => {
      options.targetWindow.addEventListener("message", messageEventHandler);
    };
    const detachEventListener = () => {
      options.targetWindow.removeEventListener("message", messageEventHandler);
    };

    attachEventListener();

    return { unsubscribe: detachEventListener };
  };

  return { publish, subscribe };
};

export { useEventBus };
