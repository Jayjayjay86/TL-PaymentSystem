import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {createAccount, updateAccount} from '../../database/Accounts';

const EditAccount = ({reload, visible, onClose, account}) => {
  const [editableAccount, seteditableAccount] = useState({...account});
  const onSave = async () => {
    if (
      editableAccount.accountName === '' ||
      editableAccount.timeBookedInHours === '' ||
      editableAccount.complementaryHours === '' ||
      editableAccount.coursePrice === ''
    ) {
      return ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT);
    }

    try {
      confirmation = await updateAccount(editableAccount);
      if (confirmation) {
        ToastAndroid.show('Details Saved!', ToastAndroid.BOTTOM);
        reload();
        onClose();
      } else {
        ToastAndroid.show('Error! Something Went Wrong!', ToastAndroid.BOTTOM);
      }
    } catch (error) {
      ToastAndroid.show('Error! Something Went Wrong!', ToastAndroid.BOTTOM);
      console.error(error);
    }
  };
  useEffect(() => {
    seteditableAccount(account);
  }, [account]);
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
     
        {account && editableAccount && (
          <>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Edit Account</Text>
                  <View style={styles.modalHeaderAccent} />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Name:</Text>
                  <TextInput
                    style={styles.textInput}
                    value={editableAccount.accountName}
                    onChangeText={value =>
                      seteditableAccount(prevState => ({
                        ...prevState,
                        accountName: value,
                      }))
                    }
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Paid Hours:</Text>
                  <TextInput
                    style={styles.textInput}
                    value={editableAccount.timePaidInHours.toString()}
                    onChangeText={value =>
                      seteditableAccount(prevState => ({
                        ...prevState,
                        timePaidInHours: value,
                      }))
                    }
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Complementary:</Text>
                  <TextInput
                    style={styles.textInput}
                    value={editableAccount.complementaryHours.toString()}
                    onChangeText={value =>
                      seteditableAccount(prevState => ({
                        ...prevState,
                        complementaryHours: value,
                      }))
                    }
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Course Price:</Text>
                  <TextInput
                    style={styles.textInput}
                    value={editableAccount.coursePrice.toString()}
                    onChangeText={value =>
                      seteditableAccount(prevState => ({
                        ...prevState,
                        coursePrice: value,
                      }))
                    }
                    keyboardType="numeric"
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
                    onPress={() => onSave()}>
                    <Text style={styles.buttonText}>Save Changes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        )}
    
    </Modal>
  );
};

export default EditAccount;

const styles = StyleSheet.create({
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
    backgroundColor: '#B0E57C',
  },
  cancelButton: {
    backgroundColor: '#ff9aa2',
  },
  buttonGroup: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 2,
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
});
