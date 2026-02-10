// components/BottomNav.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import BottomSheetWithFAB from '../app/(tabs)/BottomSheetPopup';
import NavItem from './NavItem';

const BottomNav: React.FC = () => {
  return (
    <View style={styles.bottomNav}>
      <NavItem icon="home-outline" label="Dashboard" active href="/(tabs)"/>
      <NavItem icon="people-outline" label="Members" href="/(tabs)/member" />
      <BottomSheetWithFAB />
      <NavItem icon="card-outline" label="Transactions" href="/(tabs)/transactions"/>
      <NavItem icon="stats-chart-outline" label="Reports" href="/(tabs)/reports"/>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
});

export default BottomNav;
