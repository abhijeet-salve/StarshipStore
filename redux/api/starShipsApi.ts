import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GET_STAR_SHIPS_URL } from "../../utils/constants";

const starShipsApi = createApi({
  reducerPath: "starShipsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }), // You can set a base URL if needed
  endpoints: (builder) => ({
    getStarShips: builder.query<IGetStarShipResponse, string | null>({
      query: (nextUrl) => (nextUrl ? nextUrl : GET_STAR_SHIPS_URL),
    }),
  }),
});

export const { useLazyGetStarShipsQuery } = starShipsApi;
export default starShipsApi;
