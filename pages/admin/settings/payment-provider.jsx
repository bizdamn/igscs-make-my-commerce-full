import React, { useContext,useEffect } from "react";
import Layout from '../../../layouts/Layout/Layout';
import Link from 'next/link'
import Image from 'next/image'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import ButtonSaveProgress from '../../../components/admin/ui/ButtonSaveProgress'
import { AdminDataStore } from '../../../utils/admin/AdminDataStore';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { Text } from '@components/ui'
export default function SEO() {
  const [buttonProgressLoading, setButtonProgressLoading] = React.useState(false);
    const { state, dispatch } = useContext(AdminDataStore);
    const { adminStoreInfo } = state;
    const router = useRouter();
    const {
      handleSubmit,
      control,
      formState: { errors },
    } = useForm();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    useEffect(() => {
      if (!adminStoreInfo) {
          router.push('/admin/login');
      }
  }, [router,adminStoreInfo]);



      const submitHandler = async ({ key, secret }) => {
        closeSnackbar();
        try {
          const { data } = await axios.post('/api/admin/store/payment-provider', {
            storeID:adminStoreInfo._id,
            key,
            secret,
          });
          enqueueSnackbar(
            'Added Successfully',{ variant: 'success' }
          );
        } catch (err) {
          enqueueSnackbar(
            err,{ variant: 'error' }
          );
        }
      };
    
    return (
        <Layout>
                 <Text variant="pageHeading">Payment Providers</Text>
          {adminStoreInfo?(
             <form onSubmit={handleSubmit(submitHandler)} >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
          <Image width="100" height="100" src='/admin/images/dashboard/rajorpay.jpg' alt='Razorpay'></Image>
          <Typography  component="p">Razorpay</Typography>
              <Box sx={{ mt: 1 }}>

                <Controller
                  name="key"
                  control={control}
                  defaultValue={adminStoreInfo.paymentProviders?.razorpay?.key?adminStoreInfo.paymentProviders?.razorpay?.key:''}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <TextField
                      sx={{ my: 4 }}
                      // placeholder={adminStoreInfo.paymentProviders[0].razorpay.key}
                      variant="outlined"
                      fullWidth
                      id="key"
                      label="Razorpay Key"
                      inputProps={{ type: 'text' }}
                      error={Boolean(errors.key)}
                      helperText={
                        errors.key
                          ?'Key is required'
                          : ''
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>

                <Controller
                  name="secret"
                  control={control}
                  defaultValue={adminStoreInfo.paymentProviders?.razorpay?.secret?adminStoreInfo.paymentProviders?.razorpay?.secret:''}
                  rules={{
                    required: true,
                    minLength: 6,
                  }}
                  render={({ field }) => (
                    <TextField
                      sx={{ mb: 4 }}
                      variant="outlined"
                      // placeholder={adminStoreInfo.paymentProviders[0].razorpay.secret}
                      fullWidth
                      id="secret"
                      label="Razorpay Secret"
                      inputProps={{ type: 'text' }}
                      error={Boolean(errors.secret)}
                      helperText={
                        errors.secret
                          ? errors.secret.type === 'minLength'
                            ? 'Secret length is more than 5'
                            : 'Secret is required'
                          : ''
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>



<ButtonSaveProgress text='Save' size='md' buttonProgressLoading={buttonProgressLoading} setButtonProgressLoading={setButtonProgressLoading} />

              </Box>
            </Box>
          </form>
          ):(<></>)}
        </Layout>

    )
}
