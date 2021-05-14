import React, { useState } from 'react';
import { Platform, StyleSheet, TextInput, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Modal, Portal, Provider } from 'react-native-paper';

import { fontSize, heightSize, widthSize } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ThemeText, useThemeColor } from '../Themed';

type ModalInputType = {
  visible: boolean;
  onSetModalVisible: () => void;
  handleChangeValue: (value: number) => void;
};

const ModalInput: React.FC<ModalInputType> = ({
  visible,
  onSetModalVisible,
  handleChangeValue,
}) => {
  const [value, setValue] = useState('');
  const useTheme = useThemeColor();

  return (
    <Modal
      visible={visible}
      contentContainerStyle={[styles.containerStyle, { backgroundColor: useTheme.grey }]}
      onDismiss={onSetModalVisible}
    >
      <TextInput
        allowFontScaling={false}
        style={styles.input}
        onChangeText={setValue}
        value={value}
        keyboardType='numeric'
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleChangeValue(parseFloat(value))}
          activeOpacity={0.6}
          style={[styles.button, { backgroundColor: useTheme.secondary }]}
        >
          <ThemeText style={{ color: '#fff' }}>Ajouter</ThemeText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSetModalVisible}
          activeOpacity={0.6}
          style={[styles.button, { backgroundColor: '#000' }]}
        >
          <ThemeText style={{ color: '#fff' }}>Annuler</ThemeText>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalInput;

const styles = StyleSheet.create({
  containerStyle: {
    padding: heightSize(10),
    borderRadius: 10,
    width: widthSize(250),
    height: heightSize(130),
    alignSelf: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#000',
    width: widthSize(200),
    height: heightSize(28),
    borderRadius: 10,
    paddingHorizontal: widthSize(10),
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: widthSize(200),
    justifyContent: 'space-between',
    marginTop: heightSize(15),
  },
  button: {
    width: widthSize(85),
    height: heightSize(38),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});
