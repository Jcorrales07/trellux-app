# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)
  uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast
  Refresh

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
Desde el ```Homepage.jsx, LoginPage.jsx, RegisterPage.jsx``` y rutas protegidas
como ```DashboardPage.jsx y KanbanPage.jsx```

Las rutas privadas solo pueden ser accedidas cuando un usuario existente ingresa a su cuenta,

Tambien se configura el entorno de drag n drop con el ```<DragDropContext>``` tag

Aqui tengo un problema porque, el estado del kanban lo manipulo desde aca y se tiene que renderizar en
el ```KanbanGrid.jsx```

El problema en resumen es:

Manipulo el estado desde ```App.jsx``` y los cambios tienen que reflejarse automaticamente en ```KanbanGrid.jsx```

Digo automaticamente, porque para ver los resultados tengo que recargar la pagina y eso esta muy mal.

Solucion:

Sera que lo puedo arreglar con el Context?

# Homepage.jsx

Esta pagina solo muestra el inicio de la aplicacion, muestra un texto que dice ```TRELLUX```, las tecnologias usadas y
un navbar
en donde hay 3 links -> Login - Register - Project Info

Cada uno redirige a su propia pagina. Menos el Project Info jsjs

# LoginPage.jsx

El queso esta en el ```LoginForm.jsx```

Aca empiezo importando el contexto, osea el globalState.

El useEffect que estoy usando ahi, me sirve para poder persistir el estado cada vez que globalState tenga una
modificacion

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

Porque use useEffect en el login pero no en el register...?

Bueno ya me di cuenta, si hay problema. El useEffect lo necesito para que me persista cualquier cambio bien hecho del
estado global

Tambien uso el setTimeout() para que le de tiempo a hacer bien los cambios. No se que tan buena practica sea eso pero me
lo resuelve.

)

Cuando el usuario esta bien registrado, el mismo sistema lo redirige al dashboard, no hay necesidad de que el haga login
manualmente

# Rutas protegidas

Pasamos a las rutas protegidas del sistema, nadie que no este autenticado, osea que NO tenga una cuenta y que no este
ingresado.
Puede entrar al dashboard ni a un kanban.

Para acceder ahi, se tiene que hacer sign in o sign up.

Por eso esta el:

```js
 state.userLogged.accessToken
```

Si trata de entrar, lo que va a pasar es que lo va a enviar al login, para que no sea tramposo.

# DashboardPage.jsx

El ```<Navbar/>``` aun no tiene funcionalidad, solo muestra el logo y el perfil

El ```<Sidebar/>``` contiene la barra lateral izquierda, ahi se puede crear un board que se renderiza en ```<BoardGrid />```

El ```<BoardGrid/>``` es donde se renderizan todos los boards del usuario. Los boards vienen cuando se hace login.

Nota: quise intentar implementar el drag n drop pero como que rbdnd no sirve para los grids (y en general, mucho problema me da)

En un ```<SimpleGrid>``` renderizo todos los boards en el orden que estan en la db.

Se renderizan ```<BoardCard>```, este componente te muestra: el titulo y la fecha de creacion

Cuando le das click a uno. Hago un fetch para traerme los:
- kanbans
- columnas y
- tareas de las columnas
Que tenga el usuario a su nombre.

Ya despues de tener toda su informacion. La pongo en el globalState y redirijo al usuario al la url:
```jsx
`kanban/${id}`

En esta parte de aca:

setTimeout(() => { location.href = `kanban/${id}`}, 500)
```
El time out me ayuda a darle tiempo al sistema para que guarde bien la info y que al pasar a la otra pagina, la informacion no este vacia.


# KanbanPage.jsx

Aca estan los componentes:

```jsx
<Navbar/> El mismo del dashboard.
<Toolbar/> Este muestra el titulo del kanban y un boton para guardar los cambios.
<KanbanGrid /> Aca es donde se maneja todo el kanban.

/// ========
        
<KanbanGrid /> distribuye toda la info del kanban, para que se renderice bien.
Aca mismo se puede crear nuevas columnas y dentro de las columnas, nuevas tareas.
```
// Problemas:

La libreria ```react-beautiful-dnd``` me esta dando muchos problemas.
Ya resolvi de que el estado se actualice automaticamente sin recargar la pagina, pero la libreria me dice que hay boards que no se puede encontrar en el DOM.
No entiendo porque, no tiene sentido y aun no he encontrado una solucion para eso. Creo que me voy a cambiar a dnd-kit. 

Y si tengo el mismo problema entonces yo de verdad que estoy haciendo mal.

// Problemas (end)

El estado del kanban se maneja de esta manera:

```jsx
kanbanData: {
    tasks: { 'task-1': { id: 'task-1', content: 'Take out the garbage' } },
    columns: { 'column-1': { id: 'column-1', title: 'To do', taskIds: ['task-1'] } },
    columnOrder: ['column-1']
}
```

La info se guarda en ```tasks``` y ```columns``` y el orden de las tareas de cada columna se maneja por medio de los ids que se guardan en el ```taskIds``` de las columnas

El orden en como se renderizan las columnas esta coordinado por el arreglo ```columnOrder```, Ahi estan los ids de las columnas y comforme a ese orden se renderizan.

```jsx
<KanbanColumn/>
<KanbanCard />

Son los elementos que se ocupan para renderizar las columnas y las tareas
```
Estos componentes no manejan ninguna logica del drag and drop, solo van a tener la habilidad de:
- Moverse entre columnas
- Recibir tareas de otra columnas
- Crear tareas en ellas mismas



# Cosas que he aprendido

Si estas usando la funcion fetch y te tira un error asi: \
SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON

Quiere decir que le estas mandando algo que no es JSON.

Si usando el metodo POST, tenes que usar el JSON.stringify() para enviar bien la info

Me doy cuenta que, al dibujar y escribir lo que queres hacer, se vuelve posible. No importa que tan dificil se vea. \
Materializas la idea. ⭐

Si vas a hacer cambios en el modelo de alguna colleccion de mongo, asegurante que todo salga bien en el codigo \
y para que se hagan los cambios, tenes que reiniciar el backend para que mongo haga las modificaciones necesarias