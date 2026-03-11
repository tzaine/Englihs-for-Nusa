// ============================================================
// LMS Storage — localStorage-based "database" for Nusa Tales
// Tables: users_students, student_submissions, quiz_scores
// ============================================================

const KEYS = {
  STUDENTS: "lms_users_students",
  SUBMISSIONS: "lms_student_submissions",
  QUIZ_SCORES: "lms_quiz_scores",
};

// ---------- helpers ----------
const read = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
};
const write = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

// ============================================================
// STUDENTS  (users_students)
// { id, name, phone, email, password, createdAt }
// ============================================================
export const getStudents = () => read(KEYS.STUDENTS);

export const registerStudent = ({ name, phone, email, password }) => {
  const students = getStudents();

  // Cek duplikat email
  if (students.find((s) => s.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, error: "Email sudah terdaftar. Silakan gunakan email lain atau login." };
  }

  // Cek duplikat nomor telepon (jika diisi)
  const trimmedPhone = phone?.trim() || "";
  if (
    trimmedPhone &&
    students.find((s) => s.phone && s.phone === trimmedPhone)
  ) {
    return { success: false, error: "Nomor telepon sudah terdaftar. Silakan gunakan nomor lain atau login." };
  }

  const student = {
    id: uid(),
    name: name.trim(),
    phone: trimmedPhone,
    email: email.trim().toLowerCase(),
    password,
    createdAt: new Date().toISOString(),
  };
  write(KEYS.STUDENTS, [...students, student]);
  return { success: true, student };
};

export const loginStudent = (email, password) => {
  const students = getStudents();
  const student = students.find(
    (s) =>
      s.email.toLowerCase() === email.toLowerCase() && s.password === password
  );
  if (!student) return { success: false, error: "Email atau password salah." };
  // Kembalikan data terbaru dari storage agar sesi selalu sinkron
  return { success: true, student };
};

export const getStudentById = (id) =>
  getStudents().find((s) => s.id === id) || null;

// ============================================================
// QUIZ SCORES  (quiz_scores)
// { id, user_student_id, folder, score, total, completedAt }
// ============================================================
export const getQuizScores = () => read(KEYS.QUIZ_SCORES);

export const saveQuizScore = ({ user_student_id, folder, score, total }) => {
  const scores = getQuizScores();
  // Replace existing score for same student+folder or append
  const existing = scores.findIndex(
    (s) => s.user_student_id === user_student_id && s.folder === folder
  );
  const entry = {
    id: existing >= 0 ? scores[existing].id : uid(),
    user_student_id,
    folder,
    score,
    total,
    completedAt: new Date().toISOString(),
  };
  if (existing >= 0) {
    scores[existing] = entry;
  } else {
    scores.push(entry);
  }
  write(KEYS.QUIZ_SCORES, scores);
  return entry;
};

export const getQuizScoresByStudent = (user_student_id) =>
  getQuizScores().filter((s) => s.user_student_id === user_student_id);

export const getQuizScoresByFolder = (folder) =>
  getQuizScores().filter((s) => s.folder === folder);

// ============================================================
// STUDENT SUBMISSIONS  (student_submissions)
// { id, user_student_id, title, content, score, feedback, submittedAt, gradedAt }
// ============================================================
export const getSubmissions = () => read(KEYS.SUBMISSIONS);

export const saveSubmission = ({ user_student_id, title, content }) => {
  const submissions = getSubmissions();
  const entry = {
    id: uid(),
    user_student_id,
    title: title.trim(),
    content: content.trim(),
    score: null,
    feedback: "",
    submittedAt: new Date().toISOString(),
    gradedAt: null,
  };
  write(KEYS.SUBMISSIONS, [...submissions, entry]);
  return entry;
};

export const getSubmissionsByStudent = (user_student_id) =>
  getSubmissions().filter((s) => s.user_student_id === user_student_id);

export const gradeSubmission = (submissionId, { score, feedback }) => {
  const submissions = getSubmissions();
  const idx = submissions.findIndex((s) => s.id === submissionId);
  if (idx < 0) return null;
  submissions[idx] = {
    ...submissions[idx],
    score: Number(score),
    feedback: feedback.trim(),
    gradedAt: new Date().toISOString(),
  };
  write(KEYS.SUBMISSIONS, submissions);
  return submissions[idx];
};

// ============================================================
// REPORT — combined data for teacher report page
// Returns array of { student, quizScores, writingScores, avg }
// ============================================================
export const getFullReport = () => {
  const students = getStudents();
  const quizScores = getQuizScores();
  const submissions = getSubmissions();

  return students.map((student) => {
    const myQuiz = quizScores.filter(
      (q) => q.user_student_id === student.id
    );
    const myWriting = submissions.filter(
      (s) => s.user_student_id === student.id && s.score !== null
    );

    const quizAvg =
      myQuiz.length > 0
        ? Math.round(
            myQuiz.reduce((acc, q) => acc + (q.score / q.total) * 100, 0) /
              myQuiz.length
          )
        : null;

    const writingAvg =
      myWriting.length > 0
        ? Math.round(
            myWriting.reduce((acc, s) => acc + s.score, 0) / myWriting.length
          )
        : null;

    const avgItems = [quizAvg, writingAvg].filter((v) => v !== null);
    const overallAvg =
      avgItems.length > 0
        ? Math.round(avgItems.reduce((a, b) => a + b, 0) / avgItems.length)
        : null;

    return { student, quizScores: myQuiz, writingScores: myWriting, quizAvg, writingAvg, overallAvg };
  });
};
