declare module 'react-animation'
declare module '*.graphql' {
  import { DocumentNode } from 'graphql'
  const Schema: DocumentNode

  export = Schema
}

type RequestIdleCallbackHandle = any;
type RequestIdleCallbackOptions = {
  timeout: number;
};
type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean;
  timeRemaining: (() => number);
};
