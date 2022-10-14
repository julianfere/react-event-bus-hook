interface Message<Msg extends Record<string, any>, Top extends keyof Msg> {
  topic: Top;
  payload: Msg[Top];
}

interface PublishOptions {
  targetOrigin: string;
  targetWindow: Window;
}

interface SubscribeOptions {
  targetWindow: Window;
}

type Handler<Payload extends any> = (payload: Payload) => void;

export type { Message, PublishOptions, SubscribeOptions, Handler };
