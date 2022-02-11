import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { DataStore } from '../utils/DataStore';
import CheckoutWizard from '../components/CheckoutWizard';
import { Layout } from '@components/common'
import { useUI } from '@components/ui/context'
import useStyles from '../utils/styles';
import {
  Grid,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { Button } from '@components/ui'
export default function Payment() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('');
  const { state, dispatch } = useContext(DataStore);
  const { openModal } = useUI()
  const {customerInfo,
    storeInfo,
    cart: { shippingAddress },
  } = state;
  useEffect(() => {
    if (!customerInfo) {
      router.push('/');
      openModal()
    }

    if (!shippingAddress.address) {
      router.push('/shipping');
    } else {
      setPaymentMethod(Cookies.get('paymentMethod') || '');
    }
  }, [setPaymentMethod, shippingAddress, router]);
  const submitHandler = (e) => {
    closeSnackbar();
    e.preventDefault();
    if (!paymentMethod) {
      enqueueSnackbar('Payment method is required', { variant: 'error' });
    } else {
      dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod });
      Cookies.set('paymentMethod', JSON.stringify(paymentMethod));
      router.push('/placeorder');
    }
  };
  return (
    <>
      <CheckoutWizard activeStep={2}></CheckoutWizard>
      <form className={classes.form} onSubmit={submitHandler}>

        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12} lg={6}>
            <List>
              <ListItem>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="Payment Method"
                    name="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    {storeInfo?.checkout?.CodAvailable ? (
                      <FormControlLabel
                        label="Cash On Delivery"
                        value="COD"
                        control={<Radio />}
                      ></FormControlLabel>
                    ) : null}
                    <FormControlLabel
                      label="RazorPay"
                      value="RazorPay"
                      control={<Radio />}
                    ></FormControlLabel>
                    <FormControlLabel
                      label="PayPal"
                      value="PayPal"
                      control={<Radio />}
                    ></FormControlLabel>

                  </RadioGroup>
                </FormControl>
              </ListItem>
              <ListItem>
                <Button type="submit" width="100%" >
                  Continue
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  type="button"
                  width="100%"
                  onClick={() => router.push('/shipping')}
                >
                  Back
                </Button>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
Payment.Layout = Layout
