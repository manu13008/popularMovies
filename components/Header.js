import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 

const Header = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Détails</Text>
            <View style={styles.emptyContainer} /> 
        
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent : 'space-between',
        backgroundColor: 'cadetblue',
        padding: 15,
        borderBottomColor : 'cadetblue',
        borderBottomWidth : 4,

    },

    headerTitle: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        // flex : 1,
        // textAlign : 'center',
    },
});

export default Header;
