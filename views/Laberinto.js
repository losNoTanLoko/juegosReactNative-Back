import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const GRID_SIZE = 10;
const MAZE = [
  [0,1,0,0,0,1,0,0,0,0],
  [0,1,0,1,0,1,0,1,1,0],
  [0,0,0,1,0,0,0,1,0,0],
  [1,1,0,1,1,1,0,1,0,1],
  [0,0,0,0,0,0,0,0,0,1],
  [0,1,1,1,1,1,1,1,0,0],
  [0,0,0,0,0,0,0,1,0,1],
  [1,1,1,1,1,1,0,1,0,0],
  [0,0,0,0,0,0,0,1,1,0],
  [0,1,1,1,0,0,0,0,0,0],
];
const START = { x:0, y:0 };
const END = { x:9, y:9 };

export default function Laberinto({ navigation }) {
  const [player, setPlayer] = useState(START);
  const [username, setUsername] = useState('');
  const [score, setScore] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    AsyncStorage.getItem('username').then(user => {
      if (!user) navigation.replace('Login');
      else setUsername(user);
    });

    timerRef.current = setInterval(() => setScore(s => s + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  if (!username) return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#222'}}>
      <Text style={{color:'#fff'}}>Cargando...</Text>
    </View>
  );

  const movePlayer = (dx, dy) => {
    const newX = player.x + dx;
    const newY = player.y + dy;
    if (newX>=0 && newX<GRID_SIZE && newY>=0 && newY<GRID_SIZE && MAZE[newY][newX]===0){
      const newPos = {x:newX, y:newY};
      setPlayer(newPos);

      if(newPos.x===END.x && newPos.y===END.y){
        clearInterval(timerRef.current);
        Alert.alert('¡Ganaste!', `Jugador: ${username}\nPuntaje: ${score}`, [
          {text:'Ver Ranking', onPress:()=>sendScore()}
        ]);
      }
    }
  };

  const sendScore = async () => {
    try {
      await axios.post('http://TU_BACKEND/scores',{username,score});
      navigation.navigate('Lista');
    } catch (err){
      Alert.alert('Error','No se pudo enviar el puntaje');
      console.error(err);
    }
  };

  const renderCell = (x,y)=>{
    let bg = MAZE[y][x]===1 ? '#333':'#eee';
    if(player.x===x && player.y===y) bg='#0a84ff';
    if(END.x===x && END.y===y) bg='#34c759';
    return <View key={`${x}-${y}`} style={[styles.cell,{backgroundColor:bg}]} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jugador: {username}</Text>
      <Text style={styles.score}>tiempo: {score}</Text>

      <View style={styles.grid}>
        {MAZE.map((row,y)=>(
          <View key={y} style={styles.row}>
            {row.map((_,x)=>renderCell(x,y))}
          </View>
        ))}
      </View>

      <View style={styles.controls}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.btn} onPress={()=>movePlayer(0,-1)}><Text style={styles.btnText}>↑</Text></TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.btn} onPress={()=>movePlayer(-1,0)}><Text style={styles.btnText}>←</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={()=>movePlayer(1,0)}><Text style={styles.btnText}>→</Text></TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.btn} onPress={()=>movePlayer(0,1)}><Text style={styles.btnText}>↓</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles=StyleSheet.create({
  container:{ flex:1, justifyContent:'center', alignItems:'center', padding:20, backgroundColor:'#222' },
  title:{ color:'#fff', fontSize:20, marginBottom:5 },
  score:{ color:'#fff', fontSize:16, marginBottom:10 },
  grid:{},
  row:{ flexDirection:'row' },
  cell:{ width:30, height:30, borderWidth:1, borderColor:'#999' },
  controls:{ marginTop:20 },
  btn:{ backgroundColor:'#0a84ff', padding:15, margin:5, borderRadius:5 },
  btnText:{ color:'#fff', fontSize:18, fontWeight:'bold' }
});
