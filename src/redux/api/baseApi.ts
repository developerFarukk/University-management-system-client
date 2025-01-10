
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        // baseUrl: process.env.BASE_URL,
        baseUrl: 'http://localhost:5000/api/v1',
        credentials: 'include',
    }),

    endpoints: () => ({}),
});