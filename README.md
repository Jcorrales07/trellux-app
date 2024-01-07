# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Lo que aun le falta al proyecto:

- Usar bien el React router
  - Estoy usando ```location.href = 'path'``` para navegar y se ve rancio

# main.jsx

Aca esta el punto de entrada de la app.

Aca esta configurado el ```Chakra UI y el STORE con el useContext```

# Store.jsx

Este seria el sustituto de Redux, como es una app pequeña use esto porque Midu me lo recomendo jajaj

el estado por defecto es este:

```
const defaultState = {
    userLogged: {
        name: '',
        lastname: '',
        username: '',
        email: '',
        accessToken: '',
        boardsOrder: [],
    },
    userBoards: {
        boards: {},
        boardsOrder: [],
        boardSelected: {},
    },
    kanbanData: {
        tasks: {},
        columns: {},
        columnOrder: []
    }
}
```

Use este video para configurar esto:
https://youtu.be/tnt2y7D3V9o?si=LzksLDdcbyO-P_uw

Y pues hago la funcion Store que basicamente tiene el estado global, se maneja con useState

Y todo lo que este envuelto entre ```<Store></Store>```

Va a poder compartirle el estado global sin, problemas.

# useLocalStorage.jsx

Use este video para crearlo:
https://youtu.be/uutiLsX5kFE?si=9CpbLmLoQehu1z8I

Lo que hago con esto es guardar algun item en localStorage

En este caso lo uso para persistir y acceder al globalState.

# App.jsx

En ```App.jsx``` se manejan las rutas de las paginas.
Desde el ```Homepage.jsx, LoginPage.jsx, RegisterPage.jsx``` y rutas protegidas como ```DashboardPage.jsx y KanbanPage.jsx```

Las rutas privadas solo pueden ser accedidas cuando un usuario existente ingresa a su cuenta, 

Tambien se configura el entorno de drag n drop con el ```<DragDropContext>``` tag 

Aqui tengo un problema porque, el estado del kanban lo manipulo desde aca y se tiene que renderizar en el ```KanbanGrid.jsx```

El problema en resumen es:

Manipulo el estado desde ```App.jsx``` y los cambios tienen que reflejarse automaticamente en ```KanbanGrid.jsx```

Digo automaticamente, porque para ver los resultados tengo que recargar la pagina y eso esta muy mal.

Solucion:

Sera que lo puedo arreglar con el Context?

# Homepage.jsx

Esta pagina solo muestra el inicio de la aplicacion, muestra un texto que dice ```TRELLUX```, las tecnologias usadas y un navbar
en donde hay 3 links -> Login - Register - Project Info

Cada uno redirige a su propia pagina. Menos el Project Info jsjs

# LoginPage.jsx

El queso esta en el ```LoginForm.jsx```

Aca empiezo importando el contexto, osea el globalState.

El useEffect que estoy usando ahi, me sirve para poder persistir el estado cada vez que globalState tenga una modificacion

```jsx
useEffect(() => {
  console.log("globalState despues", globalState)
  setState(globalState)
  console.log("state despues", state) // verificando el estado global
}, [globalState, setState])
```

⚠️ Pueda ser que esta forma de persistir, me ayude a arreglar el problema que tengo entre ```App.jsx y KanbanGrid.jsx```

Luego toda la logica para traer info del usuario pasa en ```redirectDashboard```

        
Accedo a:
```'/users/login'``` y ```/boards/${user.username}```

para sacar la info del usuario. Antes de proceder al dashboard

hago las validaciones si el usuario existe de verdad.

# RegisterPage.jsx

Denuevo lo importante esta en ```RegisterForm.jsx```

Aca es donde se crea el nuevo usuario en la base de datos.

Accedo a la api desde:
```
/users/register
```

Le envio toda la informacion necesaria a la db.

(

Al que no entiendo de verdad es:

Porque use useEffect en el login pero no en el register?

Bueno ya me di cuenta, si hay problema. El useEffect lo necesito para que me persista cualquier cambio bien hecho del estado global

Tambien uso el setTimeout() para que le de tiempo a hacer bien los cambios. No se que tan buena practica sea eso pero me lo resuelve.

)


# Cosas que he aprendido

Si estas usando la funcion fetch y te tira un error asi: \
SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON

Quiere decir que le estas mandando algo que no es JSON.

Si usando el metodo POST, tenes que usar el JSON.stringify() para enviar bien la info

Me doy cuenta que, al dibujar y escribir lo que queres hacer, se vuelve posible. No importa que tan dificil se vea. \
Materializas la idea. ⭐

Si vas a hacer cambios en el modelo de alguna colleccion de mongo, asegurante que todo salga bien en el codigo \
y para que se hagan los cambios, tenes que reiniciar el backend para que mongo haga las modificaciones necesarias