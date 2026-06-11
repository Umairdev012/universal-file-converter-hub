// =========================
// IMAGE TO PDF
// =========================
const { jsPDF } = window.jspdf;
async function imageToPDF() {

    const file =
    fileInput.files[0];

    if (!file) {

        alert(
            "Please select an image."
        );

        return;
    }

    const reader =
    new FileReader();

    reader.onload =
    function (event) {

        const img =
        new Image();

        img.onload =
        function () {

            const pdf =
            new jsPDF()();

            const pageWidth =
            pdf.internal.pageSize.getWidth();

            const pageHeight =
            pdf.internal.pageSize.getHeight();

            pdf.addImage(
                event.target.result,
                "JPEG",
                0,
                0,
                pageWidth,
                pageHeight
            );

            resultArea.innerHTML =

            `
                <p
                style="
                font-size:18px;
                font-weight:600;
                margin-bottom:20px;
                ">
                PDF Ready To Download
                </p>

                <button
                class="download-btn"
                id="downloadPDF">

                Download PDF

                </button>
            `;

            document
            .getElementById(
                "downloadPDF"
            )
            .addEventListener(
                "click",
                function(){

                    pdf.save(
                        "converted.pdf"
                    );

                }
            );

        };

        img.src =
        event.target.result;

    };

    reader.readAsDataURL(
        file
    );
}

// =========================
// PDF TO IMAGE
// =========================

async function pdfToImage() {

    const file =
    fileInput.files[0];

    if (!file) {

        alert(
            "Please select a PDF."
        );

        return;
    }

    const fileReader =
    new FileReader();

    fileReader.onload =
    async function () {

        const typedArray =
        new Uint8Array(
            this.result
        );

        const pdf =
        await pdfjsLib.getDocument({
            data: typedArray
        }).promise;

        const page =
        await pdf.getPage(1);

        const viewport =
        page.getViewport({
            scale: 2
        });

        const canvas =
        document.createElement(
            "canvas"
        );

        const context =
        canvas.getContext(
            "2d"
        );

        canvas.height =
        viewport.height;

        canvas.width =
        viewport.width;

        await page.render({

            canvasContext:
            context,

            viewport:
            viewport

        }).promise;

        const imageURL =
        canvas.toDataURL(
            "image/png"
        );

        resultArea.innerHTML =

        `
            <img
            src="${imageURL}"
            style="
            max-width:100%;
            border-radius:20px;
            margin-bottom:20px;
            ">

            <button
            class="download-btn"
            id="downloadImage">

            Download Image

            </button>
        `;

        document
        .getElementById(
            "downloadImage"
        )
        .addEventListener(
            "click",
            function(){

                const link =
                document.createElement(
                    "a"
                );

                link.href =
                imageURL;

                link.download =
                "pdf-page.png";

                document.body.appendChild(
                    link
                );

                link.click();

                document.body.removeChild(
                    link
                );

            }
        );

    };

    fileReader.readAsArrayBuffer(
        file
    );
}