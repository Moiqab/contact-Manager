import React , { useReducer } from 'react';
import {v4 as uuid} from 'uuid';
import contactContext from './contactContext';
import contactReducer from  './contactReducer';


import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FLITER,

} from '../types' ;

const ContactState = props => {
    
    const initialState = {
        contacts : [
            {
                id: 1,
                name :'Moiqab',
                email: 'moiqab@gmail.com',
                phone : '328828233332323',
                type: 'personal'
            }
        ],
        current : null,
        filtered : null
    }
    const [state , dispatch] =useReducer(contactReducer , initialState);
    //Add contact 
    const addContact = contact => {
        contact.id =uuid();
        dispatch({ type:ADD_CONTACT, payload:contact})
    }

    //Delete Contact 
    const deletecontact = id  => {
        dispatch ({type : DELETE_CONTACT , payload: id});
    }

    // set current contact 


    const setCurrent = contact =>{
        dispatch({type: SET_CURRENT , payload:contact})
    }
    
    //clear current 
    const clearCurrent = () =>{
        dispatch({type: CLEAR_CURRENT})
    }
    const updateContact = contact => {
        dispatch({type:UPDATE_CONTACT , payload :contact})
    }

    const filterContact = text => {
        dispatch({type: FILTER_CONTACT , payload : text})
    }
    const clearFilter = () =>{
        dispatch({type:CLEAR_FLITER})
    }


    return (
        <contactContext.Provider 
        value={{
            contacts : state.contacts,
            current :state.current,
            filtered: state.filtered,
            addContact,
            deletecontact,
            clearCurrent,
            setCurrent,
            updateContact,
            clearFilter,
            filterContact
        }}
        >
            {props.children}

        </contactContext.Provider>
    )
}

export default ContactState;