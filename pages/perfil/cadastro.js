import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { parseCookies, setCookie } from 'nookies'
const imageLoader = ({ src }) => {
    return `http://localhost:3000/${src}`;
};
import Router from 'next/router';
export default function SingUp({imageLoader}){
    useEffect(() => {
        async function InfoLogin(){
            const cookies = parseCookies();
            if(cookies.fromClient != undefined){
                Router.push("/perfil")
            }
        }
        InfoLogin()
    }, [])
    const [response, setResponse] = useState ({
        type: '',
        msg: '',
    })
    const [dataForm, setDataForm] = useState({
        email: '',
        usuario: '',
        senha: '',
        escolaridade: '',
    })
    const onChangeInput = e => setDataForm({...dataForm, [e.target.name]: e.target.value});
    const sendForm = async e => {
        e.preventDefault()
        if(dataForm.email != "" && dataForm.senha != "" && dataForm.escolaridade != "" && dataForm.usuario != ""){
            if(dataForm.senha.length >= 6){
                setResponse({
                    type: 'loading',
                    mensagem: 'CONFERINDO INFORMAÇÕES EM'
                })
                const consulta = await fetch(`https://eduke20.vercel.app/api/userconfig/list-user`)
                const data = await consulta.json();
                const usuario = data.users
                var conferir = 0;
                usuario.map(usuario => {
                    if(usuario.email == dataForm.email){
                        conferir++
                    }
                    if(usuario.username == dataForm.usuario){
                        conferir =+10
                    }
                })
                if(conferir > 0){
                    if(conferir > 0 && conferir <10){
                        setResponse({
                            type: 'erro',
                            mensagem: 'ja existe um usuario com este email!'
                        })
                    }
                    if(conferir > 10){
                        setResponse({
                            type: 'erro',
                            mensagem: 'o nome de usuario ja esta sendo utilizado!'
                        })
                    }

                }else{
                    setResponse({
                        type: 'loading',
                        mensagem: 'CADASTRANDO EM'
                    })
                    try{
                        const res = await fetch('https://eduke20.vercel.app/api/userconfig/cad-user', {
                            method: 'POST',
                            body: JSON.stringify(dataForm),
                            headers: { 'Content-Type': 'application/json' }
                        });
                        const responseEnv = await res.json();
                        if(responseEnv.erro){
                            setResponse({
                                type: 'error',
                                mensagem: responseEnv.mensagem
                            });
                        }else{
                            setResponse({
                                type: 'success',
                                mensagem:  responseEnv.mensagem
                            });
                            Router.push("/perfil/entrar")
                        }
                    }catch(err){
                        setResponse({
                            type: 'erro',
                            mensagem: 'erro!'
                        })
                    }
                }
            }else{
                setResponse({
                    type: 'erro',
                    mensagem: 'senha muito pequena (min 6 digitos)'
                })
            }
        }else{
            setResponse({
                type: 'erro',
                mensagem: 'voce deve preencher todos os campo'
            })
        }
        console.log(dataForm)
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
                <div className='max-w-md w-full' onSubmit={sendForm}>
                    <h1 className='text-8xl font-black'>CADASTRAR</h1>
                    <h2 className='mt-5'>Realize o seu cadastro para juntar-se a nossa comunidade e desfrute de vantagens incriveis, que voce so pode conferir aqui =)</h2>
                    <form className='gap-4 flex flex-col mt-5'>
                        <input className="w-full border rounded-lg outline-gray-800 p-2 py-3 mb-2" type="email" name="email" placeholder='Email' onChange={onChangeInput}/>
                        <input className="w-full border rounded-lg outline-gray-800 p-2 py-3 mb-2" type="text" name="usuario" placeholder='Nome de Usuario' onChange={onChangeInput}/>
                        <input className="w-full border rounded-lg outline-gray-800 p-2 py-3 mb-2" type="password" name="senha" placeholder='Senha'onChange={onChangeInput} />
                        <select name="escolaridade" id="escolaridade" className="w-full border rounded-lg outline-gray-800 p-2 py-3 mb-2"onChange={onChangeInput} defaultValue="none">
                            <option value="DEFAULT" hidden>Escolaridade</option>
                            <option value="5">Terminei a escola</option>
                            <option value="5">3º Ano do Ensino médio</option>
                            <option value="4">2º Ano do Ensino médio</option>
                            <option value="3">1º Ano do Ensino médio</option>
                            <option value="2">9º Ano</option>
                            <option value="1">Abaixo do 9º Ano</option>
                        </select>
                        <Link href="/">Ja tenho um cadastro. <u>Fazer Login</u></Link>
                        <input type="submit" className="w-full rounded-lg bg-gradient-to-r from-bluelight to-blue-500 text-white p-2 font-bold py-3" value="cadastrar"/>
                        {response.type == 'erro' || response.type == 'success' ? <p>{response.mensagem}</p> : ""}
                    </form>
                </div>
            </main>
        </>
        
    )
}