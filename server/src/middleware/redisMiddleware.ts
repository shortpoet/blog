import { Request, Response } from 'express';
const redis = require("redis");
import { chalkLog } from '../utils/colorLog';
const redis_client = redis.createClient(6379);
export const redisMiddleware = (req: Request, res: Response, next) => {
  // console.log(Object.keys(req));
  chalkLog('green', '#### redis middleware ####')
  const { queryType } = req.query;
  if (queryType) {
    chalkLog('magenta', queryType)
    redis_client.get(queryType, (err, data) => {
      console.log("redis_client get");
      if (err) {
        chalkLog('red', err);
        res.status(500).send(err);
      }
      if (data != null) {
        chalkLog('yellow', `redis data\\n${data}`)
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
