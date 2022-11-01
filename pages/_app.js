import Container from '../components/container'
import NavBar from '../components/nav-link'
import '../styles/globals.css'
export default function MyApp({ Component, pageProps}) {
  return(
    <>
      <Container>
        <NavBar/>
        <Component {...pageProps} />
      </Container>
    </>
  ) 
}