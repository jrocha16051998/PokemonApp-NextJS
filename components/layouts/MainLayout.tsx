import { FC, ReactElement} from 'react'
import Head from 'next/head'
import { Navbar } from '../ui'


interface Props {
  children: ReactElement
  title : string
}
const origin = ( typeof window === 'undefined' ) ? '' : window.location.origin
export const MainLayout: FC<Props> = ({ children, title }) => {
    
    console.log(origin)  
    return (
        <>
            <Head>
                <title>{ title || 'Pokemon App' }</title>
                <meta name='author' content='Juan Rocha'></meta>
                <meta name='description' content={`Informacion sobre el Pokémon: ${title} `}></meta>
                <meta name='keywords' content={`${ title } pokemon`}></meta>
                <meta property="og:title" content={`Información sobre ${title} de Andrés`} />
                <meta property="og:description" content={`Esta es la página de ${ title }`}/>
                <meta property="og:image" content={`${origin}/img/banner.png` }/>
            </Head>
            <Navbar/>
            <main style={{
                padding: '0px 20px'
            }}>
                { children }
            </main>
        
        </>
    )
}
