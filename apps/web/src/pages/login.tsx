import React, { useState } from 'react';

// Assume these components are imported from a shadcn/ui library
const Input = ({ ...props }) => <input {...props} />;
const Button = ({ ...props }) => <button {...props} />;
const Card = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
const CardHeader = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
const CardTitle = ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>;
const CardContent = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
const CardFooter = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
              <Input id="email" type="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="password">Password</label>
              <Input id="password" type="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
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