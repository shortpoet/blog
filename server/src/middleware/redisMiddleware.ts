import { Request, Response } from 'express';
import { chalkLog } from '../utils/chalkLog';
const redis = require("redis");

export const redis_client =
  process.env.DOCKER
    ? redis.createClient(process.env.REDIS_PORT, process.env.REDIS_SERVICE)
    : redis.createClient(process.env.REDIS_PORT);

export const redisMiddleware = (req: Request, res: Response, next) => {
  // console.log(Object.keys(req));
  chalkLog('green', '#### redis middleware ####')
  const { queryType } = req.query;
  if (queryType) {
    chalkLog('blueBright', `queryType: ${queryType}`)
    redis_client.get(queryType, (err, data) => {
      chalkLog("yellow", "redis_client get");
      if (err) {
        chalkLog('red', err);
        res.status(500).send(err);
      }
      if (data != null) {
        // chalkLog('yellow', JSON.parse(data))
        const out = { data: {} }
        out.data[queryType.toString()] = JSON.parse(data);
        res.send(out);
      } else {
        next();
      }
    });
    } else {
      next();
  }
};
