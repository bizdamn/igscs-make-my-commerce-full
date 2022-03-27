import nc from 'next-connect';
import Order from '../../../models/Order';
import { isAuth } from '../../../utils/auth';
import db from '../../../utils/db';

const handler = nc({});
// handler.use(isAuth);

handler.post(async (req, res) => {
  // console.log({
  //   customer: req.body.customerID,
  //   storeID:process.env.STORE_OBJECT_ID,
  //   orderItems:req.body.orderItems,
  //   shippingAddress:req.body.shippingAddress,
  //   paymentMethod:req.body.paymentMethod,
  //   itemsPrice:req.body.itemsPrice,
  //   shippingPrice:req.body.shippingPrice,
  //   taxPrice:req.body.taxPrice ,
  //   totalPrice:req.body.totalPrice 
  // })
  await db.connect();
  const newOrder = new Order({
    // customer: req.body.customerID,
    storeID:process.env.STORE_OBJECT_ID,
    // orderItems:req.body.orderItems ,
    // shippingAddress:req.body.shippingAddress ,
    // paymentMethod:req.body.paymentMethod ,
    // itemsPrice:req.body.itemsPrice ,
    // shippingPrice:req.body.shippingPrice ,
    // taxPrice:req.body.taxPrice ,
    // totalPrice:req.body.totalPrice 
  });
  await db.disconnect();
  const order = await newOrder.save();
  console.log('New Order Saved');
  res.send(order);
});

export default handler;
