import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import RestaurantCard from "./RestaurantCard";
import client from "../sanity";

const FeaturedRow = ({ title, description, id }) => {
	const [restaurants, setrestaurants] = useState([]);
	useEffect(() => {
		client
			.fetch(
				`*[_type == "featured" && _id == $id]{
			...,
			restaurants[]->{
				...,
				dishes[]->,
				type->{
					name
				}
			}
		}[0]`,
				{ id }
			)
			.then((data) => setrestaurants(data?.restaurants));
	}, []);

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
				{restaurants.map((restaurants) => (
					<RestaurantCard
						key={restaurants._id}
						id={restaurants._id}
						imgUrl={restaurants.image}
						title={restaurants.name}
						rating={restaurants.rating}
						genre={restaurants.type?.name}
						address={restaurants.address}
						short_description={restaurants.short_description}
						dishes={restaurants.dishes}
						long={restaurants.long}
						lagt={restaurants.lat}
					/>
				))}
			</ScrollView>
		</View>
	);
};

export default FeaturedRow;
