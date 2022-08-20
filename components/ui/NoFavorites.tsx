import React from 'react'
import { Container, Text } from '@nextui-org/react'
import Image from 'next/image'

export const NoFavorites = () => {
    return (
        <Container css={{
            display:'flex',
            flexDirection:'column',
            height: 'calc(100vh - 100px)', 
            alignItems:'center',
            justifyContent: 'center',
            alignSelf: 'center',
        }}>
            <Text h3> Parace que aun no hay favoritos, agrega uno para verlo aquí </Text>
            <Image 
                src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/6.svg'} 
                alt="Charizard"
                width={250}
                height={250}
                
                style={{ 
                    opacity: 0.4
                }} />
        </Container>
    )
}

