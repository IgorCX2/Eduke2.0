import Image from "next/image";
import Link from "next/link";
import Container from "../components/container";
import Footer from "../components/footer";
const imageLoader = ({ src }) => {
    return `http://localhost:3000/${src}`;
};

export default function Index({imageLoader}){
    return(
        <main className="absolute top-0 left-0 w-full h-full">
            <section className="w-screen h-screen relative left-0 top-0 bg-sky-300">
                <div className="w-full h-full absolute">
                    <div className="absolute w-full h-full flex justify-center z-10 bg-black/15 backdrop-blur-xs ">
                        <div className="flex flex-col items-center max-w-4xl w-full justify-center gap-8 text-center">
                            <h1 className="font-black text-6xl text-white">VOCE ESTA NO LUGAR CERTO PARA APRENDER !</h1>
                            <h2 className="font-medium	text-lg text-white">Na plataforma CX2-EDUKE acreditamos que o melhor jeito de aprender alguma coisa é praticando e treinando. Com isso a nossa Inteligencia Artigicial Conseguira Capturar As Suas maiores Dificudades Para assim Podermos Treinar</h2>
                            <div className="flex gap-12 mt-2">
                                <Link href="/" className="rounded-lg border-2 text-white p-2 font-bold py-2.5 px-4">TUTORIAL</Link>
                                <Link href="/" className="rounded-lg bg-blue-500 text-white p-2 font-bold py-2.5 px-4">COMEÇAR</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Image
                    loader={imageLoader}
                    src="/teste.svg"
                    alt="LogoCX2"
                    priority
                    fill={true}	
                    style={{objectFit: "cover"}}	
                />
            </section>
            <section className="mt-24 flex justify-center">
                <Container>
                    <div className="flex justify-between relative flex-wrap">
                        <div>
                            <Image
                                loader={imageLoader}
                                src="/ilhas.svg"
                                alt="LogoCX2"
                                width={400}
                                height={400}
                            />
                        </div>
                        <div className="flex flex-col max-w-3xl w-full'">
                            <h1 className="font-black text-5xl ">CONHEÇA NOSSO METODO</h1>
                            <h2 className="mt-6">JKCIJDFIUDVJK UDSHIJSDH FHJIDSFNHISDH FIUDSNJC UIDCHIUDSF DUCH DJAHFIOUD DN Na plataforma CX2-EDUKE acreditamos que o melhor jeito de aprender alguma coisa é praticando e treinando. Com isso a nossa Inteligencia Artigicial Conseguira Capturar As Suas maiores Dificudades Para assim Podermos Treinar FIDSA UI</h2>
                            <div className="mt-5">
                                <Link href="/" className="rounded-lg bg-blue-500 text-white p-2 font-bold py-2.5 px-4">COMEÇAR</Link>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
            <section className="mt-24 flex justify-center bg-gray-200">
                <Container>
                    <div className="relative flex justify-between py-5 flex-wrap items-center">
                        <div className="flex flex-col max-w-3xl w-full'">
                            <h1 className="font-black text-5xl ">NOS AJUDE A TE AJUDAR =)</h1>
                            <h2 className="mt-6">Somos uma empresa idependende, entretando temos muitos gastos para manter esta plataforma no ar e de forma gratuita para muito. Com isso, pedimos humildemente que nos ajude com qualquer valor, para conseguirmos manter esta plataforma no ar com extrema qualidade </h2>
                            <div className=""></div>
                        </div>
                        <div>
                            <Image
                                loader={imageLoader}
                                src="/pix.jpeg"
                                alt="LogoCX2"
                                width={200}
                                height={200}
                            />
                        </div>
                    </div>
                </Container>
            </section>
            <section className="mt-24 flex justify-center">
                <Container>
                    <div className="relative flex justify-between py-5 flex-wrap">
                        <h1 className="font-black text-5xl text-center w-full">NOSSOS PLANOS</h1>
                        <div className="flex justify-between mt-40 w-full">
                            <div className="bg-white rounded-lg drop-shadow-n2xl max-w-xs w-full h-96">
                                Em planejamento
                            </div>
                            <div className="bg-blue-500 rounded-lg drop-shadow-n2xl max-w-xs w-full h-96 -mt-14">
                                Em planejamento
                            </div>
                            <div className="bg-blue-500 rounded-lg drop-shadow-n2xl max-w-xs w-full h-96 -mt-14">
                                Em planejamento
                            </div>
                            <div className="bg-white rounded-lg drop-shadow-n2xl max-w-xs w-full h-96">
                                Em planejamento
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
            <section className="mt-24 flex justify-center">
                <Container>
                    <div className="relative flex justify-between py-5 flex-wrap">
                        <div className="max-w-md w-full">
                            <h1 className="text-5xl font-bold">Informações da Nossa Plataforma</h1>
                        </div>
                        <div className="bg-blue-500 flex justify-between gap-16 rounded-l-xl px-10 py-8 text-white	">
                            <div className="items-center flex flex-col gap-3">  
                                <h1 className="text-5xl font-bold">1</h1>
                                <h2 className="text-lg font-medium">CADASTRADOS</h2>
                            </div>
                            <div className="items-center flex flex-col gap-3">
                                <h1 className="text-5xl font-bold">1</h1>
                                <h2 className="text-lg font-medium">PLANOS DE ESTUDOS</h2>
                            </div>
                            <div className="items-center flex flex-col gap-3">
                                <h1 className="text-5xl font-bold">1</h1>
                                <h2 className="text-lg font-medium">ARTIGOS</h2>
                            </div>
                            <div className="items-center flex flex-col gap-3">
                                <h1 className="text-5xl font-bold">1</h1>
                                <h2 className="text-lg font-medium">EXERCICIOS</h2>
                            </div>
                            <div className="items-center flex flex-col gap-3">
                                <h1 className="text-5xl font-bold">1</h1>
                                <h2 className="text-lg font-medium">MAIOR NIVEL</h2>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
            <section className="mt-24 flex justify-center bg-gray-200 ">
                <Container>
                    <div className="relative flex justify-between py-5 flex-wrap">
                        <div className="w-full flex justify-between gap-12 relative py-5">
                            <div className="flex flex-col w-1/2 gap-12">
                                <div>
                                    <h1 className="font-black text-4xl">VOCE ESTA NO LUGAR CERTO PARA APRENDER !</h1>
                                    <h2 className="font-medium text-lg mt-10">Na plataforma CX2-EDUKE acreditamos que o melhor jeito de aprender alguma coisa é praticando e treinando. Com isso a nossa Inteligencia Artigicial Conseguira Capturar As Suas maiores Dificudades Para assim Podermos Treinar</h2>
                                </div>
                                <div className="w-full bg-white h-80 rounded-xl flex flex-col justify-between px-12 py-10">
                                    <div>
                                        <Image
                                            loader={imageLoader}
                                            src="/testnotsmoke.svg"
                                            alt="LogoCX2"
                                            width={50}
                                            height={50}
                                        />
                                        <h1 className="text-xl font-bold mt-4">SIMULADOS</h1>
                                    </div>
                                    <p>Na plataforma CX2-EDUKE acreditamos que o melhor jeito de aprender alguma coisa é praticando e treinando. Com isso a nossa Inteligencia Artigicial Conseguira Capturar As Suas maiores Dificudades Para assim Podermos Treina</p>
                                    <div className="mt-5">
                                        <Link href="/" className="rounded-lg bg-blue-500 text-white p-2 font-bold py-2.5 px-4">COMEÇAR</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-1/2 mt-12 gap-12">
                                <div className="w-full bg-white h-80 rounded-xl flex flex-col justify-between px-12 py-10">
                                    <div>
                                        <Image
                                            loader={imageLoader}
                                            src="/booknotsmoke.svg"
                                            alt="LogoCX2"
                                            width={50}
                                            height={50}
                                        />
                                        <h1 className="text-xl font-bold mt-4">TAREFAS</h1>
                                    </div>
                                    <p>Na plataforma CX2-EDUKE acreditamos que o melhor jeito de aprender alguma coisa é praticando e treinando. Com isso a nossa Inteligencia Artigicial Conseguira Capturar As Suas maiores Dificudades Para assim Podermos Treina</p>
                                    <div className="mt-5">
                                        <Link href="/" className="rounded-lg bg-blue-500 text-white p-2 font-bold py-2.5 px-4">COMEÇAR</Link>
                                    </div>
                                </div>
                                <div className="w-full bg-white h-80 rounded-xl flex flex-col justify-between px-12 py-10">
                                    <div>
                                        <Image
                                            loader={imageLoader}
                                            src="/espada.svg"
                                            alt="LogoCX2"
                                            width={40}
                                            height={50}
                                        />
                                        <h1 className="text-xl font-bold mt-4">REDAÇÃO</h1>
                                    </div>
                                    <p>Na plataforma CX2-EDUKE acreditamos ia Artigicial Conseguira Capturar As Suas maiores Dificudades Para assim Podermos Treina</p>
                                    <div className="mt-5">
                                        <Link href="/" className="rounded-lg bg-blue-500 text-white p-2 font-bold py-2.5 px-4">COMEÇAR</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
            <section className="mt-1 flex justify-center">
                <Container>
                    <div className="relative flex justify-between py-5 flex-wrap">
                        <div className="w-full flex justify-center">
                            <div className="text-center">
                                <h1 className="text-xl font-bold ">Não se esqueça de compartilhar a sua experiencia com a nossa plataforma =)</h1>
                                <h2>E confira o calendario na aba menu, la ira encontrar datas dos vestibulares e outras Informações importantes</h2>
                                <div className="mt-5">
                                    <Link href="/" className="rounded-lg bg-blue-500 text-white p-2 font-bold py-2.5 px-4">CALENDARIO</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
            <Footer/>
        </main>
    )
}