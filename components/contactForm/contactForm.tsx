import { useState, useRef, useEffect, FormEvent } from 'react';
import style from './contactForm.module.scss';

declare global {
    interface Window {
        grecaptcha: ReCaptchaInstance;
        captchaOnLoad: () => void;
    }
}

interface ReCaptchaInstance {
    ready: (cb: () => void) => void;
    execute: (
        arg1: string,
        options: ReCaptchaExecuteOptions
    ) => Promise<string>;
    render: (id: string, options: ReCaptchaRenderOptions) => void;
}

interface ReCaptchaExecuteOptions {
    action: string;
}

interface ReCaptchaRenderOptions {
    sitekey: string;
    size: 'invisible';
}

export function ContactForm(): JSX.Element {
    const [name, setName] = useState<string>('');
    const nameRef = useRef<HTMLInputElement>(null);
    const [email, setEmail] = useState<string>('');
    const emailRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState<string>('');
    const messageRef = useRef<HTMLTextAreaElement>(null);

    // const handleLoaded = (_) => {
    //     window.grecaptcha.ready((_) => {
    //         window.grecaptcha
    //             .execute(process.env.NEXT_PUBLIC_RECAPTCHA, {
    //                 action: 'homepage',
    //             })
    //             .then(() => {
    //                 fetchHandler();
    //             });
    //     });
    // };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA}`;
        script.id = `reCaptcha`;
        script.defer = true;
        document.body.appendChild(script);
        const time = setTimeout(() => {
            const badge =
                document.getElementsByClassName('grecaptcha-badge')[0]
                    .parentElement;

            if (badge !== null) {
                badge.style.transition = 'opacity .5s ease-out';

                badge.style.opacity = '0';
            }
        }, 2500);

        return () => {
            clearTimeout(time);
        };
    }, []);
    function fetchHandler() {
        fetch('/api/contact', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
                name: name,
                email: email,
                message: message,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => console.log(err));
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        console.log(name);
        console.log(email);
        console.log(message);
        window.grecaptcha.ready(function () {
            window.grecaptcha
                .execute(process.env.NEXT_PUBLIC_RECAPTCHA as string, {
                    action: 'submit',
                })
                .then(function () {
                    // Add your logic to submit to your backend server here.
                    fetchHandler();
                });
        });

        if (nameRef.current && emailRef.current && messageRef.current) {
            nameRef.current.value = '';
            emailRef.current.value = '';
            messageRef.current.value = '';
            nameRef.current.focus();
        }
        setName('');
        setEmail('');
        setMessage('');
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <div className={style.formWrapper}>
                <form onSubmit={handleSubmit}>
                    <div className="label-wrapper">
                        <label htmlFor="name">Name: </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            ref={nameRef}
                            required
                        />
                    </div>
                    <div className="label-wrapper">
                        <label htmlFor="email">Email: </label>
                        <input
                            id="email"
                            type="text"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            ref={emailRef}
                            required
                        />
                    </div>
                    <div className="label-wrapper">
                        <label htmlFor="message">Message: </label>
                        <textarea
                            id="message"
                            name="message"
                            cols={30}
                            rows={10}
                            onChange={(e) => setMessage(e.target.value)}
                            ref={messageRef}
                            required
                        />
                    </div>
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
}
