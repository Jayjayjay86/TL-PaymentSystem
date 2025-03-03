export const styles = {
  container: {
    flexDirection: 'center',
    padding: 10,
    backgroundColor: '#FFDAC1',
    height: '100%',
  },
  swipeContainer: {
    height: '95%',
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
  noStudents: {width: 180, height: 180, borderRadius: 50},
  noEntries: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A4A4A',
    fontFamily: 'Poppins-Bold',
    lineHeight: 40, // Adjust as needed
  },
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
  editImage: {width: 24, height: 24, margin: 10},
  image: {width: 18, height: 18},
  entryDetails: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '49%',
  },
  entryDate: {
    fontSize: 16,
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
    margin: 5,
    gap: 16,
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