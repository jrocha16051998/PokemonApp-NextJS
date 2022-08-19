import { Grid, Card } from '@nextui-org/react'
import React, { FC } from 'react'
import { useRouter } from 'next/router'

interface Props {
    id: number
}
export const FavoriteCard : FC <Props> = ({ id }) => {
    const router = useRouter()

    const handleClickOnCard = (id : number) =>{
        router.push(`/pokemon/${id}`)
    }
    return (
        <Grid xs={6} sm={ 2 } md={ 1 } key={ id }>
            <Card isHoverable isPressable css={{ padding:10}} onClick={ () => handleClickOnCard (id)}>
                <Card.Image 
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                    width={ '100%' }
                    height={ '140px' }
                />
            </Card>
        </Grid>
    )
}
