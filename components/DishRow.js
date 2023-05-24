import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import formatter from "../utility/formatter";
import { urlFor } from "../sanity";
import { Feather, Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
	addToBasket,
	selectBasketItem,
	removeFromBasket,
	selectBasketItemWithId,
} from "../features/basketSlice";

const DishRow = ({ id, name, description, price, image }) => {
	const [isPressed, setisPressed] = useState(false);
	const dispatch = useDispatch();
	const items = useSelector((state) => selectBasketItemWithId(state, id));

	const addItemToBasket = () => {
		dispatch(addToBasket({ id, name, description, price, image }));
	};
	const removeItemFromBasket = () => {
		if (!items.length > 0) return;
		dispatch(removeFromBasket({ id }));
	};

	return (
		<>
			<TouchableOpacity
				onPress={() => setisPressed(!isPressed)}
				className={`bg-white border p-4 border-gray-200 ${
					isPressed && "border-b-0"
				}`}>
				<View className='flex-row'>
					<View className='flex-1 pr-2'>
						<Text className='text-lg mb-1'>{name}</Text>
						<Text className='text-gray-400'>{description}</Text>
						<Text>{formatter.format(price)}</Text>
					</View>

					<View>
						<Image
							style={{ borderWidth: 1, borderColor: "#f3f3f4" }}
							source={{
								uri: urlFor(image).url(),
							}}
							className='h-20 w-20 bg-gray-300 p-4'
						/>
					</View>
				</View>
			</TouchableOpacity>

			{isPressed && (
				<View className='bg-white px-4'>
					<View className='flex-row items-center space-x-2 pb-2'>
						<TouchableOpacity
							className=''
							onPress={removeItemFromBasket}
							disabled={!items.length}>
							<Entypo
								name='circle-with-minus'
								size={40}
								color={items.length > 0 ? "#00ccbb" : "gray"}
							/>
						</TouchableOpacity>
						<Text>{items.length}</Text>
						<TouchableOpacity className='' onPress={addItemToBasket}>
							<Entypo name='circle-with-plus' size={40} color='#00ccbb' />
						</TouchableOpacity>
					</View>
				</View>
			)}
		</>
	);
};

export default DishRow;
