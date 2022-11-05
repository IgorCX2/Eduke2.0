import fs from 'fs';
import grayMatter from 'gray-matter';
export function getContents(conteudo, materia){
    const fileverific = fs.readdirSync(`./_content/PlanoDeEstudos/${materia}`).indexOf(`soma.md`);
    console.log(fileverific)
    return[]
}