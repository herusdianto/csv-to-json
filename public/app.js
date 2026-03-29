function getFormat(name) {
    let format = document.getElementsByName(name)

    for (var i = 0, length = format.length; i < length; i++) {
        if (format[i].checked) {
            return format[i].value
        }
    }
}

function convert() {
    let input = document.getElementById('input').value.trim()
    let delimiter = document.getElementById('delimiter').value.trim()
    let format = getFormat('format')

    let output = ''

    let rows = input.split(/\r?\n/)
    let rowsLength = rows.length

    if (rowsLength) {
        let contents = []
        let keys = rows[0].split(delimiter)

        for (let indexRow = 1; indexRow < rowsLength; indexRow++) {
            let values = rows[indexRow].split(delimiter)

            let obj = {}

            for (let indexKey = 0; indexKey < keys.length; indexKey++) {
                obj[keys[indexKey]] = values[indexKey]
            }

            contents.push(obj)
        }

        if (format === 'minified')
            output = JSON.stringify(contents)
        else
            output = JSON.stringify(contents, null, 2)

        document.getElementById('output').value = output
    }

    let copyButton = document.getElementById('copyButton')
    copyButton.textContent = 'Copy'
}

function copy() {
    let output = document.getElementById('output')
    let text = output.value

    // Use modern Clipboard API if available
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
            let copyButton = document.getElementById('copyButton')
            copyButton.textContent = 'Copied'
        }).catch(function() {
            // Fallback to old method
            fallbackCopy(output)
        });
    } else {
        fallbackCopy(output)
    }
}

function fallbackCopy(output) {
    output.select();
    output.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand('copy');
    // Remove selection to prevent visual issues
    window.getSelection().removeAllRanges();
    output.blur();
    let copyButton = document.getElementById('copyButton')
    copyButton.textContent = 'Copied'
}

// Theme toggle logic
const themeSwitchBtn = document.getElementById('theme-switch');
const themeIcon = document.getElementById('theme-icon');
function setTheme(dark) {
    if (dark) {
        document.documentElement.classList.add('dark-mode');
        document.body.classList.add('dark-mode');
        themeIcon.innerHTML = `<svg class="moon-icon" viewBox="0 0 24 24"><path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"></path></svg>`;
    } else {
        document.documentElement.classList.remove('dark-mode');
        document.body.classList.remove('dark-mode');
        themeIcon.innerHTML = `<svg class="sun-icon" viewBox="0 0 24 24"><path d="M12 7a5 5 0 100 10 5 5 0 000-10zM2 13h2a1 1 0 100-2H2a1 1 0 100 2zm18 0h2a1 1 0 100-2h-2a1 1 0 100 2zM11 2v2a1 1 0 102 0V2a1 1 0 10-2 0zm0 18v2a1 1 0 102 0v-2a1 1 0 10-2 0zM5.99 4.58a1 1 0 10-1.41 1.41l1.06 1.06a1 1 0 101.41-1.41L5.99 4.58zm12.37 12.37a1 1 0 10-1.41 1.41l1.06 1.06a1 1 0 101.41-1.41l-1.06-1.06zm1.06-10.96a1 1 0 10-1.41-1.41l-1.06 1.06a1 1 0 101.41 1.41l1.06-1.06zM7.05 18.36a1 1 0 10-1.41-1.41l-1.06 1.06a1 1 0 101.41 1.41l1.06-1.06z"></path></svg>`;
    }
}
function getThemePref() {
    return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}
function applyTheme() {
    const dark = getThemePref() === 'dark';
    setTheme(dark);
}
if (themeSwitchBtn && themeIcon) {
    applyTheme();
    themeSwitchBtn.addEventListener('click', function() {
        const dark = !document.documentElement.classList.contains('dark-mode');
        setTheme(dark);
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    });
}

// Auto-join on input change
const input = document.getElementById('input');
const delimiter = document.getElementById('delimiter');
const format = document.getElementById('format');
if (input && delimiter && format) {
    input.addEventListener('input', convert);
    delimiter.addEventListener('input', convert);
    format.addEventListener('change', convert);
}

// Isi default input jika kosong saat halaman dimuat
window.addEventListener('DOMContentLoaded', function() {
    var input = document.getElementById('input');
    if (input && input.value.trim() === '') {
        input.value = `name,address\nAndi Saputra,Jl. Merdeka No. 10 Jakarta\nSiti Rahma,Jl. Sudirman No. 25 Bandung`;
        convert(); // langsung konversi agar output juga muncul
    }
});

document.getElementById('currentYear').textContent = new Date().getFullYear();
