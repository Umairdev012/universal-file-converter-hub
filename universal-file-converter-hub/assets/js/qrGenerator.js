// =========================
// QR GENERATOR
// =========================

function generateQRCode() {

    const qrText =
    document.getElementById(
        "qrText"
    )?.value;

    if (!qrText) {

        alert(
            "Please enter text or URL."
        );

        return;
    }

    resultArea.innerHTML =

    `
        <div id="qrContainer"></div>

        <button
        class="download-btn"
        id="downloadQR">

        Download QR

        </button>
    `;

    const qrContainer =
    document.getElementById(
        "qrContainer"
    );

    new QRCode(
        qrContainer,
        {
            text: qrText,

            width: 250,

            height: 250
        }
    );

    setTimeout(() => {

        const qrImage =
        qrContainer.querySelector(
            "img"
        );

        document
        .getElementById(
            "downloadQR"
        )
        .addEventListener(
            "click",
            function () {

                const link =
                document.createElement(
                    "a"
                );

                link.href =
                qrImage.src;

                link.download =
                "qrcode.png";

                document.body.appendChild(
                    link
                );

                link.click();

                document.body.removeChild(
                    link
                );
            }
        );

    }, 500);
}