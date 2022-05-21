import React from 'react';
import {View, Text,Pressable} from 'react-native';
import Connection from './Connection';
import Styles from './style';

export default function App(){
    const SocketConnected=Connection()
    
    return(
        <View style={Styles.container}>
            <Pressable style={Styles.buttonA} onPress={()=>{SocketConnected.emit('ButtonPress',"A")}}>
                <Text>A</Text>
            </Pressable>
            <Pressable style={Styles.buttonA} onPress={()=>{SocketConnected.emit('ButtonPress',"1")}}>
                <Text>1</Text>
            </Pressable>
            <Pressable style={Styles.buttonA} onPress={()=>{SocketConnected.emit('ButtonPress',"2")}}>
                <Text>2</Text>
            </Pressable>
        </View>
    );
}