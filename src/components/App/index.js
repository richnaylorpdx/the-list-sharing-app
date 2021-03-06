import React, { useState, useEffect } from 'react'
import './styles.css'
import HomePage from '../HomePage'
import Login from '../Login'
import Register from '../Register'
import Dashboard from '../Dashboard'
import MyLists from '../MyLists'
import Lists from '../Lists'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline, CircularProgress } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import firebase from '../firebase'

const theme = createMuiTheme()

export default function App() {

	const [firebaseInitialized, setFirebaseInitialized] = useState(false)
	const [userToken, setUserToken] = useState({})

	useEffect(() => {
		firebase.isInitialized()
			.then(val => {
				console.log('isInitialized: ', val)
				setFirebaseInitialized(val)
				setUserToken(val)
			})
	})


	return firebaseInitialized !== false ? (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/dashboard" component={Dashboard} />
					<Route exact path='/mylists' component={MyLists} />
					<Route exact path='/lists' component={Lists} />
				</Switch>
			</Router>
		</MuiThemeProvider>

	) : <div id="loader"><CircularProgress /></div>
}