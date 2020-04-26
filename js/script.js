//Web socket
// abre conexão websocket
var conn = new WebSocket('ws://localhost:8080');
conn.onopen = function(e) {
    console.log("Connection established!");
};

//serve para manda a mensagem pro servido
conn.onmessage = function(e) {
    //  console.log(e.data);
    showMessages('outro', e.data);
};

//conn.send('Hello World!');

//Form
//manipulando o formulario com javascript
let form1 = document.getElementById('form1');
let input_message = document.getElementById('mensagem');
let input_name = document.getElementById('name');
let btn_enviar = document.getElementById('btn1');

let area_content = document.getElementById('content');

//usado para evento de click no enviar
btn_enviar.addEventListener('click', function() {
    //verificar se a pessoa digitou algo e envia a mensagem
    if (input_message.value != '') {
        let msg = { 'name': input_name.value, 'msg': input_message.value }
        msg = JSON.stringify(msg);

        conn.send(msg);

        showMessages('eu', msg);

        input_message.value = '';
    }
});

// criando todos elementos das caixa de mensagem
let showMessages = (how, dados) => {
    dados = JSON.parse(dados);

    console.log(dados);

    let div = document.createElement('div');
    div.setAttribute('class', how);

    let div_txt = document.createElement('div');
    div_txt.setAttribute('class', 'text');

    let h5 = document.createElement('h5');
    h5.textContent = dados.name;

    let p = document.createElement('p');
    p.textContent = dados.msg;

    div_txt.appendChild(h5);
    div_txt.appendChild(p);

    div.appendChild(div_txt)

    area_content.appendChild(div);

};