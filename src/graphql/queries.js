// eslint-disable
// this is an auto generated file. This will be overwritten

export const getUserInformation = `query GetUserInformation($id: ID!) {
  getUserInformation(id: $id) {
    id
    firstName
    lastName
    streetAddress
    city
    postcode
    AcceptedDelivery
    owner
  }
}
`;
export const listUserInformations = `query ListUserInformations(
  $filter: ModelUserInformationFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserInformations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      firstName
      lastName
      streetAddress
      city
      postcode
      AcceptedDelivery
      owner
    }
    nextToken
  }
}
`;
