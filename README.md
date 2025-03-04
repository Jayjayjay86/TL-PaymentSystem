# Tutorland Payment System

The Tutorland Payment System is a React Native application designed to manage tutoring accounts, track payments, and organize student entries. It provides an intuitive interface for tutors to add, edit, and delete accounts, as well as manage entries for each student. The app also includes features like searching for accounts, loading backups, and handling payments and complementary hours.

## Features

### Account Management:

- Add new accounts.
- Edit existing accounts (e.g., update account name, course price, etc.).
- Delete accounts.

### Entry Management:

- Add new entries to an account.
- Edit existing entries (e.g., update date, notes, etc.).
- Delete entries.

### Search Functionality:

- Search for accounts by name.

### Backup and Restore:

- Load accounts from a backup.
- Delete all data (with a long-press confirmation).

### Visual Indicators:

- Icons for double lessons, paid lessons, end-of-cycle, and notes.
- Color-coded accents for entries.

### Swipe Gestures:

- Swipe left or right to navigate between accounts.

### Responsive Design:

- Works seamlessly on both Android and iOS devices.

## Screenshots

- Account List
- Add Entry
- Edit Account
- Search Accounts
- No Accounts
- No Entries

## Installation

### Clone the Repository:

```bash
git clone https://github.com/your-username/account-management-app.git
cd account-management-app
```

### Install Dependencies:

```bash
npm install
```

### Run the App:

#### For Android:

```bash
npx react-native run-android
```

#### For iOS:

```bash
npx react-native run-ios
```

## Usage

### 1. Adding an Account

- Tap the `✨ New Account` button at the bottom of the screen.
- Fill in the account details (e.g., account name, course price, etc.).
- Tap `Save` to create the account.

### 2. Adding an Entry

- Select an account from the list.
- Tap the `✨ Add Entry` button at the bottom of the screen.
- Fill in the entry details (e.g., date, notes, etc.).
- Tap `Save` to add the entry.

### 3. Editing an Account

- Select the account you want to edit.
- Tap the edit icon (pencil) next to the account name.
- Update the account details and tap `Save`.

### 4. Deleting an Account

- Select the account you want to delete.
- Tap the delete icon (bin) next to the account name.
- Confirm the deletion.

### 5. Searching for an Account

- Tap the search icon (magnifying glass) next to the account name.
- Enter the account name in the search bar.
- Select the account from the search results.

### 6. Loading Backups

- If no accounts are found, tap the `✨ Load Accounts From Backup` button.
- The app will load accounts from a predefined backup.

### 7. Deleting All Data

- Long-press the `Course Price` text for 5 seconds.
- Confirm the deletion in the modal that appears.

## File Structure

```
src/
├── assets/
│   ├── images/ # Contains all images used in the app
│   └── ...
├── components/
│   ├── modals/ # Contains all modal components
│   └── ...
├── database/ # Contains database-related files
│   ├── Accounts.js # Functions for managing accounts
│   └── data.js # Predefined data (e.g., student names)
├── utils/ # Utility functions
│   └── misc.js # Helper functions (e.g., capitalizeString)
└── ...
```

## Dependencies

- **React Native**: Core framework for building the app.
- **PanResponder**: Handles swipe gestures for account navigation.
- **FlatList**: Efficiently renders lists of accounts and entries.
- **Image**: Displays icons and images.
- **TouchableOpacity**: Provides touchable buttons and interactions.

## Customization

- **Icons**: Replace the images in the `assets/images` folder with your own.
- **Colors**: Update the colors in the `styles` object to match your theme.
- **Database**: Modify the `database/Accounts.js` file to change how accounts and entries are stored and retrieved.

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact

For questions or feedback, please contact:

- **Your Name**: your-email@example.com
- **GitHub**: [your-username](https://github.com/your-username)
