import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, Image } from 'react-native';
import * as Facebook from 'expo-facebook';
import React from 'react'
export default function App() {
	const [fbImage, setFbImage] = React.useState("abcd")
	async function logIn() {
		try {
			await Facebook.initializeAsync({
				appId: '1639974406382608',
			});
			const { type, token, expirationDate, permissions, declinedPermissions } =
				await Facebook.logInWithReadPermissionsAsync({
					permissions: ['public_profile'],
				});
			if (type === 'success') {
				// Get the user's name using Facebook's Graph API
				const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
				let res = await response.json()
				setFbImage(`https://graph.facebook.com/${res.id}/picture?type=large`)
				console.log(res)
				Alert.alert('Logged in!', `H !`);
			} else {
				// type === 'cancel'
			}
		} catch ({ message }) {
			alert(`Facebook Login Error: ${message}`);
		}
	}
	return (
		<View style={styles.container}>
			<Image style={{
				height: 70,
				aspectRatio: 1
			}} source={{
				uri: fbImage
			}} />
			<Text onPress={() => {
				logIn()
			}}>Open up App.js to start working on your app!</Text>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
