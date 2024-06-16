import { apiSlice } from './apiSlice'

export const materialSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createMaterial: builder.mutation({
			query: (data) => ({
				url: '/material/create',
				method: 'POST',
                body: data,
			}),
		}),
		getAllMaterial: builder.query({
			query: () => ({
				url: '/material/get',
				method: 'GET',
			}),
		}),
	}),
})

export const { useCreateMaterialMutation, useGetAllMaterialQuery } = materialSlice