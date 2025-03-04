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

const LoadBackup = ({visible, onClose, handleLoadBackupAccounts}) => {
  const handlePressYes = async () => {
    await handleLoadBackupAccounts();
    onclose();
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
              <Text style={styles.modalTitle}>No Accounts Found</Text>

              <View style={styles.modalHeaderAccent} />
            </View>
            <Text style={styles.modalText}> Load Accounts From Backup?</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => onClose()}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={() => handlePressYes()}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
 
    </Modal>
  );
};

export default LoadBackup;

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
  modalText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A4A4A',

    lineHeight: 25,
  },
  modalTextHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A4A4A',

    lineHeight: 25,
  },
});
