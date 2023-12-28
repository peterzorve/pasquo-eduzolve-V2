

import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, ActivityIndicator, } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import Logo from "../../../assets/eduzolve-logo2.png"
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
//   import { db } from "../config/firebase.config";
// import { db } from "./firebase";
import { db } from "../../../firebaseConfig";
  
const MentorScreen = () => {
    const user = useSelector((state) => state.user.user);
    const [isLoading, setIsLoading] = useState(true);
    const [chats, setChats] = useState(null);
  
    const navigation = useNavigation();
  
    useLayoutEffect(() => {
      const chatQuery = query(
        collection(db, "chats"),
        orderBy("_id", "desc")
      );
  
      const unsubscribe = onSnapshot(chatQuery, (querySnapShot) => {
        const chatRooms = querySnapShot.docs.map((doc) => doc.data());
        setChats(chatRooms);
        setIsLoading(false);
      });
  
      //  Return the unsubscribe funciton to stop listening to the updates
      return unsubscribe;
    }, []);
  
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView>
          <View style={{
            // width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 1,
            // paddingBottom: 2,
            backgroundColor: "gray", 
            margin: 10
            
            }}>
            <Image source={Logo} 
            style={{
                width: 50,
                height: 50,
                margin: 15, 
                borderRadius: 50,
            }} 
            resizeMode="contain" />
  
            <TouchableOpacity
              // onPress={() => navigation.navigate("ProfileScreen")}
            //   className="w-12 h-12 rounded-full border border-primary flex items-center justify-center"
              style={{
                width: 50,
                height: 50,
                borderWidth: 1,
                borderColor: '#388e3c', // primary color in Material UI
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                margin: 15
            }}
            >
              <Image
                source={{ uri: user?.profilePic }}
                // className="w-full h-full"
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 50,
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
  
          {/* scrolling area */}
          <ScrollView 
            // className="w-full px-4 pt-4"
            style={{
                width: '100%',
                paddingHorizontal: 16,
                paddingTop: 16,
            }}
          >
            <View 
                // className="w-full"
                style={{
                    width: '100%',
                }}
            >


              {/* meesages title */}
              <View 
                // className="w-full flex-row items-center justify-between px-2"

                style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 2,
                }}
                
              >
                <Text 
                    // className="text-primaryText text-base font-extrabold pb-2"

                    style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#388e3c', // Material UI primary color
                        marginBottom: 8,
                    }}

                >
                  Messages
                </Text>
  
                <TouchableOpacity
                  onPress={() => navigation.navigate("AddToChatScreen")}
                >
                  <Ionicons name="chatbox" size={28} color="#555" />
                </TouchableOpacity>
              </View>
  
              {isLoading ? (
                <>
                  <View 
                    // className="w-full flex items-center justify-center"

                    style={{
                        width: '100%',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}

                    >
                    <ActivityIndicator size={"large"} color={"#43C651"} />
                  </View>
                </>
              ) : (
                <>
                  {chats && chats?.length > 0 ? (
                    <>
                      {chats?.map((room) => (
                        <MessageCard key={room._id} room={room} />
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  };
  
  const MessageCard = ({ room }) => {
    const navigation = useNavigation();
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ChatScreen", { room: room })}

        // className="w-full flex-row items-center justify-start py-2"

        style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingVertical: 4, //'py-2' in CSS
        }}

      >
        {/* images */}
        <View 
            // className="w-16 h-16 rounded-full flex items-center border-2 border-primary p-1 justify-center"

            style={{
                width: 45,
                height: 45,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: '#388e3c', // Material UI primary color
                paddingVertical: 1, // 'p-1' in CSS
                alignItems: 'center',
                justifyContent: 'center',
                margin: 10
            }}

        >
          <FontAwesome5 name="users" size={25} color="#555" />
        </View>
        {/* content */}
        <View 
            // className="flex-1 flex items-start justify-center ml-4"

            style={{
                flex: 1, // flex-1 in CSS
                flexDirection: 'row',
                alignItems: 'flex-start', // items-start in CSS
                justifyContent: 'center', // justify-center in CSS
                marginLeft: 16, // 'ml-4' in CSS
            }}

            >
          <Text 
                    
            style={{
                fontSize: 14,
                fontWeight: 'semibold',
                color: '#333', // dark gray color
                textTransform: 'capitalize', // text will be capitalized
                // alignItems: "flex-start", 
                
            }}

          >
            {room.chatName}
          </Text>
  
          {/* <Text 
            className="text-primaryText text-sm"

            style={{
                fontSize: 14, // 'text-sm' in CSS
                color: '#388e3c', // Material UI primary color
            }}

            >
            Lorem ipsum dolor sit amet consec a elit....
          </Text> */}

        </View>
  

        {/* time text */}
        <Text 

            // className="text-primary px-4 text-base font-semibold"

            style={{
                fontSize: 16,
                fontWeight: 'semibold',
                color: '#388e3c', // Material UI primary color
                padding: 16, // 'px-4' in CSS
            }}
            
        >27 min</Text>
      </TouchableOpacity>
    );
  };
  
  // export default MentorScreen;


export default MentorScreen;

