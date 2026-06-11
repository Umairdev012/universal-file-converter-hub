// =========================
// IMAGE COMPRESSOR
// =========================

function compressImage() {

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

            const canvas =
            document.createElement(
                "canvas"
            );

            const ctx =
            canvas.getContext(
                "2d"
            );

            canvas.width =
            img.width;

            canvas.height =
            img.height;

            ctx.drawImage(
                img,
                0,
                0
            );

            // Compression Quality

            const compressedURL =

            canvas.toDataURL(
                "image/jpeg",
                0.6
            );

            showCompressedResult(
                compressedURL
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
// RESULT UI
// =========================

function showCompressedResult(
    imageURL
) {

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
        id="downloadCompressed">

        Download Compressed Image

        </button>
    `;

    document
    .getElementById(
        "downloadCompressed"
    )
    .addEventListener(
        "click",
        function () {

            const link =
            document.createElement(
                "a"
            );

            link.href =
            imageURL;

            link.download =
            "compressed-image.jpg";

            document.body.appendChild(
                link
            );

            link.click();

            document.body.removeChild(
                link
            );

        }
    );
}