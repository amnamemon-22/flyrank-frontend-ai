function LoginForm() {
    return (
      <div>
        <h2>Welcome Back</h2>
  
        <form>
          <input type="email" placeholder="Enter your email" />
          <br /><br />
  
          <input type="password" placeholder="Enter your password" />
          <br /><br />
  
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
  
  export default LoginForm;