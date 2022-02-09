import React, { useContext, useEffect, useState } from "react";
import db from "../../../utils/db";
import Store from "../../../models/Store";
import Layout from '../../../layouts/Layout/Layout';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { AdminDataStore } from '../../../utils/admin/AdminDataStore';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonSaveProgress from '../../../components/admin/ui/ButtonSaveProgress'
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Text } from '@components/ui'
export default function Checkout({ store }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { state } = useContext(AdminDataStore);
  const { adminStoreInfo } = state;
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const[CodAvailable, setCodAvailable] = useState(store.checkout?.CodAvailable)
  const[checkoutCustomerAccount, setCheckoutCustomerAccount] = useState(store.checkout?.checkoutCustomerAccount)
  const[lastName, setLastName] = useState(store.formOptions?.lastName)
  const[companyName, setCompanyName] = useState(store.formOptions?.companyName)
  const[addressLine2, setAddressLine2] = useState(store.formOptions?.addressLine2)
  const[shippingAddressPhone, setShippingAddressPhone] = useState(store.formOptions?.shippingAddressPhone)

  const submitHandler = async ({ }) => {
    setButtonProgressLoading(true)
    closeSnackbar();
    try {
      await axios.post('/api/admin/store/checkout', {

      });
      setButtonProgressLoading(false)
      enqueueSnackbar("Updated Successfully", { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(err, { variant: 'error' });
    }

  };
  const [buttonProgressLoading, setButtonProgressLoading] = React.useState(false);


  return (
    <Layout>


      <Box sx={{ width: '100%', px: 4 }} >
        {store ? (<>
          <form onSubmit={handleSubmit(submitHandler)} >
            <Text variant="pageHeading">Checkout</Text>



            <Paper sx={{ p: 2, my: 2 }} variant="outlined" square>
              <Typography fontWeight={700} component="p">Cash On Delivery</Typography>
              <FormControl>
                <RadioGroup onChange={setCodAvailable} defaultValue={CodAvailable}>
                  <FormControlLabel value="true" control={<Radio />} label="Available" />
                  <FormControlLabel value="false" control={<Radio />} label="Not Available" />
                </RadioGroup>
              </FormControl>
            </Paper>



            <Paper sx={{ p: 2, my: 2 }} variant="outlined" square>
              <Typography fontWeight={700} component="p">Customer </Typography>
              <Typography sx={{ mb: 2 }} component="p">Choose if you want to prompt your customer to create an account when they check out.</Typography>
              <FormControl>
                <RadioGroup onChange={setCheckoutCustomerAccount} defaultValue={checkoutCustomerAccount}>
                  <FormControlLabel value="hidden" control={<Radio />} label="Accounts are disabled" />
                  <Typography sx={{ mb: 2 }} component="p">Customers will only be able to check out as guests.</Typography>
                  <FormControlLabel value="optional" control={<Radio />} label="Accounts are optional" />
                  <Typography sx={{ mb: 2 }} component="p">Customers will be able to check out with a customer account or as a guest.</Typography>
                  <FormControlLabel value="required" control={<Radio />} label="Accounts are required" />
                  <Typography sx={{ mb: 2 }} component="p">Customers will only be able to check out if they have a customer account.</Typography>

                </RadioGroup>
              </FormControl>
            </Paper>




            <Paper sx={{ p: 2 }} variant="outlined" square>
              <Typography fontWeight={700} component="p">Form options</Typography>
              <Typography sx={{ mb: 2 }} component="p">Choose whether your checkout form requires extra information from your customer.</Typography>
              <FormControl>
                <FormLabel>Full name</FormLabel>
                <RadioGroup onChange={setLastName} defaultValue={lastName}>
                  <FormControlLabel value="requireLastName" control={<Radio />} label="Require last name only" />
                  <FormControlLabel value="requireFirstNameLastName" control={<Radio />} label="Require first and last name" />
                </RadioGroup>
              </FormControl>
            </Paper>
            <Paper sx={{ p: 2 }} variant="outlined" square>
              <FormControl>
                <FormLabel>Company name</FormLabel>
                <RadioGroup onChange={setCompanyName} defaultValue={companyName}>
                  <FormControlLabel value="hidden" control={<Radio />} label="Hidden" />
                  <FormControlLabel value="optional" control={<Radio />} label="Optional" />
                  <FormControlLabel value="required" control={<Radio />} label="Required" />
                </RadioGroup>
              </FormControl>
            </Paper>
            <Paper sx={{ p: 2 }} variant="outlined" square>
              <FormControl>
                <FormLabel>Address line 2 (apartment, unit, etc.)</FormLabel>
                <RadioGroup onChange={setAddressLine2} defaultValue={addressLine2}>
                  <FormControlLabel value="hidden" control={<Radio />} label="Hidden" />
                  <FormControlLabel value="optional" control={<Radio />} label="Optional" />
                  <FormControlLabel value="required" control={<Radio />} label="Required" />
                </RadioGroup>
              </FormControl>
            </Paper>
            <Paper sx={{ p: 2 }} variant="outlined" square>
              <FormControl>
                <FormLabel>Shipping address phone number</FormLabel>
                <RadioGroup onChange={setShippingAddressPhone} defaultValue={shippingAddressPhone}>
                  <FormControlLabel value="hidden" control={<Radio />} label="Hidden" />
                  <FormControlLabel value="optional" control={<Radio />} label="Optional" />
                  <FormControlLabel value="required" control={<Radio />} label="Required" />
                </RadioGroup>
              </FormControl>
            </Paper>


            <Paper sx={{ p: 2, my: 2 }} variant="outlined" square>
              <Typography fontWeight={700} component="p">Tipping</Typography>
              <Typography sx={{ mb: 2 }} component="p">Include the option for customers to add a tip at checkout</Typography>
              <FormControl>
                <RadioGroup onChange={setCodAvailable} defaultValue="requireLastName">
                  <FormControlLabel value="requireLastName" control={<Radio />} label="Show tipping options at checkout." />
                  <Typography sx={{ mb: 2 }} component="p">Customers can add a tip to their online purchase and show their support for your business</Typography>
                </RadioGroup>
              </FormControl>
            </Paper>





            <ButtonSaveProgress text='Save' size='md' buttonProgressLoading={buttonProgressLoading} setButtonProgressLoading={setButtonProgressLoading} />

          </form>





        </>) : (<></>)}
      </Box>
    </Layout>

  )
}



export async function getServerSideProps() {
  await db.connect();
  const store = await Store.find({ _id: process.env.STORE_OBJECT_ID }).lean();
  await db.disconnect();

  return {
    props: {
      store: store.map(db.convertDocToObj)[0],
    },
  };
}
