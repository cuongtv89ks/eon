import React, { useState } from 'react';

// Assume these components are imported from a shadcn/ui library
const Input = ({ ...props }) => <input {...props} />;
const Button = ({ ...props }) => <button {...props} />;
const Card = ({ children }) => <div>{children}</div>;
const CardHeader = ({ children }) => <div>{children}</div>;
const CardTitle = ({ children }) => <h2>{children}</h2>;
const CardContent = ({ children }) => <div>{children}</div>;
const CardFooter = ({ children }) => <div>{children}</div>;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call the auth service API
    console.log('Logging in with:', { email, password });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="email">Email</label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="password">Password</label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type="submit">Login</Button>
          </form>
        </CardContent>
        <CardFooter>
          <a href="#">Forgot Password?</a>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
