import React, { useState } from 'react';
import {
    Text,
    Button,
    Flex,
} from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

/**
 * TuneWrangler 
 * @param {function} setUser - flag for user login
 * @returns main screen that shows map, allows for searching, and shows concert/artist details
 */
const TuneWrangler = ({ setUser }) => {

    const exit = () => {
        signOut(auth).then(() => {
            console.log("Signed out");
            setUser(false);
        })
    };

    return(
        <Flex base='shadow' direction='column' alignItems='center' justifyContent='center'>
        <Text>test</Text>
        <Button onClick={exit}>Sign Out</Button>
        </Flex>
    );
};

export default TuneWrangler;