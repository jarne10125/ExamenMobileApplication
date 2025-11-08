import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProductItem({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.thumb} />
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>€ {item.price.toFixed(2)}</Text>
        <Text numberOfLines={2} style={styles.desc}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', gap: 12, padding: 12, borderWidth: 1, borderColor: '#eee', borderRadius: 12, marginBottom: 8 },
  thumb: { width: 64, height: 64, borderRadius: 8, resizeMode: 'contain', backgroundColor: '#fafafa' },
  info: { flex: 1 },
  title: { fontWeight: '600' },
  price: { marginTop: 4 },
  desc: { fontSize: 12, color: '#666', marginTop: 4 }
});
