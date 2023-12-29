function csvDownload(csv_data, file_name) {
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv_data);
    hiddenElement.target = '_blank';

    hiddenElement.download = file_name;
    hiddenElement.click();
}

let full_data = [];
let output_data = "First Name,Mobile Phone";

let contacts = "";
let file_path = "";
let contact = "";

function downloadContacts() {
    contacts = document.querySelector("#contacts").value;
    file_path = document.querySelector("#file-name").value;
    contact = document.querySelector("#contact-name").value;

    let i = 0;
    while(i < contacts.split("\n").length) {
        let item = contacts.split("\n")[i];
        let phoneNumber = item.split("⁦").join("").split("⁩").join("");
        if(Math.ceil((i)/300) == (i)/300 && i != 0) {
            full_data.push(output_data);
            output_data = "First Name,Mobile Phone";
        }

        output_data += `\n${contact} ${i+1},${phoneNumber}`;

        console.log(`Finished ${i+1}`);
        if(i == contacts.split("\n").length - 1){
            output_data != "First Name,Mobile Phone"? full_data.push(output_data) : "";

            let e = 0;
            while(e < full_data.length) {
                if(full_data.length == 1) {
                    csvDownload(full_data[e], `${file_path}.csv`);
                } else if(full_data.length > 1) {
                    csvDownload(full_data[e], `${file_path} - ${e+1}.csv`);
                }
                e++;
            }
        }

        i++;
    }
}