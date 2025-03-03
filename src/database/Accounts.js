import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import uuid from 'react-native-uuid';

const dataBaseName = 'db1';

export const defaultAccount = {
  id: '0',
  accountName: '',
  timePaidInHours: 0,
  complementaryHours: 0,
  coursePrice: 0,
  entries: [],
};

export const createAccount = async object => {
  const uniqueId = uuid.v4();
  const dateCreated = new Date();

  try {
    const dataArray = await AsyncStorage.getItem(dataBaseName);
    const parsedArray = dataArray ? JSON.parse(dataArray) : [];

    const completeObject = {
      id: uniqueId,
      dateCreated: dateCreated,
      ...object,
    };

    parsedArray.push(completeObject);

    await AsyncStorage.setItem(dataBaseName, JSON.stringify(parsedArray));
    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllAccounts = async () => {
  try {
    const unparsedArray = await AsyncStorage.getItem(dataBaseName);
    return Promise.resolve(unparsedArray ? JSON.parse(unparsedArray) : []);
  } catch (error) {
    return Promise.reject(`Error fetching accounts  ==> ${error}`);
  }
};

export const getAccountById = async id => {
  try {
    const unparsedAccounts = await AsyncStorage.getItem(dataBaseName);
    const parsedAccounts = unparsedAccounts ? JSON.parse(unparsedAccounts) : [];

    const Account = parsedAccounts.filter(object => object.id === id);

    if (Account) {
      return Promise.resolve(Account);
    } else {
      return Promise.reject(
        `Error fetching single account  ==> No Account Found!`,
      );
    }
  } catch (error) {
    return Promise.reject(`Error fetching single account  ==> ${error}`);
  }
};

export const updateAccount = async object => {
  try {
    const Accounts = await AsyncStorage.getItem(dataBaseName);
    const parsedArray = Accounts ? JSON.parse(Accounts) : [];
    const updatedAccounts = parsedArray.map(account =>
      account.id === object.id ? {...account, ...object} : account,
    );

    const updatedAccountsString = JSON.stringify(updatedAccounts);

    await AsyncStorage.setItem(dataBaseName, updatedAccountsString);

    if (Accounts !== updatedAccountsString) {
      return Promise.resolve(true);
    } else {
      return Promise.reject(false);
    }
  } catch (error) {
    return Promise.reject(`Error updating single account  ==> ${error}`);
  }
};

export const destroyAccounts = async () => {
  try {
    await AsyncStorage.removeItem(dataBaseName);
    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removeAccount = async id => {
  try {
    const accounts = await AsyncStorage.getItem(dataBaseName);
    const parsedArray = accounts ? JSON.parse(accounts) : [];
    const updatedAccounts = parsedArray.filter(account => account.id !== id);
    if (parsedArray.length > updatedAccounts.length) {
      await AsyncStorage.setItem(dataBaseName, JSON.stringify(updatedAccounts));
      return Promise.resolve(true);
    } else {
      return Promise.reject(false);
    }
  } catch (error) {
    return Promise.reject(`Error removing single account  ==> ${error}`);
  }
};
