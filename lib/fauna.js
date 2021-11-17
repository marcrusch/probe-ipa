import {GraphQLClient, gql} from "graphql-request"

const FAUNA_ADMIN_KEY = process.env.FAUNA_ADMIN_KEY;
const FAUNA_GRAPHQL_BASE_URL = 'https://graphql.fauna.com/graphql';

const graphQLClient = new GraphQLClient(FAUNA_GRAPHQL_BASE_URL, {
    headers: {
        authorization: `Bearer ${FAUNA_ADMIN_KEY}`
    }
})

export const listDevices = () => {
    const query = gql`
    query Devices($size: Int) {
        devices(_size: $size) {
            data {
                _id
                displaySize
                keyboardLayout
                operatingSystem
                comment
                modelYear
            }
        }
    }
    `
    return graphQLClient.request(query, {size: 999}).then(({devices: {data}}) => data);
}

export const createDevice = (newDevice) => {
    const mutation = gql`
        mutation CreateDevice($input: DeviceInput!) {
            createDevice(data: $input) {
                _id
                displaySize
                keyboardLayout
                operatingSystem
                comment
                modelYear
            }
        }
    `
    return graphQLClient.request(mutation, {input: newDevice});
}

export const updateDevice = (id, device) => {
    const mutation = gql`
        mutation UpdateDevice($id: ID!, $input: DeviceInput!) {
            updateDevice(id: $id, data: $input) {
                _id
                displaySize
                keyboardLayout
                operatingSystem
                comment
                modelYear
            }
        }
    `
    return graphQLClient.request(mutation, {id: id, input: device})
}

export const deleteDevice = (id) => {
    const mutation = gql`
        mutation DeleteDevice($id: ID!) {
            deleteDevice(id: $id) {
                _id
                displaySize
                keyboardLayout
                operatingSystem
                comment
                modelYear
            }
        }
    `
    return graphQLClient.request(mutation, {id: id});
}