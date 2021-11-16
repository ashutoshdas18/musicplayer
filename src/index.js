const inp = document.querySelector('.inp');
const query = document.querySelector('.query');
query.addEventListener('submit',e=>{
    console.log(inp.value)
    e.preventDefault();
    var num = {
        val : inp.value
    }
    var xhr = new window.XMLHttpRequest();
    xhr.open('POST', '/num', true)
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr.send(JSON.stringify(num))
})