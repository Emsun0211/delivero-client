import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	StatusBar,
	Image,
	ScrollView,
} from "react-native";
import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import {
	removeFromBasket,
	selectBasketItem,
	selectBasketTotal,
} from "../features/basketSlice";
import { FontAwesome } from "@expo/vector-icons";
import { urlFor } from "../sanity";
import formatter from "../utility/formatter";

const BasketScreen = () => {
	const navigation = useNavigation();
	const restaurant = useSelector(selectRestaurant);
	const [groupedItemInBasket, setgroupedItemsInBasket] = useState([]);
	const items = useSelector(selectBasketItem);
	const dispatch = useDispatch();
	const basketTotal = useSelector(selectBasketTotal);
	useMemo(() => {
		const groupedItem = items.reduce((results, item) => {
			(results[item.id] = results[item.id] || []).push(item);
			return results;
		}, {});
		setgroupedItemsInBasket(groupedItem);
	}, [items]);

	// console.log(groupedItemInBasket);
	return (
		<SafeAreaView
			style={{ paddingTop: StatusBar.currentHeight || 0 }}
			className='flex-1 bg-white'>
			<View className='flex-1 bg-gray-100'>
				<View className='p-5 border-b border-[#00ccbb] bg-white shadow-xs'>
					<View>
						<Text className='text-lg font-bold text-center'>Basket</Text>
						<Text
							className='
                       text-gray-400 text-center'>
							{restaurant.title}
						</Text>
					</View>
					<TouchableOpacity
						onPress={navigation.goBack}
						className='rounded-full bg-gray-100 absolute top-3 right-5'>
						<FontAwesome name='times-circle' color={"#00ccbb"} size={40} />
					</TouchableOpacity>
				</View>
				<View className='flex-row space-x-4 px-4 py-3 bg-white my-5 items-center'>
					<Image
						source={{
							uri: "https://links.papareact.com/wru",
						}}
						className='h-7 w-7 bg-gray-300 p-4 rounded-full'
					/>
					<Text className='flex-1'>Deliver in 50-57mins</Text>
					<TouchableOpacity>
						<Text className='text-[#00ccbb]'>Change</Text>
					</TouchableOpacity>
				</View>
				<ScrollView className='divide-y divide-gray-200'>
					{Object.entries(groupedItemInBasket).map(([key, items]) => (
						<View
							key={key}
							className='flex-row items-center space-x-3 bg-white py-2 px-5'>
							<Text className='text-[#00ccbb]'>{items.length} x</Text>
							<Image
								source={{
									uri: urlFor(items[0]?.image).url(),
								}}
								className='h-12 w-12 rounded-full'
							/>
							<Text className='flex-1'>{items[0]?.name}</Text>
							<Text className='text-gray-600'>
								{formatter.format(items[0]?.price)}
							</Text>
							<TouchableOpacity>
								<Text
									className='text-xs text-[#00ccbb]'
									onPress={() => dispatch(removeFromBasket({ id: key }))}>
									Remove
								</Text>
							</TouchableOpacity>
						</View>
					))}
				</ScrollView>
				<View className='p-5 bg-white mt-5 space-y-4'>
					<View className='flex-row justify-between'>
						<Text className='text-gray-400'>Subtotal</Text>
						<Text className='text-gray-400'>
							{formatter.format(basketTotal)}
						</Text>
					</View>
					<View className='flex-row justify-between'>
						<Text className='text-gray-400'>Delivery Fee</Text>
						<Text className='text-gray-400'>{formatter.format(5.99)}</Text>
					</View>
					<View className='flex-row justify-between'>
						<Text>Order Total</Text>
						<Text className='font-extrabold'>
							{formatter.format(basketTotal + 5.99)}
						</Text>
					</View>
					<TouchableOpacity
						onPress={() => navigation.navigate("PreparingOrderScreen")}
						className='rounded-lg bg-[#00ccbb] p-4'>
						<Text className='text-center text-lg font-extrabold text-white'>
							Place Order
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default BasketScreen;
