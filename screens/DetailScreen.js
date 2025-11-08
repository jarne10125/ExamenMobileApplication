import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';

export default function DetailScreen({ route }) {
  const { id } = route.params;
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState('loading');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    console.log('[DetailScreen] mount');
    let cancelled = false;
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(json => { if (!cancelled) { setItem(json); setStatus('success'); }})
      .catch(err => { if (!cancelled) { setErrorMsg(err.message); setStatus('error'); }});
    return () => { cancelled = true; console.log('[DetailScreen] unmount'); };
  }, [id]);

  if (status === 'loading') return <Center><ActivityIndicator /><Text>Loading...</Text></Center>;
  if (status === 'error') return <Center><Text>Error: {errorMsg}</Text></Center>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: item.image }} style={styles.hero} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.cat}>Category: {item.category}</Text>
      <Text style={styles.price}>€ {item.price.toFixed(2)}</Text>
      <Text style={styles.desc}>{item.description}</Text>
      {item.rating && <Text>Rating: {item.rating.rate} ({item.rating.count})</Text>}
    </ScrollView>
  );
}

function Center({ children }) { return <View style={styles.center}>{children}</View>; }

const styles = StyleSheet.create({
  container: { padding: 16, gap: 8 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  hero: { width: '100%', height: 240, resizeMode: 'contain', backgroundColor: '#fafafa', borderRadius: 12 },
  title: { fontWeight: '700', fontSize: 18 },
  cat: { color: '#666' },
  price: { fontWeight: '600' },
  desc: { lineHeight: 20 },
});
