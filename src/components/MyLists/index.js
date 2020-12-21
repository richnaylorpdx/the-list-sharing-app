import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, Button } from '@material-ui/core'
import firebase from '../firebase'
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AppBar from '../AppBar';

const useStyles = makeStyles((theme) => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        // [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        //     width: 400,
        //     marginLeft: 'auto',
        //     marginRight: 'auto',
        // },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '100%',
    },
    iconContainer: {
        // '&:hover $icon': {
        //     color: 'blue',
        // },
        // margin: 0,
        // padding: 0,
    },
    icon: {
        // color: 'green',
        // fontSize: '50px',
        // margin: 0,
        // padding: 0,
    },
}));

export default function MyLists() {
    const classes = useStyles();
    const [tmpListName, setTmpListName] = useState('')
    const [listName, setListName] = useState('test')
    const [listItem, setListItem] = useState({ item: '' })
    const [listArray, setListArray] = useState([]);

    const handleChange = (prop) => (event) => {
        (listName === 'test') ? (setTmpListName(event.target.value)) : (setListItem({ ...listItem, [prop]: event.target.value }));
    };

    const clearInput = (prop) => {
        setListItem({ ...listItem, [prop]: '' });
    };

    const updateListArray = () => {
        (listName === 'test') ? (setListName(tmpListName)) : setListArray(listArray.concat(listItem));
        clearInput('item')
    };

    const submitOnEnter = (event) => {
        (event.charCode  === 13) && updateListArray()
    }

    return (
        <React.Fragment>
            <AppBar color='transparent' />
            <main className={classes.main}>
                <Paper className={classes.paper}>
                    <Typography component='h1' variant='h4'>
                        {listName}
                    </Typography>
                    <Typography component='h1' variant='h5'>
                        Hello {
                            firebase.getCurrentUsername() ? firebase.getCurrentUsername() : 'Guest'
                        }
                    </Typography>
                    <FormControl className={clsx(classes.margin, classes.textField)} variant='outlined'>
                        <OutlinedInput
                            disableUnderline={false}
                            notched={false}
                            id="adornment-listItem"
                            type={'text'}
                            // value={listItem.item}
                            onKeyPress={event => submitOnEnter(event)}
                            onChange={handleChange('item')}
                            placeholder={listName === 'test' ? 'Enter a list name' : 'Enter a list item'}
                            color={'primary'}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton
                                        classes={{
                                            root: classes.iconContainer
                                        }}
                                        onClick={() => updateListArray()}                                    
                                        edge='end'
                                    >
                                        <AddBoxIcon
                                            className={classes.icon}
                                            variant='contained'
                                        // color='secondary'    
                                        />
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>
                    <ul>
                        {
                            listArray && listArray.map(item =>
                                <li>{item.item}</li>
                            )
                        }
                    </ul>
                    <div>{listName}</div>
                </Paper>
            </main>
            <Button
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"
					onClick={getDocument}					
					className={classes.submit}>
					Get Doc
				</Button>
        </React.Fragment>
    )

    async function getDocument() {
		try {
			await firebase.getDocument()
			// props.history.replace('/dashboard')
		} catch (error) {
			alert(error.message)
		}
	}
}
