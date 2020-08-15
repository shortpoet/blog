import { Request, Response } from 'express';
const redis = require("redis");
import { chalkLog } from '../utils/colorLog';
const redis_client = redis.createClient(6379);
export const redisMiddleware = (req: Request, res: Response, next) => {
  // console.log(req);
  // console.log(res);
  // console.log(Object.keys(req));
  chalkLog('green', '#### redis middleware ####')
  // console.log(req.statusCode);
  // console.log(req.res.statusCode);
  // console.log(res.statusCode);
  // console.log(req.params)
  // console.log(req.body)
  // console.log(req.query)
  // console.log(req.method)
  // console.log(req.headers)
  
  // console.log(Object.keys(req))
  const { queryType } = req.query;
  chalkLog('magenta', queryType)
  // redis_client.get(queryType, (err, data) => {
  //   if (err) {
  //     chalkLog('red', err);
  //     res.status(500).send(err);
  //   }
  //   if (data != null) {
  //     res.send(data);
  //   } else {
  //     next();
  //   }
  // });
  next();
};
