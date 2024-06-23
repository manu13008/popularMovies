import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';

// Requete HTTP
import axios from 'axios';

//Import du composant Movie
import Movie from '../components/Movie';

// API_KEY  
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;


// Par bonne pratique de sécurité, j'ai mis l'API KEY dans le .env.
// Au cas où vous en auriez besoin, la voici.
// API_KEY = Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MmZjYzc0ODYxNDFkMWI1YmM0MjIxMzNiZDYwZDU2YyIsInN1YiI6IjY2NzQ4MjM3MTFiNzgxMGJkMjBlOTBlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mOosiQVoZItb09KI_UFrtun713U2bgDxKPykxW9nld8



export default function HomeScreen({ navigation }) {


    //Données des films
    const [movies, setMovies] = useState([]);

    // UseState de chargement pendant le axios fetch
    const [loading, setLoading] = useState(true);

    // Automatic Scroll en bout de page
    const [loadingMore, setLoadingMore] = useState(false);

    // Initialisation du numéro de page à 1 
    const [page, setPage] = useState(1);

    // Chargement des données à l'arrivée sur l'application et à chaque fois que l'utilisateur
    //atteint la fin de la page, rechargement d'une nouvelle page de données (20 films par page)
    useEffect(() => {
        if (page === 1) {
            setLoading(true)
        }
        getPopularMovies(page);
    }, [page]);


//Fonction qui permet de récupérer des films par tranche de 20 films sur l'API TMDB (themoviedatabase)
    const getPopularMovies = async (page) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=${page}}`, {
                headers: {
                    'Authorization': API_KEY,
                    'accept': 'application/json'
                }
            }
            )
            if (response.data) {
                setMovies([...movies, ...response.data.results])
                setLoading(false)
                setLoadingMore(false)

            } else {
                console.log('No data found. Are you sure you requested realiable data ?')
            }
        }
        // Catch de l'erreur et de son message
        catch (error) {
            console.log("Message d'erreur:", error);
        }
        // Je montre quoi qu'il arrive que j'ai tenté d'exécuter la requête
        finally {
            setLoading(false)
            setLoadingMore(false)
            console.log('Request Popular Movies Done')
        }

    }


    // console.log(movies.length)


    // Mise en forme des données de la requête en composant Movie
    const renderMoviesData = movies.map((item, i) => (
        <Movie key={i}
            title={item.original_title}
            poster_path={item.poster_path}
            overview={item.overview}
            release_date={item.release_date}
        />

    ));


    // Fonction qui permet de savoir que l'utilisateur arrive en bas de la page
    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    };


    return (


        <ScrollView
            onMomentumScrollEnd={({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent)) {
                    setLoadingMore(true)
                    setPage(page + 1);
                }
            }}
        >
            <View style={styles.container}>
                <Text style={styles.welcome}> Welcome to Popular Movies ! </Text>
                <Text style={styles.welcome2}>Ici vous trouverez une suggestion de films populaires</Text>



                <View style={styles.moviesContainer}>
                    {loading ? (
                        <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
                    ) : (
                        renderMoviesData.length > 0 ? (
                            renderMoviesData // Affiche renderMoviesData s'il est défini sinon renvoie le texte d'erreur en dessous
                        ) : (
                            <Text style={styles.noDataText}> Une erreur est survenue. Aucun film à afficher pour le moment. Veuillez réessayer ultérieurement.</Text>
                        )
                    )}
                </View>

             {/* /* Cela me permet d'avoir un peu d'espace pour permettre à l'utilisateur de scroller vers le bas */ }
                <View style={styles.bottomSpacer} > 
                    {loadingMore && <ActivityIndicator style={styles.loadingMore} size="large" color="#0000ff" />}
                </View>


            </View>
        </ScrollView>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'cadetblue',
    },
    moviesContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        borderRadius: 5,
        backgroundColor: 'cadetblue',
    },
    welcome: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'black',
        marginTop: 10,
        backgroundColor: "red",
        width: '70%',
        paddingVertical: 10,
    },
    welcome2: {
        textAlign: 'center',
        width: '80%',
        fontSize: 16,
        marginVertical: 10,
    },
    loading: {
        marginVertical: 20,
        marginTop: 200,
    },
    loadingMore: {
        marginBottom: 200,
    },
    bottomSpacer: {
        height: 50,
    },
    noDataText: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 100,
        marginHorizontal: 20,
    }
})


