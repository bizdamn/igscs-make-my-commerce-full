import { Layout } from '@components/common'
import { useContext ,useEffect} from "react";
import Cookies from 'js-cookie';
import { DataStore } from "../utils/DataStore";
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'
import db from "../utils/db";
import PhysicalProduct from "../models/PhysicalProduct";
import DigitalProduct from "../models/DigitalProduct";
import Store from "../models/Store";

export default function Home({ physicalProducts,store,digitalProducts }) {
  const { state, dispatch } = useContext(DataStore);


  useEffect(() => {
    dispatch({ type: 'STORE_SETUP', payload: store });
    Cookies.set('storeInfo', store);
  },[dispatch]);
  const { storeInfo } = state;

  return (
    <>
      <Grid variant="filled">
        {physicalProducts.slice(0, 3).map((product: any, i: number) => (
          <ProductCard
            key={product._id}
            product={product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
            }}
          />
        ))}
      </Grid>
      <Marquee variant="secondary">
        {physicalProducts.slice(0, 3).map((product: any, i: number) => (
          <ProductCard key={product._id} product={product} variant="slim" />
        ))}
      </Marquee>
      <Hero
        headline={storeInfo?.storeDetails?.storeIndustry}
        description={`${storeInfo?.bio.substring(0, 400)}  ${storeInfo?.bio.length>400?'....':null}`}
      />
      {/* <Grid layout="B" variant="filled">
        {digitalProducts.slice(0, 3).map((product: any, i: number) => (
          <ProductCard
            key={product._id}
            product={product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
            }}
          />
        ))}
      </Grid>
      <Marquee>
        {digitalProducts.slice(3).map((product: any, i: number) => (
          <ProductCard key={product._id} product={product} variant="slim" />
        ))}
      </Marquee> */}
      {/* <HomeAllProductsGrid
        newestProducts={products}
        categories={categories}
        brands={brands}
      /> */}
    </>
  )
}



export async function getServerSideProps() {
  await db.connect();
  const physicalProducts = await PhysicalProduct.find({}).lean();
  const digitalProducts = await DigitalProduct.find({}).lean();
  const store = await Store.find({ _id: process.env.STORE_OBJECT_ID }).lean();
  await db.disconnect();

  return {
    props: {
      physicalProducts: physicalProducts.map(db.convertDocToObj),
      digitalProducts: digitalProducts.map(db.convertDocToObj),
      store:  store.map(db.convertDocToObj)[0],
    },
  };
}



Home.Layout = Layout


