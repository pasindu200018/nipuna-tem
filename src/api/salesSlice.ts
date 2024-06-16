import { apiSlice } from './apiSlice'

export const salesSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createSales: builder.mutation({
			query: (data) => ({
				url: '/sales/create',
				method: 'POST',
                body: data,
			}),
		}),
		getAllSales: builder.query({
			query: () => ({
				url: '/sales/get-all',
				method: 'GET',
			}),
		}),
	}),
})

export const { useCreateSalesMutation, useGetAllSalesQuery } = salesSlice