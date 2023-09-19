'use client'

import React from "react";
import {Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle} from "@nextui-org/react";
// import {motion} from "framer-motion";
// import AnimatedIconList from "./AnimatedIconList.tsx";

export default function MainNav() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
        {title: `Home`, href: "/"},
        {title: "Sybil", href: "#about"},
        {title: "About", href: "#projects"},
        // {title: "Contact", href: "#contact"},
    ];

    const openCV = () => {
        const pdfUrl = 'Rayaan-Rilshad.pdf';
        window.open(pdfUrl, '_blank');
    };

    return (
        <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} isBordered shouldHideOnScroll maxWidth={'full'}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                {/*<motion.div*/}
                {/*    initial={{opacity: 0,}} // Start from a lower position*/}
                {/*    animate={{*/}
                {/*        opacity: 1,*/}
                {/*        transition: {duration: 0.5, delay: 0.01}*/}
                {/*    }} // Delayed animation for the paragraph*/}
                {/*>*/}
                    <NavbarBrand className='hidden sm:flex'>
                        <Link href={'/'}>
                            <img src="/flogo.png" alt="Logo" className="w-40 h-auto ml-5"/>
                        </Link>
                    </NavbarBrand>
                {/*</motion.div>*/}
            </NavbarContent>

            <NavbarContent justify='center' className='sm:hidden pr-3'>
                <NavbarBrand>
                    <Link href={'/'}>
                        <img src="/flogo.png" alt="Logo" className="w-40 h-auto"/>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent justify="end" className='gap-10 w-1/3 sm:w-fit font-light'>

                {/*<motion.div*/}
                {/*    initial={{opacity: 0, y: -20}} // Start from a lower position*/}
                {/*    animate={{*/}
                {/*        opacity: 1,*/}
                {/*        y: 0,*/}
                {/*        transition: {duration: 0.5, delay: 0.1}*/}
                {/*    }} // Delayed animation for the paragraph*/}
                {/*>*/}
                    <NavbarItem className="hidden sm:flex">
                        <Link color="foreground" href="/">
                            Home
                        </Link>
                    </NavbarItem>
                {/*</motion.div>*/}

                {/*<motion.div*/}
                {/*    initial={{opacity: 0, y: -20}} // Start from a lower position*/}
                {/*    animate={{*/}
                {/*        opacity: 1,*/}
                {/*        y: 0,*/}
                {/*        transition: {duration: 0.5, delay: 0.2}*/}
                {/*    }} // Delayed animation for the paragraph*/}
                {/*>*/}
                    <NavbarItem className="hidden sm:flex">
                        <Link color="foreground" href="#about">
                            About
                        </Link>
                    </NavbarItem>
                {/*</motion.div>*/}

                {/*<motion.div*/}
                {/*    initial={{opacity: 0, y: -20}} // Start from a lower position*/}
                {/*    animate={{*/}
                {/*        opacity: 1,*/}
                {/*        y: 0,*/}
                {/*        transition: {duration: 0.5, delay: 0.3}*/}
                {/*    }} // Delayed animation for the paragraph*/}
                {/*>*/}
                    <NavbarItem className="hidden sm:flex">
                        <Link color="foreground" href="#projects">
                            Projects
                        </Link>
                    </NavbarItem>
                {/*</motion.div>*/}

                {/*<motion.div*/}
                {/*    initial={{opacity: 0, y: -20}} // Start from a lower position*/}
                {/*    animate={{*/}
                {/*        opacity: 1,*/}
                {/*        y: 0,*/}
                {/*        transition: {duration: 0.5, delay: 0.4}*/}
                {/*    }} // Delayed animation for the paragraph*/}
                {/*>*/}
                    <NavbarItem className="hidden sm:flex">
                        <Link color="foreground" href="#contact">
                            Contact
                        </Link>
                    </NavbarItem>
                {/*</motion.div>*/}

                {/*<motion.div*/}
                {/*    initial={{opacity: 0, y: -20}} // Start from a lower position*/}
                {/*    animate={{*/}
                {/*        opacity: 1,*/}
                {/*        y: 0,*/}
                {/*        transition: {duration: 0.5, delay: 0.5}*/}
                {/*    }} // Delayed animation for the paragraph*/}
                {/*>*/}
                    <NavbarItem>
                        <Button as={Link} color="primary" href="#" variant="bordered" radius='sm' onClick={openCV}>
                            Support
                        </Button>
                    </NavbarItem>
                {/*</motion.div>*/}


            </NavbarContent>
            <NavbarMenu className={`bg-stone-950 bg-opacity-60 w-full p-0 ${isMenuOpen ? "flex" : "hidden"}`}>
                <div>
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link onClick={() => { setIsMenuOpen(!isMenuOpen)}}
                                  className="w-full mt-10 flex justify-center text-white text-2xl font-quantify"
                                  href={item.href}
                                  size="lg"
                            >
                                {item.title}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </div>
                {/*<section className="absolute w-full bottom-0 flex gap-5 text-white justify-center text-xl pb-12 ">*/}
                {/*    <AnimatedIconList/>*/}
                {/*</section>*/}
            </NavbarMenu>
        </Navbar>
    );
}
