
import { TQueryParam, TResponseRedux } from '../../../types';
import { TAcademicDepartment, TAcademicFaculty, TAcademicSemester } from '../../../types/academicManagement.type';
import { baseApi } from '../../api/baseApi';

const academicManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Get All Academic semister API
        getAllSemesters: builder.query({
            query: (args) => {
                // console.log(args);
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: '/academic-semesters',
                    method: 'GET',
                    params: params,
                };
            },
            transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),

        // Create Academic semister API
        addAcademicSemester: builder.mutation({
            query: (data) => ({
                url: '/academic-semesters/create-academic-semester',
                method: 'POST',
                body: data,
            }),
        }),

        // Get All Academic Faculty
        getAcademicFaculties: builder.query({
            query: () => {
                return { url: '/academic-faculties', method: 'GET' };
            },
            transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),

        // Add Academic Faculty
        addAcademicFaculty: builder.mutation({
            query: (data) => ({
                url: '/academic-faculties/create-academic-faculty',
                method: 'POST',
                body: data,
            }),
        }),

        // Get All Academic Department
        getAcademicDepartments: builder.query({
            query: () => {
                return { url: '/academic-departments', method: 'GET' };
            },
            transformResponse: (response: TResponseRedux<TAcademicDepartment[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),

        // Add Academic Depatment
        addAcademicDepartment: builder.mutation({
            query: (data) => ({
                url: '/academic-departments/create-academic-department',
                method: 'POST',
                body: data,
            }),
        }),

    }),
});

export const {
    useGetAllSemestersQuery,
    useAddAcademicSemesterMutation,
    useGetAcademicDepartmentsQuery,
    useAddAcademicDepartmentMutation,
    useGetAcademicFacultiesQuery,
    useAddAcademicFacultyMutation
} = academicManagementApi;