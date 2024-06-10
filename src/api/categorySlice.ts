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
       
        subCategoryCreate: builder.mutation({
            query: (data) => ({
                url: '/category/sub/store',
                method: 'POST',
                body: data      
            })
        })
    })
})

export const { useCategoryAllGetQuery, useCategoryCreateMutation, useSubCategoryCreateMutation, useSubCategoryAllGetQuery } = categorySlice

