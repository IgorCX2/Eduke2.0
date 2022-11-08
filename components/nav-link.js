import Image from 'next/image'
import Link from "next/link";
import { parseCookies, setCookie } from 'nookies'
import { useEffect, useState } from 'react'
var jwt = require('jsonwebtoken');
const { promisify } = require('util');
const imageLoader = ({ src }) => {
    return `https://eduke21.vercel.app/${src}`;
};
export default function NavBar({imageLoader}){
    const [Stats, setStats] = useState()
    const [Decodificado, setDecodificado] = useState({
        id: '',
        nick: ''
    })
    useEffect(() => {
        async function InfoUser() {
            const cookies = await parseCookies();
            if(cookies.fromClient == undefined ){
                setStats("N");
            }else{
                const decode = await promisify(jwt.verify)(cookies.fromClient, "OD2DS8S21DSA4SD4SS3A");
                setDecodificado({
                    id: decode.id,
                    nick: decode.nick
                });
            }
        }
        InfoUser()
      }, [])
    return(
        <header className="w-full flex relative z-20 justify-between py-5 items-center">
            <div className="flex gap-44 items-center">
                <Link href="/" className="flex gap-3 items-center">
                    <Image
                        loader={imageLoader}
                        src="/logo.png"
                        alt="LogoCX2"
                        width={35}
                        height={50}
                        priority
                    />
                    <div>
                        <h1 className="text-2xl font-black">EDUKE</h1>
                        <h2 className="text-xl font-semibold -mt-2 tracking-widest">by CX2</h2>
                    </div>
                </Link>
                <nav>
                    <ul className="flex gap-10">
                        <li>
                            <Link href="/plano-de-estudo">Plano de Estudo</Link>
                        </li>
                        <li>
                            <Link href="/plano-de-estudo">Simulado</Link>
                        </li>
                        <li>
                            <Link href="/">Redação</Link>
                        </li>
                        <li>
                            <Link href="/">Tarefas</Link>
                        </li>
                        <li>
                            <Link href="/calendario">Calendario</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            {Stats == "N" ? 
                <div className="flex gap-5">
                    <Link href="/perfil/cadastro" className="rounded-lg border py-2.5 px-4">CADASTRO</Link>
                    <Link href="/perfil/entrar" className="rounded-lg bg-blue-500 text-white p-2 font-bold py-2.5 px-4">LOGIN</Link>
                </div>
            :
                <Link  href="/perfil">
                    <div className="flex gap-5 items-center" >
                        <div className="flex flex-col ">
                            <p className="text-blue-500 font-bold text-2xl">1</p>
                        </div>
                        <div className="flex flex-col ">
                            <p>Seja Bem Vindo(a)</p>
                            <p>{Decodificado.nick}</p>
                        </div>
                    </div>
                </Link>
            }
        </header>
    )
}