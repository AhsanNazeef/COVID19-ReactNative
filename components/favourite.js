import * as React from 'react';
import {useState, Animated,Image} from 'react';
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage'

import { Icon } from 'react-native-elements'



const Favourite = ({navigation,route}) => {
  const [getfav, setfav] = useState([...route.params.data]);
  
const updateData = async () => {
     AsyncStorage.getItem( 'country' )
    .then( data => {
      data = JSON.parse( data );
      setfav([]);
      AsyncStorage.setItem( 'country', JSON.stringify( [] ) );

    }).done();
  }

  navigation.setOptions({
		headerRight: () => 
      <Icon
  name='g-translate'
  color='#00aced'
  onPress={updateData} />
			// <Button
			// 	title="Favourite"
			// 	disabled={false}
			// 	onPress={()=>setFavourite(getCountry)}
			// />
    
	});


  return (
    <View >
      <ScrollView>
				{getfav.map((item) => (
					<View style={styles.itemsMain}>
						<TouchableOpacity style={styles.items} key={item} onPressOut={()=>navigation.navigate('Country',{countryName: item})}>
							<View style={styles.items}>
								<Text style={{ fontSize: 20, color: "white" }}>
									{item}
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				))}
			</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({

	items: {
		paddingLeft: 5,
		paddingRight: 5,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		height: 40,
		backgroundColor: "black",
		marginBottom: 1,
	},
	itemsMain: {
		flexDirection: "row",
	},
});



export default Favourite;