// ==========================================
// SEMESTER-WISE SUBJECTS
// ==========================================

const semesterSubjects = {

    1: [
        {
            name: "C Programming",
            type: "Theory"
        },

        {
            name: "C Programming Lab",
            type: "Lab"
        },

        {
            name: "Discrete Mathematics",
            type: "Theory"
        }
    ],


    2: [
        {
            name: "C++ Programming",
            type: "Theory"
        },

        {
            name: "C++ Programming Lab",
            type: "Lab"
        },

        {
            name: "Numerical Methods",
            type: "Theory"
        }
    ],


    3: [
        {
            name: "Data Structures",
            type: "Theory"
        },

        {
            name: "Data Structures Lab",
            type: "Lab"
        },

        {
            name: "Mathematical Statistics",
            type: "Theory"
        }
    ],


    4: [
        {
            name: "Java Programming",
            type: "Theory"
        },

        {
            name: "Java Programming Lab",
            type: "Lab"
        },

        {
            name: "Financial Analytics",
            type: "Theory"
        }
    ]

};


// ==========================================
// MARK → GRADE POINT
// ==========================================

function getGradePoint(mark) {

    if (mark >= 90 && mark <= 100) {
        return 10;
    }

    if (mark >= 80) {
        return 9;
    }

    if (mark >= 70) {
        return 8;
    }

    if (mark >= 60) {
        return 7;
    }

    if (mark >= 50) {
        return 6;
    }

    if (mark >= 40) {
        return 5;
    }

    return 0;
}


// ==========================================
// LOAD SUBJECTS
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const semester =
        document.getElementById("semester");


    semester.addEventListener("change", function () {

        const selectedSemester = this.value;


        const container =
            document.getElementById(
                "subjectContainer"
            );


        container.innerHTML = "";


        if (selectedSemester === "") {

            container.innerHTML = `

                <p class="select-message">

                    Please select a semester
                    to view subjects.

                </p>

            `;

            return;
        }


        const subjects =
            semesterSubjects[selectedSemester];


        subjects.forEach(function (subject) {

            const row =
                document.createElement("div");


            row.className =
                "subject-row";


            row.innerHTML = `

                <input
                    type="text"
                    class="subject-name"
                    value="${subject.name}"
                    readonly
                >


                <input
                    type="text"
                    class="subject-type"
                    value="${subject.type}"
                    readonly
                >


                <input
                    type="number"
                    class="credits"
                    placeholder="Credits"
                    min="1"
                    max="10"
                >


                <input
                    type="number"
                    class="mark"
                    placeholder="Enter Mark"
                    min="0"
                    max="100"
                >

            `;


            container.appendChild(row);

        });

    });

});


// ==========================================
// CALCULATE SGPA
// ==========================================

function calculateSGPA() {

    const credits =
        document.querySelectorAll(
            ".credits"
        );


    const marks =
        document.querySelectorAll(
            ".mark"
        );


    if (credits.length === 0) {

        alert(
            "Please select a semester first."
        );

        return;
    }


    let totalCredits = 0;

    let totalGradePoints = 0;


    for (
        let i = 0;
        i < credits.length;
        i++
    ) {

        const credit =
            parseFloat(
                credits[i].value
            );


        const mark =
            parseFloat(
                marks[i].value
            );


        if (isNaN(credit)) {

            alert(
                "Please enter credits for all subjects."
            );

            return;
        }


        if (isNaN(mark)) {

            alert(
                "Please enter marks for all subjects."
            );

            return;
        }


        if (mark < 0 || mark > 100) {

            alert(
                "Marks must be between 0 and 100."
            );

            return;
        }


        const gradePoint =
            getGradePoint(mark);


        totalCredits += credit;


        totalGradePoints +=
            credit * gradePoint;

    }


    const sgpa =
        totalGradePoints /
        totalCredits;


    document.getElementById(
        "totalCredits"
    ).textContent =
        totalCredits.toFixed(2);


    document.getElementById(
        "totalGradePoints"
    ).textContent =
        totalGradePoints.toFixed(2);


    document.getElementById(
        "sgpa"
    ).textContent =
        sgpa.toFixed(2);

}


// ==========================================
// ADD PREVIOUS SEMESTER
// ==========================================

function addSemester() {

    const container =
        document.getElementById(
            "semesterContainer"
        );


    const row =
        document.createElement("div");


    row.className =
        "semester-row";


    row.innerHTML = `

        <input
            type="number"
            class="previous-sgpa"
            placeholder="SGPA"
            min="0"
            max="10"
            step="0.01"
        >


        <input
            type="number"
            class="previous-credit"
            placeholder="Credits"
            min="1"
        >


        <button
            class="remove-btn"
            onclick="removeSemester(this)">

            Remove

        </button>

    `;


    container.appendChild(row);

}


// ==========================================
// REMOVE SEMESTER
// ==========================================

function removeSemester(button) {

    const rows =
        document.querySelectorAll(
            ".semester-row"
        );


    if (rows.length > 1) {

        button.parentElement.remove();

    }

    else {

        alert(
            "At least one semester is required."
        );

    }

}


// ==========================================
// CALCULATE CGPA
// ==========================================

function calculateCGPA() {

    const sgpas =
        document.querySelectorAll(
            ".previous-sgpa"
        );


    const credits =
        document.querySelectorAll(
            ".previous-credit"
        );


    let totalPoints = 0;

    let totalCredits = 0;


    for (
        let i = 0;
        i < sgpas.length;
        i++
    ) {

        const sgpa =
            parseFloat(
                sgpas[i].value
            );


        const credit =
            parseFloat(
                credits[i].value
            );


        if (
            isNaN(sgpa) ||
            isNaN(credit)
        ) {

            alert(
                "Please enter SGPA and credits for all semesters."
            );

            return;
        }


        if (sgpa < 0 || sgpa > 10) {

            alert(
                "SGPA must be between 0 and 10."
            );

            return;
        }


        totalPoints +=
            sgpa * credit;


        totalCredits +=
            credit;

    }


    const cgpa =
        totalPoints /
        totalCredits;


    document.getElementById(
        "cgpa"
    ).textContent =
        cgpa.toFixed(2);

}


// ==========================================
// RESET
// ==========================================

function resetCalculator() {

    document.getElementById(
        "studentName"
    ).value = "";


    document.getElementById(
        "registerNumber"
    ).value = "";


    document.getElementById(
        "semester"
    ).value = "";


    document.getElementById(
        "subjectContainer"
    ).innerHTML = `

        <p class="select-message">

            Please select a semester
            to view subjects.

        </p>

    `;


    document.getElementById(
        "totalCredits"
    ).textContent = "0";


    document.getElementById(
        "totalGradePoints"
    ).textContent = "0";


    document.getElementById(
        "sgpa"
    ).textContent = "0.00";


    document.getElementById(
        "cgpa"
    ).textContent = "0.00";


    document.getElementById(
        "semesterContainer"
    ).innerHTML = `

        <div class="semester-row">

            <input
                type="number"
                class="previous-sgpa"
                placeholder="SGPA"
                min="0"
                max="10"
                step="0.01"
            >


            <input
                type="number"
                class="previous-credit"
                placeholder="Credits"
                min="1"
            >


            <button
                class="remove-btn"
                onclick="removeSemester(this)">

                Remove

            </button>

        </div>

    `;

}