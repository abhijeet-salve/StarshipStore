import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useLazyGetStarShipsQuery } from '../../redux/api/starShipsApi';
import { selectCartItems } from '../../redux/selectors/cartSelectors';
import { selectShipsState } from '../../redux/selectors/starShipsSelectors';
import { GET_STAR_SHIPS_URL } from '../../utils/constants';
import StarShipListItem from './StarShipListItem';

const StarShipList = () => {
  const cartItemsLength = useSelector(selectCartItems).length;
  const { starShips, nextUrl } = useSelector(selectShipsState);

  const [trigger, { error, isLoading, isFetching }] =
    useLazyGetStarShipsQuery();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!starShips.length && nextUrl === null) {
      trigger(GET_STAR_SHIPS_URL);
    }
  }, []);

  const handleLoadMore = () => {
    if (nextUrl && !isFetching) {
      trigger(nextUrl);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await trigger(GET_STAR_SHIPS_URL);
    setRefreshing(false);
  };

  const renderItem = ({ item }: { item: Starship }) => (
    <StarShipListItem ship={item} key={item.name} />
  );

  const renderFooter = () => {
    if (isFetching) return <ActivityIndicator size='small' color='black' />;
    return null;
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' />
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

  return (
    <FlatList
      data={starShips}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
      numColumns={2}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListFooterComponent={renderFooter}
      style={{ marginBottom: cartItemsLength > 0 ? 60 : 0 }}
    />
  );
};

export default StarShipList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
