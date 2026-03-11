// Student session helpers — uses localStorage key "lms_student_session"
// Teacher uses "lms_teacher_session" — no collision possible
// NOTE: localStorage is used (not sessionStorage) so sessions survive
//       browser/tab close and page refreshes; logout clears it explicitly.

const STUDENT_SESSION_KEY = "lms_student_session";
const TEACHER_SESSION_KEY = "lms_teacher_session";

// ---- Student ----
export const getStudentSession = () => {
  try {
    return JSON.parse(localStorage.getItem(STUDENT_SESSION_KEY) || "null");
  } catch {
    return null;
  }
};

export const setStudentSession = (student) =>
  localStorage.setItem(STUDENT_SESSION_KEY, JSON.stringify(student));

export const clearStudentSession = () =>
  localStorage.removeItem(STUDENT_SESSION_KEY);

export const isStudentLoggedIn = () => !!getStudentSession();

// ---- Teacher ----
export const getTeacherSession = () => {
  try {
    return JSON.parse(localStorage.getItem(TEACHER_SESSION_KEY) || "null");
  } catch {
    return null;
  }
};

export const setTeacherSession = (teacher) =>
  localStorage.setItem(TEACHER_SESSION_KEY, JSON.stringify(teacher));

export const clearTeacherSession = () =>
  localStorage.removeItem(TEACHER_SESSION_KEY);

export const isTeacherLoggedIn = () => !!getTeacherSession();

// Teacher credentials (can be changed here)
export const TEACHER_CREDENTIALS = {
  username: "teacher",
  password: "nusatales2024",
};
