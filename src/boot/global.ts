import { Buffer } from 'buffer';

export default () => {
  // used by arcblock and tbd
  window.global = window;
  window.Buffer = Buffer;
};
