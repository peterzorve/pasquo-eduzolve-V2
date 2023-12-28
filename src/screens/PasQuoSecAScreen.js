import React, { useState, useEffect } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, FlatList, TouchableOpacity, ImageBackground } from 'react-native'

import CustomButton from '../components/CustomButton'
import { allSUBJECTS, yearsENGLISH, yearsFRENCH, yearsICT, yearsMATHS, yearsSCIENCE, yearsSOCIAL } from '../../assets/pastquestions/subjectsAndYears';
import { questionDatabases } from '../../assets/pastquestions/questionsDatabase';



const PasQuoSecAScreen = () => {
    const [questions, setQuestions] = useState([])
    const [selectedOptions, setSelectedOptions] = useState({})
    const [score, setScore] = useState(0)
    const [showResults, setShowResults] = useState(false)
    const [subject, setSubject] = useState(null);
    const [year, setYear] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [start, setStart] = useState(true) 
    const [submitBtnText, setSubmitBtnText] = useState("Submit")


    const handleOptionSelect = (questionIndex, option) => {
        setSelectedOptions({ ...selectedOptions, [questionIndex]: option, });
    };


    const handleSubmit = () => { 
        if (submitBtnText === "Submit") {
            let correctAnswers = 0;        
            questions.forEach((question, index) => {
                if (selectedOptions[index] === question.correctOption) {  correctAnswers++;   }
            })
            setScore(correctAnswers);
            setShowResults(true);
            setSubmitBtnText("Try again")
        }
        else if (submitBtnText === "Try again") {
            setSelectedOptions({});
            setScore(0);
            setShowResults(false);
            setSubmitBtnText("Submit")
        }
    }

    const closeQuestionsBtn = () => {
        setStart(true)
        setSubject(null)
        setYear(null)
        setSelectedOptions({});
        setScore(0);
        setShowResults(false);
        setSubmitBtnText("Submit")
    }

    const extractQuetionNumber = (text) => { return text.replace(/^\D+/g, '')  }


    const startQuestions = () => {
        if (subject, year) { return true  }
        else { return false  }
    }



    const startButton = () => { 
        // console.log(longString.replace(/^\s+/gm, ''))

        if  ( subject === "English Language")   { setQuestions(questionDatabases["ENGLISH" + year]);  }
        else if ( subject === "French") {  setQuestions(questionDatabases["FRENCH" + year]); }
        else if ( subject === "Information Commnication Technology")    {  setQuestions(questionDatabases["ICT" + year]); }
        else if ( subject === "Mathematics")    {  setQuestions(questionDatabases["MATHS" + year]); }
        else if ( subject === "Integrated Science") { setQuestions(questionDatabases["SCIENCE" + year]);  }
        else if ( subject === "Social Studies") {  setQuestions(questionDatabases["SOCIAL" + year]); }
        setStart(false)
    }


    // (subject === "English Language") ? yearsENGLISH : (subject === "French") ? yearsFRENCH :  (subject === "Information Commnication Technology") ?  yearsICT:(subject === "Mathematics") ?   yearsMATHS:(subject === "Integrated Science") ?   yearsSCIENCE: (subject === "Social Studies") ?  yearsSOCIAL : null 

    return ( 
        <ImageBackground source={require('../../assets/background/backdround1.jpg')} style={styles.backgroundImage} >
        <>
             { start ? (
                    <View style={styles.root}>
                        
                        {start === false ?  <Text style={ styles.title }>{subject} - {year} </Text>  : null} 
                        <View style={styles.theme_view}>
                            <Text style={styles.titleEduZolve}>SECTION A - OBJECTIVES</Text>
                            <Text style={styles.theme}>This section is the objectives part of the part. For an interactive app, the format for the question might be different from the original paper. However, the questions and the options are the same as those of the original paper. </Text>
                            <Text style={styles.theme}>After answering the questions, you press the submit button to display your solution. The correct answers will be marked as green whereas the incorrect answers will marked as red. </Text>
                            <Text style={styles.themeText}>You need to select the subject and year to proceed</Text>
                        </View>
                        <View style={styles.horizontal}>
                            <Dropdown
                                style={[styles.dropdown, styles.dropdownSubject, isFocus && { borderColor: 'blue' }]}
                                data={allSUBJECTS}
                                search
                                maxHeight={400}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Subject' : '...'}
                                searchPlaceholder="Search..."
                                value={subject}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => { setSubject(item.value); setIsFocus(false);   }}
                            />
                        
                            <Dropdown
                                style={[styles.dropdown, styles.dropdownYear, isFocus && { borderColor: 'blue' }]}
                                // data={ (subject === "Information Commnication Technology") ? yearsICT : (subject === "French")? yearsFRENCH : yearsENGLISH }
                                data={ (subject === "English Language") ? yearsENGLISH : (subject === "French") ? yearsFRENCH :  (subject === "Information Commnication Technology") ?  yearsICT : (subject === "Mathematics") ?   yearsMATHS : (subject === "Integrated Science") ?   yearsSCIENCE: (subject === "Social Studies") ?  yearsSOCIAL : yearsICT  }
                                search
                                maxHeight={400}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Year' : '...'}
                                searchPlaceholder="Search..."
                                value={year}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => { setYear(item.value); setIsFocus(false);   }}
                            />
                        </View> 
                        {startQuestions() ? <CustomButton text="Start"  onPress={startButton}  bgColor="#ffefea" fgColor="#ee2400" lnColor="#ee2400" lnWidth="1"  />  : null}
                    </View>

                ) 
                : 
                (
                    <View style={styles.root}>

                   

                    <View style={styles.titleView} >
                        <Text style={ styles.title }>{subject} - {year} </Text>
                    </View>
    
                      <FlatList
                        data={questions}
                        keyExtractor={(item, index) => index.toString()} 
                        ListFooterComponent={() => (
                            <>

                                { showResults && (
                                        <View style={styles.result} >
                                            <Text  style={styles.resultText}>Score:  {score} / { questions.length } </Text>
                                        </View>
                                    )}


                                    {/* <CustomButton text="Submit" onPress={handleSubmit}  bgColor="#ffefea" fgColor="#ee2400" lnColor="#ee2400" lnWidth="1"  /> */}
                                    <CustomButton text={submitBtnText} onPress={handleSubmit}  bgColor="#DDF2D1" fgColor="#285d09" lnColor="#285d09" lnWidth="1"  />
                                


                                    { showResults && (
                                        // <View style={styles.result} >
                                            <CustomButton text="Go back" onPress={closeQuestionsBtn}  bgColor="#ffefea" fgColor="#ee2400" lnColor="#ee2400" lnWidth="1"  />
                                        // </View>
                                    )}


                            </>
                          )}
    
                        renderItem={({ item, index }) => (
                                <View style={styles.questionContainer} >
                                    <Text style={styles.question}>Que. {extractQuetionNumber(item.id)}. {item.question}</Text> 
    
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
        </>
        </ImageBackground>
    )
  }






const styles = StyleSheet.create({ 

    root: { 
        alignItems: "center",  
        marginBottom: 40,  
        padding: 10, 
        // backgroundColor: "#666362"
    },

    // title: { fontSize: 19,  margin: 10,    color: "blue",  fontWeight: 'bold', marginTop: 2  },

    titleEduZolve: {fontSize: 19,  margin: 10,    color: "red",  fontWeight: 'bold', marginTop: 2 },
  theme: {fontSize: 14, marginLeft: 10, color: "black", margin:4}, 
  themeText: {marginLeft: 10, marginBottom: 15, fontSize: 13, fontWeight: "bold", marginTop:5}, 
  subTitle1: { fontSize: 18,  margin: 10,    color: "red",  fontWeight: 'bold', marginTop: 2  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
    // backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
    title: { 
        fontSize: 16, 
        padding:10,    
        color: "#e6ac0e",  
        fontWeight: 'bold', 
        marginBottom: 5, 
        // backgroundColor: "black", 
        width: "100%", 
        textAlign: "center", 
        borderRadius: 20
        
    },

    theme_view: {
        padding: 12,
        alignItems: 'left', 
        width: "100%",
        minWidth: "100%",
        backgroundColor: "#fae9ea",
        marginVertical: 5,
        borderColor: "black", 
        borderWidth: 0.5,
        borderRadius: 8,
        },

    horizontal: {
        flexDirection: 'row', 
      },

    dropdownSubject: {
        width: "70%", 
      },



    dropdown: {
        height: 40,
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 10,
        // width: "50%", 
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
        margin: 5, 
      },

      dropdownYear: {
        width: "22%", 
      },
      dropdownSubject: {
        width: "75%", 
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
        marginVertical: 2, 
        borderRadius: 10,
        paddingLeft: 10
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
        justifyContent: "center", 
        alignContent: "center", 
        alignItems: "center",
        borderRadius: 10,
        borderColor: "#063b00",
        borderWidth: 4,
        // backgroundColor: "#65a765",
      }, 

    resultText: {
        fontSize: 20, 
        fontWeight: "bold", 
        marginVertical: 10,
        // backgroundColor: "#65a765", 
        padding: 10, 
        color: "#063b00", 
        borderRadius: 10, 
        paddingHorizontal: 30, 
        textAlign: 'center',
        width: "100%", 
        // borderWidth: 4, 
        borderColor: "#063b00",
        

      }, 

    tryAgainButton: {
        backgroundColor: "blue", 
        padding: 10, 
        marginVertical: 10, 
        borderRadius: 5,
      }, 

    tryAgainButtonText: {
        color: "#fff", 
        fontSize: 20,
      } , 

      titleView: {
        width: "95%", 
        minWidth: "95%",
        borderRadius: 30, 
        borderWidth: 2,
        backgroundColor: "black", 
        marginBottom: 5
      }
}); 


export default PasQuoSecAScreen;   