import gql from "graphql-tag";

export const ADMIN_QUERY = gql`
  query($email: String, $password: String) {
    admin(email: $email, password: $password) {
      id
      email
      password
    }
  }
`;
