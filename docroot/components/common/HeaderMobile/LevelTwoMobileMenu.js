import { useState } from 'react';
import { Link, Box, Image, Text, Flex } from '@chakra-ui/react';
import NextLink from 'next/link';
import LevelThreeMobileMenu from './LevelThreeMobileMenu';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

const LevelTwoMobileMenu = ({ menuData, backToLevelOne }) => {
    const router = useRouter();
    const [thirdMenu, setThirdMenu] = useState(null);

    return thirdMenu ? (
        <LevelThreeMobileMenu menuData={thirdMenu} resetMenu={() => setThirdMenu(null)} />
    ) : (
        <>
            <Box as={'div'}>
                <Flex align="center" pb="30px">
                    <Link onClick={backToLevelOne} mr="10px" w="20px">
                        <Image src="/assets/slider-arrow-left.svg" w="10px" alt="Previous" />
                    </Link>
                    <Box align="center" flex="1">
                        <NextLink href={menuData?.relative}>
                            <Link>
                                <Text textStyle="caption" fontWeight="800" textTransform="uppercase" color="brand">
                                    {menuData?.title}
                                </Text>
                                <Text textStyle="caption" color="red">
                                    {'View all'}
                                </Text>
                            </Link>
                        </NextLink>
                    </Box>
                </Flex>

                {menuData?.submenu?.map(({ title, submenu, cleanUrl, relative }, index) =>
                    submenu && submenu.length > 0 ? (
                        <Link
                            onClick={() => setThirdMenu({ submenu: submenu, title: title, relative: relative })}
                            position="relative"
                            className="menu-item"
                            key={`lvl2-exp-${index}`}
                            marginBottom={'25px'}
                            textStyle="caption"
                            color="brand"
                            textTransform="uppercase"
                            display="flex"
                            align="center"
                            justifyContent="space-between"
                        >
                            {title}
                            <Image src="/assets/mobile-menu-arrow.svg" w="5px" alt="Previous" />
                        </Link>
                    ) : (
                        <NextLink href={cleanUrl || '#'} key={`lvl2-simple-${index}`}>
                            <Link
                                display="block"
                                position="relative"
                                mb="25px"
                                textStyle="caption"
                                textTransform="uppercase"
                                color="brand"
                            >
                                {title}
                            </Link>
                        </NextLink>
                    )
                )}
            </Box>
        </>
    );
};
export default LevelTwoMobileMenu;
