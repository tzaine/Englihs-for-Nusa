import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TeacherLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login", { replace: true });
  }, [navigate]);

  return null;
};

export default TeacherLogin;
