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

// declare global {
interface Window {
  __SNOWPACK_ENV__: any
  // requestIdleCallback: ((
  //   callback: ((deadline: RequestIdleCallbackDeadline) => void),
  //   opts?: RequestIdleCallbackOptions,
  // ) => RequestIdleCallbackHandle);
  // cancelIdleCallback: ((handle: RequestIdleCallbackHandle) => void);
}
// }

declare global {
  interface ImportMeta {
      hot: {
          accept: Function;
          dispose: Function;
      };
      env: {
          MODE: string;
          SNOWPACK_PUBLIC_API_URL: string;
          SNOWPACK_PUBLIC_IMAGES_URL: string;
      };
  }
}
