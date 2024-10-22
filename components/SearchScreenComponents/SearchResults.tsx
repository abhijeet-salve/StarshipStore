import React from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import FullScreenMessage from './FullScreenMessage';
import StarShipListItem from '../ShipsList/StarShipListItem';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../redux/selectors/cartSelectors';

const SearchResult = ({
  loading,
  isError,
  searchText,
  filteredList,
}: ISearchResultsProps) => {
  const cartItemsLength = useSelector(selectCartItems).length;

  if (loading) return <ActivityIndicator size='small' color='black' />;

  if (isError) return <FullScreenMessage message='Something went wrong!' />;

  if (searchText.length > 0) {
    if (filteredList.length > 0)
      return (
        <FlatList
          data={filteredList}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }: { item: Starship }) => (
            <StarShipListItem ship={item} />
          )}
          style={{ marginBottom: cartItemsLength > 0 ? 60 : 0 }}
        />
      );
    else return <FullScreenMessage message='No Star ships found!' />;
  }

  return (
    <FullScreenMessage
      message={`Begin your search for the perfect Starship!`}
    />
  );
};

export default SearchResult;
