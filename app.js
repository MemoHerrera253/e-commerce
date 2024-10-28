const express = require('express');// 
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.static('public')); // Sirve los archivos estáticos (HTML, CSS, JS) 

app.listen(port, () => 
    { 
        console.log('Servidor ejecutándose en http://localhost:${port}'); 
    }); 

app.get('/',(req,res)=>
    {
        res.send('Bienvenido a la API E-commerce');
    }
)

let productos = 
[ 
    { id: 1, nombre: 'Camiseta', precio: 20.00 }, 
    { id: 2, nombreñ: 'Pantalón', precio: 35.00 } 
    ]; 
    app.get
    (
        '/productos', //ruta
    
        (req,res)=>//función que se ejecuta cuando se hace la petición
    
            {
                res.json(productos); //envía respuesta en formato json
    
            }
    ); 
    app.get('/productos/:id',(req,res)=>
        {
            const id=parseInt(req.params.id); //convierte el id a un valor entero
            const producto=productos.find(p=>p.id === id); //busca la tarea en el arreglo que coincida con el id
            //si coincide con la id coincide, se envia el resultado de tarea, si no encuentra la tarea, envía un mensaje de error
            if(producto)
            {
                res.json(producto);
            }
            else
            {
                res.status(404).send('Estudiante no localizado');
            }
        }
    );
    app.post('/productos', (req, res) => 
        { 
        const nuevoProducto = req.body; // El producto nuevo viene en el cuerpo de la solicitud 
        nuevoProducto.id = productos.length + 1; // Asignamos un ID al producto 
        productos.push(nuevoProducto); // Lo agregamos al array de productos 
        res.status(201).json(nuevoProducto); // Respondemos con el producto creado
        });
        app.put('/productos/:id', (req, res) => { 
            const id = parseInt(req.params.id); // Obtenemos el ID desde la URL 
            const productoActualizado = req.body; // El producto actualizado viene en el cuerpo de la solicitud 
         
            // Buscamos el producto en el array 
            const index = productos.findIndex(p => p.id === id); 
            if (index !== -1) { 
                productos[index] = { id, ...productoActualizado }; // Actualizamos el producto 
                res.json(productos[index]); // Devolvemos el producto actualizado 
            } else { 
                res.status(404).json({ mensaje: 'Producto no encontrado' }); 
            } 
        }); 
        app.delete('/productos/:id', (req, res) => { 
            const id = parseInt(req.params.id); 
             
            // Buscamos el índice del producto 
            const index = productos.findIndex(p => p.id === id); 
            if (index !== -1) { 
                const productoEliminado = productos.splice(index, 1); // Eliminamos el producto 
                res.json(productoEliminado[0]); // Devolvemos el producto eliminado 
            } else { 
                res.status(404).json({ mensaje: 'Producto no encontrado' }); 
            } 
        });