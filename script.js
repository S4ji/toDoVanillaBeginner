const listContainer = document.getElementById('listContainer')
const myForm = document.getElementById('myForm')
let toDoList = []

function addToDo(form) {
    let formFields = new FormData(form)
    toDoList = [
        ...toDoList,
        {
            isDone: false,
            ...Object.fromEntries(formFields),
        },
    ]
}

function addToDom(form) {
    let formFields = new FormData(form)
    let toDoObject = Object.fromEntries(formFields)
    console.log(toDoObject)

    toDo = document.createElement('li')
    toDoTitle = toDo.appendChild(document.createElement('h2'))
    toDoDescription = toDo.appendChild(document.createElement('p'))
    toDoPriority = toDo.appendChild(document.createElement('p'))
    toDoLasting = toDo.appendChild(document.createElement('p'))
    toDoEditButton = toDo.appendChild(document.createElement('button'))
    toDoDeleteButton = toDo.appendChild(document.createElement('button'))
    toDoDoneButton = toDo.appendChild(document.createElement('button'))

    toDoTitle.innerText = toDoObject.title
    toDoDescription.innerText = toDoObject.description
    toDoPriority.innerText = toDoObject.priority
    toDoLasting.innerText = toDoObject.lasting
    toDoEditButton.innerText = 'Edit'
    toDoDeleteButton.innerText = 'Delete'
    toDoDoneButton.innerText = 'Done'

    listContainer.appendChild(toDo)
}

myForm.addEventListener('submit', (e) => {
    e.preventDefault()
    listContainer.innerHTML = ''
    addToDo(e.target)
    myForm.reset()
    for (let i = 0; i < toDoList.length; i++) {
        addToDom(myForm)
    }
})
