import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json))
            .catch((error) => { console.log(error); });
    }, []);

    function updateList(person) {
        postUser(person)
            .then((response) => {
                if (response.status == 201) {
                    return response.json();
                }
            })
            .then((person) => setCharacters([...characters, person]))
            .catch((error) => {
                console.log(error);
            })
    }

    function removeUserFromList(index) {
        const user = characters.find((character, i) => {
            return i === index;
        });

        deleteUser(user)
            .then((res) => res.json())
            .then((json) => setCharacters(json))
            .catch((error) => {
                console.log(error)
            })
    }

    function postUser(person) {
        const promise = fetch("Http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });

        return promise;
    }

    function deleteUser(person) {
        const promise = fetch(`http://localhost:8000/users/${person._id}`, {
            method: "DELETE"
        })

        return promise
    }

    return (
        <div className="container">
            <Table
                characterData={characters}
                removeCharacter={removeUserFromList}
            />
            <Form handleSubmit={updateList} />
        </div>
    );
}

export default MyApp;

// From linking assignment
function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
}