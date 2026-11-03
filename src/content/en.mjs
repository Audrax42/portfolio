// English content. Edit the text here, then run `node build.mjs`.
// In paragraphs, ==text== becomes a gold highlight (once per page).

export default {
  lang: 'en',
  locale: 'en_GB',
  dir: 'en/',
  switchLabel: 'Français',
  switchShort: 'FR',
  switchHref: '../',

  meta: {
    title: 'Axel Denis, cybersecurity engineering student',
    description:
      'Cybersecurity engineering student at EiJV (Amiens, France), looking for a two-year SOC, network or infrastructure security apprenticeship from September 2027.',
  },

  nav: {
    path: 'Journey',
    work: 'Projects',
    lab: 'Homelab',
    skills: 'Skills',
    contact: 'Contact',
    cv: 'My CV',
    menu: 'Menu',
    skip: 'Skip to content',
  },

  hero: {
    name: 'Axel Denis',
    lead: 'I build systems to understand how to defend them.',
    intro:
      'Cybersecurity engineering student at École d’Ingénieurs Jules Verne in Amiens, France, looking for a two-year SOC apprenticeship from September 2027.',
    facts: [
      ['Apprenticeship', 'September 2027, two years'],
      ['Schedule', 'one week at school, one week at work'],
      ['Location', 'Hauts-de-France and Paris region'],
    ],
    cta: 'Download my CV',
    secondary: 'Write to me',
  },

  stage: {
    gargouille: 'A gargoyle on Amiens cathedral, at night',
    portail: 'The portal of Amiens cathedral, at night',
    tour: 'The tower of Jules Verne’s house, Amiens',
    cisco: 'Circuit board of a Cisco Catalyst 2960 switch',
    alicante: 'Alicante, seen from the watchtower of Santa Bárbara castle',
  },

  about: {
    title: 'Defending in the shadows',
    paragraphs: [
      'Technology is part of everyday life. We keep our photos, our conversations, our work and sometimes our health in it. The more I used it, the more one question held my attention: who makes sure all of it stays safe?',
      'Defensive security mostly happens out of sight. When it is done well, nobody notices, and that is exactly what draws me to it: ==protecting people who should never have to worry about what happens behind the screen==.',
      'My first goal is a SOC analyst role. I believe you only design a secure infrastructure well once you have learned to monitor and defend one. Later on, I would like to move towards security architecture and the cloud.',
      'People describe me as rigorous, autonomous and curious. I like to analyse and understand before acting, and I enjoy working in a team. I speak French, English (C1) and Spanish (B1+).',
    ],
    sign: 'Axel Denis',
    role: 'Engineering student, Cybersecurity track, EiJV',
  },

  path: {
    title: 'My journey',
    chapters: [
      {
        scene: 'tour',
        title: 'Understanding what is at stake',
        text:
          'I started with economics. That detour taught me how companies work, what they stand to lose and why they become targets. Understanding what an attacker is after is already the first step of defence.',
        rows: [['Bachelor’s year in Economics, Université de Picardie Jules Verne', '2023–2024']],
      },
      {
        scene: 'cisco',
        title: 'Getting hands-on',
        text:
          'The urge to work with the technology itself took over. During my BTS (a two-year technical degree) I learned networking (DNS, VLANs, routing), Linux, programming and electronics, in theory and in practice. That is where I built Aquatrack.',
        rows: [
          ['BTS CIEL (Cybersecurity, IT, Networks, Electronics), Saint-Quentin', '2024–2026'],
          ['Production operator, Verbau France, industrial manufacturing', 'summer 2024'],
        ],
      },
      {
        scene: 'alicante',
        title: 'Building as a team',
        text:
          'Three months in a Spanish web agency, inside a development team. I worked on the complete redesign of the RELSA website and contributed to the back end, with daily meetings and weekly reports, in a foreign language. For an internal need, I also built an image compression app on my own.',
        rows: [['Full stack developer (internship), Nitsnets, Alicante, Spain', 'May–July 2025']],
      },
      {
        scene: 'portail',
        title: 'Learning to defend',
        text:
          'I chose to specialise. Alongside school, I train on TryHackMe (SOC simulator, preparing the SAL1 certification) and HackTheBox. I am discovering SIEM, EDR, log analysis, MITRE ATT&CK, ISO 27001 and NIS2, and I am building my homelab.',
        rows: [
          ['Engineering degree, Cybersecurity, École d’Ingénieurs Jules Verne, Amiens', '2026–2029'],
          ['Programme accredited SecNumEdu by ANSSI, the French cybersecurity agency', 'since 2026'],
        ],
      },
      {
        scene: 'gargouille',
        title: 'What comes next',
        text:
          'What I am looking for now: putting all of this into practice within a team, on real infrastructure, for real users.',
        rows: [['Apprenticeship in a SOC, Blue Team, network or infrastructure security', 'Sept. 2027']],
      },
    ],
  },

  work: {
    title: 'Projects',
    linkLabel: 'See',
    projects: [
      {
        id: 'homelab',
        title: 'Homelab',
        discipline: 'Personal infrastructure, in progress',
        link: { label: 'Documentation on GitHub', href: 'https://github.com/Audrax42/homelab' },
        left: { src: 'assets/cisco-2960.jpg', w: 1600, h: 1200, alt: 'Circuit board of a Cisco Catalyst 2960 switch, close-up of its Broadcom chips', label: 'The heart of the network: a Cisco 2960' },
        right: { src: 'assets/cisco-2960-detail.jpg', w: 900, h: 1200, alt: 'Close-up of a Broadcom chip on the switch board', label: 'A switching chip, up close' },
        blocks: [
          ['Why', 'To host everyday services myself, for free and in control of my own data, and later share them with my family. It is also my training ground: infrastructure, networking, cloud, defensive and offensive security. The aim is not to master everything, but to understand how the pieces fit together.'],
          ['What is planned', 'A Proxmox hypervisor, an OPNsense firewall, four VLANs (LAN, LAB, DMZ, ADMIN) on a Cisco 2960 switch, a WireGuard VPN, monitoring with Prometheus and Grafana, a Wazuh SIEM and self-hosted services.'],
          ['Where it stands', 'Phase 1 of 10 complete: the hardware. Next step, installing Proxmox.'],
        ],
        stack: 'Proxmox, OPNsense, Cisco IOS, WireGuard, Wazuh, Prometheus, Grafana, Docker',
      },
      {
        id: 'aquatrack',
        title: 'Aquatrack',
        discipline: 'Embedded system, BTS project, 2026',
        left: { src: 'assets/esp32-cam.jpg', w: 1000, h: 1312, alt: 'An ESP32-CAM module seen from the front, with its camera and card reader', label: 'An ESP32-CAM module' },
        right: { src: 'assets/esp32-cam-detail.jpg', w: 820, h: 1080, alt: 'Close-up of the ESP32-CAM camera lens', label: 'The camera, up close' },
        blocks: [
          ['The challenge', 'The aquarium topic was set for us. Underneath, the question was the same as for any connected device: how do you collect data reliably and deliver it without loss, even when the network fails?'],
          ['My part', 'I built the ESP32-CAM module: automatic photo capture at an interval the user sets, then delivery to the project’s API over HTTP. I worked on resilience with automatic Wi-Fi reconnection, error handling, a memory buffer and persistent logs, so nothing is lost when the connection drops.'],
        ],
        stack: 'C++, ESP32-CAM, HTTP, REST API, Wi-Fi',
      },
      {
        id: 'relsa',
        title: 'RELSA',
        discipline: 'Company website redesign, Nitsnets internship, 2025',
        link: { label: 'relsa.es', href: 'https://relsa.es' },
        left: { src: 'assets/relsa-desktop.jpg', w: 1200, h: 1200, alt: 'The relsa.es home page on a desktop screen', label: 'relsa.es on desktop' },
        right: { src: 'assets/relsa-mobile.jpg', w: 840, h: 1200, alt: 'The relsa.es home page on a phone', label: 'And on a phone', fit: 'contain' },
        blocks: [
          ['The context', 'A complete redesign of the website of RELSA, an industrial installation and maintenance company based in Sabadell, Spain, part of the Estabanell group.'],
          ['My part', 'Back-end development within a team, with daily follow-ups and a weekly report.'],
        ],
        stack: 'Back-end web development, teamwork, agile method',
      },
      {
        id: 'compression',
        title: 'Compressor',
        discipline: 'Web application, Nitsnets internship, 2025',
        left: { src: 'assets/compress-avant.jpg', w: 1200, h: 1668, alt: 'Photo of the portal of Amiens cathedral, original version', label: 'Before: 544 KB' },
        right: { src: 'assets/compress-apres.jpg', w: 1200, h: 1668, alt: 'The same photo after compression, visually identical', label: 'After: 108 KB, five times lighter' },
        blocks: [
          ['The problem', 'Heavy images slow websites down, and the existing tools are often paid, limited or not trustworthy.'],
          ['The solution', 'A web app built from scratch that compresses images consistently. Simple, free, unlimited and secure: files are processed on the server, never sent to a third-party service. The code belongs to the company and stays private.'],
        ],
        stack: 'Laravel, PHP',
        demoNote: 'On either side of the line, the same photo before and after the same kind of compression.',
      },
    ],
  },

  lab: {
    title: 'The homelab, piece by piece',
    intro:
      'This is the network I am building. Pick a piece to see its role, the services it hosts and how far along it is.',
    status: { done: 'In place', next: 'Next step', planned: 'Planned' },
    hosts: 'Hosts',
    note: 'Address ranges are generic, for documentation only.',
    nodes: {
      internet: { name: 'Internet', role: 'The outside world. Nothing gets in without going through the firewall.', services: [], status: 'done' },
      box: { name: 'ISP router', role: 'The connection from the provider, upstream of everything else.', services: [], status: 'done' },
      switch: { name: 'Cisco 2960 switch', role: 'The managed switch that carries the VLAN segmentation.', services: ['VLANs 10, 20, 30, 40', 'Trunk ports to Proxmox'], status: 'done' },
      proxmox: { name: 'Proxmox mini PC', role: 'The main hypervisor. It runs the firewall and the virtual machines.', services: ['OPNsense', 'Wazuh', 'Kali Linux', 'Gitea', 'Vaultwarden', 'Nextcloud', 'Immich'], status: 'next' },
      opnsense: { name: 'OPNsense', role: 'Firewall and router between the VLANs: it decides who may talk to whom.', services: ['Inter-VLAN filtering', 'Routing', 'Optional VPN'], status: 'planned' },
      lan: { name: 'VLAN 10, LAN', role: 'The everyday network: the household’s computers and phones.', services: ['192.168.10.0/24'], status: 'planned' },
      labnet: { name: 'VLAN 20, LAB', role: 'A sandbox to test, break and start over, isolated from the rest.', services: ['192.168.20.0/24', 'Kali Linux', 'Test machines'], status: 'planned' },
      dmz: { name: 'VLAN 30, DMZ', role: 'Exposed services, kept apart from the internal network.', services: ['192.168.30.0/24'], status: 'planned' },
      admin: { name: 'VLAN 40, ADMIN', role: 'Device administration, reachable by me alone.', services: ['192.168.40.0/24'], status: 'planned' },
      oldpc: { name: 'Old PC, 4 GB', role: 'A second life for an old computer: monitoring.', services: ['Prometheus', 'Grafana'], status: 'planned' },
      pi: { name: 'Raspberry Pi Zero 2 W', role: 'Always on and frugal: the remote way in.', services: ['WireGuard', 'Pi-hole', 'Wake-on-LAN'], status: 'planned' },
    },
    roadmapTitle: 'The roadmap',
    roadmap: [
      'Hardware',
      'Proxmox installation',
      'Network and VLAN setup',
      'OPNsense deployment',
      'Monitoring and observability',
      'Security services',
      'DevSecOps and automation',
      'Everyday self-hosted services',
      'Cloud and Azure',
      'Containers and orchestration',
    ],
  },

  skills: {
    title: 'Skills',
    legend: { done: 'practised', learning: 'learning' },
    groups: [
      {
        name: 'Networking',
        items: [
          ['TCP/IP, DNS, routing', 'done', 'Studied during my BTS, in theory and in practice.'],
          ['VLANs', 'done', 'Segmentation plan designed for my homelab.'],
          ['Firewalls, VPN, monitoring', 'learning'],
        ],
      },
      {
        name: 'Systems',
        items: [
          ['Linux', 'done', 'Command line and troubleshooting.'],
          ['Windows Server', 'learning'],
          ['Proxmox, Docker', 'learning'],
        ],
      },
      {
        name: 'Development and IoT',
        items: [
          ['C, C++, ESP32', 'done', 'Aquatrack firmware.'],
          ['PHP, Laravel, REST APIs', 'done', 'Internship at Nitsnets.'],
          ['Python, Bash', 'done'],
          ['Git, GitHub', 'done'],
        ],
      },
      {
        name: 'Defensive security',
        items: [
          ['SOC simulator', 'done', 'On TryHackMe.'],
          ['SIEM, EDR, log analysis', 'learning'],
          ['Microsoft Sentinel and Defender', 'learning'],
          ['Incident reporting', 'learning'],
        ],
      },
      {
        name: 'Frameworks',
        items: [
          ['MITRE ATT&CK', 'learning'],
          ['OWASP Top 10', 'learning'],
          ['ISO 27001, NIS2', 'learning'],
        ],
      },
    ],
  },

  proof: {
    title: 'Practice and certifications',
    kinds: [
      {
        name: 'Training',
        items: [
          ['TryHackMe, top 20%', 'https://tryhackme.com/p/axel802401'],
          ['Gold league on TryHackMe'],
          ['HackTheBox', 'https://profile.hackthebox.com/profile/019cc2bf-5f03-7208-9cef-0fb1a0a8ac7f'],
        ],
      },
      {
        name: 'Certifications',
        items: [
          ['TryHackMe SAL1, in progress'],
          ['Cybersecurity awareness, ANSSI'],
          ['OpenAI, Apply AI at Work'],
        ],
      },
      {
        name: 'AI pathway',
        items: [['AI Foundations'], ['Applied AI Foundations'], ['Agents and Workflows']],
      },
      {
        name: 'Languages',
        items: [['French, native'], ['English, C1'], ['Spanish, B1+']],
      },
    ],
  },

  contact: {
    title: 'Contact',
    sentence:
      'Looking for a cybersecurity apprentice from September 2027? Let’s talk.',
    question: 'The easiest way to reach me',
    email: 'axel.denis.pro@hotmail.com',
    linkedin: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/axel-denis-b68523292' },
    place: 'Amiens, France. Open to Hauts-de-France and the Paris region. I reply quickly.',
    photoAlt: 'A gargoyle on Amiens cathedral, lit at night',
  },

  footer: {
    contact: 'Write',
    social: 'Elsewhere',
    github: 'GitHub',
    credits: 'Photographs',
    creditsIntro: 'Wikimedia Commons, used under licence:',
    legal: 'Personal website of Axel Denis, 2026.',
    top: 'Back to top',
  },
};
