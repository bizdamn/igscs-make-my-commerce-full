import nc from 'next-connect';
import PhysicalProduct from '../../../models/PhysicalProduct';
import DigitalProduct from '../../../models/DigitalProduct';
import db from '../../../utils/db';

const handler = nc();

handler.post(async (req, res) => {
    await db.connect();
    const physical_products = await PhysicalProduct.find({storeID:req.body.storeID});
    const digital_products = await DigitalProduct.find({storeID:req.body.storeID});
    await db.disconnect();
    res.send({
        digitalProducts: digital_products,
        physicalProducts: physical_products,
        success: true,
    })

});

export default handler;