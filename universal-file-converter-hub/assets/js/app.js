// =========================
// ELEMENTS
// =========================

const toolCards =
document.querySelectorAll(
    ".tool-card"
);

const toolTitle =
document.getElementById(
    "toolTitle"
);

const processBtn =
document.getElementById(
    "processBtn"
);

const fileInput =
document.getElementById(
    "fileInput"
);

const extraControls =
document.getElementById(
    "extraControls"
);

const resultArea =
document.getElementById(
    "resultArea"
);

// =========================
// CURRENT TOOL
// =========================

let currentTool = null;

// =========================
// TOOL NAMES
// =========================

const toolNames = {

    pngToJpg:
    "PNG → JPG Converter",

    jpgToPng:
    "JPG → PNG Converter",

    webpToPng:
    "WEBP → PNG Converter",

    webpToJpg:
    "WEBP → JPG Converter",

    compress:
    "Image Compressor",

    resize:
    "Image Resizer",

    imagePdf:
    "Image → PDF",

    pdfImage:
    "PDF → Image",

    qr:
    "QR Generator",

    password:
    "Password Generator"

};

// =========================
// TOOL SELECTION
// =========================

toolCards.forEach(card => {

    card.addEventListener(
        "click",
        function(){

            toolCards.forEach(c => {

                c.style.border =
                "none";

            });

            this.style.border =
            "3px solid #7C3AED";

            currentTool =
            this.dataset.tool;

            toolTitle.textContent =
            toolNames[currentTool];

            setupToolControls();

            resultArea.innerHTML =
            "<p>Ready to process...</p>";

        }
    );

});

// =========================
// DYNAMIC CONTROLS
// =========================

function setupToolControls(){

    extraControls.innerHTML = "";

    // IMAGE RESIZER

    if(currentTool === "resize"){

        extraControls.innerHTML = `

            <input
            type="number"
            id="widthInput"
            placeholder="Width">

            <br><br>

            <input
            type="number"
            id="heightInput"
            placeholder="Height">

        `;
    }

    // QR GENERATOR

    if(currentTool === "qr"){

        fileInput.style.display =
        "none";

        extraControls.innerHTML = `

            <input
            type="text"
            id="qrText"
            placeholder="Enter text or URL">

        `;

        return;
    }

    // PASSWORD GENERATOR

    if(currentTool === "password"){

        fileInput.style.display =
        "none";

        extraControls.innerHTML = `

            <input
            type="number"
            id="passwordLength"
            value="12"
            min="6"
            max="64">

        `;

        return;
    }

    fileInput.style.display =
    "block";
}

// =========================
// PROCESS BUTTON
// =========================

processBtn.addEventListener(
    "click",
    async function(){

        if(!currentTool){

            alert(
                "Please select a tool first."
            );

            return;
        }

        switch(currentTool){

            case "pngToJpg":

                convertImage(
                    "jpeg"
                );

                break;

            case "jpgToPng":

                convertImage(
                    "png"
                );

                break;

            case "webpToPng":

                convertImage(
                    "png"
                );

                break;

            case "webpToJpg":

                convertImage(
                    "jpeg"
                );

                break;

            case "compress":

                compressImage();

                break;

            case "resize":

                resizeImage();

                break;

            case "imagePdf":

                imageToPDF();

                break;

            case "pdfImage":

                pdfToImage();

                break;

            case "qr":

                generateQRCode();

                break;

            case "password":

                generatePassword();

                break;

        }

    }
);

// =========================
// DEFAULT MESSAGE
// =========================

resultArea.innerHTML =

`
<p>

Select a tool to start.

</p>
`;

// =========================
// TOAST NOTIFICATION
// =========================

function showToast(message){

    const toast =
    document.createElement("div");

    toast.className =
    "toast";

    toast.textContent =
    message;

    document.body.appendChild(
        toast
    );

    setTimeout(() => {

        toast.classList.add(
            "show"
        );

    },100);

    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

        setTimeout(() => {

            toast.remove();

        },300);

    },3000);
}

// =========================
// FILE VALIDATION
// =========================

fileInput?.addEventListener(
    "change",
    function(){

        if(
            this.files.length > 0
        ){

            showToast(
                this.files[0].name +
                " selected successfully"
            );

        }

    }
);

// =========================
// DARK MODE
// =========================

const themeBtn =
document.getElementById(
    "themeBtn"
);

themeBtn?.addEventListener(
    "click",
    function(){

        document.body.classList.toggle(
            "dark-mode"
        );

    }
);


// =========================
// DRAG & DROP
// =========================

const dropZone =
document.getElementById(
    "dropZone"
);

dropZone?.addEventListener(
    "click",
    function(){

        fileInput.click();

    }
);

dropZone?.addEventListener(
    "dragover",
    function(e){

        e.preventDefault();

        this.classList.add(
            "dragover"
        );

    }
);

dropZone?.addEventListener(
    "dragleave",
    function(){

        this.classList.remove(
            "dragover"
        );

    }
);

dropZone?.addEventListener(
    "drop",
    function(e){

        e.preventDefault();

        this.classList.remove(
            "dragover"
        );

        const files =
        e.dataTransfer.files;

        fileInput.files =
        files;

        showToast(
            files[0].name +
            " uploaded successfully"
        );

    }
);