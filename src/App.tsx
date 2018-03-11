import React from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Root } from "native-base";
import { Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;

import Login from "./screens/Login";
import Home from "./screens/Home";
import Sidebar from "./screens/Sidebar";
import CVETransaction from "./screens/CVETransaction";
import ViewTransactions from "./screens/ViewTransactions";
import Categories from './screens/Categories';
import CVECategory from './screens/CVECategory';
import SelectCategory from './screens/SelectCategory';
import SelectJar from './screens/SelectJar';
import EnterAmount from './screens/EnterAmount';

const Drawer = DrawerNavigator(
	{
		Home: { screen: Home },
	},
	{
		drawerWidth: deviceWidth - 50,
		drawerPosition: "left",
		contentComponent: props => <Sidebar {...props} />,
	}
);

const App = StackNavigator(
	{
		Login: { screen: Login },
		Drawer: { screen: Drawer },
		CVETransaction: { screen: CVETransaction },
		ViewTransactions: { screen: ViewTransactions },
		SelectCategory: { screen: SelectCategory },
		EnterAmount: { screen: EnterAmount },
		SelectJar: { screen: SelectJar },
		Categories: { screen: Categories },
		CVECategory: { screen: CVECategory },
	},
	{
		initialRouteName: "Login",
		headerMode: "none",
	}
);

export default () => (
	<Root>
		<App />
	</Root>
);
