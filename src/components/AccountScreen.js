import React, {useEffect, useRef, useState} from 'react';
import {
  PanResponder,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import EditEntry from '../../src/components/modals/AddEntry';
import AddEntry from '../../src/components/modals/AddEntry';
import EditAccount from '../../src/components/modals/EditAccount';
import AddAccount from '../../src/components/modals/AddAccount';
import DeleteAccount from '../../src/components/modals/DeleteAccount';

import {
  createAccount,
  destroyAccounts,
  getAllAccounts,
} from '../../src/database/Accounts';

import {currentStudentNames} from '../../src/database/data';
import DeleteEntry from '../../src/components/modals/DeleteEntry';
import SearchByName from '../../src/components/modals/SearchByName';
import {capitalizeString} from '../../src/utils/misc';
import DeleteAllData from '../../src/components/modals/DeleteAllData';
import LoadBackup from '../../src/components/modals/LoadBackup';

const heartImage = require('../../src/assets/images/heart.png');
const paidImage = require('../../src/assets/images/paid.png');
const notesImage = require('../../src/assets/images/notes.png');
const cycleImage = require('../../src/assets/images/cycle.png');
const editImage = require('../../src/assets/images/edit.png');
const binImage = require('../../src/assets/images/bin.png');
const noStudentImage = require('../../src/assets/images/noStudents.png');
const noAccountsImage = require('../../src/assets/images/noAccounts.png');
const searchImage = require('../../src/assets/images/search.png');

const defaultAccount = {
  id: '',
  accountName: '',
  complementaryHours: 0,
  timePaidInHours: 0,
  coursePrice: 0,
  entries: [],
};
const AccountScreen = () => {
  const [accounts, setAccounts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAccount, setCurrentAccount] = useState(accounts[currentIndex]);
  const [selectedEntry, setSelectedEntry] = useState({});
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [editEntryModalVisible, setEditEntryModalVisible] = useState(false);
  const [addEntryModalVisible, setAddEntryModalVisible] = useState(false);
  const [addAccountModalVisible, setAddAccountModalVisible] = useState(false);
  const [editAccountModalVisible, setEditAccountModalVisible] = useState(false);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] =
    useState(false);
  const [deleteEntryModalVisible, setDeleteEntryModalVisible] = useState(false);
  const [deleteAllDataModalVisible, setDeleteAllDataModalVisible] =
    useState(false);
  const [backupModalVisible, setBackupModalVisible] = useState(false);
  const [isLongPress, setIsLongPress] = useState(false);
  const pressTimer = useRef(null);
  const handlePressIn = () => {
    pressTimer.current = setTimeout(() => {
      setIsLongPress(true);
      setDeleteAllDataModalVisible(true);
    }, 5000);
  };

  const handlePressOut = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
    setIsLongPress(false);
  };

  const headerPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderRelease: (evt, gestureState) => {
      if (Math.abs(gestureState.dx) > 50) {
        const nextIndex =
          gestureState.dx > 0
            ? (currentIndex - 1 + accounts.length) % accounts.length
            : (currentIndex + 1) % accounts.length;
        setCurrentIndex(nextIndex);
      }
    },
  });

  const handleEntryPress = entry => {
    setSelectedEntry(entry);
    setEditEntryModalVisible(true);
  };
  const handleAccountNamePress = () => {
    setSearchModalVisible(true);
  };
  const handleEditAccount = () => {
    setEditAccountModalVisible(true);
  };
  const handleDeleteAccount = () => {
    setDeleteAccountModalVisible(true);
  };
  const handleLoadBackups = () => {
    setBackupModalVisible(true);
  };
  const closeLoadBackups = () => {
    setBackupModalVisible(false);
  };
  const closeEditEntryModal = () => {
    setEditEntryModalVisible(false);
  };
  const closeDeleteAllDataModal = () => {
    setDeleteAllDataModalVisible(false);
  };
  const closeAddEntryModal = () => {
    setAddEntryModalVisible(false);
  };

  const closeAddAccountModal = () => {
    setAddAccountModalVisible(false);
  };

  const closeEditAccountModal = () => {
    setEditAccountModalVisible(false);
  };
  const closeDeleteAccountModal = () => {
    setDeleteAccountModalVisible(false);
  };
  const closeDeleteEntryModal = () => {
    setDeleteEntryModalVisible(false);
  };
  const closeSearchModal = () => {
    setSearchModalVisible(false);
  };
  const loadStudentsFromData = async () => {
    for (const studentName of currentStudentNames) {
      await createAccount({
        accountName: studentName,
        complementaryHours: 0,
        timePaidInHours: 0,
        coursePrice: 0,
        entries: [],
      });
    }
  };
  const reload = async () => {
    const updatedAccounts = await getAllAccounts();

    if (updatedAccounts.length === 0) {
      setAccounts([]);
      setCurrentAccount(defaultAccount);
      setCurrentIndex(0);
    } else {
      setAccounts(updatedAccounts);
      setCurrentAccount(updatedAccounts[currentIndex]);
      setCurrentIndex(currentIndex);
    }
  };
  const handleLoadBackupAccounts = async () => {
    await loadStudentsFromData();
    const updatedAccounts = await getAllAccounts();
    setAccounts(updatedAccounts);
    setCurrentAccount(updatedAccounts[currentIndex]);
    await reload();
    closeLoadBackups();
  };
  useEffect(() => {
    if (accounts.length > 0) {
      setCurrentAccount(accounts[currentIndex]);
    } else {
      setCurrentAccount(defaultAccount);
    }
  }, [accounts, currentIndex]);

  useEffect(() => {
    const firstLoad = async () => {
      const accountsArray = await getAllAccounts();

      setAccounts(accountsArray);
      if (accountsArray.length === 0) {
        handleLoadBackups();
      }
    };
    firstLoad();
  }, []);
  return (
    <View style={styles.container}>
      {accounts.length > 0 && currentAccount ? (
        <>
          <View style={styles.swipeContainer}>
            <View
              {...headerPanResponder.panHandlers}
              style={styles.swipeContainerHeader}>
              <View style={styles.topHeader}>
                <Text style={styles.accountName}>
                  {capitalizeString(currentAccount.accountName)}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    handleAccountNamePress();
                  }}>
                  <Image style={styles.searchImage} source={searchImage} />
                </TouchableOpacity>
              </View>

              <View style={styles.hoursContainer}>
                <Text style={styles.hoursTitleText}>
                  Paid Hours: {currentAccount.timePaidInHours}
                </Text>
                <Text style={styles.hoursTitleText}>
                  Complimentary: {currentAccount.complementaryHours}
                </Text>
              </View>
              <View style={styles.priceContainer}>
                <TouchableOpacity
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  activeOpacity={1}>
                  <Text style={styles.priceTitle}>
                    Course Price:{' '}
                    <Text style={styles.price}>
                      {currentAccount.coursePrice}฿
                    </Text>
                  </Text>
                </TouchableOpacity>

                <View style={styles.imagesContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      handleEditAccount();
                    }}>
                    <Image style={styles.editImage} source={editImage} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      handleDeleteAccount();
                    }}>
                    <Image style={styles.editImage} source={binImage} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {currentAccount && currentAccount.entries.length > 0 ? (
              <>
                <FlatList
                  data={currentAccount.entries}
                  renderItem={({item, index}) => (
                    <View
                      key={`${index}/${item.id}`}
                      style={styles.entryDetails}>
                      <TouchableOpacity onPress={() => handleEntryPress(item)}>
                        <Text style={styles.entryDate}>
                          {`${new Date(item.date).getDate()}/${
                            new Date(item.date).getMonth() + 1
                          }`}
                        </Text>
                      </TouchableOpacity>
                      <View style={styles.imageContainer}>
                        {item.endOfCycle && (
                          <View style={styles.imageBox}>
                            <Image style={styles.image} source={cycleImage} />
                          </View>
                        )}
                        {item.isDoubleLesson && (
                          <View style={styles.imageBox}>
                            <Image style={styles.image} source={heartImage} />
                          </View>
                        )}
                        {item.paidOnDate && (
                          <View style={styles.imageBox}>
                            <Image style={styles.image} source={paidImage} />
                          </View>
                        )}
                        {item.notes && item.notes.length > 0 && (
                          <View style={styles.imageBox}>
                            <Image style={styles.image} source={notesImage} />
                          </View>
                        )}
                      </View>
                    </View>
                  )}
                  style={styles.flatlist}
                />
              </>
            ) : (
              <View style={styles.noObjectContainer}>
                <Image
                  style={styles.noStudents}
                  source={noStudentImage}></Image>
                <Text style={styles.noEntries}>No Entries Found</Text>
              </View>
            )}
          </View>
        </>
      ) : (
        <View style={styles.noAccountContainer}>
          <Image style={styles.noAccounts} source={noAccountsImage}></Image>
          <Text style={styles.noEntries}>No Accounts Found</Text>
        </View>
      )}

      <View style={styles.fabContainer}>
        {/* <TouchableOpacity
              style={[styles.fab, {backgroundColor: '#ff9aa2'}]}
              onPress={() => handleLoadBackups()}>
              <Text style={styles.fabText}>🎉 Load Backups</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.fab, {backgroundColor: '#ff9aa2'}]}
              onPress={() => setAddEntryModalVisible(true)}>
              <Text style={styles.fabText}>🎉 Add entry</Text>
            </TouchableOpacity> */}

        <>
          <TouchableOpacity
            style={[styles.fab, {backgroundColor: '#ff9aa2'}]}
            onPress={() => setAddEntryModalVisible(true)}>
            <Text style={styles.fabText}>🎉 Add entry</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.fab, {backgroundColor: '#b0e57c'}]}
            onPress={() => setAddAccountModalVisible(true)}>
            <Text style={styles.fabText}>✨ New Account</Text>
          </TouchableOpacity>
        </>
      </View>
      {accounts.length === 0 && (
        <>
          <TouchableOpacity
            style={[
              styles.fab,
              {
                alignSelf: 'center',
                marginTop: 5,
                backgroundColor: '#FFB3BA',
                width: '90%',
              },
            ]}
            onPress={() => handleLoadBackups()}>
            <Text style={styles.fabText}>🎉 Load Accounts From Backup</Text>
          </TouchableOpacity>
        </>
      )}
      <SearchByName
        reload={reload}
        visible={searchModalVisible}
        onClose={closeSearchModal}
        accounts={accounts}
        setCurrentIndex={setCurrentIndex}
      />
      <EditEntry
        reload={reload}
        visible={editEntryModalVisible}
        onClose={closeEditEntryModal}
        entry={selectedEntry}
        currentAccount={currentAccount}
        binImage={binImage}
        setDeleteEntryModalVisible={setDeleteEntryModalVisible}
      />
      <AddEntry
        reload={reload}
        setCurrentIndex={setCurrentIndex}
        visible={addEntryModalVisible}
        onClose={closeAddEntryModal}
        entry={defaultAccount}
        accounts={accounts}
        currentAccount={currentAccount}
      />
      <AddAccount
        reload={reload}
        visible={addAccountModalVisible}
        onClose={closeAddAccountModal}
        accounts={accounts}
      />
      <EditAccount
        reload={reload}
        visible={editAccountModalVisible}
        onClose={closeEditAccountModal}
        accounts={accounts}
        account={currentAccount}
      />
      <DeleteAccount
        reload={reload}
        visible={deleteAccountModalVisible}
        onClose={closeDeleteAccountModal}
        account={currentAccount}
      />
      <DeleteEntry
        reload={reload}
        visible={deleteEntryModalVisible}
        onClose={closeDeleteEntryModal}
        account={currentAccount}
        entry={selectedEntry}
      />
      <DeleteAllData
        visible={deleteAllDataModalVisible}
        onClose={closeDeleteAllDataModal}
        reload={reload}
      />
      <LoadBackup
        visible={backupModalVisible}
        onClose={closeLoadBackups}
        handleLoadBackupAccounts={handleLoadBackupAccounts}></LoadBackup>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'center',
    padding: 10,
    backgroundColor: '#FFDAC1',
    height: '100%',
  },
  swipeContainer: {
    height: '95%',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  swipeContainerHeader: {
    padding: 10,
    borderRadius: 20,
    marginBottom: 15,
    backgroundColor: 'rgba(255, 228, 225, 0.8)',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  noObjectContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  noAccountContainer: {
    flex: 0.9,
    alignItems: 'center',

    marginTop: 60,
  },
  noStudents: {width: 180, height: 180, borderRadius: 50},
  noEntries: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A4A4A',
    fontFamily: 'Poppins-Bold',
    lineHeight: 40, // Adjust as needed
  },
  noAccounts: {width: 220, height: 220, borderRadius: 50},
  accountName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A4A4A',
    fontFamily: 'Poppins-Bold',
    lineHeight: 40, // Adjust as needed
  },
  hoursContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginVertical: 5,
  },
  priceContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  priceTitle: {
    fontSize: 18,

    color: '#4A4A4A',
    fontFamily: 'Poppins-Semi-Bold',
    lineHeight: 25, // Adjust as needed
  },
  price: {
    fontSize: 18,

    color: '#4A4A4A',
    fontFamily: 'Poppins-Bold',
    lineHeight: 22, // Adjust as needed
  },
  imageContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagesContainer: {flexDirection: 'row'},
  imageBox: {
    justifyContent: 'center',
    paddingHorizontal: 1,
    width: 27,
    height: 27,
  },
  editImage: {width: 24, height: 24, margin: 8},
  searchImage: {width: 35, height: 35, margin: 8},
  image: {width: 18, height: 18},
  entryDetails: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '49%',
  },
  entryDate: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#4A4A4A',
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 25, // Adjust as needed
    padding: 0,

    width: 40,
    alignSelf: 'center',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 0,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
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

  flatlist: {
    backgroundColor: '#F5F5F5',
    padding: 8,
  },
  hoursTitleText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#4A4A4A',
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 20, // Adjust as needed
  },
  fabContainer: {
    flexDirection: 'row',
    margin: 4,
    justifyContent: 'space-evenly',
  },
  fab: {
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fabText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '600',
  },
});
