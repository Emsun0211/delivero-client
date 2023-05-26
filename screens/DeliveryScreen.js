import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	StatusBar,
	Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import { emptyBasket } from "../features/basketSlice";
import { FontAwesome } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const DeliveryScreen = () => {
	const navigation = useNavigation();
	const restaurant = useSelector(selectRestaurant);
	const [location, setLocation] = useState();
	const [isloading, setIsLoading] = useState(true);
	const [error, setError] = useState("");
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setError("Permission to access location was denied");
				return;
			}
			let location = await Location.getCurrentPositionAsync({});

			// setLat(location.coords.latitude);
			// setLong(location.coords.longitude);
			setLocation(location);
			setIsLoading(true);
		})();
	}, []);
	const handleNavigat = () => {
		dispatch(emptyBasket());
		navigation.navigate("Home");
	};
	// const arr = [2, 3];
	// console.log(arr * 2);

	return (
		<View
			style={{ paddingTop: StatusBar.currentHeight }}
			className='bg-[#00ccbb] flex-1'>
			<SafeAreaView className='z-50'>
				<View className='flex-row justify-between items-center p-5'>
					<TouchableOpacity onPress={handleNavigat}>
						<FontAwesome name='times' color={"#ffffff"} size={30} />
					</TouchableOpacity>
					<Text className='font-light text-white text-lg'>Order Help</Text>
				</View>
				<View className='bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md'>
					<View className='flex-row justify-between'>
						<View>
							<Text className='text-lg text-gray-400'>Estimated Arrival</Text>
							<Text className='text-4xl font-bold'>45-55 Minutes</Text>
						</View>
						<Image
							source={{
								uri: "https://links.papareact.com/fls",
							}}
							className='h-20 w-20'
						/>
					</View>
					<Progress.Bar size={30} color='#00ccbb' indeterminate={true} />
					<Text className='mt-3 text-gray-500'>
						Your order at {restaurant.title} is being processed
					</Text>
				</View>
			</SafeAreaView>
			{location && (
				<MapView
					initialRegion={{
						latitude: location.coords.latitude,
						longitude: location.coords.longitude,
						latitudeDelta: 0.005,
						longitudeDelta: 0.005,
					}}
					mapType='mutedStandard'
					className='flex-1 mt-10 z-0'>
					<Marker
						coordinate={{
							latitude: location.coords.latitude,
							longitude: location.coords.longitude,
						}}
						title={restaurant.title}
						description={restaurant.short_description}
						identifier='origin'
						pinColor='#00ccbb'
					/>
				</MapView>
			)}
			<SafeAreaView className='bg-white flex-row items-center space-x-5 h-24'>
				<Image
					source={{
						uri: "https://links.papareact.com/wru",
					}}
					className='h-12 w-12 bg-gray-300 rounded-full ml-5'
				/>
				<View className='flex-1'>
					<Text className='text-lg'>Gbenga G</Text>
					<Text className='text-gray-400'>Your Rider</Text>
				</View>
				<Text className='text-[#00ccbb] text-lg mr-5 font-bold'>Call</Text>
			</SafeAreaView>
		</View>
	);
};

export default DeliveryScreen;
