import { stack_with_sll } from './../../ds/3.Stack/stack_with_sll';

export const matching_brackets = (logger, payload) => {
  try {
    const s = stack_with_sll();
    const str = payload.str;
    for (const char of str) {
      if (OPEN.some(i => i === char)) {
        s.push(char);
      }
      if (CLOSE.some(i => i === char)) {
        const head = s.peek().head;
        if (matches(head, char)) s.pop();
        else s.push(char);
      }
      const nodes = s.items();
      logger.info(nodes.reverse().join(''), 'STACK');
    }
    const result = { match: s.peek().size === 0, orphan: s.items().reverse() };
    return result;
  } catch (error) {
    logger.error(error, matching_brackets.name);
    throw error;
  }
};

const OPEN = ['(', '{', '[', '<'];
const CLOSE = [')', '}', ']', '>'];

const matches = (open, close) => OPEN.indexOf(open) === CLOSE.indexOf(close);
