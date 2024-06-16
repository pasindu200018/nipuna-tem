import { apiSlice } from './apiSlice'

export const bannerSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createBanner: builder.mutation({
			query: (data) => ({
				url: '/banner/create',
				method: 'POST',
                body: data,
			}),
		}),
		getAllBanner: builder.query({
			query: (data) => ({
				url: '/Banner/get-all',
				method: 'GET',
			}),
		}),
        updateBanner: builder.mutation({
			query: (data) => ({
				url: '/banner/update',
				method: 'POST',
                body: data,
			}),
		}),

	}),
})

export const {  } = bannerSlice