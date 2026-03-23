const btn = document.getElementById("myBtn");

btn.addEventListener("click", function() {
    alert("לחצת על הכפתור!");
});

const form = document.querySelector("#submitBtn");

// משתנים גלובליים לשמירת ערכים תקינים
let username, email, age, phone, city, subject, message;

form.addEventListener("click", function(e) {
    e.preventDefault(); // מונע שליחת טופס

    username = document.getElementById("username").value.trim();
    email = document.querySelector("#email").value.trim();
    age = document.getElementById("age").value.trim();
    phone = document.getElementById("phone").value.trim();
    city = document.getElementById("city").value.trim();
    subject = document.getElementById("subject") ? document.getElementById("subject").value.trim() : ""; // אם יש
    message = document.getElementById("message") ? document.getElementById("message").value.trim() : ""; // אם יש

    if (username.length < 3) {
        alert("שם משתמש חייב להיות לפחות 3 תווים");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("כתובת אימייל לא חוקית");
        return;
    }

    if (age>120 || age<0) {
        alert("גיל לא חוקי");
        return;
    }

    if (phone.length < 10) {
        alert("מספר טלפון לא חוקי");
        return;
    }

    if (city.length < 3) {
        alert("יש להכניס עיר");
        return;
    }

    // אם יש נושא והודעה - בדוק אותם לפי הדרישה
    if (subject && subject.length < 5) {
        alert("נושא ההודעה חייב להכיל לפחות 5 תווים");
        return;
    }

    if(message.length > 0 && message.length < 10){
        alert("תוכן ההודעה חייב להכיל לפחות 10 תווים");
        return;
    }

    alert("הטופס תקין ונשלח בהצלחה!");
});

const getBtn = document.getElementById("getBtn");
const postBtn = document.getElementById("postBtn");

// ב-GET וב-POST משתמשים במשתנים הגלובליים שמולאו אחרי שליחת הטופס

getBtn.addEventListener("click", () => {
    if (!username) {
        alert("מלא ושלח את הטופס קודם");
        return;
    }
    fetch(
        "http://localhost:3000/get?username=" + username +
        "&email=" + email +
        "&age=" + age +
        "&phone=" + phone +
        "&city=" + city +
        "&subject=" +subject || "" +
        "&message=" + message || ""
    )
        .then(res => res.text())
        .then(data => alert(data))
        .catch(err => console.error(err));
});

postBtn.addEventListener("click", () => {
    if (!username) {
        alert("מלא ושלח את הטופס קודם");
        return;
    }
    fetch("http://localhost:3000/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username,
            email,
            age,
            phone,
            city,
            subject: subject || "",
            message: message || ""
        })
    })
        .then(res => res.text())
        .then(data => alert(data))
        .catch(err => console.error(err));
});