import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import SignIn from '../pages/signInScreen';

const AppRouter = () => {
    return(
        <BrowserRouter>
            <Flex width={"100%"} minHeight={"100vh"} flexDirection={"column"}>
                <Routes>
                    <Route path="/" element={<SignIn />} />
                </Routes>
            </Flex>
        </BrowserRouter>
    );
};

export default AppRouter;