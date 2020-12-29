import * as React from 'react';
import {useState, Animated,Image} from 'react';
import axios from "axios";
import CountryPicker, { getAllCountries, getCallingCode } from 'react-native-country-picker-modal';

import {
  View,
  Text,
  StyleSheet,
  Alert,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AsyncStorage from '@react-native-community/async-storage';

const StartScreen = ({navigation}) => {
  const [getTotal,setTotal] = useState('');
  const [getRecovered,setRecovered] = useState('');
  const [getCritical,setCritical] = useState('');
  const [getDeaths,setDeaths] = useState('');
  const [getUpdate,setUpdate] = useState('');
  const [getPopulation, setPopulation] = useState('');
  const [getRatio, setRatio] = useState(0);
  const [getval, setval] = useState('');
  const [getfav, setfav] = useState([]);
  
  //COVID API
const options = {
  method: 'GET',
  url: 'https://covid-19-data.p.rapidapi.com/totals',
  headers: {
    'x-rapidapi-key': '4e2a74b1b3msh22f7c6870fd5a1cp1e0677jsnec033e1012ca',
    'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
  }
};
//Population API
const options1 = {
  method: 'GET',
  url: 'https://world-population.p.rapidapi.com/worldpopulation',
  headers: {
    'x-rapidapi-key': '4e2a74b1b3msh22f7c6870fd5a1cp1e0677jsnec033e1012ca',
    'x-rapidapi-host': 'world-population.p.rapidapi.com'
  }
};

//Calling Api to set Data
  axios.request(options).then(function (response) {
    setTotal(JSON.stringify(response.data[0].confirmed));
    setCritical(JSON.stringify(response.data[0].critical));
    setDeaths(JSON.stringify(response.data[0].deaths));
    setUpdate(JSON.stringify(response.data[0].lastUpdate));
    setRecovered(JSON.stringify(response.data[0].recovered));
  }).catch(function (error) {
    console.error(error);
  });
  //Population API
  axios.request(options1).then(function (response) {
    setPopulation(JSON.stringify(response.data.body.world_population));
    
  }).catch(function (error) {
    console.error(error);
  });

  const callCountry=(country)=>{
    console.log(country);
    navigation.navigate("Country", {countryName: country})
  }

  const callFavourite=()=>{
    readData();
    navigation.navigate("Favourite",{"data": getfav});
  }

  const readData = async (country) => {
     await AsyncStorage.getItem( 'country' )
        .then( data => {
          data = JSON.parse( data );
          setfav(data); 
        }).done();
        
  }
  
  

  return (
    <View style={styles.container}>
    <View>
      <Text style={{fontSize:20,fontWeight:"bold", borderBottomWidth:3,borderColor:"green"}}>Total World Cases: {getTotal}</Text>
      <Text style={{fontSize:20,fontWeight:"bold", borderBottomWidth:3,borderColor:"red"}}>Total Recovered: {getRecovered}</Text>
      </View><View>
      <Text style={{fontSize:20,fontWeight:"bold", borderBottomWidth:3,borderColor:"pink"}}>Total Deaths: {getDeaths}</Text>
      <Text style={{fontSize:20,fontWeight:"bold", borderBottomWidth:3,borderColor:"orange"}}>Total Critical: {getCritical}</Text>
      </View><View>
      <Text style={{fontSize:15,fontWeight:"bold", borderBottomWidth:3,borderColor:"yellow"}}>World Population: {getPopulation}</Text>
      <Text style={{fontSize:20,fontWeight:"bold", borderBottomWidth:3,borderColor:"grey"}}>Cases Ratio: {parseInt(getTotal/getPopulation*100)} %</Text>
      </View><View>
      <Text style={{fontSize:15,fontWeight:"bold", borderBottomWidth:3,borderColor:"blue"}}>Last Updated: {getUpdate}</Text>

    </View>
    <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
    <View style={{backgroundColor: "crimson", padding: 10, borderRadius: 10,}}>
    <CountryPicker withFlag onSelect={ country=> callCountry(country.name)}  {...{
            excludeCountries: ['AQ','FK','FI','AG','AS','BA','IO','VG','CG','BV','BF','BI','BQ','KY','CF','CC','CV'], 
            preferredCountries: ['IND', 'PAK'],
          }} />
    </View>
    <AppButton title="Show favourites" style={styles.btn_start_screen} txt_style={styles.btn_start_screen_txt} onPress={callFavourite}/>  
    </View>
    </View>
  );
};



const AppButton = (props) => {
  const disable = props.disabled || false;
  const onPress = props.onPress || function () {};
  const title = props.title || 'Button';
  const style = props.style || {width: '100%'};
  const txt_style = props.txt_style || {fontSize: 32};

  return (
    <TouchableOpacity onPress={onPress} style={style} disabled={disable}>
      <Text style={txt_style}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

  btn_start_screen_txt: {
    color: 'white',
    fontSize: 20,
  },

  btn_start_screen: {
    backgroundColor: 'crimson',
    borderRadius: 10,
    padding: 10,
  },

  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
 
});

export default StartScreen;
