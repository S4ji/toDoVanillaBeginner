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
let editingTodo = {}

//LOCAL STORAGE
function loadLocalStorage() {
    toDoList = JSON.parse(localStorage.getItem('toDoList')) || []
}
function saveToStorage() {
    localStorage.setItem('toDoList', JSON.stringify(toDoList))
    console.log(JSON.stringify(localStorage))
}

// TODO UTILS

function createTodoDom(toDoObject) {
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
        editTodo(toDoObject.id)
    })

    const toDoDeleteButton = document.createElement('button')
    toDoDeleteButton.classList.add('toDoDeleteButton', 'hover:bg-yellow-700')
    toDoDeleteButton.addEventListener('click', (event) => {
        deleteTodo(toDoObject.id)
    })

    const toDoDoneButton = document.createElement('button')
    toDoDoneButton.classList.add('toDoDoneButton', 'hover:bg-yellow-700')

    toDoDoneButton.addEventListener('click', (event) => {
        console.log('done button')
    })

    toDo.setAttribute('data-id', toDoObject.id)

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

function editTodo(id) {
    index = toDoList.findIndex((toDo) => toDo.id === id)

    inputTitle.value = toDoList[index].title
    inputDescription.value = toDoList[index].description
    inputPriority.value = toDoList[index].priority
    inputLast.value = toDoList[index].lasting
    toDoList[index].isEdit = true

    editingTodo = toDoList[index]

    console.log(editingTodo)
}

function toggleHiddenClass() {
    myForm.classList.toggle('hidden')
    listContainer.classList.toggle('hidden')
}
function updateToDoListOnDom() {
    listContainer.innerHTML = ''
    toDoList.forEach((toDo, index) => {
        createTodoDom(toDo, index)
    })
}

// CRUD TODO
function createToDoObject(form) {
    let formFields = new FormData(form)
    let newTodo = {
        id: Date.now(),
        isEdit: false,
        isDone: false,
        ...Object.fromEntries(formFields),
    }

    toDoList = [...toDoList, newTodo]
    createTodoDom(newTodo, toDoList.length - 1)
    saveToStorage()
}

function updateToDo(form) {
    let formFields = new FormData(form)
    index = toDoList.findIndex((toDo) => toDo.id === editingTodo.id)
    toDoList = [
        ...toDoList.slice(0, index),
        {
            isDone: editingTodo.isDone,
            isEdit: editingTodo.isEdit,
            id: editingTodo.id,
            ...Object.fromEntries(formFields),
        },
        ...toDoList.slice(index + 1),
    ]
    saveToStorage()
    editingTodo = {}
    console.log(toDoList)
    updateToDoListOnDom()
}

function deleteTodo(id) {
    index = toDoList.findIndex((toDo) => toDo.id === id)
    const todoToRemove = document.querySelector(
        `[data-id="${toDoList[index].id}"]`
    )
    toDoList = [...toDoList.slice(0, index), ...toDoList.slice(index + 1)]
    saveToStorage()
    todoToRemove.remove()
}

// EVENT LISTENER

toggleFormButton.addEventListener('click', (event) => {
    // toggleHiddenClass()
    formMode = true
})

myForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (editingTodo.isEdit === true) {
        console.log(editingTodo)
        updateToDo(e.target)
        myForm.reset()
    } else createToDoObject(e.target)
    myForm.reset()
    // toggleHiddenClass()
})

document.addEventListener('DOMContentLoaded', (event) => {
    loadLocalStorage()
    updateToDoListOnDom()
})

console.log(editingTodo)
