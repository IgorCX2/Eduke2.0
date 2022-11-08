import Image from 'next/image'
import Link from 'next/link';
const imageLoader = ({ src }) => {
    return `https://eduke21.vercel.app/${src}`;
};
export default function BoxTest(props){
    return(
        <Link href='/plano-de-estudo/avaliacaodiagnostica' className='w-full'>
            <div className='border rounded-lg w-full py-3 px-16 flex justify-between items-center text-lg'>
                <div className="flex flex-col">
                    <h1 className="font-bold text-lg">AVALIAÇÃO</h1>
                    <p>diagnostica</p>
                </div>
                <div>
                    <Image loader={imageLoader} src="/book.svg" alt="Picture of the author" width={70} height={70}/>
                </div>
                <div className="text-center font-bold">
                    <p className="text-sm">Estado</p>
                    <p>Iniciar</p>
                </div>
            </div>
        </Link>
    )
}