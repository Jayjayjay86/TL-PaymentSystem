import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import {
  optionContainerStyle,
  optionTextStyle,
  cancelStyle,
  cancelTextStyle,
} from '../utils/misc';

const colorBarMap = [
  {key: '#FFDAC1', label: 'None'},
  {key: '#FADADD', label: 'Pastel Pink'},
  {key: '#B19CD9', label: 'Pastel Purple'},
  {key: '#77DD77', label: 'Pastel Green'},
  {key: '#FFB347', label: 'Pastel Orange'},
  {key: '#AEC6CF', label: 'Pastel Blue'},
  {key: '#FFD1DC', label: 'Pastel Pinkish'},
  {key: '#CB99C9', label: 'Pastel Violet'},
  {key: '#FDFD96', label: 'Pastel Yellow'},
  {key: '#C3B1E1', label: 'Pastel Lavender'},
  {key: '#FF6961', label: 'Pastel Red'},
  {key: '#B2F2BB', label: 'Pastel Mint'},
  {key: '#F49AC2', label: 'Pastel Magenta'},
  {key: '#C6E2E9', label: 'Pastel Sky Blue'},
  {key: '#F4C2C2', label: 'Pastel Rose'},
  {key: '#A2DDF0', label: 'Pastel Cyan'},
  {key: '#F0E68C', label: 'Pastel Khaki'},
  {key: '#D4A5A5', label: 'Pastel Mauve'},
  {key: '#B5EAD7', label: 'Pastel Aqua'},
  {key: '#FF9AA2', label: 'Pastel Salmon'},
  {key: '#C8A2C8', label: 'Pastel Lilac'},
  {key: '#FFCC99', label: 'Pastel Peach'},
  {key: '#D1E8E2', label: 'Pastel Turquoise'},
  {key: '#F0C987', label: 'Pastel Gold'},
  {key: '#E0BBE4', label: 'Pastel Orchid'},
  {key: '#B0E0E6', label: 'Pastel Sea Blue'},
];

const colorPickerComponent = item => {
  return (
    <View style={{backgroundColor: item.key}}>
      <Text style={[styles.componantTextStyle, {color: 'black'}]}>
        {item.label}
      </Text>
    </View>
  );
};
export const ColorPickerModal = ({entry, handleColorChange}) => {
  const newStyle = {
    ...optionTextStyle,
    backgroundColor: entry.colorBar ? entry.colorBar.key : '#FFDAC1',
  };

  return (
    <ModalSelector
      data={colorBarMap}
      labelExtractor={item => item.label}
      keyExtractor={item => item.key}
      initValue={entry.colorBar ? entry.colorBar.label : '#FFDAC1'}
      onChange={item => handleColorChange(item)}
      listType={'SCROLLVIEW'}
      animationType={'fade'}
      optionContainerStyle={optionContainerStyle}
      optionTextStyle={newStyle}
      cancelStyle={cancelStyle}
      cancelTextStyle={cancelTextStyle}
      style={[styles.modalStyle, {width: 148}]}
      cancelText="Cancel"
      componentExtractor={item => colorPickerComponent(item)}
    />
  );
};
const styles = StyleSheet.create({
  modalStyle: {
    marginVertical: 10,
    marginHorizontal: 2,
  },
  componantTextStyle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4A4A4A',
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
  },
});
