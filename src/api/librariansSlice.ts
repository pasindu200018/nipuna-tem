import { apiSlice } from './apiSlice'

export const librarianSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createLibrarian: builder.mutation({
			query: (data) => ({
				url: '/librarian/create',
				method: 'POST',
                body: data,
			}),
		}),
		getAllLibrarian: builder.query({
			query: (data) => ({
				url: '/librarian/get-all',
				method: 'GEt',
			}),
		}),
	}),
})

export const {useCreateLibrarianMutation, useGetAllLibrarianQuery} = librarianSlice