import { useMutation } from '@apollo/client';
import { GET_USERS } from '../graphql/queries/userQueries';
import { CREATE_USER } from '../graphql/mutations/createUser';

export function useAddUser() {
    const [createUser, { loading: createLoading, error: createError }] = useMutation(CREATE_USER, {
        refetchQueries: [{ query: GET_USERS }],
    });

    return {
        createUser,
        createLoading,
        createError,
    };
}
