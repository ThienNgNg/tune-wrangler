import React, { useState, useEffect, useRef } from 'react';
import {
    Flex,
    Input,
    InputRightElement,
    InputGroup,
    IconButton,
    Menu,
    MenuList,
    MenuItem,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

/**
 * SearchBar 
 * @returns main screen that shows map, allows for searching, and shows concert/artist details
 */

const SearchBar = () => {
    const [ open, setOpen ] = useState(false);
    const [ val, setVal ] = useState('');
    const [ active, setActive ] = useState(document.activeElement);
    const recent = ["Rock", "Billie Eyelash", "Philadelphia", "19104", "Philly"];
    const ref = useRef(null);

    // useEffect(() => {
    //     console.log("called");
    //     if(val.length > 0 || document.activeElement == ref.current){
    //         console.log(document.activeElement);
    //         setOpen(true);
    //     }else{
    //         setOpen(false);
    //     }
    // });

    useEffect(() => {
        function handleClick(event){
            if (ref.current && !ref.current.contains(event.target)) {
                console.log("clicked outside");
                setOpen(false);
            }else{
                console.log("clicked in");
                setOpen(true);
            }
        };

        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        }
    }, [ref]);


    return(
        <Flex base='shadow' direction='column' alignItems='center' justifyContent='center' width='40vw'>
            <InputGroup>
                <Input id="main" onChange={(e) => setVal(e.target.value)} value={val} ref={ref} />
                <InputRightElement>
                    <IconButton onClick={() => console.log(val)} aria-label="Search" icon={<SearchIcon />}/>
                </InputRightElement>
            </InputGroup>
            <Menu isOpen={open}>
                <MenuList>
                    {recent.filter(search => search.startsWith(val)).map(filteredSearch => (
                        <MenuItem>{filteredSearch}</MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </Flex>
    );
};

export default SearchBar