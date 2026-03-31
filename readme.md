# CSV ⇄ JSON Converter

A simple, fast, and secure tool to convert CSV to JSON and JSON to CSV directly in your browser.

## ✨ Features

- **CSV to JSON Conversion** - Convert CSV data to JSON format instantly
- **JSON to CSV Conversion** - Convert JSON arrays back to CSV format
- **Customizable Delimiter** - Support for any CSV delimiter (comma, semicolon, tab, etc.)
- **Output Format Options** - Choose between Pretty (formatted) or Minified JSON output
- **Copy to Clipboard** - One-click copy functionality for both JSON and CSV output
- **Download Output** - Download converted data as `.json` or `.csv` file
- **Dark/Light Theme** - Toggle between dark and light mode for comfortable viewing
- **Auto-Convert** - Real-time conversion as you type
- **Persistent Input** - Your input is saved locally and restored on page reload
- **100% Client-Side** - All processing happens in your browser. No data is sent to any server

## 🚀 How to Use

### CSV to JSON

1. Paste your CSV data in the input area (first row should be headers)
2. Select your CSV delimiter (default: `,`)
3. Choose output format: Pretty or Minified
4. JSON output will be generated automatically
5. Click **Copy** to copy to clipboard or **Download** to save as file

### JSON to CSV

1. Switch to the **JSON → CSV** tab
2. Paste your JSON array in the input area
3. Select your desired CSV delimiter
4. CSV output will be generated automatically
5. Click **Copy** to copy to clipboard or **Download** to save as file

## 📝 Example

### CSV Input
```
name,address
Andi Saputra,Jl. Merdeka No. 10 Jakarta
Siti Rahma,Jl. Sudirman No. 25 Bandung
```

### JSON Output
```json
[
  {
    "name": "Andi Saputra",
    "address": "Jl. Merdeka No. 10 Jakarta"
  },
  {
    "name": "Siti Rahma",
    "address": "Jl. Sudirman No. 25 Bandung"
  }
]
```

## 🛠️ Built With

- [Spectre CSS](https://picturepan2.github.io/spectre/) - Lightweight and responsive CSS framework
- Vanilla JavaScript - No external dependencies

## 🔒 Privacy & Security

This tool processes all data entirely in your browser using JavaScript. No data is uploaded to any server, ensuring complete privacy and security of your information.

## 👨‍💻 Author

**Heru Rusdianto**
- Website: [herusdianto.github.io](https://herusdianto.github.io/)
- GitHub: [@herusdianto](https://github.com/herusdianto)

## License

MIT License

## 🙏 Icons Used

- [CSV Icon](https://www.iconfinder.com/icons/7267724/ext_csv_file_document_format_extension_office_icon)

## Contributing

Contributions are welcome! Feel free to submit a Pull Request.

## Demo

[https://herusdianto.github.io/csv-to-json/](https://herusdianto.github.io/csv-to-json/)
