var jwt = require('jsonwebtoken');
const { promisify } = require('util');
import Image from 'next/image'
import { getQuestion } from '../../script/getContent';
import markdownStyles from '../../components/markdown-styles.module.css'
import markdownToHtml from '../../script/markdownToHtml';
import { parseCookies} from 'nookies'
import Router from 'next/router';
import Container from '../../components/container'
import { useState, useEffect } from "react";
const imageLoader = ({ src }) => {
    return `http://localhost:3000/${src}`;
};
export default function Prova(props){
    const [iniciar, setInicio] = useState("N")
    const [NumberAnswer, SetNumberAnswer] = useState(0)
    const [AAnswer, SetAnswer] = useState("")
    const [Response, setResponse] = useState("")
    const [Question, setQuestion] = useState({
        questao: '',
        alternativa: [],
    })
    useEffect(() => {
        async function InfoLogin(){
            if(props.cookies == "N" || props.estado != '0'){
                Router.push("/perfil/entrar");
            }
        }
        InfoLogin()
    }, [])
    if(iniciar == "N"){
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
    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    } 
    const Answer = async e => {
        if(AAnswer.length > 0){
            setQuestion({
                questao: "carregando",
                alternativa: "",
            })
            if(NumberAnswer >= 10){
                const res = await fetch('https://eduke20.vercel.app/api/nivel/nivel', {
                    method: 'POST',
                    body: JSON.stringify({ "id": Number(props.cookiesid)-1, "nivel": AAnswer}),
                    headers: { 'Content-Type': 'application/json' }
                });
                const responseEnv = await res.json();
                const niveluser = responseEnv.mensagem.split(',')
                let numbersDesc = niveluser.sort(function(a, b) {
                    return a.split('=')[0] - b.split('=')[0];
                });
                const atualizar = await fetch('https://eduke20.vercel.app/api/userconfig/mudar-status', {
                    method: 'POST',
                    body: JSON.stringify({ "id": Number(props.cookiesid)-1, "status": numbersDesc.slice(0, 8).toString()}),
                    headers: { 'Content-Type': 'application/json' }
                });
                Router.push("/plano-de-estudo");
            }else{
                const res = await fetch('https://eduke20.vercel.app/api/nivel/nivel', {
                    method: 'POST',
                    body: JSON.stringify({ "id": Number(props.cookiesid)-1, "nivel": AAnswer}),
                    headers: { 'Content-Type': 'application/json' }
                });
                const responseEnv = await res.json();
                const atualizarquestão = await fetch('https://eduke20.vercel.app/api/questao/questao', {
                    method: 'POST',
                    body: JSON.stringify({ "nivel": responseEnv.mensagem}),
                    headers: { 'Content-Type': 'application/json' }
                });
                const responseQues = await atualizarquestão.json();
                const questionseparada = responseQues.questao.split('§')
                const newquestion = questionseparada[Math.floor(Math.random() * questionseparada.length)].split('&')
                const alternativaseparada = newquestion[1]?.toString().split('£')
                const markcontent = await markdownToHtml(newquestion[0] || '')
                await delay(1000);
                SetNumberAnswer(NumberAnswer+1)
                setQuestion({
                    questao: markcontent,
                    alternativa: alternativaseparada,
                })
                SetAnswer("")
                setResponse("")
            }
        }else{
            setResponse("Você precisa assinalar alguma alternativa")
        }
    }
    return(
        <main className="absolute top-0 left-0 w-full h-full">
            <section className='bg-gray-200 w-full mt-24 drop-shadow-n2xl py-12 flex justify-center' >
                <div className='w-3/5'>
                    <div className='flex justify-between text-lg mb-10'>
                        <div className={`text-center bg-white rounded-lg py-1 w-36`} >Questão {NumberAnswer}</div>
                        <div className={`text-center bg-white rounded-lg py-1 w-36`} >{AAnswer}</div>
                    </div>

                    <div className='flex w-full'>
                        <div className='flex flex-col text-lg'>
                            <h1>{Question.questao.length != 0 ? <div className={`${markdownStyles['markdown']} mt-5 text-lg`} dangerouslySetInnerHTML={{ __html:Question.questao}}/>: "Como você se sente ao fazer uma avaliação diagnostica. Sendo 1 péssimo e 5 super tranquilo"}</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className='bg-white relative flex flex-col items-center justify-center z-20'>
                <div className={`flex w-3/5 justify-between py-10`}>
                    <div className=' flex flex-col gap-5 text-lg'>
                        <button className={`flex cursor-pointer py-1 focus:underline focus:scale-105 rounded-lg `} onClick={() => SetAnswer(Question.alternativa.length != 0 ? Question.alternativa[1]: "0=0:0")}>
                            <strong>A) </strong>{Question.alternativa.length != 0 ? Question.alternativa[0]: Question.questao == "carregando" ? "carregando" : "1"}
                        </button>
                        <button className={`flex cursor-pointer py-1 focus:underline focus:scale-105 rounded-lg`} onClick={() => SetAnswer(Question.alternativa.length != 0 ? Question.alternativa[3]: "0=0:0")}>
                            <strong>B) </strong>{Question.alternativa.length != 0 ? Question.alternativa[2]: Question.questao == "carregando" ? "carregando" : "2"}
                        </button>
                        <button className={`flex cursor-pointer py-1 focus:underline focus:scale-105 rounded-lg`} onClick={() => SetAnswer(Question.alternativa.length != 0 ? Question.alternativa[5]: "0=0:0")}>
                            <strong>C) </strong>{Question.alternativa.length != 0 ? Question.alternativa[4]: Question.questao == "carregando" ? "carregando" : "3"}
                        </button>
                        <button className={`flex cursor-pointer py-1 focus:underline focus:scale-105 rounded-lg `} onClick={() => SetAnswer(Question.alternativa.length != 0 ? Question.alternativa[7]: "0=0:0")}>
                            <strong>D) </strong>{Question.alternativa.length != 0 ? Question.alternativa[6]: Question.questao == "carregando" ? "carregando" : "4"}
                        </button>
                        <button className={`flex cursor-pointer py-1 focus:underline focus:scale-105 rounded-lg `} onClick={() => SetAnswer(Question.alternativa.length != 0 ? Question.alternativa[9]: "0=0:0")}>
                            <strong>E) </strong>{Question.alternativa.length != 0 ? Question.alternativa[8] : Question.questao == "carregando" ? "carregando" : "5"}
                        </button>
                    </div>
                    <div className='flex flex-col justify-between gap-5 ml-4'>
                        <button className='rounded-lg bg-blue-500 text-white p-2 font-bold h-full' onClick={() => Answer()}>{NumberAnswer < 10 ? "Responder" : "Finalizar"}</button>
                    </div>
                </div>
                {Response != "" && AAnswer == "" ? <p>{Response}</p>: ""}
            </section>
        </main>
    )
}
export async function getServerSideProps(context){
    const cookies = parseCookies(context);
    var iduser = ''
    if(cookies.fromClient != undefined){
        var decode = await promisify(jwt.verify)(cookies.fromClient, "OD2DS8S21DSA4SD4SS3A");
        iduser = decode.id
    }else{
        iduser = '2'
        cookies.fromClient = "N"
    }   
    const res = await fetch('https://eduke20.vercel.app/api/userconfig/user-id', {
        method: 'POST',
        body: JSON.stringify({ "id": Number(iduser)-1}),
        headers: { 'Content-Type': 'application/json' }
    });
    const responseEnv = await res.json();
    return{
        props:{
            estado: responseEnv.estado,
            cookies: cookies.fromClient,
            cookiesid: iduser
        }
    }
}