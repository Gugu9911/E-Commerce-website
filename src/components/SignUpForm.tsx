import React, { useState } from 'react';
import { createUser } from '../redux/slices/userSlice'; 
import { useAppDispatch } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(''); // 新增头像字段
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); 
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 阻止表单默认提交行为
  
    const userData = { name, email, password, avatar }; 
  
    try {
      // 使用dispatch触发createUser action，并等待完成
      const actionResult = await dispatch(createUser(userData));
      // Check if the operation was successful
      if (createUser.fulfilled.match(actionResult)) {
        console.log('Registration successful', actionResult.payload);
        // If the operation was successful, you can handle it here
        setShowSuccessModal(true);
        // Close the modal and navigate to the home page after 3 seconds
        setTimeout(() => {
          setShowSuccessModal(false);
          navigate('/'); 
        }, 3000); // 3 seconds
      } else {
        // If the operation was not successful, you can handle it here
        throw new Error('Registration failed');
      }
    } catch (error) {
      // If the operation was not successful, you can handle it here
      console.error('Registration failed:', error);
    }
  };
  

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="avatar">Avatar:</label>
          <input
            type="text"
            id="avatar"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
      {showSuccessModal && <div>注册成功！即将返回主页...</div>}
    </div>
  );
};

export default SignupForm;