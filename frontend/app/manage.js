function onLoadMain() {
    // The user will have a field "myCourses" and retreive all the course by this field.
    // Each course will have a field "My exercises"...
    doPostJSON("", "get_courses_manager/" + userUid, "json", onFinishRetreiveData)
}

function onFinishRetreiveData(data) {
    // TODO: make the first active at the beginning.
    if (data.courses) {
        const entries = Object.entries(data.courses)
        for (course of entries) {
            // course[0] = courseId
            // course[1] = course (the value)
            createAccordionManage(course, ["exercises", "exercises"]); // Example.
        }
    }
    $('#main').show();

}

$("#newCourse").click(function () {
    var info = newCourse();
    info.then((json) => {
        doPostJSON(json, "create_course", "text", onCreateEditCourseSuccess)
        $("#main").hide()
    })
})

function onCreateEditCourseSuccess() {
    document.location.reload();
}

async function newCourse() {
    const {
        value: formValues
    } = await Swal.fire({
        title: 'New course',
        html: '<label for="course_name"><div class="explanation" data-toggle="tooltip" title="Required field">Course name *</div></label>' +
            '<input id="course_name" class="swal2-input" placeholder="C++...">' +
            '<label for="grader"><div class="explanation" data-toggle="tooltip" title="The grader must be admin. \nGives an access to the manage course.">Grader id \n </div></label>' +
            '<input id="grader" class="swal2-input" placeholder="000000000">' +
            '<label for="privacy"><div class="explanation" data-toggle="tooltip" title="The course is shared only with the students you want.">Privacy</div></label>' +
            '<div id=privacy>' +
            '<input type="radio" name="privacy" value="public" onclick=\'$(\"#pass\").hide()\' checked> Public<br>' +
            '<input type="radio" name="privacy" value="private" onclick=\'$(\"#pass\").show()\'> Private<br><br>' +
            '</div>' +
            '<div id="pass" style=display:none;>' +
            '<label for="ids"><div class="explanation" data-toggle="tooltip" title="Please respect the format \nRequired field.">Students ids *</div></label>' +
            '<input id="ids" class="swal2-input" placeholder="000000000 000000000">' +
            '</div>',
        focusConfirm: false,
        preConfirm: () => {
            const course_name = escapeHtml($("#course_name").val())
            const grader = escapeHtml($("#grader").val())
            const privacy = $("input[name='privacy']:checked").val()
            const ids = escapeHtml($("#ids").val())
            if (!(course_name == "" || (ids == "" && privacy == "private"))) {
                return JSON.stringify({
                    owner_uid: userUid,
                    course_name: course_name,
                    grader_uid: grader,
                    privacy: privacy,
                    uids: ids
                })
            } else {
                Swal.showValidationMessage(
                    `Please fill all the required fields.`
                )
            }
        }
    })
    if (formValues) {
        return formValues
    }
}

$('input[type=radio][name=privacy]').change(function () {
    var x = document.getElementById("pass");
    if (this.value == 'public') {
        alert("hi")
        public = true;
        x.style.display = "none";
    } else if (this.value == 'private') {
        public = false;
        x.style.display = "block";
    }
});

function editCourse(courseId) {
    const courseName = escapeHtml($("#course_name" + courseId).val())
    if (checkEmptyFields([courseName])) {
        let json = JSON.stringify({
            owner_uid: userUid,
            course_name: escapeHtml($("#course_name" + courseId).val()),
            grader_uid: escapeHtml($("#course_grader" + courseId).val()),
            privacy: ($("#pass" + courseId).is(":visible") ? "private" : "public"),
            uids: escapeHtml($("#course_ids" + courseId).val())
        })
        doPostJSON(json, "edit_course/" + courseId, "text", onCreateEditCourseSuccess)
    }
}

function newExercise(courseId) {
    Swal.fire({
        title: 'Create exercise',
        text: 'Which type of exercise do you want to create?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Normal exercise",
        cancelButtonText: "Peer exercise",
    }).then(result => {
        if (result.value) {
            newNormalExercise(courseId)
        } else {
            alert("peer")
        }
    })
}

async function newNormalExercise(courseId) {
    console.log(courseId)
    // TODO: FINISH HERE.
    const {
        value: formValues
    } = await Swal.fire({
        title: 'New exercise',
        html: '<label for="exercise_name"><div class="explanation" data-toggle="tooltip" title="Required field">Exercise name *</div></label>' +
            '<input id="exercise_name" class="swal2-input" placeholder="First assignment...">' +
            '<label for="grader"><div class="explanation" data-toggle="tooltip" title="The grader must be admin. \nGives an access to the manage course.">Grader id \n </div></label>' +
            '<input id="grader" class="swal2-input" placeholder="000000000">' +
            '<label for="privacy"><div class="explanation" data-toggle="tooltip" title="The course is shared only with the students you want.">Privacy</div></label>' +
            '<div id=privacy>' +
            '<input type="radio" name="privacy" value="public" onclick=\'$(\"#pass\").hide()\' checked> Public<br>' +
            '<input type="radio" name="privacy" value="private" onclick=\'$(\"#pass\").show()\'> Private<br><br>' +
            '</div>' +
            '<div id="pass" style=display:none;>' +
            '<label for="ids"><div class="explanation" data-toggle="tooltip" title="Please respect the format \nRequired field.">Students ids *</div></label>' +
            '<input id="ids" class="swal2-input" placeholder="000000000 000000000">' +
            '</div>',
        focusConfirm: false,
        preConfirm: () => {
            const course_name = escapeHtml($("#course_name").val())
            const grader = escapeHtml($("#grader").val())
            const privacy = $("input[name='privacy']:checked").val()
            const ids = escapeHtml($("#ids").val())
            if (!(course_name == "" || (ids == "" && privacy == "private"))) {
                return JSON.stringify({
                    owner_uid: userUid,
                    course_name: course_name,
                    grader_uid: grader,
                    privacy: privacy,
                    uids: ids
                })
            } else {
                Swal.showValidationMessage(
                    `Please fill all the required fields.`
                )
            }
        }
    })
    if (formValues) {
        return formValues
    }
}
