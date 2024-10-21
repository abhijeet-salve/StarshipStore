import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import axios from "axios";
import StarShipListItem from "../components/ShipsList/StarShipListItem";
import { SEARCH_DEBOUNCE_DELAY } from "../utils/constants";
import { transformApiResponse } from "../utils/utils";
import CartBanner from "../components/common/CartBanner";

const SearchScreen = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [results, setResults] = useState<Starship[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const filteredList = transformApiResponse(results);

  const fetchResults = async (query: string) => {
    setLoading(true);
    try {
      const response = await axios.get<IGetStarShipResponse>(
        `https://swapi.dev/api/starships/?search=${query}`
      );
      setResults(response.data.results);
    } catch (error) {
      console.error("Error fetching starships:", error);
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

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="small" color="black" />;
    }

    if (searchText.length > 0) {
      if (filteredList.length > 0) {
        return (
          <FlatList
            data={filteredList}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => <StarShipListItem ship={item} />}
          />
        );
      } else {
        return <Text>No data found</Text>;
      }
    }

    return (
      <View
        style={{
          ...styles.container,
          ...styles.startSearch,
        }}
      >
        <Text style={styles.largeText}>
          The galaxy is calling!{"\n"} Begin your search for the perfect
          Starship!
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search Star ships"
        inputMode="search"
        value={searchText}
        onChangeText={setSearchText}
        style={styles.textInput}
      />
      {renderContent()}

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
  startSearch: { justifyContent: "center", alignItems: "center", gap: 20 },
  largeText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    letterSpacing: 1.2,
  },
});

export default SearchScreen;
