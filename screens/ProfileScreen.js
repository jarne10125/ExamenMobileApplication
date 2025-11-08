import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  useEffect(() => {
    console.log('[ProfileScreen] mount');
    return () => console.log('[ProfileScreen] unmount');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text>Name: Jarne Popelier</Text>
      <Text>Opleiding:  Graduaat Programmeren</Text>
      <Text>Contact: jarne@hotmail.com</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontWeight: '700', fontSize: 18, marginBottom: 8 }
});
