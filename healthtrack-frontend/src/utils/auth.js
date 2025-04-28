export const isTokenValid = (token) => {
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000; // Convert to milliseconds
      return Date.now() < expirationTime;
    } catch (error) {
      return false;
    }
  };
  
  export const getToken = () => {
    const token = localStorage.getItem('token');
    return isTokenValid(token) ? token : null;
  };