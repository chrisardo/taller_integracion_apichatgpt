//creacion del servidor local en el puerto 8000
//Importar los modulos
import OpenAI from "openai"; 
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

//configurar express, body.parser y cors
//crear un app express
const app = express();
//configurar un puerto de escucha
const port = 8000;
//configurar body-parser para que solo procese
//colicitudes HTTP con respuestas de tipo JSON
app.use(bodyParser.json());
//configurar cors para permitir la comunicacion
//entre el backend y el fronted
app.use(cors());
//verificar que el app esta ejecutandose
app.listen(port, () => {
    console.log(`Servidor ejecutandose en el puerto ${port}`);
})
//Creacion del endpoint
//Establecer parametros de configuracion
const openai = new OpenAI({
    //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
    apiKey: "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" //tu llave api aqui
});
//Crear una ruta POST asincrona
app.post("/", async (req, res) => {
    const {chats} = req.body;
    const result = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: "Hola mudo",
            },
            ...chats,//operador express (append: agregar los mensajes a chats)

        ],
    });

    //obtener la respuesta del chatgpt
    res.json({
        output: result.choices[0].message,
    });

    //response.json(result.choices[0].message);
});