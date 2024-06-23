import {  StyleSheet, Text, View, Image, ActivityIndicator, ScrollView } from 'react-native';
import { useState } from 'react';
import Header from '../components/Header';


export default function MovieScreen({route}) {

       // UseState de chargement pendant le axios fetch
       const [loading, setLoading] = useState(true);


    const { movieData } = route.params;
    console.log(route)
    // console.log(movieData)


    const dateInFrenchFormat = (dateString) => {
        const date = new Date(dateString);

        const monthNames = [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ];
        
        const day = date.getDate();
        const month = monthNames[date.getMonth()]; //base 0 ici et dans monthNames donc pas besoin de +1
        const year = date.getFullYear();
        
        return `${day} ${month} ${year}`;
    };


 return (
   <View style={styles.container}>
     <Header/>
     <ScrollView style={styles.mainContainer}>
     <Text style={styles.title}>{movieData.title}</Text>
     <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movieData.poster_path}` }} style={styles.poster}
            alt={movieData.title}
            fadeDuration={1000}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            />
     <Text style={styles.releaseDate}>Date de sortie : {dateInFrenchFormat(movieData.release_date)}</Text>
     <Text style={styles.overview}><Text style={styles.description}>Description : </Text>{movieData.overview ? movieData.overview : 'Pas de description disponible'}</Text>


     
     </ScrollView>
   </View>
 );
}


const styles = StyleSheet.create({
    container : {
        flex :1,
    },
    mainContainer : {
        marginHorizontal : 10,
        marginVertical : 30,
    },
    title : {
        fontSize : 30,
        fontWeight : 'bold',
        textAlign : 'center',
    },
    overview : {
        marginVertical : 10,
        fontSize : 20,
        textAlign : 'justify',
    },
    poster: {
       height : 400,
       width : 300,
       alignSelf : 'center',
       borderRadius : 10,
    },
    releaseDate : {
        textDecorationLine : 'underline',
        fontSize : 15,
        marginTop : 12,
    },
    description: {
        fontWeight: 'bold',
    },

})