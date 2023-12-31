import React, { useState } from "react";
import {
  Image, 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,  
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { SLIDER_WIDTH, ITEM_WIDTH } from './carouselCardItem';

//import of flashcards
import Flashcard from './flashcard';

//import of decks
import { decks as decksData , schools,courses,subjects } from './data';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
var filter=decksData[0];

//searchbar

const SearchBar = () => {
  return (
    <View style={styles.Search}>
      <View style={styles.SearchBar}>
        <TextInput style={{width:'85%'}} placeholder='Search'/>
        <TouchableOpacity onPress={()=>{}}>

        </TouchableOpacity>  
      </View>
    </View>
  );
};

//home function
function Homepage({ navigation }) {
  const [isModalVisibleDeck, setIsModalVisibleDeck] = useState(false);
  const [decks, setDecks] = useState(decksData); 
  const [selectedDeck, setSelectedDeck] = useState(decks[0]);
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  const [newDeckName, setNewDeckName] = useState('');
  const [newCourse, setNewCourse] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newUni, setNewUni] = useState('');
  
  const toggleModalDeck = () => {
    setIsModalVisibleDeck(!isModalVisibleDeck);
  };
  

  const handleDeckPress = (deck) => {
    setSelectedDeck(deck);
    setFilter();
  };

  const setFilter=()=>{
    filter=selectedDeck;
  }

  const handleButtonPressDeck = () => {
    toggleModalDeck();
  };
  
  const handleCreateDeck = () => {
    if (!newDeckName) {
      alert('Please enter a valid deck name');
      return;
    }

    const newDeck = {
      id: decks.length + 1,
      name: newDeckName,
      subject: newSubject,
      school: newUni,
      course: newCourse,
      flashcards: [],
    };

    decks.push(newDeck);
    //setDecks([...decks, newDeck]);
    setNewDeckName('');
    toggleModalDeck();
  };

  const moveToDeckScreen=()=>{
    navigation.replace('CarouselCards')
  }
  

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}> 
    <View style={styles.HomePageUI}>
      <View>
        <Text style={styles.deckTitle}>FEATURED DECKS</Text>
        <FlatList
          data={decks}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleDeckPress(item)}style={styles.deckContainer}>
              <Text style={styles.deckTitle}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleButtonPressDeck}>
          <Text style={styles.addButtonText}>ADD DECK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={moveToDeckScreen}>
          <Text style={styles.addButtonText}>MOVE TO EDIT MODE</Text>
        </TouchableOpacity>
  <Modal
    animationType="slide"
    transparent={true}
    visible={isModalVisibleDeck}
    onRequestClose={() => {
      toggleModalDeck();
    }}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Add Deck</Text>
        <TextInput
          style={styles.modalInput}
          placeholder="Deck Name"
          value={newDeckName}
          onChangeText={(text) => setNewDeckName(text)}
        />
        <TextInput
          style={styles.modalInput}
          placeholder="Course"
          value={newCourse}
          onChangeText={(text) => setNewCourse(text)}
        />
        <TextInput
          style={styles.modalInput}
          placeholder="Subject"
          value={newSubject}
          onChangeText={(text) => setNewSubject(text)}
        />
        <TextInput
          style={styles.modalInput}
          placeholder="University"
          value={newUni}
          onChangeText={(text) => setNewUni(text)}
        />

        <TouchableOpacity
          style={styles.modalButton}
          onPress={handleCreateDeck}
        >
          <Text style={styles.modalButtonText}>Create Deck</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modalButton}
          onPress={toggleModalDeck}
        >
          <Text style={styles.modalButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>      
      </View>
    
      <Text style={styles.deckTitle}>{selectedDeck.name}</Text>
      <Carousel
        layout="default"
        layoutCardOffset={9}
        ref={isCarousel}
        data={selectedDeck.flashcards}
        renderItem={({ item }) => (
          <Flashcard route={{ params: { frontContent: item.frontContent, backContent: item.backContent } }} />
        )}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onScrollIndexChanged={(index) => setIndex(index)}
        useScrollView={true}
      />
      <Pagination
        dotsLength={selectedDeck.flashcards.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.92)'
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>
    </ScrollView> 
  );
}

//profile
function Profile() {
  return (
    <SafeAreaView style={styles.ProfileContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.ProfileTitleBar}>
        </View>

        <View style={{ alignSelf: 'center' }}>
          <View style={styles.profileImage}>
      
            <Image source={require('./assets/vhilly.jpg')} style={styles.image} resizeMode="center" />
          </View>
        </View>

        <View style={styles.profileInfo}>
          <Text style = {[styles.Username,{fontWeight:'200',fontSize:26}]}>Vhilly Manalansang</Text>
          <Text style = {[styles.Username,{color:'#AEB5BC',fontSize:12}]}>manalansang.vhilly@ue.edu.ph</Text>
          
        </View>
     
      </ScrollView>
    </SafeAreaView>
  );
}

//library ^0^

// function for library

