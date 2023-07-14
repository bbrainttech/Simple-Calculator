const userInp = document.querySelector('.inp input'),
    result = document.querySelector('.res>div'),
    clear = document.getElementById("clear"),
    compute = document.querySelector('.compute'),
    clearAll = document.getElementById("clearAll"),
    themeTog = document.querySelectorAll('.theme-toggle>i'),
    togPlusMinus = document.getElementById('togPlusMinus'),
    allNums = document.querySelectorAll('.board>div:not(.spc,.compute,#clearAll,#togPlusMinus,#per,#root,.hist)'),
    allOps = document.querySelectorAll('.ops');

(localStorage.result && localStorage.expression) ? (() => { userInp.value = localStorage.expression; setTimeout(() => { result.classList.add('hasData'); result.innerHTML = localStorage.result }, 200) })() : null

themeTog.forEach(theme => {
    theme.onmousedown = function () {
        
        themeTog[0].classList.toggle('act')
        themeTog[1].classList.toggle('act')
        if(this.dataset.value === 'light'){
            document.body.setAttribute('data-theme','light')} else{
            document.body.setAttribute('data-theme','dark') }
    }
})
// document.documentElement.style.setProperty('--sub1','red')
allNums.forEach(num => {
    num.onmousedown = function () {
        userInp.value += this.innerHTML
        computeExp(userInp.value)
    }
})

function updateStorage(f) {
    localStorage.expression = f
    localStorage.result = result.innerHTML
}
upDateSize = (i) => {
    let l = i.textContent.length;
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
    // (userInp.value.split('').includes('–')) ? computeExp(userInp.value): computeExp(userInp.value)
}
const replaceIn = i => {
    return i.replaceAll('-', ' – ')
        .replaceAll('*', ' × ')
        .replaceAll('/', ' ∻ ')
        .replaceAll(' ', '')
}
const replaceOut = o => {
    return o.replaceAll('–', '-')
        .replaceAll('×', '*')
        .replaceAll('∻', '/')
        .replaceAll('^', '**')
        .replaceAll(' ', '')
}
const computeExp = (f) => {
    if (!f) return
    userInp.value = replaceIn(userInp.value)
    result.classList.add('hasData')
    result.innerHTML = eval(replaceOut(f)).toLocaleString()
    updateStorage(f)
}

compute.onclick = () => { computeExp(userInp.value) }
userInp.oninput = e => { computeExp(e.target.value) }
