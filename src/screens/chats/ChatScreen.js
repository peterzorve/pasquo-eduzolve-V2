
import {
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator,
    TextInput,
    Image,
    StyleSheet, 
    KeyboardAwareScrollView 
  } from "react-native";


// import KeyboardAwareScrollView from 'react-native-keyboard-aware-scroll-view';
import { GiftedChat } from 'react-native-gifted-chat';

import CustomButton from "../../components/CustomButton";
import CustomInputMultiLine from "../../components/CustomInputMultiLine";

  import React, { useLayoutEffect, useRef, useState } from "react";
  import {
    Entypo,
    FontAwesome,
    FontAwesome5,
    MaterialIcons,
  } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
  import {
    addDoc,
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
  } from "firebase/firestore";
//   import { db } from "../config/firebase.config";
import { db } from "../../../firebaseConfig";


  import { useSelector } from "react-redux";
  
  const ChatScreen = ({ route }) => {
    const { room } = route.params;
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState(null);
    const user = useSelector((state) => state.user.user);
  
    const textInputRef = useRef(null);
    // const scrollViewRef = useRef();
  
    const handleKeyboardOpen = () => {
      if (textInputRef.current) {
        textInputRef.current.focus();
      }
    };



    // const scrollViewRef = useRef();
    // let isReachedBottom = false;
    // const onContentSizeChange = () => {
    //   const scrollHeight = scrollViewRef.current.getScrollHeight();
    //   const contentHeight = scrollViewRef.current.getContentHeight();
  
    //   if (contentHeight > scrollHeight && !isReachedBottom) {
    //     scrollViewRef.current.scrollToEnd({ animated: true });
    //     isReachedBottom = true;
    //   }
    // };

   


  
    const sendMessage = async () => {
      const timeStamp = serverTimestamp();
      const id = `${Date.now()}`;
      const message_doc = {
        _id: id,
        roomId: room._id,
        timeStamp: timeStamp,
        message: message,
        user: user,
      }; 

      if (message) {
        setMessage("");
        await addDoc(
          collection(doc(db, "chats", room._id), "messages"), message_doc )
          .then(() => {})
          .catch((err) => alert(err));
      };
    }



    useLayoutEffect(() => {
      const msgQuery = query(
        collection(db, "chats", room?._id, "messages"),
        orderBy("timeStamp", "asc")
      );
  
      const unsubscribe = onSnapshot(msgQuery, (querySnap) => {
        const upMsg = querySnap.docs.map((doc) => doc.data());
        setMessages(upMsg);
        // console.log(messages[0].user.fullName)
        setIsLoading(false);
        
      });
      return unsubscribe;
    }, []);
  


    return (
     
        
      <View  style={{
        // flex: 1
          }} >

        <View style={{   backgroundColor: '#ffbf00',  padding: 8,  margin: 3,  flexGrow: 0.2,  marginTop: 40 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'between', width: '95%', padding: 4, backgroundColor: '#ffbf00', elevation: 2, }}> 
            <TouchableOpacity style={{ marginHorizontal: 3}} onPress={() => navigation.goBack()}> 
              <MaterialIcons name="chevron-left" size={40} color={"#000000"} />  
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 3,}} >
              <View style={{ width: 50,  height: 50, borderRadius: 50, borderWidth: 1, borderColor: '#000000',  flexDirection: 'row',  alignItems: 'center',  justifyContent: 'center', marginRight: 10}}> 
                <FontAwesome5 name="users" size={24} color="#000000" /> 
              </View>
              <View>
                <Text style={{ fontSize: 14, fontWeight: 'semibold', color: '#000000',  marginBottom: 5, }}>Chat with </Text> 
                <Text style={{ fontSize: 16, color: '#000000', fontWeight: 'semibold',  textTransform: 'capitalize', fontWeight: "bold" }}> 
                  {room.chatName.length > 16 ? `${room.chatName.slice(0, 16)} ...` : room.chatName}{" "} (Mentor) 
                </Text>
              </View>
            </View>
          </View>
        </View>
  

        <View className="w-full bg-white px-4 py-6 rounded-3xl flex-1 rounded-t-[50px] -mt-10" >
          <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={160} >
            <>
              <ScrollView 
                  // ref={scrollViewRef}
                  // onContentSizeChange={onContentSizeChange}
              >
                {isLoading ? (
                  <>
                    <View 
                      // className="w-full flex items-center justify-center"
                    >
                      <ActivityIndicator size={"large"} color={"#43C651"} />
                    </View>
                  </>
                ) : (
                  <>
                    {messages?.map((msg, i) =>
                      msg.user.providerData.email === user.providerData.email ? (
                        <View key={i} >

                          <View style={{ alignSelf: "flex-end", marginHorizontal: 10, maxWidth: "80%", backgroundColor: "#44b38c", borderRadius: 10}} >
                            <Text style={{ padding: 10, }}> {msg.message} </Text>
                          </View>

                          <View style={{ alignSelf: "flex-end", marginRight: 10, marginBottom: 10  }}>
                            {msg?.timeStamp?.seconds && (
                              <Text style={{  }} >
                                {msg.user.fullName }  |  {new Date( parseInt(msg?.timeStamp?.seconds) * 1000).toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true, })} 
                              </Text>
                            )}
                          </View>
                        </View>
                      ) : (
                        <View key={i}
                          style={{ alignSelf: "flex-start", paddingHorizontal: 10  }}
                        >
                          <View style={{ flexDirection: 'row', padding: 5, maxWidth: '80%'}} >

                            <Image
                              style={{ width: 50, height: 50,  borderRadius: 50,  borderWidth: 1, borderColor: '#999', alignItems: 'center', justifyContent: 'center', margin: 10 }}
                              resizeMode="cover"
                              source={{ uri: msg?.user?.profilePic }}
                            />

                            <View >
                                <View style={{ width: 'auto', padding: 5,  borderRadius: 10, backgroundColor: "gray",  position: 'relative', }}>
                                    <Text style={{padding: 5}}>{msg.message} </Text>  
                                </View> 

                                <View style={{ alignSelf: "flex-start" }}>
                                  {msg?.timeStamp?.seconds && (
                                    <Text className="text-[12px] text-black font-semibold">
                                      {new Date( parseInt(msg?.timeStamp?.seconds) * 1000).toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true, })}  |  {msg.user.fullName } 
                                    </Text>
                                  )}
                                </View>
                            </View>

                          </View>
                        </View>
                      )
                    )}
                  </>
                )}


              </ScrollView>



            </>



          </KeyboardAvoidingView>


       
              <View style={{ width: '100%',  flexDirection: 'row',  alignItems: 'center',  justifyContent: 'center',  padding: 16,  minHeight: 30}}>
                <CustomInputMultiLine placeholer="Phone number"      value={message}     setValue={setMessage}     secureTextEntry={false} keyboardType="numeric" length="90%" minHeight={40}/>
                <TouchableOpacity  style={{marginHorizontal: 10, backgroundColor: "gray", padding: 10, borderRadius:6}} onPress={sendMessage}>
                  <FontAwesome name="send" size={24} color="#555" />
                </TouchableOpacity>
              </View>



        


        </View>


              
      </View>


 
    );
  };


  const styles = StyleSheet.create({
    root: {
      alignItems: "center", 
      padding: 20, 
      marginBottom: 100
    },
  
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover', 
    },
  
    messageTitle: {
      paddingLeft: 5
    },

    root1: {
      // alignItems: "center", 
      padding: 3, 
      marginBottom: 100
    },

    horizontal1: {
      flexDirection: 'row', 
      // padding: 5
    },
  
  
  }); 

  export default ChatScreen;


  