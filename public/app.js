function getFormat(name) {
    // Try to get value from select element first
    let select = document.getElementById(name);
    if (select && select.tagName === 'SELECT') {
        return select.value;
    }
    // Fallback to radio buttons (legacy)
    let format = document.getElementsByName(name)
    for (var i = 0, length = format.length; i < length; i++) {
        if (format[i].checked) {
            return format[i].value
        }
    }
    // Default
    return 'pretty';
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
    if (copyButton) copyButton.textContent = 'Copy'
}

function convertJsonToCsv() {
    let input = document.getElementById('json-input').value.trim()
    let delimiter = document.getElementById('csv-delimiter').value.trim()
    let output = ''
    try {
        let arr = JSON.parse(input)
        if (!Array.isArray(arr) || arr.length === 0) {
            document.getElementById('csv-output').value = ''
            return
        }
        let keys = Object.keys(arr[0])
        let lines = [keys.join(delimiter)]
        for (let i = 0; i < arr.length; i++) {
            let row = keys.map(k => {
                let val = arr[i][k]
                // Escape delimiter and quotes
                if (typeof val === 'string' && (val.includes(delimiter) || val.includes('"') || val.includes('\n'))) {
                    val = '"' + val.replace(/"/g, '""') + '"'
                }
                return val
            })
            lines.push(row.join(delimiter))
        }
        output = lines.join('\n')
        document.getElementById('csv-output').value = output
    } catch (e) {
        document.getElementById('csv-output').value = ''
    }
    let copyButton = document.getElementById('copyCsvButton')
    if (copyButton) copyButton.textContent = 'Copy'
}

function copy(id) {
    let output = document.getElementById(id)
    let text = output.value
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
            let copyButton = (id === 'csv-output') ? document.getElementById('copyCsvButton') : document.getElementById('copyButton')
            if (copyButton) copyButton.textContent = 'Copied'
        }).catch(function() {
            fallbackCopy(output, id)
        });
    } else {
        fallbackCopy(output, id)
    }
}

function fallbackCopy(output, id) {
    output.select();
    output.setSelectionRange(0, 99999);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    output.blur();
    let copyButton = (id === 'csv-output') ? document.getElementById('copyCsvButton') : document.getElementById('copyButton')
    if (copyButton) copyButton.textContent = 'Copied'
}

function download(elementId, fileName) {
    const element = document.getElementById(elementId);
    const content = element.value;
    const blob = new Blob([content], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}

// Theme toggle logic
const themeSwitchBtn = document.getElementById('theme-switch');
const themeIcon = document.getElementById('theme-icon');
function setTheme(dark) {
    if (dark) {
        document.documentElement.classList.add('dark-mode');
        document.body.classList.add('dark-mode');
        themeIcon.innerHTML = `<svg class="sun-icon" viewBox="0 0 24 24"><path d="M12 7a5 5 0 100 10 5 5 0 000-10zM2 13h2a1 1 0 100-2H2a1 1 0 100 2zm18 0h2a1 1 0 100-2h-2a1 1 0 100 2zM11 2v2a1 1 0 102 0V2a1 1 0 10-2 0zm0 18v2a1 1 0 102 0v-2a1 1 0 10-2 0zM5.99 4.58a1 1 0 10-1.41 1.41l1.06 1.06a1 1 0 101.41-1.41L5.99 4.58zm12.37 12.37a1 1 0 10-1.41 1.41l1.06 1.06a1 1 0 101.41-1.41l-1.06-1.06zm1.06-10.96a1 1 0 10-1.41-1.41l-1.06 1.06a1 1 0 101.41 1.41l1.06-1.06zM7.05 18.36a1 1 0 10-1.41-1.41l-1.06 1.06a1 1 0 101.41 1.41l1.06-1.06z"></path></svg>`;
    } else {
        document.documentElement.classList.remove('dark-mode');
        document.body.classList.remove('dark-mode');
        themeIcon.innerHTML = `<svg class="moon-icon" viewBox="0 0 24 24"><path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"></path></svg>`;
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

// JSON to CSV auto convert
const jsonInput = document.getElementById('json-input');
const csvDelimiter = document.getElementById('csv-delimiter');
if (jsonInput && csvDelimiter) {
    jsonInput.addEventListener('input', convertJsonToCsv);
    csvDelimiter.addEventListener('input', convertJsonToCsv);
}

// Isi default input jika kosong saat halaman dimuat
window.addEventListener('DOMContentLoaded', function() {
    var input = document.getElementById('input');
    if (input && input.value.trim() === '') {
        input.value = `name,address\nAndi Saputra,Jl. Merdeka No. 10 Jakarta\nSiti Rahma,Jl. Sudirman No. 25 Bandung`;
        convert(); // langsung konversi agar output juga muncul
    }
    // JSON to CSV default
    var jsonInput = document.getElementById('json-input');
    if (jsonInput && jsonInput.value.trim() === '') {
        jsonInput.value = '[{"name":"Andi Saputra","address":"Jl. Merdeka No. 10 Jakarta"},{"name":"Siti Rahma","address":"Jl. Sudirman No. 25 Bandung"}]';
        convertJsonToCsv();
    }
});

document.getElementById('currentYear').textContent = new Date().getFullYear();
