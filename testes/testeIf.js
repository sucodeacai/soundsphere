//Exemplo 1
// escola = [
//     {
//         nome: 'Turma M1',
//         alunos: [{
//             nome: 'Gustavo',
//             nota: 5.1
//         }, {
//             nome: 'Ana',
//             nota: 7.3
//         }]
//     }, {
//         nome: 'Turma M2',
//         alunos: [{
//             nome: 'Roberto',
//             nota: 3.1
//         }, {
//             nome: 'Anny',
//             nota: 10
//         }]
//     }]

// const getNotaDoAluno = aluno => aluno.nota
// const getNotasDaTurma = turma => turma.alunos.map(getNotaDoAluno)
// const notas1 = escola.map(getNotasDaTurma);
// console.log(notas1)
// Array.prototype.flatMap = function (callback){
//     return Array.prototype.concat.apply([], this.map(callback))
// }
// const notas2 = escola.flatMap(getNotasDaTurma)
// console.log(notas2)

//Exemplo2
escola = [[{"excluded":false,"startTime":0.65,"endTime":0.7932426303854876,"id":1,"idBuffer":0,"x":13,"y":20,"solo":true,"color":"#D50000","volume":100,"standardValue":true,"seconds":0.14324263038548754,"width":2.864852607709751,"height":2,"size":0,"style":"black"}],[{"excluded":false,"startTime":1.15,"endTime":1.2932426303854874,"id":2,"idBuffer":0,"x":23,"y":60,"solo":true,"color":"#D50000","volume":100,"standardValue":true,"seconds":0.14324263038548754,"width":2.864852607709751,"height":2,"size":0,"style":"black"},{"excluded":false,"startTime":2.65,"endTime":2.7932426303854876,"id":3,"idBuffer":0,"x":53,"y":60,"solo":true,"color":"#D50000","volume":100,"standardValue":true,"seconds":0.14324263038548754,"width":2.864852607709751,"height":2,"size":0,"style":"black"}]]
const getNotaDoAluno = aluno => aluno.id
const getNotasDaTurma = turma => turma.map(getNotaDoAluno)
const notas1 = escola.map(getNotasDaTurma);
Array.prototype.flatMap = function (callback){
    return Array.prototype.concat.apply([], this.map(callback))
}
const notas2 = escola.flatMap(getNotasDaTurma)
console.log(notas2)