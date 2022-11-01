import Link from "next/link"
export default function Footer(){
    return(
        <footer className='w-full mt-12 bg-white p-2 z-20 absolute left-0 drop-shadow-n2xl'>
            <p className='text-center'>Desenvolvido com muita dedicação por <span className='text-dkwtblue font-bold'><Link href="/">----</Link></span></p>
        </footer>
    )
}
