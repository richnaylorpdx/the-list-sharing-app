import React from 'react'
import { Typography, Paper, Avatar, Button } from '@material-ui/core'
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import firebase from '../firebase'

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
})

function HomePage(props) {
	const { classes } = props

	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<VerifiedUserOutlined />
				</Avatar>
				<Typography component="h1" variant="h5">
					Hello {
						firebase.getCurrentUsername() ? firebase.getCurrentUsername() : 'Guest'
					}
				</Typography>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"
					component={Link}
					to="/register"
					className={classes.submit}>
					Register
				</Button>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"
					component={Link}
					to="/login"
					className={classes.submit}>
					Login
				</Button>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"
					onClick={logout}
					component={Link}
					to="/"
					className={classes.submit}>
					Logout
				</Button>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"
					component={Link}
					to="/dashboard"
					className={classes.submit}>
					Dashboard
				</Button>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"
					// component={Link}
					// to="/dashboard"
					onClick={getToken}
					// className={classes.submit}>
					className={classes.submit}>
					View Token
				</Button>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"
					onClick={putDb}					
					className={classes.submit}>
					Write to db
				</Button>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"
					onClick={getCurrentUserProfile}					
					className={classes.submit}>
					Get User UUID
				</Button>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"
					onClick={getDocument}					
					className={classes.submit}>
					Get Doc
				</Button>
			</Paper>
		</main>
	)

	async function logout() {
		try {
			await firebase.logout()
		} catch (error) {
			alert(error.message)
		}
	}

	async function getDocument() {
		try {
			await firebase.getDocument()
			// props.history.replace('/dashboard')
		} catch (error) {
			alert(error.message)
		}
	}

	async function getCurrentUserProfile() {
		try {
			await firebase.getCurrentUserProfile()
			// props.history.replace('/dashboard')
		} catch (error) {
			alert(error.message)
		}
	}

	async function getToken() {
		try {
			await firebase.getToken()
			// props.history.replace('/dashboard')
		} catch (error) {
			alert(error.message)
		}
	}

	async function putDb() {
		try {
			await firebase.putDb()
		} catch (error) {
			alert(error.message)
		}
	}
}

export default withStyles(styles)(HomePage)