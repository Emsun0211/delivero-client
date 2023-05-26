import { PayWithFlutterwave } from "flutterwave-react-native";
// or import PayWithFlutterwave from 'flutterwave-react-native';

/* An example function called when transaction is completed successfully or canceled */
const handleOnRedirect = (data) => {
	console.log(data);
};

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

<PayWithFlutterwave
	onRedirect={handleOnRedirect}
	options={{
		tx_ref: generateTransactionRef(10),
		authorization: "[merchant public key]",
		customer: {
			email: "customer-email@example.com",
		},
		amount: 2000,
		currency: "NGN",
		payment_options: "card",
	}}
/>;
