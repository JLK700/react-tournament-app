import Papa from "papaparse";

/**
 * Minimal CSV file input that replaces the unmaintained `react-csv-reader`.
 *
 * Parses the selected file with PapaParse using its default options
 * (auto-detected delimiter, no header, empty lines preserved) and invokes
 * `onFileLoaded(data, fileInfo)` with the resulting array-of-rows and the
 * file's name -- matching the old library's callback contract.
 */
const CSVReader = ({ onFileLoaded, inputStyle = {}, accept = ".csv, text/csv" }) => {
    const handleChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const { data } = Papa.parse(reader.result);
            onFileLoaded(data ?? [], { name: file.name });
        };
        reader.readAsText(file, "UTF-8");
    };

    return (
        <input type="file" accept={accept} style={inputStyle} onChange={handleChange} />
    );
};

export default CSVReader;
