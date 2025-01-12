
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { setUser } from '../features/auth/authSlice';


const baseQuery = fetchBaseQuery({
    // baseUrl: import.meta.env.BASE_URL,
    baseUrl: 'http://localhost:5001/api/v1',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;

        if (token) {
            headers.set('authorization', `${token}`);
        }

        return headers;
    },
});

// Custom query
const baseQueryWithRefreshToken = async (args, api, extraOptions) => {

    const result = await baseQuery(args, api, extraOptions);
    // console.log(result);

    if (result?.error?.status === 401) {
        console.log('send refress token');

        const res = await fetch('http://localhost:5001/api/v1/auth/refresh-token', {
            method: 'POST',
            credentials: 'include'
        })


        const data = await res.json();

        console.log(data);
        

        const user = (api.getState() as RootState).auth.user;

        console.log(user);
        

        api.dispatch(
            setUser({
                user,
                token: data.data.accessToken
            })
        );
        
    }

    return result;
}

// const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
//     let result = await baseQuery(args, api, extraOptions);

//     if (result?.error?.status === 401) {
//         //* Send Refresh
//         // console.log('Sending refresh token');

//         const res = await fetch('http://localhost:5001/api/v1/auth/refresh-token', {
//             method: 'POST',
//             credentials: 'include',
//         });

//         const data = await res.json();

//         if (data?.data?.accessToken) {
//             const user = (api.getState() as RootState).auth.user;

//             api.dispatch(
//                 setUser({
//                     user,
//                     token: data.data.accessToken,
//                 })
//             );

//             result = await baseQuery(args, api, extraOptions);
//         } else {
//             api.dispatch(logout());
//         }
//     }

//     return result;
// };

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithRefreshToken,
    endpoints: () => ({}),
});