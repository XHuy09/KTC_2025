import React, { useState } from 'react';
import styles from './RegistrationForm.module.css';

export default function RegistrationForm() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    gender: '',
    dob: '',
    country: '',
    hobbies: [] as string[],
    avatar: null as File | null,
    bio: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
    const { name, value, type } = target;

    if (type === 'checkbox') {
      const checked = (target as HTMLInputElement).checked;
      setForm(prev => {
        const hobbies = new Set(prev.hobbies);
        if (checked) {
          hobbies.add(value);
        } else {
          hobbies.delete(value);
        }
        return { ...prev, hobbies: Array.from(hobbies) };
      });
    } else if (type === 'file') {
      const files = (target as HTMLInputElement).files;
      setForm(prev => ({ ...prev, avatar: files && files[0] ? files[0] : null }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    const phoneRegex = /^\d{10,}$/;
    const imageRegex = /\.(jpg|jpeg|png)$/i;

    if (form.fullName.trim().length < 3) newErrors.fullName = 'Họ tên ít nhất 3 ký tự';
    if (!emailRegex.test(form.email)) newErrors.email = 'Email không hợp lệ';
    if (!passwordRegex.test(form.password)) newErrors.password = 'Mật khẩu ≥8 ký tự, gồm chữ & số';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Mật khẩu không khớp';
    if (!phoneRegex.test(form.phone)) newErrors.phone = 'Số điện thoại không hợp lệ';
    if (!form.gender) newErrors.gender = 'Vui lòng chọn giới tính';

    const dobDate = new Date(form.dob);
    const age = (Date.now() - dobDate.getTime()) / 3.15576e10;
    if (!form.dob) newErrors.dob = 'Vui lòng chọn ngày sinh';
    else if (age < 18) newErrors.dob = 'Phải đủ 18 tuổi';

    if (!form.country) newErrors.country = 'Vui lòng chọn quốc gia';
    if (form.hobbies.length === 0) newErrors.hobbies = 'Chọn ít nhất một sở thích';
    if (form.avatar && !imageRegex.test(form.avatar.name)) newErrors.avatar = 'Chỉ chấp nhận ảnh jpg, jpeg, png';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(validate());
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Biểu mẫu đăng ký</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <FormField label="Họ và tên *" name="fullName" value={form.fullName} onChange={handleChange} error={errors.fullName} />
        <FormField label="Email *" name="email" value={form.email} onChange={handleChange} error={errors.email} type="email" />
        <FormField label="Mật khẩu *" name="password" value={form.password} onChange={handleChange} error={errors.password} type="password" />
        <FormField label="Xác nhận mật khẩu *" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword} type="password" />
        <FormField label="Số điện thoại *" name="phone" value={form.phone} onChange={handleChange} error={errors.phone} type="tel" />

        <div className={styles.formGroup}>
          <label>Giới tính *</label>
          <div className={styles.radioGroup}>
            {['Nam', 'Nữ', 'Khác'].map(g => (
              <label key={g}><input type="radio" name="gender" value={g} checked={form.gender === g} onChange={handleChange} /> {g} </label>
            ))}
          </div>
          {errors.gender && <p className={styles.error}>{errors.gender}</p>}
        </div>

        <FormField label="Ngày sinh *" name="dob" value={form.dob} onChange={handleChange} error={errors.dob} type="date" />

        <div className={styles.formGroup}>
          <label>Quốc gia *</label>
          <select name="country" value={form.country} onChange={handleChange} className={styles.input}>
            <option value="">-- Chọn quốc gia --</option>
            <option value="vn">Việt Nam</option>
            <option value="us">Mỹ</option>
            <option value="jp">Nhật</option>
          </select>
          {errors.country && <p className={styles.error}>{errors.country}</p>}
        </div>

        <div className={styles.formGroup}>
          <label>Sở thích *</label>
          <div className={styles.checkboxGroup}>
            {['Đọc sách', 'Du lịch', 'Nghe nhạc'].map(h => (
              <label key={h}><input type="checkbox" name="hobbies" value={h} checked={form.hobbies.includes(h)} onChange={handleChange} /> {h}</label>
            ))}
          </div>
          {errors.hobbies && <p className={styles.error}>{errors.hobbies}</p>}
        </div>

        <div className={styles.formGroup}>
          <label>Ảnh đại diện (tùy chọn)</label>
          <input type="file" name="avatar" accept=".jpg,.jpeg,.png" onChange={handleChange} />
          {errors.avatar && <p className={styles.error}>{errors.avatar}</p>}
        </div>

        <div className={styles.formGroup}>
          <label>Tiểu sử (tối đa 300 ký tự)</label>
          <textarea name="bio" rows={3} maxLength={300} value={form.bio} onChange={handleChange}></textarea>
          <p className={styles.info}>{form.bio.length} / 300</p>
        </div>

        <button type="submit" className={styles.submitBtn}>Đăng ký</button>
        {success && <p className={styles.success}>Đăng ký thành công!</p>}
      </form>
    </div>
  );
}

type FormFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  error?: string;
  type?: string;
};

function FormField({ label, name, value, onChange, error, type = 'text' }: FormFieldProps) {
  return (
    <div className={styles.formGroup}>
      <label>{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} className={styles.input} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}