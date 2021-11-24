import { GraphQLClient, gql } from "graphql-request";

const FAUNA_ADMIN_KEY = process.env.FAUNA_ADMIN_KEY;
const FAUNA_GRAPHQL_BASE_URL = "https://graphql.fauna.com/graphql";

const graphQLClient = new GraphQLClient(FAUNA_GRAPHQL_BASE_URL, {
  headers: {
    authorization: `Bearer ${FAUNA_ADMIN_KEY}`,
  },
});

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
  `;
  return graphQLClient
    .request(query, { size: 999 })
    .then(({ devices: { data } }) => data);
};

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
  `;
  return graphQLClient.request(mutation, { input: newDevice });
};

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
  `;
  return graphQLClient.request(mutation, { id: id, input: device });
};

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
  `;
  return graphQLClient.request(mutation, { id: id });
};

export const listLendPeriods = () => {
  const query = gql`
    query LendPeriods($size: Int) {
      lendPeriods(_size: $size) {
        data {
          _id
          startTs
          endTs
          lendState
          user
          device {
            _id
            displaySize
            keyboardLayout
            operatingSystem
            comment
            modelYear
          }
        }
      }
    }
  `;
  return graphQLClient
    .request(query, { size: 999 })
    .then(({ lendPeriods: { data } }) => data);
};

export const createLendPeriod = (lendPeriod) => {
  const mutation = gql`
    mutation CreateLendPeriod($input: LendPeriodInput!) {
      createLendPeriod(data: $input) {
        _id
        startTs
        endTs
        lendState
        user
        device {
          _id
          displaySize
          keyboardLayout
          operatingSystem
          comment
          modelYear
        }
      }
    }
  `;
  return graphQLClient.request(mutation, { input: lendPeriod });
};

export const updateLendPeriod = (id, lendPeriod) => {
  const mutation = gql`
    mutation UpdateLendPeriod($id: ID!, $input: LendPeriodInput!) {
      updateLendPeriod(id: $id, data: $input) {
        _id
        startTs
        endTs
        lendState
        user
        device {
          _id
          displaySize
          keyboardLayout
          operatingSystem
          comment
          modelYear
        }
      }
    }
  `;
  return graphQLClient.request(mutation, { id: id, input: lendPeriod });
};

export const deleteLendPeriod = (id) => {
  const mutation = gql`
    mutation DeleteLendPeriod($id: ID!) {
      deleteLendPeriod(id: $id) {
        _id
        startTs
        endTs
        lendState
        device {
          _id
          displaySize
          keyboardLayout
          operatingSystem
          comment
          modelYear
        }
      }
    }
  `;
  return graphQLClient.request(mutation, { id });
};
