import React from 'react';
import { useParams, useMatch, } from "react-router-dom";
import { UserLayout } from '../../layouts/userLayout';
import { SignInForm } from './SignInForm';

export const SignInPage: React.FC = () => {

  const params = useParams()
  console.log(params)
  const match = useMatch("/signIn")
  console.log(match)

  return (
    <UserLayout>
      <SignInForm />
    </UserLayout>
  );
}
