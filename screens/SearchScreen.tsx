import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import axios from "axios";
import { GET_STAR_SHIPS_URL, SEARCH_DEBOUNCE_DELAY } from "../utils/constants";
import { transformApiResponse } from "../utils/utils";
import CartBanner from "../components/common/CartBanner";
import SearchResult from "../components/SearchScreenComponents/SearchResults";

const SearchScreen = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [results, setResults] = useState<Starship[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const filteredList = transformApiResponse(results);

  const fetchResults = async (query: string) => {
    setLoading(true);
    try {
      // can be done with rtk, but can use axios as well (2 api by 2 different methods)
      const response = await axios.get<IGetStarShipResponse>(
        `${GET_STAR_SHIPS_URL}?search=${query}`
      );
      setResults(response.data.results);
    } catch (error) {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceFetchResults = setTimeout(() => {
      if (searchText) {
        fetchResults(searchText);
      } else {
        setResults([]);
      }
    }, SEARCH_DEBOUNCE_DELAY);

    return () => clearTimeout(debounceFetchResults);
  }, [searchText]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search Star ships"
        inputMode="search"
        value={searchText}
        onChangeText={setSearchText}
        style={styles.textInput}
      />

      <SearchResult
        loading={loading}
        isError={isError}
        searchText={searchText}
        filteredList={filteredList}
      />

      <CartBanner />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 20,
    borderRadius: 24,
    paddingHorizontal: 10,
  },
  message: { justifyContent: "center", alignItems: "center", gap: 20 },
  largeText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    letterSpacing: 0.2,
  },
});

export default SearchScreen;
