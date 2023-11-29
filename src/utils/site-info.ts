export type SocialLink = {
    platform: string
    href: string
    me?: string
    text: string
    icon: string
    footerOnly?: boolean
}

export type SiteInfo = {
    name: string
    title: string
    description: string
    image: {
        src: string
        alt: string
    }
    socialLinks: SocialLink[]
}

const siteInfo: SiteInfo = {
    name: "RGESN Tracker",
    title: "Suivi Éco-conception Numérique",
    description:
        "RGESN Tracker est un outil pour le suivi et l'affichage du statut du Référentiel Général d'Écoconception des Services Numériques (RGESN), favorisant une approche durable dans le domaine numérique.",
    image: {
        src: "/og/banner.png",
        alt: "Suivi Éco-conception Numérique",
    },
    socialLinks: [
        {
            platform: "github",
            href: "https://github.com/green-id-dev/rgesntracker",
            me: "https://github.com/green-id-dev",
            text: "Visitez le repo GitHub de RGESN Tracker",
            icon: "social/github",
        },
        // Incluez d'autres plateformes sociales si nécessaire
        /*{
            platform: "twitter",
            href: "https://twitter.com/[VotreCompteTwitter]",
            me: "https://twitter.com/[VotreCompteTwitter]",
            text: "Suivez RGESN Tracker sur Twitter",
            icon: "social/twitter",
        },*/
    ],
}

export default siteInfo
