import nc from 'next-connect';
import Order from '../../../models/Order';
import { isAuth } from '../../../utils/auth';
import db from '../../../utils/db';

const handler = nc({});
handler.use(isAuth);

handler.post(async (req, res) => {
  await db.connect();
  const newOrder = new Order({
    ...req.body,
    customer: req.customer._id,
    storeID:process.env.STORE_OBJECT_ID,
  });
  await db.disconnect();
  console.log(newOrder);

  const order = await newOrder.save();

  console.log(order);
  res.send(order);
});

export default handler;
