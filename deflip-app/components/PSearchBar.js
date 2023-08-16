import React, {useState} from 'react';
import {TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';

import {colors, spacing, sizes, shadow} from '../constants/theme';
import Icon from '../constants/Icon';

const SearchBar = ({onPressFilter, onPressSearch}) => {
  const [search, setSearch] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.search} pointerEvents="none">
          <Icon icon="Search" />
        </View>
        <TextInput
          style={styles.field}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.filter}>
          <Icon icon="Filter" onPress={onPressFilter} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.l,
    paddingTop: spacing.l,
    paddingBottom: spacing.l / 1.5,
  },
  inner: {
    flexDirection: 'row',
  },
  search: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  field: {
    backgroundColor: 'lightgray',
    paddingLeft: spacing.xl + spacing.s,
    paddingRight: spacing.m,
    paddingVertical: spacing.m,
    borderRadius: sizes.radius,
    height: 54,
    flex: 1,
    ...shadow.light,
  },
  filter: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
});

export default SearchBar;