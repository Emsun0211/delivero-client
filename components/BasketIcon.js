import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectBasketItem, selectBasketTotal } from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import formatter from "../utility/formatter";

const BasketIcon = () => {
	const items = useSelector(selectBasketItem);
	const basketTotal = useSelector(selectBasketTotal);
	const navigation = useNavigation();
	if (!items.length) return null;
	return (
		<View className='absolute bottom-10 w-full z-50 '>
			<TouchableOpacity
				onPress={() => navigation.navigate("Basket")}
				className='bg-[#00ccbb] mx-5 p-4 rounded-lg flex-row items-center space-x-1'>
				<Text className='text-white font-extrabold text-lg bg-[#01a296] py-1 px-2 rounded-[5px]'>
					{items.length}
				</Text>
				<Text className='flex-1 text-white font-extrabold text-lg text-center'>
					View Basket
				</Text>
				<Text className='text-lg text-white font-extrabold'>
					{formatter.format(basketTotal)}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default BasketIcon;
