
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';


const baseQuery = fetchBaseQuery({
    // baseUrl: import.meta.env.BASE_URL,
    baseUrl: 'http://localhost:5001/api/v1',
    credentials: 'include',
    prepareHeaders: ( headers, { getState} ) => {
        const token = (getState() as RootState).auth.token;

        if ( token ) {
            headers.set('authorization', `${token}`);
        }

        return headers;
    },
});

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQuery,
    endpoints: () => ({}),
});