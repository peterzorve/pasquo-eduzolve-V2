import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import CustomButton from '../components/CustomButton'

import { ENGLISH1990 } from '../../english1990'
import { ICT2011 } from '../../assets/pastquestions/ict/ICT2011'





const userData = ICT2011

const PasQuoSecCScreen = () => {
    const [questions, setQuestions] = useState([])
    const [selectedOptions, setSelectedOptions] = useState({})
    const [score, setScore] = useState(0)
    const [showResults, setShowResults] = useState(false)


    useEffect(() => { 
        getQuestions()
    }, [])

    const getQuestions = () => {
        return ICT2011
    }

    const handleOptionSelect = (questionIndex, option) => {
        setSelectedOptions({
            ...selectedOptions,
            [questionIndex]: option,
        });
    };

    const handleSubmit = () => {

        console.log(extractQuetionNumber("peter12")) 


        let correctAnswers = 0;
        
        ICT2011.forEach((question, index) => {
        // .forEach((questions, index) => {
            // console.log(question, "===========", index)
            if (selectedOptions[index] === question.correctOption) {
                correctAnswers++;
            }
        })
        setScore(correctAnswers);
        setShowResults(true);
    }

    const extractQuetionNumber = (text) => { return text.replace(/^\D+/g, '')}

    return (
            <View style={styles.root}>
                <Text style={ styles.title }>English Language - 1993 </Text>

                  <FlatList
                    data={userData}
                    keyExtractor={(item, index) => index.toString()} 


                    ListFooterComponent={() => (
                        <>
                        <CustomButton text="Submit"  onPress={handleSubmit}  bgColor="#ffefea" fgColor="#ee2400" lnColor="#ee2400" lnWidth="1"  />
                        
                            { showResults && (
                                <View style={styles.result} >
                                    <Text 
                                        style={styles.resultText} 
                                    > 
                                        You scored {score} out of { ICT2011.length }
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.tryAgainButton}
                                        onPress={getQuestions}
                                    >
                                        <Text style={styles.tryAgainButtonText}>
                                            Try again
                                        </Text>

                                    </TouchableOpacity>
                                </View>
                            )}
                        {/* <CustomButton text="Submit"  onPress={handleSubmit}  bgColor="#ffefea" fgColor="#ee2400" lnColor="#ee2400" lnWidth="1"  /> */}
                        </>
                        
                      )}



                    renderItem={({ item, index }) => (
                        // <View style={styles.flatlist_view}>

                            <View style={styles.questionContainer} >
                                 {/* <Text style={styles.question}>{extractQuetionNumber(item.id)}</Text>  */}
                                <Text style={styles.question}>Q{extractQuetionNumber(item.id)}. {item.question}</Text> 


                                <TouchableOpacity
                                    style={[
                                        styles.option, 
                                        selectedOptions[index] === 1 && styles.selectedOptions, 
                                        showResults && item.correctOption === 1 && styles.correctOption,
                                        showResults && selectedOptions[index] === 1 && selectedOptions[index] !== item.correctOption && styles.wrongOption, 
                                    ]}
                                    onPress={() => { handleOptionSelect(index, 1) }}
                                    disabled={showResults}
                                >
                                    <Text style={styles.flatlist_description}>A. {item.A}</Text> 
                                </TouchableOpacity>


                                <TouchableOpacity
                                    style={[
                                        styles.option, 
                                        selectedOptions[index] === 2 && styles.selectedOptions, 
                                        showResults && item.correctOption === 2 && styles.correctOption,
                                        showResults && selectedOptions[index] === 2 && selectedOptions[index] !== item.correctOption && styles.wrongOption, 
                                    ]}
                                    onPress={() => { handleOptionSelect(index, 2) }}
                                    disabled={showResults}
                                >
                                    <Text style={styles.flatlist_description}>B. {item.B}</Text> 
                                </TouchableOpacity>


                                <TouchableOpacity
                                    style={[
                                        styles.option, 
                                        selectedOptions[index] === 3 && styles.selectedOptions, 
                                        showResults && item.correctOption === 3 && styles.correctOption,
                                        showResults && selectedOptions[index] === 3 && selectedOptions[index] !== item.correctOption && styles.wrongOption, 
                                    ]}
                                    onPress={() => { handleOptionSelect(index, 3) }}
                                    disabled={showResults}
                                >
                                    <Text style={styles.flatlist_description}>C. {item.C}</Text> 
                                </TouchableOpacity>


                                <TouchableOpacity
                                    style={[
                                        styles.option, 
                                        selectedOptions[index] === 4 && styles.selectedOptions, 
                                        showResults && item.correctOption === 4 && styles.correctOption,
                                        showResults && selectedOptions[index] === 4 && selectedOptions[index] !== item.correctOption && styles.wrongOption, 
                                    ]}
                                    onPress={() => { handleOptionSelect(index, 4) }}
                                    disabled={showResults}
                                >
                                    <Text style={styles.flatlist_description}>D. {item.D}</Text> 
                                </TouchableOpacity> 

                            </View>
                    )} 
                /> 
            </View>

    )
  }

const styles = StyleSheet.create({ 

    root:{ 
        alignItems: "center",  
        marginBottom: 20,  
        padding: 10
    },
        
    title: { 
        fontSize: 16, 
        padding:3,    
        color: "blue",  
        fontWeight: 'bold' 
    },

      questionContainer: {
        borderColor: "#ffffff", 
        borderWidth: 5,
        backgroundColor: "#f5f5f5",
        borderRadius: 10, 
        marginBottom: 5, 
        padding: 10, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2}, 
        shadowOpacity: 0.25, 
        shadowRadius: 3.84, 
        elevation: 5
      }, 

      question: {
        fontSize: 12, 
        fontWeight: "bold", 
        marginVertical: 3
      }, 
      option: {
        backgroundColor: "#eee", 
        padding: 3, 
        marginVertical: 2
      }, 
      selectedOptions: {
        backgroundColor: "#949494"
      }, 
      correctOption: {
        backgroundColor:  "#65a765" // "green"
      }, 
      wrongOption: {
        backgroundColor: "#FF4F4B" //"red"
      },
      submitButton: {
        backgroundColor: "blue", 
        padding: 10, 
        marginVertical: 10, 
        borderRadius: 5
      }, 
      submitButtonText:{
        color: "#fff", 
        fontSize: 20
      },
      result: {
        alignItems: "center", 
        justifyContent: "center"
      }, 
      resultText: {
        fontSize: 20, 
        fontWeight: "bold", 
        marginVertical: 10,
      }, 
      tryAgainButton: {
        backgroundColor: "blue", 
        padding: 10, 
        marginVertical: 10, 
        borderRadius: 5,
      }, 

      tryAgainButtonText: {
        color: "#fff", 
        fontSize: 20
      }


  
}); 


export default PasQuoSecCScreen;   