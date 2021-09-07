// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { QRCode, Blog } = initSchema(schema);

export {
  QRCode,
  Blog
};