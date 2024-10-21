import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import StarShipListItem from "./StarShipListItem";
import { GET_STAR_SHIPS_URL } from "../../utils/constants";
import { transformApiResponse } from "../../utils/utils";
import { useLazyGetStarShipsQuery } from "../../redux/api/starShipsApi";
import { addStarShips, setNextUrl } from "../../redux/slices/starShipsSlice";

const StarShipList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItemsLength = useSelector(
    (state: RootState) => state.cart.items.length
  );

  const { starShips, nextUrl } = useSelector(
    (state: RootState) => state.starShips
  );

  const [trigger, { data, error, isLoading, isFetching }] =
    useLazyGetStarShipsQuery();

  useEffect(() => {
    if (!starShips.length && nextUrl === null) {
      trigger(GET_STAR_SHIPS_URL);
    }
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(addStarShips(data.results));
      dispatch(setNextUrl(data.next));
    }
  }, [data]);

  const handleLoadMore = () => {
    if (nextUrl && !isFetching) {
      trigger(nextUrl);
    }
  };

  if (isLoading && starShips.length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text>Uh-oh! Couldn't load star ships. Try again soon!</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Starship }) => (
    <StarShipListItem ship={item} key={item.name} />
  );

  const renderFooter = () => {
    if (isFetching) return <ActivityIndicator size="small" color="black" />;
    return null;
  };

  return (
    <FlatList
      data={transformApiResponse(starShips)}
      keyExtractor={(item) => item.name + item.manufacturer}
      renderItem={renderItem}
      numColumns={2}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
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
