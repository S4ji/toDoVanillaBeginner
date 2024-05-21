// DOM ELEMENT
let formMode = false
const listContainer = document.getElementById('listContainer')
const toggleFormButton = document.getElementById('toggleFormButton')
const myForm = document.getElementById('myForm')
const body = document.body
let inputTitle = document.getElementById('title')
let inputDescription = document.getElementById('description')
let inputPriority = document.getElementById('priority')
let inputLast = document.getElementById('lasting')

// VARIABLES

let toDoList = []

//LOCAL STORAGE
function loadLocalStorage() {
    toDoList = JSON.parse(localStorage.getItem('toDoList')) || []
}
function saveToStorage() {
    localStorage.setItem('toDoList', JSON.stringify(toDoList))
    console.log(JSON.stringify(localStorage))
}

// TODO UTILS

function createTodoDom(toDoObject, index) {
    const toDo = document.createElement('li')
    toDo.classList.add('bg-yellow-100', 'shadow-lg', 'p-8', 'm-3')

    const toDoTitle = document.createElement('h2')
    const toDoId = document.createElement('p')
    const toDoDescription = document.createElement('p')
    const toDoPriority = document.createElement('p')
    const toDoLasting = document.createElement('p')
    const toDoEditButton = document.createElement('button')

    toDoEditButton.classList.add('toDoEditButton', 'hover:bg-yellow-700', 'm-2')
    toDoEditButton.addEventListener('click', (event) => {
        editTodo(index)
    })

    const toDoDeleteButton = document.createElement('button')
    toDoDeleteButton.classList.add('toDoDeleteButton', 'hover:bg-yellow-700')
    toDoDeleteButton.addEventListener('click', (event) => {
        deleteTodo(index)
    })

    const toDoDoneButton = document.createElement('button')
    toDoDoneButton.classList.add('toDoDoneButton', 'hover:bg-yellow-700')

    toDoDoneButton.addEventListener('click', (event) => {
        updateToDo(myForm, index)
    })

    toDo.setAttribute('data-index', index)

    toDo.append(
        toDoTitle,
        toDoId,
        toDoDescription,
        toDoPriority,
        toDoLasting,
        toDoDeleteButton,
        toDoEditButton,
        toDoDoneButton
    )

    toDoId.innerText = `id : ${toDoObject.id}`
    toDoTitle.innerText = `title : ${toDoObject.title}`
    toDoDescription.innerText = `description : ${toDoObject.description}`
    toDoPriority.innerText = `priority : ${toDoObject.priority}`
    toDoLasting.innerText = `days lasting before deadline : ${toDoObject.lasting}`
    toDoEditButton.innerText = 'Edit'
    toDoDeleteButton.innerText = 'Delete'
    toDoDoneButton.innerText = 'Done'
    listContainer.appendChild(toDo)
}

function updateToDoListOnDom() {
    listContainer.innerHTML = ''
    loadLocalStorage()
    toDoList.forEach((toDo, index) => {
        createTodoDom(toDo, index)
    })
}

function editTodo(indexToEdit) {
    for (let i = 0; i < toDoList.length; i++) {
        if (indexToEdit === i) {
            inputTitle.value = toDoList[i].title
            inputDescription.value = toDoList[i].description
            inputPriority.value = toDoList[i].priority
            inputLast.value = toDoList[i].lasting
            toDoList[i].isEdit = true
            console.log()
            console.log(toDoList[indexToEdit])
        }
    }
}

function toggleHiddenClass() {
    myForm.classList.toggle('hidden')
    listContainer.classList.toggle('hidden')
}

// CRUD TODO
function createToDoObject(form) {
    let formFields = new FormData(form)

    toDoList = [
        ...toDoList,
        {
            id: Date.now(),
            isEdit: false,
            isDone: false,
            ...Object.fromEntries(formFields),
        },
    ]
    createTodoDom(Object.fromEntries(formFields), toDoList.length)
    saveToStorage()
    updateToDoListOnDom()
}

function updateToDo(form, targetToDoIndex) {
    let formFields = new FormData(form)
    toDoList = [
        ...toDoList.slice(0, targetToDoIndex),
        Object.fromEntries(formFields),
        ...toDoList.slice(targetToDoIndex + 1),
    ]
    updateToDoListOnDom()
}

function deleteTodo(indexToDelete) {
    for (let i = 0; i < toDoList.length; i++) {
        if (indexToDelete === i) {
            toDoList = [
                ...toDoList.slice(0, indexToDelete),
                ...toDoList.slice(indexToDelete + 1),
            ]
            console.log(indexToDelete)
            console.log(toDoList)
        }
    }
    saveToStorage()
    updateToDoListOnDom()
}

// EVENT LISTENER

toggleFormButton.addEventListener('click', (event) => {
    toggleHiddenClass()
    formMode = true
})

myForm.addEventListener('submit', (e) => {
    e.preventDefault()
    updateToDoListOnDom()
    createToDoObject(e.target)
    myForm.reset()
    toggleHiddenClass()
})

updateToDoListOnDom()
