import React from 'react'
import { Typography, Paper, Avatar, Button, TextField, Input } from '@material-ui/core'
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import firebase from '../firebase'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';

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

const updateList = (item) => this.state.listItem.add({ name: item })

class MyLists extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentItem: {},
            listItem: [
                { name: 'rich' },
                { name: 'cruz' }
            ]
        }
        this.handleChange = this.handleChange.bind(this)
        this.updateState = this.updateState.bind(this)

    }

    handleChange(event) {
        this.setState({ currentItem: {name: event.target.value} });
        // console.log('handle change: ', event.target.value)
    }

    updateState() {
        this.setState({ listItem: [...this.state.listItem, this.state.currentItem] })
    }

    render() {
        return (
            <main className={styles.main}>
                <Paper className={styles.paper}>
                    <Typography component="h1" variant="h4">
                        {'My Lists'}
                    </Typography>
                    <Typography component="h1" variant="h5">
                        {/* Hello Guest! */}
                        Hello {
                            firebase.getCurrentUsername() ? firebase.getCurrentUsername() : 'Guest'
                        }
                    </Typography>
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    // classes={{
                                    //     root: classes.iconContainer
                                    // }}
                                    onClick={() => console.log('clicked it')}
                                >
                                    <AddBoxIcon className={classes.icon} />
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                </FormControl>
                    <TextField
                        id="outlined-basic"
                        label="Outlined"
                        variant="outlined"
                        onChange={this.handleChange}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        // onClick={() => console.log('current state: ', this.state.currentItem)}
                        onClick={() => this.updateState()}
                    >
                        Add item
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => console.log('list item state: ', this.state.listItem)}
                    >
                        Show State
                    </Button>
                    <ul>
                        {
                            this.state.listItem && this.state.listItem.map(item =>
                                <li>{item.name}</li>
                            )
                        }
                    </ul>
                </Paper>
            </main>
        )
    }
}


export default withStyles(styles)(MyLists)
