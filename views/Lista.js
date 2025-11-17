import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function Lista({ navigation }) {
  const [scores,setScores] = useState([]);

  useEffect(()=>{
    axios.get('http://TU_BACKEND/scores')
      .then(res=>setScores(res.data))
      .catch(err=>console.error(err));
  },[]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ranking</Text>
      <FlatList
        data={scores}
        keyExtractor={(item,index)=>index.toString()}
        renderItem={({item,index})=>(
          <Text style={styles.item}>{index+1}. {item.username} - {item.score}</Text>
        )}
      />
      <TouchableOpacity style={styles.btn} onPress={()=>navigation.reset({index:0,routes:[{name:'Login'}]})}>
        <Text style={styles.btnText}>Volver al Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles=StyleSheet.create({
  container:{ flex:1, padding:20, backgroundColor:'#222' },
  title:{ color:'#fff', fontSize:24, marginBottom:10, textAlign:'center' },
  item:{ color:'#fff', fontSize:18, marginVertical:4 },
  btn:{ backgroundColor:'#0a84ff', padding:12, marginTop:20, borderRadius:5, alignItems:'center' },
  btnText:{ color:'#fff', fontWeight:'bold', fontSize:16 }
});
