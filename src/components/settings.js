import React, { useState } from 'react';
import {
    Text,
    Button,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerFooter,
    DrawerBody,
} from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

/**
 * TuneWrangler 
 * @param {boolean} open - if drawer is open or not
 * @param {function} setOpen - sets open variable
 * @param {function} setUser - flag for user login
 * @returns main screen that shows map, allows for searching, and shows concert/artist details
 */
const Settings = ({ open, setOpen, setUser }) => {

    const onClose = () => {
        setOpen(false);
    };

    const exit = () => {
        signOut(auth).then(() => {
            console.log("Signed out");
            setUser(false);
        }).catch((error) => {
            console.error("error: ", error);
        });
    };

    return(
        <Drawer
            isOpen={open}
            placement='right'
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Your Account</DrawerHeader>

                <DrawerBody>
                    <Text>TODO</Text>
                </DrawerBody>

                <DrawerFooter>
                    <Button onClick={exit}>Sign Out</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default Settings;