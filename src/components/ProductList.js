import React from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProductList({ products }) {
  if (!products || products.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="archive-outline" size={40} color="#94A3B8" />
        <Text style={styles.emptyTitle}>Aún no hay productos registrados</Text>
        <Text style={styles.emptySubtitle}>
          Complete el formulario arriba para agregar su primer producto.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <Ionicons name="list" size={20} color="#4F46E5" />
          <Text style={styles.title}>Productos Registrados</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{products.length}</Text>
        </View>
      </View>

      {products.map((item) => (
        <View key={item.id} style={styles.itemCard}>
          <View style={styles.itemIconContainer}>
            <Ionicons name="cube" size={20} color="#4F46E5" />
          </View>
          <View style={styles.itemContent}>
            <Text style={styles.itemName}>{item.nombre}</Text>
            <View style={styles.itemMetaRow}>
              <Text style={styles.itemCategory}>{item.categoria}</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.itemStock}>Stock: {item.stock}</Text>
            </View>
          </View>
          <View style={styles.itemPriceContainer}>
            <Text style={styles.itemPrice}>S/ {item.precio}</Text>
            <Text style={styles.itemTime}>{item.fecha}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  badge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4F46E5',
  },
  emptyContainer: {
    marginTop: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#475569',
    marginTop: 10,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 4,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  itemIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  itemMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 6,
  },
  itemCategory: {
    fontSize: 12,
    color: '#64748B',
  },
  dot: {
    color: '#CBD5E1',
    fontSize: 10,
  },
  itemStock: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  itemPriceContainer: {
    alignItems: 'flex-end',
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: '#059669',
  },
  itemTime: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
});
