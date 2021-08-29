import { useRef, useEffect } from 'react';
import Link from 'next/link';
import MainLogo from '../../public/main-logo.svg';

export default function LogoHome({
    generalSettings: { title, description },
    isHome,
    style,
    theme,
}: {
    generalSettings: WPAPI.GeneralSettingsProps;
    isHome: boolean;
    style: {
        [style: string]: string;
    };
    theme: string;
}): JSX.Element {
    const logoRef = useRef<(HTMLElement & SVGSVGElement) | null>();
    const svgWrapper = useRef<HTMLDivElement | null>();
    const spanLine = useRef<HTMLSpanElement>();
    const siteTagline = useRef<HTMLDivElement>();
    const customLogoWrapper = useRef<HTMLHeadingElement>();

    useEffect(() => {
        const pathLs = [];
        const logos = Object.keys(logoRef.current.children).map((key) => {
            return logoRef.current.children[key];
        });

        logos.forEach((logo) => {
            pathLs.push(logo.getTotalLength());
        });
        if (window.location.pathname === '/') {
            logos.forEach((logo, i) => {
                logo.style.strokeDasharray = `${pathLs[i]}px`;
                logo.style.strokeDashoffset = `${pathLs[i]}px`;
                logo.style.fill = `transparent`;
            });
        } else {
            if (theme === 'dark') {
                logos.forEach((logo) => {
                    logo.style.fill = '#A7F2EB';
                });
            } else {
                logos.forEach((logo) => {
                    logo.style.fill = '#1d2941';
                });
            }
        }
        logos.forEach((logo) => {
            if (theme === 'dark') {
                logo.style.stroke = `white`;
            } else {
                logo.style.stroke = '#090d0f';
            }
            logo.style.strokeWidth = `1px`;
        });

        function setStroke(percentage, index) {
            const stroke = pathLs[index] - (percentage / 100) * pathLs[index];
            return stroke;
        }

        if (
            (window.location.pathname === '/PortfolioSamVillegas/' &&
                window.location.search.length <= 0) ||
            window.location.pathname === '/'
        ) {
            logos.forEach((logo, i) => {
                setTimeout(() => {
                    logo.style.transition =
                        'stroke-dashoffset 1s cubic-bezier(.34,-1.61,.55,1.83) 0s, fill 2s ease-in-out 2s, stroke-dasharray 3s ease-out 1s, opacity 1s ease-out';
                    if (theme === 'dark') {
                        logo.style.fill = '#A7F2EB';
                    } else {
                        logo.style.fill = '#1d2941';
                    }
                    // logo.style.strokeDasharray = '0';
                    logo.style.strokeDashoffset = `${setStroke(100, i)}px`;
                }, 300 * i);
            });
            const delay = 3000;
            if (svgWrapper) {
                const ta = setTimeout(() => {
                    svgWrapper.current.style.transition =
                        'opacity .01s ease-out';
                    svgWrapper.current.style.opacity = '0';
                }, delay);
                const tb = setTimeout(() => {
                    svgWrapper.current.style.opacity = '1';
                }, delay + 200);
                const tc = setTimeout(() => {
                    svgWrapper.current.style.opacity = '0.5';
                }, delay + 400);
                const td = setTimeout(() => {
                    svgWrapper.current.style.opacity = '1';
                }, delay + 500);
                const te = setTimeout(() => {
                    svgWrapper.current.style.opacity = '0.5';
                    spanLine.current.style.opacity = '1';
                    siteTagline.current.style.opacity = '0.5';

                    if (theme === 'dark') {
                        siteTagline.current.style.textShadow =
                            '0px 0px 2px #a7f2eb, 0px 0px 4px rgba(242, 242, 242, 0.53)';
                    } else {
                        siteTagline.current.style.textShadow =
                            '0px 0px 2px #1d2941, 0px 0px 4px rgba(242, 242, 242, 0.53)';
                    }
                }, delay + 600);
                const tf = setTimeout(() => {
                    svgWrapper.current.style.opacity = '1';
                    spanLine.current.style.opacity = '0.5;';
                    siteTagline.current.style.opacity = '0';
                }, delay + 700);
                const tg = setTimeout(() => {
                    svgWrapper.current.style.opacity = '0';
                    spanLine.current.style.opacity = '1';
                    siteTagline.current.style.opacity = '0.9';
                }, delay + 900);
                const th = setTimeout(() => {
                    svgWrapper.current.style.display = 'none';
                    customLogoWrapper.current.style.opacity = '1';
                    siteTagline.current.style.opacity = '1';
                    siteTagline.current.style.textShadow = 'none';
                }, delay + 950);
                return () => {
                    clearTimeout(ta);
                    clearTimeout(tb);
                    clearTimeout(tc);
                    clearTimeout(td);
                    clearTimeout(te);
                    clearTimeout(tf);
                    clearTimeout(tg);
                    clearTimeout(th);
                };
            }
        } else {
            svgWrapper.current.style.display = 'none';
            customLogoWrapper.current.style.opacity = '1';
            siteTagline.current.style.opacity = '1';
            spanLine.current.style.opacity = '1';
        }
    }, [theme]);
    return (
        <div id="logo-svg-wrapper" className={style.logosWrapper}>
            <span className={style.overLine} ref={spanLine}></span>
            <div className={style.logoSvgWrapper} ref={svgWrapper}>
                <MainLogo ref={logoRef} />
            </div>
            <div className={style.logoWrapperCustom}>
                <h1 ref={customLogoWrapper}>
                    {!isHome ? (
                        <Link href="/">
                            <a>{title}</a>
                        </Link>
                    ) : (
                        `${title}`
                    )}
                </h1>
            </div>
            <div className={style.siteTagline} ref={siteTagline}>
                <p>{description}</p>
            </div>
        </div>
    );
}
