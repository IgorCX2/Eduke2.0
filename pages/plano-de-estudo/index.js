import Image from 'next/image'
import Link from "next/link";
import { useEffect, useState } from 'react'
import { parseCookies} from 'nookies'
import Router from 'next/router';
var jwt = require('jsonwebtoken');
const { promisify } = require('util');
const imageLoader = ({ src }) => {
    return `http://localhost:3000/${src}`;
};
export default function PlanStudy({imageLoader}){
    const [Decodificado, setDecodificado] = useState({
        id: '',
        nick: ''
    })
    const [infoSaude, setInfoSaude] = useState('A')
    useEffect(()=>{
        async function InfoLogin(){
            const cookies = parseCookies();
            if(cookies.fromClient == undefined){
                Router.push("/conta/entrar");
            }else{
                const decode = await promisify(jwt.verify)(cookies.fromClient, "OD2DS8S21DSA4SD4SS3A");
                setDecodificado({
                    id: decode.id,
                    nick: decode.nick
                });
            }
        }
        InfoLogin()
    }, [])
    return(
        <main className='mt-1'>
            <section className='bg-blue-500 w-full flex justify-between text-white py-5 rounded-xl px-10'>
                <div className='flex gap-5 items-center'>
                    <div className='bg-white p-10 rounded-full'>

                    </div>
                    <div className='flex flex-col'>
                        <h1 className='text-xl font-bold'>{Decodificado.nick}</h1>
                        <h2>Primeiro acesso</h2>
                    </div>
                </div>
                <div className='flex gap-20'>
                    <div className="items-center flex flex-col gap-3">
                        <h1 className="text-3xl font-bold">1</h1>
                        <h2 className="font-medium">PONTOS</h2>
                    </div>
                    <div className="items-center flex flex-col gap-3">
                        <h1 className="text-3xl font-bold">1</h1>
                        <h2 className="font-medium">PLANO</h2>
                    </div>
                    <div className="items-center flex flex-col gap-3">
                        <h1 className="text-3xl font-bold">1 <span className='text-sm'>de</span> 20</h1>
                        <h2 className="font-medium">ESTUDADO</h2>
                    </div>
                </div>
            </section>
            {infoSaude == "A" ? 
            <section className='flex justify-evenly	mt-12 items-center'>
                <div className='flex flex-col max-w-md w-full'>
                    <h1 className='text-4xl font-bold'>Lembre-se</h1>
                    <h2 className='mt-10'>frase motivacional atudalizada diariamente aqui. Ou é burro(a) ou é feio(a). Seja so feio(a) =) Não tenha medo de mudar. Seja de trabalho, de curso, de carreira... Se você não se sente bem com o que está fazendo, provavelmente é porque deveria estar fazendo outra coisa. Só você sabe de verdade o que é melhor para você e ninguem pode de  julgar!</h2>
                    <div className='flex justify-between'>
                    <Link href="/" className="rounded-lg bg-blue-500 text-white p-2 font-bold py-2.5 px-4 text-center mt-10">Voce pode me ajudar?</Link>
                    <button onClick={() => setInfoSaude('N')} className="rounded-lg border p-2 font-bold py-2.5 px-4 text-center mt-10">Fechar</button>
                    </div>
                </div>
                <div className='relative flex items-end	'>
                    <Image
                        loader={imageLoader}
                        src="/usertest.svg"
                        alt="Picture of the author"
                        width={200} height={200}
                    />
                </div>
            </section>
            :
            <section className="flex mt-16 gap-14 justify-between">
                <div className="flex gap-14">
                    <div className="flex flex-col gap-14">
                        <div className="border rounded-lg w-80 py-3.5 relative">
                            <div className="absolute -top-8 -right-4">
                                <Image loader={imageLoader} src="/hard.svg" alt="Picture of the author" width={100} height={10}/>
                            </div>
                            <div className="px-5 py-2">
                                <h1 className="text-gray-300 font-medium">Materias que eu mando bem:</h1>
                                <p className="text-lg">Biologia Biologia</p>
                            </div>
                        </div>
                        <div className="border rounded-lg w-80 py-3.5 relative">
                            <div className="absolute -top-10 right-0">
                                <Image loader={imageLoader} src="/espada.svg" alt="Picture of the author" width={50} height={50}/>
                            </div>
                            <div className="px-5 py-2">
                                <h1 className="text-gray-300 font-medium">Materias que eu mando bem:</h1>
                                <p className="text-lg">Biologia Biologia</p>
                            </div>
                        </div>
                        <div className="border rounded-lg w-80 py-3.5 relative">
                            <div className="absolute -top-10 right-0">
                                <Image loader={imageLoader} src="/watch.svg" alt="Tempo estudado hoje" width={60} height={60}/>
                            </div>
                            <div className="px-5 py-2">
                                <h1 className="text-gray-300 font-medium">Materias que eu mando bem:</h1>
                                <p className="text-lg">19h30m20s</p>
                            </div>
                        </div>
                    </div>
                    <div className="border rounded-lg w-64 relative flex flex-col-reverse justify-between items-center py-5 gap-2">
                        <strong>0</strong>
                        <div className="w-12 h-full bg-bluelight relative">
                            <div className="w-12 h-20 bg-gray-200 absolute"></div>
                        </div>
                        <div className="flex flex-col text-center">
                            <Image loader={imageLoader} src="/chest.svg" alt="Picture of the author" width={80} height={80}/>
                            <strong>100</strong>
                        </div>
                    </div>
                </div>                   
                <div className='w-full relative'>
                    <Image loader={imageLoader} src="/capa.svg" alt="Picture of the author" fill={true}/>
                </div>
            </section>
            }

            <section className='bg-gray-200 w-full text-white py-5 rounded-xl px-10 mt-14'>
                propaganda...
            </section>
            <section className="mt-24">
                <h1 className="font-black text-7xl">Plano de Estudos</h1>
                <div className="flex justify-between mt-10 gap-16">
                    <div className='flex w-full flex-wrap gap-16'>
                        <div className='border rounded-lg w-full py-2 px-16 flex justify-between items-center text-lg'>
                            <div className="flex flex-col">
                                <h1 className="font-bold text-lg">AVALIAÇÃO</h1>
                                <p>diagnostica</p>
                            </div>
                            <div>
                                <Image loader={imageLoader} src="/book.svg" alt="Picture of the author" width={70} height={70}/>
                            </div>

                            <div className="text-center font-bold">
                                <p className="text-sm">prova nº</p>
                                <p>1</p>
                            </div>
                        </div>
                        <div className='border max-h-36	h-full rounded-lg w-60 py-4 px-10 flex flex-col justify-between text-lg'>
                            <div className='gap-1 flex flex-col'>
                                <h1 className='font-bold text-lg'>conteudo...</h1>
                                <h2>matematica</h2>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <h3 className='text-sm'>Em andamento</h3>
                                <div className='h-px w-full bg-red-500'></div>
                            </div>
                        </div>
                        <div className='border max-h-36	h-full rounded-lg w-60 py-4 px-10 flex flex-col justify-between text-lg'>
                            <div className='gap-1 flex flex-col'>
                                <h1 className='font-bold text-lg'>conteudo...</h1>
                                <h2>matematica</h2>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <h3 className='text-sm'>Em andamento</h3>
                                <div className='h-px w-full bg-red-500'></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-16 w-96">
                        <div className="border rounded-lg w-full relative flex flex-col justify-between items-center py-5 gap-2">
                            <div className="absolute -top-10">
                                <Image loader={imageLoader} src="/watch.svg" alt="Picture of the author" width={65} height={65}/>
                            </div>
                            <div className="py-2 text-center">
                                <h1 className="text-gray-300 font-medium">Tempo estudado hoje</h1>
                                <p className="text-lg">19h30m20s</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}