function Libraries({navigation}){
  const [CourseDecks,setCourseDecks] = useState(decksData)
  const [SubjectDecks,setSubjectDecks] = useState(decksData)
  const [UniDecks,setUniDecks] = useState(decksData)
  const Thumbnail = ({item}) => {
    return (
      <TouchableOpacity onPress={()=>goToCarousel(item)}>
        <View style={styles.thumbnail}>
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  const goToCarousel=(item)=>{
    filter=item;
    navigation.replace('CarouselCards');
  }

  const CoursePress=(item)=>{
    let x = decksData.filter(coursedeck=>{
      if (coursedeck.course === item) {
        return true;
      } else {
        return false;
      }
    })
    setCourseDecks(x)
  }

  const SubjectPress=(item)=>{
    let x = decksData.filter(subjectdeck=>{
      if (subjectdeck.subject === item) {
        return true;
      } else {
        return false;
      }
    })
    setSubjectDecks(x)
  }

  const UniPress=(item)=>{
    let x = decksData.filter(unideck=>{
      if (unideck.school === item) {
        return true;
      } else {
        return false;
      }
    })
    setUniDecks(x)
  }

  return(
    <ScrollView>
    <View>
      <View>
        <Text style={styles.deckTitle}>DECKS BY COURSE</Text>
        <FlatList
          data={courses}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => CoursePress(item)}style={styles.deckContainer}>
              <Text style={styles.deckTitle}>{item}</Text>
            </TouchableOpacity>
          )}
        />
        <FlatList
          data={CourseDecks}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={Thumbnail}
        />
      </View>
      <View>
        <Text style={styles.deckTitle}>DECKS BY SUBJECT</Text>
        <FlatList
          data={subjects}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => SubjectPress(item)}style={styles.deckContainer}>
              <Text style={styles.deckTitle}>{item}</Text>
            </TouchableOpacity>
          )}
        />
        <FlatList
          data={SubjectDecks}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={Thumbnail}
        />
      </View>
      <View>
        <Text style={styles.deckTitle}>DECKS BY UNIVERSITY</Text>
        <FlatList
          data={schools}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => UniPress(item)}style={styles.deckContainer}>
              <Text style={styles.deckTitle}>{item}</Text>
            </TouchableOpacity>
          )}
        />
        <FlatList
          data={UniDecks}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={Thumbnail}
        />
      </View>
    </View>
    </ScrollView>
  )
}

//for tabs 
function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: ({ navigation }) => (
          <View style={styles.TopHeader}>
            <Text style={styles.headerText}>Grove Card</Text>
            <SearchBar />
          </View>
        ),
      }}
    >

      <Tab.Screen name="Home" component={Homepage}/>
      <Tab.Screen name="Libraries" component={Libraries} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

