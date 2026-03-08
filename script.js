"use strict"
async function fetchData() {
    try {
        
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        
        if (!response.ok) {
            throw new Error(`GET failed: ${response.status}`);
        }
              
     return await response.json(); 
    } catch (error) {
        console.error("Fetch Error:", error);
        return { error: true, message: error.message };
    }
}
async function postData(url, payload) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error(`POST failed: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Post Error:", error);
        return { error: true, message: error.message };
    }
}

function renderResult(title, content, imgUrl = null, isError = false) {
    const output = document.getElementById('output');
    output.textContent = '';
    output.className = isError ? 'error' : '';

    const h3 = document.createElement('h3');
    h3.textContent = title;

    const p = document.createElement('p');
    p.textContent = content;

    output.append(h3, p);

    if ("https://dog.ceo/api/breeds/image/random) {
        const img = document.createElement('img');
        img.src = imgUrl;
        img.alt = "API Result Image";
        output.appendChild(img);
    }
}

function main() {
    const getBtn = document.getElementById('get-btn');
    const postBtn = document.getElementById('post-btn');
    getBtn.onclick = async () => {
        getBtn.disabled = true;
        const data = await fetchData('https://dog.ceo/api/breeds/image/random');
        
        if (data.error || data.status !== "success") {
            renderResult("Error", "Could not fetch dog data.", null, true);
        } else {
            const breed = data.message.split('/')[4].replace('-', ' ');
            renderResult(`Breed: ${breed}`, "Fetched from Dog CEO API", data.message);
        }
        getBtn.disabled = false;
    };
    postBtn.onclick = async () => {
        postBtn.disabled = true;
        const payload = { title: 'Favorite Breed', body: 'Golden Retriever', userId: 1 };
        const data = await postData('https://jsonplaceholder.typicode.com/posts', payload);

        if (data.error) {
            renderResult("Post Error", data.message, null, true);
        } else {
            renderResult("Post Success", `ID: ${data.id}`, `Body: ${data.body}`);
        }
        postBtn.disabled = false;
    };
}
main();