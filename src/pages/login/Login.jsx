import React, { useState } from 'react';
import { homeImg, show } from '../../assets';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const proceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch(`http://localhost:8080/user/${username}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('User not found');
          }
          return res.json();
        })
        .then((resp) => {
          if (resp.password === password) {
            toast.success('Ma`lumotlar to`g`ri :)😊');
            navigate('/');
          } else {
            toast.error('Parol xato kiritildi :(');
          }
        })
        .catch((err) => {
          toast.error(`UserName yoki Parol xato !!! ${err.message}`);
        });
    }
  };

  const validate = () => {
    if (!username.trim()) {
      toast.warning('Iltimos Login kiriting !!!');
      return false;
    }
    if (!password.trim()) {
      toast.warning('Iltimos Parol kiriting !!!');
      return false;
    }
    return true;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="container" onSubmit={proceedLogin}>
      <div className="flex items-center gap-12">
        <img
          src={homeImg}
          alt="homeImg"
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "cover", 
          }}
        />
        <div>
          <div
            className="flex items-center justify-between"
            style={{ flexDirection: "column" }}
          >
            <h1
              className="text-[48px] font-[700] mb-52"
              style={{ lineHeight: "48px", letterSpacing: "-1.056px" }}
            >
              Вход в систему
            </h1>
            <div>
              <h3
                className="text-[16px] font-[600] mb-[12px]"
                style={{ lineHeight: "24px", letterSpacing: "0.096px" }}
              >
                Логин
              </h3>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="flex h-[48px] w-[538px] items-center justify-between self-stretch bg-[#FFF] outline-none rounded-[6px] mb-[20px]"
                placeholder="Введите логин"
                style={{
                  padding: "16px 12px",
                  border: "1px solid #E5E9EB",
                }}
              />
            </div>
            <div style={{ position: "relative" }}>
              <h3
                className="text-[16px] font-[600] mb-[12px]"
                style={{ lineHeight: "24px", letterSpacing: "0.096px" }}
              >
                Пароль
              </h3>
              <div
                className="relative flex h-[48px] w-[538px] items-center justify-between self-stretch bg-[#FFF] outline-none rounded-[6px] mt-[20px]"
                style={{ padding: "16px 12px", border: "1px solid #E5E9EB" }}
              >
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  className="flex h-full w-full outline-none"
                  placeholder="Введите пароль"
                />
                <img
                  className="absolute cursor-pointer"
                  src={show}
                  alt=""
                  width={24}
                  height={24}
                  style={{
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                  onClick={togglePasswordVisibility}
                />
              </div>
            </div>
            <button className="text-white text-[20px] font-[500] bg-[#36AD49] w-[538px] h-[56px] rounded-[8px] mt-40">
              Войти
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
