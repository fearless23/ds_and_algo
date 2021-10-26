import './env';
import event from './event.json';
import { handler } from '../data';

(async () => {
  const result = await handler(event);
  if (event.show) {
    console.info('\n----- RESULT -----');
    console.info(JSON.stringify(result, null, 2));
    console.log('------------------');
  }
})();
