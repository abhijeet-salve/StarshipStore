import React from "react";
import { FlatList, ActivityIndicator } from "react-native";
import FullScreenMessage from "./FullScreenMessage";
import StarShipListItem from "../ShipsList/StarShipListItem";

const SearchResult = ({
  loading,
  isError,
  searchText,
  filteredList,
}: ISearchResultsProps) => {
  if (loading) return <ActivityIndicator size="small" color="black" />;

  if (isError) return <FullScreenMessage message="Something went wrong!" />;

  if (searchText.length > 0) {
    if (filteredList.length > 0)
      return (
        <FlatList
          data={filteredList}
          keyExtractor={(item) => `${item.name}-${item.manufacturer}`}
          renderItem={({ item }) => <StarShipListItem ship={item} />}
        />
      );
    else return <FullScreenMessage message="No Star ships found!" />;
  }

  return (
    <FullScreenMessage
      message={`Begin your search for the perfect Starship!`}
    />
  );
};

export default SearchResult;
