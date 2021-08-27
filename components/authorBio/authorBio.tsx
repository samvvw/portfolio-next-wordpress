import Image from 'next/image';
import parse from 'html-react-parser';
import style from './author.module.scss';

export function AuthorBio({
    authorBios: {
        bio,
        authorsName,
        authorTagline,
        authorPic: { sourceUrl },
    },
    title,
    excerpt,
}: WPAPI.AuthorBioProps): JSX.Element {
    return (
        <section className={style.authorBio}>
            <div className={style.authorProfile}>
                <div className={style.taglineWrapper}>
                    <h3>{authorsName}</h3>
                    <h4>{authorTagline}</h4>
                    {parse(excerpt)}
                </div>
                <div className={style.entryThumbnail}>
                    <Image
                        src={sourceUrl}
                        width={250}
                        height={250}
                        objectFit={'cover'}
                        objectPosition={'top right'}
                        alt={authorsName}
                    />
                </div>
            </div>
            <div className={style.authorBio}>
                <h2>{title}</h2>
                <p>{bio}</p>
            </div>
        </section>
    );
}
