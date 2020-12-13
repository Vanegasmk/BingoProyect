import gql from "graphql-tag";

export const CARDBOARD_QUERY = gql`
  query($id: Int) {
    cardboard(id: $id) {
      id
      numbers
    }
  }
`;
