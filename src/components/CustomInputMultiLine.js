import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const CustomInputMultiLine = ({value, setValue, placeholer, secureTextEntry, minHeight, length}) => {

   
    
    return (
        <View style={styles.container}>
            <TextInput 
                value={value}
                multiline={true}
                onChangeText={setValue}
                placeholder={placeholer} 
                style={[styles.input, 
                    length ? {width: length, minWidth: length} : {width: "100%", minWidth: "100%"},
                    minHeight? {minHeight: minHeight} : {}
                
                ]}
                secureTextEntry={secureTextEntry}
            />
            
        </View>
    )
}       


const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        // width: "100%",
         
        borderColor: "#e8e8e8",
        borderWidth: 1, 
        borderColor: '#000',
        borderRadius: 10, 
        // paddingHorizontal: 5, 
        // marginVertical: 5, s
        margin: 5,
        // minHeight: 300
        // height: "30%", 
        // multi

    },

    input: {
        paddingLeft: 10
    }
});


export default CustomInputMultiLine