import { useState } from 'react'

function App() {
  //Estableciendo lo necesario para el manejo de los estados con useState
  //Estados de mensaje
  const [mensaje, setMensaje] = useState("");
  //Estados de chats
  const [chats, setChats] = useState([]);
  //Estados de respuesta
  const [escribiendo, setEscribiendo] = useState(false);
  //función Chat
  const Chat = async (e, mensaje) => {
    //Prevenir el comportamiento por defecto del boton submit del formulario
    e.preventDefault();
    if(!mensaje) return;
    setEscribiendo(true); //Mostrar "Escribiendo..."
    let msj = [...chats];
    msj.push({ role: "user", content: mensaje }); //Guardar los chats
    setChats(msj);
    setMensaje(""); //Limpiar manejador de mensaje
    //Enviar los datos al backend
    fetch("http://localhost:8000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({chats}),
    }).then((res) => res.json())
    .then((data) => {
      msj.push(data.output);
      setChats(msj);
      setEscribiendo(false);
    })
    .catch((error) => {
      console.log(error);
    });
  };
  //Creación del componente para mostrar
  return (
    <main>
      <h1>Integración del API de ChatGPT usando React y NodeJS</h1>
      <section>
        {/* Controla la ventana de chats */}
        {chats && chats.length
          ? chats.map((chat, index) => (
              <p key={index} className = {chat.role == "user" ? "user_msg" : ""}>
                <span><b>{chat.role}</b></span>
                <span>:</span>
                <span>{chat.content}</span>
              </p>
            ))
          : ""}
      </section>
      {/* Mostrar el mensaje escribiendo.. hasta que haya una respuesta */}
      <div className = {escribiendo ? "" : "hide"}>
        <p><i>{escribiendo ? "Escribiendo..." : ""}</i></p>
      </div>
      {/* Mostrar el cuadro de texto para escribir */}
      <form action='' onSubmit={(e) => Chat(e, mensaje)}>
        <input
          type='text' 
          name='mensaje' 
          value={mensaje} 
          placeholder='Escribe tu mensaje aqui...' 
          onChange={(e) => setMensaje(e.target.value)}
        />
      </form>
    </main>
  );
}
export default App
