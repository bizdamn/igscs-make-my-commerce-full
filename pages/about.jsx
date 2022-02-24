import { Layout } from '@components/common'
import { FC, useContext } from 'react'
import Grid from '@mui/material/Grid';
import Image from 'next/image'
import styled from 'styled-components';
import { Text, Container } from '@components/ui'
import { DataStore } from '../utils/DataStore';
export default function About() {
    const { state } = useContext(DataStore);
    const { storeInfo } = state;
    return (
        <>
            {storeInfo ? (
                <>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Image src={storeInfo?.logo} height={400} width={400} />
                        </Grid>
                        <Grid item xs={7}>
                            <Text variant="pageHeading"> Company Highlights</Text>

                            <Table>
                                <Tr>
                                    <Td>Industry</Td>
                                    <Td>{storeInfo?.storeDetails?.storeIndustry}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Company CEO</Td>
                                    <Td>{storeInfo?.name}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Registered Address</Td>
                                    <Td>{storeInfo?.address?.addressLine1}{' '}{storeInfo.address?.addressLine2}</Td>
                                </Tr>

                                <Tr>
                                    <Td>Year of Establishment</Td>
                                    <Td>2020</Td>
                                </Tr>
                                <Tr>
                                    <Td>Email</Td>
                                    <Td>{storeInfo?.email}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Phone</Td>
                                    <Td>{storeInfo?.phone}</Td>
                                </Tr>

                            </Table>
                        </Grid>
                        <Grid style={{ textAlign: 'center', padding: '3rem' }} item xs={12}>
                            <Text variant="pageHeading">About Us</Text>
                            <p>{storeInfo?.bio}</p>
                        </Grid>
                    </Grid>



                </>
            ) : null}


        </>
    )
}

const Table = styled.table`
border-collapse: collapse;
width: 100%;
`;
const Td = styled.td`
border: 1px solid #dddddd;
text-align: left;
padding: 8px;
`;
const Tr = styled.tr`
border: 1px solid #dddddd;
text-align: left;
padding: 8px;
`;

About.Layout = Layout
