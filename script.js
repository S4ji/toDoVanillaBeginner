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
    createTodoDom(Object.fromEntries(formFields), toDoList.length)
}

function createTodoDom(toDoObject, index) {
    const toDo = document.createElement('li')

    const toDoTitle = document.createElement('h2')

    const toDoDescription = document.createElement('p')

    const toDoPriority = document.createElement('p')

    const toDoLasting = document.createElement('p')

    const toDoEditButton = document.createElement('button')
    toDoEditButton.classList.add('toDoEditButton')
    toDoEditButton.addEventListener('click', (event) => {
        editTodo(index)
    })

    const toDoDeleteButton = document.createElement('button')
    toDoDeleteButton.classList.add('toDoDeleteButton')
    toDoDeleteButton.addEventListener('click', (event) => {
        deleteTodo(index)
    })

    const toDoDoneButton = document.createElement('button')
    toDoDoneButton.classList.add('toDoDoneButton')
    toDoDoneButton.addEventListener('click', (event) => {
        console.log('done')
    })

    toDo.append(
        toDoTitle,
        toDoDescription,
        toDoPriority,
        toDoLasting,
        toDoDeleteButton,
        toDoEditButton,
        toDoDoneButton
    )

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
}

// CRUD TODO

function deleteTodo(indexToDelete) {
    for (let i = 0; i < toDoList.length; i++) {
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
    for (let i = 0; i < toDoList.length; i++) {
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
})
