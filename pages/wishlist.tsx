import type { GetStaticPropsContext } from 'next'
import { useContext, useEffect, useReducer } from 'react'
import commerce from '@lib/api/commerce'
import { Heart } from '@components/icons'
import { Layout } from '@components/common'
import { Text, Container, Skeleton } from '@components/ui'
import { WishlistCard } from '@components/wishlist'
import useWishlist from '@framework/wishlist/use-wishlist'
import rangeMap from '@lib/range-map'
import axios from 'axios';
import { useRouter } from 'next/router';
import { DataStore } from "../utils/DataStore";


export default function WishlistPage() {
  const router = useRouter();
  const { state } = useContext(DataStore);
  const { customerInfo, wishlist } = state;
  const isEmpty = wishlist.wishlistItems.length == 0 ? true : false;
  const isLoading = false;



  return (
    <Container>
      <div className="mt-3 mb-20">
        <Text variant="pageHeading">My Wishlist</Text>
        <div className="group flex flex-col">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rangeMap(12, (i) => (
                <Skeleton key={i}>
                  <div className="w-60 h-60" />
                </Skeleton>
              ))}
            </div>
          ) : isEmpty ? (
            <div className="flex-1 px-12 py-24 flex flex-col justify-center items-center ">
              <span className="border border-dashed border-secondary flex items-center justify-center w-16 h-16 bg-primary p-12 rounded-lg text-primary">
                <Heart className="absolute" />
              </span>
              <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
                Your wishlist is empty
              </h2>
              <p className="text-accent-6 px-10 text-center pt-2">
                Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {wishlist.wishlistItems?.map((item:any) => (
                <WishlistCard key={item.id} item={item!} />
              ))}
            </div>
          )}
        </div>




      </div>
    </Container>
  )
}




WishlistPage.Layout = Layout


