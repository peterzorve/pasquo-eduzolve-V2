import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';



const CustomButton = ({onPress, text, disabled=false, bgColor, fgColor, lnColor, lnWidth, btnLength, maxHeight}) => {
  return (
    <Pressable 
        onPress={onPress} 
            disabled={disabled}
            style={[ 
                styles.container, 
                bgColor ? {backgroundColor: bgColor} : {}, 
                lnColor ? {borderColor: lnColor} : {}, 
                lnWidth ? {borderWidth: lnWidth} : {}, 
                btnLength ? {width: btnLength, minWidth: btnLength} : {width: "100%", minWidth: "100%"},
                maxHeight ? {maxHeight: maxHeight, maxHeight: maxHeight} : {maxHeight: "100%", maxHeight: "100%"}
            ] }>
        <Text 
            style={[
                styles.text, 
                fgColor ? {color: fgColor} : {}            
            ]}> {text} </Text>
    </Pressable>
  );
};


const styles = StyleSheet.create({
    container: {
        // width: "80%", 
        padding: 12, 
        marginVertical: 5, 
        alignItems: "center", 
        borderRadius: 10,
        // minWidth: "80%"
    }, 

    text: {
        fontWeight: "bold", 
        color: "white",
    }, 
});

export default CustomButton