import '../sass/globals.scss';
import { AppProps } from 'next/app';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faSun } from '@fortawesome/free-solid-svg-icons/faSun';
import { faMoon } from '@fortawesome/free-solid-svg-icons/faMoon';
import { faWindowMaximize } from '@fortawesome/free-solid-svg-icons/faWindowMaximize';
import '@fortawesome/fontawesome-svg-core/styles.css';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    library.add(
        faGithub,
        faLinkedin,
        faTwitter,
        faBars,
        faTimes,
        faMoon,
        faSun,
        faWindowMaximize
    );
    return <Component {...pageProps} />;
}

export default MyApp;
