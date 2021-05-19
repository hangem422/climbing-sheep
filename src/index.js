import App from './App.js';

window.onload = () => {
  const app = new App();

  document.body.appendChild(app.element);
  app.animate();
};
