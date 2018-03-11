import { StyleSheet } from "react-native";

const BUTTON_HEIGHT = 50;

const styles: any = StyleSheet.create({
	container: {
		backgroundColor: "#FBFAFA",
		flex: 1,
	},
	button: {
		borderRadius: 0,
		backgroundColor: '#FFFFFF',
		flex: 1,
		borderTopWidth: 1,
		borderRightWidth: 1,
		borderBottomWidth: 0,
		borderLeftWidth: 0,
		borderColor: '#E0E0E0',
		height: BUTTON_HEIGHT,
		justifyContent: 'center'
	},
	buttonEqual: {
		height: BUTTON_HEIGHT * 2,
		backgroundColor: '#8BC34A'
	},
	buttonOk: {
		height: BUTTON_HEIGHT * 2,
		backgroundColor: '#2196F3'
	},
	buttonText: {
		fontSize: 18,
		color: '#8BC34A'
	},
	buttonGrey: {
		backgroundColor: '#EEEEEE'
	},
	rowButtons: {
		borderWidth: 0,
		flex: 0
	},
	buttonTextWhite: {
		color: '#FFFFFF'
	},
	buttonPanelWrapper: {
		height: 250
	}
});
export default styles;
