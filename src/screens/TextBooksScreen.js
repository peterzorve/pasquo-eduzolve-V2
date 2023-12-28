import React, { useState, useEffect } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, FlatList, TouchableOpacity, Dimensions, ImageBackground  } from 'react-native'

import CustomButton from '../components/CustomButton'


import { allSUBJECTS, yearsENGLISH, yearsFRENCH, yearsICT, yearsMATHS, yearsSCIENCE, yearsSOCIAL } from '../../assets/pastquestions/subjectsAndYears';
import { questionDatabases } from '../../assets/pastquestions/questionsDatabase';
import { mathsChapters } from '../../assets/textbooks/subjectsAndChapters';


// import { chapeter1Sets } from '../../assets/textbooks/maths/chapter1Sets';
import { chapeter1Sets } from '../../assets/textbooks/maths/chapter1Sets';



const TextBooksScreen = () => {
    const [questions, setQuestions] = useState([])
    const [selectedOptions, setSelectedOptions] = useState({})
    const [score, setScore] = useState(0)
    const [showResults, setShowResults] = useState(false)
    const [subject, setSubject] = useState(null);
    const [year, setYear] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [start, setStart] = useState(true) 
    const [submitBtnText, setSubmitBtnText] = useState("Show solutions")
    // const [showSholution, setShowSolution] = useState(false)





    const handleOptionSelect = (questionIndex, option) => {
        setSelectedOptions({
            ...selectedOptions,
            [questionIndex]: option,
        });
    };

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


    // const { width, height } = Dimensions.get('window');
    // const imageSize = 0.8 * width;


    const startButton = () => { 
        if      ( subject === "English Language")   { setQuestions( chapeter1Sets );  }
        else if ( subject === "French") {  setQuestions( chapeter1Sets ); }
        else if ( subject === "Information Commnication Technology")    {  setQuestions( chapeter1Sets ); }
        else if ( subject === "Mathematics")    {  setQuestions( chapeter1Sets ); }
        else if ( subject === "Integrated Science") { setQuestions( chapeter1Sets );  }
        else if ( subject === "Social Studies") {  setQuestions( chapeter1Sets ); }
        setStart(false)
    }

    // const image1 = (text) => { "'" + text +  "'"}

    return ( 
        <ImageBackground source={require('../../assets/background/backdround1.jpg')} style={styles.backgroundImage} >

             { start ? (
                    <View style={styles.root}>
                        {start === false ?  <Text style={ styles.title }>{subject} - {year} </Text>  : null}
                        
                        <View style={styles.theme_view}>
                            <Text style={styles.titleEduZolve}>TEXTBOOKS</Text>
                            <Text style={styles.theme}>This section is the objectives part of the part. For an interactive app, the format for the question might be different from the original paper. However, the questions and the options are the same as those of the original paper. </Text>
                            <Text style={styles.theme}>After answering the questions, you press the submit button to display your solution. The correct answers will be marked as green whereas the incorrect answers will marked as red. </Text>
                            <Text style={styles.themeText}>You need to select the subject and year to proceed</Text>
                        </View>

                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                            data={allSUBJECTS}
                            search
                            maxHeight={400}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Select subject' : '...'}
                            searchPlaceholder="Search..."
                            value={subject}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => { setSubject(item.value); setIsFocus(false);   }}
                        />
                    
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                            // data={ (subject === "Information Commnication Technology") ? yearsICT : (subject === "French")? yearsFRENCH : yearsENGLISH }
                            data={ (subject === "English Language") ? mathsChapters : (subject === "French") ? mathsChapters :  (subject === "Information Commnication Technology") ?  mathsChapters : (subject === "Mathematics") ?   mathsChapters : (subject === "Integrated Science") ?   mathsChapters: (subject === "Social Studies") ?  mathsChapters : mathsChapters  }
                            search
                            maxHeight={400}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Select year' : '...'}
                            searchPlaceholder="Search..."
                            value={year}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => { setYear(item.value); setIsFocus(false);   }}
                        />
                        {startQuestions() ? <CustomButton text="Start"  onPress={startButton}  bgColor="#ffefea" fgColor="#ee2400" lnColor="#ee2400" lnWidth="1"  />  : null}
                    </View>
                ) 
                : 
                (
                    <View style={styles.root}>
                    {/* <Text style={ styles.title }>{subject} - {year} </Text> */}

                    
                    <View style={styles.titleView} >
                        <Text style={ styles.title }>{subject} - {year} </Text>
                    </View>

                    <CustomButton text="Go back" onPress={closeQuestionsBtn}  bgColor="#ffefea" fgColor="#ee2400" lnColor="#ee2400" lnWidth="1"  />
    
                      <FlatList
                        data={questions}
                        keyExtractor={(item, index) => index.toString()} 
                        ListFooterComponent={() => (
                            <>


                                    
                                    {/* <CustomButton text={submitBtnText} onPress={handleSubmit}  bgColor="#DDF2D1" fgColor="#285d09" lnColor="#285d09" lnWidth="1"  /> */}
                                


                                    {/* { showResults && ( */}
                                            
                                    {/* )} */}


                            </>
                          )}
    
                        renderItem={({ item, index }) => (
                                <View style={styles.questionContainer} >
                                    { ( item.topic )            && ( <Text style={styles.topic}>{index + 1}: {item.topic} </Text>  ) }
                                    { ( item.definition )       && ( <Text style={styles.definition}>{item.definition}</Text>  ) }

                                    { ( item.image1 )           && ( <Text style={styles.imageText}>Diagram</Text>  ) }
                                    { ( item.image1 )           && ( <Image source={ require( '../../assets/textbooks/maths/mathsDiagrams/diagram1.png' ) }  style={styles.image} />  ) }

                                    { ( item.image2 )           && ( <Text style={styles.imageText}>Diagram </Text>  ) }
                                    { ( item.image2 )           && ( <Image source={ require("../../assets/textbooks/maths/mathsDiagrams/diagram6.png")}  style={styles.image} />  ) }
                                    {/* { ( item.image2 )           && ( <ImageBackground  source={require('../../assets/textbooks/maths/mathsDiagrams/diagram6.png')} style={styles.backgroundImage} ></ImageBackground>  ) } */}

                                    { ( item.workedExample1 )   && ( <Text style={styles.workedExample}>Worked Example</Text>  ) }
                                    { ( item.workedExample1 )   && ( <Text style={styles.workedExample1}>{item.workedExample1}</Text>  ) }

                                    { ( item.solution1 )        && ( <Text style={styles.solution}>Solution</Text>  ) }
                                    { ( item.solution1 )        && ( <Text style={styles.solution1}>{item.solution1}</Text>  ) }

                                    { ( item.workedExample2 )   && ( <Text style={styles.workedExample}>Worked Example</Text>  ) }
                                    { ( item.workedExample2 )   && ( <Text style={styles.workedExample2}>{item.workedExample2}</Text>  ) }

                                    
                                    { ( item.solution2 )        && ( <Text style={styles.solution}>Solution</Text>  ) }
                                    { ( item.solution2 )        && ( <Text style={styles.solution1}>{item.solution2}</Text>  ) }
                                </View>
                                
                            )} 
                        /> 
                    </View>
                )   
            }
       </ImageBackground>
    )
  }




  const dimensions = Dimensions.get('window');   
  const imageWidth = dimensions.width * 0.5;
  const imageHeight = dimensions.height;

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
        
    theme_view: {
        padding: 12,
        alignItems: 'left', 
        width: "100%",
        minWidth: "100%",
        // backgroundColor: "#fae9ea",
        marginVertical: 5,
        borderColor: "black", 
        borderWidth: 0.5,
        borderRadius: 8,
        },

 
        topic: {
            fontSize: 22, 
            fontWeight: "bold",
            marginTop: 10, 
            padding: 3

        },
        definition: {
            padding: 3,
            paddingLeft: 5
        },

        imageText: {
            fontWeight: "bold",
            marginVertical: 15
        }, 

        image: {
            // width: "90%",
            // resizeMode: 'contain',
            width: '100%',
            // height: "100%",
            resizeMode: 'contain',
            backgroundColor: 'black',
            padding: 0
        }, 



        workedExample: {
            fontWeight: "bold",
            marginVertical: 10
        }, 
        workedExample1: {},

        solution: {
            fontWeight: "bold",
            marginVertical: 10
        },
        solution1: {},
        workedExample2: {},
        workedExample2: {},




 
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

    titleView: {
        width: "100%", 
        minWidth: "95%",
        borderRadius: 10, 
        borderWidth: 2,
        backgroundColor: "black", 
        marginBottom: 5
      },

    dropdown: {
        height: 40,
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 10,
        width: "100%", 
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
        margin: 5, 
      },

    questionContainer: {
        borderColor: "#ffffff", 
        // borderWidth: 2,
        // backgroundColor: "#f5f5f5",
        borderRadius: 5, 
        marginBottom: 5, 
        padding: 3, 
        marginHorizontal: 5
      }, 

      backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch' or 'contain'
        // backgroundColor: 'rgba(255, 255, 255, 0.5)',
      },

  
}); 


export default TextBooksScreen;   

  