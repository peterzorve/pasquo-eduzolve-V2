import React, { useState, useEffect } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, FlatList, TouchableOpacity, ImageBackground } from 'react-native'

import CustomButton from '../components/CustomButton'


import { allSUBJECTS, yearsENGLISH, yearsFRENCH, yearsICT, yearsMATHS, yearsSCIENCE, yearsSOCIAL } from '../../assets/pastquestions/subjectsAndYears';
import { questionDatabases } from '../../assets/pastquestions/questionsDatabase';

import { socialSectionB1990 } from '../../assets/pastquestions/socialSectionB/socialSectionB1990';



const PasQuoSecBScreen = () => {
    const [questions, setQuestions] = useState([])
    const [selectedOptions, setSelectedOptions] = useState({})
    const [score, setScore] = useState(0)
    const [showResults, setShowResults] = useState(false)
    const [subject, setSubject] = useState(null);
    const [year, setYear] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [start, setStart] = useState(true) 
    const [submitBtnText, setSubmitBtnText] = useState("Show solutions")
    const [showSholution, setShowSolution] = useState(false)





    // const handleOptionSelect = (questionIndex, option) => {
    //     setSelectedOptions({
    //         ...selectedOptions,
    //         [questionIndex]: option,
    //     });
    // };

    const handleSubmit = () => { 
        if (submitBtnText === "Show solutions") {
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
            setSubmitBtnText("Show solutions")
        }
        
    }

    const closeQuestionsBtn = () => {
        setStart(true)
        setSubject(null)
        setYear(null)
        setSelectedOptions({});
        setScore(0);
        setShowResults(false);
        setSubmitBtnText("Show solutions")
    }

    const extractQuetionNumber = (text) => { return text  }


    const startQuestions = () => {
        if (subject, year) { 
            return true 
        }
        else { 
            return false 
        
        }
    }



    const startButton = () => { 
        // console.log(longString.replace(/^\s+/gm, ''))


        if  ( subject === "English Language")   { setQuestions( socialSectionB1990 );  }
        else if ( subject === "French") {  setQuestions( socialSectionB1990 ); }
        else if ( subject === "Information Commnication Technology")    {  setQuestions( socialSectionB1990 ); }
        else if ( subject === "Mathematics")    {  setQuestions( socialSectionB1990 ); }
        else if ( subject === "Integrated Science") { setQuestions( socialSectionB1990 );  }
        else if ( subject === "Social Studies") {  setQuestions( socialSectionB1990 ); }
        setStart(false)

    }


    return ( 
        <ImageBackground source={require('../../assets/background/backdround1.jpg')} style={styles.backgroundImage} >
        <>
             { start ? (
                    <View style={styles.root}>
                        {start === false ?  <Text style={ styles.title }>{subject} - {year} </Text>  : null}
                        <View style={styles.theme_view}>
                            <Text style={styles.titleEduZolve}>SECTION B - THEORY </Text>
                            <Text style={styles.theme}>The format of the section B is slightly different from the original question. Notwithstanding, the questions are the same.  </Text>
                            <Text style={styles.theme}>We recommend you answer the questions on your own first, then press the show solution button to check the correct answers.</Text>
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




                                    
                                    <CustomButton text={submitBtnText} onPress={handleSubmit}  bgColor="#DDF2D1" fgColor="#285d09" lnColor="#285d09" lnWidth="1"  />
                                


                                    { showResults && (
                                            <CustomButton text="Go back" onPress={closeQuestionsBtn}  bgColor="#ffefea" fgColor="#ee2400" lnColor="#ee2400" lnWidth="1"  />
                                    )}


                            </>
                          )}
    
                        renderItem={({ item, index }) => (
                                <View style={styles.questionContainer} >

                                    <View style={styles.horizontal}>
                                        <Text style={styles.questionNumber}>{ item.questionNumber.replace("Question ", "") }</Text> 
                                        <Text style={styles.question}>{item.question}</Text> 
                                    </View>

                                    { showResults && ( <Text style={styles.solutionHeader}>Solution</Text>  )}
                                    { showResults && ( <Text style={styles.solution}>{item.solution}</Text> )}

                                    {/* <View style={styles.horizontal}>
                                        <Text style={styles.text1}>Text 1</Text>
                                        <Text style={styles.text2}>Text 2 Text 2 Text 2 Text 2 Text 2 Text 2 Text 2 Text 2 Text 2 Text 2 Text 2 Text 2 </Text>
                                    
                                    </View> */}


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
        padding: 10
    },
    titleEduZolve: {fontSize: 19,  margin: 10,    color: "red",  fontWeight: 'bold', marginTop: 2 },
  theme: {fontSize: 14, marginLeft: 10, color: "black", margin:4}, 
  themeText: {marginLeft: 10, marginBottom: 15, fontSize: 13, fontWeight: "bold", marginTop:5}, 
  subTitle1: { fontSize: 18,  margin: 10,    color: "red",  fontWeight: 'bold', marginTop: 2  },

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch' or 'contain'
        // backgroundColor: 'rgba(255, 255, 255, 0.5)',
      },

    horizontal: {
        flexDirection: 'row', 
      },

 

 

    questionNumber: {
        marginVertical: 3,
        padding: 2,
        paddingHorizontal: 5
    }, 

    question: {
        marginVertical: 3,
        paddingHorizontal: 5, 
        flex: 1, 
        flexWrap: 'wrap',
      }, 

    solutionHeader: {
        fontWeight: "bold",
        paddingTop: 5, 
        paddingHorizontal: 5, 
        color: "red"
      },

    solution: {
        marginVertical: 3, 
        paddingLeft: 5, 
        paddingBottom: 5
      },

      horizontal: {
        flexDirection: 'row', 
      },

    title: { 
        fontSize: 16, 
        padding:10,    
        color: "#e6ac0e",  
        fontWeight: 'bold', 
        marginBottom: 5, 
        // backgroundColor: "black", 
        width: "100%", 
        textAlign: "center"
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

    dropdown: {
        height: 40,
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 10,
        // width: "100%", 
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
        margin: 5, 
      },
      dropdownYear: {
        width: "22%", 
      },
      dropdownSubject: {
        width: "76%", 
      },

    questionContainer: {
        borderColor: "#ffffff", 
        borderWidth: 2,
        // backgroundColor: "#f5f5f5",
        borderRadius: 5, 
        marginBottom: 5, 
        padding: 3, 
        marginHorizontal: 5
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


export default PasQuoSecBScreen;   

// export default PasQuoSecBScreen;   