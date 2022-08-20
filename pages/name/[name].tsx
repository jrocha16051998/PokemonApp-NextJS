import React, { useEffect } from 'react'
import { GetStaticProps, NextPage, GetStaticPaths } from 'next'
import { MainLayout } from '../../components/layouts'
import { pokeApi } from '../../api'
import { PokeByName } from '../../interfaces/pokeByName'
import { Pokemon } from '../../interfaces'
import { Grid, Card, Button, Container, Text, Image } from '@nextui-org/react'
import { useState } from 'react'
import { getPokemonInfo, localFavorites } from '../../utils'
import confetti from 'canvas-confetti'



interface Props{
    pokemon: Pokemon
}
export const PokemonByNamePage : NextPage<Props> = ({ pokemon }) => {
    
    const [isInFavorites, setIsInFavorites] = useState( false )
    useEffect(() => {
        setIsInFavorites ( localFavorites.existInFavorites(pokemon.id) )
      
    },[] )

    const onToggleFavorite = () =>{
        localFavorites.toggleFavorites(pokemon.id)
        setIsInFavorites( !isInFavorites )
    
        if( !isInFavorites){
            confetti({
                zIndex:999,
                particleCount: 100,
                spread: 160,
                angle: -100,
                origin:{
                    x:1,
                    y:0
                }
            })
        }
    }
    
    return (
        <MainLayout title='Pokemons por nombre'>
            <Grid.Container css={{ marginTop:'5px'}} gap={ 2 } >
                <Grid xs={ 12 } sm={ 4}>
                    <Card  isHoverable css={{ padding: '30px' }} >
                        <Card.Body>
                            <Card.Image src={ pokemon.sprites.other?.dream_world.front_default || 'no-image' }
                                alt={ pokemon.name }
                                width='100%'
                                height='200px'
                            />
                        </Card.Body>
                    </Card>
                
                </Grid>
                <Grid xs={ 12 } sm={ 8 } >
                    <Card>
                        <Card.Header css={{ dispay: 'flex', justifyContent: 'space-between'}} >
                            <Text h1 transform='capitalize' > { pokemon.name }</Text>
                            <Button 
                                color='gradient'   
                                ghost={ !isInFavorites }
                                onPress={onToggleFavorite}>
                                { isInFavorites ? 'Eliminar de favoritos' : 'Guardar en favoritos'}
                                    
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Text size={30}>Sprites:  </Text>
                            <Container display='flex' direction='row' gap={0} > 
                                <Image
                                    src={ pokemon.sprites.front_default}
                                    alt={ pokemon.name }
                                    width={ 100 }
                                    height={ 100 }
                                />
                                <Image
                                    src={ pokemon.sprites.back_default}
                                    alt={ pokemon.name }
                                    width={ 100 }
                                    height={ 100 }
                                /><Image
                                    src={ pokemon.sprites.front_shiny}
                                    alt={ pokemon.name }
                                    width={ 100 }
                                    height={ 100 }
                                /><Image
                                    src={ pokemon.sprites.back_shiny}
                                    alt={ pokemon.name }
                                    width={ 100 }
                                    height={ 100 }
                                />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>

            </Grid.Container>
          
        </MainLayout>
    )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const { data } = await pokeApi.get<PokeByName>('/pokemon?limit=151') 
    const { results } = data
    
    return {
        paths: results.map(({ name }) =>({
            params:{ name }
        })),
        fallback: 'blocking'
    }
}



export const getStaticProps: GetStaticProps  = async ({ params }) => {
  
    const { name } = params as { name: string }

    const pokemon = await getPokemonInfo( name )

    if(!pokemon){
        return{
            redirect:{
                destination: '/',
                permanent: false
            }
        }

    }

    return {
        props: {
            pokemon
        }
    }
    
}




export default PokemonByNamePage    