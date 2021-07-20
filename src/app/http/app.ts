import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import bodyParser from 'body-parser';
import { getMilliseconds } from 'date-fns';

import schema from './graphql/base';

export default () => {
  const app = express();

  app.use(bodyParser.json());

  app.use('/graphql', graphqlHTTP(async (req: any) => ({
    schema,
    context: {
      startTime: getMilliseconds(new Date()),
    },
    extensions: ({ context }: any) => {
      return {
        queryTimeMeasurement: Math.abs(getMilliseconds(new Date()) - context.startTime),
      };
    },
    graphiql: true,
  })));

  return app;
};
