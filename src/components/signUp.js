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

/**
 * SignUp
 * @param {boolean} open - if the modal is open or not
 * @param {function} setOpen - sets open value of modal 
 * @returns Modal that allows user to create an account
 */

const SignUp = ({open, setOpen}) => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ show, setShow ] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        console.log("submitted");
    }

    return(
        <Modal isOpen={open} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Text>Sign Up</Text>
                </ModalHeader>

                <ModalBody>
                    <Input onChange={(e) => setUsername(e.target.value)} placeholder="email address"/>
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