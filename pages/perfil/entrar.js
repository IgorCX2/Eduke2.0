import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from 'react'
import { parseCookies, setCookie } from 'nookies'
import Router from 'next/router';
var jwt = require('jsonwebtoken');
const imageLoader = ({ src }) => {
    return `http://localhost:3000/${src}`;
};
export default function SingIn({imageLoader}){
    useEffect(() => {
        async function InfoLogin(){
            const cookies = parseCookies();
            if(cookies.fromClient != undefined){
                Router.push("/perfil")
            }
        }
        InfoLogin()
    }, [])
    const [response, setResponse] = useState({
        type: '',
        mensagem: ''
    })
    const [dataForm, setDataForm] = useState({
        usuario: '',
        senha: ''
    })
    const onChangeInput = e => setDataForm({...dataForm, [e.target.name]: e.target.value});
    const sendForm = async e =>{
        e.preventDefault();
        if(dataForm.usuario == "" || dataForm.senha == ""){
            setResponse({
                type: 'erro',
                mensagem: 'voce deve preencher todos os campos'
            });
        }else{
            setResponse({
                type: 'loading',
                mensagem: 'CONFERINDO INFORMAÇÕES EM'
            })
            const response = await fetch(`https://eduke20.vercel.app/api/userconfig/list-user`)
            const data = await response.json();
            const usuarios = data.users;
            var conferir = 0;
            var userlogin = [];
            usuarios.map(usuario => {
                if((usuario.email == dataForm.usuario || usuario.nick == dataForm.usuario) && usuario.senha == dataForm.senha){
                    conferir++
                    userlogin = usuario
                }
            })
            if(conferir > 0){
                setResponse({
                    type: 'loading',
                    mensagem: 'LOGANDO EM'
                })
                var token = jwt.sign({id: userlogin.id_user, nick: userlogin.nick}, "OD2DS8S21DSA4SD4SS3A",{
                    expiresIn: '1d'
                })
                const token1 = await token;
                setCookie(null, 'fromClient', token1, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: '/',
                });
                setResponse({
                    type: 'success',
                    mensagem: "logado com sucesso"
                });
                location.reload();
            }else{
                setResponse({
                    type: 'erro',
                    mensagem: "usuario ou senha não encontrados"
                })
            }
        }
    }
    return(
        <>
            <div className="absolute w-0.5 h-full bg-gradient-to-t from-transparent via-gray-400 top-0 items-center	flex ">
                <div className='w-1.5 h-40 rounded-full bg-gradient-to-t from-blue-500 absolute -left-0.5 drop-shadow-toxl'></div>
            </div>
            <main className='flex justify-evenly items-center mt-24'>
                <div>
                    <Image
                        loader={imageLoader}
                        src="/book.svg"
                        alt="Picture of the author"
                        width={600}
                        height={600}
                    />
                </div>
                <div className='max-w-md w-full'>
                    <h1 className='text-8xl font-black'>LOGAR</h1>
                    <h2 className='mt-5'>Realize o seu login para juntar-se a nossa comunidade e desfrute de vantagens incriveis, que voce so pode conferir aqui =)</h2>
                    <form className='gap-4 flex flex-col mt-5' onSubmit={sendForm}>
                        <input className="w-full border rounded-lg bg-transparent outline-none p-2 py-3 mb-2" type="text" name="usuario" placeholder='Usuario ou Email' onChange={onChangeInput}/>
                        <input className="w-full border rounded-lg bg-transparent outline-none p-2 py-3 mb-2" type="password" name="senha" placeholder='Senha' onChange={onChangeInput}/>
                        <Link href="/perfil/cadastro">não tenho um cadastro. <u>Fazer Cadastro</u></Link>
                        <input type="submit" className="w-full rounded-lg bg-gradient-to-r from-bluelight to-blue-500 text-white p-2 font-bold py-3 hover:from-blue-500 hover:to-blue-500" value="fazer login"/>
                        <Link href="/perfil/cadastro">Esqueceu a senha?</Link>
                        {response.type == 'erro' || response.type == 'success' ? <p>{response.mensagem}</p> : ""}
                    </form>
                </div>
            </main>
        </>
    )
}