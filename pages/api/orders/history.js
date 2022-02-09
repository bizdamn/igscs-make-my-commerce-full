import nc from 'next-connect';
import Order from '../../../models/Order';
import { isAuth } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({onError});
handler.use(isAuth);

handler.get(async (req, res) => {
  await db.connect();
  const orders = await Order.find({ customer: req.customer._id });
  res.send(orders);
});

export default handler;
