import { useMemo } from 'react'
import { SWRHook } from '@commerce/utils/types'
import useCart, { UseCart } from '@commerce/cart/use-cart'
import type { GetCartHook } from '@commerce/types/cart'
import axios from 'axios'
export default useCart as UseCart<typeof handler>

export const handler: SWRHook<GetCartHook> = {
  fetchOptions: {
    url: '/api/cart/get-cart',
    method: 'GET',
  },

  async fetcher() {
    const data = await axios.get('/api/cart/get-cart');
    console.log(data.data)
    return data.data
  },

  
  useHook:
    ({ useData }) =>
    (input) => {
      const response = useData({
        swrOptions: { revalidateOnFocus: false, ...input?.swrOptions },
      })
     console.log('use-cart')

     
      return useMemo(
        
        () =>
          Object.create(response, {
            isEmpty: {
              get() {
                console.log(response.data)
                return (response.data?.lineItems.length ?? 0) <= 0
              },
              enumerable: true,
            },
          }),
        [response]
      )
    },
}
