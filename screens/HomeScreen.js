import React, { useLayoutEffect } from "react";
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

const HomeScreen = () => {
	const navigation = useNavigation();
	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);
	return (
		<SafeAreaView
			className='bg-white pt-5'
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
			<ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
				{/* Category */}
				<Categories />
				{/* Featured  */}
				<FeaturedRow
					id='123'
					title='Featured'
					description='Paid placement from our partner'
				/>
				{/* Tasty discount */}
				<FeaturedRow
					id='1234'
					title='Tasty Discounts'
					description='Paid placement from our partner'
				/>
				{/* Offers near you */}
				<FeaturedRow
					id='12345'
					title='Offers near you'
					description='Paid placement from our partner'
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;
