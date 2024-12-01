const baseUrl = 'http://localhost:3001';

function checkRes(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
}

function getItems() {
    return fetch(`${baseUrl}/items`).then(checkRes)
}

function addItem({ name, weather, imageUrl}) {
    return fetch(`${baseUrl}/items`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ name, weather, imageUrl })
    }).then(checkRes)
}

function deleteCard(cardId) {
    return fetch(`${baseUrl}/items/${cardId}`, {
        method: "DELETE"
    }).then(checkRes)
}

export { getItems, addItem, deleteCard };