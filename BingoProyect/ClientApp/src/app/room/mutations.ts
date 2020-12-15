import gql from 'graphql-tag';


export const CREATE_NUM = gql`
  mutation($input: NumeroInputType!){
    createNumero(input: $input){
      id
      num
    }
  }
`;
