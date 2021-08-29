import style from './skills.module.scss';
import Link from 'next/link';
import ArrowSkill from '../../public/arrow-skill.svg';

export function Skills({ allSkills }: WPAPI.SkillsProps): JSX.Element {
    return (
        <section className={style.skillSectionWrapper}>
            <h2>Technologies</h2>
            <div className="menu-container">
                <ul className="skills-menu">
                    {allSkills.map(({ node: { path, label } }) => {
                        return (
                            <li key={path}>
                                <div className="arrowWrapper">
                                    <ArrowSkill />
                                </div>
                                <Link href={`${path}`}>
                                    <a>{label}</a>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
