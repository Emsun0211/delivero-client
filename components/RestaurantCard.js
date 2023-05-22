import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Feather, EvilIcons } from "@expo/vector-icons";

const RestaurantCard = ({
	id,
	imgUrl,
	title,
	rating,
	genre,
	address,
	short_description,
	dishes,
	long,
	lat,
}) => {
	return (
		<TouchableOpacity className='bg-white mr-3 drop-shadow-lg'>
			<Image
				source={{
					uri: imgUrl,
				}}
				className='h-64 w-64 rounde-sm'
			/>
			<View className='px-3 pb-4'>
				<Text className='font-bold text-lg pt-2'>{title}</Text>
			</View>
			<View className='flex-row items-center space-x-1'>
				<Feather name='star' color={"green"} size={22} />
				<Text className='text-xs text-gray-500'>
					<Text className='text-green-400'>{rating}</Text> . {genre}
				</Text>
			</View>
			<View className='flex-row items-center space-x-1'>
				<EvilIcons name='location' color={"gray"} size={22} />
				<Text>Nearby . {address}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default RestaurantCard;
