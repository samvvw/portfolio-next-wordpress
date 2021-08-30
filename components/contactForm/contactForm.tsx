export function ContactForm(): JSX.Element {
    return (
        <div
            style={{
                height: '30vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '1.3rem',
                flexDirection: 'column',
            }}
        >
            <form>
                <div className="label-wrapper">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" />
                </div>
                <div className="label-wrapper">
                    <label htmlFor="email">Email: </label>
                    <input type="text" name="email" />
                </div>
                <div className="label-wrapper">
                    <label htmlFor="message">Message: </label>
                    <textarea name="message" cols={30} rows={10}></textarea>
                </div>
                <input type="submit" value="Send" />
            </form>
        </div>
    );
}
