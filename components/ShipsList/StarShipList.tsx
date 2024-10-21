import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetStarShipsQuery } from "../../redux/api/starShipsApi";
import { addStarShips, setNextUrl } from "../../redux/slices/starShipsSlice";
import { selectCartItems } from "../../redux/selectors/cartSelectors";
import { selectShipsState } from "../../redux/selectors/starShipsSelectors";
import { GET_STAR_SHIPS_URL } from "../../utils/constants";
import { transformApiResponse } from "../../utils/utils";
import StarShipListItem from "./StarShipListItem";

const StarShipList = () => {
  const dispatch = useDispatch();
  const cartItemsLength = useSelector(selectCartItems).length;
  const { starShips, nextUrl } = useSelector(selectShipsState);

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

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
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
      keyExtractor={(item) => `${item.name}-${item.manufacturer}`}
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
