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
const TuneWrangler = ({ setUser }) => {
    const [ settingsOpen, setSettingsOpen ] = useState(false);

    return(
        <Flex base='shadow' direction='column' alignItems='center' justifyContent='center'>
        <Text>test</Text>
        <Button onClick={exit}>Sign Out</Button>
        <Flex base='shadow' direction='row' justifyContent='center' height={window.innerHeight} width={window.innerWidth}>
            <SearchBar />
            <Divider orientation='vertical' />
            <IconButton onClick={() => setSettingsOpen(true)} aria-label="Open Settings" icon={<SettingsIcon />} />
            <Settings open={settingsOpen} setOpen={setSettingsOpen} setUser={setUser} />
        </Flex>
    );
};

export default TuneWrangler;