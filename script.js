const userInp = q('.inp input'),
    result = q('.res>div'),
    clear = q("#clear"),
    compute = q('.compute'),
    clearAll = q("#clearAll"),
    themeTog = q('.theme-toggle>i', true),
    togPlusMinus = q('#togPlusMinus'),
    allNums = q('.board>div:not(.spc,.compute,#clearAll,#togPlusMinus,#per,#root,.hist)', true),
    allOps = q('.ops', true), per = q('#per');

upDateSize = (i) => {
    let l = i.textContent.length;

    if (l > 7) cls(i, 'b1', 'a'); else cls(i, 'b1', 'r')
    if (l > 14) cls(i, 'b2', 'a'); else cls(i, 'b2', 'r')
    if (l > 25) cls(i, 'b3', 'a'); else cls(i, 'b3', 'r')
    if (l > 35) cls(i, 'b4', 'a'); else cls(i, 'b4', 'r')
}
(localStorage.result && localStorage.expression) ? (() => {
    userInp.value = localStorage.expression;
    setTimeout(() => {
        result.classList.add('hasData');
        result.innerHTML = localStorage.result
        upDateSize(result)
    }, 200)
})() : null

on(themeTog, 'mousedown', function () {
    themeTog[0].classList.toggle('act')
    themeTog[1].classList.toggle('act')
    if (this.dataset.value === 'light') {
        document.body.setAttribute('data-theme', 'light')
    } else {
        document.body.setAttribute('data-theme', 'dark')
    }
}, true)

on(allNums, 'mousedown', function () {
    userInp.value += this.innerHTML
    computeExp(userInp.value)
}, true)

function updateStorage(f) {
    localStorage.expression = f
    localStorage.result = result.innerHTML
}

on(clear, 'mousedown', () => {
    userInp.value = userInp.value.slice(0, -1)
    computeExp(userInp.value)
    updateStorage(userInp.value)
})
on(clearAll, 'mousedown', () => {
    userInp.value = ''; result.innerHTML = '';
    updateStorage(userInp.value)
})
on(per, 'mousedown', ()=>{
    userInp.value +='%'
    computeExp(userInp.value)
    console.log("hi ")
})
togPlusMinus.onclick = () => {
    // (userInp.value.split('').includes('–')) ? computeExp(userInp.value): computeExp(userInp.value)
}

const computeExp = (f) => {
    if (!f) return
    userInp.value = replaceIn(userInp.value)
    result.classList.add('hasData')
    result.innerHTML = (eval(replaceOut(f)).toLocaleString()).slice(0, 105)
    upDateSize(result)
    updateStorage(f)
}

// compute.onclick = () => { computeExp(userInp.value) }
userInp.oninput = e => { computeExp(e.target.value) }
