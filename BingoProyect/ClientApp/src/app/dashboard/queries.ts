import gql from "graphql-tag";

export const ROOMS_QUERY = gql`
  query {
    rooms {
      id
      name
      code
    }
  }
`;