//sign in 
function SignIn1({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    //ADMIN THINGZZZZ
    const user1 = 'vhilly';
    const pass1 = 'pogi';

    if (username === user1 && password === pass1) {
      alert('Login successful!');

      navigation.replace('Tabs');
    } else {
      
      alert('Invalid username or password');
    }
  };

  return (
    <View style={styles.SignInUI}>
      <View style={styles.LoginUI}>
        <Text style={styles.SignIn}>Sign In</Text>

        <View style={styles.Component1}>
          <TextInput
            style={styles.Username1}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
            placeholderTextColor="rgba(0,0,0,0.45)"
          />
        </View>

        <View style={styles.Component1}>
          <TextInput
            style={styles.Password1}
            placeholder="Password"
            value={password}
            placeholderTextColor="rgba(0,0,0,0.45)"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.LoginButton} onPress={handleLogin}>
        <Text style={styles.LogIn}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

function CarouselCards({navigation}){
  const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)
  const [isModalVisibleFlashcard, setIsModalVisibleFlashcard] = useState(false);

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const goBack=()=>{
    navigation.replace('Tabs')
  }
  const toggleModalFlashcard = () => {
    setIsModalVisibleFlashcard(!isModalVisibleFlashcard);
  };
  
  const handleButtonPressFlashcard = () => {
    toggleModalFlashcard();
  };
  const handleAddFlashcard = () => {
    if (!question || !answer) {
      alert('Please enter both question and answer');
      return;
    }

    const newFlashcard = {
      id: filter.flashcards.length + 1,
      frontContent: question,
      backContent: answer,
    };

    filter.flashcards.push(newFlashcard)
    /*
    setSelectedDeck((prevDeck) => ({
      ...prevDeck,
      flashcards: [...prevDeck.flashcards, newFlashcard],
    }));
    */
    toggleModalFlashcard();
  };

  return (
    <View>
      <Carousel
        layout="default"
        layoutCardOffset={9}
        ref={isCarousel}
        data={filter.flashcards}
        renderItem={({ item }) => (
          <Flashcard route={{ params: { frontContent: item.frontContent, backContent: item.backContent } }} />
        )}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onScrollIndexChanged={(index) => setIndex(index)}
        useScrollView={true}
      />
      <Pagination
        dotsLength={filter.flashcards.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.92)'
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
      <TouchableOpacity style={styles.addButton} onPress={goBack}>
          <Text style={styles.addButtonText}>RETURN</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton} onPress={handleButtonPressFlashcard}>
        <Text style={styles.addButtonText}>ADD CARD</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisibleFlashcard}
        onRequestClose={() => {
          toggleModalFlashcard();
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Flashcard</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Question"
              value={question}
              onChangeText={(text) => setQuestion(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Answer"
              value={answer}
              onChangeText={(text) => setAnswer(text)}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleAddFlashcard}
            >
              <Text style={styles.modalButtonText}>Add Flashcard</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={toggleModalFlashcard}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}


//NAVIGATIONZZZ
const App=()=> {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignIn1} />
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="CarouselCards" component={CarouselCards}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//stylesheet
const styles = StyleSheet.create({
  //modal container for deck and flashcard
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  modalButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  
  // deck container made by chatgpt
  deckContainer: {
    marginHorizontal: 15,
    marginVertical: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    backgroundColor: 'white',
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  deckTitle: {
    marginVertical: 15,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  addFlashcardContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  addButton: {
    alignItems:"center",
    marginVertical:20,
    marginHorizontal:"35%",
    borderRadius:"50%",
    width: "25%",
    alignItems: "center",
    height: 45,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,1)",
    boxSizing: "border-box",
    backgroundColor: "green",
    
  },
  addButtonText: {
    color: 'white',
    fontSize: 16
  },

  flashcardContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsContainer:{
    flex:1,
    backgroundColor:'#FFF'
  },
  settingsText:{
    color:'#161924',
    fontSize:20,
    fontWeight:"500"
  },

  // profile tab flash card 
  Profileflashcard:{
    alignItems:'center',
    flex:1
},
  //profile info container
  profileInfo:{
    alignSelf:'center',
    alignItems:'center',
    marginTop:16
  },

  //image container
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    aspectRatio:1,
  },
  //profile image sizes
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    marginTop:34,

  },
  ProfileTitleBar:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:24,
    marginHorizontal:16
  },
  //profilecontainer
  ProfileContainer:{
    flex:1,
    backgroundColor:'#fff'
  }, 
  //topNavigationHeader
  TopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 25,
    backgroundColor: 'green', 
  },
  
  headerText: {
    fontSize: 20,
    color: 'white', 
    fontWeight: 'bold',
  },

 Search:{
  flex:1,
  justifyContent:'center',
  alignItems:'center' 
 },
 SearchBar:{
  width:300,
  height:50,
  backgroundColor:'#CDCDCD',
  borderRadius:10,
  flexDirection:'row',
  alignItems:'center'
 },
  //homescreen
 HomePageUI:{
  flex: 1, 
  alignItems: 'center', 
  justifyContent: 'center'
 }, 
 //profle
 ProfileUI:{
  flex: 1, 
  alignItems: 'center', 
  justifyContent: 'center'
 }, 
 //library
 LibraryUI:{
  flex: 1, 
  alignItems: 'center', 
  justifyContent: 'center'
 }, 
SignInUI: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  width: '100%',
  height: 0,
  padding: 10,
  borderWidth: 2, 
  borderColor: "rgba(0,0,0,0.71)",
  margin: 35,
  },
  //LOGIN UI
  LoginUI: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: "80%",
    boxSizing: "border-box",
    
  },
  //font
  SignIn: {
    color: "rgba(0,0,0,1)",
    fontSize: "21px",
    lineHeight: "21px",
    fontFamily: "Inter, sans-serif",
    fontWeight: "400",
  },
  // username/password componejnt
  Component1: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    boxSizing: "border-box",
  },

  Username1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: 49,
    padding: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.45)",
    boxSizing: "border-box",
    marginVertical: 10,
  },
  //font
  Username: {
    color: "rgba(0,0,0,1)",
    fontSize: "21px",
    lineHeight: "26px",
    fontFamily: "Inter, sans-serif",
    fontWeight: "400",
  },
  Password1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: 49,
    padding: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.45)",
    boxSizing: "border-box",
    marginVertical: 10, 

  },
  //font
  Password: {
    color: "rgba(0,0,0,1)",
    fontSize: "21px",
    lineHeight: "21px",
    fontFamily: "Inter, sans-serif",
    fontWeight: "400",
  },
  //style for login buttom
  LoginButton: {
    width: "25%",
    alignItems: "center",
    height: 45,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,1)",
    boxSizing: "border-box",
    backgroundColor: "rgba(217,217,217,1)",
    
  },
  //font
  LogIn: {
    color: "rgba(0,0,0,1)",
    fontSize: "21px",
    lineHeight: "21px",
    fontFamily: "Inter, sans-serif",
    fontWeight: "400",
  },
  thumbnail: {
    marginHorizontal:20,
    width: 300,
    height: 200,
    backgroundColor: '#A6CF98',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default App;