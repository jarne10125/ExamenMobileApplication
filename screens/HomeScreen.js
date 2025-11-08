import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import ProductItem from '../components/ProductItem';
import { SORTS, sortProducts } from '../utils/sort';

const API_URL = 'https://fakestoreapi.com/products';

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState(SORTS.TITLE_ASC.key);
  const [status, setStatus] = useState('loading');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    console.log('[HomeScreen] mount');
    let cancelled = false;
    fetch(API_URL)
      .then(res => res.json())
      .then(json => { if (!cancelled) { setData(json); setStatus('success'); }})
      .catch(err => { if (!cancelled) { setErrorMsg(err.message); setStatus('error'); }});
    return () => { cancelled = true; console.log('[HomeScreen] unmount (cleanup ok)'); };
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    const f = data.filter(p => p.title.toLowerCase().includes(q));
    return sortProducts(f, sortKey);
  }, [data, query, sortKey]);

  const renderItem = ({ item }) => (
    <ProductItem item={item} onPress={() => navigation.navigate('Detail', { id: item.id })} />
  );

  if (status === 'loading') return <Center><ActivityIndicator /><Text>Loading...</Text></Center>;
  if (status === 'error') return <Center><Text>Error: {errorMsg}</Text></Center>;

  return (
    <View style={styles.container}>
      <Controls query={query} setQuery={setQuery} sortKey={sortKey} setSortKey={setSortKey} />
      {filtered.length === 0 ? (
        <Center><Text>No results</Text></Center>
      ) : (
        <FlashList
          data={filtered}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          estimatedItemSize={96}
        />
      )}
    </View>
  );
}

function Controls({ query, setQuery, sortKey, setSortKey }) {
  return (
    <View style={styles.controls}>
      <TextInput style={styles.input} value={query} onChangeText={setQuery} placeholder="Search..." />
      <View style={styles.sortRow}>
        {Object.values(SORTS).map(s => (
          <TouchableOpacity key={s.key} onPress={() => setSortKey(s.key)}
            style={[styles.sortBtn, sortKey === s.key && styles.sortBtnActive]}>
            <Text style={sortKey === s.key ? styles.sortLabelActive : styles.sortLabel}>{s.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.sortIndicator}>
        Current sort: {Object.values(SORTS).find(s => s.key === sortKey).label}
      </Text>
    </View>
  );
}

function Center({ children }) {
  return <View style={styles.center}>{children}</View>;
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#fff' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  controls: { gap: 8, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 12, height: 40 },
  sortRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  sortBtn: { borderWidth: 1, borderColor: '#ddd', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 6 },
  sortBtnActive: { backgroundColor: '#000', borderColor: '#000' },
  sortLabel: { color: '#000' },
  sortLabelActive: { color: '#fff' },
  sortIndicator: { fontSize: 12, color: '#555' },
});
