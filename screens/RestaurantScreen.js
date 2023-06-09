import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import { Feather, EvilIcons, AntDesign } from "@expo/vector-icons";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch, useSelector } from "react-redux";
import { setRestaurant, selectRestaurant } from "../features/restaurantSlice";
import { emptyBasket, selectBasketItem } from "../features/basketSlice";

const RestaurantScreen = ({}) => {
	const dispatch = useDispatch();
	const items = useSelector(selectBasketItem);
	const restaurant = useSelector(selectRestaurant);
	const {
		params: {
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
		},
	} = useRoute();
	useEffect(() => {
		dispatch(
			setRestaurant({
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
			})
		);
	}, []);

	useEffect(() => {
		if (items.length > 0 && restaurant.id !== id) {
			dispatch(emptyBasket());
		}
	});

	const navigation = useNavigation();
	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	return (
		<>
			<BasketIcon />
			<ScrollView>
				<View className='relative'>
					<Image
						source={{
							uri: urlFor(imgUrl).url(),
						}}
						className='w-full h-56 bg-gray-300 p-4'
					/>
					<TouchableOpacity
						onPress={navigation.goBack}
						className='absolute left-5 top-10 p-2 bg-gray-100 rounded-full'>
						<Feather name='arrow-left' size={20} color='#00ccbb' />
					</TouchableOpacity>
				</View>
				<View className='bg-white'>
					<View className='px-4 pt-4 '>
						<Text className='text-3xl font-bold'>{title}</Text>
						<View className='flex-row space-x-2 my-1'>
							<View className='flex-row items-center space-x-1'>
								<Feather name='star' size={22} color='green' />
								<Text className='text-xs text-gray-500'>
									<Text className='text-green-400'>{rating}</Text> . {genre}
								</Text>
							</View>
							<View className='flex-row items-center space-x-1'>
								<EvilIcons name='location' color={"gray"} size={22} />
								<Text className='text-xs text-gray-500'>
									Nearby . {address}
								</Text>
							</View>
						</View>
						<Text className='text-gray-500 mt-2 pb-4'>{short_description}</Text>
					</View>
					<TouchableOpacity className='flex-row items-center space-x-2 p-4 border-y border-gray-300'>
						<EvilIcons name='question' color={"gray"} size={20} />
						<Text className='pl-2 flex-1 text-md font-bold'>
							Have a food alergy?
						</Text>
						<Feather name='chevron-right' size={20} color='#00ccbb' />
					</TouchableOpacity>
				</View>
				<View className={`${items.length && "pb-36"}`}>
					<Text className='pt-6 px-4 mb-3 font-bold text-xl'>Menu</Text>

					{dishes.map((dish) => (
						<DishRow
							key={dish._id}
							id={dish._id}
							name={dish.name}
							description={dish.short_description}
							price={dish.price}
							image={dish.image}
						/>
					))}
				</View>
			</ScrollView>
		</>
	);
};

export default RestaurantScreen;
