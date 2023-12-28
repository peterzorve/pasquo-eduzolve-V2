import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const CustomInput = ({value, setValue, placeholer, secureTextEntry, keyboardType, centerAlign=false}) => {
    return (
        <View style={styles.container}>
            <TextInput 
                keyboardType = {keyboardType}
                value={value}
                onChangeText={setValue}
                placeholder={placeholer} 
                style={[styles.input,
                    centerAlign ? {textAlign: "center"} : {}
                ]}
                secureTextEntry={secureTextEntry}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: "100%",
        borderColor: "#e8e8e8",
        borderWidth: 1, 
        borderColor: '#000',
        borderRadius: 10, 
        paddingHorizontal: 10, 
        marginVertical: 6, 
    },
    input: {
        padding: 15, 
    }
});


export default CustomInput