import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from "react-native";

const ActivityComponent = ({ header, content, time }) => {
    // Your component logic goes here

    return (
        <View style={styles.item}>
            <Text style={styles.header}>
                {header}
            </Text>
            <Text >
                {content}
            </Text>
            <Text>
                {time}
            </Text>

        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#F14545',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
    },
    header: {
        fontSize: 24,
        color: '#fff',
    },
});

export default ActivityComponent;