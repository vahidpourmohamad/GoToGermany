import { gql } from "@apollo/client";

export const loginGQL = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
    }
  }
`;
