import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import {capitalizeString} from '../../utils/misc';

const SearchByName = ({visible, onClose, accounts, setCurrentIndex}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAccounts, setFilteredAccounts] = useState([]);

  const handlePressSearchTerm = account => {
    const accountIndex = accounts.findIndex(
      acc => acc.accountName === account.accountName,
    );
    setCurrentIndex(accountIndex);
    onClose();
  };

  const handleSearch = text => {
    setSearchTerm(text);
    if (text) {
      const filtered = accounts.filter(account =>
        account.accountName.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredAccounts(filtered);
      console.log(filteredAccounts);
    } else {
    }
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
              <Text style={styles.modalTitle}>Search Accounts</Text>
              <View style={styles.modalHeaderAccent} />
            </View>

            <TextInput
              style={[styles.textInput, {marginBottom: 16}]}
              placeholder="Type to search..."
              value={searchTerm}
              onChangeText={text => handleSearch(text)}
            />

            <View style={styles.modalDetailContainer}>
              <FlatList
                data={filteredAccounts}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.modalDetail}
                    onPress={() => {
                      handlePressSearchTerm(item);
                    }}>
                    <Text style={styles.detailTitle}>
                      {capitalizeString(item.accountName)}
                    </Text>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <Text style={styles.detailTitle}>
                    {searchTerm
                      ? 'No results found'
                      : 'Start typing to search...'}
                  </Text>
                }
              />
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => onClose()}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
     
    </Modal>
  );
};

export default SearchByName;

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
    lineHeight: 20,
  },
  textInput: {
    backgroundColor: '#FFDAC1',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  modalDetailContainer: {
    paddingVertical: 10,
  },
  modalDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
