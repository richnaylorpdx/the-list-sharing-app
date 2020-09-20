import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import * as admin from 'firebase-admin';


const config = {
	apiKey: "AIzaSyDZmrOMqbqEHk02ftMG0ocqs4XI8xU0JVE",
	authDomain: "nodejsauthpj.firebaseapp.com",
	databaseURL: "https://nodejsauthpj.firebaseio.com",
	projectId: "nodejsauthpj",
	storageBucket: "nodejsauthpj.appspot.com",
	messagingSenderId: "238614253029",
	appId: "1:238614253029:web:d1f9c61a8914d041fab30c"
}

class Firebase {
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()
	}

	putDb() {
		const db = app.firestore();
		db.collection("cities").doc("LA").set({
			name: "Los Angeles",
			state: "CA",
			country: "USA"
		})
			.then(function () {
				console.log("Document successfully written!");
			})
			.catch(function (error) {
				console.error("Error writing document: ", error);
			});
	}

	getDocument() {
		const db = app.firestore();

		const docRef = db.collection("cities").doc("LA");

		docRef.get().then(function (doc) {
			if (doc.exists) {
				console.log("Document data:", doc.data());
				// return doc.data();
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
		}).catch(function (error) {
			console.log("Error getting document:", error);
		});
	}

	getToken() {
		const idToken = this.auth.currentUser.getIdToken(/* forceRefresh */ true)
		console.log('this is getToken', idToken)
	}

	login(email, password) {
		// return this.auth.signInWithEmailAndPassword(email, password)
		const authValue = this.auth.signInWithEmailAndPassword(email, password);
		console.log('auth value: ', authValue);
		return authValue;
	}
	// login() {
	// 	// const user = this.auth.getUserByEmail('richnaylorpdx@gmail.com'); // 1
	// 	const user = this.auth
	// 	console.log('this is the login function: ', user)
	// }

	logout() {
		return this.auth.signOut()
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}

	addQuote(quote) {
		if (!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).set({
			quote
		})
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
			// 	this.auth.onAuthStateChanged((user) => {
			// 		if (user) {
			// 			// User is signed in.
			// 			console.log('############ user is signed in', user)
			// 			this.auth.onAuthStateChanged(resolve)
			// 		  } else {
			// 			// No user is signed in.
			// 			console.log('############ user is not signed in')
			// 		  }
			// 	})

			// })
		})
	}

	getCurrentUserProfile() {
		const currentUser = this.auth.currentUser;
		console.log('current user info: ', JSON.stringify(currentUser));
		return currentUser;
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}

	async getCurrentUserQuote() {
		const quote = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get()
		return quote.get('quote')
	}
}

export default new Firebase()