import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import SignIn from '../pages/signInScreen';
import TuneWrangler from '../pages/tuneWrangler';

const AppRouter = () => {
    const [ user, setUser ] = useState(false);

    useEffect(() => {
        console.log("app router user val updated to: ", user);
    }, [user]);

    return(
        <BrowserRouter>
            <Flex width={"100%"} minHeight={"100vh"} flexDirection={"column"}>
                <Routes>
                    <Route path="/" element={user ? <TuneWrangler setUser={setUser}/> : <SignIn setUser={setUser}/>} />
                </Routes>
            </Flex>
        </BrowserRouter>
    );
};

export default AppRouter;