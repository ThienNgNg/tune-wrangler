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
    const [ genreHolder, setGenreHolder ] = useState([]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        console.log(email);
        console.log(password);
        console.log(genreHolder);
        createUserWithEmailAndPassword(auth, email, password).then(() => {
            setEmail('');
            setPassword('');
            setUser(true);
            handleClose();
        }).catch((error) => {
            console.error('Error with creating email and password');
        });
    };

    const selectGenre = (e) => {
        const genre = e.value;
        console.log(genre);
        if(genreHolder.includes(genre)){
            e.style.backgroundColor = "white";
            e.style.color = "black";
            genreHolder.splice(genreHolder.indexOf(genre), 1)
        }else{
            e.style.backgroundColor = "black";
            e.style.color = "white";
            genreHolder.push(genre);
        }
    }

    return(
        <Modal isOpen={open} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Text>Sign Up</Text>
                </ModalHeader>

                <ModalBody>
                    <Input onChange={(e) => setEmail(e.target.value)} placeholder="email address" style={{marginBottom: '10px'}}/>

                    <InputGroup>
                        <Input onChange={(e) => setPassword(e.target.value)} placeholder="password" type={show ? "text" : "password"}/>
                        <InputRightElement width='5vw'>
                            <Button onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</Button>
                        </InputRightElement>
                    </InputGroup>

                    <Flex direction="row" alignItems='center' justifyContent='space-around' style={{margin: '10px'}}>
                        {["Rock", "Pop", "Hip-Hop"].map((val) => 
                            <Button
                                onClick={(e) => selectGenre(e.target)}
                                border='1px'
                                borderRadius='12px'
                                value={val}
                                style={{backgroundColor: "white"}}
                            >{val}</Button>
                        )}
                    </Flex>

                    <Flex direction="row" alignItems='center' justifyContent='space-around' style={{margin: '10px'}}>
                        {["Country", "EDM"].map((val) => 
                            <Button
                                onClick={(e) => selectGenre(e.target)}
                                border='1px'
                                borderRadius='12px'
                                value={val}
                                style={{backgroundColor: "white"}}
                            >{val}</Button>
                        )}
                    </Flex>
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