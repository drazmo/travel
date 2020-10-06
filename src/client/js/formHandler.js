export function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value

    if (Client.checkForSentence(formText)) {
        console.log("::: Form Submitted :::")
        fetch('http://localhost:8081/city', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ city: formText })
            }).then(res => res.json())
            .then(function(res) {

                console.log("City query response:" + res.data);
            })
    }
}