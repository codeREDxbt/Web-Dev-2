let form = document.querySelector('form')
let eventTitle = document.querySelector('#eventTitle')
let eventDate = document.querySelector('#eventDate')
let eventCatagory = document.querySelector('#eventCatagory')
let eventDescription = document.querySelector('#eventDescription')
let allEventContainer = document.querySelector('#alleventscontainer')
let clearAllEvents = document.querySelector('#clear-event-btn')
let addSampleBtn = document.querySelector('#add-sample-btn')


function addEventFunction(event) {
    event.preventDefault()
    let card = document.createElement('div')

    card.innerHTML = `<button class="close-btn">X</button>
                    <h4>${eventTitle.value}</h4>
                    <span>${eventDate.value}</span> <br>
                    <span>${eventCatagory.value}</span>
                    <p>${eventDescription.value}</p>`


    card.querySelector('.close-btn').addEventListener('click', () => {
        card.remove()

        if (allEventContainer.children.length === 0) {
            allEventContainer.innerHTML = `<h4 class="no-events">No Events Yet.</h4>`
        }
    })



    if (allEventContainer.querySelector('.no-events')) {
        allEventContainer.innerHTML = ""
    }
    allEventContainer.append(card)
    form.reset()


}

function clearAllEventFunction() {
    allEventContainer.innerHTML = `<h4 class="no-events">No Events Yet.</h4>`
}


form.addEventListener('submit', addEventFunction)

clearAllEvents.addEventListener('click', clearAllEventFunction)


function addSampleEvent() {
    let card = document.createElement('div')

    card.innerHTML = `<button class="close-btn">X</button>
                        <h4>Sample Event</h4>
                        <span>15-05-1997</span><br>
                        <span>Conference</span>
                        <p>This is a sample event added using the sample button.</p>`


    card.querySelector('.close-btn').addEventListener('click', () => {
        card.remove()
        if (allEventContainer.children.length === 0) {
            allEventContainer.innerHTML = `<h4 class="no-events">No Events Yet.</h4>`
        }
    })


    if (allEventContainer.querySelector('.no-events')) {
        allEventContainer.innerHTML = ""
    }

    allEventContainer.append(card)
}

addSampleBtn.addEventListener('click', addSampleEvent)