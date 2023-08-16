import React, {useState} from 'react';
import {TextInput, View, StyleSheet, Image} from 'react-native';

import {colors, spacing, sizes, shadow} from '../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

// import Icon from '../constants/Icon';

const SearchBar = ({bgColor,searchbgColor,cartColor}) => {
  
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.l,
    paddingTop: spacing.l/2,
    paddingBottom: spacing.l / 2,
    backgroundColor:bgColor,
    marginBottom:10
  },
  inner: {
    flexDirection: 'row',
  },
  search: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    flex:6,

  },
  field: {
    backgroundColor: 'white',
    paddingLeft: spacing.xl + spacing.s,
    paddingRight: spacing.m,
    paddingVertical: spacing.m,
    borderRadius: 25,
    height: 54,
    flex: 1,
    elevation: 20,
    shadowColor: '#52006A',
    backgroundColor:searchbgColor?searchbgColor:"white"

  },
  searchsection:{
    flex:11,
    paddingRight:10
  },
  cart:{
    borderRadius:50,
    backgroundColor:cartColor,
    zIndex: 1,
    flex:2,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  }
});

  const [search, setSearch] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
     <View  style={styles.searchsection}>
     <View style={styles.search} pointerEvents="none">
            <Icon name="search" size={30} color="black"/>
          </View>
          <TextInput
            style={styles.field}
            placeholder="Search"
            value={search}
            onChangeText={setSearch}
          />
     </View>
          
          <View style={styles.cart}>
            <Icon name="shopping-cart" size={30} color={bgColor}/>
          </View>
      </View>
    </View>
  );
};

export default SearchBar;