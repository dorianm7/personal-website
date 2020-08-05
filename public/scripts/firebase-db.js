var database = firebase.database();
const DB_URL = 'https://dorian-alexis-maldonado.firebaseio.com/';
const DB_BLOGS_URL = `${DB_URL}/blogs`;

const getBlogsDB = async () => {
    let blogs;
    await database.ref('blogs/').once('value')
        .then((snapshot) => {
            blogs = snapshot.val();
        })
        .catch((e) => alert(e));
    return blogs;
}

export {database, DB_URL, DB_BLOGS_URL, getBlogsDB};