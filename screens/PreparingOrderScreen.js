import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const PreparingOrderScreen = () => {
	const navigation = useNavigation();
	useEffect(() => {
		setTimeout(() => {
			navigation.navigate("Delivery");
		}, 4000);
	}, []);
	return (
		<SafeAreaView className='bg-[#00ccbb] flex-1 justify-center items-center'>
			{/* <Animatable.Image
				source={require("../assets/delivery.gif")}
				animation='slideInUp'
				iterationCount={1}
				className='h-96 w-96'
			/> */}
			<Animatable.Text
				animation={"slideInUp"}
				iterationCount={2}
				className='text-lg text-white font-bold text center '>
				Waiting for Restuarant to accept your order
			</Animatable.Text>
			<Progress.Circle indeterminate={true} size={60} color={"white"} />
		</SafeAreaView>
	);
};

export default PreparingOrderScreen;
