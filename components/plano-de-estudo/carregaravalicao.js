import Image from "next/image";
const imageLoader = ({ src }) => {
    return `http://localhost:3000/${src}`;
};
import { useState, useEffect } from "react";

export default function LoadingTest(){
    const [iniciar, setInicio] = useState("N")
    return(
        <main className='flex flex-col justify-center items-center mt-8'>
        <h1 className='text-6xl font-black'>Em Espera</h1>
        <h2 className='max-w-2xl w-full text-center mt-5'>Você está iniciando uma avalição diagnostica para podermos personalizar o seu plano de estudo. Com isso pedimos que você faça esta avaliação com muita dedicação</h2>
        <div className='max-w-xl w-full mt-8'>
            <h3 className='font-bold text-center '>Lembre-se:</h3>
            <ol>
                <li className='mt-1'>*Caso não saiba a resposta de alguma de questão, não tenha vergonha de assinalar "Não Sei =("</li>
            </ol>
        </div>
        <div className='bg-blue-500/15 p-10 rounded-full '>
            <Image
                loader={imageLoader}
                src="/usertest.svg"
                alt="Picture of the author"
                width={200} height={200}
            />
        </div>
        <div className='text-center mt-10'>
            <button className="rounded-lg bg-blue-500 text-white p-2 font-bold py-2.5 px-4" onClick={() => setInicio("S")}>Iniciar </button>
            <h4 className='mt-4 text-sm'> ao clicar no botão ira iniciar a avaliação diagnostica =)</h4>
        </div>
    </main>
    )
}