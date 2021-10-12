import './style.css';
import { initSwagger } from './swagger';
import { getIsAuthenticationFailure, getUser } from './auth';
import Auth from '@aws-amplify/auth';

getUser()
  .then((user) => {
    if (!user) {
      throw new Error('User not resolved');
    }

    const email = user.getSignInUserSession()?.getIdToken().payload.email;
    document.getElementById('username')!.innerText = email;

    document.getElementById('logout')!.addEventListener('click', () => {
      Auth.signOut();
    });
  })
  .catch(() => {
    // don't redirect to login page if there was authentication failure to prevent redirection loop
    if (!getIsAuthenticationFailure()) {
      Auth.federatedSignIn();
    }
  });

initSwagger();
