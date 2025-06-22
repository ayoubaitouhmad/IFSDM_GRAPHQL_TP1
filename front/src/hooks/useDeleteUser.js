import { useMutation } from '@apollo/client';
import { GET_USERS } from '../graphql/queries/userQueries';

import {DELETE_USER} from "../graphql/mutations/deleteUser.js";

export function useDeleteUser() {
    const [deleteUser, { loading: deleteUserLoading, error: deleteError }] = useMutation(DELETE_USER, {
        refetchQueries: [{ query: GET_USERS }],
    });

    return {
        deleteUser,
        deleteUserLoading,
        deleteError,
    };
}
