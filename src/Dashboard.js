import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from './utils/userSlice';
import BottomSheet from '@gorhom/bottom-sheet';
import {fetchStocks, searchStocks} from './utils/api'; // methods being called from api service for calling api
import StockCard from './components/StockCard'; // stock card component
import {useNavigation} from '@react-navigation/native';
import {useToast} from './utils/ToastContext';
import Loader from './components/Loader';

const Dashboard = () => {
  const username = useSelector(state => state.user.username); // accessing username for display purpose
  const dispatch = useDispatch();
  const bottomSheetRef = useRef(null);
  const [stocks, setStocks] = useState([]); // state to manage to display stock list
  const [query, setQuery] = useState(''); // state to manage the input value for search input
  const [isExpanded, setIsExpanded] = useState(false); // state to track the bottom sheet position
  const navigation = useNavigation();
  const {showToast} = useToast();
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // State to handle pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(stocks.length / itemsPerPage); // compute the total number of pages

  useEffect(() => {
    const loadStocks = async () => {
      // Display the loader
      setLoader(true);
      try {
        const response = await fetchStocks();
        setStocks(response.data.trends.slice(0, 40));
        setLoader(false);
      } catch (error) {
        //console.error('Error fetching stocks:', error);
        setLoader(false);
      }
      setLoader(false);
    };
    loadStocks();
  }, []);

  // Handle hardware back button
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  // search input function
  const handleSearch = async text => {
    // console.log(text, 'text');
    setLoader(true);
    setQuery(text);
    if (text.length > 0) {
      setTimeout(async () => {
        const results = await searchStocks(text);
        //console.log(results,'api results');
        setStocks(results.data.stock);
        setLoader(false);
      }, 500);
    } else {
      setStocks([]);
      setLoader(false);
    }
    setLoader(false);
  };

  // logout function
  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Login');
    showToast('Logout Successfully!!!');
  };

  // Function to change the page
  const handlePageChange = newPage => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <View style={styles.container}>
      {loader && <Loader />}
      <Ionicon
        name="power"
        size={30}
        style={styles.icon}
        onPress={handleLogout}
        color="#000000"
      />
      <Text
        style={[styles.welcomeText, isExpanded ? {opacity: 0} : {opacity: 1}]}>
        Welcome, {username}!
      </Text>
      {stocks.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No data to display</Text>
        </View>
      ) : (
        <BottomSheet
          ref={bottomSheetRef}
          onChange={index => setIsExpanded(index === 1)}
          index={0}
          snapPoints={['50%', '100%']}>
          <View style={styles.bottomSheetContent}>
            {isExpanded && (
              <TextInput
                style={styles.searchInput}
                placeholder="Search for stocks"
                placeholderTextColor="#000"
                onChangeText={handleSearch}
                value={query}
              />
            )}
            <FlatList
              data={stocks.slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage,
              )}
              keyExtractor={item => item.symbol}
              renderItem={({item}) => (
                <StockCard stock={item} navigation={navigation} />
              )}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <TouchableOpacity
                onPress={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}>
                <Ionicon
                  name="chevron-back-outline"
                  style={styles.paginationArrow}
                />
              </TouchableOpacity>
              <Text style={{color: '#000'}}>
                Page {currentPage} of {totalPages}
              </Text>

              <TouchableOpacity
                onPress={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}>
                <Ionicon
                  name="chevron-forward-outline"
                  style={styles.paginationArrow}
                />
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheet>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  icon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    top: 60,
    zIndex: 1,
    color: '#000',
  },
  bottomSheetContent: {
    padding: 16,
  },
  searchInput: {
    height: 40,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#ddd',
    color: '#000',
  },
  stockItem: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: 'gray',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  pageButton: {
    marginHorizontal: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    minWidth: 40,
    alignItems: 'center',
  },
  pageButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  activePageButton: {
    backgroundColor: '#0066cc',
  },
  activePageButtonText: {
    color: '#fff',
  },
  paginationArrow: {
    fontSize: 20,
    color: 'black',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: '#000',
  },
});

export default Dashboard;
