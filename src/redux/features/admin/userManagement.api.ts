import { TQueryParam, TResponseRedux } from "../../../types";
import { TAdmin, TFaculty, TStudent } from "../../../types/userManagement.type";
import { baseApi } from "../../api/baseApi";


const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // ***********************************    Student Menegment    ********************

        // Get All Student API
        getAllStudents: builder.query({
            query: (args) => {
                console.log(args);
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: '/students',
                    method: 'GET',
                    params: params,
                };
            },
            transformResponse: (response: TResponseRedux<TStudent[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),

        // create student API
        addStudent: builder.mutation({
            query: (data) => ({
                url: '/users/create-student',
                method: 'POST',
                body: data,
            }),
        }),

        // ***********************************    Faculty Menegment    ********************

        // All Faculty Data
        getAllFaculties: builder.query({
            query: (args) => {
                console.log(args);
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: '/faculties',
                    method: 'GET',
                    params: params,
                };
            },
            transformResponse: (response: TResponseRedux<TFaculty[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),

        // ***********************************    Admin Menegment    ********************

        // All Admin Data
        getAllAdmins: builder.query({
            query: (args) => {
                console.log(args);
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: '/admins',
                    method: 'GET',
                    params: params,
                };
            },
            transformResponse: (response: TResponseRedux<TAdmin[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
    }),
});

export const {
    useAddStudentMutation,
    useGetAllStudentsQuery,
    useGetAllFacultiesQuery,
    useGetAllAdminsQuery,
} = userManagementApi;