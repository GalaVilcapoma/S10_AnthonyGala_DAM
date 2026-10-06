import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductForm from './src/components/ProductForm';
import SuccessModal from './src/components/SuccessModal';
import ProductList from './src/components/ProductList';

export default function App() {
  const [products, setProducts] = useState([]);
  const [lastSubmittedProduct, setLastSubmittedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('formulario'); // 'formulario' | 'info'

  const handleRegisterProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleSuccess = (product) => {
    setLastSubmittedProduct(product);
    setShowModal(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1E1B4B" />

      {/* HEADER PRINCIPAL */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.badgeContainer}>
            <Ionicons name="phone-portrait-outline" size={14} color="#818CF8" />
            <Text style={styles.badgeText}>DAM • S10 | AP5</Text>
          </View>
          <View style={styles.statusPill}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>React Native + Expo</Text>
          </View>
        </View>

        <Text style={styles.headerTitle}>Formularios y Validaciones</Text>
        <Text style={styles.headerSubtitle}>
          Opción 1: Registro de Producto con validaciones en tiempo real
        </Text>

        {/* NAVEGACIÓN TIPO PESTAÑA */}
        <View style={styles.tabContainer}>
          <Pressable
            style={[
              styles.tabButton,
              activeTab === 'formulario' && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab('formulario')}
          >
            <Ionicons
              name="create-outline"
              size={16}
              color={activeTab === 'formulario' ? '#FFFFFF' : '#94A3B8'}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === 'formulario' && styles.tabTextActive,
              ]}
            >
              Formulario
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.tabButton,
              activeTab === 'info' && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab('info')}
          >
            <Ionicons
              name="information-circle-outline"
              size={16}
              color={activeTab === 'info' ? '#FFFFFF' : '#94A3B8'}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === 'info' && styles.tabTextActive,
              ]}
            >
              Requisitos
            </Text>
          </Pressable>
        </View>
      </View>

      {/* CONTENIDO PRINCIPAL */}
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {activeTab === 'formulario' ? (
          <View style={styles.bodySection}>
            {/* COMPONENTE DE FORMULARIO */}
            <ProductForm
              onSuccess={handleSuccess}
              onRegisterProduct={handleRegisterProduct}
            />

            {/* LISTADO DE PRODUCTOS EN MEMORIA */}
            <ProductList products={products} />
          </View>
        ) : (
          <View style={styles.infoCard}>
            <View style={styles.infoCardHeader}>
              <Ionicons name="document-text-outline" size={22} color="#4F46E5" />
              <Text style={styles.infoTitle}>Criterios de Evaluación AP5</Text>
            </View>

            <View style={styles.infoItem}>
              <Ionicons name="checkmark-circle" size={18} color="#10B981" />
              <Text style={styles.infoItemText}>
                <Text style={styles.boldText}>Formulario 1 (Registro de Producto):</Text> Nombre, Precio, Categoría y Stock.
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Ionicons name="checkmark-circle" size={18} color="#10B981" />
              <Text style={styles.infoItemText}>
                <Text style={styles.boldText}>Manejo de Estados:</Text> Implementado usando React hooks (<Text style={styles.codeText}>useState</Text>).
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Ionicons name="checkmark-circle" size={18} color="#10B981" />
              <Text style={styles.infoItemText}>
                <Text style={styles.boldText}>Validaciones:</Text> Nombre obligatorio (&gt;=3 char), Precio &gt; 0, Stock entero &gt;= 0 y categoría seleccionada.
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Ionicons name="checkmark-circle" size={18} color="#10B981" />
              <Text style={styles.infoItemText}>
                <Text style={styles.boldText}>Feedback al Usuario:</Text> Mensajes de error por campo y Modal con resumen de éxito.
              </Text>
            </View>

            <View style={styles.infoFooter}>
              <Text style={styles.infoFooterText}>
                Desarrollo de Aplicaciones Móviles • S10
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* MODAL DE ÉXITO DE REGISTRO */}
      <SuccessModal
        visible={showModal}
        product={lastSubmittedProduct}
        onClose={() => setShowModal(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#1E1B4B',
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 6,
  },
  badgeText: {
    color: '#A5B4FC',
    fontSize: 12,
    fontWeight: '700',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  statusText: {
    color: '#E2E8F0',
    fontSize: 11,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#C7D2FE',
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    borderRadius: 14,
    padding: 4,
    gap: 4,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  tabButtonActive: {
    backgroundColor: '#4F46E5',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94A3B8',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  bodySection: {
    paddingBottom: 20,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  infoCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
    gap: 10,
  },
  infoItemText: {
    flex: 1,
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
  },
  boldText: {
    fontWeight: '700',
    color: '#0F172A',
  },
  codeText: {
    fontFamily: 'monospace',
    backgroundColor: '#F1F5F9',
    color: '#4F46E5',
    fontWeight: '700',
  },
  infoFooter: {
    marginTop: 10,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    alignItems: 'center',
  },
  infoFooterText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
});
