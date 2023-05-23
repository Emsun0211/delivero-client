import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import RestaurantCard from "./RestaurantCard";
import { client } from "../sanity";

const FeaturedRow = ({ title, description, id }) => {
	const [restaurants, setrestaurants] = useState([]);
	useEffect(() => {
		client
			.fetch(
				`*[_type == "featured" && _id == ${id}]{
			...,
			restaurants[]->{
				...,
				dishes[]->
			}
		}`
			)
			.then((data) => setrestaurants(data?.restaurants));
	}, []);

	console.log(restaurants);

	return (
		<View>
			<View className='mt-4 flex-row items-center justify-between px-4'>
				<Text className='font-bold text-lg'>{title}</Text>
				<Feather name='arrow-right' color='#00ccbb' size={40} />
			</View>
			<Text className='text-xs text-gray-500 px-4'>{description}</Text>
			<ScrollView
				horizontal
				contentContainerStyle={{ paddingHorizontal: 15 }}
				showsHorizontalScrollIndicator={false}
				className='pt-4'>
				<RestaurantCard
					id={123}
					imgUrl='http://links.papareact.com/gn7'
					title='Yoi Sushi'
					rating={4.5}
					genre='Japanese'
					address='123 Main Street'
					short_description='This is a short description'
					dishes={[]}
					long={20}
					lagt={0}
				/>
				<RestaurantCard
					id={123}
					imgUrl='http://links.papareact.com/gn7'
					title='Yoi Sushi'
					rating={4.5}
					genre='Japanese'
					address='123 Main Street'
					short_description='This is a short description'
					dishes={[]}
					long={20}
					lagt={0}
				/>
				<RestaurantCard
					id={123}
					imgUrl='http://links.papareact.com/gn7'
					title='Yoi Sushi'
					rating={4.5}
					genre='Japanese'
					address='123 Main Street'
					short_description='This is a short description'
					dishes={[]}
					long={20}
					lagt={0}
				/>
			</ScrollView>
		</View>
	);
};

export default FeaturedRow;
