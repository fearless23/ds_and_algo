import { DATA_STRUCTURES } from './src/play';
import pino from 'pino';

const base_logger = pino({
  base: {},
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

export const handler = async (event = {}) => {
  const output = { event };
  const { category, type } = event;
  const logger = base_logger.child({});

  try {
    const func = DATA_STRUCTURES[category][type];
    if (!func) throw new Error('unknown event.category or event.type key');
    output.result = func(console, event.payload);
  } catch (error) {
    output.error = error.message;
    logger.error(error, handler.name);
  }
  return output;
};
