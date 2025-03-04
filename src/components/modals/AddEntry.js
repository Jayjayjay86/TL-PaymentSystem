import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ModalSelector from 'react-native-modal-selector';
import {updateAccount} from '../../database/Accounts';
import {capitalizeString} from '../../utils/misc';
import {defaultEntry} from '../../utils/misc';
import {
  optionContainerStyle,
  optionTextStyle,
  cancelStyle,
  cancelTextStyle,
} from '../../utils/misc';
import colorBarMap from '../../styles/colors';
import {ColorPickerModal} from '../ColorPickerModal';

const AddEntry = ({
  visible,
  onClose,
  accounts,
  currentAccount,
  setCurrentIndex,
  reload,
}) => {
  const overlayStyle = {};
  const pickerStyle = {};
  const modalStyle = {};

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [editableEntry, setEditableEntry] = useState({
    ...defaultEntry,
    id: currentAccount ? currentAccount.id : '',
    date: new Date(),
  });

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setEditableEntry(prevState => ({
        ...prevState,
        date: selectedDate,
      }));
    }
  };
  const handleAccountChange = account => {
    const accountIndex = accounts.findIndex(
      acc => acc.accountName === account.accountName,
    );
    setEditableEntry(prevState => ({
      ...prevState,
      id: account.id, // Update accountID in state
    }));
    setCurrentIndex(accountIndex);
  };
  const handleColorChange = color => {
    setEditableEntry(prevState => ({
      ...prevState,
      colorBar: color,
    }));
  };
  const onSubmit = async () => {
    const duplicate = currentAccount.entries.some(entry => {
      return (
        new Date(entry.date).toISOString().split('T')[0] ===
        editableEntry.date.toISOString().split('T')[0]
      );
    });
    if (duplicate) {
      ToastAndroid.show('Date Already Recorded', ToastAndroid.BOTTOM);
      return;
    }

    try {
      const confirmation = await updateAccount({
        ...currentAccount,
        entries: [...currentAccount.entries, editableEntry],
      });
      if (confirmation) {
        ToastAndroid.show('Entry Added', ToastAndroid.BOTTOM);

        setEditableEntry({
          ...editableEntry,
          date: new Date(),
          endOfCycle: false,
          isDoubleLesson: false,
          paidOnDate: false,
          notes: [],
        });
        onClose();
      } else {
        ToastAndroid.show('Error', ToastAndroid.BOTTOM);
        onClose();
      }
      await reload();
    } catch (error) {
      ToastAndroid.show('Error', ToastAndroid.BOTTOM);
      console.error(error);
      onClose();
    }
  };
  const colorPickerComponent = item => {
    return (
      <View style={{backgroundColor: item.key}}>
        <Text style={{color: 'black'}}>{item.label}</Text>
      </View>
    );
  };
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        {currentAccount && (
          <>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add Entry</Text>
                <View style={styles.modalHeaderAccent} />
              </View>

              <View style={styles.inputGroup}>
                <ModalSelector
                  data={accounts}
                  keyExtractor={item => item.accountName}
                  labelExtractor={item => capitalizeString(item.accountName)}
                  initValue={capitalizeString(currentAccount.accountName)}
                  onChange={option => {
                    handleAccountChange(option);
                  }}
                  listType={'SCROLLVIEW'}
                  animationType={'fade'}
                  overlayStyle={overlayStyle}
                  optionContainerStyle={optionContainerStyle}
                  pickerStyle={pickerStyle}
                  optionTextStyle={optionTextStyle}
                  cancelStyle={cancelStyle}
                  cancelTextStyle={cancelTextStyle}
                  style={modalStyle}
                  cancelText="Cancel"
                />
              </View>
              <View style={styles.dateGroup}>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                  <Text style={styles.entryDate}>
                    Date:{' '}
                    {`${new Date(editableEntry.date).toLocaleDateString(
                      'en-GB',
                    )}`}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.selectGroup}>
                <View style={styles.selectInput}>
                  <Text style={styles.buttonText}>End Of Cycle:</Text>
                  {editableEntry.endOfCycle ? (
                    <>
                      <TouchableOpacity
                        style={[
                          styles.modalButton,
                          {backgroundColor: '#B0E57C'},
                        ]}
                        onPress={() =>
                          setEditableEntry(prevState => ({
                            ...prevState,
                            endOfCycle: !editableEntry.endOfCycle,
                          }))
                        }>
                        <Text style={[styles.buttonText]}>Yes</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <TouchableOpacity
                        style={[
                          styles.modalButton,
                          {backgroundColor: '#ff9aa2'},
                        ]}
                        onPress={() =>
                          setEditableEntry(prevState => ({
                            ...prevState,
                            endOfCycle: !editableEntry.endOfCycle,
                          }))
                        }>
                        <Text style={[styles.buttonText]}>No</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>

                <View style={styles.selectInput}>
                  <Text style={styles.buttonText}>Double Lesson:</Text>
                  {editableEntry.isDoubleLesson ? (
                    <>
                      <TouchableOpacity
                        style={[
                          styles.modalButton,
                          {backgroundColor: '#B0E57C'},
                        ]}
                        onPress={() =>
                          setEditableEntry(prevState => ({
                            ...prevState,
                            isDoubleLesson: !editableEntry.isDoubleLesson,
                          }))
                        }>
                        <Text style={[styles.buttonText]}>Yes</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <TouchableOpacity
                        style={[
                          styles.modalButton,
                          {backgroundColor: '#ff9aa2'},
                        ]}
                        onPress={() =>
                          setEditableEntry(prevState => ({
                            ...prevState,
                            isDoubleLesson: !editableEntry.isDoubleLesson,
                          }))
                        }>
                        <Text style={[styles.buttonText]}>No</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
                <View style={styles.selectInput}>
                  <Text style={styles.buttonText}>Paid on Date:</Text>
                  {editableEntry.paidOnDate ? (
                    <>
                      <TouchableOpacity
                        style={[
                          styles.modalButton,
                          {backgroundColor: '#B0E57C'},
                        ]}
                        onPress={() =>
                          setEditableEntry(prevState => ({
                            ...prevState,
                            paidOnDate: !editableEntry.paidOnDate,
                          }))
                        }>
                        <Text
                          style={[
                            styles.buttonText,
                            {backgroundColor: '#B0E57C'},
                          ]}>
                          Yes
                        </Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <TouchableOpacity
                        style={[
                          styles.modalButton,
                          {backgroundColor: '#ff9aa2'},
                        ]}
                        onPress={() =>
                          setEditableEntry(prevState => ({
                            ...prevState,
                            paidOnDate: !editableEntry.paidOnDate,
                          }))
                        }>
                        <Text style={[styles.buttonText]}>No</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
              <View style={styles.colorBarInput}>
                <Text style={styles.colorBarButtonText}>Color:</Text>

                <ColorPickerModal
                  entry={editableEntry}
                  handleColorChange={handleColorChange}
                />
                <View
                  style={[
                    styles.colorPickerAccent,
                    {
                      backgroundColor: editableEntry.colorBar
                        ? editableEntry.colorBar.key === '#FFDAC1'
                          ? '#F5F5F5'
                          : editableEntry.colorBar.key
                        : '#F5F5F5',
                    },
                  ]}
                />
              </View>
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => onClose()}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={onSubmit}>
                  <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
              </View>

              {showDatePicker && (
                <DateTimePicker
                  value={editableEntry.date}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

export default AddEntry;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#F5F5F5',
    borderRadius: 28,
    padding: 24,
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 28,
    padding: 24,
    width: '90%',
  },
  modalHeader: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(209, 205, 205)',
    paddingBottom: 16,
    marginBottom: 24,
    position: 'relative',
  },
  modalHeaderAccent: {
    position: 'absolute',
    bottom: -2,
    left: 0,
    height: 3,
    width: 100,
    backgroundColor: '#ff9aa2',
    borderRadius: 2,
  },
  colorPickerAccent: {
    height: 38,
    width: 10,

    borderRadius: 2,
  },
  modalButton: {
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 24,
    margin: 5,
    width: 140,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#BAFFC9',
  },
  cancelButton: {
    backgroundColor: '#ff9aa2',
  },
  buttonGroup: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 2,
  },
  dateGroup: {justifyContent: 'space-evenly'},
  inputGroup: {},
  selectGroup: {marginVertical: 10},
  selectInput: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  colorBarInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#4A4A4A',

    lineHeight: 20, // Adjust as needed
  },
  colorBarButtonText: {
    fontSize: 13,
    flex: 1,
    fontWeight: 'bold',
    color: '#4A4A4A',

    lineHeight: 20,
  },
  textInput: {
    backgroundColor: '#FFDAC1',
    borderRadius: 5,
  },
  entryDate: {
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: '#FFDAC1',
    color: '#4A4A4A',
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 25, // Adjust as needed
    paddingVertical: 5,
    paddingHorizontal: 0,
    margin: 10,
    width: 275,
    borderRadius: 3,
    alignSelf: 'center',
    textAlign: 'center',
    borderWidth: 1,
  },
  modalStyle: {
    margin: 10,
  },
  colorBarMarker: {width: 2, height: 2},
});
