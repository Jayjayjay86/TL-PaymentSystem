import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  ToastAndroid,
} from 'react-native';

const DeleteEntry = ({visible, onClose, account, entry}) => {
  const onDelete = async () => {
    console.log('finally deleting');
    console.log(account);
    console.log(entry);
  };
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        {account && (
          <>
            <View style={styles.modalOverlay}>
              {entry && (
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Deleting Entry on:</Text>
                    <Text>
                      {' '}
                      {new Date(entry.date).toLocaleDateString('en-GB')}
                    </Text>
                    <View style={styles.modalHeaderAccent} />
                  </View>

                  <View style={styles.modalDetailContainer}>
                    <View style={styles.modalDetail}>
                      <Text style={styles.detailTitle}>Account Name: </Text>
                      <Text style={styles.detail}>{account.accountName}</Text>
                    </View>
                  </View>

                  <View style={styles.buttonGroup}>
                    <TouchableOpacity
                      style={[styles.modalButton, styles.cancelButton]}
                      onPress={() => onClose()}>
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.modalButton, styles.saveButton]}
                      onPress={() => onDelete()}>
                      <Text style={styles.buttonText}>Add Account</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </>
        )}
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DeleteEntry;

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
  modalDetailContainer: {paddingVertical: 10},
  modalDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailTitle: {
    fontSize: 16,

    color: '#4A4A4A',

    lineHeight: 25,
  },
  detail: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A4A4A',

    lineHeight: 25,
  },
});
