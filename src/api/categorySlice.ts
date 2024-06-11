import { apiSlice } from "./apiSlice";


export const categorySlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        categoryAllGet: builder.query({
            query: () => ({
                url: '/category/main/all',
                method: 'GET',
            })
        }),
        subCategoryAllGet: builder.query({
            query: () => ({
                url: 'category/sub/all',
                method: 'GET',
            })
        }),
        categoryCreate: builder.mutation({
            query: (data) => ({
                url: '/category/main/store',
                method: 'POST',
                body: data
            })
        }),

        categoryDelete: builder.mutation({
            query: (data) => ({
                url: `/category/main/delete/${data.id}`,
                method: 'POST',
            })
        }),

        subCategoryCreate: builder.mutation({
            query: (data) => ({
                url: '/category/sub/store',
                method: 'POST',
                body: data      
            })
        }),

        CategoryUpdate: builder.mutation({
            query: (data) => ({
                url: `/category/main/update/${data.id}`,
                method: 'POST',
                body: data,
            })
        }),
        SubCategoryUpdate: builder.mutation({
            query: (data) => ({
                url: `/category/sub/update/${data.id}`,
                method: 'POST',
                body: data,
            })
        }),
        SubCategoryDelete: builder.mutation({
            query: (data) => ({
                url: `/category/sub/delete/${data.id}`,
                method: 'POST',
            })
        }),
    })
})

export const { useCategoryAllGetQuery, useCategoryCreateMutation, useSubCategoryCreateMutation, useSubCategoryAllGetQuery , useCategoryDeleteMutation , useCategoryUpdateMutation , useSubCategoryUpdateMutation , useSubCategoryDeleteMutation} = categorySlice

