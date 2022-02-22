import React, { useState } from 'react';
import {
    Text,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Flex,
    Button,
} from '@chakra-ui/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

/**
 * SignUp
 * @param {boolean} open - if the modal is open or not
 * @param {function} setOpen - sets open value of modal 
 * @param {function} setUser - flag for user login
 * @returns Modal that allows user to create an account
 */

const SignUp = ({open, setOpen, setUser}) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ show, setShow ] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        console.log(email);
        console.log(password);
        try{
            createUserWithEmailAndPassword(auth, email, password);
        }catch(error){
            console.error('Error with creating email and password');
        }
        setEmail('');
        setPassword('');
        setUser(true);
        handleClose();
    };

    return(
        <Modal isOpen={open} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Text>Sign Up</Text>
                </ModalHeader>

                <ModalBody>
                    <Input onChange={(e) => setEmail(e.target.value)} placeholder="email address"/>
                    <InputGroup>
                    <Input onChange={(e) => setPassword(e.target.value)} placeholder="password" type={show ? "text" : "password"}/>
                    <InputRightElement>
                        <Button onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</Button>
                    </InputRightElement>
                </InputGroup>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={handleSubmit}>Sign Up</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default SignUp;