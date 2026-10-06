import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CATEGORIES = [
  { id: 'electrónica', label: 'Electrónica', icon: 'hardware-chip-outline' },
  { id: 'ropa', label: 'Ropa y Calzado', icon: 'shirt-outline' },
  { id: 'hogar', label: 'Hogar', icon: 'home-outline' },
  { id: 'alimentos', label: 'Alimentos', icon: 'fast-food-outline' },
  { id: 'deportes', label: 'Deportes', icon: 'basketball-outline' },
  { id: 'otros', label: 'Otros', icon: 'grid-outline' },
];

export default function ProductForm({ onSuccess, onRegisterProduct }) {
  // 1. Manejo de estados (useState)
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [stock, setStock] = useState('');

  // Estados de validación y touched
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [generalError, setGeneralError] = useState('');

  // Función de validación lógica
  const validate = (values = { nombre, precio, categoria, stock }) => {
    const newErrors = {};

    // 1. Validación de Nombre (obligatorio, min 3 caracteres)
    if (!values.nombre || values.nombre.trim().length === 0) {
      newErrors.nombre = 'El nombre del producto es obligatorio.';
    } else if (values.nombre.trim().length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres.';
    }

    // 2. Validación de Precio (obligatorio, número > 0)
    if (!values.precio || values.precio.trim() === '') {
      newErrors.precio = 'El precio es obligatorio.';
    } else {
      const numPrecio = parseFloat(values.precio.replace(',', '.'));
      if (isNaN(numPrecio)) {
        newErrors.precio = 'Ingrese un precio numérico válido (ej: 49.99).';
      } else if (numPrecio <= 0) {
        newErrors.precio = 'El precio debe ser mayor a 0.';
      }
    }

    // 3. Validación de Categoría (obligatorio)
    if (!values.categoria) {
      newErrors.categoria = 'Debe seleccionar una categoría.';
    }

    // 4. Validación de Stock (obligatorio, entero >= 0)
    if (!values.stock || values.stock.trim() === '') {
      newErrors.stock = 'El stock es obligatorio.';
    } else {
      const numStock = Number(values.stock);
      if (!Number.isInteger(numStock) || values.stock.includes('.')) {
        newErrors.stock = 'El stock debe ser un número entero (ej: 10).';
      } else if (numStock < 0) {
        newErrors.stock = 'El stock no puede ser negativo.';
      }
    }

    return newErrors;
  };

  // Manejadores onChangeText con validación en tiempo real si el campo fue tocado
  const handleNombreChange = (text) => {
    setNombre(text);
    if (touched.nombre) {
      const currentErrors = validate({ nombre: text, precio, categoria, stock });
      setErrors((prev) => ({ ...prev, nombre: currentErrors.nombre }));
    }
  };

  const handlePrecioChange = (text) => {
    setPrecio(text);
    if (touched.precio) {
      const currentErrors = validate({ nombre, precio: text, categoria, stock });
      setErrors((prev) => ({ ...prev, precio: currentErrors.precio }));
    }
  };

  const handleCategoriaSelect = (catId) => {
    setCategoria(catId);
    setTouched((prev) => ({ ...prev, categoria: true }));
    const currentErrors = validate({ nombre, precio, categoria: catId, stock });
    setErrors((prev) => ({ ...prev, categoria: currentErrors.categoria }));
  };

  const handleStockChange = (text) => {
    setStock(text);
    if (touched.stock) {
      const currentErrors = validate({ nombre, precio, categoria, stock: text });
      setErrors((prev) => ({ ...prev, stock: currentErrors.stock }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const currentErrors = validate();
    setErrors((prev) => ({ ...prev, [field]: currentErrors[field] }));
  };

  // Envío del formulario
  const handleSubmit = () => {
    Keyboard.dismiss();
    // Marcar todos como tocados
    setTouched({ nombre: true, precio: true, categoria: true, stock: true });

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setGeneralError('Por favor corrija los errores resaltados antes de enviar.');
      return;
    }

    setGeneralError('');

    // Crear objeto del producto procesado
    const newProduct = {
      id: Date.now().toString(),
      nombre: nombre.trim(),
      precio: parseFloat(precio.replace(',', '.')).toFixed(2),
      categoria: CATEGORIES.find((c) => c.id === categoria)?.label || categoria,
      stock: parseInt(stock, 10),
      fecha: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    onRegisterProduct(newProduct);
    onSuccess(newProduct);
  };

  // Limpiar campos
  const handleReset = () => {
    setNombre('');
    setPrecio('');
    setCategoria('');
    setStock('');
    setErrors({});
    setTouched({});
    setGeneralError('');
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="cube-outline" size={24} color="#4F46E5" />
          <Text style={styles.cardTitle}>Datos del Producto</Text>
        </View>

        {/* Mensaje de error general ante datos inválidos */}
        {generalError ? (
          <View style={styles.generalErrorBanner}>
            <Ionicons name="alert-circle" size={20} color="#DC2626" />
            <Text style={styles.generalErrorText}>{generalError}</Text>
          </View>
        ) : null}

        {/* CAMPO 1: NOMBRE DEL PRODUCTO */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Nombre del Producto <Text style={styles.required}>*</Text>
          </Text>
          <View
            style={[
              styles.inputWrapper,
              errors.nombre ? styles.inputError : touched.nombre && !errors.nombre ? styles.inputSuccess : null,
            ]}
          >
            <Ionicons name="pricetag-outline" size={20} color={errors.nombre ? '#EF4444' : '#64748B'} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Ej. Laptop Gaming Pro 15"
              placeholderTextColor="#94A3B8"
              value={nombre}
              onChangeText={handleNombreChange}
              onBlur={() => handleBlur('nombre')}
              autoCapitalize="words"
            />
          </View>
          {errors.nombre && (
            <View style={styles.errorRow}>
              <Ionicons name="warning-outline" size={14} color="#EF4444" />
              <Text style={styles.errorText}>{errors.nombre}</Text>
            </View>
          )}
        </View>

        {/* CAMPO 2: PRECIO */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Precio (S/) <Text style={styles.required}>*</Text>
          </Text>
          <View
            style={[
              styles.inputWrapper,
              errors.precio ? styles.inputError : touched.precio && !errors.precio ? styles.inputSuccess : null,
            ]}
          >
            <Ionicons name="cash-outline" size={20} color={errors.precio ? '#EF4444' : '#64748B'} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="0.00"
              placeholderTextColor="#94A3B8"
              value={precio}
              onChangeText={handlePrecioChange}
              onBlur={() => handleBlur('precio')}
              keyboardType="decimal-pad"
            />
          </View>
          {errors.precio && (
            <View style={styles.errorRow}>
              <Ionicons name="warning-outline" size={14} color="#EF4444" />
              <Text style={styles.errorText}>{errors.precio}</Text>
            </View>
          )}
        </View>

        {/* CAMPO 3: CATEGORÍA */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Categoría <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.categoriesGrid}>
            {CATEGORIES.map((cat) => {
              const isSelected = categoria === cat.id;
              return (
                <Pressable
                  key={cat.id}
                  style={({ pressed }) => [
                    styles.categoryChip,
                    isSelected && styles.categoryChipSelected,
                    pressed && styles.pressedState,
                  ]}
                  onPress={() => handleCategoriaSelect(cat.id)}
                >
                  <Ionicons
                    name={cat.icon}
                    size={18}
                    color={isSelected ? '#FFFFFF' : '#475569'}
                  />
                  <Text
                    style={[
                      styles.categoryChipText,
                      isSelected && styles.categoryChipTextSelected,
                    ]}
                  >
                    {cat.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          {errors.categoria && (
            <View style={styles.errorRow}>
              <Ionicons name="warning-outline" size={14} color="#EF4444" />
              <Text style={styles.errorText}>{errors.categoria}</Text>
            </View>
          )}
        </View>

        {/* CAMPO 4: STOCK */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Stock Disponible <Text style={styles.required}>*</Text>
          </Text>
          <View
            style={[
              styles.inputWrapper,
              errors.stock ? styles.inputError : touched.stock && !errors.stock ? styles.inputSuccess : null,
            ]}
          >
            <Ionicons name="layers-outline" size={20} color={errors.stock ? '#EF4444' : '#64748B'} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Ej. 25"
              placeholderTextColor="#94A3B8"
              value={stock}
              onChangeText={handleStockChange}
              onBlur={() => handleBlur('stock')}
              keyboardType="number-pad"
            />
          </View>
          {errors.stock && (
            <View style={styles.errorRow}>
              <Ionicons name="warning-outline" size={14} color="#EF4444" />
              <Text style={styles.errorText}>{errors.stock}</Text>
            </View>
          )}
        </View>

        {/* ACCIONES DEL FORMULARIO */}
        <View style={styles.actionsContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.submitButton,
              pressed && styles.pressedState,
            ]}
            onPress={handleSubmit}
          >
            <Ionicons name="checkmark-circle-outline" size={20} color="#FFFFFF" />
            <Text style={styles.submitButtonText}>Registrar Producto</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.resetButton,
              pressed && styles.pressedState,
            ]}
            onPress={handleReset}
          >
            <Ionicons name="refresh-outline" size={18} color="#64748B" />
            <Text style={styles.resetButtonText}>Limpiar Formulario</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  card: {
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  generalErrorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    borderColor: '#FCA5A5',
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  generalErrorText: {
    color: '#991B1B',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  fieldContainer: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  required: {
    color: '#EF4444',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  inputSuccess: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '500',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  categoryChipSelected: {
    backgroundColor: '#4F46E5',
    borderColor: '#4338CA',
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#475569',
  },
  categoryChipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  actionsContainer: {
    marginTop: 10,
    gap: 10,
  },
  submitButton: {
    backgroundColor: '#4F46E5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    gap: 6,
  },
  resetButtonText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '600',
  },
  pressedState: {
    opacity: 0.8,
    transform: [{ scale: 0.99 }],
  },
});
