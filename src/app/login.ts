'use client';

import { useAuth } from '../components/auth-provider';

const adminBtn = document.getElementById('admin-login-btn') as HTMLButtonElement;
const popup = document.getElementById('admin-popup') as HTMLDivElement;
const closePopup = document.getElementById('close-popup') as HTMLSpanElement;
const loginBtn = document.getElementById('login-submit') as HTMLButtonElement;
const usernameInput = document.getElementById('username') as HTMLInputElement;
const passwordInput = document.getElementById('password') as HTMLInputElement;
const errorText = document.getElementById('login-error') as HTMLParagraphElement;

const { login } = useAuth();

adminBtn.addEventListener('click', () => {
  popup.classList.remove('hidden');
});

closePopup.addEventListener('click', () => {
  popup.classList.add('hidden');
  errorText.classList.add('hidden');
  usernameInput.value = '';
  passwordInput.value = '';
});

loginBtn.addEventListener('click', async () => {
  const username = usernameInput.value;
  const password = passwordInput.value;

  const success = await login(username, password);

  if (success) {
    alert('Welcome, admin!');
    popup.classList.add('hidden');
    usernameInput.value = '';
    passwordInput.value = '';
    errorText.classList.add('hidden');
    // Здесь можно включить админ-функции, например показать скрытые элементы
  } else {
    errorText.classList.remove('hidden');
  }
});
