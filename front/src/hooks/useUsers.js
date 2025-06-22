// src/hooks/useUsers.js
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../graphql/queries/userQueries';

export function useUsers() {
    const { loading, error, data } = useQuery(GET_USERS);
    return { loading, error, users: data?.users || [] };
}
