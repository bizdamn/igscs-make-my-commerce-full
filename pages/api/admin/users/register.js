import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import Store from '../../../../models/Store';
import db from '../../../../utils/db';
import { signToken } from '../../../../utils/auth';

const handler = nc();

handler.post(async (req, res) => {
console.log(
  {      storeName: req.body.storeName,
    storeLink:`https://makemycommerce.in/${req.body.storeName}`,
    verified:false,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: bcrypt.hashSync(req.body.password),
    title:'My Online Store',
    metatitle:'My Online Store',
    metadescription: 'My Online Store',
    companyName: req.body.companyName,
    address:[{
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2,
      city:req.body.city,
      state: req.body.state,
      pinCode: req.body.pinCode,
      country: req.body.country
    }] }
)
    await db.connect();
    const newStore = new Store({
      storeName: req.body.storeName,
      storeLink:`https://makemycommerce.in/${req.body.storeName}`,
      verified:false,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: bcrypt.hashSync(req.body.password),
      title:'My Online Store',
      metatitle:'My Online Store',
      metadescription: 'My Online Store',
      companyName: req.body.companyName,
      address:[{
        addressLine1: req.body.addressLine1,
        addressLine2: req.body.addressLine2,
        city:req.body.city,
        state: req.body.state,
        pinCode: req.body.pinCode,
        country: req.body.country
      }]
    });
    const store = await newStore.save();
    await db.disconnect();

    const token = signToken(store);
    res.send({
      token,
      _id: store._id,
      storeName: store.storeName,
      storeLink: store.storeLink,
      verified:false,
      name: store.name,
      email: store.email,
    });

});

export default handler;
