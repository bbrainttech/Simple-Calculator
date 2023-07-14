const userInp = document.querySelector('.inp input'),
    result = document.querySelector('.res>div'),
    clear = document.getElementById("clear"),
    compute = document.querySelector('.compute'),
    clearAll = document.getElementById("clearAll"),
    togPlusMinus = document.getElementById('togPlusMinus'),
    allNums = document.querySelectorAll('.board>div:not(.spc,.compute,#clearAll,#togPlusMinus,#per,#root,.hist)'),
    allOps = document.querySelectorAll('.ops');

(localStorage.result && localStorage.expression) ? (() => { userInp.value = localStorage.expression; setTimeout(() => { result.classList.add('hasData'); result.innerHTML = localStorage.result }, 200) })() : null


allNums.forEach(num => {
    num.onmousedown = function () {
        userInp.value += this.innerHTML
        // computeExp(userInp.value)
    }
})

function updateStorage(f) {
    localStorage.expression = f
    localStorage.result = result.innerHTML
}
upDateSize = (i) => {
    let l = result.textContent.length;
    (l > 7) ? i.classList.add('b1') : (l > 14) ? i.classList.add('b2') : i.classList.add('b3')
}

clear.onmousedown = () => {
    userInp.value = userInp.value.slice(0, -1)
    computeExp(userInp.value)
    updateStorage(userInp.value)
}
clearAll.onmousedown = () => {
    userInp.value = ''; result.innerHTML = '';
    updateStorage(userInp.value)
}
togPlusMinus.onclick = () => {
    (userInp.value.split('').includes('–')) ? -1 * Number(computeExp(userInp.value)) : console.log('no')
}
const computeExp = (f) => {
    if (!f) return
    userInp.value = userInp.value.toLocaleString()
    result.classList.add('hasData')
    result.innerHTML = eval(
        f.replaceAll('–', '-')
            .replaceAll('×', '*')
            .replaceAll('∻', '/')
            .replaceAll(' ', '')
    ).toLocaleString()
    updateStorage(f)
}

compute.onclick = () => { computeExp(userInp.value) }
userInp.oninput = e => { computeExp(e.target.value) }
