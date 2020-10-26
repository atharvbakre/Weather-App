const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message_1 = document.getElementById('msg-1')
const message_2 = document.getElementById('msg-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if(search.value){
        const url = '/weather?location=' + encodeURIComponent(search.value)
        
        message_1.textContent = 'Loading...'
        message_2.textContent = ''

        fetch(url)
        .then((response) => {
            response.json()
            .then((data) => {
                if(data.error){
                    message_1.textContent = data.error
                }else{
                    message_1.textContent = data.location
                    message_2.textContent = data.forecast
                }
            })
        }) 
    } else{
        message_1.textContent = 'Please enter a Location'
        message_2.textContent = ''
    }
})