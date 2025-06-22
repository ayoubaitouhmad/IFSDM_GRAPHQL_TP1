import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation AddUser($name: String!, $email: String!) {
    AddUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

