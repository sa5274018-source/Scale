const gradePoints = {'A+': 5.0, 'A': 4.75, 'B+': 4.5, 'B': 4.0, 'C+': 3.5, 'C': 3.0, 'D+': 2.5, 'D': 2.0, 'F': 1.0};

// دالة لتوليد عناصر واجهة عرض المواد بشكل تلقائي وديناميكي
function renderCourses(coursesArray) {
    const listDiv = document.getElementById('courses-list');
    coursesArray.forEach(c => {
        listDiv.innerHTML += `
            <div class="course-row">
                <span class="course-name">${c.name}</span>
                <select class="course-grade" data-hours="${c.hours}">
                    <option value="A+">A+ (امتياز مرتفع)</option>
                    <option value="A">A (امتياز)</option>
                    <option value="B+">B+ (جيد جداً مرتفع)</option>
                    <option value="B">B (جيد جداً)</option>
                    <option value="C+">C+ (جيد مرتفع)</option>
                    <option value="C">C (جيد)</option>
                    <option value="D+">D+ (مقبول مرتفع)</option>
                    <option value="D">D (مقبول)</option>
                    <option value="F">F (راسب)</option>
                </select>
            </div>`;
    });
}

// دالة حساب المعدل العام وتخصيص الرسائل بحسب التخصص والتقدير
function calculateGPA(type) {
    let currentPoints = 0, currentHours = 0;
    document.querySelectorAll('.course-grade').forEach(select => {
        let hours = parseFloat(select.getAttribute('data-hours'));
        let points = gradePoints[select.value];
        currentPoints += (points * hours);
        currentHours += hours;
    });

    let semGpa = currentPoints / currentHours;
    let prevGpa = parseFloat(document.getElementById('prev-gpa').value) || 0;
    let prevHours = parseFloat(document.getElementById('prev-hours').value) || 0;

    let totalHours = currentHours + prevHours;
    let totalPoints = currentPoints + (prevGpa * prevHours);
    let cumGpa = totalHours > 0 ? (totalPoints / totalHours) : 0;

    document.getElementById('sem-gpa').innerText = semGpa.toFixed(2);
    document.getElementById('cum-gpa').innerText = cumGpa.toFixed(2);

    let grade = "", msg = "";
    
    if (cumGpa >= 4.5) {
        grade = "امتياز";
        if (type === 'prog') msg = "🚀 مذهل! أنت من مبرمجي النخبة، استمر في هذا العطاء الرقمي الفريد!";
        else if (type === 'mech') msg = "🔧 ممتاز! عزم الدوران وقوة إنتاجيتك في أعلى مستوياتها! أنت مهندس المستقبل.";
        else msg = "💼 قيادة متميزة! كفاءتك الإدارية والتنظيمية تجعلك مديراً تنفيذياً ناجحاً من الآن.";
    } 
    else if (cumGpa >= 3.75) {
        grade = "جيد جداً";
        if (type === 'prog') msg = "💻 رائع جداً! مهاراتك البرمجية متميزة، خطوة واحدة وتصل للقمة!";
        else if (type === 'mech') msg = "⚡ أداء ميكانيكي قوي وقريب من المثالية، حافظ على طاقة المحرك الأكاديمي!";
        else msg = "📈 تنظيم رائع وأداء إداري مميز، واصل التطوير لتصل لأعلى المراتب القيادية.";
    } 
    else if (cumGpa >= 2.75) {
        grade = "جيد";
        if (type === 'prog') msg = "⚙️ عمل جيد، ولكننا نعلم أن كودك يمكن أن يكون أكثر كفاءة، شد حيلك!";
        else if (type === 'mech') msg = "⚙️ تحتاج الآلة الدراسية لبعض التشحيم والضبط لتوليد طاقة أكبر في الترم القادم.";
        else msg = "📁 العمل يسير بشكل مقبول، ولكن يحتاج مكتبك الدراسي لمزيد من الترتيب والجدية.";
    } 
    else if (cumGpa >= 2.0) {
        grade = "مقبول";
        if (type === 'prog') msg = "⚠️ تحتاج إلى عمل مراجعة لخطتك الدراسية وتكثيف جهودك في الترم القادم.";
        else if (type === 'mech') msg = "⚠️ هناك احتكاك شديد يقلل من كفاءتك، أصلح الخلل فوراً وضاعف الجهد.";
        else msg = "⚠️ هناك سوء إدارة للوقت والجهد، أعد هيكلة جدولك اليومي لتتحسن نتائجك.";
    } 
    else {
        grade = "ضعيف / راسب";
        if (type === 'prog') msg = "❌ هناك خلل في النظام! قم بإصلاحه بالدراسة الجادة والتركيز.";
        else if (type === 'mech') msg = "🚨 تعطل كامل في المنظومة! تحتاج لإعادة صيانة كاملة لخطتك الدراسية.";
        else msg = "❌ فشل في إدارة الملفات الدراسية. تحتاج لإنشاء خطة طوارئ إدارية فورية!";
    }

    document.getElementById('grade-txt').innerText = grade;
    document.getElementById('motivation-txt').innerText = msg;
    document.getElementById('result-box').style.display = 'block';
}
