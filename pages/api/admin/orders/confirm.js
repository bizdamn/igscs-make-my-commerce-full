import nc from 'next-connect';
import Order from '../../../../models/Order';
import db from '../../../../utils/db';

const handler = nc();
handler.put(async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.query.orderID);
  order.isConfirmed = true;
  await order.save();
  await db.disconnect();
  console.log(order)
  res.send(order);
});

export default handler;
