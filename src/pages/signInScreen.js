import React, {useState} from 'react';
import {
    Text,
    Heading,
    Button,
    Input,
    InputGroup,
    Flex,
    InputRightElement,
    Alert,
} from '@chakra-ui/react';
import SignUp from '../components/signUp';

/**
 * SignIn 
 * @returns screen for user to sign in
 */

const SignIn = () => {
    const [ show, setShow ] = useState();
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ open, setOpen ] = useState(false);

    const signIn = () => {
        console.log(username);
        console.log(password);
    };

    const signUp = () => {
        console.log("opened");
        setOpen(true);
    }

    return(
        <Flex base='shadow' direction='column' alignItems='center' justifyContent='center'>
            <Heading as='h1' style={{marginTop: '50px'}}>Tune Wrangler</Heading>
            <Input onChange={(e) => setUsername(e.target.value)} width='30vw' placeholder='username' style={{marginTop: '20px', marginBottom: '5px'}}></Input>
            <InputGroup width='30vw' style={{marginTop: '10px', marginBottom: '10px'}}>
                <Input onChange={(e) => setPassword(e.target.value)} placeholder='password' type={show ? 'text' : 'password'}></Input>
                <InputRightElement width='5vw'>
                    <Button onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</Button>
                </InputRightElement>
            </InputGroup>
            <Flex direction='row' justifyContent='space-around' width='30vw'>
                <Button >Sign in with Google</Button>
                <Button onClick={signIn} >Sign In</Button>
            </Flex>
            <Button onClick={signUp} >Sign Up</Button>
            <SignUp open={open} setOpen={setOpen} />
        </Flex>
    );
};

export default SignIn;
