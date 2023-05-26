import { View, Text, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import React, { useEffect } from "react";
import { PayWithFlutterwave } from "flutterwave-react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectBasketTotal } from "../features/basketSlice";

// or import PayWithFlutterwave from 'flutterwave-react-native';

/* An example function to generate a random transaction reference */
const generateTransactionRef = (length) => {
	var result = "";
	var characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return `flw_tx_ref_${result}`;
};

const FlutterwavesScreen = () => {
	const navigation = useNavigation();
	const basketTotal = useSelector(selectBasketTotal);

	/* An example function called when transaction is completed successfully or canceled */
	const handleOnRedirect = (data) => {
		console.log(data);
		if (data.status === "completed") {
			navigation.navigate("PreparingOrderScreen");
		}
	};
	return (
		<SafeAreaView className='flex-1 justify-center items-center'>
			<PayWithFlutterwave
				onRedirect={handleOnRedirect}
				options={{
					tx_ref: generateTransactionRef(10),
					authorization: "FLWPUBK_TEST-33520a07bd42f06fbd8ebee96a81656d-X",
					customer: {
						email: "customer-email@example.com",
					},
					amount: basketTotal + 5.99,
					currency: "NGN",
					payment_options: "card",
				}}
			/>
		</SafeAreaView>
	);
};

export default FlutterwavesScreen;
