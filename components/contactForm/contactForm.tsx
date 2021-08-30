import { useState, useRef } from 'react';
import style from './contactForm.module.scss';

export function ContactForm(): JSX.Element {
    const [name, setName] = useState<string>('');
    const nameRef = useRef(null);
    const [email, setEmail] = useState<string>('');
    const emailRef = useRef(null);
    const [message, setMessage] = useState<string>('');
    const messageRef = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();
        console.log(name);
        console.log(email);
        console.log(message);
        nameRef.current.value = '';
        emailRef.current.value = '';
        messageRef.current.value = '';
        nameRef.current.focus();
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
