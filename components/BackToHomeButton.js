import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export default function BackToHomeButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => navigation.navigate('Inicio')}
    >
      <View style={styles.backButtonContainer}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <Text style={styles.backButtonText}>Inicio</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 30,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 10,
  },
});
