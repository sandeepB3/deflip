import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';


const WelcomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>
                WelcomeScreen
            </Text>
        </SafeAreaView>
    );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    }
})