// =========================
// IMAGE RESIZER
// =========================

function resizeImage() {

    const file =
    fileInput.files[0];

    if (!file) {

        alert(
            "Please select an image."
        );

        return;
    }

    const width =
    document.getElementById(
        "widthInput"
    )?.value;

    const height =
    document.getElementById(
        "heightInput"
    )?.value;

    if (!width || !height) {

        alert(
            "Please enter width and height."
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
            parseInt(width);

            canvas.height =
            parseInt(height);

            ctx.drawImage(
                img,
                0,
                0,
                canvas.width,
                canvas.height
            );

            const resizedURL =

            canvas.toDataURL(
                "image/png",
                1
            );

            showResizedResult(
                resizedURL,
                width,
                height
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

function showResizedResult(
    imageURL,
    width,
    height
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

        <p
        style="
        margin-bottom:15px;
        font-weight:600;
        ">
        ${width}px × ${height}px
        </p>

        <button
        class="download-btn"
        id="downloadResized">

        Download Resized Image

        </button>
    `;

    document
    .getElementById(
        "downloadResized"
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
            "resized-image.png";

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