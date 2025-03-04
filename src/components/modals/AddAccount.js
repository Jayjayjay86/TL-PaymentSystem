import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {createAccount} from '../../database/Accounts';

const AddAccount = ({reload, visible, onClose, accounts}) => {
  const [newAccount, setNewAccount] = useState({
    accountName: '',
    timePaidInHours: 0,
    complementaryHours: 0,
    coursePrice: 0,
    entries: [],
  });
  const onSubmit = async () => {
    if (
      newAccount.accountName === '' ||
      newAccount.timeBookedInHours === '' ||
      newAccount.complementaryHours === ''
    ) {
      return ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT);
    }
    if (accounts.some(acc => acc.accountName === newAccount.accountName)) {
      return ToastAndroid.show(
        'Account Name Already In Use.',
        ToastAndroid.SHORT,
      );
    }
    try {
      const confirmation = await createAccount(newAccount);

      if (confirmation) {
        ToastAndroid.show('Account Created', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Error!', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Error!', ToastAndroid.SHORT);
      console.error(error);
    }
    await reload();
    return onClose();
  };
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
     
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Account</Text>
              <View style={styles.modalHeaderAccent} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Name:</Text>
              <TextInput
                style={styles.textInput}
                value={newAccount.accountName}
                onChangeText={value =>
                  setNewAccount({...newAccount, accountName: value})
                }
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Paid Hours:</Text>
              <TextInput
                style={styles.textInput}
                value={newAccount.timePaidInHours}
                onChangeText={value =>
                  setNewAccount({...newAccount, timePaidInHours: value})
                }
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Complimentary:</Text>
              <TextInput
                style={styles.textInput}
                value={newAccount.complementaryHours}
                onChangeText={value =>
                  setNewAccount({...newAccount, complementaryHours: value})
                }
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Course Price:</Text>
              <TextInput
                style={styles.textInput}
                value={newAccount.coursePrice}
                onChangeText={value =>
                  setNewAccount({...newAccount, coursePrice: value})
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
                onPress={onSubmit}>
                <Text style={styles.buttonText}>Add Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
     
    </Modal>
  );
};

export default AddAccount;

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
