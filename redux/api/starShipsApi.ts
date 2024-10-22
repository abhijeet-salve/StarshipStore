import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { transformApiResponse } from "../../utils/utils";

const starShipsApi = createApi({
  reducerPath: "starShipsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: (builder) => ({
    getStarShips: builder.query<IGetStarShipResponse, string | null>({
      query: (nextUrl: string) => nextUrl,
      transformResponse: (response: IGetStarShipResponse) => ({
        ...response,
        results: transformApiResponse(response.results),
      }),
      keepUnusedDataFor: 300, //seconds
    }),
  }),
});

export const { useLazyGetStarShipsQuery } = starShipsApi;
export default starShipsApi;
