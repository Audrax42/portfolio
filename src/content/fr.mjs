// Contenu français du portfolio. Modifie les textes ici puis lance `node build.mjs`.
// Dans les paragraphes, ==texte== devient un surlignage doré (une seule fois par page).

export default {
  lang: 'fr',
  locale: 'fr_FR',
  dir: '',
  switchLabel: 'English',
  switchShort: 'EN',
  switchHref: 'en/',

  meta: {
    title: 'Axel Denis, élève-ingénieur en cybersécurité',
    description:
      'Élève-ingénieur en cybersécurité à l’EiJV (Amiens). Je recherche une alternance de deux ans en SOC, sécurité réseau ou des infrastructures dès septembre 2027.',
  },

  nav: {
    path: 'Parcours',
    work: 'Projets',
    lab: 'Homelab',
    skills: 'Compétences',
    contact: 'Contact',
    cv: 'Mon CV',
    menu: 'Menu',
    skip: 'Aller au contenu',
  },

  hero: {
    name: 'Axel Denis',
    lead: 'Je construis des systèmes pour comprendre comment les défendre.',
    intro:
      'Élève-ingénieur en cybersécurité à l’École d’Ingénieurs Jules Verne d’Amiens, je cherche une alternance de deux ans en SOC à partir de septembre 2027.',
    facts: [
      ['Alternance', 'septembre 2027, deux ans'],
      ['Rythme', 'une semaine école, une semaine entreprise'],
      ['Mobilité', 'Hauts-de-France et Île-de-France'],
    ],
    cta: 'Télécharger mon CV',
    secondary: 'M’écrire',
  },

  stage: {
    gargouille: 'Gargouille de la cathédrale d’Amiens, la nuit',
    portail: 'Portail de la cathédrale d’Amiens, la nuit',
    tour: 'La tour de la maison de Jules Verne, Amiens',
    citadelle: 'Plan de la citadelle de Doullens, 1660 : une défense en couches',
    veille: 'Saint-Quentin la nuit, vue depuis la galerie de la basilique',
    facade: 'La façade de la cathédrale d’Amiens, la nuit',
    alicante: 'Alicante, vue depuis la garita du château Santa Bárbara',
  },

  about: {
    title: 'Défendre dans l’ombre',
    paragraphs: [
      'La technologie fait partie de notre quotidien. On y range nos photos, nos échanges, notre travail, parfois notre santé. Plus je l’ai utilisée, plus une question m’a intéressé : qui veille à ce que tout cela reste sûr ?',
      'La cybersécurité défensive se fait souvent dans l’ombre. Quand elle est bien faite, personne ne la remarque, et c’est précisément ce qui me plaît : ==protéger des personnes qui n’ont pas à se soucier de ce qui se passe derrière l’écran==.',
      'Je vise d’abord un poste d’analyste SOC. Je pense qu’on ne conçoit bien une infrastructure sécurisée qu’après avoir appris à la surveiller et à la défendre. À terme, j’aimerais évoluer vers l’architecture de sécurité et le cloud.',
      'On me décrit comme rigoureux, autonome et curieux. J’aime analyser, comprendre avant d’agir, et travailler en équipe. Je parle français, anglais (C1) et espagnol (B1+).',
    ],
    sign: 'Axel Denis',
    role: 'Élève-ingénieur, cycle Cybersécurité, EiJV',
  },

  path: {
    title: 'Mon parcours',
    chapters: [
      {
        scene: 'tour',
        title: 'Comprendre les enjeux',
        text:
          'J’ai commencé par l’économie. Ce détour m’a appris comment fonctionnent les entreprises, ce qu’elles ont à perdre et pourquoi elles sont des cibles. Comprendre ce que cherche un attaquant, c’est déjà commencer à se défendre.',
        rows: [['Licence d’économie, Université de Picardie Jules Verne', '2023–2024']],
      },
      {
        scene: 'veille',
        title: 'Passer au concret',
        text:
          'Le besoin de toucher à la technique a pris le dessus. En BTS, j’ai découvert les réseaux (DNS, VLAN, routage), Linux, la programmation et l’électronique, en théorie comme en pratique. C’est là que j’ai réalisé Aquatrack.',
        rows: [
          ['BTS CIEL, Espace scolaire Condorcet, Saint-Quentin', '2024–2026'],
          ['Opérateur polyvalent, Verbau France, production industrielle', 'été 2024'],
        ],
      },
      {
        scene: 'alicante',
        title: 'Construire en équipe',
        text:
          'Trois mois dans une agence web espagnole, au sein d’une équipe de développement. J’ai participé à la refonte complète du site de RELSA et contribué au backend, au rythme de réunions quotidiennes et de rapports hebdomadaires, en langue étrangère. Pour un besoin interne, j’ai aussi développé seul une application de compression d’images.',
        rows: [['Développeur full stack (stage), Nitsnets, Alicante', 'mai–juillet 2025']],
      },
      {
        scene: 'citadelle',
        title: 'Apprendre à défendre',
        text:
          'J’ai choisi de me spécialiser. En parallèle de l’école, je m’entraîne sur TryHackMe (simulateur SOC, certification SAL1 en préparation) et HackTheBox. Je découvre les SIEM, les EDR, l’analyse de journaux, MITRE ATT&CK, ISO 27001 et NIS2, et je construis mon homelab.',
        rows: [
          ['Cycle ingénieur Cybersécurité, École d’Ingénieurs Jules Verne, Amiens', '2026–2029'],
          ['Formation labellisée SecNumEdu par l’ANSSI', 'depuis 2026'],
        ],
      },
      {
        scene: 'gargouille',
        title: 'La suite',
        text:
          'Ce que je cherche maintenant : mettre tout cela en pratique dans une équipe, sur de vraies infrastructures, au service de vrais utilisateurs.',
        rows: [['Alternance SOC, Blue Team, sécurité réseau ou des infrastructures', 'sept. 2027']],
      },
    ],
  },

  work: {
    title: 'Projets',
    linkLabel: 'Voir',
    projects: [
      {
        id: 'homelab',
        title: 'Homelab',
        discipline: 'Infrastructure personnelle, en cours',
        link: { label: 'La documentation sur GitHub', href: 'https://github.com/Audrax42/homelab' },
        media: { kind: 'photo', src: 'assets/cisco-2960.jpg', w: 1600, h: 1200, alt: 'Carte électronique d’un switch Cisco Catalyst 2960, puces Broadcom en gros plan', caption: 'L’intérieur d’un Cisco Catalyst 2960, le switch qui porte mes VLAN.' },
        blocks: [
          ['Pourquoi', 'Héberger moi-même des services du quotidien, gratuitement et en gardant le contrôle de mes données, puis en faire profiter mes proches. C’est aussi mon terrain d’apprentissage : infrastructure, réseau, cloud, cybersécurité défensive et offensive. Je ne cherche pas à tout maîtriser, mais à comprendre comment les pièces s’assemblent.'],
          ['Ce qui est prévu', 'Un hyperviseur Proxmox, un pare-feu OPNsense, quatre VLAN (LAN, LAB, DMZ, ADMIN) sur un switch Cisco 2960, un VPN WireGuard, la supervision avec Prometheus et Grafana, un SIEM Wazuh et des services auto-hébergés.'],
          ['Où j’en suis', 'Phase 1 sur 10 terminée : le matériel. Prochaine étape, l’installation de Proxmox.'],
        ],
        stack: 'Proxmox, OPNsense, Cisco IOS, WireGuard, Wazuh, Prometheus, Grafana, Docker',
      },
      {
        id: 'aquatrack',
        title: 'Aquatrack',
        discipline: 'Système embarqué, projet de BTS, 2026',
        media: { kind: 'photo', src: 'assets/esp32-cam.jpg', w: 1000, h: 1312, alt: 'Module ESP32-CAM vu de face, avec sa caméra et son lecteur de carte', caption: 'Un module ESP32-CAM, le cœur du capteur.' },
        blocks: [
          ['Le défi', 'Le sujet de l’aquarium était imposé. Au fond, la question était celle de tout objet connecté : comment collecter des données de façon fiable et les acheminer sans perte, même quand le réseau flanche ?'],
          ['Mon rôle', 'J’ai développé le module ESP32-CAM : une prise de photo automatique dont l’utilisateur règle la fréquence, puis l’envoi vers l’API du projet en HTTP. J’ai travaillé la robustesse avec la reconnexion Wi-Fi automatique, la gestion des erreurs, un tampon mémoire et des journaux persistants pour ne rien perdre en cas de coupure.'],
        ],
        stack: 'C++, ESP32-CAM, HTTP, API REST, Wi-Fi',
      },
      {
        id: 'relsa',
        title: 'RELSA',
        discipline: 'Refonte d’un site d’entreprise, stage chez Nitsnets, 2025',
        link: { label: 'relsa.es', href: 'https://relsa.es' },
        media: { kind: 'devices', desktop: { src: 'assets/relsa-desktop.jpg', w: 1280, h: 779, alt: 'Page d’accueil de relsa.es sur ordinateur' }, phone: { src: 'assets/relsa-mobile.jpg', w: 560, h: 969, alt: 'Page d’accueil de relsa.es sur téléphone' }, caption: 'relsa.es, sur ordinateur et sur téléphone.' },
        blocks: [
          ['Le contexte', 'Refonte complète du site de RELSA, entreprise d’installation et de maintenance industrielle basée à Sabadell, en Espagne, membre du groupe Estabanell.'],
          ['Mon rôle', 'Contribution au développement backend, au sein d’une équipe avec un suivi quotidien et un rapport chaque semaine.'],
        ],
        stack: 'Développement web backend, travail en équipe, méthode agile',
      },
      {
        id: 'compression',
        title: 'Compresseur',
        discipline: 'Application web, stage chez Nitsnets, 2025',
        media: { kind: 'compare', before: { src: 'assets/compress-avant.jpg', label: 'Original, 544 Ko' }, after: { src: 'assets/compress-apres.jpg', label: 'Compressée, 108 Ko' }, w: 1200, h: 1668, alt: 'Portail de la cathédrale d’Amiens, la nuit', range: 'Comparer l’original et la version compressée', caption: 'Fais glisser : la même photo, cinq fois plus légère.' },
        blocks: [
          ['Le problème', 'Des images trop lourdes ralentissent le chargement des sites, et les outils existants sont souvent payants, limités ou peu sûrs.'],
          ['La solution', 'Une application web développée de A à Z qui compresse les images de façon uniforme. Simple, gratuite, sans limite d’usage et sécurisée : les fichiers sont traités sur le serveur, sans passer par un service tiers. Le code appartient à l’entreprise et reste privé.'],
        ],
        stack: 'Laravel, PHP',
      },
    ],
  },

  lab: {
    title: 'Le homelab, pièce par pièce',
    intro:
      'Voici le plan réseau que je suis en train de construire. Choisis un élément pour voir son rôle, les services qu’il héberge et où il en est.',
    status: { done: 'En place', next: 'Prochaine étape', planned: 'Prévu' },
    hosts: 'Héberge',
    note: 'Les plages d’adresses sont génériques, pour la documentation.',
    nodes: {
      internet: { name: 'Internet', role: 'Le monde extérieur. Rien n’y entre sans passer par le pare-feu.', services: [], status: 'done' },
      box: { name: 'Box internet', role: 'L’accès fourni par l’opérateur, en amont de tout le reste.', services: [], status: 'done' },
      switch: { name: 'Switch Cisco 2960', role: 'Le commutateur administrable qui porte la segmentation en VLAN.', services: ['VLAN 10, 20, 30, 40', 'Ports trunk vers Proxmox'], status: 'done' },
      proxmox: { name: 'Mini PC Proxmox', role: 'L’hyperviseur principal. Il fait tourner le pare-feu et les machines virtuelles.', services: ['OPNsense', 'Wazuh', 'Kali Linux', 'Gitea', 'Vaultwarden', 'Nextcloud', 'Immich'], status: 'next' },
      opnsense: { name: 'OPNsense', role: 'Une VM sur le mini PC Proxmox, reliée au switch en trunk. Pare-feu et passerelle de chaque VLAN (192.168.x.1) : c’est elle qui décide qui parle à qui.', services: ['Filtrage et routage inter-VLAN', 'DHCP, DNS', 'VPN'], status: 'planned' },
      lan: { name: 'VLAN 10, LAN', role: 'Le réseau du quotidien : ordinateurs et téléphones de la maison.', services: ['192.168.10.0/24'], status: 'planned' },
      labnet: { name: 'VLAN 20, LAB', role: 'Le bac à sable pour tester, casser et recommencer, isolé du reste.', services: ['192.168.20.0/24', 'Kali Linux', 'Machines de test'], status: 'planned' },
      dmz: { name: 'VLAN 30, DMZ', role: 'Les services exposés, séparés du réseau interne.', services: ['192.168.30.0/24'], status: 'planned' },
      admin: { name: 'VLAN 40, ADMIN', role: 'L’administration des équipements, accessible à moi seul.', services: ['192.168.40.0/24'], status: 'planned' },
      oldpc: { name: 'Ancien PC, 4 Go', role: 'Une seconde vie pour un vieux PC : la supervision.', services: ['Prometheus', 'Grafana'], status: 'planned' },
      pi: { name: 'Raspberry Pi Zero 2 W', role: 'Toujours allumé et sobre en énergie : la porte d’entrée à distance.', services: ['WireGuard', 'Pi-hole', 'Wake-on-LAN'], status: 'planned' },
    },
    roadmapTitle: 'La feuille de route',
    roadmap: [
      'Acquisition du matériel',
      'Installation de Proxmox',
      'Configuration réseau et VLAN',
      'Déploiement d’OPNsense',
      'Supervision et observabilité',
      'Services de sécurité',
      'DevSecOps et automatisation',
      'Services auto-hébergés du quotidien',
      'Cloud et Azure',
      'Conteneurisation et orchestration',
    ],
  },

  skills: {
    title: 'Compétences',
    legend: { done: 'pratiqué', learning: 'en apprentissage' },
    groups: [
      {
        name: 'Réseaux',
        items: [
          ['TCP/IP, DNS, routage', 'done', 'Étudiés en BTS, en théorie et en pratique.'],
          ['VLAN', 'done', 'Plan de segmentation conçu pour mon homelab.'],
          ['Pare-feu, VPN, supervision', 'learning'],
        ],
      },
      {
        name: 'Systèmes',
        items: [
          ['Linux', 'done', 'Ligne de commande et diagnostic.'],
          ['Windows Server', 'learning'],
          ['Proxmox, Docker', 'learning'],
        ],
      },
      {
        name: 'Développement et IoT',
        items: [
          ['C, C++, ESP32', 'done', 'Firmware d’Aquatrack.'],
          ['PHP, Laravel, API REST', 'done', 'Stage chez Nitsnets.'],
          ['Python, Bash', 'done'],
          ['Git, GitHub', 'done'],
        ],
      },
      {
        name: 'Cybersécurité défensive',
        items: [
          ['Simulateur SOC', 'done', 'Sur TryHackMe.'],
          ['SIEM, EDR, analyse de journaux', 'learning'],
          ['Microsoft Sentinel et Defender', 'learning'],
          ['Rédaction de comptes rendus', 'learning'],
        ],
      },
      {
        name: 'Référentiels',
        items: [
          ['MITRE ATT&CK', 'learning'],
          ['OWASP Top 10', 'learning'],
          ['ISO 27001, NIS2', 'learning'],
        ],
      },
    ],
  },

  proof: {
    title: 'Pratique et certifications',
    kinds: [
      {
        name: 'Entraînement',
        items: [
          ['TryHackMe, top 20 %', 'https://tryhackme.com/p/axel802401'],
          ['Ligue Gold sur TryHackMe'],
          ['HackTheBox', 'https://profile.hackthebox.com/profile/019cc2bf-5f03-7208-9cef-0fb1a0a8ac7f'],
        ],
      },
      {
        name: 'Certifications',
        items: [
          ['TryHackMe SAL1, en cours'],
          ['Sensibilisation à la cybersécurité, ANSSI'],
          ['OpenAI, Apply AI at Work'],
        ],
      },
      {
        name: 'Parcours IA',
        items: [['AI Foundations'], ['Applied AI Foundations'], ['Agents and Workflows']],
      },
      {
        name: 'Langues',
        items: [['Français'], ['Anglais, C1'], ['Espagnol, B1+']],
      },
    ],
  },

  contact: {
    title: 'Contact',
    sentence:
      'Vous cherchez un alternant en cybersécurité pour septembre 2027 ? Parlons-en.',
    question: 'Le plus simple pour me joindre',
    email: 'axel.denis.pro@hotmail.com',
    linkedin: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/axel-denis-b68523292' },
    place: 'Amiens. Mobile en Hauts-de-France et en Île-de-France. Je réponds rapidement.',
    photoAlt: 'Gargouille de la cathédrale d’Amiens éclairée la nuit',
  },

  footer: {
    contact: 'Écrire',
    social: 'Ailleurs',
    github: 'GitHub',
    credits: 'Photographies',
    creditsIntro: 'Wikimedia Commons, utilisées sous licence :',
    legal: 'Site personnel d’Axel Denis, 2026.',
    top: 'Haut de page',
  },
};
