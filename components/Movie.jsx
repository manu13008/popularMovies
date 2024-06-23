import React, { useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
// import ErrorModal from '../components/ErrorModal'
import { useNavigation } from "@react-navigation/native";



export default function Movie(props) {


   
    const navigation = useNavigation();

    const [loading, setLoading] = useState(true);

    const handlePress = () => {
        // console.log('En savoir plus')
        navigation.navigate('Movie', {movieData : { 
            title : props.title, 
            poster_path : props.poster_path, 
            overview : props.overview,
            release_date : props.release_date}})
    };


    return (
        <View style={styles.containerStyle}>
           
            
           
            <Text style={styles.title}>{props.title}</Text>
            {loading && <ActivityIndicator style={styles.loading} size="large" color="#0000ff" /> } 
            <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${props.poster_path}` }} style={styles.poster}
            alt={props.title}
            fadeDuration={1000}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}/>
            
            <TouchableOpacity onPress={() => handlePress()} style={styles.more}><Text>En savoir plus</Text></TouchableOpacity>
            
            </View>
            
  
        
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        alignItems : 'center',
       justifyContent : 'center',
        paddingHorizontal: 20,
        borderRadius: 15,
        backgroundColor: '#f9f9f9',
        marginHorizontal : 3,
        marginTop : 10,
        borderWidth: 2,
        borderColor : 'steelblue',
        width: '47%',
        minHeight : 320,
        alignSelf: 'center',
        backgroundColor : 'lightblue',
    },
    title : {
        fontSize : 15,
        fontWeight : "bold",
        textAlign : 'center',
        marginBottom : 5,
    },
    poster : {
        width : 130,
        height : 200,
        borderRadius : 10,
    },
    more : {
        marginTop : 15,
        backgroundColor : 'dodgerblue',
        borderRadius : 10,
        alignItems :'center',
        width : '75%',
        padding : 5,
        borderWidth : 1,
        borderColor : 'black',

    },
    loading : {
        // paddingTop : 50,
    }

  
});