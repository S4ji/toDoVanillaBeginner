// DOM ELEMENT

const listContainer = document.getElementById('listContainer')
const testButton = document.getElementById('test')
const myForm = document.getElementById('myForm')
const inputTitle = document.getElementById('title')
const inputDescription = document.getElementById('description')
const inputPriority = document.getElementById('priority')
const inputLast = document.getElementById('lasting')

// VARIABLES

let toDoList = []
let deleteButton = []
let editButton = []
let doneButton = []

// TODO UTILS

function createToDoObject(form) {
    let formFields = new FormData(form)
    toDoList = [
        ...toDoList,
        {
            isDone: false,
            ...Object.fromEntries(formFields),
        },
    ]
}

function createTodoDom(toDoObject, index) {
    const toDo = document.createElement('li')
    const toDoTitle = toDo.appendChild(document.createElement('h2'))
    const toDoDescription = toDo.appendChild(document.createElement('p'))
    const toDoPriority = toDo.appendChild(document.createElement('p'))
    const toDoLasting = toDo.appendChild(document.createElement('p'))

    const toDoEditButton = toDo.appendChild(document.createElement('button'))
    toDoEditButton.classList.add('toDoEditButton')
    const toDoDeleteButton = toDo.appendChild(document.createElement('button'))
    toDoDeleteButton.classList.add('toDoDeleteButton')
    const toDoDoneButton = toDo.appendChild(document.createElement('button'))
    toDoDoneButton.classList.add('toDoDoneButton')

    toDoTitle.innerText = toDoObject.title
    toDoDescription.innerText = toDoObject.description
    toDoPriority.innerText = toDoObject.priority
    toDoLasting.innerText = toDoObject.lasting
    toDoEditButton.innerText = 'Edit'
    toDoDeleteButton.innerText = 'Delete'
    toDoDoneButton.innerText = 'Done'

    toDo.setAttribute('data-index', index)
    listContainer.appendChild(toDo)
}

function updateToDoListOnDom() {
    listContainer.innerHTML = ''
    toDoList.forEach((toDo, index) => {
        createTodoDom(toDo, index)
    })
    deleteButton = Array.from(
        document.getElementsByClassName('toDoDeleteButton')
    )
    editButton = Array.from(document.getElementsByClassName('toDoEditButton'))

    doneButton = Array.from(document.getElementsByClassName('toDoDoneButton'))

    deleteButton.forEach((element, index) => {
        element.addEventListener('click', (event) => {
            deleteTodo(index)
        })
    })

    editButton.forEach((element, index) => {
        element.addEventListener('click', (event) => {
            editTodo(index)
        })
    })

    doneButton.forEach((element) => {
        element.addEventListener('click', (event) => {
            console.log('done')
        })
    })
}

// CRUD TODO

function deleteTodo(indexToDelete) {
    for (let i = 0; i < deleteButton.length; i++) {
        if (indexToDelete === i) {
            toDoList = [
                ...toDoList.slice(0, indexToDelete),
                ...toDoList.slice(indexToDelete + 1),
            ]
        }
    }
    updateToDoListOnDom()
}

function editTodo(indexToEdit) {
    for (let i = 0; i < editButton.length; i++) {
        if (indexToEdit === i) {
            inputTitle.value = toDoList[i].title
            inputDescription.value = toDoList[i].description
            inputPriority.value = toDoList[i].priority
            inputLast.value = toDoList[i].lasting
        }
    }
}

// EVENT LISTENER

testButton.addEventListener('click', (event) => {
    console.log(event)
})

myForm.addEventListener('submit', (e) => {
    e.preventDefault()
    createToDoObject(e.target)
    myForm.reset()
    updateToDoListOnDom()
})
