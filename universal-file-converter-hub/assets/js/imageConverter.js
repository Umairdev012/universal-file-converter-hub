// =========================
// IMAGE CONVERTER
// =========================

function convertImage(targetFormat){

    const file =
    fileInput.files[0];

    if(!file){

        alert(
            "Please select an image."
        );

        return;
    }

    const reader =
    new FileReader();

    reader.onload =
    function(event){

        const img =
        new Image();

        img.onload =
        function(){

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

            // White background
            if(
                targetFormat === "jpeg"
            ){

                ctx.fillStyle =
                "#ffffff";

                ctx.fillRect(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );
            }

            ctx.drawImage(
                img,
                0,
                0
            );

            const mimeType =

                targetFormat === "png"

                ? "image/png"

                : "image/jpeg";

            const outputURL =

                canvas.toDataURL(
                    mimeType,
                    1
                );

            showConvertedImage(
                outputURL,
                targetFormat
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

function showConvertedImage(
    imageURL,
    format
){

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
        id="downloadConverted">

        Download ${format.toUpperCase()}

        </button>
    `;

    document
    .getElementById(
        "downloadConverted"
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

            "converted-image." +

            (
                format === "jpeg"

                ? "jpg"

                : "png"
            );

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