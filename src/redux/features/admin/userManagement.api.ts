import { baseApi } from "../../api/baseApi";


const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Get All Student API
        // getAllStudents: builder.query({
        //     query: (args) => {
        //         console.log(args);
        //         const params = new URLSearchParams();

        //         if (args) {
        //             args.forEach((item: TQueryParam) => {
        //                 params.append(item.name, item.value as string);
        //             });
        //         }

        //         return {
        //             url: '/students',
        //             method: 'GET',
        //             params: params,
        //         };
        //     },
        //     transformResponse: (response: TResponseRedux<TStudent[]>) => {
        //         return {
        //             data: response.data,
        //             meta: response.meta,
        //         };
        //     },
        // }),

        // create student API
        addStudent: builder.mutation({
            query: (data) => ({
                url: '/users/create-student',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useAddStudentMutation,
    //  useGetAllStudentsQuery
} = userManagementApi;