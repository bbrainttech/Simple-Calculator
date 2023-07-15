const q = (x, y = false) => {
    return (y == null || !y || isNaN(y)) ?
        document.querySelector(x) : document.querySelectorAll(x)
},

    on = (el, type, listener, all = false) => {
        if (el) {
            (all) ? el.forEach(e => e.addEventListener(type, listener)) :
                el.addEventListener(type, listener);
            return
        }
    },
    replaceIn = i => {
        return i.replaceAll('-', ' – ')
            .replaceAll('*', ' × ')
            .replaceAll('/', ' ∻ ')
            .replaceAll(' ', '')
    },
    replaceOut = o => {
        return o.replaceAll('–', '-')
            .replaceAll('×', '*')
            .replaceAll('∻', '/')
            .replaceAll('^', '**')
            .replaceAll('%', '/100')
            .replaceAll(' ', '')
    },

    cls = (el, value, type) => {
        if (el) {
            (type === 'a') ? el.classList.add(value) :
                (type === 'r') ? el.classList.remove(value) :
                    el.classList.toggle(value);
            return
        }
    }
