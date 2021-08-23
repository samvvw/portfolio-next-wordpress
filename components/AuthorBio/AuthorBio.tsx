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

export default function AuthorBio({
    authorBios: {
        authorsName,
        authorTagLine,
        authorPic: { sourceUrl },
    },
    excerpt,
}: AuthorBioProps): JSX.Element {
    return (
        <section>
            <h2>{authorsName}</h2>
            <h3>{authorTagLine}</h3>
            <div dangerouslySetInnerHTML={{ __html: excerpt }} />
            <Image
                src={sourceUrl}
                width={250}
                height={250}
                objectFit={'cover'}
                objectPosition={'top right'}
            />
        </section>
    );
}
