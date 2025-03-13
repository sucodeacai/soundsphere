"use strict";
class SimplePage {
    constructor(containerElement, titulo, soundSphereInfo, dao, sequenciador) {
        this.addFavIcon();
        this.containerElement = containerElement;
        this.titulo = titulo ? titulo : "";
        this.dao = dao;
        this.sequenciador = sequenciador;
        this.soundSphereInfo = soundSphereInfo;
    }
    addFavIcon() {
        const headElements = [
            {
                tag: "link",
                attributes: {
                    rel: "icon",
                    type: "image/png",
                    href: "/img/favicon/favicon-96x96.png",
                    sizes: "96x96",
                },
            },
            {
                tag: "link",
                attributes: {
                    rel: "icon",
                    type: "image/svg+xml",
                    href: "img/favicon/favicon.svg",
                },
            },
            {
                tag: "link",
                attributes: { rel: "shortcut icon", href: "/favicon.ico" },
            },
            {
                tag: "link",
                attributes: {
                    rel: "apple-touch-icon",
                    sizes: "180x180",
                    href: "img/favicon/apple-touch-icon.png",
                },
            },
            {
                tag: "meta",
                attributes: {
                    name: "apple-mobile-web-app-title",
                    content: "SoundSphere",
                },
            },
            {
                tag: "link",
                attributes: { rel: "manifest", href: "img/favicon/site.webmanifest" },
            },
        ];
        headElements.forEach((elementData) => {
            const element = document.createElement(elementData.tag);
            Object.entries(elementData.attributes).forEach(([key, value]) => {
                element.setAttribute(key, value);
            });
            document.head.appendChild(element);
        });
    }
}
