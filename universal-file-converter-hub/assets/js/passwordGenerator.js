// =========================
// PASSWORD GENERATOR
// =========================

function generatePassword() {

    const length =
    parseInt(
        document.getElementById(
            "passwordLength"
        )?.value || 12
    );

    const uppercase =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const lowercase =
    "abcdefghijklmnopqrstuvwxyz";

    const numbers =
    "0123456789";

    const symbols =
    "!@#$%^&*()_+-=[]{}|;:,.<>?";

    const allChars =

        uppercase +
        lowercase +
        numbers +
        symbols;

    let password = "";

    for (
        let i = 0;
        i < length;
        i++
    ) {

        const randomIndex =

            Math.floor(
                Math.random() *
                allChars.length
            );

        password +=
        allChars[randomIndex];
    }

    showPasswordResult(
        password
    );
}

// =========================
// RESULT UI
// =========================

function showPasswordResult(
    password
) {

    resultArea.innerHTML =

    `
        <div
        style="
        width:100%;
        max-width:600px;
        ">

            <input
            id="generatedPassword"
            value="${password}"
            readonly

            style="
            width:100%;
            padding:15px;
            border:2px solid #E2E8F0;
            border-radius:12px;
            font-size:16px;
            margin-bottom:15px;
            ">

            <button
            class="download-btn"
            id="copyPassword">

            Copy Password

            </button>

        </div>
    `;

    document
    .getElementById(
        "copyPassword"
    )
    .addEventListener(
        "click",
        function () {

            const input =
            document.getElementById(
                "generatedPassword"
            );

            input.select();

            input.setSelectionRange(
                0,
                99999
            );

            navigator.clipboard
            .writeText(
                input.value
            );

            this.textContent =
            "Copied Successfully ✓";

            setTimeout(() => {

                this.textContent =
                "Copy Password";

            }, 2000);
        }
    );
}