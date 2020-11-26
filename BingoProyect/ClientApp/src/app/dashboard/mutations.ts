import gql from "graphql-tag";

export const CREATE_ROOM = gql`
    mutation($input: RoomInput!) {
        createRoom(input: $input) {
            id
            name
            code
        }
    }
`;

export const DELETE_ROOM = gql`
    mutation($id: ID!) {
        deleteRoom(id: $id) {
            id
        }
    }
`;