import nextConnect from 'next-connect';
import { onError } from '../../../../utils/error';
import db from '../../../../utils/db';
import PhysicalProduct from '../../../../models/PhysicalProduct';
import DigitalProduct from '../../../../models/DigitalProduct';
import { isAuth } from '../../../../utils/auth';

const handler = nextConnect({
  onError,
});

handler.get(async (req, res) => {
  db.connect();
  const physicalProduct = await PhysicalProduct.findById(req.query.id);
  const digitalProduct = await DigitalProduct.findById(req.query.id);
  db.disconnect();
  if (physicalProduct) {
    res.send(physicalProduct.reviews);
  }
  else if (digitalProduct) {
    res.send(digitalProduct.reviews);
  }
  else {
    res.status(404).send({ message: 'Product not found' });
  }
});

handler.use(isAuth).post(async (req, res) => {
  await db.connect();
  const product = await PhysicalProduct.findById(req.query.id);
  const digitalProduct = await DigitalProduct.findById(req.query.id);
  if (product) {

    const existReview = product.reviews.find((x) => x.customer == req.customer._id);
    console.log(existReview);
    if (existReview) {
      await PhysicalProduct.updateOne(
        { _id: req.query.id, 'reviews._id': existReview._id },
        {
          $set: {
            'reviews.$.comment': req.body.comment,
            'reviews.$.rating': Number(req.body.rating),
          },
        }
      );


      const updatedProduct = await PhysicalProduct.findById(req.query.id);
      updatedProduct.numReviews = updatedProduct.reviews.length;
      updatedProduct.rating =
        updatedProduct.reviews.reduce((a, c) => c.rating + a, 0) /
        updatedProduct.reviews.length;
      await updatedProduct.save();

      await db.disconnect();
      return res.send({ message: 'Review updated' });
    } 
    
    else if(digitalProduct){
      
      const existReview = digitalProduct.reviews.find((x) => x.customer == req.customer._id);
      console.log(existReview);
      if (existReview) {
        await DigitalProduct.updateOne(
          { _id: req.query.id, 'reviews._id': existReview._id },
          {
            $set: {
              'reviews.$.comment': req.body.comment,
              'reviews.$.rating': Number(req.body.rating),
            },
          }
        );
  
  
        const updatedProduct = await DigitalProduct.findById(req.query.id);
        updatedProduct.numReviews = updatedProduct.reviews.length;
        updatedProduct.rating =
          updatedProduct.reviews.reduce((a, c) => c.rating + a, 0) /
          updatedProduct.reviews.length;
        await updatedProduct.save();
  
        await db.disconnect();
        return res.send({ message: 'Review updated' });
    }
    
    else {
      const review = {
        customer: req.customer._id,
        name: req.customer.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      digitalProduct.reviews.push(review);
      digitalProduct.numReviews = digitalProduct.reviews.length;
      digitalProduct.rating =
        digitalProduct.reviews.reduce((a, c) => c.rating + a, 0) /
        digitalProduct.reviews.length;
      await digitalProduct.save();
      await db.disconnect();
      res.status(201).send({
        message: 'Review submitted',
      });
    }
    }
    
    else {
      const review = {
        customer: req.customer._id,
        name: req.customer.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      await product.save();
      await db.disconnect();
      res.status(201).send({
        message: 'Review submitted',
      });
    }
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Product Not Found' });
  }
});

export default handler;
