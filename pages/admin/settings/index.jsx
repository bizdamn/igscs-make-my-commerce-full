import React, { useContext, useEffect } from "react";
import db from "../../../utils/db";
import Store from "../../../models/Store";
import Layout from '../../../layouts/Layout/Layout';
import { AdminDataStore } from '../../../utils/admin/AdminDataStore';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import useStyles from '../../../utils/admin/styles';
import ButtonSaveProgress from '../../../components/admin/ui/ButtonSaveProgress'
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { Text } from '@components/ui'
export default function Setting({store}) {
    const classes = useStyles();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { state, dispatch } = useContext(AdminDataStore);
    const { adminStoreInfo } = state;
    useEffect(() => {
        if (!adminStoreInfo) {
            router.push('/admin/login');
        }
    }, [adminStoreInfo]);
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    const [storeIndustry, setStoreIndustry] = React.useState(
        store ? (
            store.storeDetails ? (
                store.storeDetails.storeIndustry ? (store.storeDetails.storeIndustry) : ''
            ) : ''
        ) : ''
    );
    const handleStoreChange = (e) => {
        setStoreIndustry(e.target.value);
    };
    const [storeAudience, setStoreAudience] = React.useState(
        store ? (
            store.storeDetails ? (
                store.storeDetails.storeAudience ? (store.storeDetails.storeAudience) : ''
            ) : ''
        ) : ''
    );
    const handleStoreAudience = (e) => {
        setStoreAudience(e.target.value);
    };

    const submitHandler = async ({ companyName, addressLine1, addressLine2, city, state, pinCode, country }) => {
        setButtonProgressLoading(true)
        closeSnackbar();

        try {
            await axios.post('/api/admin/store/store-details', {
                storeIndustry, storeAudience, companyName, addressLine1, addressLine2, city, country, state, pinCode
            });
            // console.log({ storeIndustry, storeAudience, companyName, addressLine1, addressLine2, city, country, state, pinCode})
            //  await dispatch({ type: 'STORE_DETAILS_ADD_ADDRESS',payload:{addressLine1: addressLine1, addressLine2: addressLine2, city: city, country: country, state: state, pinCode: pinCode} });
            //  await dispatch({ type: 'STORE_DETAILS_ADD',payload:{storeIndustry: storeIndustry, storeAudience: storeAudience, companyName: companyName} });

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
                    <Text variant="pageHeading">Store Details</Text>
                        <Typography fontWeight={700} component="p">Store contact information</Typography>
                        <Typography sx={{ mb: 2 }} component="p">Your customers will use this information to contact you</Typography>
                        <Paper sx={{ p: 3 }} variant="outlined" square>
                            <Typography component="p">Store Name</Typography>
                            <Typography component="p">How would you categorize your store?</Typography>
                            <FormControl sx={{ m: 1, minWidth: 120, width: '100%' }}>
                                <InputLabel id="demo-simple-select-helper-label">Store Industry</InputLabel>
                                <Select
                                    label="Store Industry"
                                    onChange={handleStoreChange}
                                    defaultValue={storeIndustry}
                                >
                                    <MenuItem value={'PLC'}>PLC</MenuItem>
                                    <MenuItem value={'Water Purificatin Plants'}>Water Purificatin Plants</MenuItem>
                                    <MenuItem value={'Rice Mill Machinery'}>Rice Mill Machinery</MenuItem>
                                    <MenuItem value={'Rice Mill Machinery'}>Rice Mill Machinery</MenuItem>
                                    <MenuItem value={'Offset Priniting Machines'}>Offset Priniting Machines</MenuItem>
                                    <MenuItem value={'Sensors'}>Sensors</MenuItem>
                                    <MenuItem value={'HMC'}>HMC</MenuItem>
                                </Select>

                            </FormControl>


                            <FormControl sx={{ m: 1, minWidth: 120, width: '100%' }}>
                                <InputLabel id="demo-simple-select-helper-label">Approximately how large is your audience?</InputLabel>

                                <Select
                                    label="Your Total Audience"
                                    onChange={handleStoreAudience}
                                    defaultValue={storeAudience}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'Less Than 1000'}>Less Than 1000</MenuItem>
                                    <MenuItem value={'1000 - 10000'}>1,000 - 10,000</MenuItem>
                                    <MenuItem value={'10000 - 100000'}>10,000 - 100,000</MenuItem>
                                    <MenuItem value={'100000 - 1000000'}>100,000 - 1000,000</MenuItem>
                                    <MenuItem value={'100000 - 1000000'}>100,000 - 1,000,000</MenuItem>
                                    <MenuItem value={'1,000,000 +'}>1,000,000 +</MenuItem>

                                </Select>
                            </FormControl>
                        </Paper>

                        <Typography fontWeight={700} sx={{ my: 2 }} component="p">Store Address</Typography>
                        <Paper sx={{ p: 3 }} variant="outlined" square>

                            <Controller
                                name="companyName"
                                control={control}
                                rules={{
                                    required: false,
                                    minLength: 2,
                                }}
                              
                            render={({ field }) => (
                                <TextField
                                    variant="outlined"
                                    sx={{ my: 2 }}
                                    fullWidth
                                    defaultValue={store.storeDetails ? (
                                        store.storeDetails.companyName ? (store.storeDetails.companyName) : ''
                                    ) : ''}
                                    id="title"
                                    label='Legal Name Of Company'
                                    inputProps={{ type: 'Title' }}
                                    error={Boolean(errors.companyName)}
                                    helperText={
                                        errors.name
                                            ? errors.name.type === 'minLength'
                                                ? 'Company Name length is more than 1'
                                                : ''
                                            : ''
                                    }
                                    {...field}
                                ></TextField>
                            )}
                            ></Controller>




                        <Controller
                            name="addressLine1"
                            control={control}
                            rules={{
                                required: false,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField
                                    variant="outlined"
                                    sx={{ my: 2 }}
                                    fullWidth
                                    id="addressLine1"
                                    defaultValue={store.address ? (
                                        store.address.addressLine1 ? (store.address.addressLine1) : ''
                                    ) : ''}
                                    label='Address'
                                    inputProps={{ type: 'text' }}
                                    error={Boolean(errors.addressLine1)}
                                    helperText={
                                        errors.name
                                            ? errors.name.type === 'minLength'
                                                ? 'Address  length should be more than 2 characters'
                                                : ''
                                            : ''
                                    }
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>


                        <Controller
                            name="addressLine2"
                            control={control}
                            rules={{
                                required: false,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField
                                    variant="outlined"
                                    sx={{ my: 2 }}
                                    fullWidth
                                    id="addressLine2"
                                    label='Apartment, suite, etc.'
                                    defaultValue={store.address ? (
                                        store.address.addressLine2 ? (store.address.addressLine2) : ''
                                    ) : ''}
                                    inputProps={{ type: 'text' }}
                                    error={Boolean(errors.addressLine2)}
                                    helperText={
                                        errors.name
                                            ? errors.name.type === 'minLength'
                                                ? 'Address  length should be more than 2 characters'
                                                : ''
                                            : ''
                                    }
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>


                        <Controller
                            name="city"
                            control={control}
                            rules={{
                                required: false,
                            }}
                            render={({ field }) => (
                                <TextField
                                    variant="outlined"
                                    sx={{ my: 2 }}
                                    fullWidth
                                    id="city"
                                    defaultValue={store.address ? (
                                        store.address.city ? (store.address.city) : ''
                                    ) : ''}
                                    label='City'
                                    inputProps={{ type: 'text' }}
                                    error={Boolean(errors.city)}

                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>




                        <Grid sx={{ my: 1 }} container spacing={2}>

                            <Grid item xs={12} lg={4}>
                                <Controller
                                    name="state"
                                    control={control}
                                    rules={{
                                        required: false,
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            variant="outlined"
                                            sx={{ my: 2 }}
                                            fullWidth
                                            id="state"
                                            defaultValue={store.address ? (
                                                store.address.state ? (store.address.state) : ''
                                            ) : ''}
                                            label='State'
                                            inputProps={{ type: 'text' }}
                                            error={Boolean(errors.state)}

                                            {...field}
                                        ></TextField>
                                    )}
                                ></Controller>


                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <Controller
                                    name="pinCode"
                                    control={control}
                                    rules={{
                                        required: false,
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            variant="outlined"
                                            sx={{ my: 2 }}
                                            fullWidth
                                            id="pinCode"
                                            defaultValue={store.address ? (
                                                store.address.pinCode ? (store.address.pinCode) : ''
                                            ) : ''}
                                            label='Pin Code'
                                            inputProps={{ type: 'number' }}
                                            error={Boolean(errors.pinCode)}

                                            {...field}
                                        ></TextField>
                                    )}
                                ></Controller>


                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <Controller
                                    name="country"
                                    control={control}
                                    rules={{
                                        required: false,
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            variant="outlined"
                                            sx={{ my: 2 }}
                                            defaultValue={store.address ? (
                                                store.address.country ? (store.address.country) : ''
                                            ) : ''}
                                            fullWidth
                                            id="country"
                                            label='Country / Region'
                                            inputProps={{ type: 'text' }}
                                            error={Boolean(errors.country)}

                                            {...field}
                                        ></TextField>
                                    )}
                                ></Controller>

                            </Grid>
                        </Grid>


                        <ButtonSaveProgress text='Save' size='md' buttonProgressLoading={buttonProgressLoading} setButtonProgressLoading={setButtonProgressLoading} />

                    </Paper>
                </form>








                    {/* <TextField fullWidth id="outlined-basic" label={store.username} variant="outlined" disabled /> */}
                {/* <Typography  component="p">https://makemycommerce/{store.username}</Typography> */}

                {/* <Grid sx={{ my: 1 }} container spacing={2}>
                    <Grid item xs={12} lg={6}>
                        <Typography  component="p">Store contact email</Typography>
                        <TextField fullWidth id="outlined-basic" label={email} variant="outlined" disabled />
                        <Typography  component="p">We'll use this address if we need to contact you about your store.</Typography>

                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Typography  component="p">Sender email</Typography>
                        <TextField fullWidth id="outlined-basic" label={email} variant="outlined" disabled />
                        <Typography  component="p">Your customers will see this address if you email them.</Typography>

                    </Grid>

                </Grid> */}
            </>) : (<></>)}
        </Box>
        </Layout >

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
  