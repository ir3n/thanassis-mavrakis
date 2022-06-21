import { useState, useEffect, memo } from 'react';
import { useRouter } from 'next/router';
import { Box, Text, Link, useDisclosure } from '@chakra-ui/react';
import Container from '../Container';
import TabFilterMenu from '../TabFilterMenu';
import NextLink from 'next/link';
import useMenu from 'hooks/useMenu';
import { useOutsideClick } from '@chakra-ui/react';
import { useRef } from 'react';

const Menu = ({ iconMenuShow, menuAndFooterData }) => {
    const router = useRouter();
    const ref = useRef();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [customTopMargin, setCustomTopMargin] = useState(0);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const { menuData, isLoading } = useMenu('main');

    const handleOnClose = () => {
        setSelectedMenu(null);
        onClose();
    };

    useOutsideClick({
        ref: ref,
        handler: () => setSelectedMenu(null)
    });

    useEffect(() => {
        if (isOpen) {
            const headerTopMenu = document.getElementById('mainMenu');
            const headerBottomOnScroll = headerTopMenu?.getBoundingClientRect().bottom;

            if (headerBottomOnScroll < 0) {
                setCustomTopMargin(0);
            } else {
                setCustomTopMargin(headerBottomOnScroll);
            }
        }
    }, [isOpen]);

    useEffect(() => {
        setSelectedMenu(null);
    }, [router.asPath]);

    const thisPath = router.asPath.substr(router.asPath.lastIndexOf('/') + 1);

    return (
        <>
            <Box
                id="mainMenu"
                className="overrideModal"
                as={'nav'}
                height={'auto'}
                display={{ base: 'none', sm: 'none', md: 'none', lg: 'none', xl: 'flex', '2xl': 'flex' }}
                justifyContent="space-evenly"
                background={'white'}
                position={'relative'}
                p="10px 0 5px 0;"
            >
                <Container w={'100%'} margin={'0 auto'}>
                    <Box justifyContent={'space-between'} display={'flex'} className="menu_container" width={'100%'}>
                        {menuData?.map(
                            ({ title, submenu, entity_id, relative, external, cleanUrl, ...menuItemProps }, index) => (
                                <Text
                                    _hover={{ color: 'brand' }}
                                    color="black"
                                    as="div"
                                    className="menu_items"
                                    key={`menuItem-${index}`}
                                    whiteSpace="nowrap"
                                    textStyle={'sm'}
                                    textTransform={'uppercase'}
                                >
                                    {submenu ? (
                                        <Link
                                            pos={'relative'}
                                            textDecoration="none !important"
                                            marginBottom="24px"
                                            zIndex={isOpen ? 9999 : 9}
                                            _focus={{ boxShadow: 'none' }}
                                            onClick={() => {
                                                setSelectedMenu(
                                                    selectedMenu
                                                        ? null
                                                        : {
                                                              title,
                                                              submenu,
                                                              relative,
                                                              external,
                                                              cleanUrl,
                                                              ...menuItemProps
                                                          }
                                                );
                                            }}
                                        >
                                            <Text textStyle={'md'} textTransform={'uppercase'}>
                                                {title}
                                            </Text>
                                        </Link>
                                    ) : (
                                        <NextLink href={cleanUrl} passHref prefetch={false}>
                                            <Link
                                                target={external ? '_blank' : '_self'}
                                                onClick={handleOnClose}
                                                _hover={{ color: 'brand' }}
                                                _focus={{ boxShadow: 'none' }}
                                                pos={'relative'}
                                                zIndex={isOpen ? 9999 : 9}
                                                color={'black'}
                                                fontFamily={'Open sans'}
                                            >
                                                <Text textStyle={'md'} textTransform={'uppercase'}>
                                                    {title}
                                                </Text>
                                            </Link>
                                        </NextLink>
                                    )}
                                </Text>
                            )
                        )}
                    </Box>
                </Container>

                {selectedMenu?.submenu ? (
                    <Box
                        position={'absolute'}
                        background={'white'}
                        zIndex={'9'}
                        top={'20px'}
                        left={0}
                        right={0}
                        width={'100%'}
                        boxShadow={'0px 15px 10px -15px rgb(0 0 0 / 63%)'}
                    >
                        <Box
                            borderWidth="0.5px"
                            borderStyle={'solid'}
                            borderColor={'grey'}
                            width="100vw"
                            mb="16px"
                            mt="4px"
                            overflowX={'hidden'}
                        />
                        <Container>
                            <Box>
                                <TabFilterMenu
                                    selectedMenu={selectedMenu}
                                    onClose={handleOnClose}
                                    thisPath={thisPath}
                                />
                            </Box>
                        </Container>
                    </Box>
                ) : null}
            </Box>
        </>
    );
};

export default memo(Menu);