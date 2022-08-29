import React from 'react'
import {
    useDisclosure,
    List,
    ListItem,
    ListIcon,
    Image,
    Popover, Text, PopoverContent, PopoverArrow, PopoverBody, Button, PopoverTrigger, VStack, HStack
} from '@chakra-ui/react'
import { BsCircleFill } from 'react-icons/bs'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Switch, FormControl, FormLabel } from '@chakra-ui/react'
import { networkAtom } from 'state/atoms/walletAtoms'
import { useRecoilState } from 'recoil'

const walletSelect = ({ denom, chainList = [], onChange, connected }) => {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const firstFieldRef = React.useRef(null)
    const [network, setNetwork] = useRecoilState(networkAtom)

    return (
        <Popover placement='top-end'
            isOpen={isOpen}
            initialFocusRef={firstFieldRef}
            onOpen={onOpen}
            onClose={onClose}
        >
            <PopoverTrigger>
                {connected ? (
                    <HStack
                        as={Button}
                        variant="unstyled"
                    >
                        <Text fontSize={["14px", "16px"]} >{denom}</Text>
                        <ChevronDownIcon />
                    </HStack>

                ) : (
                    <HStack
                        as={Button}
                        variant="unstyled"
                        backgroundColor="rgba(0, 0, 0, 0.5)"
                        color="white"
                        borderRadius="full"
                        justifyContent="center"
                        alignItems="center"
                        paddingX={6}
                        paddingY={1}
                    >
                        <Text fontSize={["14px", "16px"]}>{denom}</Text>
                        <ChevronDownIcon />
                    </HStack>

                )}

            </PopoverTrigger>
            <PopoverContent
                borderColor="#1C1C1C"
                borderRadius="30px"
                backgroundColor="#1C1C1C"
                width="253px"
                marginTop={3}
            >
                <PopoverArrow bg='#1C1C1C' boxShadow="unset" style={{ boxShadow: "unset" }} sx={{ '--popper-arrow-shadow-color': 'black' }} />
                <PopoverBody padding={6}  >
                    <VStack alignItems="flex-start" width="full" gap={2}>
                        <Text color="brand.200" fontSize="16px" fontWeight="400">Select network</Text>

                        {!process?.env?.production && (
                            <FormControl display='flex' alignItems='center' justifyContent="space-between">
                                <FormLabel htmlFor='network' mb='0'>
                                    <Text color="brand.200" fontSize="16px" fontWeight="400">Testnet</Text>
                                </FormLabel>
                                <Switch
                                    id='network'
                                    isChecked={network === 'testnet'}
                                    onChange={({ target }) => {
                                        setNetwork(target.checked ? 'testnet' : 'mainnet')

                                    }} />
                            </FormControl>
                        )}

                        <List spacing={1} color="white" width="full" >

                            {chainList.map((chain, index) => (
                                <ListItem
                                    key={chain.chainId + chain?.chainName}
                                    justifyContent="space-between"
                                    display="flex"
                                    alignItems="center"
                                    borderBottom={index === chainList.length - 1 ? 'unset' : "1px solid rgba(255, 255, 255, 0.1)"}
                                    paddingY={1}
                                    opacity={chain.active ? 1 : 0.3}
                                    cursor="pointer"
                                    _hover={{
                                        opacity: 1
                                    }}
                                    onClick={() => { onChange(chain); onClose() }}
                                >
                                    <HStack>
                                        <Image src={chain?.icon} boxSize={30} objectFit='cover' />
                                        <Text paddingLeft={3} >{chain?.label?.toUpperCase()}</Text>
                                    </HStack>
                                    <ListIcon as={BsCircleFill} color='#3CCD64' boxShadow="0px 0px 14.0801px #298F46" bg="#1C1C1C" borderRadius="full" />
                                </ListItem>
                            ))}
                        </List>

                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default walletSelect