import Image from 'next/image';

export interface AuthorBioProps {
    authorBios: {
        authorsName: string;
        authorTagLine: string;
        authorPic: {
            sourceUrl: string;
        };
    };
    excerpt: string;
}

export default function ({ authorBios, excerpt }): JSX.Element {
    return (
        <section>
            <h2>{authorBios.authorsName}</h2>
            <h3>{authorBios.authorTagLine}</h3>
            <div dangerouslySetInnerHTML={{ __html: excerpt }} />
            <Image
                src={authorBios.authorPic.sourceUrl}
                width={250}
                height={250}
                objectFit={'cover'}
                objectPosition={'top right'}
            />
        </section>
    );
}
