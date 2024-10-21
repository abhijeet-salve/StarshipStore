import React, { useState, useEffect } from "react";
import { ActivityIndicator, FlatList, View, StyleSheet } from "react-native";
import axios from "axios";
import StarShipListItem from "./StarShipListItem";
import { GET_STAR_SHIPS_URL } from "../../utils/constants";
import { transformApiResponse } from "../../utils/utils";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const StarShipList = () => {
  const [starShips, setStarShips] = useState<Starship[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(GET_STAR_SHIPS_URL);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const cartItemsLength = useSelector(
    (state: RootState) => state.cart.items
  ).length;

  const fetchStarShips = async (loadMore = false) => {
    if (!nextUrl || loading || loadingMore) return;

    loadMore ? setLoadingMore(true) : setLoading(true);
    try {
      const response = await axios.get<IGetStarShipResponse>(nextUrl);
      const { results, next } = response.data;

      setStarShips((prevStarShips) => [...prevStarShips, ...results]);

      setNextUrl(next);
    } catch (error) {
      console.error("Error fetching star ships:", error);
    } finally {
      loadMore ? setLoadingMore(false) : setLoading(false);
    }
  };

  useEffect(() => {
    fetchStarShips();
  }, []);

  const handleLoadMore = () => {
    if (nextUrl) {
      fetchStarShips(true);
    }
  };

  const renderItem = ({ item }: { item: Starship }) => {
    return <StarShipListItem ship={item} key={item.name} />;
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return <ActivityIndicator size="small" color="black" />;
  };

  if (loading)
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <FlatList
      data={transformApiResponse(starShips)}
      keyExtractor={(item) => item.name}
      renderItem={renderItem}
      numColumns={2}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      columnWrapperStyle={{}}
      style={{ marginBottom: cartItemsLength > 0 ? 60 : 0 }}
    />
  );
};

export default StarShipList;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
