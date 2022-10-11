'use strict';
//quando eu clicar 
const display = document.getElementById('display');
//achar os numeros e parte do atribto tenha a palavra tecla
const numeros = document.querySelectorAll('[id*=tecla]');   
const operadores = document.querySelectorAll('[id*=operador]');   

//armazernar numero na melhoria para poder fazer operações
let novoNumero = true;
let operador;
let antigoNumero;

const operacaoPendente = () => operador !== undefined;

//após o numero aparecer na tela ele não pode substituir a não ser que eu tire ele 
const atualizarDisplay = (texto) => { 
    //limpar tela pra colocar outro numero pra fazer a operação 
    if(novoNumero){
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false; 
    }else{
        display.textContent += texto.toLocaleString('BR');  
    }
    document.querySelector('#igual').focus();
};
const calcular = () => {
    if(operacaoPendente()){
        const numeroAtual = parseFloat(display.textContent.replace('.','').replace(',', '.'));
        novoNumero = true;
        const resultado = eval(`${antigoNumero}${operador}${numeroAtual}`);
        atualizarDisplay(resultado);
       // if(operador  == '+'){
       //     atualizarDisplay(antigoNumero + numeroAtual);
        //}else if(operador  == '-'){
         //   atualizarDisplay(antigoNumero - numeroAtual);
        //}else if(operador  == '*'){
          //  atualizarDisplay(antigoNumero * numeroAtual);
        //}else if(operador  == '/'){
         //   atualizarDisplay(antigoNumero / numeroAtual);
        //}
    }
};

// após o evento click o numero precisar aparecer na tela 
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);// display.textContent = evento.target.textContent
// adicionar evento click  for.Each varre todos os elementos de um array
numeros.forEach((numero) => numero.addEventListener('click', inserirNumero));

const selecionarOperador = (evento) => {
    if(!novoNumero){
        calcular();
    //aceitar novo numero
    novoNumero = true;
    // reconhecer operador
    operador = evento.target.textContent;
    //guardar numero antigo
    antigoNumero = parseFloat(display.textContent.replace('.','').replace(',', '.'));
    }
};
//
operadores.forEach((operador) => operador.addEventListener('click', selecionarOperador));

const ativarIgual = () => {
    calcular();
    operador = undefined;
};
document.getElementById('igual').addEventListener('click', ativarIgual);

const limparDisplay = () => (display.textContent = '');
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    antigoNumero = undefined;
};
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

const removerUltimoNumero = () => (display.textContent = display.textContent.slice(0, -1));
document.getElementById('backspace').addEventListener('click', removerUltimoNumero);

const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay (display.textContent * -1);
}
document.getElementById('inverter').addEventListener('click', inverterSinal);

//indexof vai procurar uma string, logo, a virgula
const existeDecimal = () => display.textContent.indexOf(',') !== -1 ;
const existeValor = () => display.textContent.length > 0;
const inserirDecimal = () => {
    if (!existeDecimal()){
        if(novoNumero){
            atualizarDisplay('0,');
        }else{
        atualizarDisplay(',');
        }  
    }
}
document.getElementById('virgula').addEventListener('click', inserirDecimal);


const mapaTeclado = {
    '0': 'tecla0',
    '1': 'tecla1',
    '2': 'tecla2',
    '3': 'tecla3',
    '4': 'tecla4',
    '5': 'tecla5',
    '6': 'tecla6',
    '7': 'tecla7',
    '8': 'tecla8',
    '9': 'tecla9',
    '/': 'operadorDividir',
    '*': 'operadorMultiplicar',
    '-': 'operadorSubtração',
    '+': 'operadorSoma',
    '=': 'igual',
    Enter : 'igual',
    Backspace: 'backspace',
    c: 'limparDisplay',
    Escape: 'limparCalculo',
    ',': 'virgula',

};
const mapearTeclado = (evento) => {
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1; 
    if(teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
 };
document.addEventListener('keydown', mapearTeclado);