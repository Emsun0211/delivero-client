import React, { useEffect, useLayoutEffect, useState } from "react";
import {
	Text,
	View,
	SafeAreaView,
	Image,
	StatusBar,
	TextInput,
	ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import client from "../sanity";

const HomeScreen = () => {
	const [featuredCategories, setFeaturedCategories] = useState([]);
	const navigation = useNavigation();
	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	useEffect(() => {
		client
			.fetch(
				`*[_type == "featured"]{
			...,
			restaurants[]->{
				...,
				dishes[]->
			}
		}`
			)
			.then((data) => {
				setFeaturedCategories(data);
			});
	}, []);
	// console.log(featuredCategories);
	return (
		<SafeAreaView
			className=' pt-5'
			style={{ marginTop: StatusBar.currentHeight || 0 }}>
			{/* <Text className='text-red-500'>HomeScreen</Text> */}
			{/* Header */}
			<View className='flex-row pb-3 items-center mx-4 space-x-2 '>
				<Image
					source={{
						uri: "http://links.papareact.com/wru",
					}}
					className='h-7 w-7 bg-gray-300 p-4 rounded-full'
				/>
				<View className='flex-1'>
					<Text className='font-bold text-gray-400 text-xs'>Deliver Now!</Text>
					<Text className='font-bold text-xl'>
						Current Location
						<Feather name='chevron-down' size={20} color='#00ccbb' />
					</Text>
				</View>
				<Feather name='user' size={35} color='#00ccbb' />
			</View>
			{/* search */}
			<View className='flex-row items-center space-x-2 pb-2 mx-4'>
				<View className='flex-row space-x-2 flex-1  bg-gray-200 p-3 items-center'>
					<Feather name='search' size={20} color='gray' />
					<TextInput
						placeholder='Restaurants and cuisines'
						keyboardType='default'
					/>
				</View>
				<Feather name='sliders' size={20} color='#00ccbb' />
			</View>
			{/* body */}
			<ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
				{/* Category */}
				<Categories />
				{/* Featured  */}
				{featuredCategories?.map((category) => (
					<FeaturedRow
						id={category._id}
						key={category._id}
						title={category.name}
						description={category.short_description}
					/>
				))}
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;
