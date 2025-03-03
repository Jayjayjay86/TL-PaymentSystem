import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  ToastAndroid,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {updateAccount} from '../../database/Accounts';

const EditEntry = ({
  currentAccount,
  reload,
  visible,
  onClose,
  entry,
  binImage,
  setDeleteEntryModalVisible,
}) => {
  console.log(entry);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [editableEntry, setEditableEntry] = useState({...entry});
  const handlePressDelete = () => {
    setDeleteEntryModalVisible(true);
  };
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setEditableEntry(prevState => ({
        ...prevState,
        date: selectedDate, // Update the date directly
      }));
    }
  };

  const onSave = async () => {
    try {
      const entryIndex = currentAccount.entries.findIndex(
        ent =>
          ent.id === entry.id &&
          new Date(ent.date).toDateString() ===
            new Date(entry.date).toDateString(),
      );
      if (entryIndex === -1) {
        ToastAndroid.show('Entry not found', ToastAndroid.SHORT);
        return;
      }

      const updatedEntries = [...currentAccount.entries];
      updatedEntries[entryIndex] = editableEntry;

      const confirmation = await updateAccount({
        ...currentAccount,
        entries: updatedEntries,
      });
      if (confirmation) {
        ToastAndroid.show('Entry Updated', ToastAndroid.BOTTOM);

        await reload();
        onClose();
        setEditableEntry({
          ...editableEntry,
          endOfCycle: false,
          isDoubleLesson: false,
          paidOnDate: false,
        });
      } else {
        ToastAndroid.show('Error', ToastAndroid.BOTTOM);
      }
    } catch (error) {
      ToastAndroid.show('Error', ToastAndroid.BOTTOM);
      console.error(error);
    }
  };
  useEffect(() => {
    setEditableEntry(entry);
  }, [entry]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          {entry && (
            <>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Edit entry</Text>
                  <TouchableOpacity onPress={() => handlePressDelete()}>
                    <Image style={styles.editImage} source={binImage}></Image>
                  </TouchableOpacity>

                  <View style={styles.modalHeaderAccent} />
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
                </View>

                <View style={styles.selectGroup}>
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

                <View style={styles.buttonGroup}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => onClose()}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.saveButton]}
                    onPress={() => onSave()}>
                    <Text style={styles.buttonText}>Save Changes</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {showDatePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default EditEntry;

const styles = StyleSheet.create({
  editImage: {width: 24, height: 24, margin: 10},
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
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
    backgroundColor: 'white',
    borderRadius: 28,
    padding: 24,
    width: '90%',
  },
  modalHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 16,
    marginBottom: 24,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    justifyContent: 'space-evenly',
  },
  buttonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#4A4A4A',

    lineHeight: 20, // Adjust as needed
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
});
