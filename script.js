//função para validar input no front-end
function validarInput() {
  //Declaração do nosso objeto
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  //Span para caso de dados icorretos no FORM
  const erroUsuario = document.getElementById("erro_usuario");
  const erroSenha = document.getElementById("erro_senha");

  const valido = /^[a-zA-Z]+$/.test(usuario); //REGEX em ação '^' para inicio e '$' para fim

  //Verificando se consta apenas Letras no nome do usuario
  if (valido) {
    erroUsuario.classList.remove("text-red-500", "text-green-500");
    erroUsuario.classList.add("text-green-500"); //Alteração de cor do texto caso esteja correto
    erroUsuario.textContent = "Nome Válido";
  } else {
    erroUsuario.classList.remove("text-red-500", "text-green-500");
    erroUsuario.classList.add("text-red-500"); //Alteração de cor do texto caso esteja incorreto
    erroUsuario.textContent =
      "Nome Inválido Não utilize espaços ou caracteres especiais";
  }

  const temEspecial = /[!@#$%]/.test(senha); //REGEX em ação '^' para inicio e '$' para fim

  //Analaisando se segue ambos os requisitos
  if (temEspecial == true && senha.length >= 8) {
    erroSenha.classList.remove("text-red-500", "text-green-500");
    erroSenha.classList.add("text-green-500"); //Alteração de cor do texto caso esteja correto
    erroSenha.textContent = "Senha Válida";
  } else {
    //Verificação de caractere especial no input da senha
    if (!temEspecial) {
      erroSenha.classList.remove("text-red-500", "text-green-500");
      erroSenha.classList.add("text-red-500"); //Alteração de cor do texto caso esteja incorreto
      erroSenha.textContent = "Senha Inválida (utilize !@#$%)";
    } else {
      //Verificação de >= 8 caracteres na senha
      erroSenha.classList.remove("text-red-500", "text-green-500");
      erroSenha.classList.add("text-red-500"); //Alteração de cor do texto caso esteja incorreto
      erroSenha.textContent = "Senha Inválida (Minimo de 8 caractere)";
    }
  }
}
//Função para transmitir os dados pela API
async function pegadandoDado() {
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;
  let nomeSucesso = document.getElementById("LoginName");

  //Passando a URL onde esta o local de conexão
  const url = "http://127.0.0.1:8000/login";
  try {
    //Passando o tipo JSON definido no header e padronizado no Body
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: usuario, password: senha }),
    });

    //Em caso de não conseguir fazer o POST = ERROR
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    //Login bem sucedido
    nomeSucesso.textContent = `Olá ${usuario}`;
    const result = await response.json();
    console.log(result);
  } catch (error) {
    //Caso o try não execute
    console.error(error.message);
  }
}
