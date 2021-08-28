export function setThemeColors(currentTheme: string): void {
    if (currentTheme === 'dark') {
        document.documentElement.style.setProperty('--body-bg', '#090d0f');
        document.documentElement.style.setProperty(
            '--color_backdrop_bg',
            '#090d0fe8'
        );
        document.documentElement.style.setProperty(
            '--color_header_text',
            '#a7f2eb'
        );
        document.documentElement.style.setProperty(
            '--color_header_light_text',
            '#f5f5f5'
        );
        document.documentElement.style.setProperty(
            '--over_line_color',
            '#f2f2f2'
        );
        document.documentElement.style.setProperty(
            '--color_body_text',
            '#f2f2f2'
        );
        document.documentElement.style.setProperty(
            '--color_body_text_dark',
            '#e5e5e5'
        );
        document.documentElement.style.setProperty(
            '--color_card_bg',
            '#2a3640'
        );
        document.documentElement.style.setProperty(
            '--color_body_accent',
            '#9fd8f1'
        );
        document.documentElement.style.setProperty(
            '--color_bio_card_bg',
            '#2a3640'
        );
        document.documentElement.style.setProperty('--color_tag_bg', '#9fd8f1');
        document.documentElement.style.setProperty('--color_tag', '#1d2941');
    } else {
        document.documentElement.style.setProperty('--body-bg', '#f2f2f2');
        document.documentElement.style.setProperty(
            '--color_backdrop_bg',
            '#f2f2f2e7'
        );
        document.documentElement.style.setProperty(
            '--color_header_text',
            '#1d2941'
        );
        document.documentElement.style.setProperty(
            '--color_header_light_text',
            '#1d2941'
        );
        document.documentElement.style.setProperty(
            '--over_line_color',
            '#9fd8f1'
        );
        document.documentElement.style.setProperty(
            '--color_body_text',
            '#31343c'
        );
        document.documentElement.style.setProperty(
            '--color_body_text_dark',
            '#31343c'
        );
        document.documentElement.style.setProperty(
            '--color_card_bg',
            '#ebebeb'
        );
        document.documentElement.style.setProperty(
            '--color_body_accent',
            '#2a4957'
        );
        document.documentElement.style.setProperty(
            '--color_bio_card_bg',
            '#ebebeb'
        );
        document.documentElement.style.setProperty('--color_tag_bg', '#263e70');
        document.documentElement.style.setProperty('--color_tag', '#f2f2f2');
    }
}
