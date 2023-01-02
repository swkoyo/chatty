import { Center, Grid, GridItem, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import chatRooms from '../config/chatRooms';
import MainContainer from '../layouts/MainContainer';

export default function Home() {
    const navigate = useNavigate();

    return (
        <MainContainer>
            <Text mb={10} fontSize='4xl' fontWeight='bold' alignSelf='center'>
                💬 Chat Rooms
            </Text>
            <Grid templateColumns='repeat(12, 1fr)' w='full' gap={4} alignItems='center'>
                {chatRooms.map((room) => (
                    <GridItem key={room.id} colSpan={{ base: 6 }}>
                        <Center borderRadius='xl' background='whiteAlpha.400' p={10}>
                            <Text fontSize='xl'>{room.title}</Text>
                        </Center>
                    </GridItem>
                ))}
            </Grid>
        </MainContainer>
    );
}
