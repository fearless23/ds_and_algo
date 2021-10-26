import { TYPES } from './src';
import pino from 'pino';

const logger = pino({
  base: { },
  formatters: {
    level (label, number) {
      return { level: label || number };
    },
  },
  level: 'debug',
  messageKey: 'message',
  nestedKey: 'payload',
  timestamp: true,
  prettyPrint: true,
});

export const handler = async (event) => {
  const output = { event };
  const show = event.show;
  try {
    const category = event.category;
    const L1 = event.L1; // ds or level
    const L2 = event.L2; // type or type
    const func = TYPES[category][L1][L2];
    if (!func) throw new Error('unknown event L1,L2 key');
    output.result = func(logger, event.payload);
  } catch (error) {
    output.error = error.message;
  }
  return show && output;
};
