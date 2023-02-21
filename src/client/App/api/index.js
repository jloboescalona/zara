import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const allOrigin = 'https://api.allorigins.win/'
const allOriginParam = (url = "") => `get?url=${encodeURIComponent(url)}`

export const api = createApi({
  reducerPath: 'podcasts',
  baseQuery: fetchBaseQuery({
    baseUrl: allOrigin
  }),
  endpoints: (builder) => ({
    getPodcasts: builder.query({
      query: () => allOriginParam('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'),
      transformResponse: (response) => {
        return response?.contents && response?.status?.http_code === 200 && JSON.parse(response?.contents)
      },
      keepUnusedDataFor: 86400
    }),
    getPostcastByID: builder.query({
      query: (id) => allOriginParam(`https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=10000`),
      transformResponse: (response) => {
        return response?.contents && response?.status?.http_code === 200 && JSON.parse(response?.contents)
      },
      keepUnusedDataFor: 86400
    })
  })
})

export const { useGetPodcastsQuery, useGetPostcastByIDQuery } = api