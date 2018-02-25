firebase.initializeApp({
    apiKey: "AIzaSyDdTGxAa774Tni9cLaSZjXS4C12KfwNZPo",
    authDomain: "proyectousuario-600b2.firebaseapp.com",
    projectId: "proyectousuario-600b2"
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();


//Agregar
function guardar() {
    var name = document.getElementById('nombre').value;
    var lastName = document.getElementById('apellido').value;
    var dateUser = document.getElementById('fecha').value;

    db.collection("users").add({
        first: name,
        last: lastName,
        born: dateUser
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById('nombre').value = "";
            document.getElementById('apellido').value = "";
            document.getElementById('fecha').value = "";

        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}

// Leer documentos
var tabla = document.getElementById('tabla');

db.collection("users").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`);
        tabla.innerHTML += `<tr>
                                <th scope="row">${doc.id}</th>
                                    <td>${doc.data().first}</td>
                                    <td>${doc.data().last}</td>
                                    <td>${doc.data().born}</td>
                                    <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
                                    <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}')">Editar</button></td>
                            </tr>`
    });
});

// Borrar documentos
function eliminar(id) {
    db.collection("users").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}

// Editar documentos
function editar(id,name,lastName,dateUser) {
    document.getElementById('nombre').value = name;
    document.getElementById('apellido').value = lastName;
    document.getElementById('fecha').value = dateUser;
    var boton = document.getElementById('boton');
    boton.innerHTML = "Editar";

    boton.onclick = () => {
        var washingtonRef = db.collection("users").doc(id);

        var name = document.getElementById('nombre').value;
        var lastName = document.getElementById('apellido').value;
        var dateUser = document.getElementById('fecha').value;
    
        return washingtonRef.update({
            first: name,
            last: lastName,
            born: dateUser
        })
        .then(function () {
            console.log("Document successfully updated!");
            boton.innerHTML = "Guardar";
            document.getElementById('nombre').value = "";
            document.getElementById('apellido').value = "";
            document.getElementById('fecha').value = "";
        })
        .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    } 
}
