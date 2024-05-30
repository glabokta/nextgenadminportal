import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import URLSearchParams from '@ungap/url-search-params';
const InvitationHandler = () => {
  const { loginWithRedirect } = useAuth0();
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const invitation = params.get('invitation');
    const organization = params.get('organization');
    const organizationName = params.get('organization_name'); 
    if (invitation && organization) {
      console.log('Invitation and Organization found, redirecting...');
        loginWithRedirect({
            authorizationParams: {
                invitation: invitation,
                organization: organization,
                organizationName: organizationName,
                redirectUri: `${window.location.origin}/profile`,
            }
        });
    } else {
      console.log('Invitation or Organization missing, redirecting to error...');
      history.push('/error');
    }
  }, [loginWithRedirect, location, history]);
  return <div>Redirecting...</div>;
};
export default InvitationHandler;