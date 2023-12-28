import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { FontAwesome, FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
// import { db } from "../config/firebase.config";
import { db } from "../../../firebaseConfig";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";



const AddToChatScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("beatricefianyo@gmail.com"); 
    const [maxMentees, setMaxMentees] = useState("");
    const [interestField, setInterestField] = useState("");


  const user = useSelector((state) => state.user.user);
  const [addChat, setAddChat] = useState("");

  const createNewChat = async () => {
    let id = `${Date.now()}`;

    const messageInfo = { 
        _id: id, 
        user: user, 
        // chatName: addChat, 
        chatName: user.fullName,
        maxMentees: maxMentees, 
        interestField: interestField
    }; 



    if (maxMentees, interestField ) {
      setDoc(doc(db, "chats", id), messageInfo)
        .then(() => {
        //   setAddChat("");
        //   navigation.replace("HomeScreen");
        setMaxMentees("")
        setInterestField("")
        })
        .catch((err) => { alert("Error : ", err); });
    }
  };



  return ( 
    <View className="flex-1">



        <View style={{   backgroundColor: 'white',  padding: 8,  margin: 3,  flexGrow: 0.2, }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'between', width: '95%', padding: 4, elevation: 2, }}> 

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 3,}} >
              <View style={{ width: 50,  height: 50, borderRadius: 50, borderWidth: 1, borderColor: '#000000',  flexDirection: 'row',  alignItems: 'center',  justifyContent: 'center', marginRight: 10}}> 
                <FontAwesome5 name="users" size={24} color="#000000" /> 
              </View>
              <View>
                <Text style={{ fontSize: 14, fontWeight: 'semibold', color: '#000000',  marginBottom: 5, fontWeight: "bold" }}>{ user?.fullName } </Text> 
                <Text style={{ fontSize: 14, fontWeight: 'semibold', color: '#000000',  marginBottom: 5, }}>Become a MENTOR </Text> 
              </View>
            </View>
          </View>
        </View>


      <View className="w-full bg-white px-4 py-6 rounded-3xl flex-1 rounded-t-[50px] -mt-10">
        <View className="w-full px-4 py-4">
          <View className="w-full px-4 flex-row items-center justify-between py-3 rounded-xl border border-gray-200 space-x-3">
            {/* icons */}
            {/* <Ionicons name="chatbubbles" size={24} color={"#777"} /> */}

            {/* <TextInput
              className="flex-1 text-lg text-primaryText -mt-2  h-12 w-full"
              placeholder="Create a chat"
              placeholderTextColor={"#999"}
              value={addChat}
              onChangeText={(text) => setAddChat(text)}
            /> */}

                  


            {/* <TouchableOpacity onPress={createNewChat}>
              <FontAwesome name="send" size={24} color="#777" />
            </TouchableOpacity> */}

            <View style={{marginHorizontal: 20,  alignItems: "center"}} >
                <CustomInput placeholer="Maximum number of mentees" value={maxMentees}      setValue={setMaxMentees} secureTextEntry={false} keyboardType={"numeric"}/>
                <CustomInput placeholer="Field of interest"         value={interestField}   setValue={setInterestField} secureTextEntry={false} />
                <CustomButton text="Submit"  onPress={createNewChat}    bgColor="#ffefea" fgColor="#ee2400" lnColor="#ee2400"  lnWidth="2" btnLength={"60%"} />

                {/* <CustomInput placeholer="Email" value={email.replace(" ", "")} setValue={setEmail} secureTextEntry={false} /> */}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddToChatScreen;
