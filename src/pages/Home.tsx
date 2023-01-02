import { Button, Grid, GridItem, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import chatRooms from '../config/chatRooms';
import MainContainer from '../layouts/MainContainer';

export default function Home() {
    const navigate = useNavigate();

    const handleClick = (room: string) => {
        navigate(`/room/${room}`);
    };

    return (
        <MainContainer>
            <Text mb={10} fontSize='4xl' fontWeight='bold' alignSelf='center'>
                💬 Chat Rooms
            </Text>
            <Grid templateColumns='repeat(12, 1fr)' w='full' gap={4} alignItems='center'>
                {chatRooms.map((room) => (
                    <GridItem key={room.id} colSpan={{ base: 6 }}>
                        <Button type='button' onClick={() => handleClick(room.id)} fontSize='xl' w='full' p={10}>
                            {room.title}
                        </Button>
                    </GridItem>
                ))}
            </Grid>
        </MainContainer>
    );
}
