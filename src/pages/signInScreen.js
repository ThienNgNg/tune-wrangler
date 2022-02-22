import React, {useState} from 'react';
import {
    Text,
    Heading,
    Button,
    Input,
    InputGroup,
    Flex,
    InputRightElement,
    useToast,
} from '@chakra-ui/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import SignUp from '../components/signUp';
import { auth } from '../firebase';

/**
 * SignIn 
 * @param {function} setUser - flag for user login
 * @returns screen for user to sign in
 */

const SignIn = ({ setUser }) => {
    const [ show, setShow ] = useState();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ open, setOpen ] = useState(false);
    const toast = useToast();

    const signIn = () => {
        console.log(email);
        console.log(password);
        signInWithEmailAndPassword(auth, email, password).then(() => {
            setUser(true);
        }).catch(error => {
            console.error("error signing in with email and password", error);
            toast({
                title: "Invalid Login",
                description: "Email or password incorrect",
                status: 'error',
                duration: 5000,
                isClosable: true,

            });
            setPassword('');
        });
    };

    const signUp = () => {
        console.log("opened");
        setOpen(true);
    }

    return(
        <Flex base='shadow' direction='column' alignItems='center' justifyContent='center'>
            <Heading as='h1' style={{marginTop: '50px'}}>Tune Wrangler</Heading>
            <Input
                onChange={(e) => setEmail(e.target.value)}
                width='30vw' placeholder='email address'
                style={{marginTop: '20px', marginBottom: '5px'}}
                isRequired
            ></Input>
            <InputGroup width='30vw' style={{marginTop: '10px', marginBottom: '10px'}}>
                <Input
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='password'
                    type={show ? 'text' : 'password'}
                    isRequired={true}
                ></Input>
                <InputRightElement width='5vw'>
                    <Button onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</Button>
                </InputRightElement>
            </InputGroup>
            <Flex direction='row' justifyContent='space-around' width='30vw'>
                <Button >Sign in with Google</Button>
                <Button onClick={signIn} >Sign In</Button>
            </Flex>
            <Button onClick={signUp} >Sign Up</Button>
            <SignUp open={open} setOpen={setOpen} setUser={setUser}/>
        </Flex>
    );
};

export default SignIn;
