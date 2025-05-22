export const nameRegex = /^[가-힣a-zA-Z]{2,20}$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;

export const validateForm = (form: {
  name: string;
  email: string;
  phone: string;
}) => {
  const newErrors = { name: "", email: "", phone: "" };

  if (!form.name.trim() || !nameRegex.test(form.name)) {
    newErrors.name = "이름을 올바르게 입력해주세요";
  }

  if (!form.email.trim() || !emailRegex.test(form.email)) {
    newErrors.email = "이메일을 올바르게 입력해주세요";
  }

  if (!form.phone.trim() || !phoneRegex.test(form.phone)) {
    newErrors.phone = "전화번호를 올바르게 입력해주세요";
  }

  return newErrors;
};
